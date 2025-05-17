import { Outlet } from 'react-router';

const Layout = (): React.ReactNode => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
