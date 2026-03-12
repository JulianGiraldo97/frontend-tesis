import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryError, setRecoveryError] = useState('');
  const [recoveryStatus, setRecoveryStatus] = useState('');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const recoveryEmailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  useEffect(() => {
    if (showRecoveryForm) {
      recoveryEmailRef.current?.focus();
    }
  }, [showRecoveryForm]);

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setRecoveryStatus('');
    clearError();

    if (!email.trim()) {
      setEmailError('Ingresa tu correo electrónico.');
      emailInputRef.current?.focus();
      return;
    }

    if (!isValidEmail(email.trim())) {
      setEmailError('El formato de correo no es válido.');
      emailInputRef.current?.focus();
      return;
    }

    if (!password.trim()) {
      setPasswordError('Ingresa tu contraseña.');
      passwordInputRef.current?.focus();
      return;
    }

    await login({ email, password });
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError('');
    setRecoveryStatus('');

    if (!recoveryEmail.trim()) {
      setRecoveryError('Ingresa el correo de tu cuenta para recuperar acceso.');
      recoveryEmailRef.current?.focus();
      return;
    }

    if (!isValidEmail(recoveryEmail.trim())) {
      setRecoveryError('El correo no tiene un formato válido.');
      recoveryEmailRef.current?.focus();
      return;
    }

    if (recoveryEmail.trim().toLowerCase() === 'demo@example.com') {
      setRecoveryStatus(
        'Enlace de recuperación enviado a demo@example.com. Revisa tu bandeja de entrada.'
      );
      return;
    }

    setRecoveryError(
      'No encontramos una cuenta con ese correo. Si ya estás registrado, verifica el correo o inicia sesión con tus credenciales.'
    );
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            {/* Logo and Branding */}
            <div className="text-center mb-5 animate-fade-in">
              <div className="mx-auto mb-4 d-flex align-items-center justify-content-center bg-gradient-primary rounded-circle shadow-custom-lg" style={{ width: '80px', height: '80px' }}>
                <span className="text-white fw-bold fs-2">E+</span>
              </div>
              <h1 className="text-gradient display-4 fw-bold mb-3">
                Emplea+
              </h1>
              <h2 className="h3 fw-bold text-white mb-3">
                Bienvenido de vuelta
              </h2>
              <p className="text-white-50 fs-5">
                Tu plataforma de intermediación laboral accesible e inclusiva
              </p>
            </div>

            {/* Login Form */}
            <div className="card card-custom glass animate-fade-in">
              <div className="card-body p-5">
                <p className="visually-hidden" aria-live="polite">
                  {recoveryStatus || error || emailError || passwordError || recoveryError}
                </p>

                {!showRecoveryForm ? (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold text-dark">
                      Correo electrónico
                    </label>
                    <input
                      ref={emailInputRef}
                      type="email"
                      className={`form-control form-control-custom ${emailError ? 'is-invalid' : ''}`}
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      placeholder="tu@email.com"
                      required
                    />
                    {emailError && (
                      <div className="invalid-feedback d-block" role="alert">
                        {emailError}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold text-dark">
                      Contraseña
                    </label>
                    <div className="position-relative">
                      <input
                        ref={passwordInputRef}
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control form-control-custom ${passwordError ? 'is-invalid' : ''}`}
                        id="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordError('');
                        }}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showPassword ? (
                          <i className="bi bi-eye-slash"></i>
                        ) : (
                          <i className="bi bi-eye"></i>
                        )}
                      </button>
                    </div>
                    {passwordError && (
                      <div className="invalid-feedback d-block" role="alert">
                        {passwordError}
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember-me"
                      />
                      <label className="form-check-label text-muted" htmlFor="remember-me">
                        Recordarme
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none text-primary fw-semibold"
                      onClick={() => {
                        setShowRecoveryForm(true);
                        setRecoveryError('');
                        setRecoveryStatus('');
                      }}
                      aria-label="Recuperar contraseña"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-custom w-100 py-3 fs-5 fw-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Cargando...</span>
                        </div>
                        Iniciando sesión...
                      </div>
                    ) : (
                      'Iniciar sesión'
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-muted mb-0">
                      ¿No tienes cuenta?{' '}
                      <a
                        href="/register"
                        className="text-decoration-none text-primary fw-semibold"
                        aria-label="Crear una cuenta nueva"
                      >
                        Crear cuenta
                      </a>
                    </p>
                  </div>
                </form>
                ) : (
                  <form onSubmit={handleRecoverySubmit} noValidate>
                    <h3 className="h5 fw-bold mb-3 text-dark">Recuperar acceso</h3>
                    <p className="text-muted mb-4">
                      Ingresa el correo de tu cuenta. Te enviaremos un enlace para restablecer la contraseña.
                    </p>

                    {recoveryStatus && (
                      <div className="alert alert-success" role="status">
                        {recoveryStatus}
                      </div>
                    )}
                    {recoveryError && (
                      <div className="alert alert-warning" role="alert">
                        {recoveryError}
                      </div>
                    )}

                    <div className="mb-4">
                      <label htmlFor="recoveryEmail" className="form-label fw-semibold text-dark">
                        Correo registrado
                      </label>
                      <input
                        ref={recoveryEmailRef}
                        id="recoveryEmail"
                        type="email"
                        className={`form-control form-control-custom ${recoveryError ? 'is-invalid' : ''}`}
                        value={recoveryEmail}
                        onChange={(e) => {
                          setRecoveryEmail(e.target.value);
                          setRecoveryError('');
                        }}
                        placeholder="tu@email.com"
                        aria-describedby="recovery-help"
                      />
                      <small id="recovery-help" className="text-muted d-block mt-2">
                        Si ya estás registrado y no recuerdas tu contraseña, este es el paso recomendado.
                      </small>
                    </div>

                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary btn-custom">
                        Enviar enlace de recuperación
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-custom"
                        onClick={() => {
                          setShowRecoveryForm(false);
                          setRecoveryError('');
                          setRecoveryStatus('');
                        }}
                      >
                        Volver al inicio de sesión
                      </button>
                    </div>

                    <p className="text-muted mt-4 mb-0">
                      ¿Correo incorrecto o sin cuenta?{' '}
                      <Link to="/register" className="text-decoration-none fw-semibold">
                        Crear cuenta
                      </Link>
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Accessibility Features */}
            <div className="text-center mt-4 animate-fade-in">
              <div className="d-inline-flex align-items-center gap-4 text-white small">
                <span className="d-flex align-items-center">
                  <i className="bi bi-check-circle me-1"></i>
                  Accesible WCAG 2.1 AA
                </span>
                <span className="d-flex align-items-center">
                  <i className="bi bi-shield-check me-1"></i>
                  Seguro
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
