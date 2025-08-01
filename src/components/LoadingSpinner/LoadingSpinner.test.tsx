import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LoadingSpinner } from './LoadingSpinner';

expect.extend(toHaveNoViolations);

describe('LoadingSpinner', () => {
  it('should render without accessibility violations', async () => {
    const { container } = render(<LoadingSpinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render with default props', () => {
    render(<LoadingSpinner />);
    
    const statusElement = screen.getByRole('status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveAttribute('aria-label', 'Cargando...');
    expect(statusElement).toHaveAttribute('aria-live', 'polite');
    
    const text = screen.getByText('Cargando...');
    expect(text).toBeInTheDocument();
  });

  it('should render with custom text', () => {
    render(<LoadingSpinner text="Procesando..." />);
    
    const statusElement = screen.getByRole('status');
    expect(statusElement).toHaveAttribute('aria-label', 'Procesando...');
    
    const text = screen.getByText('Procesando...');
    expect(text).toBeInTheDocument();
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="small" />);
    let spinner = screen.getByRole('status').querySelector('div[aria-hidden="true"]');
    expect(spinner).toHaveClass('w-4', 'h-4');

    rerender(<LoadingSpinner size="medium" />);
    spinner = screen.getByRole('status').querySelector('div[aria-hidden="true"]');
    expect(spinner).toHaveClass('w-8', 'h-8');

    rerender(<LoadingSpinner size="large" />);
    spinner = screen.getByRole('status').querySelector('div[aria-hidden="true"]');
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  it('should have screen reader only text', () => {
    render(<LoadingSpinner />);
    
    const srText = screen.getByText('Cargando...', { selector: '.sr-only' });
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('sr-only');
  });
}); 