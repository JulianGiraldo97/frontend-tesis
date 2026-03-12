import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  helperText,
  error,
  disabled = false,
  className = '',
}) => {
  const helperId = helperText ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className='form-label fw-semibold'>
        {label}
      </label>
      <select
        id={id}
        className={`form-select ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={event => onChange(event.target.value)}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : 'false'}
        disabled={disabled}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && (
        <small id={helperId} className='text-muted d-block mt-2'>
          {helperText}
        </small>
      )}
      {error && (
        <div id={errorId} className='invalid-feedback d-block' role='alert'>
          {error}
        </div>
      )}
    </div>
  );
};
