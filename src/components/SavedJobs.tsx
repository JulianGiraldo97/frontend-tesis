import React from 'react';

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

interface SavedJobsProps {
  savedJobs: SavedJob[];
  onRemove: (jobId: string) => void;
  onApply: (jobId: string) => void;
  onViewDetail: (jobId: string) => void;
}

export const SavedJobs: React.FC<SavedJobsProps> = ({
  savedJobs,
  onRemove,
  onApply,
  onViewDetail
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'applied':
        return <span className="badge bg-primary rounded-pill">Postulado</span>;
      case 'interviewed':
        return <span className="badge bg-success rounded-pill">Entrevistado</span>;
      default:
        return <span className="badge bg-secondary rounded-pill">Guardado</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return '📝';
      case 'interviewed':
        return '✅';
      default:
        return '💾';
    }
  };

  if (savedJobs.length === 0) {
    return (
      <div className="card card-custom animate-fade-in">
        <div className="card-body text-center py-5">
          <div className="mb-4">
            <span className="fs-1">💾</span>
          </div>
          <h5 className="fw-bold text-muted mb-3">No tienes empleos guardados</h5>
          <p className="text-muted mb-4">
            Cuando guardes empleos que te interesen, aparecerán aquí para que puedas revisarlos más tarde.
          </p>
          <button className="btn btn-primary btn-custom" aria-label="Ir a la búsqueda de empleos">
            <span className="fs-5 me-2" aria-hidden="true">🔍</span>
            Buscar Empleos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-custom animate-fade-in">
      <div className="card-header bg-transparent border-0 pb-0">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="h4 fw-bold mb-0 d-flex align-items-center">
            <span className="fs-4 me-2">💾</span>
            Empleos Guardados
          </h3>
          <span className="badge bg-primary rounded-pill fs-6">{savedJobs.length} empleos</span>
        </div>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {savedJobs.map((job) => (
            <div key={job.id} className="col-12">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="row align-items-start">
                    <div className="col-md-8">
                      <div className="d-flex align-items-center mb-3">
                        <div
                          className="bg-gradient-primary rounded-3 d-flex align-items-center justify-content-center me-3 saved-job-avatar"
                          aria-hidden="true"
                        >
                          <span className="text-white fw-bold fs-6">{job.company.charAt(0)}</span>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">{job.title}</h6>
                          <p className="text-muted mb-0">{job.company}</p>
                        </div>
                      </div>

                      <div className="d-flex flex-wrap gap-3 mb-3 text-muted">
                        <span className="d-flex align-items-center">
                          <span className="fs-6 me-1">📍</span>
                          <span>{job.location}</span>
                        </span>
                        <span className="d-flex align-items-center">
                          <span className="fs-6 me-1">⏰</span>
                          <span>{job.contractType}</span>
                        </span>
                        <span className="d-flex align-items-center">
                          <span className="fs-6 me-1">💰</span>
                          <span>{job.salary}</span>
                        </span>
                      </div>

                      <div className="d-flex align-items-center gap-3">
                        <span className="badge bg-success rounded-pill">{job.match} de coincidencia</span>
                        {getStatusBadge(job.status)}
                        <small className="text-muted">
                          Guardado {job.savedDate}
                        </small>
                      </div>
                    </div>

                    <div className="col-md-4 mt-3 mt-md-0">
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-primary btn-custom"
                          onClick={() => onApply(job.id)}
                          disabled={job.status === 'applied' || job.status === 'interviewed'}
                          aria-label={`${job.status === 'applied' || job.status === 'interviewed' ? 'Estado actual' : 'Postularse a'} ${job.title}`}
                        >
                          <span className="fs-6 me-1">{getStatusIcon(job.status)}</span>
                          {job.status === 'applied' ? 'Postulado' : job.status === 'interviewed' ? 'Entrevistado' : 'Postularse'}
                        </button>
                        <button
                          className="btn btn-outline-primary btn-custom"
                          onClick={() => onViewDetail(job.id)}
                          aria-label={`Ver detalle del empleo ${job.title}`}
                        >
                          <span className="fs-6 me-1">👁️</span>
                          Ver Detalle
                        </button>
                        <button
                          className="btn btn-outline-danger btn-custom"
                          onClick={() => onRemove(job.id)}
                          aria-label={`Eliminar de guardados el empleo ${job.title}`}
                        >
                          <span className="fs-6 me-1">🗑️</span>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
