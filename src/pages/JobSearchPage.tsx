import React, { useState } from 'react';

export const JobSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [contractType, setContractType] = useState('');
  const [easyReading, setEasyReading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', { searchTerm, location, contractType, easyReading });
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">
                Encuentra tu empleo ideal
              </h1>
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
        {/* Enhanced Search Filters */}
        <div className="card card-custom glass mb-5 animate-fade-in">
          <div className="card-body p-5">
            <h2 className="h3 fw-bold text-dark mb-4 d-flex align-items-center">
              <span className="fs-3 me-3">🔍</span>
              Filtros de búsqueda
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
                    onChange={(e) => setContractType(e.target.value)}
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
                <button 
                  type="submit" 
                  className="btn btn-primary btn-custom px-4 py-3"
                >
                  <span className="fs-5 me-2">🔍</span>
                  Buscar empleos
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Job Listings */}
        <div className="row g-4">
          {[1, 2, 3, 4, 5].map((job) => (
            <div key={job} className="col-12">
              <div className="card card-custom animate-fade-in">
                <div className="card-body p-4">
                  <div className="row align-items-start">
                    <div className="col-md-8">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-gradient-primary rounded-3 d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                          <span className="text-white fw-bold fs-5">TC</span>
                        </div>
                        <div>
                          <h3 className="h4 fw-bold text-dark mb-1">
                            Desarrollador Frontend React
                          </h3>
                          <p className="text-muted fw-semibold mb-0">TechCorp Inc.</p>
                        </div>
                      </div>
                      
                      <div className="d-flex flex-wrap gap-4 mb-3 text-muted">
                        <span className="d-flex align-items-center">
                          <span className="fs-5 me-2">📍</span>
                          <span>Madrid, España</span>
                        </span>
                        <span className="d-flex align-items-center">
                          <span className="fs-5 me-2">⏰</span>
                          <span>Tiempo completo</span>
                        </span>
                        <span className="d-flex align-items-center">
                          <span className="fs-5 me-2">💰</span>
                          <span>$45,000 - $60,000</span>
                        </span>
                      </div>
                      
                      <p className="text-muted mb-3">
                        Buscamos un desarrollador Frontend con experiencia en React y TypeScript
                        para unirse a nuestro equipo de desarrollo de aplicaciones accesibles.
                        Ideal para personas comprometidas con la inclusión digital.
                      </p>
                      
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-primary rounded-pill px-3 py-2">React</span>
                        <span className="badge bg-info rounded-pill px-3 py-2">TypeScript</span>
                        <span className="badge bg-success rounded-pill px-3 py-2">Accesible</span>
                        <span className="badge bg-warning rounded-pill px-3 py-2">WCAG 2.1</span>
                      </div>
                    </div>
                    
                    <div className="col-md-4 mt-3 mt-md-0">
                      <div className="d-flex flex-column gap-2">
                        <button className="btn btn-primary btn-custom">
                          <span className="fs-5 me-2">📝</span>
                          Postularse
                        </button>
                        <button className="btn btn-outline-primary btn-custom">
                          <span className="fs-5 me-2">💾</span>
                          Guardar
                        </button>
                        <button className="btn btn-outline-secondary btn-custom">
                          <span className="fs-5 me-2">👁️</span>
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more button */}
        <div className="text-center mt-5">
          <button className="btn btn-outline-primary btn-custom px-5 py-3">
            <span className="fs-5 me-2">📄</span>
            Cargar más empleos
          </button>
        </div>
      </div>
    </div>
  );
}; 