import React from 'react'
import ReactDOM from 'react-dom/client'
import CustomerList from './bank-components/CustomerList'
import UserDetails from './bank-components/UserDetails'
import EditUser from './bank-components/EditUser'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import CreateNewUser from './bank-components/CreateNewUser'

const router = createBrowserRouter([
  {
    path:'/',
    element: <CustomerList />
  },
  {
    path: 'customer/:customerId',
    element: <UserDetails />,
    child: [
      {
        path: '/edit-user-info',
        element: <EditUser />
      }
    ]
  },
  {
    path: '/create',
    element: <CreateNewUser />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
