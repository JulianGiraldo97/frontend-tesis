import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { LoginPage } from './pages/LoginPage';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { JobSearchPage } from './pages/JobSearchPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProfilePage } from './pages/ProfilePage';
import { ProfileBuilder } from './pages/ProfileBuilder';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='min-vh-100 d-flex flex-column'>
      <Navigation />
      <main className='flex-grow-1' id='main-content'>
        {children}
      </main>
    </div>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route
        path='/'
        element={
          <AppLayout>
            <Navigate to='/jobs' replace />
          </AppLayout>
        }
      />
      <Route
        path='/dashboard'
        element={
          <AppLayout>
            <CandidateDashboard />
          </AppLayout>
        }
      />
      <Route
        path='/jobs'
        element={
          <AppLayout>
            <JobSearchPage />
          </AppLayout>
        }
      />
      <Route
        path='/job/:id'
        element={
          <AppLayout>
            <JobDetailPage />
          </AppLayout>
        }
      />
      <Route
        path='/apply/:id'
        element={
          <AppLayout>
            <ApplicationPage />
          </AppLayout>
        }
      />
      <Route
        path='/employer'
        element={
          <AppLayout>
            <EmployerDashboard />
          </AppLayout>
        }
      />
      <Route
        path='/admin'
        element={
          <AppLayout>
            <AdminDashboard />
          </AppLayout>
        }
      />
      <Route
        path='/profile'
        element={
          <AppLayout>
            <ProfilePage />
          </AppLayout>
        }
      />
      <Route
        path='/profile-builder'
        element={
          <AppLayout>
            <ProfileBuilder />
          </AppLayout>
        }
      />
    </Routes>
  );
};
