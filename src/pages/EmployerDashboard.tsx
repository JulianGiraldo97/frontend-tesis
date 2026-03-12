import React, { useEffect, useMemo, useState } from 'react';
import {
  AccessibilityNotification,
  CandidateCVModal,
  VacancyDetailModal,
} from '../components';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  feedbackTemplates,
  MockApplication,
  MockVacancy,
  applications as mockApplications,
  vacancies as mockVacancies,
} from '../data/mockData';

type ApplicationStatusFilter =
  | 'all'
  | 'Nueva'
  | 'En revisión'
  | 'Entrevista'
  | 'Rechazada';

type ApplicationSort = 'recent' | 'match-desc' | 'name-asc';
const VACANCIES_PAGE_SIZE = 3;
const APPLICATIONS_PAGE_SIZE = 4;

interface SentFeedback {
  id: string;
  candidateName: string;
  vacancy: string;
  sentAt: string;
  message: string;
}

export const EmployerDashboard: React.FC = () => {
  const { getReadableText } = useAccessibility();
  const [notification, setNotification] = useState({
    message: '',
    type: 'info' as 'success' | 'info' | 'warning',
    isVisible: false,
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

  const [selectedVacancyId, setSelectedVacancyId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatusFilter>('all');
  const [sortBy, setSortBy] = useState<ApplicationSort>('recent');
  const [vacanciesPage, setVacanciesPage] = useState(1);
  const [applicationsPage, setApplicationsPage] = useState(1);

  const [composerCandidate, setComposerCandidate] = useState<MockApplication | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    feedbackTemplates[0]?.id || ''
  );
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [sentFeedback, setSentFeedback] = useState<SentFeedback[]>([]);

  const showNotification = (
    message: string,
    type: 'success' | 'info' | 'warning' = 'info'
  ) => {
    setNotification({
      message,
      type,
      isVisible: true,
    });
  };

  const downloadFeedbackTranscript = () => {
    if (!composerCandidate || !feedbackMessage.trim()) {
      showNotification('No hay contenido para descargar en la transcripción.', 'warning');
      return;
    }

    const transcript = `Retroalimentación para ${composerCandidate.name}\nVacante: ${composerCandidate.position}\n\n${feedbackMessage.trim()}`;
    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `retroalimentacion-${composerCandidate.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getVacancyName = (vacancyId: string) => {
    const vacancy = vacancies.find(item => item.id === vacancyId);
    return vacancy?.position || 'Vacante sin identificar';
  };

  const fillTemplate = (templateId: string, application: MockApplication) => {
    const template = feedbackTemplates.find(item => item.id === templateId);
    if (!template) return '';

    return template.content
      .replace('{{nombre}}', application.name)
      .replace('{{vacante}}', application.position);
  };

  const filteredApplications = useMemo(() => {
    const byVacancy = applications.filter(application =>
      selectedVacancyId === 'all' ? true : application.vacancyId === selectedVacancyId
    );

    const byStatus = byVacancy.filter(application =>
      statusFilter === 'all' ? true : application.status === statusFilter
    );

    const sorted = [...byStatus];

    if (sortBy === 'match-desc') {
      sorted.sort(
        (a, b) =>
          Number.parseInt(b.match.replace('%', ''), 10) -
          Number.parseInt(a.match.replace('%', ''), 10)
      );
      return sorted;
    }

    if (sortBy === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      return sorted;
    }

    sorted.sort((a, b) => Number(b.id) - Number(a.id));
    return sorted;
  }, [applications, selectedVacancyId, sortBy, statusFilter]);

  const vacanciesTotalPages = Math.max(
    1,
    Math.ceil(vacancies.length / VACANCIES_PAGE_SIZE)
  );
  const applicationsTotalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / APPLICATIONS_PAGE_SIZE)
  );

  const paginatedVacancies = useMemo(() => {
    const start = (vacanciesPage - 1) * VACANCIES_PAGE_SIZE;
    return vacancies.slice(start, start + VACANCIES_PAGE_SIZE);
  }, [vacancies, vacanciesPage]);

  const paginatedApplications = useMemo(() => {
    const start = (applicationsPage - 1) * APPLICATIONS_PAGE_SIZE;
    return filteredApplications.slice(start, start + APPLICATIONS_PAGE_SIZE);
  }, [applicationsPage, filteredApplications]);

  useEffect(() => {
    setApplicationsPage(1);
  }, [selectedVacancyId, statusFilter, sortBy]);

  useEffect(() => {
    if (vacanciesPage > vacanciesTotalPages) {
      setVacanciesPage(vacanciesTotalPages);
    }
  }, [vacanciesPage, vacanciesTotalPages]);

  useEffect(() => {
    if (applicationsPage > applicationsTotalPages) {
      setApplicationsPage(applicationsTotalPages);
    }
  }, [applicationsPage, applicationsTotalPages]);

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
    }
  };

  const handleCloseVacancy = (vacancyId: string) => {
    setVacancies(prev =>
      prev.map(v =>
        v.id === vacancyId ? { ...v, status: 'Cerrada', color: 'secondary' } : v
      )
    );
    showNotification('Vacante cerrada exitosamente', 'success');
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
    if (!application) return;

    const initialTemplateId = feedbackTemplates[0]?.id || '';
    setComposerCandidate(application);
    setSelectedTemplateId(initialTemplateId);
    setFeedbackMessage(fillTemplate(initialTemplateId, application));
    showNotification(`Editor de retroalimentación abierto para: ${application.name}`, 'info');
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    if (composerCandidate) {
      setFeedbackMessage(fillTemplate(templateId, composerCandidate));
    }
  };

  const handleSendFeedback = () => {
    if (!composerCandidate) return;

    if (!feedbackMessage.trim()) {
      showNotification('Escribe un mensaje antes de enviar la retroalimentación.', 'warning');
      return;
    }

    const newFeedback: SentFeedback = {
      id: `feedback-${Date.now()}`,
      candidateName: composerCandidate.name,
      vacancy: composerCandidate.position,
      sentAt: new Date().toLocaleString('es-ES'),
      message: feedbackMessage.trim(),
    };

    setSentFeedback(prev => [newFeedback, ...prev]);
    setComposerCandidate(null);
    setFeedbackMessage('');
    showNotification('Retroalimentación enviada correctamente.', 'success');
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
      <AccessibilityNotification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />

      <div className="bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold mb-2">Panel de Empleador Inclusivo</h1>
              <p className="lead mb-0">Gestiona tus vacantes inclusivas y candidatos</p>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="d-flex align-items-center justify-content-md-end">
                <div
                  className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: '60px', height: '60px' }}
                >
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
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '60px', height: '60px' }}
                >
                  <span className="fs-2 text-primary">📋</span>
                </div>
                <p className="h2 fw-bold text-primary mb-2">{vacancies.length}</p>
                <p className="text-muted mb-0">Vacantes Activas</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div
                  className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '60px', height: '60px' }}
                >
                  <span className="fs-2 text-success">👥</span>
                </div>
                <p className="h2 fw-bold text-success mb-2">{applications.length}</p>
                <p className="text-muted mb-0">Candidatos</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div
                  className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '60px', height: '60px' }}
                >
                  <span className="fs-2 text-info">📝</span>
                </div>
                <p className="h2 fw-bold text-info mb-2">
                  {applications.filter(app => app.status === 'Nueva').length}
                </p>
                <p className="text-muted mb-0">Postulaciones Nuevas</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card card-custom text-center animate-fade-in">
              <div className="card-body p-4">
                <div
                  className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '60px', height: '60px' }}
                >
                  <span className="fs-2 text-warning">✅</span>
                </div>
                <p className="h2 fw-bold text-warning mb-2">{sentFeedback.length}</p>
                <p className="text-muted mb-0">Mensajes Enviados</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0 d-flex justify-content-between align-items-center">
                <h2 className="h4 fw-bold mb-0">Vacantes Activas</h2>
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
                      {paginatedVacancies.map(vacancy => (
                        <tr key={vacancy.id}>
                          <td>
                            <p className="fw-bold mb-1">{vacancy.position}</p>
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
                                className="btn btn-outline-info"
                                onClick={() => {
                                  setSelectedVacancyId(vacancy.id);
                                  showNotification(
                                    `Mostrando postulaciones de: ${vacancy.position}`,
                                    'info'
                                  );
                                }}
                                title="Ver postulaciones de esta vacante"
                                aria-label={`Ver postulaciones de la vacante ${vacancy.position}`}
                              >
                                📄 Postulaciones
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

                <div className='d-flex justify-content-between align-items-center mt-3'>
                  <small className='text-muted'>
                    Página {vacanciesPage} de {vacanciesTotalPages}
                  </small>
                  <div className='btn-group'>
                    <button
                      className='btn btn-outline-secondary btn-sm'
                      onClick={() => setVacanciesPage(prev => Math.max(1, prev - 1))}
                      disabled={vacanciesPage === 1}
                      aria-label='Ver página anterior de vacantes'
                    >
                      Anterior
                    </button>
                    <button
                      className='btn btn-outline-secondary btn-sm'
                      onClick={() =>
                        setVacanciesPage(prev =>
                          Math.min(vacanciesTotalPages, prev + 1)
                        )
                      }
                      disabled={vacanciesPage === vacanciesTotalPages}
                      aria-label='Ver página siguiente de vacantes'
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-custom animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                  <h2 className="h4 fw-bold mb-0">Postulaciones por Vacante</h2>
                  <div className="d-flex flex-wrap gap-2">
                    <select
                      className="form-select form-select-sm"
                      value={selectedVacancyId}
                      onChange={e => setSelectedVacancyId(e.target.value)}
                      aria-label="Filtrar postulaciones por vacante"
                    >
                      <option value="all">Todas las vacantes</option>
                      {vacancies.map(vacancy => (
                        <option key={vacancy.id} value={vacancy.id}>
                          {vacancy.position}
                        </option>
                      ))}
                    </select>
                    <select
                      className="form-select form-select-sm"
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value as ApplicationStatusFilter)}
                      aria-label="Filtrar postulaciones por estado"
                    >
                      <option value="all">Todos los estados</option>
                      <option value="Nueva">Nueva</option>
                      <option value="En revisión">En revisión</option>
                      <option value="Entrevista">Entrevista</option>
                      <option value="Rechazada">Rechazada</option>
                    </select>
                    <select
                      className="form-select form-select-sm"
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as ApplicationSort)}
                      aria-label="Ordenar postulaciones"
                    >
                      <option value="recent">Más recientes</option>
                      <option value="match-desc">Mayor coincidencia</option>
                      <option value="name-asc">Nombre (A-Z)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <p className="text-muted" role="status" aria-live="polite">
                  Mostrando {paginatedApplications.length} de {filteredApplications.length}{' '}
                  postulaciones con los filtros actuales.
                </p>

                {filteredApplications.length === 0 ? (
                  <div className="alert alert-info" role="status">
                    No hay postulaciones para los filtros seleccionados. Ajusta la vacante, el estado o el orden.
                  </div>
                ) : (
                  <div className="row g-3">
                    {paginatedApplications.map(application => (
                      <div key={application.id} className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-body p-3">
                            <div className="d-flex align-items-center mb-3">
                              <div
                                className="bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{ width: '40px', height: '40px' }}
                              >
                                <span className="text-white fw-bold">{application.name.charAt(0)}</span>
                              </div>
                              <div className="flex-grow-1">
                                <p className="fw-bold mb-1">{application.name}</p>
                                <small className="text-muted">{application.position}</small>
                                <br />
                                <small className="text-info">{application.disability}</small>
                                <br />
                                <small className="text-secondary">
                                  Vacante: {getVacancyName(application.vacancyId)}
                                </small>
                              </div>
                              <span className="badge bg-success rounded-pill">{application.match}</span>
                            </div>
                            <div className="mb-2">
                              <small className="text-muted">
                                Experiencia: {application.experience}
                              </small>
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
                                aria-label={`Enviar retroalimentación a ${application.name}`}
                              >
                                ✉️ Retroalimentación
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className='d-flex justify-content-between align-items-center mt-3'>
                  <small className='text-muted'>
                    Página {applicationsPage} de {applicationsTotalPages}
                  </small>
                  <div className='btn-group'>
                    <button
                      className='btn btn-outline-secondary btn-sm'
                      onClick={() =>
                        setApplicationsPage(prev => Math.max(1, prev - 1))
                      }
                      disabled={applicationsPage === 1}
                      aria-label='Ver página anterior de postulaciones'
                    >
                      Anterior
                    </button>
                    <button
                      className='btn btn-outline-secondary btn-sm'
                      onClick={() =>
                        setApplicationsPage(prev =>
                          Math.min(applicationsTotalPages, prev + 1)
                        )
                      }
                      disabled={applicationsPage === applicationsTotalPages}
                      aria-label='Ver página siguiente de postulaciones'
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card card-custom mb-4 animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h2 className="h4 fw-bold mb-0">Retroalimentación Accesible</h2>
              </div>
              <div className="card-body">
                {!composerCandidate ? (
                  <div className="alert alert-secondary" role="status">
                    Selecciona una postulación y pulsa <strong>Retroalimentación</strong> para redactar el mensaje.
                  </div>
                ) : (
                  <>
                    <p className="mb-2">
                      <strong>Candidato:</strong> {composerCandidate.name}
                    </p>
                    <p className="mb-3 text-muted">
                      Vacante: {composerCandidate.position}
                    </p>

                    <div className="mb-3">
                      <label htmlFor="feedback-template" className="form-label fw-semibold">
                        Plantilla de mensaje
                      </label>
                      <select
                        id="feedback-template"
                        className="form-select"
                        value={selectedTemplateId}
                        onChange={e => handleTemplateChange(e.target.value)}
                      >
                        {feedbackTemplates.map(template => (
                          <option key={template.id} value={template.id}>
                            {template.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="feedback-message" className="form-label fw-semibold">
                        Mensaje final (lectura fácil)
                      </label>
                      <textarea
                        id="feedback-message"
                        className="form-control"
                        rows={6}
                        value={feedbackMessage}
                        onChange={e => setFeedbackMessage(e.target.value)}
                        aria-describedby="feedback-help"
                      />
                      <small id="feedback-help" className="text-muted d-block mt-2">
                        {getReadableText('employer.feedback.help')}
                      </small>
                    </div>

                    <div className="mb-3 p-3 bg-light rounded">
                      <h4 className="h6 fw-bold">Vista previa del mensaje</h4>
                      <p className="mb-0 text-muted">{feedbackMessage || 'Aún no hay contenido.'}</p>
                    </div>

                    <div className="d-flex gap-2">
                      <button className="btn btn-primary btn-custom" onClick={handleSendFeedback}>
                        Enviar retroalimentación
                      </button>
                      <button
                        className="btn btn-outline-primary btn-custom"
                        onClick={downloadFeedbackTranscript}
                      >
                        Descargar transcripción
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-custom"
                        onClick={() => {
                          setComposerCandidate(null);
                          setFeedbackMessage('');
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="card card-custom animate-fade-in">
              <div className="card-header bg-transparent border-0 pb-0">
                <h2 className="h4 fw-bold mb-0">Notificaciones</h2>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {sentFeedback.length === 0 && (
                    <div className="list-group-item border-0 px-0 py-2 text-muted small">
                      Aún no has enviado retroalimentación en esta sesión.
                    </div>
                  )}
                  {sentFeedback.slice(0, 3).map(item => (
                    <div key={item.id} className="list-group-item border-0 px-0 py-2">
                      <div className="d-flex align-items-center">
                        <div
                          className="bg-success rounded-circle me-3"
                          style={{ width: '8px', height: '8px' }}
                        ></div>
                        <div className="flex-grow-1">
                          <p className="mb-0 small fw-semibold">
                            Mensaje enviado a {item.candidateName}
                          </p>
                          <small className="text-muted">{item.sentAt}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VacancyDetailModal
        vacancy={selectedVacancy}
        isOpen={isVacancyModalOpen}
        onClose={handleCloseVacancyModal}
        onEdit={handleEditVacancy}
        onCloseVacancy={handleCloseVacancy}
      />

      <CandidateCVModal
        candidate={selectedCandidate}
        isOpen={isCandidateModalOpen}
        onClose={handleCloseCandidateModal}
        onContact={handleContactCandidate}
      />
    </div>
  );
};
