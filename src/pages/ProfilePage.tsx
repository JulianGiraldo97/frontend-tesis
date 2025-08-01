import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAccessibility } from '@/context/AccessibilityContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import * as Avatar from '@radix-ui/react-avatar';
import * as Tabs from '@radix-ui/react-tabs';
import * as Switch from '@radix-ui/react-switch';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { preferences, updatePreferences } = useAccessibility();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    logout();
    setIsLoading(false);
  };

  const handleToggle = (key: keyof typeof preferences) => {
    updatePreferences({ [key]: !preferences[key] });
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Mi Perfil
              </h1>
              <p className="text-gray-600">
                Gestiona tu información personal y preferencias
              </p>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="btn-secondary"
              aria-describedby={isLoading ? 'logout-status' : undefined}
            >
              {isLoading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
            </button>
            {isLoading && (
              <p id="logout-status" className="sr-only" aria-live="polite">
                Cerrando sesión...
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="text-center">
                <Avatar.Root className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Avatar.Image
                    src={user.avatar}
                    alt={`Foto de ${user.name}`}
                  />
                  <Avatar.Fallback className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Avatar.Fallback>
                </Avatar.Root>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {user.name}
                </h2>
                <p className="text-gray-600 mb-4">{user.email}</p>
                
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === 'candidate' ? 'bg-blue-100 text-blue-800' :
                  user.role === 'employer' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {user.role === 'candidate' ? 'Candidato' :
                   user.role === 'employer' ? 'Empleador' : 'Administrador'}
                </span>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Preferencias de Accesibilidad Activas
                </h3>
                <div className="space-y-2">
                  {preferences.highContrast && (
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">Alto contraste</span>
                    </div>
                  )}
                  {preferences.easyReading && (
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">Lectura fácil</span>
                    </div>
                  )}
                  {preferences.screenReader && (
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">Lector de pantalla</span>
                    </div>
                  )}
                  {!preferences.highContrast && !preferences.easyReading && !preferences.screenReader && (
                    <p className="text-sm text-gray-500">No hay preferencias especiales activadas</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs.Root defaultValue="personal" className="space-y-6">
              <Tabs.List className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <Tabs.Trigger
                  value="personal"
                  className="flex-1 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm"
                >
                  Información Personal
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="accessibility"
                  className="flex-1 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm"
                >
                  Accesibilidad
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="security"
                  className="flex-1 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm"
                >
                  Seguridad
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="personal" className="space-y-6">
                <div className="card">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Información Personal
                    </h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn-secondary"
                      aria-label={isEditing ? 'Cancelar edición' : 'Editar información'}
                    >
                      {isEditing ? 'Cancelar' : 'Editar'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        disabled={!isEditing}
                        className="input-field"
                        aria-label="Nombre completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        disabled={!isEditing}
                        className="input-field"
                        aria-label="Email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        defaultValue="+57 300 123 4567"
                        disabled={!isEditing}
                        className="input-field"
                        aria-label="Teléfono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ubicación
                      </label>
                      <input
                        type="text"
                        defaultValue="Bogotá, Colombia"
                        disabled={!isEditing}
                        className="input-field"
                        aria-label="Ubicación"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-secondary"
                        aria-label="Cancelar cambios"
                      >
                        Cancelar
                      </button>
                      <button
                        className="btn-primary"
                        aria-label="Guardar cambios"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  )}
                </div>
              </Tabs.Content>

              <Tabs.Content value="accessibility" className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Configuración de Accesibilidad
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Alto Contraste</h4>
                        <p className="text-sm text-gray-600">
                          Mejora el contraste para mejor visibilidad
                        </p>
                      </div>
                      <Switch.Root
                        checked={preferences.highContrast}
                        onCheckedChange={() => handleToggle('highContrast')}
                        className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-500 transition-colors duration-200"
                      >
                        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                      </Switch.Root>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Lectura Fácil</h4>
                        <p className="text-sm text-gray-600">
                          Fuente más grande y espaciado mejorado
                        </p>
                      </div>
                      <Switch.Root
                        checked={preferences.easyReading}
                        onCheckedChange={() => handleToggle('easyReading')}
                        className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-500 transition-colors duration-200"
                      >
                        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                      </Switch.Root>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Navegación por Teclado</h4>
                        <p className="text-sm text-gray-600">
                          Navegación completa con teclado
                        </p>
                      </div>
                      <Switch.Root
                        checked={preferences.keyboardNavigation}
                        onCheckedChange={() => handleToggle('keyboardNavigation')}
                        className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-500 transition-colors duration-200"
                      >
                        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                      </Switch.Root>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Subtítulos</h4>
                        <p className="text-sm text-gray-600">
                          Mostrar subtítulos en contenido multimedia
                        </p>
                      </div>
                      <Switch.Root
                        checked={preferences.captions}
                        onCheckedChange={() => handleToggle('captions')}
                        className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-500 transition-colors duration-200"
                      >
                        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                      </Switch.Root>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Lector de Pantalla</h4>
                        <p className="text-sm text-gray-600">
                          Anuncios para lectores de pantalla
                        </p>
                      </div>
                      <Switch.Root
                        checked={preferences.screenReader}
                        onCheckedChange={() => handleToggle('screenReader')}
                        className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-500 transition-colors duration-200"
                      >
                        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                      </Switch.Root>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">
                      Información sobre accesibilidad
                    </h4>
                    <p className="text-sm text-blue-700">
                      Estas configuraciones se guardan automáticamente y se aplican a toda la plataforma. 
                      Puedes cambiar estas preferencias en cualquier momento.
                    </p>
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="security" className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Configuración de Seguridad
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">Cambiar Contraseña</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña actual
                          </label>
                          <input
                            type="password"
                            className="input-field"
                            placeholder="Ingresa tu contraseña actual"
                            aria-label="Contraseña actual"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nueva contraseña
                          </label>
                          <input
                            type="password"
                            className="input-field"
                            placeholder="Ingresa tu nueva contraseña"
                            aria-label="Nueva contraseña"
                          />
                        </div>
                      </div>
                      <button className="btn-primary mt-4">
                        Cambiar Contraseña
                      </button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-base font-medium text-gray-900 mb-2">Autenticación de Dos Factores</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Añade una capa extra de seguridad a tu cuenta.
                      </p>
                      <button className="btn-secondary">
                        Configurar 2FA
                      </button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-base font-medium text-gray-900 mb-2">Sesiones Activas</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Gestiona las sesiones activas en otros dispositivos.
                      </p>
                      <button className="btn-secondary">
                        Ver Sesiones
                      </button>
                    </div>
                  </div>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </div>
  );
}; 