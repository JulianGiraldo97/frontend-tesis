import React, { useState } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import * as Switch from '@radix-ui/react-switch';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';

export const AccessibilitySettingsPanel: React.FC = () => {
  const { preferences, updatePreferences } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (key: keyof typeof preferences) => {
    updatePreferences({ [key]: !preferences[key] });
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
        aria-label="Configuración de accesibilidad"
        title="Configuración de accesibilidad"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>

      {/* Settings Dialog */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-full max-w-md z-50">
            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
              Configuración de Accesibilidad
            </Dialog.Title>

            <div className="space-y-6">
              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="high-contrast" className="text-lg font-medium text-gray-900">
                    Alto Contraste
                  </label>
                  <p className="text-sm text-gray-600">
                    Mejora el contraste para mejor visibilidad
                  </p>
                </div>
                <Switch.Root
                  id="high-contrast"
                  checked={preferences.highContrast}
                  onCheckedChange={() => handleToggle('highContrast')}
                  className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-500 transition-colors duration-200"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>

              {/* Easy Reading */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="easy-reading" className="text-lg font-medium text-gray-900">
                    Lectura Fácil
                  </label>
                  <p className="text-sm text-gray-600">
                    Fuente más grande y espaciado mejorado
                  </p>
                </div>
                <Switch.Root
                  id="easy-reading"
                  checked={preferences.easyReading}
                  onCheckedChange={() => handleToggle('easyReading')}
                  className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-500 transition-colors duration-200"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>

              {/* Keyboard Navigation */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="keyboard-nav" className="text-lg font-medium text-gray-900">
                    Navegación por Teclado
                  </label>
                  <p className="text-sm text-gray-600">
                    Navegación completa con teclado
                  </p>
                </div>
                <Switch.Root
                  id="keyboard-nav"
                  checked={preferences.keyboardNavigation}
                  onCheckedChange={() => handleToggle('keyboardNavigation')}
                  className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-500 transition-colors duration-200"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>

              {/* Captions */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="captions" className="text-lg font-medium text-gray-900">
                    Subtítulos
                  </label>
                  <p className="text-sm text-gray-600">
                    Mostrar subtítulos en contenido multimedia
                  </p>
                </div>
                <Switch.Root
                  id="captions"
                  checked={preferences.captions}
                  onCheckedChange={() => handleToggle('captions')}
                  className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-500 transition-colors duration-200"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>

              {/* Screen Reader */}
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="screen-reader" className="text-lg font-medium text-gray-900">
                    Lector de Pantalla
                  </label>
                  <p className="text-sm text-gray-600">
                    Anuncios para lectores de pantalla
                  </p>
                </div>
                <Switch.Root
                  id="screen-reader"
                  checked={preferences.screenReader}
                  onCheckedChange={() => handleToggle('screenReader')}
                  className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-500 transition-colors duration-200"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary"
                aria-label="Cerrar configuración"
              >
                Cerrar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}; 