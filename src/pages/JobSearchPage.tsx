import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { JobPosting } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAccessibility } from '@/context/AccessibilityContext';
import * as Select from '@radix-ui/react-select';
import * as Checkbox from '@radix-ui/react-checkbox';

// Mock data
const mockJobs: JobPosting[] = [
  {
    id: '1',
    title: 'Desarrollador Frontend Accesible',
    company: 'TechAccesible',
    location: 'Bogotá, Colombia',
    type: 'full-time',
    category: 'Desarrollo',
    description: 'Buscamos un desarrollador frontend especializado en accesibilidad web para crear aplicaciones inclusivas.',
    requirements: [
      'React/TypeScript',
      'Conocimientos de WCAG 2.1',
      'Experiencia con lectores de pantalla',
      'Testing de accesibilidad'
    ],
    benefits: [
      'Trabajo remoto',
      'Horario flexible',
      'Capacitación en accesibilidad',
      'Seguro médico'
    ],
    salary: {
      min: 3000000,
      max: 5000000,
      currency: 'COP'
    },
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
    isAccessible: true,
    accessibilityFeatures: ['Lector de pantalla', 'Navegación por teclado', 'Alto contraste']
  },
  {
    id: '2',
    title: 'Especialista en UX Accesible',
    company: 'InclusivaTech',
    location: 'Medellín, Colombia',
    type: 'contract',
    category: 'Diseño',
    description: 'Diseñador UX enfocado en crear experiencias accesibles para usuarios con diferentes capacidades.',
    requirements: [
      'Figma/Adobe XD',
      'Investigación de usuarios',
      'Testing con usuarios con discapacidad',
      'Conocimientos de accesibilidad'
    ],
    benefits: [
      'Proyectos diversos',
      'Crecimiento profesional',
      'Impacto social'
    ],
    salary: {
      min: 2500000,
      max: 4000000,
      currency: 'COP'
    },
    postedDate: '2024-01-10',
    deadline: '2024-02-10',
    isAccessible: true,
    accessibilityFeatures: ['Diseño inclusivo', 'Testing accesible']
  },
  {
    id: '3',
    title: 'Analista de Datos',
    company: 'DataCorp',
    location: 'Cali, Colombia',
    type: 'full-time',
    category: 'Análisis',
    description: 'Analista de datos para proyectos de inclusión laboral y análisis de accesibilidad.',
    requirements: [
      'Python/R',
      'SQL',
      'Análisis estadístico',
      'Reportes accesibles'
    ],
    benefits: [
      'Trabajo híbrido',
      'Capacitación continua',
      'Proyectos de impacto social'
    ],
    salary: {
      min: 2800000,
      max: 4500000,
      currency: 'COP'
    },
    postedDate: '2024-01-12',
    deadline: '2024-02-12',
    isAccessible: true,
    accessibilityFeatures: ['Reportes en formatos accesibles', 'Visualizaciones inclusivas']
  }
];

const categories = [
  'Todas las categorías',
  'Desarrollo',
  'Diseño',
  'Análisis',
  'Marketing',
  'Ventas',
  'Administración'
];

const locations = [
  'Todas las ubicaciones',
  'Bogotá, Colombia',
  'Medellín, Colombia',
  'Cali, Colombia',
  'Barranquilla, Colombia',
  'Remoto'
];

const contractTypes = [
  'Todos los tipos',
  'full-time',
  'part-time',
  'contract',
  'internship'
];

export const JobSearchPage: React.FC = () => {
  const { isEasyReading } = useAccessibility();
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>(mockJobs);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: 'Todas las categorías',
    location: 'Todas las ubicaciones',
    contractType: 'Todos los tipos',
    accessibleOnly: false,
    easyReading: false
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    filterJobs();
  }, [filters, searchTerm]);

  const filterJobs = () => {
    let filtered = jobs;

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'Todas las categorías') {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    // Location filter
    if (filters.location !== 'Todas las ubicaciones') {
      filtered = filtered.filter(job => job.location === filters.location);
    }

    // Contract type filter
    if (filters.contractType !== 'Todos los tipos') {
      filtered = filtered.filter(job => job.type === filters.contractType);
    }

    // Accessible only filter
    if (filters.accessibleOnly) {
      filtered = filtered.filter(job => job.isAccessible);
    }

    setFilteredJobs(filtered);
  };

  const formatSalary = (salary: JobPosting['salary']) => {
    if (!salary) return 'Salario a convenir';
    return `$${(salary.min / 1000000).toFixed(1)}M - $${(salary.max / 1000000).toFixed(1)}M COP`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Buscar Empleos
              </h1>
              <p className="text-gray-600">
                Encuentra oportunidades laborales accesibles
              </p>
            </div>
            <Link
              to="/dashboard"
              className="btn-secondary"
              aria-label="Volver al dashboard"
            >
              Volver al Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Filtros de búsqueda
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar empleos
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Título, empresa o descripción..."
                className="input-field"
                aria-label="Buscar empleos"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <Select.Root
                value={filters.category}
                onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
              >
                <Select.Trigger className="input-field">
                  <Select.Value />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white border border-gray-300 rounded-lg shadow-lg">
                    <Select.Viewport>
                      {categories.map((category) => (
                        <Select.Item
                          key={category}
                          value={category}
                          className="px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer"
                        >
                          <Select.ItemText>{category}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <Select.Root
                value={filters.location}
                onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
              >
                <Select.Trigger className="input-field">
                  <Select.Value />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white border border-gray-300 rounded-lg shadow-lg">
                    <Select.Viewport>
                      {locations.map((location) => (
                        <Select.Item
                          key={location}
                          value={location}
                          className="px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer"
                        >
                          <Select.ItemText>{location}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>

          {/* Additional filters */}
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox.Root
                id="accessible-only"
                checked={filters.accessibleOnly}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, accessibleOnly: checked as boolean }))
                }
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              >
                <Checkbox.Indicator>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="accessible-only" className="text-sm text-gray-700">
                Solo empleos accesibles
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox.Root
                id="easy-reading"
                checked={filters.easyReading}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, easyReading: checked as boolean }))
                }
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              >
                <Checkbox.Indicator>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="easy-reading" className="text-sm text-gray-700">
                Modo lectura fácil
              </label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredJobs.length} empleos encontrados
            </h2>
            {isEasyReading && (
              <span className="text-sm text-primary-600 font-medium">
                Modo lectura fácil activado
              </span>
            )}
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron empleos con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="card hover:shadow-md transition-shadow duration-200"
                  role="article"
                  aria-labelledby={`job-title-${job.id}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3
                        id={`job-title-${job.id}`}
                        className={`font-semibold text-gray-900 mb-2 ${isEasyReading ? 'text-xl' : 'text-lg'}`}
                      >
                        <Link
                          to={`/jobs/${job.id}`}
                          className="hover:text-primary-600 focus:text-primary-600 focus:outline-none"
                        >
                          {job.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 font-medium">{job.company}</p>
                      <p className="text-gray-500 text-sm">{job.location}</p>
                    </div>
                    {job.isAccessible && (
                      <div className="flex items-center space-x-1">
                        <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-primary-600 font-medium">Accesible</span>
                      </div>
                    )}
                  </div>

                  <p className={`text-gray-600 mb-4 ${isEasyReading ? 'text-base leading-relaxed' : 'text-sm'}`}>
                    {job.description.length > 150 
                      ? `${job.description.substring(0, 150)}...` 
                      : job.description
                    }
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.accessibilityFeatures.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <p>Publicado: {formatDate(job.postedDate)}</p>
                      <p>Salario: {formatSalary(job.salary)}</p>
                    </div>
                    <Link
                      to={`/jobs/${job.id}`}
                      className="btn-primary"
                      aria-label={`Ver detalles de ${job.title}`}
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 