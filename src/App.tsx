import React from 'react';
import { AppRouter } from './AppRouter';
import { useAccessibility } from './context/AccessibilityContext';

export const App: React.FC = () => {
  const { highContrast, easyReading, fontSize, colorScheme } = useAccessibility();

  // Construir las clases CSS dinámicamente
  const accessibilityClasses = [
    highContrast ? 'high-contrast' : '',
    easyReading ? 'easy-reading' : '',
    `font-size-${fontSize}`,
    colorScheme !== 'default' ? colorScheme === 'high-contrast' ? 'high-contrast' : colorScheme === 'colorblind' ? 'colorblind' : 'dark-mode' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={accessibilityClasses}>
      <AppRouter />
    </div>
  );
}; 