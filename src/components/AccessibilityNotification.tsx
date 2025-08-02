import React, { useState, useEffect } from 'react';

interface AccessibilityNotificationProps {
  message: string;
  type: 'success' | 'info' | 'warning';
  isVisible: boolean;
  onClose: () => void;
}

export const AccessibilityNotification: React.FC<AccessibilityNotificationProps> = ({
  message,
  type,
  isVisible,
  onClose
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  const getBgClass = () => {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'info':
        return 'bg-info';
      case 'warning':
        return 'bg-warning';
      default:
        return 'bg-info';
    }
  };

  return (
    <div className="position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 1050 }}>
      <div className={`toast show ${getBgClass()} text-white`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header bg-transparent text-white border-0">
          <span className="me-2">{getIcon()}</span>
          <strong className="me-auto">Accesibilidad</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
            aria-label="Cerrar"
          ></button>
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  );
}; 