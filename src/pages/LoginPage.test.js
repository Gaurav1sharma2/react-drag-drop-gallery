import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import '@testing-library/jest-dom';

describe('LoginPage', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
  });

  test('renders login form with email and password fields', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit login form/i })).toBeInTheDocument();
  });

  test('displays required indicators for form fields', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const requiredIndicators = screen.getAllByLabelText('required');
    expect(requiredIndicators).toHaveLength(2);
  });

  test('shows error message when email is empty on submit', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /submit login form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  test('shows error message when password is empty on submit', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /submit login form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('clears error message when user starts typing in email field', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /submit login form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'test@example.com');
    
    await waitFor(() => {
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });
  });

  test('clears error message when user starts typing in password field', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /submit login form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
    
    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.type(passwordInput, 'password123');
    
    await waitFor(() => {
      expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
    });
  });

  test('calls onLogin with email and password when form is submitted with valid data', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit login form/i });
    
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);
    
    expect(mockOnLogin).toHaveBeenCalledWith('user@example.com', 'password123');
  });

  test('does not call onLogin when form is submitted with empty fields', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /submit login form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnLogin).not.toHaveBeenCalled();
    });
  });

  test('input fields have aria-required attribute', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    expect(emailInput).toHaveAttribute('aria-required', 'true');
    expect(passwordInput).toHaveAttribute('aria-required', 'true');
  });

  test('error messages have role="alert" for accessibility', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /submit login form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const alerts = screen.getAllByRole('alert');
      expect(alerts.length).toBeGreaterThan(0);
    });
  });

  test('form has aria-label for accessibility', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const form = screen.getByRole('form', { hidden: true });
    expect(form).toHaveAttribute('aria-label', 'Login form');
  });

  test('demo credentials section has proper aria-label', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const credentialsSection = screen.getByLabelText('Demo credentials');
    expect(credentialsSection).toBeInTheDocument();
  });

  test('input has aria-invalid when error is present', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /submit login form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  test('input has aria-describedby pointing to error message', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /submit login form/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
    });
  });
});
