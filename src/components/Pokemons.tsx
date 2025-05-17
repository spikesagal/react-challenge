import { useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { usePokemons } from 'src/hooks/PokedexConnector';
import Pagination from './Pagination';

const Pokemons = (): React.ReactNode => {
  const [searchParams] = useSearchParams();
  const page = useMemo(
    () => Number(searchParams.get('page') ?? 1),
    [searchParams]
  );
  const { isPending, error, data, isFetching } = usePokemons(page);
  const totalPages = useMemo(
    () => Math.ceil((data?.count ?? 0) / 5),
    [data?.count]
  );

  console.log('data came here:', data);

  return (
    <div>
      <div>Pokemon name</div>
      {data?.pokemons?.map((name) => (
        <NavLink to={`/abilities/${name}`}>
          <div>{name}</div>
        </NavLink>
      ))}
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
};

export default Pokemons;
