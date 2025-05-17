import { Outlet } from 'react-router';

const Layout = (): React.ReactNode => {
  return (
    <div>
      HP here!
      <Outlet />
    </div>
  );
};

export default Layout;
