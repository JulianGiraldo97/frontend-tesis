import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AccessibilityProvider } from '../context/AccessibilityContext';
import { AuthProvider } from '../context/AuthContext';

interface RenderWithProvidersOptions {
  route?: string;
  path?: string;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  { route = '/', path = '/' }: RenderWithProvidersOptions = {}
) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AccessibilityProvider>
        <AuthProvider>
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
        </AuthProvider>
      </AccessibilityProvider>
    </MemoryRouter>
  );
};
