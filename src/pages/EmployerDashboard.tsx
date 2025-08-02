import React, { useState } from 'react';

export const EmployerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Section */}
      <div className="bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold mb-2">Panel de Empleador</h1>
              <p className="lead mb-0">Gestiona tus vacantes y candidatos</p>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="d-flex align-items-center justify-content-md-end">
                <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                  <span className="text-white fw-bold fs-4">T</span>
                </div>
                <div>
                  <p className="mb-0 fw-semibold">TechCorp Inc.</p>
                  <small className="text-white-50">Empresa Tecnológica</small>
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
                <h3 className="h2 fw-bold text-primary mb-2">8</h3>
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
                <h3 className="h2 fw-bold text-success mb-2">156</h3>
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
                <h3 className="h2 fw-bold text-info mb-2">23</h3>
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
                <h3 className="h2 fw-bold text-warning mb-2">12</h3>
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
                <button className="btn btn-primary btn-custom">
                  <span className="fs-5 me-2">➕</span>
                  Crear Vacante
                </button>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Posición</th>
                        <th>Candidatos</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { position: 'Desarrollador Frontend React', candidates: 45, status: 'Activa', date: 'Hace 2 días', color: 'success' },
                        { position: 'Backend Developer Python', candidates: 32, status: 'Activa', date: 'Hace 1 semana', color: 'success' },
                        { position: 'UX/UI Designer', candidates: 28, status: 'Cerrando', date: 'Hace 2 semanas', color: 'warning' },
                        { position: 'DevOps Engineer', candidates: 15, status: 'Activa', date: 'Hace 3 semanas', color: 'success' }
                      ].map((vacancy, index) => (
                        <tr key={index}>
                          <td>
                            <h6 className="fw-bold mb-1">{vacancy.position}</h6>
                            <small className="text-muted">TechCorp Inc.</small>
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
                              <button className="btn btn-outline-primary">Ver</button>
                              <button className="btn btn-outline-secondary">Editar</button>
                              <button className="btn btn-outline-danger">Cerrar</button>
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
                  {[
                    { name: 'María González', position: 'Frontend Developer', match: '95%', status: 'Nueva', time: 'Hace 1 hora', color: 'success' },
                    { name: 'Carlos Rodríguez', position: 'Backend Developer', match: '88%', status: 'En revisión', time: 'Hace 3 horas', color: 'primary' },
                    { name: 'Ana Martínez', position: 'UX Designer', match: '92%', status: 'Entrevista', time: 'Hace 1 día', color: 'info' },
                    { name: 'Luis Pérez', position: 'DevOps Engineer', match: '85%', status: 'Rechazada', time: 'Hace 2 días', color: 'danger' }
                  ].map((application, index) => (
                    <div key={index} className="col-md-6">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3">
                          <div className="d-flex align-items-center mb-3">
                            <div className="bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <span className="text-white fw-bold">{application.name.charAt(0)}</span>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1">{application.name}</h6>
                              <small className="text-muted">{application.position}</small>
                            </div>
                            <span className="badge bg-success rounded-pill">{application.match}</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className={`badge bg-${application.color} rounded-pill`}>
                              {application.status}
                            </span>
                            <small className="text-muted">{application.time}</small>
                          </div>
                          <div className="mt-3 d-flex gap-2">
                            <button className="btn btn-primary btn-sm flex-fill">Ver CV</button>
                            <button className="btn btn-outline-primary btn-sm flex-fill">Contactar</button>
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
                  <button className="btn btn-primary btn-custom">
                    <span className="fs-5 me-2">📋</span>
                    Crear Vacante
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">👥</span>
                    Ver Candidatos
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">📊</span>
                    Ver Estadísticas
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">⚙️</span>
                    Configuración
                  </button>
                </div>
              </div>
            </div>

            {/* Company Stats */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Estadísticas de la Empresa</h3>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="text-center p-3 bg-light rounded">
                      <h4 className="fw-bold text-primary mb-1">156</h4>
                      <small className="text-muted">Candidatos Totales</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 bg-light rounded">
                      <h4 className="fw-bold text-success mb-1">23</h4>
                      <small className="text-muted">Postulaciones Nuevas</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 bg-light rounded">
                      <h4 className="fw-bold text-info mb-1">8</h4>
                      <small className="text-muted">Vacantes Activas</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 bg-light rounded">
                      <h4 className="fw-bold text-warning mb-1">12</h4>
                      <small className="text-muted">Contrataciones</small>
                    </div>
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
                        <p className="mb-0 small fw-semibold">Nueva postulación recibida</p>
                        <small className="text-muted">Hace 30 minutos</small>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item border-0 px-0 py-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary rounded-circle me-3" style={{ width: '8px', height: '8px' }}></div>
                      <div className="flex-grow-1">
                        <p className="mb-0 small fw-semibold">Vacante cerrada automáticamente</p>
                        <small className="text-muted">Hace 2 horas</small>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item border-0 px-0 py-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-info rounded-circle me-3" style={{ width: '8px', height: '8px' }}></div>
                      <div className="flex-grow-1">
                        <p className="mb-0 small fw-semibold">Candidato seleccionado</p>
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