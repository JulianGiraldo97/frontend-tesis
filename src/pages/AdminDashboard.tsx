import React from 'react';
import { User } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Users Management */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Gestión de Usuarios</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Administra usuarios, roles y permisos del sistema.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Ver usuarios
                </button>
              </div>
            </div>

            {/* Accessibility Metrics */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Métricas de Accesibilidad</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Monitorea el cumplimiento WCAG 2.1 AA.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Ver métricas
                </button>
              </div>
            </div>

            {/* System Settings */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración del Sistema</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Configura parámetros generales de la plataforma.
                </p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                  Configurar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 