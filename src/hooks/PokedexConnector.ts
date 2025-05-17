import { Pokemon, NamedAPIResourceList, Ability } from 'pokenode-ts';
import { useQuery, useQueries } from '@tanstack/react-query';

import api from 'src/api/PokemonAPI';

const RESULTS_PER_PAGE = 5;
const LANGUAGE = 'en';

// Query stale time only affects components that may be requesting
// data at the same time, and will be cleared with browser refreshes
// and new sessions
const QUERY_STALE_TIME = 1000; // 1 second

export const usePokemons = (pageNumber: number) => {
  return useQuery({
    queryKey: ['pokemons', pageNumber],
    queryFn: async () => {
      const offset = RESULTS_PER_PAGE * (pageNumber - 1);
      return api.listPokemons(offset, RESULTS_PER_PAGE);
    },
    select: ({ count, results }: NamedAPIResourceList) => ({
      count,
      pokemons: results.map(({ name }) => name)
    }),
    staleTime: QUERY_STALE_TIME
  });
};

export const useAbilities = (pokemonName: string) => {
  const { data: abilitiesNames } = useQuery({
    queryKey: ['ability_names', pokemonName],
    queryFn: async () => api.getPokemonByName(pokemonName),
    select: ({ abilities }: Pokemon) =>
      abilities.map(({ ability: { name } }) => name),
    staleTime: QUERY_STALE_TIME
  });

  const mappedAbilities = useQueries({
    queries: abilitiesNames
      ? abilitiesNames.map((abilityName) => {
          return {
            queryKey: ['ability_details', abilityName],
            queryFn: async () => api.getAbilityByName(abilityName),
            select: ({ name, effect_entries }: Ability) => {
              return {
                name,
                effect: effect_entries
                  .filter(
                    ({ language: { name: languageName } }) =>
                      languageName === LANGUAGE
                  )
                  .map(({ effect }) => effect)[0] // list pared down to one language will always contain one entry
              };
            },
            staleTime: QUERY_STALE_TIME
          };
        })
      : []
  });

  return mappedAbilities;
};
