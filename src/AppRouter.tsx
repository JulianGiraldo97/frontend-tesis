import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { SkipLink } from './components/SkipLink/SkipLink';
import { LoadingSpinner } from './components';
import { LoginPage } from './pages/LoginPage';

const CandidateDashboard = lazy(() =>
  import('./pages/CandidateDashboard').then(module => ({
    default: module.CandidateDashboard,
  }))
);

const JobSearchPage = lazy(() =>
  import('./pages/JobSearchPage').then(module => ({
    default: module.JobSearchPage,
  }))
);

const JobDetailPage = lazy(() =>
  import('./pages/JobDetailPage').then(module => ({
    default: module.JobDetailPage,
  }))
);

const ApplicationPage = lazy(() =>
  import('./pages/ApplicationPage').then(module => ({
    default: module.ApplicationPage,
  }))
);

const EmployerDashboard = lazy(() =>
  import('./pages/EmployerDashboard').then(module => ({
    default: module.EmployerDashboard,
  }))
);

const AdminDashboard = lazy(() =>
  import('./pages/AdminDashboard').then(module => ({
    default: module.AdminDashboard,
  }))
);

const ProfilePage = lazy(() =>
  import('./pages/ProfilePage').then(module => ({
    default: module.ProfilePage,
  }))
);

const ProfileBuilder = lazy(() =>
  import('./pages/ProfileBuilder').then(module => ({
    default: module.ProfileBuilder,
  }))
);

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='min-vh-100 d-flex flex-column'>
      <SkipLink />
      <Navigation />
      <main className='flex-grow-1' id='main-content' tabIndex={-1}>
        <Suspense fallback={<LoadingSpinner text='Cargando vista...' />}>
          {children}
        </Suspense>
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
