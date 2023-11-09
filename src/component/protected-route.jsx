import React from 'react';
import getLocalStorage from '../utils/getlocalstorage';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = getLocalStorage('user-info'); 

  if (!isAuthenticated) {
    alert('Please login to access the page');
    return <Navigate to="/budget/login" replace={true} />;
  }

  return <>{children}</>;
}