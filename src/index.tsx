import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/test.css';
import './styles/globals.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AccessibilityProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  </React.StrictMode>
); 