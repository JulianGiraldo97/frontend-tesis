import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { AccessibilityNotification } from '../components/AccessibilityNotification';
import { SavedJobs } from '../components/SavedJobs';

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  contractType: string;
  match: string;
  savedDate: string;
  status: 'saved' | 'applied' | 'interviewed';
}

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { highContrast, setHighContrast, easyReading, setEasyReading, fontSize, setFontSize, colorScheme, setColorScheme } = useAccessibility();
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: 'info' as 'success' | 'info' | 'warning',
    isVisible: false
  });
  const [formData, setFormData] = useState({
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+34 600 123 456',
    location: 'Madrid, España',
    bio: 'Desarrolladora Frontend con 5 años de experiencia en React, TypeScript y Vue.js. Apasionada por crear aplicaciones accesibles e inclusivas.'
  });

  // Mock data for saved jobs
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([
    {
      id: '1',
      title: 'Desarrollador Frontend React',
      company: 'TechCorp Inc.',
      location: 'Madrid, España',
      salary: '$45,000 - $60,000',
      contractType: 'Tiempo completo',
      match: '95%',
      savedDate: 'Hace 2 días',
      status: 'saved'
    },
    {
      id: '2',
      title: 'UI/UX Developer',
      company: 'Digital Solutions',
      location: 'Barcelona, España',
      salary: '$40,000 - $55,000',
      contractType: 'Tiempo completo',
      match: '88%',
      savedDate: 'Hace 1 semana',
      status: 'applied'
    },
    {
      id: '3',
      title: 'Frontend Engineer',
      company: 'Innovation Labs',
      location: 'Valencia, España',
      salary: '$50,000 - $65,000',
      contractType: 'Tiempo completo',
      match: '82%',
      savedDate: 'Hace 2 semanas',
      status: 'interviewed'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Profile updated:', formData);
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  };

  const handleHighContrastToggle = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    const message = newValue ? 'Alto contraste activado' : 'Alto contraste desactivado';
    showNotification(message, 'success');
  };

  const handleEasyReadingToggle = () => {
    const newValue = !easyReading;
    setEasyReading(newValue);
    const message = newValue ? 'Modo lectura fácil activado' : 'Modo lectura fácil desactivado';
    showNotification(message, 'success');
  };

  const handleFontSizeChange = (newSize: 'small' | 'medium' | 'large' | 'xlarge') => {
    setFontSize(newSize);
    const sizeLabels = {
      small: 'Pequeño',
      medium: 'Mediano',
      large: 'Grande',
      xlarge: 'Muy Grande'
    };
    const message = `Tamaño de fuente cambiado a ${sizeLabels[newSize]}`;
    showNotification(message, 'success');
  };

  const handleColorSchemeChange = (newScheme: 'default' | 'high-contrast' | 'colorblind' | 'dark') => {
    setColorScheme(newScheme);
    const schemeLabels = {
      'default': 'Predeterminado',
      'high-contrast': 'Alto Contraste',
      'colorblind': 'Daltónico',
      'dark': 'Modo Oscuro'
    };
    const message = `Esquema de colores cambiado a ${schemeLabels[newScheme]}`;
    showNotification(message, 'success');
  };

  const getFontSizeLabel = (size: string) => {
    const labels = {
      small: 'Pequeño (14px)',
      medium: 'Mediano (16px)',
      large: 'Grande (18px)',
      xlarge: 'Muy Grande (20px)'
    };
    return labels[size as keyof typeof labels] || size;
  };

  const getColorSchemeLabel = (scheme: string) => {
    const labels = {
      'default': 'Predeterminado',
      'high-contrast': 'Alto Contraste',
      'colorblind': 'Daltónico',
      'dark': 'Modo Oscuro'
    };
    return labels[scheme as keyof typeof labels] || scheme;
  };

  const handleRemoveSavedJob = (jobId: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== jobId));
    showNotification('Empleo eliminado de guardados', 'success');
  };

  const handleApplyToSavedJob = (jobId: string) => {
    setSavedJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'applied' as const } : job
    ));
    showNotification('Postulación enviada', 'success');
  };

  const handleViewSavedJobDetail = (jobId: string) => {
    console.log('Ver detalle del empleo guardado:', jobId);
    // Aquí se podría abrir un modal o navegar a una página de detalle
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

            {/* Saved Jobs */}
            <SavedJobs
              savedJobs={savedJobs}
              onRemove={handleRemoveSavedJob}
              onApply={handleApplyToSavedJob}
              onViewDetail={handleViewSavedJobDetail}
            />

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
                <div className="mb-4">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="highContrast"
                      checked={highContrast}
                      onChange={handleHighContrastToggle}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="highContrast">
                      Alto Contraste
                    </label>
                    <small className="d-block text-muted">
                      {highContrast ? '✅ Activado - Mejora la visibilidad del texto' : 'Mejora la visibilidad del texto'}
                    </small>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="easyReading"
                      checked={easyReading}
                      onChange={handleEasyReadingToggle}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="easyReading">
                      Modo Lectura Fácil
                    </label>
                    <small className="d-block text-muted">
                      {easyReading ? '✅ Activado - Fuente más grande y espaciado mejorado' : 'Fuente más grande y espaciado mejorado'}
                    </small>
                    <div className="mt-2 p-3 bg-light rounded">
                      <small className="text-muted">
                        <strong>Beneficios:</strong><br/>
                        • Fuente Open Sans más legible<br/>
                        • Tamaño de texto aumentado (18px)<br/>
                        • Mayor espaciado entre líneas (1.8)<br/>
                        • Mejor contraste y padding
                      </small>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="fontSize" className="form-label fw-semibold">
                    Tamaño de Fuente
                  </label>
                  <select 
                    className="form-select form-control-custom" 
                    id="fontSize"
                    value={fontSize}
                    onChange={(e) => handleFontSizeChange(e.target.value as 'small' | 'medium' | 'large' | 'xlarge')}
                  >
                    <option value="small">Pequeño (14px)</option>
                    <option value="medium">Mediano (16px)</option>
                    <option value="large">Grande (18px)</option>
                    <option value="xlarge">Muy Grande (20px)</option>
                  </select>
                  <small className="d-block text-muted mt-2">
                    {fontSize !== 'medium' ? `✅ Actual: ${getFontSizeLabel(fontSize)}` : 'Tamaño predeterminado'}
                  </small>
                  <div className="mt-2 p-3 bg-light rounded">
                    <small className="text-muted">
                      <strong>Opciones disponibles:</strong><br/>
                      • <strong>Pequeño:</strong> 14px - Compacto<br/>
                      • <strong>Mediano:</strong> 16px - Estándar<br/>
                      • <strong>Grande:</strong> 18px - Legible<br/>
                      • <strong>Muy Grande:</strong> 20px - Accesible
                    </small>
                  </div>
                </div>
                <div>
                  <label htmlFor="colorScheme" className="form-label fw-semibold">
                    Esquema de Colores
                  </label>
                  <select 
                    className="form-select form-control-custom" 
                    id="colorScheme"
                    value={colorScheme}
                    onChange={(e) => handleColorSchemeChange(e.target.value as 'default' | 'high-contrast' | 'colorblind' | 'dark')}
                  >
                    <option value="default">Predeterminado</option>
                    <option value="high-contrast">Alto Contraste</option>
                    <option value="colorblind">Daltónico</option>
                    <option value="dark">Modo Oscuro</option>
                  </select>
                  <small className="d-block text-muted mt-2">
                    {colorScheme !== 'default' ? `✅ Actual: ${getColorSchemeLabel(colorScheme)}` : 'Esquema predeterminado'}
                  </small>
                  <div className="mt-2 p-3 bg-light rounded">
                    <small className="text-muted">
                      <strong>Esquemas disponibles:</strong><br/>
                      • <strong>Predeterminado:</strong> Colores estándar<br/>
                      • <strong>Alto Contraste:</strong> Máxima visibilidad<br/>
                      • <strong>Daltónico:</strong> Colores accesibles<br/>
                      • <strong>Modo Oscuro:</strong> Fondo oscuro
                    </small>
                  </div>
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