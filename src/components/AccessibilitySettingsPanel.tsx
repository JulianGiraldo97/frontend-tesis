import React from 'react';

interface AccessibilitySettingsPanelProps {
  className?: string;
}

export const AccessibilitySettingsPanel: React.FC<AccessibilitySettingsPanelProps> = ({
  className = ''
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);
  const [easyReading, setEasyReading] = React.useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <button
        onClick={togglePanel}
        className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Configuración de accesibilidad"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
          <h3 className="text-lg font-semibold mb-4">Configuración de Accesibilidad</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="high-contrast" className="text-sm font-medium">
                Alto contraste
              </label>
              <button
                id="high-contrast"
                onClick={() => setHighContrast(!highContrast)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  highContrast ? 'bg-green-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={highContrast}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="easy-reading" className="text-sm font-medium">
                Lectura fácil
              </label>
              <button
                id="easy-reading"
                onClick={() => setEasyReading(!easyReading)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  easyReading ? 'bg-green-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={easyReading}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    easyReading ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 