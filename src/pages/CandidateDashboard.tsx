import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Candidate, PersonalInfo, Education, Experience } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import * as Accordion from '@radix-ui/react-accordion';
import * as Avatar from '@radix-ui/react-avatar';

// Mock data
const mockCandidate: Candidate = {
  id: '1',
  userId: '1',
  personalInfo: {
    firstName: 'María',
    lastName: 'González',
    email: 'maria.gonzalez@email.com',
    phone: '+57 300 123 4567',
    location: 'Bogotá, Colombia',
    disability: ['Discapacidad visual'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  education: [
    {
      id: '1',
      institution: 'Universidad Nacional de Colombia',
      degree: 'Ingeniería de Sistemas',
      field: 'Ingeniería',
      startDate: '2018-01',
      endDate: '2022-12',
      description: 'Especialización en desarrollo de software accesible',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'TechAccesible',
      position: 'Desarrolladora Frontend',
      startDate: '2023-01',
      endDate: '2023-12',
      description: 'Desarrollo de aplicaciones web accesibles con React y TypeScript',
      achievements: [
        'Implementé características de accesibilidad WCAG 2.1 AA',
        'Reduje el tiempo de carga en un 30%',
        'Mentoré a 3 desarrolladores junior',
      ],
    },
  ],
  skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'WCAG', 'Testing'],
  accessibilityNeeds: ['Lector de pantalla', 'Alto contraste', 'Navegación por teclado'],
  resumeUrl: '/resume.pdf',
};

export const CandidateDashboard: React.FC = () => {
  const { user } = useAuth();
  const [candidate] = useState<Candidate>(mockCandidate);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ¡Hola, {candidate.personalInfo.firstName}!
              </h1>
              <p className="text-gray-600">
                Bienvenido a tu panel de candidato
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="btn-secondary"
                aria-label="Ir a perfil"
              >
                Mi Perfil
              </Link>
              <Link
                to="/jobs"
                className="btn-primary"
                aria-label="Buscar empleos"
              >
                Buscar Empleos
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="space-y-2" aria-label="Navegación principal">
              <Link
                to="/dashboard"
                className="sidebar-nav-item active"
                aria-current="page"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
                Dashboard
              </Link>
              
              <Link
                to="/jobs"
                className="sidebar-nav-item"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar Empleos
              </Link>
              
              <Link
                to="/applications"
                className="sidebar-nav-item"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Mis Postulaciones
              </Link>
              
              <Link
                to="/profile"
                className="sidebar-nav-item"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mi Perfil
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-2 space-y-6">
            {/* Profile Summary Card */}
            <div className="card">
              <div className="flex items-start space-x-4">
                <Avatar.Root className="w-20 h-20 rounded-full overflow-hidden">
                  <Avatar.Image
                    src={candidate.personalInfo.avatar}
                    alt={`Foto de ${candidate.personalInfo.firstName} ${candidate.personalInfo.lastName}`}
                  />
                  <Avatar.Fallback className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Avatar.Fallback>
                </Avatar.Root>
                
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {candidate.personalInfo.firstName} {candidate.personalInfo.lastName}
                  </h2>
                  <p className="text-gray-600">{candidate.personalInfo.email}</p>
                  <p className="text-gray-600">{candidate.personalInfo.location}</p>
                  
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Necesidades de accesibilidad:</h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.accessibilityNeeds.map((need, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={handleSaveChanges}
                    disabled={isLoading}
                    className="btn-primary"
                    aria-describedby={isLoading ? 'saving-status' : undefined}
                  >
                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                  
                  {isLoading && (
                    <p id="saving-status" className="sr-only" aria-live="polite">
                      Guardando cambios...
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Expandable Sections */}
            <Accordion.Root type="single" collapsible className="space-y-4">
              {/* Personal Information */}
              <Accordion.Item value="personal" className="card">
                <Accordion.Header>
                  <Accordion.Trigger className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 hover:text-primary-600 focus:outline-none focus:text-primary-600">
                    <span>Datos Personales</span>
                    <svg className="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre</label>
                      <input
                        type="text"
                        defaultValue={candidate.personalInfo.firstName}
                        className="input-field"
                        aria-label="Nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Apellido</label>
                      <input
                        type="text"
                        defaultValue={candidate.personalInfo.lastName}
                        className="input-field"
                        aria-label="Apellido"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        defaultValue={candidate.personalInfo.email}
                        className="input-field"
                        aria-label="Email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                      <input
                        type="tel"
                        defaultValue={candidate.personalInfo.phone}
                        className="input-field"
                        aria-label="Teléfono"
                      />
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Education */}
              <Accordion.Item value="education" className="card">
                <Accordion.Header>
                  <Accordion.Trigger className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 hover:text-primary-600 focus:outline-none focus:text-primary-600">
                    <span>Formación Académica</span>
                    <svg className="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="mt-4 space-y-4">
                  {candidate.education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900">{edu.institution}</h4>
                      <p className="text-gray-600">{edu.degree} - {edu.field}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startDate} - {edu.endDate || 'Presente'}
                      </p>
                      {edu.description && (
                        <p className="text-gray-600 mt-2">{edu.description}</p>
                      )}
                    </div>
                  ))}
                  <button className="btn-secondary">
                    Agregar Formación
                  </button>
                </Accordion.Content>
              </Accordion.Item>

              {/* Experience */}
              <Accordion.Item value="experience" className="card">
                <Accordion.Header>
                  <Accordion.Trigger className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 hover:text-primary-600 focus:outline-none focus:text-primary-600">
                    <span>Experiencia Laboral</span>
                    <svg className="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="mt-4 space-y-4">
                  {candidate.experience.map((exp) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate || 'Presente'}
                      </p>
                      <p className="text-gray-600 mt-2">{exp.description}</p>
                      {exp.achievements.length > 0 && (
                        <div className="mt-3">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Logros:</h5>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {exp.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                  <button className="btn-secondary">
                    Agregar Experiencia
                  </button>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </main>
        </div>
      </div>
    </div>
  );
}; 