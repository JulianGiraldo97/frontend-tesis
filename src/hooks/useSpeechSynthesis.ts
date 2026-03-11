import { useEffect, useState } from 'react';

const VOICE_CHECK_INTERVAL_MS = 100;
const INITIAL_VOICE_CHECK_DELAY_MS = 200;

export const useSpeechSynthesis = (isOpen: boolean) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsReady(false);
      return;
    }

    const checkSpeechSynthesisReady = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setIsReady(true);
        return;
      }
      setTimeout(checkSpeechSynthesisReady, VOICE_CHECK_INTERVAL_MS);
    };

    const timerId = window.setTimeout(
      checkSpeechSynthesisReady,
      INITIAL_VOICE_CHECK_DELAY_MS
    );

    return () => {
      window.clearTimeout(timerId);
    };
  }, [isOpen]);

  return {
    isReady,
  };
};
