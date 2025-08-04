import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { JobDetailModal } from '../components/JobDetailModal';
import { AccessibilityNotification } from '../components/AccessibilityNotification';

interface RecommendedJob {
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

export const CandidateDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [notification, setNotification] = useState({
    message: '',
    type: 'info' as 'success' | 'info' | 'warning',
    isVisible: false
  });

  // Mock data for recommended jobs
  const recommendedJobs: RecommendedJob[] = [
    {
      id: 'rec1',
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Madrid, España',
      salary: '$60,000 - $80,000',
      contractType: 'Tiempo completo',
      description: 'Buscamos un desarrollador Senior React con experiencia en aplicaciones a gran escala y liderazgo técnico. Ideal para personas comprometidas con la excelencia y la innovación.',
      requirements: [
        '5+ años de experiencia con React',
        'Experiencia con TypeScript',
        'Conocimientos de arquitectura de aplicaciones',
        'Experiencia liderando equipos',
        'Inglés fluido'
      ],
      benefits: [
        'Salario competitivo',
        'Stock options',
        'Seguro médico premium',
        'Trabajo remoto híbrido',
        'Capacitación continua'
      ],
      match: '95%',
      postedDate: 'Hace 1 día',
      applications: 23
    },
    {
      id: 'rec2',
      title: 'Frontend Engineer',
      company: 'Digital Solutions',
      location: 'Barcelona, España',
      salary: '$50,000 - $70,000',
      contractType: 'Tiempo completo',
      description: 'Ingeniero Frontend especializado en Vue.js y React para aplicaciones web modernas y accesibles.',
      requirements: [
        '3+ años con Vue.js y React',
        'Experiencia con CSS3 y HTML5',
        'Conocimientos de accesibilidad',
        'Trabajo en equipo',
        'Portfolio de proyectos'
      ],
      benefits: [
        'Horario flexible',
        'Seguro médico',
        'Equipamiento de trabajo',
        'Bonos por rendimiento',
        'Desarrollo profesional'
      ],
      match: '88%',
      postedDate: 'Hace 2 días',
      applications: 18
    },
    {
      id: 'rec3',
      title: 'UI/UX Developer',
      company: 'Innovation Labs',
      location: 'Valencia, España',
      salary: '$45,000 - $65,000',
      contractType: 'Tiempo completo',
      description: 'Desarrollador UI/UX con enfoque en diseño de interfaces accesibles y experiencia de usuario inclusiva.',
      requirements: [
        'Experiencia en diseño de interfaces',
        'Conocimientos de Figma y Adobe XD',
        'Experiencia con CSS y JavaScript',
        'Conocimientos de accesibilidad WCAG',
        'Portfolio de proyectos'
      ],
      benefits: [
        'Trabajo remoto híbrido',
        'Seguro médico',
        'Capacitación continua',
        'Equipamiento Apple',
        'Horario flexible'
      ],
      match: '82%',
      postedDate: 'Hace 3 días',
      applications: 15
    }
  ];

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  };

  const handleViewJobDetail = (jobId: string) => {
    const job = recommendedJobs.find(job => job.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleModalApply = (jobId: string) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs(prev => [...prev, jobId]);
      showNotification('¡Postulación enviada exitosamente!', 'success');
    }
    handleCloseModal();
  };

  const handleModalSave = (jobId: string) => {
    const isCurrentlySaved = savedJobs.includes(jobId);
    if (isCurrentlySaved) {
      setSavedJobs(prev => prev.filter(id => id !== jobId));
      showNotification('Empleo eliminado de guardados', 'info');
    } else {
      setSavedJobs(prev => [...prev, jobId]);
      showNotification('Empleo guardado exitosamente', 'success');
    }
  };

  const handleQuickApply = (jobId: string) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs(prev => [...prev, jobId]);
      showNotification('¡Postulación enviada exitosamente!', 'success');
    } else {
      showNotification('Ya te has postulado a este empleo', 'warning');
    }
  };

  const handleQuickSave = (jobId: string) => {
    const isCurrentlySaved = savedJobs.includes(jobId);
    if (isCurrentlySaved) {
      setSavedJobs(prev => prev.filter(id => id !== jobId));
      showNotification('Empleo eliminado de guardados', 'info');
    } else {
      setSavedJobs(prev => [...prev, jobId]);
      showNotification('Empleo guardado exitosamente', 'success');
    }
  };

  const getJobStatus = (jobId: string) => {
    if (appliedJobs.includes(jobId)) {
      return 'applied';
    }
    return 'saved';
  };

  const getSelectedJobStatus = () => {
    if (!selectedJob) return 'saved';
    return getJobStatus(selectedJob.id);
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Accessibility Notification */}
      <AccessibilityNotification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />

      {/* Header Section */}
      <div className="bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold mb-2">¡Hola, {user?.name || 'Usuario'}!</h1>
              <p className="lead mb-0">Bienvenida a tu panel de candidata</p>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="d-flex align-items-center justify-content-md-end">
                <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                  <span className="text-white fw-bold fs-4">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <div>
                  <p className="mb-0 fw-semibold">{user?.name || 'Usuario'}</p>
                  <small className="text-white-50">Desarrolladora Frontend</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-2 text-primary">📝</span>
                </div>
                <h3 className="h2 fw-bold text-primary mb-2">{appliedJobs.length + 12}</h3>
                <p className="text-muted mb-0">Postulaciones</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-2 text-success">✅</span>
                </div>
                <h3 className="h2 fw-bold text-success mb-2">3</h3>
                <p className="text-muted mb-0">Entrevistas</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-2 text-info">👁️</span>
                </div>
                <h3 className="h2 fw-bold text-info mb-2">8</h3>
                <p className="text-muted mb-0">Vistas</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-2 text-warning">⭐</span>
                </div>
                <h3 className="h2 fw-bold text-warning mb-2">4.8</h3>
                <p className="text-muted mb-0">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-8">
            {/* Recent Applications */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Postulaciones Recientes</h3>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {[
                    { company: 'TechCorp Inc.', position: 'Desarrollador Frontend React', status: 'En revisión', date: 'Hace 2 días', color: 'primary' },
                    { company: 'Digital Solutions', position: 'UI/UX Developer', status: 'Entrevista programada', date: 'Hace 1 semana', color: 'success' },
                    { company: 'Innovation Labs', position: 'Frontend Engineer', status: 'Rechazada', date: 'Hace 2 semanas', color: 'danger' },
                    { company: 'StartupXYZ', position: 'React Developer', status: 'Pendiente', date: 'Hace 3 semanas', color: 'warning' }
                  ].map((app, index) => (
                    <div key={index} className="list-group-item border-0 px-0 py-3">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <h6 className="fw-bold mb-1">{app.position}</h6>
                          <p className="text-muted mb-0">{app.company}</p>
                        </div>
                        <div className="col-md-3">
                          <span className={`badge bg-${app.color} rounded-pill`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="col-md-3 text-md-end">
                          <small className="text-muted">{app.date}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-outline-primary btn-custom">
                    Ver todas las postulaciones
                  </button>
                </div>
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="card card-custom animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Empleos Recomendados</h3>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {recommendedJobs.map((job) => {
                    const isApplied = appliedJobs.includes(job.id);
                    const isSaved = savedJobs.includes(job.id);
                    
                    return (
                      <div key={job.id} className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="fw-bold mb-1">{job.title}</h6>
                              <span className="badge bg-success rounded-pill">{job.match}</span>
                            </div>
                            <p className="text-muted small mb-2">{job.company} • {job.location}</p>
                            <p className="text-primary fw-semibold mb-3">{job.salary}</p>
                            
                            {/* Status badge if applied */}
                            {isApplied && (
                              <div className="mb-2">
                                <span className="badge bg-primary rounded-pill">Postulado</span>
                              </div>
                            )}
                            
                            <div className="d-flex gap-2">
                              <button 
                                className={`btn ${isApplied ? 'btn-secondary' : 'btn-primary'} btn-sm flex-fill`}
                                onClick={() => handleQuickApply(job.id)}
                                disabled={isApplied}
                              >
                                <span className="fs-6 me-1">{isApplied ? '✅' : '📝'}</span>
                                {isApplied ? 'Postulado' : 'Postularse'}
                              </button>
                              <button 
                                className={`btn ${isSaved ? 'btn-success' : 'btn-outline-primary'} btn-sm`}
                                onClick={() => handleQuickSave(job.id)}
                              >
                                <span className="fs-6">💾</span>
                              </button>
                              <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => handleViewJobDetail(job.id)}
                              >
                                <span className="fs-6">👁️</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            {/* Profile Summary */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Mi Perfil</h3>
              </div>
              <div className="card-body text-center">
                <div className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '100px' }}>
                  <span className="text-white fw-bold fs-1">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <h5 className="fw-bold mb-1">{user?.name || 'Usuario'}</h5>
                <p className="text-muted mb-3">Desarrolladora Frontend</p>
                <div className="d-flex justify-content-center gap-2 mb-3">
                  <span className="badge bg-primary rounded-pill">React</span>
                  <span className="badge bg-info rounded-pill">TypeScript</span>
                  <span className="badge bg-success rounded-pill">Vue.js</span>
                  <span className="badge bg-warning rounded-pill">CSS3</span>
                </div>
                <button className="btn btn-outline-primary btn-custom w-100">
                  Editar Perfil
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Acciones Rápidas</h3>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-custom">
                    <span className="fs-5 me-2">🔍</span>
                    Buscar Empleos
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">📝</span>
                    Crear CV
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">⚙️</span>
                    Configuración
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">📊</span>
                    Ver Estadísticas
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="card card-custom animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Notificaciones</h3>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <div className="list-group-item border-0 px-0 py-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-success rounded-circle me-3" style={{ width: '8px', height: '8px' }}></div>
                      <div className="flex-grow-1">
                        <p className="mb-0 small fw-semibold">Nueva entrevista programada</p>
                        <small className="text-muted">Hace 1 hora</small>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item border-0 px-0 py-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary rounded-circle me-3" style={{ width: '8px', height: '8px' }}></div>
                      <div className="flex-grow-1">
                        <p className="mb-0 small fw-semibold">Tu CV fue visto</p>
                        <small className="text-muted">Hace 3 horas</small>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item border-0 px-0 py-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-info rounded-circle me-3" style={{ width: '8px', height: '8px' }}></div>
                      <div className="flex-grow-1">
                        <p className="mb-0 small fw-semibold">Nuevo empleo recomendado</p>
                        <small className="text-muted">Hace 1 día</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        jobStatus={getSelectedJobStatus()}
      />
    </div>
  );
}; 