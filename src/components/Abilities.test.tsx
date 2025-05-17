import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
// import { MemoryRouter as Router, Routes, Route } from 'react-router';
import { useAbilities } from 'src/hooks/PokedexConnector';
import Abilities from './Abilities';

// mock hooks; should be able to run offline
vi.mock('src/hooks/PokedexConnector', () => ({
  useAbilities: vi.fn()
}));

describe('Abilities Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders abilities correctly', () => {
    (useAbilities as any).mockReturnValue([
      {
        error: null,
        data: {
          name: 'overgrow',
          effect:
            'When this Pokémon has 1/3 or less of its HP remaining, its grass-type moves inflict 1.5× as much regular damage.'
        }
      },
      {
        error: null,
        data: {
          name: 'chlorophyll',
          effect:
            "This Pokémon's Speed is doubled during strong sunlight. This bonus does not count as a stat modifier."
        }
      }
    ]);

    const { unmount } = render(
      <MemoryRouter initialEntries={['/abilities/bulbasaur']}>
        <Routes>
          <Route path='/abilities/:pokemonName' element={<Abilities />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('name-overgrow').textContent).toEqual('overgrow');
    expect(screen.getByTestId('effect-overgrow').textContent).toEqual(
      'When this Pokémon has 1/3 or less of its HP remaining, its grass-type moves inflict 1.5× as much regular damage.'
    );

    expect(screen.getByTestId('name-chlorophyll').textContent).toEqual(
      'chlorophyll'
    );
    expect(screen.getByTestId('effect-chlorophyll').textContent).toEqual(
      "This Pokémon's Speed is doubled during strong sunlight. This bonus does not count as a stat modifier."
    );

    unmount();
  });

  it('ignores any individual ability with errors', () => {
    (useAbilities as any).mockReturnValue([
      {
        error: 'Uh-oh'
      },
      {
        error: null,
        data: {
          name: 'chlorophyll',
          effect:
            "This Pokémon's Speed is doubled during strong sunlight. This bonus does not count as a stat modifier."
        }
      }
    ]);

    const { unmount } = render(
      <MemoryRouter initialEntries={['/abilities/bulbasaur']}>
        <Routes>
          <Route path='/abilities/:pokemonName' element={<Abilities />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('name-overgrow')).toBeNull();
    expect(screen.getByTestId('name-chlorophyll').textContent).toEqual(
      'chlorophyll'
    );
    expect(screen.getByTestId('effect-chlorophyll').textContent).toEqual(
      "This Pokémon's Speed is doubled during strong sunlight. This bonus does not count as a stat modifier."
    );

    unmount();
  });
});
