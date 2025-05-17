import {describe, it, expect, beforeEach, vi} from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { createWrapper } from 'src/utils/test-utils';
import {usePokemons, useAbilities} from './PokedexConnector';

vi.mock('src/api/PokemonAPI', () => ({
  default: {
    listPokemons: vi.fn()
  }
}));

import api from 'src/api/PokemonAPI';

describe('PokedexConnector', () => {
  describe('usePokemons', () => {

    beforeEach(() => {
      //queryClient = new QueryClient();
    });

    it('should return a list of 5 pokemon per requested page, along with the total page count', async () => {
      const mockResponse = {
        "count": 1302,
        "next": "https://pokeapi.co/api/v2/pokemon/?offset=5&limit=5",
        "previous": null,
        "results": [
          {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
          },
          {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
          },
          {
            "name": "venusaur",
            "url": "https://pokeapi.co/api/v2/pokemon/3/"
          },
          {
            "name": "charmander",
            "url": "https://pokeapi.co/api/v2/pokemon/4/"
          },
          {
            "name": "charmeleon",
            "url": "https://pokeapi.co/api/v2/pokemon/5/"
          }
        ]
      };

      (api.listPokemons as any).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => usePokemons(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual({
        "count": 1302,
        "pokemons": [
          "bulbasaur",
          "ivysaur",
          "venusaur",
          "charmander",
          "charmeleon",
        ]
      });
    });
  });
});
