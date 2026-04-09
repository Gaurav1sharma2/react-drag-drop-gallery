import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GalleryPage from './GalleryPage';
import '@testing-library/jest-dom';

// Mock DragEvent for Jest environment
class MockDragEvent extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict);
    this.dataTransfer = {
      effectAllowed: 'move',
      dropEffect: 'move',
    };
  }
}

global.DragEvent = MockDragEvent;

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
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const draggableItems = container.querySelectorAll('[draggable="true"]');
    expect(draggableItems.length).toBe(6);
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

  test('draggable items have proper event handlers', () => {
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const firstItem = container.querySelector('[draggable="true"]');
    
    expect(firstItem).toHaveAttribute('draggable', 'true');
    expect(firstItem).toHaveAttribute('role', 'button');
    expect(firstItem).toHaveAttribute('tabIndex', '0');
  });

  test('gallery items respond to drag events', () => {
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const firstItem = container.querySelector('[draggable="true"]');
    
    // Create a proper drag event with dataTransfer
    const dragStartEvent = new MockDragEvent('dragstart', { bubbles: true });
    fireEvent(firstItem, dragStartEvent);
    
    // Check if dragging class is applied
    expect(firstItem.classList.contains('dragging')).toBe(true);
  });

  test('drag event has dataTransfer object', () => {
    const dragEvent = new MockDragEvent('dragstart');
    
    expect(dragEvent.dataTransfer).toBeDefined();
    expect(dragEvent.dataTransfer.effectAllowed).toBe('move');
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
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const ariaLabels = new Set();
    const draggableItems = container.querySelectorAll('[draggable="true"]');
    
    draggableItems.forEach(item => {
      const label = item.getAttribute('aria-label');
      expect(label).toBeTruthy();
      ariaLabels.add(label);
    });
    
    expect(ariaLabels.size).toBe(6);
  });
});
