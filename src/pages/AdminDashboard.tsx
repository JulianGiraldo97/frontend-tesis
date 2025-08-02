import React, { useState } from 'react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Section */}
      <div className="bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold mb-2">Panel de Administración</h1>
              <p className="lead mb-0">Gestiona la plataforma y usuarios</p>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="d-flex align-items-center justify-content-md-end">
                <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                  <span className="text-white fw-bold fs-4">A</span>
                </div>
                <div>
                  <p className="mb-0 fw-semibold">Administrador</p>
                  <small className="text-white-50">Sistema</small>
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
                  <span className="fs-2 text-primary">👥</span>
                </div>
                <h3 className="h2 fw-bold text-primary mb-2">1,234</h3>
                <p className="text-muted mb-0">Usuarios Totales</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-2 text-success">🏢</span>
                </div>
                <h3 className="h2 fw-bold text-success mb-2">89</h3>
                <p className="text-muted mb-0">Empresas</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-2 text-info">📋</span>
                </div>
                <h3 className="h2 fw-bold text-info mb-2">456</h3>
                <p className="text-muted mb-0">Vacantes Activas</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-2 text-warning">✅</span>
                </div>
                <h3 className="h2 fw-bold text-warning mb-2">98.5%</h3>
                <p className="text-muted mb-0">Accesibilidad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-8">
            {/* System Overview */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Vista General del Sistema</h3>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card border-0 bg-light h-100">
                      <div className="card-body text-center">
                        <h5 className="fw-bold text-primary mb-3">Usuarios por Tipo</h5>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Candidatos</span>
                          <span className="fw-bold">1,045</span>
                        </div>
                        <div className="progress mb-3" style={{ height: '8px' }}>
                          <div className="progress-bar bg-primary" style={{ width: '85%' }}></div>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Empleadores</span>
                          <span className="fw-bold">189</span>
                        </div>
                        <div className="progress mb-3" style={{ height: '8px' }}>
                          <div className="progress-bar bg-success" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 bg-light h-100">
                      <div className="card-body text-center">
                        <h5 className="fw-bold text-primary mb-3">Actividad Reciente</h5>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Nuevos usuarios</span>
                          <span className="fw-bold text-success">+23</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Nuevas vacantes</span>
                          <span className="fw-bold text-info">+12</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Postulaciones</span>
                          <span className="fw-bold text-warning">+156</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Contrataciones</span>
                          <span className="fw-bold text-success">+8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card card-custom animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Actividad Reciente</h3>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {[
                    { action: 'Nuevo usuario registrado', user: 'María González', time: 'Hace 5 minutos', type: 'user', color: 'success' },
                    { action: 'Nueva vacante publicada', user: 'TechCorp Inc.', time: 'Hace 15 minutos', type: 'job', color: 'primary' },
                    { action: 'Postulación recibida', user: 'Carlos Rodríguez', time: 'Hace 30 minutos', type: 'application', color: 'info' },
                    { action: 'Usuario reportado', user: 'Usuario Anónimo', time: 'Hace 1 hora', type: 'report', color: 'danger' },
                    { action: 'Contratación completada', user: 'Ana Martínez', time: 'Hace 2 horas', type: 'hire', color: 'success' }
                  ].map((activity, index) => (
                    <div key={index} className="list-group-item border-0 px-0 py-3">
                      <div className="d-flex align-items-center">
                        <div className={`bg-${activity.color} rounded-circle d-flex align-items-center justify-content-center me-3`} style={{ width: '40px', height: '40px' }}>
                          <span className="text-white fw-bold">
                            {activity.type === 'user' && '👤'}
                            {activity.type === 'job' && '📋'}
                            {activity.type === 'application' && '📝'}
                            {activity.type === 'report' && '⚠️'}
                            {activity.type === 'hire' && '✅'}
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-1">{activity.action}</h6>
                          <p className="text-muted mb-0">{activity.user}</p>
                        </div>
                        <small className="text-muted">{activity.time}</small>
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
                    <span className="fs-5 me-2">👥</span>
                    Gestionar Usuarios
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">🏢</span>
                    Gestionar Empresas
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">📊</span>
                    Ver Estadísticas
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">⚙️</span>
                    Configuración
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">♿</span>
                    Accesibilidad
                  </button>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Estado del Sistema</h3>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Servidor</span>
                    <span className="badge bg-success rounded-pill">Online</span>
                  </div>
                  <div className="progress mb-3" style={{ height: '6px' }}>
                    <div className="progress-bar bg-success" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Base de Datos</span>
                    <span className="badge bg-success rounded-pill">OK</span>
                  </div>
                  <div className="progress mb-3" style={{ height: '6px' }}>
                    <div className="progress-bar bg-success" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Accesibilidad</span>
                    <span className="badge bg-success rounded-pill">98.5%</span>
                  </div>
                  <div className="progress mb-3" style={{ height: '6px' }}>
                    <div className="progress-bar bg-success" style={{ width: '98.5%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Performance</span>
                    <span className="badge bg-warning rounded-pill">85%</span>
                  </div>
                  <div className="progress mb-3" style={{ height: '6px' }}>
                    <div className="progress-bar bg-warning" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="card card-custom animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Alertas del Sistema</h3>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <div className="list-group-item border-0 px-0 py-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-success rounded-circle me-3" style={{ width: '8px', height: '8px' }}></div>
                      <div className="flex-grow-1">
                        <p className="mb-0 small fw-semibold">Sistema funcionando correctamente</p>
                        <small className="text-muted">Hace 5 minutos</small>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item border-0 px-0 py-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-warning rounded-circle me-3" style={{ width: '8px', height: '8px' }}></div>
                      <div className="flex-grow-1">
                        <p className="mb-0 small fw-semibold">Backup programado</p>
                        <small className="text-muted">En 2 horas</small>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item border-0 px-0 py-2">
                    <div className="d-flex align-items-center">
                      <div className="bg-info rounded-circle me-3" style={{ width: '8px', height: '8px' }}></div>
                      <div className="flex-grow-1">
                        <p className="mb-0 small fw-semibold">Actualización disponible</p>
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