import React, { useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
  autoHideMs?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  autoHideMs = 4000,
}) => {
  useEffect(() => {
    if (!isVisible) return;
    const timerId = window.setTimeout(onClose, autoHideMs);
    return () => window.clearTimeout(timerId);
  }, [autoHideMs, isVisible, onClose]);

  if (!isVisible) return null;

  const classByType: Record<ToastType, string> = {
    success: 'alert-success',
    error: 'alert-danger',
    info: 'alert-info',
    warning: 'alert-warning',
  };

  return (
    <div
      className={`alert ${classByType[type]} alert-dismissible fade show position-fixed accessibility-toast`}
      role={type === 'error' || type === 'warning' ? 'alert' : 'status'}
      aria-live={type === 'error' || type === 'warning' ? 'assertive' : 'polite'}
      aria-atomic='true'
    >
      {message}
      <button
        type='button'
        className='btn-close'
        onClick={onClose}
        aria-label='Cerrar notificación'
      ></button>
    </div>
  );
};
