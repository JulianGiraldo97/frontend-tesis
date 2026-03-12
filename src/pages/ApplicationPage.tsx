import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { closedJobIds, mockJobs } from '../data/mockData';
import {
  getJobInteractionState,
  getStoredProfileData,
  isStoredProfileComplete,
  saveJobInteractionState,
  saveSubmittedApplication,
} from '../services/mockStorage';

export const ApplicationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const selectedJob = mockJobs.find(job => job.id === id) || mockJobs[0];
  const userId = user?.id || 'guest';

  const interactionState = getJobInteractionState(userId);
  const isApplied = interactionState.appliedJobIds.includes(selectedJob.id);
  const isClosed = closedJobIds.includes(selectedJob.id);
  const isProfileComplete = isStoredProfileComplete(getStoredProfileData(userId));

  const applicationBlockedReason = isApplied
    ? 'applied'
    : isClosed
      ? 'closed'
      : !isProfileComplete
        ? 'incomplete-profile'
        : null;

  const [currentStep, setCurrentStep] = useState(1);
  const coverLetterHelpId = 'cover-letter-help';
  const resumeHelpId = 'resume-help';
  const [fileError, setFileError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null as File | null
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResumeChange = (file: File | null) => {
    setFileError('');
    if (!file) {
      setFormData({ ...formData, resume: null });
      return;
    }

    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const maxSizeInBytes = 5 * 1024 * 1024;

    if (!allowedExtensions.includes(extension)) {
      setFileError('El archivo debe ser PDF, DOC o DOCX');
      setFormData({ ...formData, resume: null });
      return;
    }

    if (file.size > maxSizeInBytes) {
      setFileError('El archivo no puede superar 5MB');
      setFormData({ ...formData, resume: null });
      return;
    }

    setFormData({ ...formData, resume: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitMessage('');

    if (applicationBlockedReason) {
      setSubmitError('No es posible enviar la postulación por el estado actual.');
      return;
    }

    if (!formData.resume) {
      setFileError('Debes adjuntar un CV válido');
      return;
    }

    try {
      saveSubmittedApplication(userId, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resumeFileName: formData.resume.name,
      });

      if (!interactionState.appliedJobIds.includes(selectedJob.id)) {
        saveJobInteractionState(userId, {
          savedJobIds: interactionState.savedJobIds,
          appliedJobIds: [...interactionState.appliedJobIds, selectedJob.id],
        });
      }

      setSubmitMessage('Postulación enviada y guardada correctamente');
      setFormData({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null,
      });
      setCurrentStep(1);
    } catch {
      setSubmitError('No se pudo guardar la postulación. Intenta nuevamente.');
    }
  };

  const steps = [
    { number: 1, title: 'Información Personal' },
    { number: 2, title: 'Carta de Presentación' },
    { number: 3, title: 'Documentos' }
  ];

  const renderBlockedView = () => {
    if (!applicationBlockedReason) return null;

    const messageByReason = {
      applied: 'Ya te postulaste a esta vacante. Puedes revisar el estado en tu perfil.',
      closed: 'La vacante está cerrada y no acepta nuevas postulaciones.',
      'incomplete-profile': 'Tu perfil está incompleto. Debes completar tus datos antes de postularte.',
    } as const;

    const actionByReason = {
      applied: (
        <Link to="/profile" className="btn btn-primary btn-custom">
          Ver estado en mi perfil
        </Link>
      ),
      closed: (
        <Link to="/jobs" className="btn btn-primary btn-custom">
          Buscar otras vacantes
        </Link>
      ),
      'incomplete-profile': (
        <Link to="/profile" className="btn btn-primary btn-custom">
          Completar perfil
        </Link>
      ),
    } as const;

    const role = applicationBlockedReason === 'closed' ? 'alert' : 'status';

    return (
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className={`alert ${applicationBlockedReason === 'closed' ? 'alert-warning' : 'alert-info'}`} role={role}>
            {messageByReason[applicationBlockedReason]}
          </div>
          <div className="d-flex flex-wrap gap-2">
            {actionByReason[applicationBlockedReason]}
            <Link to={`/job/${selectedJob.id}`} className="btn btn-outline-secondary btn-custom">
              Volver al detalle de la vacante
            </Link>
          </div>
        </div>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <nav className="text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
                <Link to="/jobs" className="hover:text-gray-700">Empleos</Link>
                <span className="mx-2">/</span>
                <Link to={`/job/${selectedJob.id}`} className="hover:text-gray-700">{selectedJob.title}</Link>
                <span className="mx-2">/</span>
                <span>Postulación</span>
              </nav>
              <h1 className="text-3xl font-bold text-gray-900">Postulación</h1>
            </div>
          </div>
        </div>
      </header>

      {applicationBlockedReason ? (
        renderBlockedView()
      ) : (
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep >= step.number
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.number}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep >= step.number ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.number ? 'bg-green-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <form onSubmit={handleSubmit}>
                {submitMessage && (
                  <div className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-700" role="status">
                    {submitMessage}
                  </div>
                )}
                {submitError && (
                  <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700" role="alert">
                    {submitError}
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>

                    <Input
                      type="text"
                      label="Nombre completo"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />

                    <Input
                      type="email"
                      label="Correo electrónico"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />

                    <Input
                      type="tel"
                      label="Teléfono"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Carta de Presentación</h2>

                    <div>
                      <label htmlFor="cover-letter" className="block text-sm font-medium text-gray-700 mb-2">
                        Carta de presentación
                      </label>
                      <textarea
                        id="cover-letter"
                        rows={6}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="Explica por qué te interesa este puesto y por qué serías un buen candidato..."
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                        aria-describedby={coverLetterHelpId}
                        required
                      />
                      <p id={coverLetterHelpId} className="mt-1 text-sm text-gray-500">
                        Escribe un resumen breve de tu motivación y experiencia relevante.
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Documentos</h2>

                    <div>
                      <label htmlFor="resume-file" className="block text-sm font-medium text-gray-700 mb-2">
                        CV/Resumen
                      </label>
                      <input
                        id="resume-file"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        onChange={(e) => handleResumeChange(e.target.files?.[0] || null)}
                        aria-describedby={resumeHelpId}
                        required
                      />
                      <p id={resumeHelpId} className="mt-1 text-sm text-gray-500">
                        Formatos aceptados: PDF, DOC, DOCX (máximo 5MB)
                      </p>
                      {fileError && (
                        <p className="mt-1 text-sm text-red-600" role="alert">{fileError}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    Anterior
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                    >
                      Enviar postulación
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
