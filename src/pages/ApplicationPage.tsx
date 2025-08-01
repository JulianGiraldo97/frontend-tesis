import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAccessibility } from '@/context/AccessibilityContext';
import * as Progress from '@radix-ui/react-progress';
import * as Label from '@radix-ui/react-label';

interface ApplicationForm {
  coverLetter: string;
  accessibilityNotes: string;
  resumeFile: FileList;
  additionalFiles: FileList;
}

const steps = [
  { id: 1, title: 'Información Personal', description: 'Verificar datos básicos' },
  { id: 2, title: 'Carta de Presentación', description: 'Explicar por qué eres el candidato ideal' },
  { id: 3, title: 'Documentos', description: 'Adjuntar CV y documentos adicionales' },
  { id: 4, title: 'Revisión', description: 'Revisar y enviar aplicación' }
];

export const ApplicationPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { isEasyReading } = useAccessibility();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ApplicationForm>({
    mode: 'onChange'
  });

  const onSubmit = async (data: ApplicationForm) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Aplicación Enviada!
            </h1>
            <p className="text-gray-600 mb-6">
              Tu aplicación ha sido enviada exitosamente. Te notificaremos cuando el empleador la revise.
            </p>
            <div className="space-y-3">
              <Link to="/dashboard" className="btn-primary w-full">
                Ir al Dashboard
              </Link>
              <Link to="/jobs" className="btn-secondary w-full">
                Buscar más empleos
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Postulación
              </h1>
              <p className="text-gray-600">
                Completa tu aplicación paso a paso
              </p>
            </div>
            <Link
              to={`/jobs/${jobId}`}
              className="btn-secondary"
              aria-label="Volver al detalle del empleo"
            >
              Volver al Empleo
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Paso {currentStep} de {steps.length}: {steps[currentStep - 1].title}
            </h2>
            <span className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% completado
            </span>
          </div>
          <Progress.Root className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <Progress.Indicator
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </Progress.Root>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`text-center p-4 rounded-lg border-2 transition-colors duration-200 ${
                currentStep > step.id
                  ? 'border-green-200 bg-green-50'
                  : currentStep === step.id
                  ? 'border-primary-200 bg-primary-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                currentStep > step.id
                  ? 'bg-green-500 text-white'
                  : currentStep === step.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {currentStep > step.id ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <h3 className={`text-sm font-medium ${
                currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.title}
              </h3>
              <p className={`text-xs ${
                currentStep >= step.id ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="card">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Información Personal
                </h3>
                <p className="text-gray-600">
                  Verifica que tus datos personales estén correctos antes de continuar.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label.Root className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo
                    </Label.Root>
                    <input
                      type="text"
                      defaultValue="María González"
                      className="input-field"
                      disabled
                      aria-label="Nombre completo"
                    />
                  </div>
                  <div>
                    <Label.Root className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </Label.Root>
                    <input
                      type="email"
                      defaultValue="maria.gonzalez@email.com"
                      className="input-field"
                      disabled
                      aria-label="Email"
                    />
                  </div>
                  <div>
                    <Label.Root className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </Label.Root>
                    <input
                      type="tel"
                      defaultValue="+57 300 123 4567"
                      className="input-field"
                      disabled
                      aria-label="Teléfono"
                    />
                  </div>
                  <div>
                    <Label.Root className="block text-sm font-medium text-gray-700 mb-2">
                      Ubicación
                    </Label.Root>
                    <input
                      type="text"
                      defaultValue="Bogotá, Colombia"
                      className="input-field"
                      disabled
                      aria-label="Ubicación"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">
                    Necesidades de accesibilidad registradas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Lector de pantalla
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Alto contraste
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Navegación por teclado
                    </span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Carta de Presentación
                </h3>
                <p className="text-gray-600">
                  Explica por qué eres el candidato ideal para esta posición.
                </p>
                
                <div>
                  <Label.Root htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                    Carta de presentación
                  </Label.Root>
                  <textarea
                    id="coverLetter"
                    rows={8}
                    {...register('coverLetter', { 
                      required: 'La carta de presentación es requerida',
                      minLength: {
                        value: 100,
                        message: 'La carta debe tener al menos 100 caracteres'
                      }
                    })}
                    className="input-field"
                    placeholder="Describe tu experiencia, motivación y por qué te interesa esta posición..."
                    aria-describedby={errors.coverLetter ? 'coverLetter-error' : undefined}
                    aria-invalid={errors.coverLetter ? 'true' : 'false'}
                  />
                  {errors.coverLetter && (
                    <p id="coverLetter-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.coverLetter.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label.Root htmlFor="accessibilityNotes" className="block text-sm font-medium text-gray-700 mb-2">
                    Notas de accesibilidad (opcional)
                  </Label.Root>
                  <textarea
                    id="accessibilityNotes"
                    rows={4}
                    {...register('accessibilityNotes')}
                    className="input-field"
                    placeholder="Informa sobre necesidades específicas de accesibilidad para el proceso de selección..."
                    aria-describedby="accessibilityNotes-help"
                  />
                  <p id="accessibilityNotes-help" className="mt-1 text-sm text-gray-500">
                    Esta información ayudará al empleador a adaptar el proceso de selección a tus necesidades.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Documentos
                </h3>
                <p className="text-gray-600">
                  Adjunta tu CV y cualquier documento adicional relevante.
                </p>
                
                <div>
                  <Label.Root htmlFor="resumeFile" className="block text-sm font-medium text-gray-700 mb-2">
                    CV/Resumen *
                  </Label.Root>
                  <input
                    id="resumeFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    {...register('resumeFile', { 
                      required: 'El CV es requerido'
                    })}
                    className="input-field"
                    aria-describedby={errors.resumeFile ? 'resumeFile-error' : 'resumeFile-help'}
                    aria-invalid={errors.resumeFile ? 'true' : 'false'}
                  />
                  {errors.resumeFile && (
                    <p id="resumeFile-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.resumeFile.message}
                    </p>
                  )}
                  <p id="resumeFile-help" className="mt-1 text-sm text-gray-500">
                    Formatos aceptados: PDF, DOC, DOCX. Máximo 5MB.
                  </p>
                </div>

                <div>
                  <Label.Root htmlFor="additionalFiles" className="block text-sm font-medium text-gray-700 mb-2">
                    Documentos adicionales (opcional)
                  </Label.Root>
                  <input
                    id="additionalFiles"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    {...register('additionalFiles')}
                    className="input-field"
                    aria-describedby="additionalFiles-help"
                  />
                  <p id="additionalFiles-help" className="mt-1 text-sm text-gray-500">
                    Certificados, portafolio, referencias, etc. Formatos: PDF, DOC, DOCX, JPG, PNG. Máximo 10MB total.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Revisión Final
                </h3>
                <p className="text-gray-600">
                  Revisa toda la información antes de enviar tu aplicación.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Información Personal</h4>
                    <p className="text-sm text-gray-600">María González - maria.gonzalez@email.com</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Carta de Presentación</h4>
                    <p className="text-sm text-gray-600">
                      {watch('coverLetter') || 'No se ha ingresado carta de presentación'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Documentos</h4>
                    <p className="text-sm text-gray-600">
                      {watch('resumeFile')?.length ? `${watch('resumeFile').length} archivo(s) seleccionado(s)` : 'No se han seleccionado archivos'}
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Importante
                      </h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Una vez enviada, no podrás modificar tu aplicación. Asegúrate de que toda la información sea correcta.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Paso anterior"
            >
              Anterior
            </button>
            
            <div className="flex space-x-3">
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary"
                  aria-label="Siguiente paso"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !isValid}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-describedby={isLoading ? 'submitting-status' : undefined}
                >
                  {isLoading ? 'Enviando...' : 'Enviar Aplicación'}
                </button>
              )}
            </div>
          </div>

          {isLoading && (
            <p id="submitting-status" className="sr-only" aria-live="polite">
              Enviando aplicación...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}; 