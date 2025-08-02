import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SkipLink } from './components/SkipLink';
import { AccessibilitySettingsPanel } from './components/AccessibilitySettingsPanel';
import { Navigation } from './components/Navigation';

// Pages
import { LoginPage } from './pages/LoginPage';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { JobSearchPage } from './pages/JobSearchPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProfilePage } from './pages/ProfilePage';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navigation />}
      {children}
    </>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <>
      <SkipLink />
      <main id="main-content" tabIndex={-1}>
        <AppLayout>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<CandidateDashboard />} />
            <Route path="/jobs" element={<JobSearchPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/apply/:jobId" element={<ApplicationPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Employer routes */}
            <Route path="/employer" element={<EmployerDashboard />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/jobs" replace />} />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/jobs" replace />} />
          </Routes>
        </AppLayout>
      </main>
      <AccessibilitySettingsPanel />
    </>
  );
}; 