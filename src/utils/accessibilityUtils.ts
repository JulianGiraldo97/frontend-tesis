import { AccessibilityPreferences } from '@/types';

// WCAG 2.1 AA Compliance Utilities
export const accessibilityUtils = {
  // Generate unique IDs for ARIA relationships
  generateId(prefix: string = 'element'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Validate ARIA attributes
  validateAriaAttributes(element: HTMLElement): string[] {
    const errors: string[] = [];
    
    const ariaLabel = element.getAttribute('aria-label');
    const ariaLabelledby = element.getAttribute('aria-labelledby');
    const ariaDescribedby = element.getAttribute('aria-describedby');
    
    if (element.hasAttribute('aria-required') && element.getAttribute('aria-required') === 'true') {
      if (!ariaLabel && !ariaLabelledby) {
        errors.push('Required element missing accessible name');
      }
    }
    
    if (ariaLabelledby) {
      const labelledElement = document.getElementById(ariaLabelledby);
      if (!labelledElement) {
        errors.push(`Element with aria-labelledby="${ariaLabelledby}" not found`);
      }
    }
    
    if (ariaDescribedby) {
      const describedElement = document.getElementById(ariaDescribedby);
      if (!describedElement) {
        errors.push(`Element with aria-describedby="${ariaDescribedby}" not found`);
      }
    }
    
    return errors;
  },

  // Check if element is focusable
  isFocusable(element: HTMLElement): boolean {
    const tagName = element.tagName.toLowerCase();
    const tabIndex = element.getAttribute('tabindex');
    
    if (tagName === 'button' || tagName === 'a' || tagName === 'input' || 
        tagName === 'select' || tagName === 'textarea') {
      return !element.hasAttribute('disabled');
    }
    
    if (tabIndex !== null) {
      return tabIndex !== '-1';
    }
    
    return false;
  },

  // Get all focusable elements within a container
  getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    return Array.from(container.querySelectorAll(focusableSelectors.join(', '))) as HTMLElement[];
  },

  // Format text for screen readers
  formatForScreenReader(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/[^\w\s]/g, ' $& ')
      .replace(/\s+/g, ' ')
      .trim();
  },

  // Announce changes to screen readers
  announceChange(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  },

  // Validate color contrast
  validateColorContrast(foreground: string, background: string): {
    isValid: boolean;
    ratio: number;
    level: 'AA' | 'AAA' | 'FAIL';
  } {
    const ratio = this.calculateContrastRatio(foreground, background);
    
    return {
      isValid: ratio >= 4.5,
      ratio,
      level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'FAIL'
    };
  },

  private calculateContrastRatio(foreground: string, background: string): number {
    const fgLuminance = this.getLuminance(foreground);
    const bgLuminance = this.getLuminance(background);
    
    const lighter = Math.max(fgLuminance, bgLuminance);
    const darker = Math.min(fgLuminance, bgLuminance);
    
    return (lighter + 0.05) / (darker + 0.05);
  },

  private getLuminance(color: string): number {
    const rgb = this.hexToRgb(color);
    if (!rgb) return 0;

    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  },

  private hexToRgb(hex: string): number[] | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  },

  // Apply accessibility preferences
  applyAccessibilityPreferences(preferences: AccessibilityPreferences): void {
    const root = document.documentElement;
    
    if (preferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (preferences.easyReading) {
      root.classList.add('easy-reading');
    } else {
      root.classList.remove('easy-reading');
    }
  },

  // Keyboard navigation utilities
  handleKeyboardNavigation(event: KeyboardEvent, onSkipToContent?: () => void): void {
    if (event.key === 'Tab' && event.altKey) {
      event.preventDefault();
      onSkipToContent?.();
    }
  },

  // Form accessibility validation
  validateFormAccessibility(form: HTMLFormElement): {
    isValid: boolean;
    errors: string[];
  } {
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

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}; 