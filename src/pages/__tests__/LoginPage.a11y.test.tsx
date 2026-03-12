import React from 'react';
import { axe } from 'jest-axe';
import { LoginPage } from '../LoginPage';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

describe('LoginPage accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('has no critical a11y violations', async () => {
    const { container } = renderWithProviders(<LoginPage />, {
      route: '/login',
      path: '/login',
    });

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
