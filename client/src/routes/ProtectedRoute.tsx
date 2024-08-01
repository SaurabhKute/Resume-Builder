import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ProtectedRoute = ({ element, redirectTo }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  return isAuthenticated ? element : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
