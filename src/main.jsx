/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BudgetApp from './BudgetApp.jsx';
import BankingDashBoard from './pages/bankingDashBoard.jsx';
import BankingApp from './BankingApp.jsx';
import Settings from './pages/setting.jsx';
import CreateNewUser from './bank-components/CreateNewUser.jsx'
import Home from './pages/home.jsx';
import NotFound from './pages/NotFound.jsx';
import UserInfo, { userLoader } from './pages/UserInfo.jsx';
import LandingPage from './LandingPage.jsx';
import EditUser, { editUserAction } from './bank-components/EditUser.jsx';
import CustomerList, { usersLoader } from './bank-components/CustomerList';
import UserDetails from './bank-components/UserDetails';
import { getContact } from './GetContact.jsx';
import Login from './pages/login';
import Register from './pages/register';
import budgetDashboard from './pages/budgetDashboard.jsx';
import ExpenseTracker from './pages/expense-tracker';
import ProtectedRoute  from './component/protected-route';
import '../src/App.css';
import './index.css';
import BankingLogin from './pages/BankingLogin.jsx';
import BankingRegister from './pages/BankingRegister';
import BankingAppProtectedRoute from './component/BankingAppProtectedRoute.jsx';
import BankingLogout from './pages/bankingLogout.jsx';

const router = createBrowserRouter([
  {index:true,
    element:<LandingPage/>
  },
{
  path: '/budget',
  element: <BudgetApp />,
  children: [
    {
      path:"login",
      element: <Login />,
      index: true,
    },
    {
      path:"register",
      element: <Register />,
    },
    {
      path:"dashboard",
      element: <ProtectedRoute> <budgetDashboard /> </ProtectedRoute>,
    },
    {
      path:"expense",
      element: <ProtectedRoute> <ExpenseTracker /> </ProtectedRoute>,
    },
  ]
},
  {
    path:"/bankinglogin",
    element: <BankingLogin />,
  },
  {
    path:"/bankingregister",
    element: <BankingRegister />,
  },
  {
    path: 'banking-app',
    element: <BankingAppProtectedRoute><BankingApp /></BankingAppProtectedRoute>,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'customer-list',
        element: <CustomerList />,
        //loader: userLoader 
      },
      {
        path: 'dashboard',
        element: <BankingDashBoard />,
      },
      {
        path: 'new-user',
        element: <CreateNewUser />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'user/:userId',
        element: <UserInfo />,
        loader: userLoader,
      },
      {
        path: 'user/:userId/edit',
        element: <EditUser />,
        loader: userLoader,
        action: editUserAction
      },
      {
      path:'logout',
      element: <BankingLogout/>
      }
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
