import { useMemo } from 'react';
import { NavLink } from 'react-router';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination = ({ page, totalPages }: PaginationProps): React.ReactNode => {
  const firstPageLink = ''; // always redefined to blank, for brevity
  const prevPageLink = useMemo(
    () => (page > 2 ? `?page=${page - 1}` : ''),
    [page]
  );
  const lastPageLink = useMemo(() => `?page=${totalPages}`, [totalPages]);
  const nextPageLink = useMemo(
    () => (page < totalPages ? `?page=${page + 1}` : lastPageLink),
    [page, totalPages]
  );
  const prevDisabled = useMemo(() => (page === 1 ? 'disabled' : ''), [page]);
  const nextDisabled = useMemo(
    () => (page === totalPages ? 'disabled' : ''),
    [page]
  );

  return (
    <div>
      <NavLink
        data-testid='nav-first'
        to={firstPageLink}
        className={prevDisabled}
      >
        <span>
          <FirstPageIcon fontSize='small' />
        </span>
      </NavLink>
      <NavLink
        data-testid='nav-prev'
        to={prevPageLink}
        className={prevDisabled}
      >
        <span>
          <ChevronLeftIcon fontSize='small' />
        </span>
      </NavLink>
      <span data-testid='nav-current'>
        Page {page} of {totalPages}
      </span>
      <NavLink
        data-testid='nav-next'
        to={nextPageLink}
        className={nextDisabled}
      >
        <span>
          <ChevronRightIcon fontSize='small' />
        </span>
      </NavLink>
      <NavLink
        data-testid='nav-last'
        to={lastPageLink}
        className={nextDisabled}
      >
        <span>
          <LastPageIcon fontSize='small' />
        </span>
      </NavLink>
    </div>
  );
};

export default Pagination;
