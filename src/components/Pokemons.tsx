import { useState, useEffect } from 'react';
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

  // set the current page in shared state, for back links
  useEffect(() => setCurrentPage(page), [page]);

  // this will prevent totalPages rendering as 0 while request is pending,
  // and will only re-render it when total page count is available
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (data?.count !== undefined) {
      setTotalPages(Math.ceil(data.count / ENTRIES_PER_PAGE), data?.count);
    }
  }, [data?.count]);

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
        {[0, 1, 2, 3, 4].map((rowNum) => {
          // Note: this is a design choice; it may or may not fit the needs of the UI.
          // As is, it will always pre-render 5 rows and populate them with data
          // when it becomes available. The benefit of this approach is minimizing
          // layout shifting; however, this will have the side effect of displaying
          // empty rows when less than 5 rows of data are available.
          const name = data?.pokemons[rowNum] ?? '';
          return (
            <tr key={rowNum}>
              <td>
                <NavLink
                  to={`/abilities/${name}`}
                  data-testid={`name-${name}`}
                  className={`name datum ${!name && 'disabled'}`}
                >
                  {name}
                </NavLink>
              </td>
            </tr>
          );
        })}
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
