import React, { useState } from 'react';

export const CandidateDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Section */}
      <div className="bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold mb-2">¡Hola, María!</h1>
              <p className="lead mb-0">Bienvenida a tu panel de candidata</p>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="d-flex align-items-center justify-content-md-end">
                <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                  <span className="text-white fw-bold fs-4">M</span>
                </div>
                <div>
                  <p className="mb-0 fw-semibold">María González</p>
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
                <h3 className="h2 fw-bold text-primary mb-2">12</h3>
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
                  {[
                    { title: 'Senior React Developer', company: 'TechCorp', location: 'Madrid', salary: '$60k-80k', match: '95%' },
                    { title: 'Frontend Engineer', company: 'Digital Solutions', location: 'Barcelona', salary: '$50k-70k', match: '88%' },
                    { title: 'UI/UX Developer', company: 'Innovation Labs', location: 'Valencia', salary: '$45k-65k', match: '82%' }
                  ].map((job, index) => (
                    <div key={index} className="col-md-6">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="fw-bold mb-1">{job.title}</h6>
                            <span className="badge bg-success rounded-pill">{job.match}</span>
                          </div>
                          <p className="text-muted small mb-2">{job.company} • {job.location}</p>
                          <p className="text-primary fw-semibold mb-3">{job.salary}</p>
                          <button className="btn btn-primary btn-sm w-100">Postularse</button>
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
            {/* Profile Summary */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Mi Perfil</h3>
              </div>
              <div className="card-body text-center">
                <div className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '100px' }}>
                  <span className="text-white fw-bold fs-1">M</span>
                </div>
                <h5 className="fw-bold mb-1">María González</h5>
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
    </div>
  );
}; 