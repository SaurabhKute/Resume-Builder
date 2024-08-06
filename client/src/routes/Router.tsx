import React, { Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { Builder, ChooseTemplate, Dashboard } from '../components';
import { Auth, NotFoundView } from '../pages';
import { Header, Navbar, ScrollToTop } from '../common/components';

export default function Router() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


  

  const routes = useRoutes([
    {
      element: (
        <>
          <ScrollToTop />
          <Navbar />
          {isAuthenticated && <Header />}
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      ),
      children: [
        { path: '/login', element: <PublicRoute element={<Auth />} redirectTo="/" /> },
        { path: '/register', element: <PublicRoute element={<Auth />} redirectTo="/" /> },
        { path: '/', element: <ProtectedRoute element={<Dashboard />} redirectTo="/login" /> },
        { path: '/builder', element: <ProtectedRoute element={<Builder />} redirectTo="/login" /> },
        { path: '/resume', element: <ProtectedRoute element={<ChooseTemplate />} redirectTo="/login" /> },
        { path: '*', element: <NotFoundView /> },
      ],
    },
  ]);

  return routes;
}
