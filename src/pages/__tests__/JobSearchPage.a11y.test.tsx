import React from 'react';
import { axe } from 'jest-axe';
import { JobSearchPage } from '../JobSearchPage';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

describe('JobSearchPage accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('has no critical a11y violations', async () => {
    const { container } = renderWithProviders(<JobSearchPage />, {
      route: '/jobs',
      path: '/jobs',
    });

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  });
});
