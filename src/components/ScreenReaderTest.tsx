import React, { useState } from 'react';
import { ScreenReader } from './ScreenReader';
import { useScreenReader } from '../hooks/useScreenReader';

export const ScreenReaderTest: React.FC = () => {
  const { isReading, startReading, handleReadingComplete } = useScreenReader();
  const [testCount, setTestCount] = useState(0);

  const testText = `
    Hola, este es un texto de prueba para el lector de pantalla.
    Si puedes escuchar este mensaje, significa que el lector de pantalla está funcionando correctamente.
    Este es un test de la funcionalidad de síntesis de voz en español.
    La Web Speech API está funcionando correctamente en tu navegador.
    Test número: ${testCount + 1}
  `;

  const handleTestReading = () => {
    setTestCount(prev => prev + 1);
    startReading(testText);
  };

  const handleTestModalSimulation = () => {
    setTimeout(() => {
      const modalText = `
        Vacante: Desarrollador Frontend - Personas con Discapacidad Visual
        Empresa: Empresa de Tecnología Inclusiva
        Ubicación: Madrid, España
        Salario: €25,000 - €35,000
        Estado: Activa
        Candidatos: 15
        Discapacidad objetivo: Discapacidad Visual
        Fecha de publicación: Hace 1 semana
        
        Descripción: Buscamos personas con discapacidad visual para trabajar como desarrolladores frontend.
        El entorno de trabajo está adaptado con lectores de pantalla y otras tecnologías asistivas.
        
        Requisitos: Conocimientos de React y TypeScript. Experiencia con lectores de pantalla.
        Capacidad de trabajo en equipo. Motivación y ganas de aprender.
        
        Beneficios y adaptaciones: Equipamiento adaptado completo. Formación en tecnologías asistivas.
        Trabajo remoto disponible. Horario flexible. Impacto directo en la accesibilidad digital.
        
        Estadísticas: 15 candidatos han aplicado, 5 están en revisión, y 2 han sido invitados a entrevista.
      `;
      startReading(modalText);
    }, 100);
  };

  return (
    <div className="card card-custom p-4">
      <h3 className="fw-bold mb-3">🧪 Test del Lector de Pantalla</h3>
      <div className="mb-3">
        <p className="text-muted">
          Este componente te permite probar si el lector de pantalla funciona correctamente en tu navegador.
        </p>
      </div>
      <div className="mb-3">
        <button
          className="btn btn-primary btn-custom me-2"
          onClick={handleTestReading}
          disabled={isReading}
        >
          <span className="fs-5 me-2">🔊</span>
          Probar Lector de Pantalla
        </button>
        <button
          className="btn btn-success btn-custom"
          onClick={handleTestModalSimulation}
          disabled={isReading}
        >
          <span className="fs-5 me-2">📋</span>
          Simular Modal de Vacante
        </button>
      </div>
      <ScreenReader
        text={testText}
        isReading={isReading}
        onReadingComplete={handleReadingComplete}
        language="es-ES"
        rate={0.9}
        pitch={1}
        volume={1}
      />
      <div className="mt-3">
        <h6 className="fw-bold">Información de Debug:</h6>
        <ul className="list-unstyled">
          <li>• Navegador: {navigator.userAgent}</li>
          <li>• Web Speech API: {'speechSynthesis' in window ? '✅ Disponible' : '❌ No disponible'}</li>
          <li>• SpeechSynthesisUtterance: {'SpeechSynthesisUtterance' in window ? '✅ Disponible' : '❌ No disponible'}</li>
          <li>• Estado de lectura: {isReading ? '🔄 Leyendo' : '⏸️ Detenido'}</li>
          <li>• Contador de tests: {testCount}</li>
        </ul>
      </div>
      <div className="mt-3 p-3 bg-light rounded">
        <h6 className="fw-bold">Texto de prueba:</h6>
        <p className="text-muted mb-0">{testText}</p>
      </div>
      <div className="mt-3 p-3 bg-info bg-opacity-10 rounded">
        <h6 className="fw-bold text-info">Instrucciones de prueba:</h6>
        <ol className="mb-0">
          <li>Haz clic en "Probar Lector de Pantalla" para verificar funcionamiento básico</li>
          <li>Si funciona, haz clic en "Simular Modal de Vacante" para probar el comportamiento del modal</li>
          <li>Escucha la lectura completa y confirma que el estado cambie correctamente</li>
          <li>Si el test funciona pero el modal no, el problema está en la integración</li>
        </ol>
      </div>
    </div>
  );
}; 
