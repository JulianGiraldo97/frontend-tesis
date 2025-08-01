import React from 'react';
import { Button } from '../components/Button';

export const CandidateDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Candidato</h1>
              <p className="text-gray-600">Bienvenido, Juan Pérez</p>
            </div>
            <Button variant="outline">
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CV Summary Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">JP</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Mi CV</h3>
                    <p className="text-sm text-gray-500">Última actualización: hace 2 días</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full">
                    Ver CV completo
                  </Button>
                </div>
              </div>
            </div>

            {/* Job Applications */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Postulaciones</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Enviadas</span>
                    <span className="text-lg font-semibold text-green-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">En revisión</span>
                    <span className="text-lg font-semibold text-yellow-600">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Aceptadas</span>
                    <span className="text-lg font-semibold text-blue-600">2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Acciones rápidas</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    Buscar empleos
                  </Button>
                  <Button variant="outline" className="w-full">
                    Actualizar CV
                  </Button>
                  <Button variant="outline" className="w-full">
                    Ver mensajes
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Job Recommendations */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Empleos recomendados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((job) => (
                <div key={job} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Desarrollador Frontend React
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">TechCorp Inc.</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Madrid, España • Tiempo completo • $45,000 - $60,000
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Postularse
                      </Button>
                      <Button variant="outline" size="sm">
                        Guardar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 