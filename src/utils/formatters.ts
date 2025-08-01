// Date formatting utilities
export const dateFormatters = {
  formatDate(date: string | Date, locale: string = 'es-CO'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  formatRelativeDate(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - dateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
    
    return `Hace ${Math.floor(diffDays / 365)} años`;
  },

  formatDateTime(date: string | Date, locale: string = 'es-CO'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

// Currency formatting utilities
export const currencyFormatters = {
  formatCurrency(amount: number, currency: string = 'COP'): string {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(amount);
  },

  formatSalaryRange(min: number, max: number, currency: string = 'COP'): string {
    if (min === max) {
      return this.formatCurrency(min, currency);
    }
    return `${this.formatCurrency(min, currency)} - ${this.formatCurrency(max, currency)}`;
  },

  formatSalaryInMillions(amount: number, currency: string = 'COP'): string {
    const millions = amount / 1000000;
    return `$${millions.toFixed(1)}M ${currency}`;
  }
};

// Text formatting utilities
export const textFormatters = {
  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  },

  capitalizeFirst(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Format Colombian phone numbers
    if (digits.length === 10) {
      return `+57 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`;
    }
    
    if (digits.length === 11 && digits.startsWith('57')) {
      return `+57 ${digits.substring(2, 5)} ${digits.substring(5, 8)} ${digits.substring(8)}`;
    }
    
    return phone; // Return original if can't format
  },

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};

// Status formatting utilities
export const statusFormatters = {
  formatJobStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'active': 'Activa',
      'inactive': 'Inactiva',
      'draft': 'Borrador',
      'expired': 'Expirada'
    };
    return statusMap[status] || status;
  },

  formatApplicationStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'pending': 'Pendiente',
      'reviewed': 'Revisado',
      'shortlisted': 'Preseleccionado',
      'rejected': 'Rechazado',
      'hired': 'Contratado'
    };
    return statusMap[status] || status;
  },

  formatUserRole(role: string): string {
    const roleMap: Record<string, string> = {
      'candidate': 'Candidato',
      'employer': 'Empleador',
      'admin': 'Administrador'
    };
    return roleMap[role] || role;
  },

  formatContractType(type: string): string {
    const typeMap: Record<string, string> = {
      'full-time': 'Tiempo completo',
      'part-time': 'Tiempo parcial',
      'contract': 'Contrato',
      'internship': 'Pasantía'
    };
    return typeMap[type] || type;
  }
};

// Accessibility formatting utilities
export const accessibilityFormatters = {
  formatForScreenReader(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/[^\w\s]/g, ' $& ')
      .replace(/\s+/g, ' ')
      .trim();
  },

  generateAriaLabel(element: string, context?: string): string {
    if (context) {
      return `${element} ${context}`;
    }
    return element;
  },

  formatAccessibilityScore(score: number): string {
    if (score >= 90) return 'Excelente';
    if (score >= 80) return 'Muy bueno';
    if (score >= 70) return 'Bueno';
    if (score >= 60) return 'Aceptable';
    return 'Necesita mejora';
  }
}; 