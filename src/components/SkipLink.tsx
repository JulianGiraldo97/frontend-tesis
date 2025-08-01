import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="skip-link"
      aria-label="Saltar al contenido principal"
    >
      Saltar al contenido principal
    </a>
  );
}; 