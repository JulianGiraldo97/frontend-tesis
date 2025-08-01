import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SkipLink } from './SkipLink';

expect.extend(toHaveNoViolations);

describe('SkipLink', () => {
  it('should render without accessibility violations', async () => {
    const { container } = render(<SkipLink />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have correct accessibility attributes', () => {
    render(<SkipLink />);
    
    const skipLink = screen.getByRole('link', { name: /saltar al contenido principal/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    expect(skipLink).toHaveAttribute('aria-label', 'Saltar al contenido principal');
  });

  it('should have correct CSS class', () => {
    render(<SkipLink />);
    
    const skipLink = screen.getByRole('link');
    expect(skipLink).toHaveClass('skip-link');
  });
}); 