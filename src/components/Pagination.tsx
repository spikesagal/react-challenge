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
    <div className='pagination'>
      <NavLink to={firstPageLink} className={prevDisabled}>
        <span>
          <FirstPageIcon />
        </span>
      </NavLink>
      <NavLink to={prevPageLink} className={prevDisabled}>
        <span>
          <ChevronLeftIcon />
        </span>
      </NavLink>
      <span>
        Page {page} of {totalPages}
      </span>
      <NavLink to={nextPageLink} className={nextDisabled}>
        <span>
          <ChevronRightIcon />
        </span>
      </NavLink>
      <NavLink to={lastPageLink} className={nextDisabled}>
        <span>
          <LastPageIcon />
        </span>
      </NavLink>
    </div>
  );
};

export default Pagination;
