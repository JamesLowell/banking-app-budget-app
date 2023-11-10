/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const BudgetApp = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/budget') {
      navigate('/budget/login');
    }
  }, [location,navigate]);

  return (
    <>
    <Outlet />
    </>
  );
};

export default BudgetApp
