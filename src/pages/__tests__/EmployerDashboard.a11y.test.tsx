import React from 'react';
import { axe } from 'jest-axe';
import { EmployerDashboard } from '../EmployerDashboard';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

describe('EmployerDashboard accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('has no critical a11y violations', async () => {
    const { container } = renderWithProviders(<EmployerDashboard />, {
      route: '/employer',
      path: '/employer',
    });

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
