import { Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Dashboard from '../components/DashBoard/DashBoard';
import ScrollToTop from '../common/components/ScrollToTop/ScrollToTop';
import NotFoundView from '../pages/PageNotFound/PageNotFound';
import Auth from '../pages/Authentication/Auth';
import Header from '../common/components/Header/Header';
import Navbar from '../common/components/Navbar/Navbar';


export default function Router() {
  
  const routes = useRoutes([
    {
      element: (
        <>
        <ScrollToTop />
          {/* <Navbar />  */}
          {/* <Header /> */}
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      ),
      children: [
        { path: '*', element: <NotFoundView />, index: true },
        { path: '/', element: <Dashboard />, index: true },
        { path: '/login', element: <Auth />, index: true },
        { path: '/register', element: <Auth />, index:true },
        // { path: '/builder', element: <Builder />, index:true },
        // { path: '/resume', element: <ChooseTemplate /> },
      ],
    },
  ]);

  return routes;
}
