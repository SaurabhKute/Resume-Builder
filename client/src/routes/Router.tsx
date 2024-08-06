import React, { Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { Builder, ChooseTemplate, Dashboard } from '../components';
import { Auth, NotFoundView } from '../pages';
import { Header, Navbar, ScrollToTop } from '../common/components';
import ToasterComponent from '../common/components/Toaster/Toaster';

export default function Router() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


  const routes = useRoutes([
    {
      element: (
        <>
         <ToasterComponent />
          <ScrollToTop />
          <Navbar />
          {isAuthenticated && <Header />}
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      ),
      children: [
        // Public Routes
        { path: '/login', element: <PublicRoute element={<Auth />} redirectTo="/dashboard" /> },
        { path: '/register', element: <PublicRoute element={<Auth />} redirectTo="/login" /> },

        // Private Routes
        { path: '/dashboard', element: <ProtectedRoute element={<Dashboard />} redirectTo="/login" /> },
        { path: '/builder', element: <ProtectedRoute element={<Builder />} redirectTo="/login" /> },
        { path: '/resume', element: <ProtectedRoute element={<ChooseTemplate />} redirectTo="/login" /> },

        // Page Not Found
        { path: '*', element: <NotFoundView /> },
      ],
    },
  ]);

  return routes;
}
