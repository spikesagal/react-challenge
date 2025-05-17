import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { useAbilities } from 'src/hooks/PokedexConnector';
import Pagination from './Pagination';


describe('Abilities Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pagination correctly for a middle page', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pagination page={3} totalPages={7} />
      </MemoryRouter>
    );


    expect(screen.getByTestId('nav-first').className).not.toContain('disabled');
    expect(screen.getByTestId('nav-prev').className).not.toContain('disabled');
    expect(screen.getByTestId('nav-current').textContent).toEqual('Page 3 of 7');
    expect(screen.getByTestId('nav-next').className).not.toContain('disabled');
    expect(screen.getByTestId('nav-last').className).not.toContain('disabled');

    unmount();
  });

  it('renders pagination correctly for page the first page', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pagination page={1} totalPages={7} />
      </MemoryRouter>
    );


    expect(screen.getByTestId('nav-first').className).toContain('disabled');
    expect(screen.getByTestId('nav-prev').className).toContain('disabled');
    expect(screen.getByTestId('nav-current').textContent).toEqual('Page 1 of 7');
    expect(screen.getByTestId('nav-next').className).not.toContain('disabled');
    expect(screen.getByTestId('nav-last').className).not.toContain('disabled');

    unmount();
  });

  it('renders pagination correctly for page the last page', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pagination page={7} totalPages={7} />
      </MemoryRouter>
    );


    expect(screen.getByTestId('nav-first').className).not.toContain('disabled');
    expect(screen.getByTestId('nav-prev').className).not.toContain('disabled');
    expect(screen.getByTestId('nav-current').textContent).toEqual('Page 7 of 7');
    expect(screen.getByTestId('nav-next').className).toContain('disabled');
    expect(screen.getByTestId('nav-last').className).toContain('disabled');

    unmount();
  });
});
