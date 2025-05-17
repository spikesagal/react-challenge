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
      isPending: true,
      isFetching: false,
      error: null,
      data: {
        'count': 1302,
        'pokemons': [
          'bulbasaur',
          'ivysaur',
          'venusaur',
          'charmander',
          'charmeleon'
        ]
      }
    });

    render(
      <MemoryRouter>
        <Pokemons />
      </MemoryRouter>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeDefined();
  });
});
