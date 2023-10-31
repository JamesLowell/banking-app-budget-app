import React from 'react'
import ReactDOM from 'react-dom/client'
import CustomerList from './bank-components/CustomerList'
import UserDetails from './bank-components/UserDetails'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path:'/',
    element: <CustomerList />
  },
  {
    path: 'customer/:customerId',
    element: <UserDetails />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} /> 
  </React.StrictMode>,
)
