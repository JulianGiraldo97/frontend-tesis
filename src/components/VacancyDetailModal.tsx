import React, { useEffect, useRef, useState } from 'react';
import { ScreenReader, useScreenReader } from './ScreenReader';

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
  const { isReading, startReading, stopReading, handleReadingComplete } = useScreenReader();
  const [isScreenReaderReady, setIsScreenReaderReady] = useState(false);
  const [textToRead, setTextToRead] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  // Detener la lectura cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      stopReading();
      setIsScreenReaderReady(false);
      setTextToRead('');
    }
  }, [isOpen, stopReading]);

  // Verificar cuando el ScreenReader esté listo
  useEffect(() => {
    if (isOpen) {
      // Esperar a que el ScreenReader se inicialice
      const checkScreenReaderReady = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setIsScreenReaderReady(true);
        } else {
          setTimeout(checkScreenReaderReady, 100);
        }
      };
      
      // Esperar un poco más para asegurar que las voces estén cargadas
      setTimeout(checkScreenReaderReady, 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      if (previousFocusedElementRef.current) {
        previousFocusedElementRef.current.focus();
        previousFocusedElementRef.current = null;
      }
      return;
    }

    previousFocusedElementRef.current = document.activeElement as HTMLElement;
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(
      modalRef.current?.querySelectorAll(selector) || []
    ) as HTMLElement[];
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      modalRef.current?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const activeFocusable = Array.from(
        modalRef.current?.querySelectorAll(selector) || []
      ) as HTMLElement[];

      if (activeFocusable.length === 0) {
        event.preventDefault();
        modalRef.current?.focus();
        return;
      }

      const firstElement = activeFocusable[0];
      const lastElement = activeFocusable[activeFocusable.length - 1];
      const isFocusInsideModal = modalRef.current?.contains(document.activeElement) ?? false;

      if (!isFocusInsideModal) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!vacancy || !isOpen) return null;

  const handleEdit = () => {
    onEdit(vacancy.id);
    onClose();
  };

  const handleCloseVacancy = () => {
    onCloseVacancy(vacancy.id);
    onClose();
  };

  const handleReadVacancy = () => {
    if (!isScreenReaderReady) {
      return;
    }

    // Crear el texto a leer
    const text = `
      Vacante: ${vacancy.position}
      Empresa: ${vacancy.company}
      Ubicación: ${vacancy.location}
      Salario: ${vacancy.salary}
      Estado: ${vacancy.status}
      Candidatos: ${vacancy.candidates}
      Discapacidad objetivo: ${vacancy.targetDisability}
      Fecha de publicación: ${vacancy.date}
      
      Descripción: ${vacancy.description || `Buscamos personas con ${vacancy.targetDisability.toLowerCase()} para trabajar en este puesto. El entorno de trabajo está adaptado y se proporciona apoyo personalizado según las necesidades.`}
      
      Requisitos: ${(vacancy.requirements || [
        'Motivación y ganas de trabajar',
        'Capacidad de seguir instrucciones simples',
        'Aptitud para tareas repetitivas',
        'Trabajo en equipo',
        'No requiere experiencia previa'
      ]).join('. ')}
      
      Beneficios y adaptaciones: ${(vacancy.benefits || [
        'Apoyo personalizado continuo',
        'Horario estructurado',
        'Formación adaptada',
        'Entorno de trabajo inclusivo',
        'Seguimiento profesional'
      ]).join('. ')}
      
      Estadísticas: ${vacancy.candidates} candidatos han aplicado, ${Math.floor(vacancy.candidates * 0.3)} están en revisión, y ${Math.floor(vacancy.candidates * 0.1)} han sido invitados a entrevista.
    `;

    setTextToRead(text);
    startReading(text);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vacancy-detail-modal-title"
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content" ref={modalRef} tabIndex={-1}>
          <div className="modal-header bg-gradient-primary text-white">
            <h5 className="modal-title fw-bold" id="vacancy-detail-modal-title">
              <span className="fs-5 me-2">📋</span>
              Detalles de la Vacante
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar detalle de vacante"
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
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleReadVacancy}
                  disabled={isReading || !isScreenReaderReady}
                  title={!isScreenReaderReady ? "Esperando inicialización..." : "Leer toda la información de la vacante"}
                  aria-label="Leer en voz alta la información de la vacante"
                >
                  <span className="fs-6 me-1">🔊</span>
                  {!isScreenReaderReady ? "Inicializando..." : "Leer Vacante"}
                </button>
              </div>
              <ScreenReader
                text={textToRead}
                isReading={isReading}
                onReadingComplete={handleReadingComplete}
                language="es-ES"
                rate={0.9}
                pitch={1}
                volume={1}
              />
              <small className="text-muted">
                El lector de pantalla leerá toda la información de la vacante en voz alta para facilitar el acceso a personas con discapacidad visual.
                {!isScreenReaderReady && " ⏳ Inicializando..."}
              </small>
            </div>

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
                  'Capacidad de seguir instrucciones simples',
                  'Aptitud para tareas repetitivas',
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
                aria-label={`Editar vacante ${vacancy.position}`}
              >
                <span className="fs-5 me-2">✏️</span>
                Editar Vacante
              </button>
              <button
                type="button"
                className="btn btn-warning btn-custom"
                onClick={handleCloseVacancy}
                aria-label={`Cerrar vacante ${vacancy.position}`}
              >
                <span className="fs-5 me-2">❌</span>
                Cerrar Vacante
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-custom"
                onClick={onClose}
                aria-label="Cerrar ventana de detalle de vacante"
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
