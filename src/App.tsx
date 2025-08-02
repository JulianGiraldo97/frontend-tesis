import React from 'react';
import { AppRouter } from './AppRouter';
import { useAccessibility } from './context/AccessibilityContext';

export const App: React.FC = () => {
  const { highContrast } = useAccessibility();

  return (
    <div className={highContrast ? 'high-contrast' : ''}>
      <AppRouter />
    </div>
  );
}; 