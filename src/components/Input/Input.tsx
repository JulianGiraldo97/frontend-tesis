import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  'aria-describedby'?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  id,
  name,
  required = false,
  disabled = false,
  error,
  className = '',
  'aria-describedby': ariaDescribedby,
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  
  const baseClasses = 'block w-full px-4 py-3 rounded-lg border-2 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-base';
  const normalClasses = 'border-gray-300 focus:border-green-500 focus:ring-green-500';
  const errorClasses = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : '';
  
  const classes = `${baseClasses} ${error ? errorClasses : normalClasses} ${disabledClasses} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={classes}
        aria-describedby={errorId || ariaDescribedby}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-600 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}; 