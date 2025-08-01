import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const ProfilePage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { highContrast, setHighContrast, easyReading, setEasyReading } = useAccessibility();

  if (isLoading) {
    return <LoadingSpinner text="Cargando perfil..." />;
  }

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Información Personal</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rol</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.role === 'candidate' ? 'Candidato' : 
                       user.role === 'employer' ? 'Empleador' : 'Administrador'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessibility Settings */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuración de Accesibilidad</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="high-contrast" className="text-sm font-medium text-gray-700">
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
                    <label htmlFor="easy-reading" className="text-sm font-medium text-gray-700">
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 