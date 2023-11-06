import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoard from './pages/dashboard.jsx';
import BankingApp from './bankingApp.jsx';
import Settings from './pages/setting.jsx';
import NewUser from './pages/newuser.jsx';
import Home from './pages/home.jsx';
import NotFound from './pages/NotFound.jsx';
import UserInfo from './pages/UserInfo.jsx';
import CustomerList from './bank-components/CustomerList';
import UserDetails from './bank-components/UserDetails';
import './index.css';
import { getContact } from './GetContact.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerList />,
  },
  {
    path: '/',
    element: <BankingApp />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <DashBoard />,
      },
      {
        path: 'new-user',
        element: <NewUser />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'customer/:customerId',
        element: <UserInfo />,
        loader: async ({ params }) => {
          const contactId = params.customerId;
          const contact = await getContact(contactId);
          return contact;
        },
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
