import { AccessibilityPreferences } from '@/types';

export class AccessibilityService {
  private static instance: AccessibilityService;

  private constructor() {}

  static getInstance(): AccessibilityService {
    if (!AccessibilityService.instance) {
      AccessibilityService.instance = new AccessibilityService();
    }
    return AccessibilityService.instance;
  }

  // WCAG 2.1 AA Compliance Checks
  checkColorContrast(foreground: string, background: string): boolean {
    const contrast = this.calculateContrastRatio(foreground, background);
    return contrast >= 4.5; // AA standard for normal text
  }

  checkLargeTextContrast(foreground: string, background: string): boolean {
    const contrast = this.calculateContrastRatio(foreground, background);
    return contrast >= 3; // AA standard for large text
  }

  private calculateContrastRatio(foreground: string, background: string): number {
    const fgLuminance = this.getLuminance(foreground);
    const bgLuminance = this.getLuminance(background);
    
    const lighter = Math.max(fgLuminance, bgLuminance);
    const darker = Math.min(fgLuminance, bgLuminance);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private getLuminance(color: string): number {
    const rgb = this.hexToRgb(color);
    if (!rgb) return 0;

    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  private hexToRgb(hex: string): number[] | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  // Focus Management
  trapFocus(element: HTMLElement): void {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
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

    element.addEventListener('keydown', handleKeyDown);
    
    // Return cleanup function
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }

  // Screen Reader Announcements
  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  // Accessibility Preferences Management
  saveAccessibilityPreferences(preferences: AccessibilityPreferences): void {
    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
  }

  loadAccessibilityPreferences(): AccessibilityPreferences {
    const saved = localStorage.getItem('accessibility-preferences');
    if (saved) {
      return JSON.parse(saved);
    }
    
    return {
      highContrast: false,
      easyReading: false,
      keyboardNavigation: true,
      captions: false,
      screenReader: false,
    };
  }

  // High Contrast Mode
  applyHighContrastMode(): void {
    document.documentElement.classList.add('high-contrast');
  }

  removeHighContrastMode(): void {
    document.documentElement.classList.remove('high-contrast');
  }

  // Easy Reading Mode
  applyEasyReadingMode(): void {
    document.documentElement.classList.add('easy-reading');
  }

  removeEasyReadingMode(): void {
    document.documentElement.classList.remove('easy-reading');
  }

  // Keyboard Navigation
  enableKeyboardNavigation(): void {
    document.addEventListener('keydown', this.handleKeyboardNavigation);
  }

  disableKeyboardNavigation(): void {
    document.removeEventListener('keydown', this.handleKeyboardNavigation);
  }

  private handleKeyboardNavigation = (event: KeyboardEvent): void => {
    // Skip to main content
    if (event.key === 'Tab' && event.altKey) {
      event.preventDefault();
      const mainContent = document.querySelector('main');
      if (mainContent) {
        (mainContent as HTMLElement).focus();
      }
    }
  };

  // Form Validation for Accessibility
  validateFormAccessibility(form: HTMLFormElement): string[] {
    const errors: string[] = [];
    
    // Check for labels
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const id = input.getAttribute('id');
      if (id) {
        const label = form.querySelector(`label[for="${id}"]`);
        if (!label) {
          errors.push(`Input with id "${id}" is missing a label`);
        }
      }
    });

    // Check for error messages
    const invalidInputs = form.querySelectorAll('[aria-invalid="true"]');
    invalidInputs.forEach(input => {
      const describedBy = input.getAttribute('aria-describedby');
      if (!describedBy) {
        errors.push(`Invalid input is missing error description`);
      }
    });

    return errors;
  }

  // Generate accessibility report
  generateAccessibilityReport(): {
    contrastIssues: string[];
    focusIssues: string[];
    ariaIssues: string[];
    overallScore: number;
  } {
    const contrastIssues: string[] = [];
    const focusIssues: string[] = [];
    const ariaIssues: string[] = [];

    // Check all text elements for contrast
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
    textElements.forEach(element => {
      const style = window.getComputedStyle(element);
      const color = style.color;
      const backgroundColor = style.backgroundColor;
      
      if (color && backgroundColor) {
        if (!this.checkColorContrast(color, backgroundColor)) {
          contrastIssues.push(`Low contrast found in element: ${element.textContent?.substring(0, 50)}`);
        }
      }
    });

    // Check focusable elements
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    focusableElements.forEach(element => {
      if (!element.hasAttribute('tabindex') && element.getAttribute('tabindex') !== '0') {
        focusIssues.push(`Focusable element missing proper tabindex: ${element.tagName}`);
      }
    });

    // Check ARIA attributes
    const elementsWithAria = document.querySelectorAll('[aria-*]');
    elementsWithAria.forEach(element => {
      const ariaLabel = element.getAttribute('aria-label');
      const ariaLabelledby = element.getAttribute('aria-labelledby');
      
      if (!ariaLabel && !ariaLabelledby) {
        ariaIssues.push(`Element with ARIA attributes missing label: ${element.tagName}`);
      }
    });

    const totalIssues = contrastIssues.length + focusIssues.length + ariaIssues.length;
    const overallScore = Math.max(0, 100 - (totalIssues * 5));

    return {
      contrastIssues,
      focusIssues,
      ariaIssues,
      overallScore,
    };
  }
}

export const accessibilityService = AccessibilityService.getInstance(); 