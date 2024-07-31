// src/router/Router.js
import { Suspense } from 'react';
import { Outlet, useRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../components/DashBoard/DashBoard';
import ScrollToTop from '../common/components/ScrollToTop/ScrollToTop';
import NotFoundView from '../pages/PageNotFound/PageNotFound';
import Auth from '../pages/Authentication/Auth';
import Header from '../common/components/Header/Header';
import Navbar from '../common/components/Navbar/Navbar';
import Builder from '../components/Builder/Builder';
import ChooseTemplate from '../components/ChooseTemplate/ChooseTemplate';
import ProtectedRoute from './protectedRoute'; 
import { RootState } from '../app/store';

export default function Router() {
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);

  const routes = useRoutes([
    {
      element: (
        <>
          <ScrollToTop />
          <Navbar/>
          {isAuthenticated &&<Header />}
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      ),
      children: [
        // Public routes for unauthenticated users
        { path: '/login', element: !isAuthenticated ? <Auth /> : <Navigate to="/" />, index: true },
        { path: '/register', element: !isAuthenticated ? <Auth /> : <Navigate to="/login" />, index: true },

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
