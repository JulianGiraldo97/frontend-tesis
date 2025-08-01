import React from 'react';
import { JobPosting, JobApplication } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const EmployerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Panel de Empleador</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job Postings */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Vacantes Activas</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Gestiona tus ofertas de trabajo publicadas.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Ver vacantes
                </button>
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Postulaciones</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Revisa las candidaturas recibidas.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Ver postulaciones
                </button>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Métricas y estadísticas de tus vacantes.
                </p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                  Ver analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 