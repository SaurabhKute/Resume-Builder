import { Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Header from '../common/components/Header/Header';
import Navbar from '../common/components/Navbar/Navbar';
import Dashboard from '../components/DashBoard/DashBoard';
import ChooseTemplate from '../components/ChooseTemplate/ChooseTemplate';
import Builder from '../components/Builder/Builder';
import ScrollToTop from '../common/components/ScrollToTop/ScrollToTop';

// import Header from "./common/components/Header/Header";
// import Navbar from "./common/components/Navbar/Navbar";


// Lazy load the pages
// const IndexPage = lazy(() => import('../pages/app'));
// const UserPage = lazy(() => import('../pages/user'));

export default function Router() {
  
  const routes = useRoutes([
    {
      element: (
        <>
        <ScrollToTop />
          <Navbar /> 
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      ),
      children: [
        { path: '/', element: <Dashboard />, index: true },
        { path: '/resume', element: <ChooseTemplate />, index:true },
        { path: '/builder', element: <Builder />, index:true },
        // { path: '/resume', element: <ChooseTemplate /> },
      ],
    },
  ]);

  return routes;
}
