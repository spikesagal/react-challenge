import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import App from 'src/app/App';

describe('NotFound Routes', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render 404 page for undefined routes', () => {
    render(
      <MemoryRouter initialEntries={['/nothinghere']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found')).toBeDefined();
  });

  it('should render 404 page for abilities route with no pokemon id', () => {
    render(
      <MemoryRouter initialEntries={['/abilities/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found')).toBeDefined();
  });
});
