import React, { useState } from 'react';
import { JobDetailModal } from '../components/JobDetailModal';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  contractType: string;
  description: string;
  requirements: string[];
  benefits: string[];
  match: string;
  postedDate: string;
  applications: number;
}

export const JobSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [contractType, setContractType] = useState('');
  const [easyReading, setEasyReading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  // Mock data for jobs
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Acomodador de Cajas - Personas con Discapacidad Cognitiva',
      company: 'Supermercado Inclusivo S.L.',
      location: 'Madrid, España',
      salary: '€18,000 - €22,000',
      contractType: 'Tiempo completo',
      description: 'Buscamos personas con discapacidad cognitiva para trabajar como acomodadores de cajas en nuestro supermercado. Tareas de organización, clasificación y mantenimiento del orden en las estanterías. Entorno de trabajo estructurado y apoyo continuo.',
      requirements: [
        'Motivación y ganas de trabajar',
        'Capacidad de seguir instrucciones simples',
        'Aptitud para tareas repetitivas',
        'Trabajo en equipo',
        'No requiere experiencia previa'
      ],
      benefits: [
        'Apoyo personalizado continuo',
        'Horario estructurado (mañana)',
        'Formación adaptada',
        'Entorno de trabajo tranquilo',
        'Seguimiento profesional'
      ],
      match: '98%',
      postedDate: 'Hace 2 días',
      applications: 8
    },
    {
      id: '2',
      title: 'Operador de Telefonía - Personas Sordas',
      company: 'Centro de Atención Telefónica Inclusivo',
      location: 'Barcelona, España',
      salary: '€20,000 - €25,000',
      contractType: 'Tiempo completo',
      description: 'Buscamos personas sordas para trabajar como operadores de telefonía usando tecnologías de comunicación adaptadas. Atención al cliente a través de chat, email y videollamadas con intérprete.',
      requirements: [
        'Persona sorda con certificado de discapacidad',
        'Buen nivel de escritura en español',
        'Habilidades de comunicación escrita',
        'Capacidad de trabajo en equipo',
        'Formación básica en informática'
      ],
      benefits: [
        'Tecnologías de comunicación adaptadas',
        'Intérprete de lengua de señas disponible',
        'Horario flexible',
        'Seguro médico',
        'Entorno de trabajo inclusivo'
      ],
      match: '92%',
      postedDate: 'Hace 1 semana',
      applications: 5
    },
    {
      id: '3',
      title: 'Tester de Accesibilidad - Personas Ciegas',
      company: 'Empresa de Desarrollo de Software',
      location: 'Valencia, España',
      salary: '€25,000 - €32,000',
      contractType: 'Tiempo completo',
      description: 'Buscamos personas ciegas para trabajar como testers de accesibilidad. Evaluación de aplicaciones y sitios web usando lectores de pantalla y otras tecnologías asistivas.',
      requirements: [
        'Persona ciega con experiencia en lectores de pantalla',
        'Conocimientos básicos de informática',
        'Capacidad de reportar problemas de accesibilidad',
        'Paciencia y atención al detalle',
        'No requiere formación técnica previa'
      ],
      benefits: [
        'Equipamiento adaptado completo',
        'Formación en testing de accesibilidad',
        'Trabajo remoto disponible',
        'Horario flexible',
        'Impacto directo en la accesibilidad digital'
      ],
      match: '95%',
      postedDate: 'Hace 2 semanas',
      applications: 12
    },
    {
      id: '4',
      title: 'Ayudante de Cocina - Personas con Discapacidad Cognitiva',
      company: 'Restaurante Inclusivo',
      location: 'Sevilla, España',
      salary: '€16,000 - €20,000',
      contractType: 'Tiempo completo',
      description: 'Buscamos personas con discapacidad cognitiva para trabajar como ayudantes de cocina. Tareas de limpieza, preparación básica de ingredientes y apoyo en la cocina.',
      requirements: [
        'Motivación y ganas de aprender',
        'Capacidad de seguir instrucciones',
        'Trabajo en equipo',
        'Responsabilidad',
        'No requiere experiencia previa'
      ],
      benefits: [
        'Apoyo personalizado continuo',
        'Horario de mañana',
        'Formación en cocina básica',
        'Comida incluida',
        'Entorno de trabajo acogedor'
      ],
      match: '90%',
      postedDate: 'Hace 3 semanas',
      applications: 15
    },
    {
      id: '5',
      title: 'Mensajero - Personas Sordas',
      company: 'Empresa de Mensajería Inclusiva',
      location: 'Bilbao, España',
      salary: '€19,000 - €24,000',
      contractType: 'Tiempo completo',
      description: 'Buscamos personas sordas para trabajar como mensajeros. Entrega de paquetes y documentos usando aplicaciones móviles adaptadas y comunicación por texto.',
      requirements: [
        'Persona sorda con certificado de discapacidad',
        'Carnet de conducir',
        'Uso de aplicaciones móviles',
        'Responsabilidad y puntualidad',
        'Buen estado físico'
      ],
      benefits: [
        'Vehículo de empresa',
        'Aplicaciones adaptadas',
        'Horario flexible',
        'Seguro médico',
        'Independencia en el trabajo'
      ],
      match: '85%',
      postedDate: 'Hace 1 semana',
      applications: 7
    },
    {
      id: '6',
      title: 'Organizador de Archivos - Personas con Discapacidad Cognitiva',
      company: 'Oficina Administrativa Inclusiva',
      location: 'Málaga, España',
      salary: '€17,000 - €21,000',
      contractType: 'Tiempo completo',
      description: 'Buscamos personas con discapacidad cognitiva para trabajar en organización de archivos y documentos. Tareas de clasificación, ordenación y mantenimiento de archivos.',
      requirements: [
        'Capacidad de organización',
        'Aptitud para tareas repetitivas',
        'Trabajo en equipo',
        'Motivación',
        'No requiere experiencia previa'
      ],
      benefits: [
        'Apoyo personalizado continuo',
        'Horario estructurado',
        'Entorno de trabajo tranquilo',
        'Formación adaptada',
        'Seguimiento profesional'
      ],
      match: '88%',
      postedDate: 'Hace 4 días',
      applications: 10
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', { searchTerm, location, contractType, easyReading });
  };

  const handleApply = (jobId: string) => {
    setAppliedJobs(prev => [...prev, jobId]);
    console.log('Aplicando a empleo:', jobId);
    // Aquí se podría hacer una llamada a la API
  };

  const handleSave = (jobId: string) => {
    setSavedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
    console.log('Guardando empleo:', jobId);
  };

  const handleViewDetail = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleModalApply = (jobId: string) => {
    handleApply(jobId);
    handleCloseModal();
  };

  const handleModalSave = (jobId: string) => {
    handleSave(jobId);
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">
                Encuentra tu empleo ideal
              </h1>
              <p className="lead mb-5">
                Plataforma accesible de intermediación laboral diseñada para todos
              </p>
              <div className="d-flex justify-content-center gap-4 flex-wrap">
                <div className="bg-white bg-opacity-10 rounded-pill px-4 py-2 d-flex align-items-center">
                  <span className="fs-4 me-2">🎯</span>
                  <span className="fw-semibold">+1,234 empleos</span>
                </div>
                <div className="bg-white bg-opacity-10 rounded-pill px-4 py-2 d-flex align-items-center">
                  <span className="fs-4 me-2">🏢</span>
                  <span className="fw-semibold">+567 empresas</span>
                </div>
                <div className="bg-white bg-opacity-10 rounded-pill px-4 py-2 d-flex align-items-center">
                  <span className="fs-4 me-2">✅</span>
                  <span className="fw-semibold">100% accesible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Enhanced Search Filters */}
        <div className="card card-custom glass mb-5 animate-fade-in">
          <div className="card-body p-5">
            <h2 className="h3 fw-bold text-dark mb-4 d-flex align-items-center">
              <span className="fs-3 me-3">🔍</span>
              Filtros de búsqueda
            </h2>

            <form onSubmit={handleSearch}>
              <div className="row g-4 mb-4">
                <div className="col-md-4">
                  <label htmlFor="searchTerm" className="form-label fw-semibold">
                    Palabras clave
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="React, TypeScript, Frontend..."
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="location" className="form-label fw-semibold">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Madrid, España"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="contractType" className="form-label fw-semibold">
                    Tipo de contrato
                  </label>
                  <select
                    className="form-select form-control-custom"
                    id="contractType"
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value)}
                  >
                    <option value="">Todos los tipos</option>
                    <option value="full-time">Tiempo completo</option>
                    <option value="part-time">Tiempo parcial</option>
                    <option value="contract">Contrato</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="easyReading"
                      checked={easyReading}
                      onChange={(e) => setEasyReading(e.target.checked)}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="easyReading">
                      Modo lectura fácil
                    </label>
                  </div>
                  <div className="d-flex align-items-center text-muted">
                    <span className="fs-5 me-2">♿</span>
                    <span>Accesible</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-custom px-4 py-3"
                  aria-label="Buscar empleos con los filtros seleccionados"
                >
                  <span className="fs-5 me-2">🔍</span>
                  Buscar empleos
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Job Listings */}
        <div className="row g-4">
          {mockJobs.map((job) => (
            <div key={job.id} className="col-12">
              <div className="card card-custom animate-fade-in">
                <div className="card-body p-4">
                  <div className="row align-items-start">
                    <div className="col-md-8">
                      <div className="d-flex align-items-center mb-3">
                        <div
                          className="bg-gradient-primary rounded-3 d-flex align-items-center justify-content-center me-3"
                          style={{ width: '60px', height: '60px' }}
                          aria-hidden="true"
                        >
                          <span className="text-white fw-bold fs-5">{job.company.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="h4 fw-bold text-dark mb-1">
                            {job.title}
                          </h3>
                          <p className="text-muted fw-semibold mb-0">{job.company}</p>
                        </div>
                      </div>

                      <div className="d-flex flex-wrap gap-4 mb-3 text-muted">
                        <span className="d-flex align-items-center">
                          <span className="fs-5 me-2">📍</span>
                          <span>{job.location}</span>
                        </span>
                        <span className="d-flex align-items-center">
                          <span className="fs-5 me-2">⏰</span>
                          <span>{job.contractType}</span>
                        </span>
                        <span className="d-flex align-items-center">
                          <span className="fs-5 me-2">💰</span>
                          <span>{job.salary}</span>
                        </span>
                      </div>

                      <p className="text-muted mb-3">
                        {job.description}
                      </p>

                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-primary rounded-pill px-3 py-2">React</span>
                        <span className="badge bg-info rounded-pill px-3 py-2">TypeScript</span>
                        <span className="badge bg-success rounded-pill px-3 py-2">Accesible</span>
                        <span className="badge bg-warning rounded-pill px-3 py-2">WCAG 2.1</span>
                      </div>
                    </div>

                    <div className="col-md-4 mt-3 mt-md-0">
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-primary btn-custom"
                          onClick={() => handleApply(job.id)}
                          disabled={appliedJobs.includes(job.id)}
                          aria-label={`${appliedJobs.includes(job.id) ? 'Ya postulado' : 'Postularse a'} ${job.title}`}
                        >
                          <span className="fs-5 me-2">
                            {appliedJobs.includes(job.id) ? '✅' : '📝'}
                          </span>
                          {appliedJobs.includes(job.id) ? 'Postulado' : 'Postularse'}
                        </button>
                        <button
                          className={`btn ${savedJobs.includes(job.id) ? 'btn-success' : 'btn-outline-primary'} btn-custom`}
                          onClick={() => handleSave(job.id)}
                          aria-label={`${savedJobs.includes(job.id) ? 'Quitar de guardados' : 'Guardar'} ${job.title}`}
                        >
                          <span className="fs-5 me-2">💾</span>
                          {savedJobs.includes(job.id) ? 'Guardado' : 'Guardar'}
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-custom"
                          onClick={() => handleViewDetail(job)}
                          aria-label={`Ver detalles del empleo ${job.title}`}
                        >
                          <span className="fs-5 me-2">👁️</span>
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more button */}
        <div className="text-center mt-5">
          <button
            className="btn btn-outline-primary btn-custom px-5 py-3"
            aria-label="Cargar más empleos"
          >
            <span className="fs-5 me-2">📄</span>
            Cargar más empleos
          </button>
        </div>
      </div>

      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleModalApply}
        onSave={handleModalSave}
        isSaved={selectedJob ? savedJobs.includes(selectedJob.id) : false}
        jobStatus={selectedJob && appliedJobs.includes(selectedJob.id) ? 'applied' : 'saved'}
      />
    </div>
  );
}; 
