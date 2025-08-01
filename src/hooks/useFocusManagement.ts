import { useEffect, useRef } from 'react';

interface UseFocusManagementProps {
  shouldFocus?: boolean;
  focusSelector?: string;
}

export const useFocusManagement = ({ 
  shouldFocus = false, 
  focusSelector = 'main' 
}: UseFocusManagementProps = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldFocus && elementRef.current) {
      elementRef.current.focus();
    }
  }, [shouldFocus]);

  const focusElement = () => {
    if (elementRef.current) {
      elementRef.current.focus();
    }
  };

  const focusFirstInteractiveElement = () => {
    const container = elementRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  };

  const trapFocus = (event: KeyboardEvent) => {
    const container = elementRef.current;
    if (!container) return;

    const focusableElements = Array.from(
      container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  return {
    elementRef,
    focusElement,
    focusFirstInteractiveElement,
    trapFocus,
  };
}; 