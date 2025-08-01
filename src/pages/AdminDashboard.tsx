import React, { useState } from 'react';
import { User } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import * as Tabs from '@radix-ui/react-tabs';
import * as Avatar from '@radix-ui/react-avatar';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'maria.gonzalez@email.com',
    name: 'María González',
    role: 'candidate',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    accessibilityPreferences: {
      highContrast: true,
      easyReading: false,
      keyboardNavigation: true,
      captions: false,
      screenReader: true,
    },
  },
  {
    id: '2',
    email: 'juan.rodriguez@techaccesible.com',
    name: 'Juan Rodríguez',
    role: 'employer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    accessibilityPreferences: {
      highContrast: false,
      easyReading: true,
      keyboardNavigation: true,
      captions: true,
      screenReader: false,
    },
  },
  {
    id: '3',
    email: 'admin@empleaplus.com',
    name: 'Administrador',
    role: 'admin',
    accessibilityPreferences: {
      highContrast: false,
      easyReading: false,
      keyboardNavigation: true,
      captions: false,
      screenReader: false,
    },
  },
];

const accessibilityMetrics = {
  totalUsers: 150,
  usersWithAccessibilityFeatures: 89,
  highContrastUsers: 23,
  easyReadingUsers: 45,
  screenReaderUsers: 12,
  keyboardNavigationUsers: 134,
  captionsUsers: 18,
};

export const AdminDashboard: React.FC = () => {
  const [users] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'candidate': return 'bg-blue-100 text-blue-800';
      case 'employer': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'candidate': return 'Candidato';
      case 'employer': return 'Empleador';
      case 'admin': return 'Administrador';
      default: return role;
    }
  };

  const calculateAccessibilityScore = (user: User) => {
    const prefs = user.accessibilityPreferences;
    let score = 0;
    if (prefs.highContrast) score += 20;
    if (prefs.easyReading) score += 20;
    if (prefs.keyboardNavigation) score += 20;
    if (prefs.captions) score += 20;
    if (prefs.screenReader) score += 20;
    return score;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <p className="text-gray-600">
                Gestión de usuarios y métricas de accesibilidad
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                <p className="text-2xl font-bold text-gray-900">{accessibilityMetrics.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Usuarios con Accesibilidad</p>
                <p className="text-2xl font-bold text-gray-900">{accessibilityMetrics.usersWithAccessibilityFeatures}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Alto Contraste</p>
                <p className="text-2xl font-bold text-gray-900">{accessibilityMetrics.highContrastUsers}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lectura Fácil</p>
                <p className="text-2xl font-bold text-gray-900">{accessibilityMetrics.easyReadingUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs.Root defaultValue="users" className="space-y-6">
          <Tabs.List className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <Tabs.Trigger
              value="users"
              className="flex-1 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm"
            >
              Usuarios
            </Tabs.Trigger>
            <Tabs.Trigger
              value="accessibility"
              className="flex-1 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm"
            >
              Métricas WCAG
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Gestión de Usuarios</h2>
              <button className="btn-primary" aria-label="Agregar nuevo usuario">
                Agregar Usuario
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preferencias
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score Accesibilidad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden">
                              <Avatar.Image
                                src={user.avatar}
                                alt={`Foto de ${user.name}`}
                              />
                              <Avatar.Fallback className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </Avatar.Fallback>
                            </Avatar.Root>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {getRoleText(user.role)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex flex-wrap gap-1">
                            {user.accessibilityPreferences.highContrast && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Alto contraste
                              </span>
                            )}
                            {user.accessibilityPreferences.easyReading && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Lectura fácil
                              </span>
                            )}
                            {user.accessibilityPreferences.screenReader && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Lector pantalla
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${calculateAccessibilityScore(user)}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-900">{calculateAccessibilityScore(user)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              className="text-primary-600 hover:text-primary-900"
                              aria-label={`Editar usuario ${user.name}`}
                            >
                              Editar
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              aria-label={`Eliminar usuario ${user.name}`}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="accessibility" className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Métricas de Accesibilidad WCAG 2.1</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Accessibility Features Chart */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Características de Accesibilidad</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Navegación por teclado</span>
                    <span className="text-sm font-medium text-gray-900">
                      {accessibilityMetrics.keyboardNavigationUsers} usuarios
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(accessibilityMetrics.keyboardNavigationUsers / accessibilityMetrics.totalUsers) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lectura fácil</span>
                    <span className="text-sm font-medium text-gray-900">
                      {accessibilityMetrics.easyReadingUsers} usuarios
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(accessibilityMetrics.easyReadingUsers / accessibilityMetrics.totalUsers) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Alto contraste</span>
                    <span className="text-sm font-medium text-gray-900">
                      {accessibilityMetrics.highContrastUsers} usuarios
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{ width: `${(accessibilityMetrics.highContrastUsers / accessibilityMetrics.totalUsers) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lector de pantalla</span>
                    <span className="text-sm font-medium text-gray-900">
                      {accessibilityMetrics.screenReaderUsers} usuarios
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(accessibilityMetrics.screenReaderUsers / accessibilityMetrics.totalUsers) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Compliance Summary */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Cumplimiento</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-800">WCAG 2.1 AA</span>
                    <span className="text-sm font-bold text-green-800">95%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-yellow-800">Navegación por teclado</span>
                    <span className="text-sm font-bold text-yellow-800">89%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">Contraste de colores</span>
                    <span className="text-sm font-bold text-blue-800">92%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-purple-800">Texto alternativo</span>
                    <span className="text-sm font-bold text-purple-800">88%</span>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}; 