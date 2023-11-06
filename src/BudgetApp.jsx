/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login';
import Registration from  './pages/register';
import Dashboard from './pages/dashboard';

const BudgetApp = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element ={<Registration />} />
      <Route path='/dashboard' element ={<Dashboard />} />
    </Routes>
    </>
    
  )
}

export default BudgetApp

// const router = createBrowserRouter([
//   {
//     element: <Login />,
//     index: true
//   },
//   {
//     path: '/dashboard',
//     element: <Dashboard />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/register',
//     element: <Registration />
    
//   },
// ])