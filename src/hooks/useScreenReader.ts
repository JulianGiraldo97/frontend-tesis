import { useState } from 'react';

export const useScreenReader = () => {
  const [isReading, setIsReading] = useState(false);
  const [currentText, setCurrentText] = useState('');

  const startReading = (text: string) => {
    setCurrentText(text);
    setIsReading(true);
  };

  const stopReading = () => {
    setIsReading(false);
    setCurrentText('');
  };

  const handleReadingComplete = () => {
    setIsReading(false);
  };

  return {
    isReading,
    currentText,
    startReading,
    stopReading,
    handleReadingComplete,
  };
};
