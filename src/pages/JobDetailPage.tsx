import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { JobPosting } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAccessibility } from '@/context/AccessibilityContext';
import * as Accordion from '@radix-ui/react-accordion';

// Mock data
const mockJob: JobPosting = {
  id: '1',
  title: 'Desarrollador Frontend Accesible',
  company: 'TechAccesible',
  location: 'Bogotá, Colombia',
  type: 'full-time',
  category: 'Desarrollo',
  description: 'Buscamos un desarrollador frontend especializado en accesibilidad web para crear aplicaciones inclusivas que cumplan con los estándares WCAG 2.1 AA. El candidato ideal tendrá experiencia en React, TypeScript y conocimientos profundos de accesibilidad web.',
  requirements: [
    'Experiencia sólida en React y TypeScript',
    'Conocimientos avanzados de WCAG 2.1 AA',
    'Experiencia con lectores de pantalla (NVDA, JAWS, VoiceOver)',
    'Testing de accesibilidad con herramientas como axe-core',
    'Conocimientos de HTML semántico y ARIA',
    'Experiencia con herramientas de testing automatizado',
    'Capacidad de trabajo en equipo y comunicación efectiva'
  ],
  benefits: [
    'Trabajo remoto con horario flexible',
    'Capacitación continua en accesibilidad',
    'Seguro médico y dental',
    'Bonos por proyectos exitosos',
    'Ambiente de trabajo inclusivo',
    'Oportunidades de crecimiento profesional',
    'Impacto social en la inclusión digital'
  ],
  salary: {
    min: 3000000,
    max: 5000000,
    currency: 'COP'
  },
  postedDate: '2024-01-15',
  deadline: '2024-02-15',
  isAccessible: true,
  accessibilityFeatures: [
    'Lector de pantalla compatible',
    'Navegación por teclado completa',
    'Alto contraste disponible',
    'Lectura fácil activada',
    'Subtítulos en videos',
    'Descripciones de audio'
  ]
};

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isEasyReading } = useAccessibility();
  const [job, setJob] = useState<JobPosting | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadJob = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setJob(mockJob);
      setIsLoading(false);
    };

    loadJob();
  }, [id]);

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Empleo no encontrado</h1>
          <Link to="/jobs" className="btn-primary">
            Volver a la búsqueda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-4">
            <Link
              to="/jobs"
              className="text-gray-500 hover:text-gray-700"
              aria-label="Volver a búsqueda de empleos"
            >
              Empleos
            </Link>
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900 font-medium">{job.title}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className={`font-bold text-gray-900 mb-2 ${isEasyReading ? 'text-3xl' : 'text-2xl'}`}>
                    {job.title}
                  </h1>
                  <p className="text-xl text-gray-600 font-medium">{job.company}</p>
                  <p className="text-gray-500">{job.location}</p>
                </div>
                {job.isAccessible && (
                  <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-green-800">Empleo Accesible</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  <span className="text-gray-600">
                    {job.type === 'full-time' ? 'Tiempo completo' : 
                     job.type === 'part-time' ? 'Tiempo parcial' :
                     job.type === 'contract' ? 'Contrato' : 'Pasantía'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-gray-600">{formatSalary(job.salary)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">Publicado: {formatDate(job.postedDate)}</span>
                </div>
                {job.deadline && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">Fecha límite: {formatDate(job.deadline)}</span>
                  </div>
                )}
              </div>

              <p className={`text-gray-700 mb-6 ${isEasyReading ? 'text-lg leading-relaxed' : 'text-base'}`}>
                {job.description}
              </p>

              {/* Accessibility Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características de Accesibilidad</h3>
                <div className="flex flex-wrap gap-2">
                  {job.accessibilityFeatures.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Requirements and Benefits */}
            <Accordion.Root type="single" collapsible className="space-y-4">
              <Accordion.Item value="requirements" className="card">
                <Accordion.Header>
                  <Accordion.Trigger className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 hover:text-primary-600 focus:outline-none focus:text-primary-600">
                    <span>Requisitos</span>
                    <svg className="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="mt-4">
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="benefits" className="card">
                <Accordion.Header>
                  <Accordion.Trigger className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 hover:text-primary-600 focus:outline-none focus:text-primary-600">
                    <span>Beneficios</span>
                    <svg className="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="mt-4">
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Te interesa esta oferta?</h3>
                <p className="text-gray-600 mb-6">
                  Si cumples con los requisitos y te interesa esta posición, no dudes en postularte.
                </p>
                
                <Link
                  to={`/apply/${job.id}`}
                  className="btn-primary w-full mb-4"
                  aria-label={`Postularme para ${job.title}`}
                >
                  Postularme
                </Link>
                
                <button className="btn-secondary w-full mb-4">
                  Guardar para después
                </button>
                
                <button className="text-primary-600 hover:text-primary-500 font-medium w-full">
                  Compartir oferta
                </button>
              </div>

              <div className="card mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la empresa</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{job.company}</p>
                    <p className="text-sm text-gray-600">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Categoría</p>
                    <p className="text-sm text-gray-600">{job.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tipo de contrato</p>
                    <p className="text-sm text-gray-600">
                      {job.type === 'full-time' ? 'Tiempo completo' : 
                       job.type === 'part-time' ? 'Tiempo parcial' :
                       job.type === 'contract' ? 'Contrato' : 'Pasantía'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 