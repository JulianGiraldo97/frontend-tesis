import React, { useState, useEffect, useRef } from 'react';

interface ScreenReaderProps {
  text: string;
  isReading: boolean;
  onReadingComplete: () => void;
  language?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const ScreenReader: React.FC<ScreenReaderProps> = ({
  text,
  isReading,
  onReadingComplete,
  language = 'es-ES',
  rate = 0.9,
  pitch = 1,
  volume = 1
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Verificar si la Web Speech API está disponible
    if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
      setIsSupported(true);
    } else {
      console.warn('Web Speech API no está disponible en este navegador');
    }
  }, []);

  useEffect(() => {
    if (!isSupported) return;

    if (isReading && text) {
      startReading();
    } else if (!isReading) {
      stopReading();
    }
  }, [isReading, text, isSupported]);

  const startReading = () => {
    if (!isSupported) return;

    // Detener cualquier lectura previa
    window.speechSynthesis.cancel();

    // Crear nueva instancia de SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    // Configurar eventos
    utterance.onstart = () => {
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPaused(false);
      onReadingComplete();
    };

    utterance.onerror = (event) => {
      console.error('Error en la síntesis de voz:', event);
      setIsPaused(false);
      onReadingComplete();
    };

    // Guardar referencia
    speechRef.current = utterance;

    // Iniciar lectura
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPaused(false);
  };

  const pauseReading = () => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resumeReading = () => {
    if (!isSupported) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  if (!isSupported) {
    return (
      <div className="alert alert-warning" role="alert">
        <span className="fs-5 me-2">⚠️</span>
        El lector de pantalla no está disponible en este navegador. 
        Te recomendamos usar Chrome, Firefox o Safari para una mejor experiencia.
      </div>
    );
  }

  return (
    <div className="screen-reader-controls d-flex align-items-center gap-2 mb-3">
      <button
        className={`btn btn-sm ${isReading && !isPaused ? 'btn-warning' : 'btn-primary'}`}
        onClick={isReading && !isPaused ? pauseReading : resumeReading}
        disabled={!isReading}
        title={isReading && !isPaused ? 'Pausar lectura' : 'Reanudar lectura'}
      >
        <span className="fs-6 me-1">
          {isReading && !isPaused ? '⏸️' : '▶️'}
        </span>
        {isReading && !isPaused ? 'Pausar' : 'Reanudar'}
      </button>
      
      <button
        className="btn btn-danger btn-sm"
        onClick={stopReading}
        disabled={!isReading}
        title="Detener lectura"
      >
        <span className="fs-6 me-1">⏹️</span>
        Detener
      </button>

      {isReading && (
        <div className="d-flex align-items-center">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
            <span className="visually-hidden">Leyendo...</span>
          </div>
          <small className="text-muted">Leyendo contenido...</small>
        </div>
      )}
    </div>
  );
};

// Hook personalizado para el lector de pantalla
export const useScreenReader = () => {
  const [isReading, setIsReading] = useState(false);
  const [currentText, setCurrentText] = useState('');

  const startReading = (text: string) => {
    setCurrentText(text);
    setIsReading(true);
  };

  const stopReading = () => {
    setIsReading(false);
    setCurrentText('');
  };

  const handleReadingComplete = () => {
    setIsReading(false);
  };

  return {
    isReading,
    currentText,
    startReading,
    stopReading,
    handleReadingComplete
  };
}; 