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
  const prevPageLink = page > 2 ? `?page=${page - 1}` : '';
  const lastPageLink = `?page=${totalPages}`;
  const nextPageLink = page < totalPages ? `?page=${page + 1}` : lastPageLink;
  const prevDisabled = page === 1 ? 'disabled' : '';
  const nextDisabled = page === totalPages ? 'disabled' : '';

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
