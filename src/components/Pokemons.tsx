import { useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router';

import { usePokemons } from 'src/hooks/PokedexConnector';
import Pagination from './Pagination';

const Pokemons = ({
  setCurrentPage
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}): React.ReactNode => {
  const ENTRIES_PER_PAGE = 5;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const { error, data } = usePokemons(page); // via useQuery
  const totalPages = Math.ceil((data?.count ?? 0) / ENTRIES_PER_PAGE);

  useEffect(() => setCurrentPage(page), [page]); // set the current page in shared state, for back links

  return (
    <table>
      <tbody>
        <tr>
          <th className='heading'>Pokemon name</th>
        </tr>
        {error && (
          <tr>
            <td data-testid='error-message' className='datum'>
              Something went wrong :(
            </td>
          </tr>
        )}
        {data?.pokemons.map((name) => (
          <tr key={name}>
            <td>
              <NavLink
                to={`/abilities/${name}`}
                data-testid={`name-${name}`}
                className='name datum'
              >
                {name}
              </NavLink>
            </td>
          </tr>
        ))}
        <tr>
          <td className='pagination'>
            <Pagination page={page} totalPages={totalPages} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Pokemons;
