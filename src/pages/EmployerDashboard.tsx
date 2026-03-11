import React, { useState } from 'react';
import {
  AccessibilityNotification,
  CandidateCVModal,
  VacancyDetailModal,
} from '../components';
import {
  MockApplication,
  MockVacancy,
  applications as mockApplications,
  vacancies as mockVacancies,
} from '../data/mockData';

export const EmployerDashboard: React.FC = () => {
  const [notification, setNotification] = useState({
    message: '',
    type: 'info' as 'success' | 'info' | 'warning',
    isVisible: false
  });
  const [selectedVacancy, setSelectedVacancy] = useState<MockVacancy | null>(null);
  const [isVacancyModalOpen, setIsVacancyModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<MockApplication | null>(null);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);

  const [vacancies, setVacancies] = useState<MockVacancy[]>(() =>
    mockVacancies.map(vacancy => ({
      ...vacancy,
      requirements: vacancy.requirements ? [...vacancy.requirements] : undefined,
      benefits: vacancy.benefits ? [...vacancy.benefits] : undefined,
    }))
  );

  const [applications] = useState<MockApplication[]>(() =>
    mockApplications.map(application => ({ ...application }))
  );

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  };

  const handleViewVacancy = (vacancyId: string) => {
    const vacancy = vacancies.find(v => v.id === vacancyId);
    if (vacancy) {
      setSelectedVacancy(vacancy);
      setIsVacancyModalOpen(true);
      showNotification(`Abriendo detalles de: ${vacancy.position}`, 'info');
    }
  };

  const handleEditVacancy = (vacancyId: string) => {
    const vacancy = vacancies.find(v => v.id === vacancyId);
    if (vacancy) {
      showNotification(`Formulario de edición abierto para: ${vacancy.position}`, 'info');
      // Aquí se abriría un formulario de edición
    }
  };

  const handleCloseVacancy = (vacancyId: string) => {
    setVacancies(prev => prev.map(v => 
      v.id === vacancyId ? { ...v, status: 'Cerrada', color: 'secondary' } : v
    ));
    showNotification(`Vacante cerrada exitosamente`, 'success');
  };

  const handleViewCV = (applicationId: string) => {
    const application = applications.find(a => a.id === applicationId);
    if (application) {
      setSelectedCandidate(application);
      setIsCandidateModalOpen(true);
      showNotification(`Abriendo CV de: ${application.name}`, 'info');
    }
  };

  const handleContactCandidate = (applicationId: string) => {
    const application = applications.find(a => a.id === applicationId);
    if (application) {
      showNotification(`Formulario de contacto abierto para: ${application.name}`, 'success');
      // Aquí se abriría un formulario de contacto
    }
  };

  const handleCloseVacancyModal = () => {
    setIsVacancyModalOpen(false);
    setSelectedVacancy(null);
  };

  const handleCloseCandidateModal = () => {
    setIsCandidateModalOpen(false);
    setSelectedCandidate(null);
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
              <h1 className="display-5 fw-bold mb-2">Panel de Empleador Inclusivo</h1>
              <p className="lead mb-0">Gestiona tus vacantes inclusivas y candidatos</p>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="d-flex align-items-center justify-content-md-end">
                <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                  <span className="text-white fw-bold fs-4">S</span>
                </div>
                <div>
                  <p className="mb-0 fw-semibold">Supermercado Inclusivo S.L.</p>
                  <small className="text-white-50">Empresa Inclusiva</small>
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
                  <span className="fs-2 text-primary">📋</span>
                </div>
                <h3 className="h2 fw-bold text-primary mb-2">{vacancies.length}</h3>
                <p className="text-muted mb-0">Vacantes Activas</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-2 text-success">👥</span>
                </div>
                <h3 className="h2 fw-bold text-success mb-2">{applications.reduce((sum, app) => sum + 1, 0)}</h3>
                <p className="text-muted mb-0">Candidatos</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-2 text-info">📝</span>
                </div>
                <h3 className="h2 fw-bold text-info mb-2">{applications.filter(app => app.status === 'Nueva').length}</h3>
                <p className="text-muted mb-0">Postulaciones Nuevas</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-2 text-warning">✅</span>
                </div>
                <h3 className="h2 fw-bold text-warning mb-2">5</h3>
                <p className="text-muted mb-0">Contrataciones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-8">
            {/* Active Vacancies */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0 d-flex justify-content-between align-items-center">
                <h3 className="h4 fw-bold mb-0">Vacantes Activas</h3>
                <button className="btn btn-primary btn-custom" aria-label="Crear una nueva vacante inclusiva">
                  <span className="fs-5 me-2">➕</span>
                  Crear Vacante Inclusiva
                </button>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Posición</th>
                        <th>Discapacidad</th>
                        <th>Candidatos</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vacancies.map((vacancy) => (
                        <tr key={vacancy.id}>
                          <td>
                            <h6 className="fw-bold mb-1">{vacancy.position}</h6>
                            <small className="text-muted">{vacancy.company}</small>
                            <br />
                            <small className="text-primary">{vacancy.salary}</small>
                          </td>
                          <td>
                            <span className="badge bg-info rounded-pill">{vacancy.targetDisability}</span>
                          </td>
                          <td>
                            <span className="badge bg-primary rounded-pill">{vacancy.candidates}</span>
                          </td>
                          <td>
                            <span className={`badge bg-${vacancy.color} rounded-pill`}>
                              {vacancy.status}
                            </span>
                          </td>
                          <td>
                            <small className="text-muted">{vacancy.date}</small>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm" role="group">
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => handleViewVacancy(vacancy.id)}
                                title="Ver detalles de la vacante"
                                aria-label={`Ver detalles de la vacante ${vacancy.position}`}
                              >
                                👁️ Ver
                              </button>
                              <button 
                                className="btn btn-outline-secondary"
                                onClick={() => handleEditVacancy(vacancy.id)}
                                title="Editar vacante"
                                aria-label={`Editar vacante ${vacancy.position}`}
                              >
                                ✏️ Editar
                              </button>
                              <button 
                                className="btn btn-outline-danger"
                                onClick={() => handleCloseVacancy(vacancy.id)}
                                title="Cerrar vacante"
                                aria-label={`Cerrar vacante ${vacancy.position}`}
                              >
                                ❌ Cerrar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="card card-custom animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Postulaciones Recientes</h3>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {applications.map((application) => (
                    <div key={application.id} className="col-md-6">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3">
                          <div className="d-flex align-items-center mb-3">
                            <div className="bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <span className="text-white fw-bold">{application.name.charAt(0)}</span>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1">{application.name}</h6>
                              <small className="text-muted">{application.position}</small>
                              <br />
                              <small className="text-info">{application.disability}</small>
                            </div>
                            <span className="badge bg-success rounded-pill">{application.match}</span>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted">Experiencia: {application.experience}</small>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className={`badge bg-${application.color} rounded-pill`}>
                              {application.status}
                            </span>
                            <small className="text-muted">{application.time}</small>
                          </div>
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-primary btn-sm flex-fill"
                              onClick={() => handleViewCV(application.id)}
                              aria-label={`Ver CV de ${application.name}`}
                            >
                              👁️ Ver CV
                            </button>
                            <button 
                              className="btn btn-outline-primary btn-sm flex-fill"
                              onClick={() => handleContactCandidate(application.id)}
                              aria-label={`Contactar a ${application.name}`}
                            >
                              📞 Contactar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            {/* Quick Actions */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Acciones Rápidas</h3>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-custom" aria-label="Crear vacante inclusiva">
                    <span className="fs-5 me-2">📋</span>
                    Crear Vacante Inclusiva
                  </button>
                  <button className="btn btn-outline-primary btn-custom" aria-label="Ver listado de candidatos">
                    <span className="fs-5 me-2">👥</span>
                    Ver Candidatos
                  </button>
                  <button className="btn btn-outline-primary btn-custom" aria-label="Ver reportes de inclusión">
                    <span className="fs-5 me-2">📊</span>
                    Reportes de Inclusión
                  </button>
                  <button className="btn btn-outline-primary btn-custom" aria-label="Abrir configuración del empleador">
                    <span className="fs-5 me-2">⚙️</span>
                    Configuración
                  </button>
                </div>
              </div>
            </div>

            {/* Company Stats */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Estadísticas de Inclusión</h3>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">Personas con Discapacidad</span>
                    <span className="badge bg-success rounded-pill">75%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-success" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">Adaptaciones Implementadas</span>
                    <span className="badge bg-info rounded-pill">12</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-info" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">Satisfacción Laboral</span>
                    <span className="badge bg-warning rounded-pill">4.8/5</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-warning" style={{ width: '96%' }}></div>
                  </div>
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
                        <p className="mb-0 small fw-semibold">Nueva postulación para acomodador</p>
                        <small className="text-muted">Hace 30 minutos</small>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item border-0 px-0 py-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary rounded-circle me-3" style={{ width: '8px', height: '8px' }}></div>
                      <div className="flex-grow-1">
                        <p className="mb-0 small fw-semibold">Vacante de tester cerrada exitosamente</p>
                        <small className="text-muted">Hace 2 horas</small>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item border-0 px-0 py-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-info rounded-circle me-3" style={{ width: '8px', height: '8px' }}></div>
                      <div className="flex-grow-1">
                        <p className="mb-0 small fw-semibold">Nueva adaptación implementada</p>
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

      {/* Vacancy Detail Modal */}
      <VacancyDetailModal
        vacancy={selectedVacancy}
        isOpen={isVacancyModalOpen}
        onClose={handleCloseVacancyModal}
        onEdit={handleEditVacancy}
        onCloseVacancy={handleCloseVacancy}
      />

      {/* Candidate CV Modal */}
      <CandidateCVModal
        candidate={selectedCandidate}
        isOpen={isCandidateModalOpen}
        onClose={handleCloseCandidateModal}
        onContact={handleContactCandidate}
      />
    </div>
  );
}; 
