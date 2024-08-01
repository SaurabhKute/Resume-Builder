import React, { Suspense, useEffect } from 'react';
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

  // useEffect(() => {
  //   console.log('Authentication state:', isAuthenticated);
  // }, [isAuthenticated]);

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
        // Public routes for unauthenticated users
        { path: '/login', element: <PublicRoute element={<Auth />} redirectTo="/" />, index: true },
        { path: '/register', element: <PublicRoute element={<Auth />} redirectTo="/" />, index: true },

        // Protected routes for authenticated users
        { path: '/', element: <ProtectedRoute element={<Dashboard />} redirectTo="/login" />, index: true },
        { path: '/builder', element: <ProtectedRoute element={<Builder />} redirectTo="/login" />, index: true },
        { path: '/resume', element: <ProtectedRoute element={<ChooseTemplate />} redirectTo="/login" /> },

        // Fallback route
        { path: '*', element: <NotFoundView />, index: true },
      ],
    },
  ]);

  return routes;
}
