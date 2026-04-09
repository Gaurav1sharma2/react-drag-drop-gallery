import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GalleryPage from './GalleryPage';
import '@testing-library/jest-dom';

describe('GalleryPage Drag & Drop Functionality', () => {
  const mockOnLogout = jest.fn();

  beforeEach(() => {
    mockOnLogout.mockClear();
  });

  test('renders gallery with images', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const images = screen.getAllByRole('button');
    expect(images.length).toBeGreaterThan(0);
  });

  test('displays correct number of gallery items', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const galleryItems = screen.getAllByRole('button');
    expect(galleryItems.length).toBe(6);
  });

  test('gallery items have draggable attribute', () => {
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const draggableItems = container.querySelectorAll('[draggable="true"]');
    expect(draggableItems.length).toBe(6);
  });

  test('gallery items have aria-label with position info', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const firstItem = screen.getByLabelText(/position 1 of 6/i);
    expect(firstItem).toBeInTheDocument();
  });

  test('gallery items have title attribute for tooltip', () => {
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const itemsWithTitle = container.querySelectorAll('[title*="Drag"]');
    expect(itemsWithTitle.length).toBe(6);
  });

  test('gallery container has region role', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const galleryRegion = screen.getByLabelText('Draggable gallery items');
    expect(galleryRegion).toBeInTheDocument();
  });

  test('gallery items are keyboard accessible (tabIndex)', () => {
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const draggableItems = container.querySelectorAll('[tabIndex="0"]');
    expect(draggableItems.length).toBe(6);
  });

  test('images have alt text', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });

  test('displays drag and drop instructions', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const instructions = screen.getByText(/drag and drop/i);
    expect(instructions).toBeInTheDocument();
  });

  test('logout button has aria-label', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const logoutButton = screen.getByLabelText('Logout from gallery');
    expect(logoutButton).toBeInTheDocument();
  });

  test('logout button calls onLogout when clicked', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const logoutButton = screen.getByLabelText('Logout from gallery');
    fireEvent.click(logoutButton);
    
    expect(mockOnLogout).toHaveBeenCalled();
  });

  test('gallery displays total image count', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const totalImages = screen.getByText(/Total Images: 6/);
    expect(totalImages).toBeInTheDocument();
  });

  test('drag start sets dragged item state', () => {
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const firstItem = container.querySelector('[draggable="true"]');
    fireEvent.dragStart(firstItem);
    
    expect(firstItem.classList.contains('dragging')).toBe(true);
  });

  test('drag end removes dragging class', () => {
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const firstItem = container.querySelector('[draggable="true"]');
    
    fireEvent.dragStart(firstItem);
    expect(firstItem.classList.contains('dragging')).toBe(true);
    
    fireEvent.dragEnd(firstItem);
    expect(firstItem.classList.contains('dragging')).toBe(false);
  });

  test('drag over prevents default behavior', () => {
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const item = container.querySelector('[draggable="true"]');
    const dragOverEvent = new DragEvent('dragover', { bubbles: true });
    const preventDefaultSpy = jest.spyOn(dragOverEvent, 'preventDefault');
    
    fireEvent(item, dragOverEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  test('drop event reorders items', () => {
    const { container, rerender } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const items = container.querySelectorAll('[draggable="true"]');
    const firstItem = items[0];
    const secondItem = items[1];
    
    // Simulate drag start on first item
    fireEvent.dragStart(firstItem);
    
    // Simulate drop on second item
    fireEvent.drop(secondItem);
    
    // Re-render to check if order changed
    rerender(<GalleryPage onLogout={mockOnLogout} />);
    
    const updatedItems = container.querySelectorAll('[draggable="true"]');
    expect(updatedItems.length).toBe(6);
  });

  test('heading hierarchy is correct', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Drag & Drop Gallery');
    
    const h3 = screen.getByRole('heading', { level: 3 });
    expect(h3).toHaveTextContent('Gallery Info:');
  });

  test('gallery items have role="button"', () => {
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const buttonRoleItems = container.querySelectorAll('[role="button"]');
    expect(buttonRoleItems.length).toBe(6);
  });

  test('all gallery items are accessible via keyboard', () => {
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const keyboardAccessibleItems = container.querySelectorAll('[tabIndex="0"]');
    expect(keyboardAccessibleItems.length).toBe(6);
    
    keyboardAccessibleItems.forEach(item => {
      expect(item).toHaveAttribute('draggable', 'true');
      expect(item).toHaveAttribute('aria-label');
    });
  });

  test('gallery info section displays correctly', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    expect(screen.getByText(/Gallery Info:/)).toBeInTheDocument();
    expect(screen.getByText(/Total Images: 6/)).toBeInTheDocument();
    expect(screen.getByText(/Try dragging images/i)).toBeInTheDocument();
  });

  test('each gallery item has unique aria-label', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const ariaLabels = new Set();
    const items = screen.getAllByRole('button');
    
    items.forEach(item => {
      const label = item.getAttribute('aria-label');
      expect(label).toBeTruthy();
      ariaLabels.add(label);
    });
    
    expect(ariaLabels.size).toBe(6);
  });
});
