import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
  };
  skills: string;
  accommodations: string;
  experience: string;
}

export const ProfileBuilder: React.FC = () => {
  const { highContrast, easyReading, fontSize, colorScheme } =
    useAccessibility();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [resume, setResume] = useState<ResumeData>({
    personal: { name: '', email: '', phone: '' },
    skills: '',
    accommodations: '',
    experience: '',
  });
  const [announcement, setAnnouncement] = useState(
    `Paso 1 de ${totalSteps}: Datos personales`
  );

  const accessibilityClasses = [
    highContrast ? 'high-contrast' : '',
    easyReading ? 'easy-reading' : '',
    `font-size-${fontSize}`,
    colorScheme !== 'default'
      ? colorScheme === 'high-contrast'
        ? 'high-contrast'
        : colorScheme === 'colorblind'
        ? 'colorblind'
        : 'dark-mode'
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  const stepNames = [
    'Datos personales',
    'Habilidades',
    'Acomodaciones',
    'Experiencia',
  ];

  const updateAnnouncement = (newStep: number) => {
    setAnnouncement(
      `Paso ${newStep} de ${totalSteps}: ${stepNames[newStep - 1]}`
    );
  };

  const next = () => {
    const newStep = Math.min(step + 1, totalSteps);
    setStep(newStep);
    updateAnnouncement(newStep);
  };

  const prev = () => {
    const newStep = Math.max(step - 1, 1);
    setStep(newStep);
    updateAnnouncement(newStep);
  };

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResume(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value,
      },
    }));
  };

  const handleFieldChange = (
    field: 'skills' | 'accommodations' | 'experience',
    value: string
  ) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  const saveResume = () => {
    localStorage.setItem('resumeData', JSON.stringify(resume));
    setAnnouncement('Currículum guardado');
  };

  const generateHTML = () => {
    return `
      <h1>${resume.personal.name}</h1>
      <p>Email: ${resume.personal.email}</p>
      <p>Teléfono: ${resume.personal.phone}</p>
      <h2>Habilidades</h2>
      <p>${resume.skills}</p>
      <h2>Acomodaciones</h2>
      <p>${resume.accommodations}</p>
      <h2>Experiencia</h2>
      <p>${resume.experience}</p>
    `;
  };

  const exportPDF = () => {
    window.print();
  };

  const exportHTML = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Currículum</title></head><body>${generateHTML()}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`container my-4 ${accessibilityClasses}`}>
      <div className='progress mb-4' aria-label='Progreso del formulario'>
        <div
          className='progress-bar'
          role='progressbar'
          style={{ width: `${(step / totalSteps) * 100}%` }}
          aria-valuenow={(step / totalSteps) * 100}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {`Paso ${step} de ${totalSteps}`}
        </div>
      </div>
      <div aria-live='polite' className='sr-only'>
        {announcement}
      </div>

      {step === 1 && (
        <div>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Nombre
            </label>
            <input
              id='name'
              name='name'
              type='text'
              className='form-control'
              value={resume.personal.name}
              onChange={handlePersonalChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              className='form-control'
              value={resume.personal.email}
              onChange={handlePersonalChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='phone' className='form-label'>
              Teléfono
            </label>
            <input
              id='phone'
              name='phone'
              type='tel'
              className='form-control'
              value={resume.personal.phone}
              onChange={handlePersonalChange}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className='mb-3'>
          <label htmlFor='skills' className='form-label'>
            Habilidades
          </label>
          <textarea
            id='skills'
            className='form-control'
            value={resume.skills}
            onChange={e => handleFieldChange('skills', e.target.value)}
          />
        </div>
      )}

      {step === 3 && (
        <div className='mb-3'>
          <label htmlFor='accommodations' className='form-label'>
            Acomodaciones
          </label>
          <textarea
            id='accommodations'
            className='form-control'
            value={resume.accommodations}
            onChange={e => handleFieldChange('accommodations', e.target.value)}
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <div className='mb-3'>
            <label htmlFor='experience' className='form-label'>
              Experiencia
            </label>
            <textarea
              id='experience'
              className='form-control'
              value={resume.experience}
              onChange={e => handleFieldChange('experience', e.target.value)}
            />
          </div>
          <button className='btn btn-success me-2' onClick={saveResume}>
            Guardar
          </button>
          <button className='btn btn-primary me-2' onClick={exportPDF}>
            Exportar PDF
          </button>
          <button className='btn btn-secondary' onClick={exportHTML}>
            Exportar HTML
          </button>
          <div className='mt-4'>
            <h3>Vista previa</h3>
            <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
          </div>
        </div>
      )}

      <div className='d-flex justify-content-between mt-4'>
        {step > 1 && (
          <button className='btn btn-outline-secondary' onClick={prev}>
            Atrás
          </button>
        )}
        {step < totalSteps && (
          <button className='btn btn-primary ms-auto' onClick={next}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileBuilder;
