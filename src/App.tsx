import React from 'react';
import { AppRouter } from './AppRouter';
import { useAccessibility } from './context/AccessibilityContext';

export const App: React.FC = () => {
  const { highContrast, easyReading } = useAccessibility();

  // Construir las clases CSS dinámicamente
  const accessibilityClasses = [
    highContrast ? 'high-contrast' : '',
    easyReading ? 'easy-reading' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={accessibilityClasses}>
      <AppRouter />
    </div>
  );
}; 