import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { LoginCredentials, RegisterData } from '@/types';
import * as Label from '@radix-ui/react-label';
import * as Button from '@radix-ui/react-button';

export const LoginPage: React.FC = () => {
  const { login, register, isLoading, error, clearError } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginCredentials & RegisterData>();

  const onSubmit = async (data: LoginCredentials | RegisterData) => {
    clearError();
    try {
      if (isRegistering) {
        await register(data as RegisterData);
      } else {
        await login(data as LoginCredentials);
      }
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    clearError();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-500 mb-2">
            Emplea+
          </h1>
          <p className="text-lg text-gray-600">
            {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Plataforma accesible de intermediación laboral
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {isRegistering && (
            <div>
              <Label.Root htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </Label.Root>
              <input
                id="name"
                type="text"
                {...registerField('name', { 
                  required: isRegistering ? 'El nombre es requerido' : false 
                })}
                className="input-field"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div>
            <Label.Root htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </Label.Root>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...registerField('email', { 
                required: 'El correo es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido'
                }
              })}
              className="input-field"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label.Root htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </Label.Root>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isRegistering ? 'new-password' : 'current-password'}
                {...registerField('password', { 
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                })}
                className="input-field pr-12"
                aria-describedby={errors.password ? 'password-error' : undefined}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {isRegistering && (
            <div>
              <Label.Root htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de cuenta
              </Label.Root>
              <select
                id="role"
                {...registerField('role', { required: 'Selecciona un tipo de cuenta' })}
                className="input-field"
                aria-describedby={errors.role ? 'role-error' : undefined}
                aria-invalid={errors.role ? 'true' : 'false'}
              >
                <option value="">Selecciona...</option>
                <option value="candidate">Candidato</option>
                <option value="employer">Empleador</option>
              </select>
              {errors.role && (
                <p id="role-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.role.message}
                </p>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button.Root
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
            aria-describedby={isLoading ? 'loading-status' : undefined}
          >
            {isLoading ? 'Procesando...' : (isRegistering ? 'Crear cuenta' : 'Iniciar sesión')}
          </Button.Root>

          {isLoading && (
            <p id="loading-status" className="sr-only" aria-live="polite">
              Procesando solicitud...
            </p>
          )}
        </form>

        {/* Links */}
        <div className="text-center space-y-4">
          <button
            type="button"
            onClick={toggleMode}
            className="text-primary-600 hover:text-primary-500 font-medium"
            aria-label={isRegistering ? 'Cambiar a inicio de sesión' : 'Cambiar a registro'}
          >
            {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>

          {!isRegistering && (
            <div>
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-500"
                aria-label="¿Olvidaste tu contraseña?"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          )}
        </div>

        {/* Demo credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Credenciales de prueba:</h3>
          <p className="text-sm text-blue-700">
            Email: test@example.com<br />
            Contraseña: password
          </p>
        </div>
      </div>
    </div>
  );
}; 