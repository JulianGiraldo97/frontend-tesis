import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  footer,
  closeLabel = 'Cerrar modal',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (previousFocusedElementRef.current) {
        previousFocusedElementRef.current.focus();
        previousFocusedElementRef.current = null;
      }
      return;
    }

    previousFocusedElementRef.current = document.activeElement as HTMLElement;

    const selector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(
      containerRef.current?.querySelectorAll(selector) || []
    ) as HTMLElement[];

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      containerRef.current?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const activeFocusable = Array.from(
        containerRef.current?.querySelectorAll(selector) || []
      ) as HTMLElement[];

      if (activeFocusable.length === 0) {
        event.preventDefault();
        containerRef.current?.focus();
        return;
      }

      const firstElement = activeFocusable[0];
      const lastElement = activeFocusable[activeFocusable.length - 1];
      const isInside =
        containerRef.current?.contains(document.activeElement) ?? false;

      if (!isInside) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className='modal fade show d-block modal-backdrop-overlay'
      role='dialog'
      aria-modal='true'
      aria-labelledby='accessible-modal-title'
    >
      <div className='modal-dialog modal-lg modal-dialog-scrollable'>
        <div className='modal-content' ref={containerRef} tabIndex={-1}>
          <div className='modal-header'>
            <h2 id='accessible-modal-title' className='modal-title h5 fw-bold mb-0'>
              {title}
            </h2>
            <button
              type='button'
              className='btn-close'
              onClick={onClose}
              aria-label={closeLabel}
            ></button>
          </div>

          <div className='modal-body'>{children}</div>

          {footer && <div className='modal-footer'>{footer}</div>}
        </div>
      </div>
    </div>
  );
};
