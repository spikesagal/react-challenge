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

const Abilities = ({
  currentPage
}: {
  currentPage: number;
}): React.ReactNode => {
  const { pokemonName } = useParams();
  invariant(pokemonName);

  const backLink = currentPage > 1 ? `/?page=${currentPage}` : '/';

  // using react-query useQueries to asynchronously render results;
  // ignore errors
  const results = useAbilities(pokemonName);

  return (
    <>
      <div className='box'>
        <div>
          <div className='heading'>Ability</div>
          <div className='heading'>Ability effect</div>
        </div>
        {results.map(
          ({ data: ability }) =>
            ability && (
              <div key={`${ability?.name}_${ability?.slot}`}>
                <div data-testid={`name-${ability?.name}`} className='datum'>
                  {ability?.name}
                </div>
                <div data-testid={`effect-${ability?.name}`} className='datum'>
                  {ability?.effect}
                </div>
              </div>
            )
        )}
      </div>
      <div className='back-link'>
        <NavLink to={backLink}>Back to list view</NavLink>
      </div>
    </>
  );
};

export default Abilities;
