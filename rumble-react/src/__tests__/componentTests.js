import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import App from '../App';
import Login from '../components/auth/Login';
import CreateAccount from '../components/auth/CreateAccount';
import Dashboard from '../components/dashboard/Dashboard';
import LandingPage from '../components/landing/LandingPage';

// Mock component rendering with auth context
const renderWithProviders = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Component Tests', () => {
  // Test Landing Page
  test('Landing page renders correctly', () => {
    renderWithProviders(<LandingPage />);
    expect(screen.getByText(/Welcome to RUMBLE/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
  });

  // Test Login Component
  test('Login component renders and handles input', () => {
    renderWithProviders(<Login />);
    
    // Check if login form elements exist
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    
    // Test form input
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });
    
    expect(screen.getByLabelText(/Email/i).value).toBe('test@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('password123');
  });

  // Test Create Account Component
  test('CreateAccount component renders and handles input', () => {
    renderWithProviders(<CreateAccount />);
    
    // Check if signup form elements exist
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    
    // Test form input
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'newuser@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'securepass123' }
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'securepass123' }
    });
    
    expect(screen.getByLabelText(/Email/i).value).toBe('newuser@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('securepass123');
    expect(screen.getByLabelText(/Confirm Password/i).value).toBe('securepass123');
  });

  // Test Dashboard Component (assuming auth is required)
  test('Dashboard shows loading initially', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  // Test Routing
  test('App routing works correctly', () => {
    renderWithProviders(<App />, { route: '/' });
    expect(screen.getByText(/Welcome to RUMBLE/i)).toBeInTheDocument();
    
    // Navigate to login
    fireEvent.click(screen.getByText(/Login/i));
    expect(window.location.pathname).toBe('/login');
  });
});
