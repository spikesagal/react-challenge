import { useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

import { usePokemons } from 'src/hooks/PokedexConnector';
import Pagination from './Pagination';

const Pokemons = (): React.ReactNode => {
  const [searchParams] = useSearchParams();
  const page = useMemo(
    () => Number(searchParams.get('page') ?? 1),
    [searchParams]
  );
  const { error, data, isPending } = usePokemons(page);
  const totalPages = useMemo(
    () => Math.ceil((data?.count ?? 0) / 5),
    [data?.count]
  );

  console.log('data came here:', data);

  return (
    <div className="box">
      <div className="heading">Pokemon name</div>
      {isPending && (
        <HourglassBottomIcon />
      )}
      {error && (
        <div className="datum">Something went wrong :(</div>
      )}
      {data?.pokemons.map((name) => (
        <NavLink key={name} to={`/abilities/${name}`}>
          <div className="datum">{name}</div>
        </NavLink>
      ))}
      <div className="pagination">
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Pokemons;
