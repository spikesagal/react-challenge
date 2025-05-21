import { NavLink, useSearchParams } from 'react-router';

import { usePokemons } from 'src/hooks/PokedexConnector';
import Pagination from './Pagination';

const Pokemons = (): React.ReactNode => {
  const ENTRIES_PER_PAGE = 5;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const { error, data } = usePokemons(page); // via useQuery
  const totalPages = Math.ceil((data?.count ?? 0) / ENTRIES_PER_PAGE);

  return (
    <>
      <div className='box'>
        <div className='heading'>Pokemon name</div>
        {error && (
          <div data-testid='error-message' className='datum'>
            Something went wrong :(
          </div>
        )}
        {data?.pokemons.map((name) => (
          <NavLink key={name} to={`/abilities/${name}`}>
            <div data-testid={`name-${name}`} className='datum'>
              {name}
            </div>
          </NavLink>
        ))}
      </div>
      <div className='pagination'>
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </>
  );
};

export default Pokemons;
