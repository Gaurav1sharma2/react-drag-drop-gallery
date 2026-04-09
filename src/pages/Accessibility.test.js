import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';
import GalleryPage from './GalleryPage';
import '@testing-library/jest-dom';

describe('Accessibility Tests (5 Tests)', () => {
  const mockOnLogin = jest.fn();
  const mockOnLogout = jest.fn();

  test('TEST 1️⃣: Form Inputs Have ARIA Attributes', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    // Check aria-required on all inputs
    expect(emailInput).toHaveAttribute('aria-required', 'true');
    expect(passwordInput).toHaveAttribute('aria-required', 'true');
    
    // Trigger validation to show aria-describedby
    const submitButton = screen.getByRole('button', { name: /submit login form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(emailInput).toHaveAttribute('aria-describedby');
      expect(passwordInput).toHaveAttribute('aria-describedby');
    });
  });

  test('TEST 2️⃣: Error Messages Have Alert Role', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /submit login form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const errorMessages = screen.queryAllByRole('alert');
      expect(errorMessages.length).toBeGreaterThan(0);
      errorMessages.forEach(msg => {
        expect(msg).toHaveAttribute('role', 'alert');
      });
    });
  });

  test('TEST 3️⃣: Buttons Have Aria Labels', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const loginButton = screen.getByRole('button', { name: /submit login form/i });
    expect(loginButton).toHaveAttribute('aria-label', 'Submit login form');
  });

  test('TEST 4️⃣: Gallery Images Have Alt Text', () => {
    render(<GalleryPage onLogout={mockOnLogout} />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(6);
    
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
      const altText = img.getAttribute('alt');
      expect(altText).not.toBe('');
    });
  });

  test('TEST 5️⃣: Draggable Items Have Accessibility Attributes', () => {
    const { container } = render(<GalleryPage onLogout={mockOnLogout} />);
    
    const draggableItems = container.querySelectorAll('[draggable="true"]');
    expect(draggableItems.length).toBe(6);
    
    draggableItems.forEach(item => {
      expect(item).toHaveAttribute('aria-label');
      expect(item).toHaveAttribute('role', 'button');
      expect(item).toHaveAttribute('tabIndex', '0');
    });
  });
});
