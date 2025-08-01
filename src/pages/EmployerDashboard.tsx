import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { JobPosting, JobApplication } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import * as Tabs from '@radix-ui/react-tabs';
import * as Avatar from '@radix-ui/react-avatar';

// Mock data
const mockJobs: JobPosting[] = [
  {
    id: '1',
    title: 'Desarrollador Frontend Accesible',
    company: 'TechAccesible',
    location: 'Bogotá, Colombia',
    type: 'full-time',
    category: 'Desarrollo',
    description: 'Buscamos un desarrollador frontend especializado en accesibilidad web.',
    requirements: ['React/TypeScript', 'WCAG 2.1', 'Testing de accesibilidad'],
    benefits: ['Trabajo remoto', 'Horario flexible'],
    salary: { min: 3000000, max: 5000000, currency: 'COP' },
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
    isAccessible: true,
    accessibilityFeatures: ['Lector de pantalla', 'Navegación por teclado']
  },
  {
    id: '2',
    title: 'UX Designer Inclusivo',
    company: 'TechAccesible',
    location: 'Medellín, Colombia',
    type: 'contract',
    category: 'Diseño',
    description: 'Diseñador UX enfocado en accesibilidad.',
    requirements: ['Figma', 'Testing con usuarios', 'Accesibilidad'],
    benefits: ['Proyectos diversos', 'Crecimiento profesional'],
    salary: { min: 2500000, max: 4000000, currency: 'COP' },
    postedDate: '2024-01-10',
    deadline: '2024-02-10',
    isAccessible: true,
    accessibilityFeatures: ['Diseño inclusivo']
  }
];

const mockApplications: JobApplication[] = [
  {
    id: '1',
    jobId: '1',
    candidateId: '1',
    status: 'pending',
    appliedDate: '2024-01-20',
    coverLetter: 'Experiencia en desarrollo accesible...',
    accessibilityNotes: 'Utiliza lector de pantalla NVDA'
  },
  {
    id: '2',
    jobId: '1',
    candidateId: '2',
    status: 'reviewed',
    appliedDate: '2024-01-18',
    coverLetter: 'Especialista en React y accesibilidad...',
    accessibilityNotes: 'Preferencia por alto contraste'
  }
];

export const EmployerDashboard: React.FC = () => {
  const [jobs] = useState<JobPosting[]>(mockJobs);
  const [applications] = useState<JobApplication[]>(mockApplications);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'reviewed': return 'Revisado';
      case 'shortlisted': return 'Preseleccionado';
      case 'rejected': return 'Rechazado';
      case 'hired': return 'Contratado';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Panel del Empleador
              </h1>
              <p className="text-gray-600">
                Gestiona tus ofertas de empleo y candidatos
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/employer/jobs/new"
                className="btn-primary"
                aria-label="Crear nueva oferta"
              >
                Crear Oferta
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ofertas Activas</p>
                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Postulaciones</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Candidatos</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(applications.map(app => app.candidateId)).size}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs.Root defaultValue="jobs" className="space-y-6">
          <Tabs.List className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <Tabs.Trigger
              value="jobs"
              className="flex-1 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm"
            >
              Mis Ofertas
            </Tabs.Trigger>
            <Tabs.Trigger
              value="applications"
              className="flex-1 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm"
            >
              Postulaciones
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="jobs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Ofertas de Empleo</h2>
              <Link
                to="/employer/jobs/new"
                className="btn-primary"
                aria-label="Crear nueva oferta de empleo"
              >
                Crear Oferta
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Oferta
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ubicación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Postulaciones
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500">{job.company}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job.type === 'full-time' ? 'Tiempo completo' : 
                           job.type === 'part-time' ? 'Tiempo parcial' :
                           job.type === 'contract' ? 'Contrato' : 'Pasantía'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {applications.filter(app => app.jobId === job.id).length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Activa
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              className="text-primary-600 hover:text-primary-900"
                              aria-label={`Editar oferta ${job.title}`}
                            >
                              Editar
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              aria-label={`Cerrar oferta ${job.title}`}
                            >
                              Cerrar
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

          <Tabs.Content value="applications" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Postulaciones Recibidas</h2>
              <button
                className="btn-secondary"
                aria-label="Marcar todas como leídas"
              >
                Marcar como leídas
              </button>
            </div>

            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="card">
                  <div className="flex items-start space-x-4">
                    <Avatar.Root className="w-12 h-12 rounded-full overflow-hidden">
                      <Avatar.Image
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                        alt="Foto del candidato"
                      />
                      <Avatar.Fallback className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </Avatar.Fallback>
                    </Avatar.Root>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Candidato #{application.candidateId}
                          </h3>
                          <p className="text-gray-600">
                            Para: {jobs.find(job => job.id === application.jobId)?.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Postulado: {formatDate(application.appliedDate)}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusText(application.status)}
                        </span>
                      </div>

                      {application.accessibilityNotes && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-900 mb-1">
                            Notas de accesibilidad:
                          </h4>
                          <p className="text-sm text-blue-700">{application.accessibilityNotes}</p>
                        </div>
                      )}

                      <div className="mt-4 flex space-x-2">
                        <button className="btn-primary">
                          Ver CV
                        </button>
                        <button className="btn-secondary">
                          Ver Detalles
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Enviar Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}; 