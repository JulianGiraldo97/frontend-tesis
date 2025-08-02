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
      title: 'Desarrollador Frontend React',
      company: 'TechCorp Inc.',
      location: 'Madrid, España',
      salary: '$45,000 - $60,000',
      contractType: 'Tiempo completo',
      description: 'Buscamos un desarrollador Frontend con experiencia en React y TypeScript para unirse a nuestro equipo de desarrollo de aplicaciones accesibles. Ideal para personas comprometidas con la inclusión digital.',
      requirements: [
        'Experiencia mínima de 3 años con React',
        'Conocimientos sólidos de TypeScript',
        'Experiencia con CSS3 y HTML5',
        'Conocimientos de accesibilidad web (WCAG)',
        'Trabajo en equipo y comunicación efectiva'
      ],
      benefits: [
        'Horario flexible y trabajo remoto',
        'Seguro médico privado',
        'Plan de desarrollo profesional',
        'Equipamiento de trabajo',
        'Bonos por rendimiento'
      ],
      match: '95%',
      postedDate: 'Hace 2 días',
      applications: 45
    },
    {
      id: '2',
      title: 'UI/UX Developer',
      company: 'Digital Solutions',
      location: 'Barcelona, España',
      salary: '$40,000 - $55,000',
      contractType: 'Tiempo completo',
      description: 'Desarrollador UI/UX con experiencia en diseño de interfaces accesibles y experiencia de usuario inclusiva.',
      requirements: [
        'Experiencia en diseño de interfaces',
        'Conocimientos de Figma y Adobe XD',
        'Experiencia con CSS y JavaScript',
        'Conocimientos de accesibilidad',
        'Portfolio de proyectos'
      ],
      benefits: [
        'Trabajo remoto híbrido',
        'Seguro médico',
        'Capacitación continua',
        'Equipamiento Apple',
        'Horario flexible'
      ],
      match: '88%',
      postedDate: 'Hace 1 semana',
      applications: 32
    },
    {
      id: '3',
      title: 'Frontend Engineer',
      company: 'Innovation Labs',
      location: 'Valencia, España',
      salary: '$50,000 - $65,000',
      contractType: 'Tiempo completo',
      description: 'Ingeniero Frontend especializado en aplicaciones web accesibles y tecnologías modernas.',
      requirements: [
        '5+ años de experiencia en desarrollo frontend',
        'Experiencia con Vue.js y React',
        'Conocimientos de testing (Jest, Cypress)',
        'Experiencia con CI/CD',
        'Inglés fluido'
      ],
      benefits: [
        'Salario competitivo',
        'Stock options',
        'Seguro médico premium',
        'Gimnasio en oficina',
        'Flexibilidad horaria'
      ],
      match: '82%',
      postedDate: 'Hace 2 semanas',
      applications: 28
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
                        <div className="bg-gradient-primary rounded-3 d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
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
                        >
                          <span className="fs-5 me-2">
                            {appliedJobs.includes(job.id) ? '✅' : '📝'}
                          </span>
                          {appliedJobs.includes(job.id) ? 'Postulado' : 'Postularse'}
                        </button>
                        <button
                          className={`btn ${savedJobs.includes(job.id) ? 'btn-success' : 'btn-outline-primary'} btn-custom`}
                          onClick={() => handleSave(job.id)}
                        >
                          <span className="fs-5 me-2">💾</span>
                          {savedJobs.includes(job.id) ? 'Guardado' : 'Guardar'}
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-custom"
                          onClick={() => handleViewDetail(job)}
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
          <button className="btn btn-outline-primary btn-custom px-5 py-3">
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
      />
    </div>
  );
}; 