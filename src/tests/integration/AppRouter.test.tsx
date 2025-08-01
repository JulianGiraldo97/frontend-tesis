import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AppRouter } from '@/AppRouter';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { AuthProvider } from '@/context/AuthContext';

expect.extend(toHaveNoViolations);

// Mock the pages to avoid complex dependencies
jest.mock('@/pages/LoginPage', () => ({
  LoginPage: () => <div data-testid="login-page">Login Page</div>,
}));

jest.mock('@/pages/CandidateDashboard', () => ({
  CandidateDashboard: () => <div data-testid="candidate-dashboard">Candidate Dashboard</div>,
}));

jest.mock('@/pages/JobSearchPage', () => ({
  JobSearchPage: () => <div data-testid="job-search-page">Job Search Page</div>,
}));

jest.mock('@/pages/JobDetailPage', () => ({
  JobDetailPage: () => <div data-testid="job-detail-page">Job Detail Page</div>,
}));

jest.mock('@/pages/ApplicationPage', () => ({
  ApplicationPage: () => <div data-testid="application-page">Application Page</div>,
}));

jest.mock('@/pages/EmployerDashboard', () => ({
  EmployerDashboard: () => <div data-testid="employer-dashboard">Employer Dashboard</div>,
}));

jest.mock('@/pages/AdminDashboard', () => ({
  AdminDashboard: () => <div data-testid="admin-dashboard">Admin Dashboard</div>,
}));

jest.mock('@/pages/ProfilePage', () => ({
  ProfilePage: () => <div data-testid="profile-page">Profile Page</div>,
}));

const renderWithProviders = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AccessibilityProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </AccessibilityProvider>
    </MemoryRouter>
  );
};

describe('AppRouter', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should render without accessibility violations', async () => {
    const { container } = renderWithProviders(['/login']);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should redirect to login when not authenticated', async () => {
    renderWithProviders(['/dashboard']);
    
    await waitFor(() => {
      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });
  });

  it('should show loading spinner during authentication check', () => {
    renderWithProviders(['/dashboard']);
    
    expect(screen.getByText('Verificando autenticación...')).toBeInTheDocument();
  });

  it('should include skip link for accessibility', () => {
    renderWithProviders(['/login']);
    
    const skipLink = screen.getByRole('link', { name: /saltar al contenido principal/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('should have main content area with proper accessibility attributes', () => {
    renderWithProviders(['/login']);
    
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveAttribute('id', 'main-content');
    expect(mainContent).toHaveAttribute('tabindex', '-1');
  });

  it('should include accessibility settings panel', () => {
    renderWithProviders(['/login']);
    
    // The accessibility panel should be present (usually a floating button)
    expect(document.querySelector('[data-testid="accessibility-settings"]')).toBeInTheDocument();
  });

  describe('Route Protection', () => {
    it('should protect candidate routes from unauthorized access', async () => {
      // Mock authenticated user with different role
      localStorage.setItem('auth-token', 'mock-token');
      
      renderWithProviders(['/dashboard']);
      
      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });

    it('should protect employer routes from unauthorized access', async () => {
      localStorage.setItem('auth-token', 'mock-token');
      
      renderWithProviders(['/employer']);
      
      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });

    it('should protect admin routes from unauthorized access', async () => {
      localStorage.setItem('auth-token', 'mock-token');
      
      renderWithProviders(['/admin']);
      
      await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
      });
    });
  });

  describe('Navigation Announcements', () => {
    it('should announce route changes to screen readers', async () => {
      const mockAnnounce = jest.fn();
      
      // Mock the useAccessibility hook
      jest.doMock('@/hooks/useAccessibility', () => ({
        useAccessibility: () => ({
          announceToScreenReader: mockAnnounce,
        }),
      }));

      renderWithProviders(['/login']);
      
      await waitFor(() => {
        expect(mockAnnounce).toHaveBeenCalledWith(
          expect.stringContaining('Página de inicio de sesión'),
          'polite'
        );
      });
    });
  });
}); 