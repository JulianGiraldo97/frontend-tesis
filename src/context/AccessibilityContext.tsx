import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AccessibilityPreferences } from '@/types';
import { accessibilityService } from '@/services/accessibilityService';
import { accessibilityUtils } from '@/utils/accessibilityUtils';

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  hasScreenReader: boolean;
  updatePreferences: (newPreferences: Partial<AccessibilityPreferences>) => void;
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
  validateAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    return accessibilityService.loadAccessibilityPreferences();
  });

  const [hasScreenReader, setHasScreenReader] = useState<boolean>(false);

  // Detect screen reader usage
  useEffect(() => {
    const detectScreenReader = (): void => {
      // Check for common screen reader indicators
      const isScreenReaderActive = 
        window.navigator.userAgent.includes('NVDA') ||
        window.navigator.userAgent.includes('JAWS') ||
        window.navigator.userAgent.includes('VoiceOver') ||
        document.querySelector('[aria-live]') !== null;
      
      setHasScreenReader(isScreenReaderActive);
    };

    detectScreenReader();
  }, []);

  // Apply accessibility preferences to DOM
  useEffect(() => {
    accessibilityUtils.applyAccessibilityPreferences(preferences);
    accessibilityService.saveAccessibilityPreferences(preferences);
  }, [preferences]);

  // Keyboard navigation setup
  useEffect(() => {
    if (preferences.keyboardNavigation) {
      accessibilityService.enableKeyboardNavigation();
    } else {
      accessibilityService.disableKeyboardNavigation();
    }

    return () => {
      accessibilityService.disableKeyboardNavigation();
    };
  }, [preferences.keyboardNavigation]);

  const updatePreferences = (newPreferences: Partial<AccessibilityPreferences>): void => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPreferences };
      
      // Apply changes immediately
      if (newPreferences.highContrast !== undefined) {
        if (newPreferences.highContrast) {
          accessibilityService.applyHighContrastMode();
        } else {
          accessibilityService.removeHighContrastMode();
        }
      }

      if (newPreferences.easyReading !== undefined) {
        if (newPreferences.easyReading) {
          accessibilityService.applyEasyReadingMode();
        } else {
          accessibilityService.removeEasyReadingMode();
        }
      }

      return updated;
    });
  };

  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    accessibilityService.announceToScreenReader(message, priority);
  };

  const validateAccessibility = (): void => {
    const report = accessibilityService.generateAccessibilityReport();
    
    if (report.overallScore < 80) {
      announceToScreenReader(
        `Accesibilidad: ${report.overallScore}%. Se encontraron ${report.contrastIssues.length + report.focusIssues.length + report.ariaIssues.length} problemas.`,
        'assertive'
      );
    }
  };

  const contextValue: AccessibilityContextType = {
    preferences,
    hasScreenReader,
    updatePreferences,
    announceToScreenReader,
    validateAccessibility,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}; 