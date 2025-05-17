import { useMemo } from 'react';
import { useParams, NavLink } from 'react-router';

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

  return (
    <table className="data-table">
     <tr>
        <th>
          Ability
        </th>
        <th>
          Ability effect
        </th>
      </tr>
      <tr>
        <td>
          fly
        </td>
        <td>
          creature can fly
        </td>
      </tr>
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
