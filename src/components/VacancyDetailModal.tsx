import React from 'react';

interface Vacancy {
  id: string;
  position: string;
  company: string;
  candidates: number;
  status: string;
  date: string;
  color: string;
  targetDisability: string;
  salary: string;
  location: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
}

interface VacancyDetailModalProps {
  vacancy: Vacancy | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (vacancyId: string) => void;
  onCloseVacancy: (vacancyId: string) => void;
}

export const VacancyDetailModal: React.FC<VacancyDetailModalProps> = ({
  vacancy,
  isOpen,
  onClose,
  onEdit,
  onCloseVacancy
}) => {
  if (!vacancy || !isOpen) return null;

  const handleEdit = () => {
    onEdit(vacancy.id);
    onClose();
  };

  const handleCloseVacancy = () => {
    onCloseVacancy(vacancy.id);
    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-gradient-primary text-white">
            <h5 className="modal-title fw-bold">
              <span className="fs-5 me-2">📋</span>
              Detalles de la Vacante
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>
          
          <div className="modal-body">
            {/* Vacancy Header */}
            <div className="row align-items-center mb-4">
              <div className="col-md-8">
                <h4 className="fw-bold text-primary mb-2">{vacancy.position}</h4>
                <p className="text-muted fw-semibold mb-2">{vacancy.company}</p>
                <div className="d-flex flex-wrap gap-3 text-muted">
                  <span className="d-flex align-items-center">
                    <span className="fs-5 me-2">📍</span>
                    <span>{vacancy.location}</span>
                  </span>
                  <span className="d-flex align-items-center">
                    <span className="fs-5 me-2">💰</span>
                    <span>{vacancy.salary}</span>
                  </span>
                  <span className="d-flex align-items-center">
                    <span className="fs-5 me-2">📅</span>
                    <span>{vacancy.date}</span>
                  </span>
                </div>
              </div>
              <div className="col-md-4 text-md-end">
                <div className="d-flex flex-column gap-2">
                  <span className="badge bg-info rounded-pill fs-6">{vacancy.targetDisability}</span>
                  <span className="badge bg-primary rounded-pill fs-6">{vacancy.candidates} candidatos</span>
                  <span className={`badge bg-${vacancy.color} rounded-pill`}>
                    {vacancy.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Vacancy Description */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">📝</span>
                Descripción del Puesto
              </h6>
              <p className="text-muted">
                {vacancy.description || `Buscamos personas con ${vacancy.targetDisability.toLowerCase()} para trabajar en este puesto. El entorno de trabajo está adaptado y se proporciona apoyo personalizado según las necesidades.`}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">✅</span>
                Requisitos
              </h6>
              <ul className="list-unstyled">
                {(vacancy.requirements || [
                  'Motivación y ganas de trabajar',
                  'Capacidad de seguir instrucciones',
                  'Trabajo en equipo',
                  'No requiere experiencia previa'
                ]).map((requirement, index) => (
                  <li key={index} className="mb-2 d-flex align-items-start">
                    <span className="text-success me-2">•</span>
                    <span className="text-muted">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">🎁</span>
                Beneficios y Adaptaciones
              </h6>
              <ul className="list-unstyled">
                {(vacancy.benefits || [
                  'Apoyo personalizado continuo',
                  'Horario estructurado',
                  'Formación adaptada',
                  'Entorno de trabajo inclusivo',
                  'Seguimiento profesional'
                ]).map((benefit, index) => (
                  <li key={index} className="mb-2 d-flex align-items-start">
                    <span className="text-primary me-2">•</span>
                    <span className="text-muted">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Statistics */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">📊</span>
                Estadísticas de la Vacante
              </h6>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="text-center p-3 bg-light rounded">
                    <h4 className="fw-bold text-primary mb-1">{vacancy.candidates}</h4>
                    <small className="text-muted">Candidatos</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-3 bg-light rounded">
                    <h4 className="fw-bold text-success mb-1">{Math.floor(vacancy.candidates * 0.3)}</h4>
                    <small className="text-muted">En Revisión</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-3 bg-light rounded">
                    <h4 className="fw-bold text-info mb-1">{Math.floor(vacancy.candidates * 0.1)}</h4>
                    <small className="text-muted">Entrevistas</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <div className="d-flex gap-2 w-100">
              <button
                type="button"
                className="btn btn-primary btn-custom flex-fill"
                onClick={handleEdit}
              >
                <span className="fs-5 me-2">✏️</span>
                Editar Vacante
              </button>
              <button
                type="button"
                className="btn btn-warning btn-custom"
                onClick={handleCloseVacancy}
              >
                <span className="fs-5 me-2">❌</span>
                Cerrar Vacante
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-custom"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 