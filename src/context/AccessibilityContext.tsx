import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';
import {
  easyReadingTexts,
  EasyReadingTextKey,
} from '../data/easyReadingTexts';

type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
type ColorScheme = 'default' | 'high-contrast' | 'colorblind' | 'dark';

/**
 * Valores globales de accesibilidad disponibles en toda la aplicación.
 * - `highContrast`/`setHighContrast`: activa una paleta de alto contraste.
 * - `easyReading`/`setEasyReading`: activa modo de lectura facilitada.
 * - `fontSize`/`setFontSize`: tamaño de fuente global.
 * - `colorScheme`/`setColorScheme`: esquema de color accesible.
 */
interface AccessibilityContextProps {
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  easyReading: boolean;
  setEasyReading: (value: boolean) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  getReadableText: (
    key: EasyReadingTextKey,
    fallback?: string
  ) => string;
}

export const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [easyReading, setEasyReading] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('default');
  const getReadableText = useCallback(
    (key: EasyReadingTextKey, fallback?: string) => {
      const entry = easyReadingTexts[key];
      if (!entry) return fallback || '';
      if (easyReading) return entry.easyText;
      return entry.defaultText || fallback || '';
    },
    [easyReading]
  );

  return (
    <AccessibilityContext.Provider value={{ 
      highContrast, 
      setHighContrast, 
      easyReading, 
      setEasyReading,
      fontSize,
      setFontSize,
      colorScheme,
      setColorScheme,
      getReadableText,
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
