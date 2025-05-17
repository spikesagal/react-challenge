import { useMemo } from 'react';
import { NavLink, useSearchParams } from 'react-router';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import Pagination from './Pagination';

const Pokemons = (): React.ReactNode => {
  const [searchParams] = useSearchParams();
  const page = useMemo(
    () => Number(searchParams.get('page') ?? 1),
    [searchParams]
  );
  const totalPages = 261;

  return (
    <div>
      <div>Pokemon name</div>
      <NavLink to={`/abilities/fly`}>
        <div>bulbasaur</div>
      </NavLink>
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
};

export default Pokemons;
