import React, { useState } from 'react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular delay de login
    setTimeout(() => {
      console.log('Login attempt:', { email, password });
      setIsLoading(false);
    }, 2000);
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
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold text-dark">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-custom"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold text-dark">
                      Contraseña
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control form-control-custom"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <a href="#" className="text-decoration-none text-primary fw-semibold">
                      ¿Olvidaste tu contraseña?
                    </a>
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
                      <a href="#" className="text-decoration-none text-primary fw-semibold">
                        Crear cuenta
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Accessibility Features */}
            <div className="text-center mt-4 animate-fade-in">
              <div className="d-inline-flex align-items-center gap-4 text-white-50 small">
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