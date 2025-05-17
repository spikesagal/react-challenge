import { useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

import { usePokemons } from 'src/hooks/PokedexConnector';
import Pagination from './Pagination';

const Pokemons = (): React.ReactNode => {
  const ENTRIES_PER_PAGE = 5;
  const [searchParams] = useSearchParams();
  const page = useMemo(
    () => Number(searchParams.get('page') ?? 1),
    [searchParams]
  );
  const { error, data, isPending } = usePokemons(page); // via useQuery
  const totalPages = useMemo(
    () => Math.ceil((data?.count ?? 0) / ENTRIES_PER_PAGE),
    [data?.count]
  );

  return (
    <div className='box'>
      <div className='heading'>Pokemon name</div>
      {isPending && <HourglassBottomIcon />}
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
      <div className='pagination'>
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Pokemons;
