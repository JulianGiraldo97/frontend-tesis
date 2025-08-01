import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './AppRouter';
import './styles/globals.css';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AccessibilityProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  );
}; 