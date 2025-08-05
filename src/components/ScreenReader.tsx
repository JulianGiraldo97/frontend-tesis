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
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const startReading = () => {
    if (!isSupported || !isInitialized || !selectedVoice) {
      console.error('Speech Synthesis no está disponible, inicializado o no hay voz seleccionada');
      setError('El lector de pantalla no está listo');
      return;
    }

    try {
      // Detener cualquier lectura previa
      window.speechSynthesis.cancel();

      // Crear nueva instancia de SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedVoice.lang;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      utterance.voice = selectedVoice;

      console.log('Configurando utterance con voz:', selectedVoice.name, 'idioma:', selectedVoice.lang);

      // Configurar eventos
      utterance.onstart = () => {
        console.log('Iniciando lectura...');
        setIsPaused(false);
        setError(null);
      };

      utterance.onend = () => {
        console.log('Lectura completada');
        setIsPaused(false);
        onReadingComplete();
      };

      utterance.onerror = (event) => {
        console.error('Error en la síntesis de voz:', event);
        setIsPaused(false);
        setError(`Error al leer: ${event.error}`);
        onReadingComplete();
      };

      // Guardar referencia
      speechRef.current = utterance;

      // Iniciar lectura
      window.speechSynthesis.speak(utterance);
      console.log('Comando de lectura enviado');
      
    } catch (err) {
      console.error('Error al iniciar la lectura:', err);
      setError('Error al iniciar la lectura');
      onReadingComplete();
    }
  };

  const stopReading = () => {
    if (!isSupported) return;
    
    try {
      window.speechSynthesis.cancel();
      setIsPaused(false);
      setError(null);
      console.log('Lectura detenida');
    } catch (err) {
      console.error('Error al detener la lectura:', err);
    }
  };

  useEffect(() => {
    // Verificar si la Web Speech API está disponible
    if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
      setIsSupported(true);
      
      // Inicializar la síntesis de voz
      const initSpeechSynthesis = () => {
        try {
          // Verificar si hay voces disponibles
          const voices = window.speechSynthesis.getVoices();
          console.log('Voces disponibles:', voices.length);
          
          if (voices.length > 0) {
            // Seleccionar la mejor voz disponible
            let bestVoice = voices[0]; // Voz por defecto
            
            // Buscar una voz en español
            const spanishVoice = voices.find(voice => 
              voice.lang.startsWith('es') || voice.lang.startsWith('es-ES')
            );
            
            if (spanishVoice) {
              bestVoice = spanishVoice;
              console.log('Voz en español encontrada:', spanishVoice.name, spanishVoice.lang);
            } else {
              // Si no hay voz en español, buscar una voz en inglés
              const englishVoice = voices.find(voice => 
                voice.lang.startsWith('en')
              );
              if (englishVoice) {
                bestVoice = englishVoice;
                console.log('Voz en inglés encontrada:', englishVoice.name, englishVoice.lang);
              }
            }
            
            setSelectedVoice(bestVoice);
            setIsInitialized(true);
            console.log('Speech Synthesis inicializado correctamente con voz:', bestVoice.name);
          } else {
            // Esperar a que las voces se carguen
            window.speechSynthesis.onvoiceschanged = () => {
              const voices = window.speechSynthesis.getVoices();
              console.log('Voces cargadas:', voices.length);
              
              if (voices.length > 0) {
                let bestVoice = voices[0];
                
                const spanishVoice = voices.find(voice => 
                  voice.lang.startsWith('es') || voice.lang.startsWith('es-ES')
                );
                
                if (spanishVoice) {
                  bestVoice = spanishVoice;
                  console.log('Voz en español encontrada:', spanishVoice.name, spanishVoice.lang);
                } else {
                  const englishVoice = voices.find(voice => 
                    voice.lang.startsWith('en')
                  );
                  if (englishVoice) {
                    bestVoice = englishVoice;
                    console.log('Voz en inglés encontrada:', englishVoice.name, englishVoice.lang);
                  }
                }
                
                setSelectedVoice(bestVoice);
                setIsInitialized(true);
                console.log('Speech Synthesis inicializado correctamente con voz:', bestVoice.name);
              }
            };
          }
        } catch (err) {
          console.error('Error al inicializar Speech Synthesis:', err);
          setError('Error al inicializar el lector de pantalla');
        }
      };

      // Intentar inicializar inmediatamente
      initSpeechSynthesis();
      
      // También intentar después de un pequeño delay
      setTimeout(initSpeechSynthesis, 100);
    } else {
      console.warn('Web Speech API no está disponible en este navegador');
      setError('Web Speech API no está disponible en este navegador');
    }
  }, []);

  useEffect(() => {
    if (!isSupported || !isInitialized || !selectedVoice) return;
    if (isReading && text) {
      startReading();
    } else if (!isReading) {
      stopReading();
    }
  }, [isReading, text, isSupported, isInitialized, selectedVoice, startReading, stopReading]);

  const pauseReading = () => {
    if (!isSupported) return;
    
    try {
      window.speechSynthesis.pause();
      setIsPaused(true);
      console.log('Lectura pausada');
    } catch (err) {
      console.error('Error al pausar la lectura:', err);
    }
  };

  const resumeReading = () => {
    if (!isSupported) return;
    
    try {
      window.speechSynthesis.resume();
      setIsPaused(false);
      console.log('Lectura reanudada');
    } catch (err) {
      console.error('Error al reanudar la lectura:', err);
    }
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

  if (!isInitialized || !selectedVoice) {
    return (
      <div className="alert alert-info" role="alert">
        <div className="d-flex align-items-center">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <span>Inicializando lector de pantalla...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-reader-controls d-flex align-items-center gap-2 mb-3">
      {error && (
        <div className="alert alert-danger alert-sm mb-2" role="alert">
          <span className="fs-6 me-1">❌</span>
          {error}
        </div>
      )}
      
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

      {/* Debug info */}
      <div className="ms-auto">
        <small className="text-muted">
          Estado: {isSupported ? 'Soportado' : 'No soportado'} | 
          Inicializado: {isInitialized ? 'Sí' : 'No'} | 
          Voz: {selectedVoice ? selectedVoice.name : 'No seleccionada'} | 
          Leyendo: {isReading ? 'Sí' : 'No'}
        </small>
      </div>
    </div>
  );
};

// Hook personalizado para el lector de pantalla
export const useScreenReader = () => {
  const [isReading, setIsReading] = useState(false);
  const [currentText, setCurrentText] = useState('');

  const startReading = (text: string) => {
    console.log('Iniciando lectura con texto:', text.substring(0, 100) + '...');
    setCurrentText(text);
    setIsReading(true);
  };

  const stopReading = () => {
    console.log('Deteniendo lectura');
    setIsReading(false);
    setCurrentText('');
  };

  const handleReadingComplete = () => {
    console.log('Lectura completada');
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