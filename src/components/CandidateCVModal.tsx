import React from 'react';
import { ScreenReader, useScreenReader } from './ScreenReader';

interface Candidate {
  id: string;
  name: string;
  position: string;
  match: string;
  status: string;
  time: string;
  color: string;
  disability: string;
  experience: string;
  email?: string;
  phone?: string;
  education?: string;
  skills?: string[];
  interests?: string[];
}

interface CandidateCVModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  onContact: (candidateId: string) => void;
}

export const CandidateCVModal: React.FC<CandidateCVModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onContact
}) => {
  const { isReading, startReading, stopReading, handleReadingComplete } = useScreenReader();

  if (!candidate || !isOpen) return null;

  const handleContact = () => {
    onContact(candidate.id);
    onClose();
  };

  const handleReadCV = () => {
    const textToRead = `
      CV de ${candidate.name}
      
      Información Personal:
      Nombre: ${candidate.name}
      Discapacidad: ${candidate.disability}
      Email: ${candidate.email || 'maria.gonzalez@email.com'}
      Teléfono: ${candidate.phone || '+34 600 123 456'}
      Ubicación: Madrid, España
      Disponibilidad: Inmediata
      
      Posición aplicada: ${candidate.position}
      Coincidencia: ${candidate.match}
      Estado: ${candidate.status}
      Fecha de postulación: ${candidate.time}
      
      Experiencia: ${candidate.experience}
      
      Experiencia Relevante:
      Organización y clasificación de productos
      Trabajo en equipo y colaboración
      Seguimiento de instrucciones y procedimientos
      Mantenimiento del orden y limpieza
      
      Educación:
      Formación Básica
      Educación Secundaria Obligatoria
      Centro de Educación Especial - Madrid
      
      Habilidades y Fortalezas:
      Trabajo en Equipo, Organización, Responsabilidad, Motivación, Puntualidad, Aprendizaje Continuo
      
      Intereses Personales:
      Música, Deportes, Arte, Cocina
      
      Adaptaciones Recomendadas:
      Apoyo personalizado continuo
      Horario estructurado y predecible
      Instrucciones claras y paso a paso
      Entorno de trabajo tranquilo
    `;

    startReading(textToRead);
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-gradient-primary text-white">
            <h5 className="modal-title fw-bold">
              <span className="fs-5 me-2">👤</span>
              CV del Candidato
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>
          
          <div className="modal-body">
            {/* Screen Reader Controls */}
            <div className="mb-4 p-3 bg-light rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0 d-flex align-items-center">
                  <span className="fs-5 me-2">🔊</span>
                  Lector de Pantalla
                </h6>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleReadCV}
                  disabled={isReading}
                  title="Leer toda la información del CV"
                >
                  <span className="fs-6 me-1">🔊</span>
                  Leer CV
                </button>
              </div>
              <ScreenReader
                text=""
                isReading={isReading}
                onReadingComplete={handleReadingComplete}
                language="es-ES"
                rate={0.9}
                pitch={1}
                volume={1}
              />
              <small className="text-muted">
                El lector de pantalla leerá toda la información del CV en voz alta para facilitar el acceso a personas con discapacidad visual.
              </small>
            </div>

            {/* Candidate Header */}
            <div className="row align-items-center mb-4">
              <div className="col-md-8">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                    <span className="text-white fw-bold fs-4">{candidate.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="fw-bold text-primary mb-1">{candidate.name}</h4>
                    <p className="text-muted mb-0">{candidate.position}</p>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-3 text-muted">
                  <span className="d-flex align-items-center">
                    <span className="fs-5 me-2">📧</span>
                    <span>{candidate.email || 'maria.gonzalez@email.com'}</span>
                  </span>
                  <span className="d-flex align-items-center">
                    <span className="fs-5 me-2">📞</span>
                    <span>{candidate.phone || '+34 600 123 456'}</span>
                  </span>
                  <span className="d-flex align-items-center">
                    <span className="fs-5 me-2">📅</span>
                    <span>Postulación: {candidate.time}</span>
                  </span>
                </div>
              </div>
              <div className="col-md-4 text-md-end">
                <div className="d-flex flex-column gap-2">
                  <span className="badge bg-success rounded-pill fs-6">{candidate.match} de coincidencia</span>
                  <span className="badge bg-info rounded-pill fs-6">{candidate.disability}</span>
                  <span className={`badge bg-${candidate.color} rounded-pill`}>
                    {candidate.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">👤</span>
                Información Personal
              </h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <p className="mb-2"><strong>Nombre:</strong> {candidate.name}</p>
                  <p className="mb-2"><strong>Discapacidad:</strong> {candidate.disability}</p>
                  <p className="mb-2"><strong>Email:</strong> {candidate.email || 'maria.gonzalez@email.com'}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2"><strong>Teléfono:</strong> {candidate.phone || '+34 600 123 456'}</p>
                  <p className="mb-2"><strong>Ubicación:</strong> Madrid, España</p>
                  <p className="mb-2"><strong>Disponibilidad:</strong> Inmediata</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">💼</span>
                Experiencia
              </h6>
              <p className="text-muted mb-3">{candidate.experience}</p>
              <div className="card bg-light">
                <div className="card-body">
                  <h6 className="fw-bold">Experiencia Relevante:</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex align-items-start">
                      <span className="text-success me-2">•</span>
                      <span className="text-muted">Organización y clasificación de productos</span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="text-success me-2">•</span>
                      <span className="text-muted">Trabajo en equipo y colaboración</span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="text-success me-2">•</span>
                      <span className="text-muted">Seguimiento de instrucciones y procedimientos</span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="text-success me-2">•</span>
                      <span className="text-muted">Mantenimiento del orden y limpieza</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">🎓</span>
                Educación
              </h6>
              <div className="card bg-light">
                <div className="card-body">
                  <h6 className="fw-bold">Formación Básica</h6>
                  <p className="text-muted mb-2">Educación Secundaria Obligatoria</p>
                  <p className="text-muted mb-0">Centro de Educación Especial - Madrid</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">🏷️</span>
                Habilidades y Fortalezas
              </h6>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary rounded-pill px-3 py-2">Trabajo en Equipo</span>
                <span className="badge bg-info rounded-pill px-3 py-2">Organización</span>
                <span className="badge bg-success rounded-pill px-3 py-2">Responsabilidad</span>
                <span className="badge bg-warning rounded-pill px-3 py-2">Motivación</span>
                <span className="badge bg-secondary rounded-pill px-3 py-2">Puntualidad</span>
                <span className="badge bg-dark rounded-pill px-3 py-2">Aprendizaje Continuo</span>
              </div>
            </div>

            {/* Interests */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">❤️</span>
                Intereses Personales
              </h6>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-outline-primary rounded-pill px-3 py-2">Música</span>
                <span className="badge bg-outline-success rounded-pill px-3 py-2">Deportes</span>
                <span className="badge bg-outline-info rounded-pill px-3 py-2">Arte</span>
                <span className="badge bg-outline-warning rounded-pill px-3 py-2">Cocina</span>
              </div>
            </div>

            {/* Adaptations Needed */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center">
                <span className="fs-5 me-2">♿</span>
                Adaptaciones y Apoyos
              </h6>
              <div className="card bg-info bg-opacity-10">
                <div className="card-body">
                  <h6 className="fw-bold text-info">Adaptaciones Recomendadas:</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex align-items-start">
                      <span className="text-info me-2">•</span>
                      <span className="text-muted">Apoyo personalizado continuo</span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="text-info me-2">•</span>
                      <span className="text-muted">Horario estructurado y predecible</span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="text-info me-2">•</span>
                      <span className="text-muted">Instrucciones claras y paso a paso</span>
                    </li>
                    <li className="mb-2 d-flex align-items-start">
                      <span className="text-info me-2">•</span>
                      <span className="text-muted">Entorno de trabajo tranquilo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <div className="d-flex gap-2 w-100">
              <button
                type="button"
                className="btn btn-primary btn-custom flex-fill"
                onClick={handleContact}
              >
                <span className="fs-5 me-2">📞</span>
                Contactar Candidato
              </button>
              <button
                type="button"
                className="btn btn-success btn-custom"
                onClick={handleContact}
              >
                <span className="fs-5 me-2">✅</span>
                Invitar a Entrevista
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