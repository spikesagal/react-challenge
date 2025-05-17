import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { createWrapper } from 'src/utils/test-utils';
import api from 'src/api/PokemonAPI';
import { usePokemons, useAbilities } from './PokedexConnector';

vi.mock('src/api/PokemonAPI', () => ({
  default: {
    listPokemons: vi.fn(),
    getPokemonByName: vi.fn(),
    getAbilityByName: vi.fn()
  }
}));

describe('PokedexConnector', () => {
  describe('usePokemons', () => {
    it('should return a list of 5 pokemon names, along with the total page count', async () => {
      const mockResponse = {
        'count': 1302,
        'next': 'https://pokeapi.co/api/v2/pokemon/?offset=5&limit=5',
        'previous': null,
        'results': [
          {
            'name': 'bulbasaur',
            'url': 'https://pokeapi.co/api/v2/pokemon/1/'
          },
          {
            'name': 'ivysaur',
            'url': 'https://pokeapi.co/api/v2/pokemon/2/'
          },
          {
            'name': 'venusaur',
            'url': 'https://pokeapi.co/api/v2/pokemon/3/'
          },
          {
            'name': 'charmander',
            'url': 'https://pokeapi.co/api/v2/pokemon/4/'
          },
          {
            'name': 'charmeleon',
            'url': 'https://pokeapi.co/api/v2/pokemon/5/'
          }
        ]
      };

      (api.listPokemons as any).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => usePokemons(1), {
        wrapper: createWrapper()
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual({
        'count': 1302,
        'pokemons': [
          'bulbasaur',
          'ivysaur',
          'venusaur',
          'charmander',
          'charmeleon'
        ]
      });
    });
  });
  describe('useAbilities', () => {
    it('should return a list of abilities names for a pokemon', async () => {
      (api.getPokemonByName as any).mockResolvedValue({
        'abilities': [
          {
            'ability': {
              'name': 'overgrow',
              'url': 'https://pokeapi.co/api/v2/ability/65/'
            },
            'is_hidden': false,
            'slot': 1
          },
          {
            'ability': {
              'name': 'chlorophyll',
              'url': 'https://pokeapi.co/api/v2/ability/34/'
            },
            'is_hidden': true,
            'slot': 3
          }
        ]
      });

      (api.getAbilityByName as any).mockResolvedValueOnce({
        name: 'overgrow',
        effect_entries: [
          {
            effect:
              'When this Pokémon has 1/3 or less of its HP remaining, its grass-type moves inflict 1.5× as much regular damage.',
            language: { name: 'en' }
          }
        ]
      });

      (api.getAbilityByName as any).mockResolvedValueOnce({
        name: 'chlorophyll',
        effect_entries: [
          {
            effect:
              "This Pokémon's Speed is doubled during strong sunlight. This bonus does not count as a stat modifier.",
            language: { name: 'en' }
          }
        ]
      });

      const { result } = renderHook(() => useAbilities('bulbasaur'), {
        wrapper: createWrapper()
      });

      // Because this is a chained query, first one will always
      // return undefined, so wait for the second one
      await waitFor(() => expect(result.current.length).toBe(2));
      await waitFor(() =>
        expect(result.current.every((q) => q.isSuccess)).toBe(true)
      );
      const abilities = result.current.map((q) => q.data);
      expect(abilities).toEqual([
        {
          'effect':
            'When this Pokémon has 1/3 or less of its HP remaining, its grass-type moves inflict 1.5× as much regular damage.',
          'name': 'overgrow'
        },
        {
          'effect':
            "This Pokémon's Speed is doubled during strong sunlight. This bonus does not count as a stat modifier.",
          'name': 'chlorophyll'
        }
      ]);
    });
  });
});
