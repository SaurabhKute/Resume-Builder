import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface ProtectedRouteProps {
  element: React.ReactElement;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, redirectTo }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? element : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
