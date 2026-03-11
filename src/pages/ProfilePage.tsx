import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  AccessibilityNotification,
  JobDetailModal,
  SavedJobs,
  ScreenReaderTest,
} from '../components';
import { jobDetails, MockJob, MockSavedJob, savedJobs as mockSavedJobs } from '../data/mockData';
import {
  getStoredProfileData,
  saveStoredProfileData,
} from '../services/mockStorage';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { highContrast, setHighContrast, easyReading, setEasyReading, fontSize, setFontSize, colorScheme, setColorScheme } = useAccessibility();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<MockJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: 'info' as 'success' | 'info' | 'warning',
    isVisible: false
  });
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    bio?: string;
  }>({});
  const [formData, setFormData] = useState({
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+34 600 123 456',
    location: 'Madrid, España',
    bio: 'Persona con discapacidad cognitiva buscando oportunidades laborales inclusivas. Motivada, responsable y con ganas de trabajar. Experiencia en tareas de organización y trabajo en equipo.'
  });

  const [savedJobs, setSavedJobs] = useState<MockSavedJob[]>(() =>
    mockSavedJobs.map(job => ({ ...job }))
  );

  useEffect(() => {
    const userId = user?.id || 'guest';
    const storedProfile = getStoredProfileData(userId);
    if (storedProfile) {
      setFormData(storedProfile);
      return;
    }

    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const handleFormFieldChange = (
    field: 'name' | 'email' | 'phone' | 'location' | 'bio',
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateProfileForm = () => {
    const errors: {
      name?: string;
      email?: string;
      phone?: string;
      location?: string;
      bio?: string;
    } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+\d\s()-]{7,20}$/;

    if (!formData.name.trim()) errors.name = 'El nombre es obligatorio';
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Correo electrónico inválido';
    }
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      errors.phone = 'Teléfono inválido';
    }
    if (!formData.location.trim()) errors.location = 'La ubicación es obligatoria';
    if (!formData.bio.trim() || formData.bio.trim().length < 20) {
      errors.bio = 'La biografía debe tener al menos 20 caracteres';
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateProfileForm();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      showNotification('Revisa los campos del perfil antes de guardar', 'warning');
      return;
    }

    updateProfile({
      name: formData.name,
      email: formData.email,
    });
    saveStoredProfileData(user?.id || 'guest', formData);
    setIsEditing(false);
    showNotification('Perfil actualizado correctamente', 'success');
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
    const jobDetail = jobDetails.find(job => job.id === jobId);
    if (jobDetail) {
      setSelectedJob(jobDetail);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleModalApply = (jobId: string) => {
    handleApplyToSavedJob(jobId);
    handleCloseModal();
  };

  const handleModalSave = (jobId: string) => {
    // Toggle saved status
    const isCurrentlySaved = savedJobs.some(job => job.id === jobId);
    if (isCurrentlySaved) {
      handleRemoveSavedJob(jobId);
    } else {
      // Add to saved jobs if not already saved
      const jobDetail = jobDetails.find(job => job.id === jobId);
      if (jobDetail) {
        const newSavedJob: MockSavedJob = {
          id: jobDetail.id,
          title: jobDetail.title,
          company: jobDetail.company,
          location: jobDetail.location,
          salary: jobDetail.salary,
          contractType: jobDetail.contractType,
          match: jobDetail.match,
          savedDate: 'Hoy',
          status: 'saved'
        };
        setSavedJobs(prev => [...prev, newSavedJob]);
        showNotification('Empleo guardado', 'success');
      }
    }
  };

  // Get the current status of the selected job
  const getSelectedJobStatus = () => {
    if (!selectedJob) return 'saved';
    const savedJob = savedJobs.find(job => job.id === selectedJob.id);
    return savedJob ? savedJob.status : 'saved';
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
                        onChange={(e) => handleFormFieldChange('name', e.target.value)}
                        disabled={!isEditing}
                      />
                      {validationErrors.name && (
                        <small className="text-danger d-block mt-1">{validationErrors.name}</small>
                      )}
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
                        onChange={(e) => handleFormFieldChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                      {validationErrors.email && (
                        <small className="text-danger d-block mt-1">{validationErrors.email}</small>
                      )}
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
                        onChange={(e) => handleFormFieldChange('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                      {validationErrors.phone && (
                        <small className="text-danger d-block mt-1">{validationErrors.phone}</small>
                      )}
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
                        onChange={(e) => handleFormFieldChange('location', e.target.value)}
                        disabled={!isEditing}
                      />
                      {validationErrors.location && (
                        <small className="text-danger d-block mt-1">{validationErrors.location}</small>
                      )}
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
                        onChange={(e) => handleFormFieldChange('bio', e.target.value)}
                        disabled={!isEditing}
                        aria-describedby="profile-bio-help"
                      />
                      {validationErrors.bio && (
                        <small className="text-danger d-block mt-1">{validationErrors.bio}</small>
                      )}
                      <small id="profile-bio-help" className="text-muted d-block mt-2">
                        Describe tu perfil, fortalezas y adaptaciones que te ayudan en el trabajo.
                      </small>
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
                {/* Screen Reader Test */}
                <div className="mb-4">
                  <ScreenReaderTest />
                </div>

                {/* High Contrast */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Alto Contraste</label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={highContrast}
                      onChange={handleHighContrastToggle}
                      id="highContrastSwitch"
                    />
                    <label className="form-check-label" htmlFor="highContrastSwitch">
                      Activar modo alto contraste
                    </label>
                  </div>
                </div>

                {/* Easy Reading */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Lectura Fácil</label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={easyReading}
                      onChange={handleEasyReadingToggle}
                      id="easyReadingSwitch"
                    />
                    <label className="form-check-label" htmlFor="easyReadingSwitch">
                      Activar modo lectura fácil
                    </label>
                  </div>
                </div>

                {/* Font Size */}
                <div className="mb-3">
                  <label className="form-label fw-semibold" id="profile-font-size-label">Tamaño de Fuente</label>
                  <select
                    className="form-select"
                    value={fontSize}
                    onChange={(e) => handleFontSizeChange(e.target.value as 'small' | 'medium' | 'large' | 'xlarge')}
                    aria-labelledby="profile-font-size-label"
                    aria-describedby="profile-font-size-help"
                  >
                    <option value="small">Pequeño (14px)</option>
                    <option value="medium">Mediano (16px)</option>
                    <option value="large">Grande (18px)</option>
                    <option value="xlarge">Muy Grande (20px)</option>
                  </select>
                  <small id="profile-font-size-help" className="text-muted d-block mt-2">
                    Tamaño actual: {getFontSizeLabel(fontSize)}.
                  </small>
                </div>

                {/* Color Scheme */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Esquema de Color</label>
                  <select
                    className="form-select"
                    value={colorScheme}
                    onChange={(e) => handleColorSchemeChange(e.target.value as 'default' | 'high-contrast' | 'colorblind' | 'dark')}
                    aria-label="Seleccionar esquema de color"
                  >
                    <option value="default">Predeterminado</option>
                    <option value="high-contrast">Alto Contraste</option>
                    <option value="colorblind">Daltónico</option>
                    <option value="dark">Modo Oscuro</option>
                  </select>
                  <small className="text-muted d-block mt-2">
                    Esquema actual: {getColorSchemeLabel(colorScheme)}.
                  </small>
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

      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleModalApply}
        onSave={handleModalSave}
        isSaved={selectedJob ? savedJobs.some(job => job.id === selectedJob.id) : false}
        jobStatus={getSelectedJobStatus()}
      />
    </div>
  );
}; 
