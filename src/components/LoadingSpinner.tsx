import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'Cargando...',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center p-4 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-green-600 ${sizeClasses[size]}`}>
        <span className="sr-only">{text}</span>
      </div>
      {text && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
}; 