import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text = 'Cargando...' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div 
      className="flex flex-col items-center justify-center p-8"
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-primary-500`}
        aria-hidden="true"
      />
      <span className="sr-only">{text}</span>
      <p className="mt-4 text-gray-600 font-medium">{text}</p>
    </div>
  );
}; 