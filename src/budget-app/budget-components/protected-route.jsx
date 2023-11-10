import React from 'react';
import getLocalStorage from '../../utils/getlocalstorage';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = getLocalStorage('user-info'); 

  if (!isAuthenticated) {
    alert('Please login to access the page');
    return <Navigate to="/landing-page" replace={true} />;
  }

  return <>{children}</>;
}