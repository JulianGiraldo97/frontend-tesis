import React from 'react';

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

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
  isSaved: boolean;
  jobStatus?: 'saved' | 'applied' | 'interviewed';
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isOpen,
  onClose,
  onApply,
  onSave,
  isSaved,
  jobStatus = 'saved'
}) => {
  if (!job || !isOpen) return null;

  const handleApply = () => {
    onApply(job.id);
    onClose();
  };

  const handleSave = () => {
    onSave(job.id);
  };

  const getApplyButtonText = () => {
    switch (jobStatus) {
      case 'applied':
        return 'Postulado';
      case 'interviewed':
        return 'Entrevistado';
      default:
        return 'Postularse';
    }
  };

  const getApplyButtonIcon = () => {
    switch (jobStatus) {
      case 'applied':
        return '📝';
      case 'interviewed':
        return '✅';
      default:
        return '📝';
    }
  };

  const isApplyDisabled = jobStatus === 'applied' || jobStatus === 'interviewed';

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-gradient-primary text-white">
            <h5 className="modal-title fw-bold">
              <span className="fs-5 me-2">💼</span>
              {job.title}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>
          
          <div className="modal-body">
            {/* Job Header */}
            <div className="row align-items-center mb-4">
              <div className="col-md-8">
                <h4 className="fw-bold text-primary mb-2">{job.title}</h4>
                <p className="text-muted fw-semibold mb-2">{job.company}</p>
                <div className="d-flex flex-wrap gap-3 text-muted">
                  <span className="d-flex align-items-center">
                    <span className="fs-5 me-2">📍</span>
                    <span>{job.location}</span>
                  </span>
                  <span className="d-flex align-items-center">
                    <span className="fs-5 me-2">⏰</span>
                    <span>{job.contractType}</span>
                  </span>
                  <span className="d-flex align-items-center">
                    <span className="fs-5 me-2">💰</span>
                    <span>{job.salary}</span>
                  </span>
                </div>
              </div>
              <div className="col-md-4 text-md-end">
                <div className="d-flex flex-column gap-2">
                  <span className="badge bg-success rounded-pill fs-6">{job.match} de coincidencia</span>
                  <small className="text-muted">Publicado {job.postedDate}</small>
                  <small className="text-muted">{job.applications} postulaciones</small>
                  {/* Status badge */}
                  {jobStatus !== 'saved' && (
                    <span className={`badge rounded-pill ${
                      jobStatus === 'applied' ? 'bg-primary' : 'bg-success'
                    }`}>
                      {jobStatus === 'applied' ? 'Postulado' : 'Entrevistado'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">📝</span>
                Descripción del Empleo
              </h6>
              <p className="text-muted">{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">✅</span>
                Requisitos
              </h6>
              <ul className="list-unstyled">
                {job.requirements.map((requirement, index) => (
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
                Beneficios
              </h6>
              <ul className="list-unstyled">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="mb-2 d-flex align-items-start">
                    <span className="text-primary me-2">•</span>
                    <span className="text-muted">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Tags */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">🏷️</span>
                Habilidades Requeridas
              </h6>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary rounded-pill px-3 py-2">React</span>
                <span className="badge bg-info rounded-pill px-3 py-2">TypeScript</span>
                <span className="badge bg-success rounded-pill px-3 py-2">JavaScript</span>
                <span className="badge bg-warning rounded-pill px-3 py-2">CSS3</span>
                <span className="badge bg-secondary rounded-pill px-3 py-2">HTML5</span>
                <span className="badge bg-dark rounded-pill px-3 py-2">Git</span>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <div className="d-flex gap-2 w-100">
              <button
                type="button"
                className={`btn ${isApplyDisabled ? 'btn-secondary' : 'btn-primary'} btn-custom flex-fill`}
                onClick={handleApply}
                disabled={isApplyDisabled}
              >
                <span className="fs-5 me-2">{getApplyButtonIcon()}</span>
                {getApplyButtonText()}
              </button>
              <button
                type="button"
                className={`btn ${isSaved ? 'btn-success' : 'btn-outline-primary'} btn-custom`}
                onClick={handleSave}
              >
                <span className="fs-5 me-2">💾</span>
                {isSaved ? 'Guardado' : 'Guardar'}
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