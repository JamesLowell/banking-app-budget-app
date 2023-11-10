import React from 'react';
import getLocalStorage from '../../utils/getlocalstorage';
import { Navigate } from 'react-router-dom';

export default function BankingAppProtectedRoute({ children }) {
  const isAuthenticated = getLocalStorage('admin-info'); 
  console.log('isAuthenticated:', isAuthenticated);
  if (!isAuthenticated) {
    alert('Please login to access the page');
    return <Navigate to="/bankinglogin" replace={true} />;
  }

  return <>{children}</>;
}