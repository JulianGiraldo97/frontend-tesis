import React from 'react';
import { Toast } from './base/Toast';

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
  return (
    <Toast
      message={message}
      type={type}
      isVisible={isVisible}
      onClose={onClose}
    />
  );
};
