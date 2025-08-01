import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useAccessibility } from './hooks/useAccessibility';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SkipLink } from './components/SkipLink';
import { AccessibilitySettingsPanel } from './components/AccessibilitySettingsPanel';

// Pages
import { LoginPage } from './pages/LoginPage';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { JobSearchPage } from './pages/JobSearchPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProfilePage } from './pages/ProfilePage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner text="Verificando autenticación..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { announceToScreenReader } = useAccessibility();

  // Announce route changes to screen readers
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    const routeNames: Record<string, string> = {
      '/login': 'Página de inicio de sesión',
      '/dashboard': 'Panel de candidato',
      '/jobs': 'Búsqueda de empleos',
      '/profile': 'Perfil de usuario',
      '/admin': 'Panel de administración',
    };

    const routeName = routeNames[currentPath] || 'Página';
    announceToScreenReader(`Navegando a ${routeName}`, 'polite');
  }, [window.location.pathname, announceToScreenReader]);

  return (
    <>
      <SkipLink />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            } 
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="candidate">
                <CandidateDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute requiredRole="candidate">
                <JobSearchPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute requiredRole="candidate">
                <JobDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/apply/:jobId"
            element={
              <ProtectedRoute requiredRole="candidate">
                <ApplicationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Employer routes */}
          <Route
            path="/employer"
            element={
              <ProtectedRoute requiredRole="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* Catch all */}
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </main>
      <AccessibilitySettingsPanel />
    </>
  );
}; 