import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/jobs', label: 'Empleos', icon: '💼' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/employer', label: 'Empleador', icon: '🏢' },
    { path: '/admin', label: 'Admin', icon: '⚙️' },
    { path: '/profile', label: 'Perfil', icon: '👤' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Enhanced Logo */}
        <Link to="/jobs" className="navbar-brand d-flex align-items-center text-decoration-none">
          <div className="bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center shadow-custom me-3" style={{ width: '40px', height: '40px' }}>
            <span className="text-white fw-bold">E+</span>
          </div>
          <span className="text-gradient fw-bold fs-4">Emplea+</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-link d-flex align-items-center px-3 py-2 rounded-3 ${
                    location.pathname === item.path
                      ? 'bg-primary text-white fw-semibold'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  <span className="me-2 fs-5">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}; 