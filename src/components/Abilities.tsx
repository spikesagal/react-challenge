import { useMemo } from 'react';
import { useParams, NavLink } from 'react-router';

import { useAbilities } from 'src/hooks/PokedexConnector';

// react-router can't implicitly handle route exclusion, but
// this should never reach unless routes are misconfigured
function invariant(value: unknown): asserts value {
  if (value) {
    return;
  }

  throw new Error(
    'Routing misconfigured: handling route with no pokemonName is required'
  );
}

const Abilities = (): React.ReactNode => {
  const { pokemonName } = useParams();
  invariant(pokemonName);
  // const { isPending, error, data, isFetching } = useAbilities(pokemonName);
  const results = useAbilities(pokemonName);

  console.log('data came here:', results);

  return (
    // <div>{data?.map((ability) => <div>{JSON.stringify(ability)}</div>)}</div>
    <table className="data-table">
        <tr>
          <th>
            Ability
          </th>
          <th>
            Ability effect
          </th>
        </tr>
      {results.map(({ isPending, error, data: ability, isFetching }) => (
        <tr>
          <td>
            {ability?.name}
          </td>
          <td>
            {ability?.effect}
          </td>
        </tr>
      ))}
      <tr>
        <td colSpan={2}>
          <NavLink to="/">
            Back to list view
          </NavLink>
        </td>
      </tr>
    </table>
  );
};

export default Abilities;
