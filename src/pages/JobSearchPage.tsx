import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { closedJobIds, mockJobs, MockJob } from '../data/mockData';
import {
  getJobInteractionState,
  saveJobInteractionState,
} from '../services/mockStorage';

type ContractTypeFilter = '' | 'full-time' | 'part-time' | 'contract' | 'freelance';

const normalizeContractType = (contractLabel: string): ContractTypeFilter => {
  const normalized = contractLabel.toLowerCase();
  if (normalized.includes('completo')) return 'full-time';
  if (normalized.includes('parcial')) return 'part-time';
  if (normalized.includes('contrato')) return 'contract';
  if (normalized.includes('freelance')) return 'freelance';
  return '';
};

export const JobSearchPage: React.FC = () => {
  const { user } = useAuth();
  const { getReadableText } = useAccessibility();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [contractType, setContractType] = useState<ContractTypeFilter>(
    (searchParams.get('contract') as ContractTypeFilter) || ''
  );
  const [easyReading, setEasyReading] = useState(searchParams.get('easy') === '1');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  useEffect(() => {
    const userId = user?.id || 'guest';
    const state = getJobInteractionState(userId);
    setSavedJobs(state.savedJobIds);
    setAppliedJobs(state.appliedJobIds);
  }, [user?.id]);

  useEffect(() => {
    saveJobInteractionState(user?.id || 'guest', {
      savedJobIds: savedJobs,
      appliedJobIds: appliedJobs,
    });
  }, [savedJobs, appliedJobs, user?.id]);

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
    setLocation(searchParams.get('location') || '');
    setContractType((searchParams.get('contract') as ContractTypeFilter) || '');
    setEasyReading(searchParams.get('easy') === '1');
  }, [searchParams]);

  const updateQueryParams = (
    nextSearchTerm: string,
    nextLocation: string,
    nextContractType: ContractTypeFilter,
    nextEasyReading: boolean
  ) => {
    const params = new URLSearchParams();
    if (nextSearchTerm.trim()) params.set('q', nextSearchTerm.trim());
    if (nextLocation.trim()) params.set('location', nextLocation.trim());
    if (nextContractType) params.set('contract', nextContractType);
    if (nextEasyReading) params.set('easy', '1');
    setSearchParams(params, { replace: true });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateQueryParams(searchTerm, location, contractType, easyReading);
  };

  const handleApply = (jobId: string) => {
    if (closedJobIds.includes(jobId)) {
      return;
    }

    setAppliedJobs(prev => {
      if (prev.includes(jobId)) return prev;
      return [...prev, jobId];
    });
  };

  const handleSave = (jobId: string) => {
    setSavedJobs(prev => {
      return prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId];
    });
  };

  const handleViewDetail = (job: MockJob) => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('q', searchTerm.trim());
    if (location.trim()) params.set('location', location.trim());
    if (contractType) params.set('contract', contractType);
    if (easyReading) params.set('easy', '1');

    const backTo = `/jobs${params.toString() ? `?${params.toString()}` : ''}`;
    navigate(`/job/${job.id}`, {
      state: {
        backTo,
      },
    });
  };

  const filteredJobs = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();

    return mockJobs.filter(job => {
      const matchesTerm =
        !normalizedTerm ||
        job.title.toLowerCase().includes(normalizedTerm) ||
        job.company.toLowerCase().includes(normalizedTerm) ||
        job.description.toLowerCase().includes(normalizedTerm);

      const matchesLocation =
        !normalizedLocation || job.location.toLowerCase().includes(normalizedLocation);

      const matchesContract =
        !contractType || normalizeContractType(job.contractType) === contractType;

      return matchesTerm && matchesLocation && matchesContract;
    });
  }, [searchTerm, location, contractType]);

  return (
    <div className="min-vh-100 bg-light">
      <div className="bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">Encuentra tu empleo ideal</h1>
              <p className="lead mb-5">
                Plataforma accesible de intermediación laboral diseñada para todos
              </p>
              <div className="d-flex justify-content-center gap-4 flex-wrap">
                <div className="bg-white bg-opacity-10 rounded-pill px-4 py-2 d-flex align-items-center">
                  <span className="fs-4 me-2">🎯</span>
                  <span className="fw-semibold">+1,234 empleos</span>
                </div>
                <div className="bg-white bg-opacity-10 rounded-pill px-4 py-2 d-flex align-items-center">
                  <span className="fs-4 me-2">🏢</span>
                  <span className="fw-semibold">+567 empresas</span>
                </div>
                <div className="bg-white bg-opacity-10 rounded-pill px-4 py-2 d-flex align-items-center">
                  <span className="fs-4 me-2">✅</span>
                  <span className="fw-semibold">100% accesible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="card card-custom glass mb-5 animate-fade-in">
          <div className="card-body p-5">
            <h2 className="h3 fw-bold text-dark mb-4 d-flex align-items-center">
              <span className="fs-3 me-3">🔍</span>
              {getReadableText('jobs.searchFilters')}
            </h2>

            <form onSubmit={handleSearch}>
              <div className="row g-4 mb-4">
                <div className="col-md-4">
                  <label htmlFor="searchTerm" className="form-label fw-semibold">
                    Palabras clave
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="React, TypeScript, Frontend..."
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="location" className="form-label fw-semibold">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Madrid, España"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="contractType" className="form-label fw-semibold">
                    Tipo de contrato
                  </label>
                  <select
                    className="form-select form-control-custom"
                    id="contractType"
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value as ContractTypeFilter)}
                  >
                    <option value="">Todos los tipos</option>
                    <option value="full-time">Tiempo completo</option>
                    <option value="part-time">Tiempo parcial</option>
                    <option value="contract">Contrato</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="easyReading"
                      checked={easyReading}
                      onChange={(e) => setEasyReading(e.target.checked)}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="easyReading">
                      Modo lectura fácil
                    </label>
                  </div>
                  <div className="d-flex align-items-center text-muted">
                    <span className="fs-5 me-2">♿</span>
                    <span>Accesible</span>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-custom px-4 py-3"
                    onClick={() => {
                      setSearchTerm('');
                      setLocation('');
                      setContractType('');
                      setEasyReading(false);
                      setSearchParams({}, { replace: true });
                    }}
                  >
                    Limpiar filtros
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-custom px-4 py-3"
                    aria-label="Buscar empleos con los filtros seleccionados"
                  >
                    <span className="fs-5 me-2">🔍</span>
                    {getReadableText('jobs.searchButton')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mb-4" role="status" aria-live="polite">
          <p className="text-muted mb-0">
            Se encontraron <strong>{filteredJobs.length}</strong> vacantes con los filtros actuales.
          </p>
        </div>

        <div className="row g-4">
          {filteredJobs.length === 0 && (
            <div className="col-12">
              <div className="alert alert-info" role="status">
                {getReadableText('jobs.noResults')}
              </div>
            </div>
          )}

          {filteredJobs.map((job) => {
            const isApplied = appliedJobs.includes(job.id);
            const isSaved = savedJobs.includes(job.id);
            const isClosed = closedJobIds.includes(job.id);

            return (
              <div key={job.id} className="col-12">
                <div className="card card-custom animate-fade-in">
                  <div className="card-body p-4">
                    <div className="row align-items-start">
                      <div className="col-md-8">
                        <div className="d-flex align-items-center mb-3">
                          <div
                            className="bg-gradient-primary rounded-3 d-flex align-items-center justify-content-center me-3"
                            style={{ width: '60px', height: '60px' }}
                            aria-hidden="true"
                          >
                            <span className="text-white fw-bold fs-5">{job.company.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="h4 fw-bold text-dark mb-1">{job.title}</h3>
                            <p className="text-muted fw-semibold mb-0">{job.company}</p>
                          </div>
                        </div>

                        <div className="d-flex flex-wrap gap-4 mb-3 text-muted">
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

                        <p className="text-muted mb-3">{job.description}</p>

                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge bg-primary rounded-pill px-3 py-2">React</span>
                          <span className="badge bg-info rounded-pill px-3 py-2">TypeScript</span>
                          <span className="badge bg-success rounded-pill px-3 py-2">Accesible</span>
                          <span className="badge bg-warning rounded-pill px-3 py-2">WCAG 2.1</span>
                          {isClosed && <span className="badge bg-secondary rounded-pill px-3 py-2">Vacante cerrada</span>}
                        </div>
                      </div>

                      <div className="col-md-4 mt-3 mt-md-0">
                        <div className="d-flex flex-column gap-2">
                          <button
                            className="btn btn-primary btn-custom"
                            onClick={() => handleApply(job.id)}
                            disabled={isApplied || isClosed}
                            aria-label={`${isApplied ? 'Ya postulado' : 'Postularse a'} ${job.title}`}
                          >
                            <span className="fs-5 me-2">{isApplied ? '✅' : '📝'}</span>
                            {isApplied ? 'Postulado' : isClosed ? 'Vacante cerrada' : 'Postularse'}
                          </button>
                          <button
                            className={`btn ${isSaved ? 'btn-success' : 'btn-outline-primary'} btn-custom`}
                            onClick={() => handleSave(job.id)}
                            aria-label={`${isSaved ? 'Quitar de guardados' : 'Guardar'} ${job.title}`}
                          >
                            <span className="fs-5 me-2">💾</span>
                            {isSaved ? 'Guardado' : 'Guardar'}
                          </button>
                          <button
                            className="btn btn-outline-secondary btn-custom"
                            onClick={() => handleViewDetail(job)}
                            aria-label={`Ver detalles del empleo ${job.title}`}
                          >
                            <span className="fs-5 me-2">👁️</span>
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-5">
          <button
            className="btn btn-outline-primary btn-custom px-5 py-3"
            aria-label="Cargar más empleos"
          >
            <span className="fs-5 me-2">📄</span>
            Cargar más empleos
          </button>
        </div>
      </div>
    </div>
  );
};
