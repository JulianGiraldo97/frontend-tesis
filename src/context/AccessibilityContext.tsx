import React, { createContext, useState, ReactNode, useContext } from 'react';

type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

interface AccessibilityContextProps {
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  easyReading: boolean;
  setEasyReading: (value: boolean) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

export const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [easyReading, setEasyReading] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('medium');

  return (
    <AccessibilityContext.Provider value={{ 
      highContrast, 
      setHighContrast, 
      easyReading, 
      setEasyReading,
      fontSize,
      setFontSize
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextProps => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}; 