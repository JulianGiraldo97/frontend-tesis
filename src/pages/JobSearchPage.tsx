import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const JobSearchPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Tailwind Test Element */}
      <div className="bg-red-500 text-white p-4 m-4 border-2 border-blue-500">
        🎨 Tailwind Test: Si ves este elemento con fondo rojo y borde azul, Tailwind está funcionando
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Encuentra tu empleo ideal
          </h1>
          <p className="text-xl text-gray-600">
            Plataforma accesible de intermediación laboral
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Filtros de búsqueda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de contrato
              </label>
              <select className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-base transition-all duration-200">
                <option value="">Todos los tipos</option>
                <option value="full-time">Tiempo completo</option>
                <option value="part-time">Tiempo parcial</option>
                <option value="contract">Contrato</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <input
                id="easy-reading"
                type="checkbox"
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="easy-reading" className="ml-3 block text-sm font-medium text-gray-700">
                Modo lectura fácil
              </label>
            </div>
            <Button size="lg">
              🔍 Buscar empleos
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((job) => (
            <div key={job} className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-12 w-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">TC</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          Desarrollador Frontend React
                        </h3>
                        <p className="text-lg text-gray-600">TechCorp Inc.</p>
                      </div>
                    </div>
                    <p className="text-lg text-gray-500 mb-4">
                      📍 Madrid, España • ⏰ Tiempo completo • 💰 $45,000 - $60,000
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Buscamos un desarrollador Frontend con experiencia en React y TypeScript
                      para unirse a nuestro equipo de desarrollo de aplicaciones accesibles.
                      Ideal para personas comprometidas con la inclusión digital.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        React
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        TypeScript
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        Accesible
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        WCAG 2.1
                      </span>
                    </div>
                  </div>
                  <div className="ml-8 flex flex-col space-y-3">
                    <Button size="lg">
                      📝 Postularse
                    </Button>
                    <Button variant="outline" size="lg">
                      💾 Guardar
                    </Button>
                    <Button variant="outline" size="sm">
                      👁️ Ver detalles
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 