import React from 'react';

interface AccessibilityNotificationProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  onClose: () => void;
}

export const AccessibilityNotification: React.FC<AccessibilityNotificationProps> = ({
  message,
  type,
  isVisible,
  onClose
}) => {
  if (!isVisible) return null;

  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      default:
        return 'alert-info';
    }
  };

  return (
    <div
      className={`alert ${getAlertClass()} alert-dismissible fade show position-fixed`}
      style={{
        top: '20px',
        right: '20px',
        zIndex: 9999,
        minWidth: '300px'
      }}
      role="alert"
      aria-live="assertive"
    >
      <span className="me-2">
        {type === 'success' && '✅'}
        {type === 'error' && '❌'}
        {type === 'warning' && '⚠️'}
        {type === 'info' && 'ℹ️'}
      </span>
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Cerrar notificación"
      ></button>
    </div>
  );
}; 