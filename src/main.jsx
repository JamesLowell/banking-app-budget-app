/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BankingDashBoard from './pages/bankingDashBoard.jsx';
import BankingApp from './bankingApp.jsx';
import Settings from './pages/setting.jsx';
import NewUser from './pages/newuser.jsx';
import Home from './pages/home.jsx';
import NotFound from './pages/NotFound.jsx';
import UserInfo from './pages/UserInfo.jsx';
import CustomerList from './bank-components/CustomerList';
import UserDetails from './bank-components/UserDetails';
import { getContact } from './GetContact.jsx';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dboard-ref';
import ExpenseTracker from './pages/expense-tracker';
import ProtectedRoute  from './component/protected-route';
import '../src/App.css';
import './index.css';

const router = createBrowserRouter([
  {
    path:"/budget/login",
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
  {
    path: '/customer-list',
    element: <CustomerList />,
  },
  {
    path: '',
    element: <BankingApp />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'banking/dashboard',
        element: <BankingDashBoard />,
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
