import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useAccessibility } from '@/context/AccessibilityContext';
import { AccessibilitySettingsPanel } from '@/components/AccessibilitySettingsPanel';
import { SkipLink } from '@/components/SkipLink';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Pages
import { LoginPage } from '@/pages/LoginPage';
import { CandidateDashboard } from '@/pages/CandidateDashboard';
import { EmployerDashboard } from '@/pages/EmployerDashboard';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { JobSearchPage } from '@/pages/JobSearchPage';
import { JobDetailPage } from '@/pages/JobDetailPage';
import { ApplicationPage } from '@/pages/ApplicationPage';
import { ProfilePage } from '@/pages/ProfilePage';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { hasScreenReader } = useAccessibility();

  // Announce page changes to screen readers
  useEffect(() => {
    if (hasScreenReader) {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Página cargada: ${document.title}`;
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }, [hasScreenReader]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SkipLink />
      
      <main id="main-content" tabIndex={-1}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
          } />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              {user?.role === 'candidate' && <CandidateDashboard />}
              {user?.role === 'employer' && <EmployerDashboard />}
              {user?.role === 'admin' && <AdminDashboard />}
            </ProtectedRoute>
          } />
          
          <Route path="/jobs" element={
            <ProtectedRoute allowedRoles={['candidate']}>
              <JobSearchPage />
            </ProtectedRoute>
          } />
          
          <Route path="/jobs/:id" element={
            <ProtectedRoute allowedRoles={['candidate']}>
              <JobDetailPage />
            </ProtectedRoute>
          } />
          
          <Route path="/apply/:jobId" element={
            <ProtectedRoute allowedRoles={['candidate']}>
              <ApplicationPage />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
      
      <AccessibilitySettingsPanel />
    </div>
  );
};

export default App; 