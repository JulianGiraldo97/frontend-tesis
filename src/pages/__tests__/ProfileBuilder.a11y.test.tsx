import React from 'react';
import { axe } from 'jest-axe';
import { ProfileBuilder } from '../ProfileBuilder';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

describe('ProfileBuilder accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('has no critical a11y violations', async () => {
    const { container } = renderWithProviders(<ProfileBuilder />, {
      route: '/profile-builder',
      path: '/profile-builder',
    });

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
