import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { usePokemons } from 'src/hooks/PokedexConnector';
import Pokemons from './Pokemons';

// mock hooks; should be able to run offline
vi.mock('src/hooks/PokedexConnector', () => ({
  usePokemons: vi.fn()
}));

describe('Pokemons Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pokemons correctly', () => {
    (usePokemons as any).mockReturnValue({
      error: null,
      data: {
        'count': 1302,
        'pokemons': ['bulbasaur', 'ivysaur']
      }
    });

    const { unmount } = render(
      <MemoryRouter>
        <Pokemons setCurrentPage={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('name-bulbasaur').textContent).toEqual(
      'bulbasaur'
    );
    expect(screen.getByTestId('name-ivysaur').textContent).toEqual('ivysaur');

    unmount();
  });

  it('renders pokemons correctly', () => {
    (usePokemons as any).mockReturnValue({
      error: 'Uh-oh'
    });

    const { unmount } = render(
      <MemoryRouter>
        <Pokemons setCurrentPage={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('error-message')).toBeDefined();

    unmount();
  });
});
