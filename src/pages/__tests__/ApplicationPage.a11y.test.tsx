import React from 'react';
import { axe } from 'jest-axe';
import { ApplicationPage } from '../ApplicationPage';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

describe('ApplicationPage accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('has no critical a11y violations', async () => {
    const { container } = renderWithProviders(<ApplicationPage />, {
      route: '/apply/1',
      path: '/apply/:id',
    });

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
