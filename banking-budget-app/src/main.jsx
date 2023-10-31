
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client'
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dboard-ref';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
    element: <Dashboard />,
  },
]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router} />
)