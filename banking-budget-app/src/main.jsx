
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client'
import '../src/App.css';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dboard-ref';
import ExpenseTracker from './pages/expense-tracker';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute  from './component/protected-route';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />,
    index:true
  },
  {
    path:"/register",
    element: <Register />,
  },
  {
    path:"/dashboard",
    element: <ProtectedRoute> <Dashboard /> </ProtectedRoute>,
  },
  {
    path:"/expense",
    element: <ProtectedRoute> <ExpenseTracker /> </ProtectedRoute>,
  },
]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router} />
)