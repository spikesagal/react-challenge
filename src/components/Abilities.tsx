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
  const results = useAbilities(pokemonName);

  console.log('data came here:', results);

  return (
    <>
      <div className="box">
        <div>
          <div className="heading">
            Ability
          </div>
          <div className="heading">
            Ability effect
          </div>
        </div>
        {results.map(({ isPending, error, data: ability, isFetching }) => (
          <div>
            <div className="datum">
              {ability?.name}
            </div>
            <div className="datum">
              {ability?.effect}
            </div>
          </div>
        ))}
      </div>
      <div className="back-link">
        <NavLink to="/">
          Back to list view
        </NavLink>
      </div>
    </>
  );
};

export default Abilities;
