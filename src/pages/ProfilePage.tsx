import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { highContrast, setHighContrast, easyReading, setEasyReading } = useAccessibility();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+34 600 123 456',
    location: 'Madrid, España',
    bio: 'Desarrolladora Frontend con 5 años de experiencia en React, TypeScript y Vue.js. Apasionada por crear aplicaciones accesibles e inclusivas.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Profile updated:', formData);
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Section */}
      <div className="bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold mb-2">Mi Perfil</h1>
              <p className="lead mb-0">Gestiona tu información personal y preferencias</p>
            </div>
            <div className="col-md-4 text-md-end">
              <button 
                className="btn btn-light btn-custom"
                onClick={() => setIsEditing(!isEditing)}
              >
                <span className="fs-5 me-2">{isEditing ? '💾' : '✏️'}</span>
                {isEditing ? 'Guardar' : 'Editar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Left Column - Profile Info */}
          <div className="col-lg-8">
            {/* Personal Information */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Información Personal</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-semibold">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-custom"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label fw-semibold">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-custom"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="location" className="form-label fw-semibold">
                        Ubicación
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="bio" className="form-label fw-semibold">
                        Biografía
                      </label>
                      <textarea
                        className="form-control form-control-custom"
                        id="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <div className="mt-4">
                      <button type="submit" className="btn btn-primary btn-custom me-2">
                        Guardar Cambios
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary btn-custom"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Skills */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Habilidades y Tecnologías</h3>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="badge bg-primary rounded-pill px-3 py-2">React</span>
                  <span className="badge bg-info rounded-pill px-3 py-2">TypeScript</span>
                  <span className="badge bg-success rounded-pill px-3 py-2">Vue.js</span>
                  <span className="badge bg-warning rounded-pill px-3 py-2">CSS3</span>
                  <span className="badge bg-secondary rounded-pill px-3 py-2">Node.js</span>
                  <span className="badge bg-dark rounded-pill px-3 py-2">Git</span>
                </div>
                <button className="btn btn-outline-primary btn-custom">
                  <span className="fs-5 me-2">➕</span>
                  Agregar Habilidad
                </button>
              </div>
            </div>

            {/* Experience */}
            <div className="card card-custom animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Experiencia Laboral</h3>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <div className="list-group-item border-0 px-0 py-3">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h6 className="fw-bold mb-1">Desarrolladora Frontend Senior</h6>
                        <p className="text-muted mb-1">TechCorp Inc.</p>
                        <small className="text-muted">Enero 2022 - Presente</small>
                      </div>
                      <div className="col-md-4 text-md-end">
                        <span className="badge bg-success rounded-pill">Activo</span>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item border-0 px-0 py-3">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h6 className="fw-bold mb-1">Desarrolladora Frontend</h6>
                        <p className="text-muted mb-1">Digital Solutions</p>
                        <small className="text-muted">Marzo 2020 - Diciembre 2021</small>
                      </div>
                      <div className="col-md-4 text-md-end">
                        <span className="badge bg-secondary rounded-pill">Completado</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline-primary btn-custom mt-3">
                  <span className="fs-5 me-2">➕</span>
                  Agregar Experiencia
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            {/* Profile Picture */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-body text-center">
                <div className="bg-gradient-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '120px', height: '120px' }}>
                  <span className="text-white fw-bold fs-1">M</span>
                </div>
                <h5 className="fw-bold mb-1">{formData.name}</h5>
                <p className="text-muted mb-3">Desarrolladora Frontend</p>
                <button className="btn btn-outline-primary btn-custom w-100">
                  <span className="fs-5 me-2">📷</span>
                  Cambiar Foto
                </button>
              </div>
            </div>

            {/* Accessibility Settings */}
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Configuración de Accesibilidad</h3>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="highContrast"
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="highContrast">
                      Alto Contraste
                    </label>
                    <small className="d-block text-muted">Mejora la visibilidad del texto</small>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="easyReading"
                      checked={easyReading}
                      onChange={(e) => setEasyReading(e.target.checked)}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="easyReading">
                      Modo Lectura Fácil
                    </label>
                    <small className="d-block text-muted">Aumenta el tamaño de fuente</small>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="fontSize" className="form-label fw-semibold">
                    Tamaño de Fuente
                  </label>
                  <select className="form-select form-control-custom" id="fontSize">
                    <option value="small">Pequeño</option>
                    <option value="medium" selected>Mediano</option>
                    <option value="large">Grande</option>
                    <option value="xlarge">Muy Grande</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="colorScheme" className="form-label fw-semibold">
                    Esquema de Colores
                  </label>
                  <select className="form-select form-control-custom" id="colorScheme">
                    <option value="default" selected>Predeterminado</option>
                    <option value="high-contrast">Alto Contraste</option>
                    <option value="colorblind">Daltónico</option>
                    <option value="dark">Modo Oscuro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="card card-custom animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h3 className="h4 fw-bold mb-0">Configuración de Cuenta</h3>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">🔒</span>
                    Cambiar Contraseña
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">📧</span>
                    Notificaciones
                  </button>
                  <button className="btn btn-outline-primary btn-custom">
                    <span className="fs-5 me-2">🌐</span>
                    Idioma
                  </button>
                  <button className="btn btn-outline-danger btn-custom">
                    <span className="fs-5 me-2">🗑️</span>
                    Eliminar Cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 