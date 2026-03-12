import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { SkipLink } from './components/SkipLink/SkipLink';
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
      <SkipLink />
      <Navigation />
      <main className='flex-grow-1' id='main-content' tabIndex={-1}>
        {children}
      </main>
    </div>
  );
};

export const AppRouter: React.FC = () => {
  const location = useLocation();
  const [routeAnnouncement, setRouteAnnouncement] = useState('');

  useEffect(() => {
    const routeNames: Record<string, string> = {
      '/': 'Inicio',
      '/login': 'Inicio de sesión',
      '/dashboard': 'Panel de candidato',
      '/jobs': 'Búsqueda de empleos',
      '/employer': 'Panel de empleador',
      '/admin': 'Panel de administración',
      '/profile': 'Perfil',
      '/profile-builder': 'Hoja de vida guiada',
    };

    const pageName =
      routeNames[location.pathname] ||
      (location.pathname.startsWith('/job/') ? 'Detalle de empleo' : '') ||
      (location.pathname.startsWith('/apply/') ? 'Postulación' : '') ||
      'Pantalla';

    setRouteAnnouncement(`Navegaste a: ${pageName}`);

    const focusTimer = window.setTimeout(() => {
      const mainHeading = document.querySelector(
        'main h1, h1'
      ) as HTMLElement | null;

      if (mainHeading) {
        mainHeading.setAttribute('tabindex', '-1');
        mainHeading.focus();
        return;
      }

      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
      }
    }, 60);

    return () => window.clearTimeout(focusTimer);
  }, [location.pathname]);

  return (
    <>
      <p className='visually-hidden' aria-live='polite' aria-atomic='true'>
        {routeAnnouncement}
      </p>
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
    </>
  );
};
