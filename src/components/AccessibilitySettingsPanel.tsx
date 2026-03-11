import React, { useEffect, useRef, useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

interface AccessibilitySettingsPanelProps {
  className?: string;
}

export const AccessibilitySettingsPanel: React.FC<AccessibilitySettingsPanelProps> = ({
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);
  const panelId = 'accessibility-settings-panel';
  const { 
    highContrast, 
    setHighContrast, 
    easyReading, 
    setEasyReading,
    fontSize,
    setFontSize,
    colorScheme,
    setColorScheme
  } = useAccessibility();

  const togglePanel = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isOpen) {
      if (previousFocusedElementRef.current) {
        previousFocusedElementRef.current.focus();
        previousFocusedElementRef.current = null;
      }
      return;
    }

    previousFocusedElementRef.current = document.activeElement as HTMLElement;
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(
      panelRef.current?.querySelectorAll(selector) || []
    ) as HTMLElement[];
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      panelRef.current?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const activeFocusable = Array.from(
        panelRef.current?.querySelectorAll(selector) || []
      ) as HTMLElement[];

      if (activeFocusable.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }

      const firstElement = activeFocusable[0];
      const lastElement = activeFocusable[activeFocusable.length - 1];
      const isFocusInsidePanel = panelRef.current?.contains(document.activeElement) ?? false;

      if (!isFocusInsidePanel) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleFontSizeChange = (newSize: 'small' | 'medium' | 'large' | 'xlarge') => {
    setFontSize(newSize);
  };

  const handleColorSchemeChange = (newScheme: 'default' | 'high-contrast' | 'colorblind' | 'dark') => {
    setColorScheme(newScheme);
  };

  const getFontSizeLabel = (size: string) => {
    const labels = {
      small: 'Pequeño',
      medium: 'Mediano',
      large: 'Grande',
      xlarge: 'Muy Grande'
    };
    return labels[size as keyof typeof labels] || size;
  };

  const getColorSchemeLabel = (scheme: string) => {
    const labels = {
      'default': 'Predeterminado',
      'high-contrast': 'Alto Contraste',
      'colorblind': 'Daltónico',
      'dark': 'Modo Oscuro'
    };
    return labels[scheme as keyof typeof labels] || scheme;
  };

  return (
    <div className={`position-fixed bottom-0 end-0 p-3 z-50 ${className}`} style={{ bottom: '20px', right: '20px' }}>
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={togglePanel}
        className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        style={{ width: '60px', height: '60px' }}
        aria-label="Configuración de accesibilidad"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="fs-4">♿</span>
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="position-absolute bottom-100 end-0 mb-3">
          <div
            className="card card-custom shadow-custom-lg animate-fade-in"
            style={{ width: '320px' }}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-settings-title"
            ref={panelRef}
            tabIndex={-1}
          >
            <div className="card-header bg-gradient-primary text-white border-0">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0 fw-bold" id="accessibility-settings-title">
                  <span className="fs-5 me-2">⚙️</span>
                  Configuración de Accesibilidad
                </h5>
                <button
                  type="button"
                  onClick={togglePanel}
                  className="btn btn-link text-white p-0"
                  aria-label="Cerrar configuración"
                >
                  <span className="fs-4">×</span>
                </button>
              </div>
            </div>
            
            <div className="card-body p-4">
              <div className="mb-4">
                <h6 className="fw-bold mb-3 d-flex align-items-center">
                  <span className="fs-5 me-2">🎨</span>
                  Modos de Accesibilidad
                </h6>
                
                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="high-contrast-panel"
                      checked={highContrast}
                      onChange={() => setHighContrast(!highContrast)}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="high-contrast-panel">
                      Alto Contraste
                    </label>
                    <small className="d-block text-muted">
                      {highContrast ? '✅ Activado' : 'Mejora la visibilidad del texto'}
                    </small>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="easy-reading-panel"
                      checked={easyReading}
                      onChange={() => setEasyReading(!easyReading)}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="easy-reading-panel">
                      Modo Lectura Fácil
                    </label>
                    <small className="d-block text-muted">
                      {easyReading ? '✅ Activado' : 'Fuente más grande y espaciado mejorado'}
                    </small>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold mb-3 d-flex align-items-center">
                  <span className="fs-5 me-2">📏</span>
                  Tamaño de Fuente
                </h6>
                <select 
                  className="form-select form-control-custom" 
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(e.target.value as 'small' | 'medium' | 'large' | 'xlarge')}
                >
                  <option value="small">Pequeño (14px)</option>
                  <option value="medium">Mediano (16px)</option>
                  <option value="large">Grande (18px)</option>
                  <option value="xlarge">Muy Grande (20px)</option>
                </select>
                <small className="d-block text-muted mt-2">
                  {fontSize !== 'medium' ? `✅ Actual: ${getFontSizeLabel(fontSize)}` : 'Tamaño predeterminado'}
                </small>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold mb-3 d-flex align-items-center">
                  <span className="fs-5 me-2">🎨</span>
                  Esquema de Colores
                </h6>
                <select 
                  className="form-select form-control-custom" 
                  value={colorScheme}
                  onChange={(e) => handleColorSchemeChange(e.target.value as 'default' | 'high-contrast' | 'colorblind' | 'dark')}
                >
                  <option value="default">Predeterminado</option>
                  <option value="high-contrast">Alto Contraste</option>
                  <option value="colorblind">Daltónico</option>
                  <option value="dark">Modo Oscuro</option>
                </select>
                <small className="d-block text-muted mt-2">
                  {colorScheme !== 'default' ? `✅ Actual: ${getColorSchemeLabel(colorScheme)}` : 'Esquema predeterminado'}
                </small>
              </div>

              <div className="d-grid gap-2">
                <button 
                  type="button"
                  className="btn btn-outline-primary btn-custom"
                  onClick={() => window.location.href = '/profile'}
                >
                  <span className="fs-5 me-2">👤</span>
                  Ver Configuración Completa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 
