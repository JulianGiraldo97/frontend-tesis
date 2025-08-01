import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const JobSearchPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Búsqueda de Empleos</h1>
            <Button variant="outline">
              Volver al dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search Filters */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Filtros de búsqueda</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="text"
                label="Palabras clave"
                placeholder="React, TypeScript, Frontend..."
              />
              <Input
                type="text"
                label="Ubicación"
                placeholder="Madrid, España"
              />
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                <option value="">Tipo de contrato</option>
                <option value="full-time">Tiempo completo</option>
                <option value="part-time">Tiempo parcial</option>
                <option value="contract">Contrato</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="easy-reading"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="easy-reading" className="ml-2 block text-sm text-gray-900">
                  Modo lectura fácil
                </label>
              </div>
              <Button>
                Buscar empleos
              </Button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((job) => (
              <div key={job} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Desarrollador Frontend React
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">TechCorp Inc.</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Madrid, España • Tiempo completo • $45,000 - $60,000
                      </p>
                      <p className="text-gray-600 mb-4">
                        Buscamos un desarrollador Frontend con experiencia en React y TypeScript 
                        para unirse a nuestro equipo de desarrollo de aplicaciones accesibles.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          React
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          TypeScript
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Accesible
                        </span>
                      </div>
                    </div>
                    <div className="ml-6 flex flex-col space-y-2">
                      <Button size="sm">
                        Postularse
                      </Button>
                      <Button variant="outline" size="sm">
                        Guardar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}; 