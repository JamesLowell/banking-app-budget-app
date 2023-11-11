/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BudgetApp from './BudgetApp.jsx';
import BankingDashBoard from './pages/bankingDashBoard.jsx';
import BankingApp from './BankingApp.jsx';
import Settings from './pages/setting.jsx';
import CreateNewUser, { createNewUserAction } from './bank-components/CreateNewUser.jsx'
import Home from './pages/home.jsx';
import NotFound from './pages/NotFound.jsx';
import UserInfo, { userLoader } from './pages/UserInfo.jsx';
import WithdrawModal, { withdrawAction } from './pages/WithdrawModal.jsx';
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
import ReactModal from 'react-modal';

const router = createBrowserRouter([
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
    element: <BankingApp />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'customer-list',
        element: <CustomerList />,
        loader: usersLoader 
      },
      {
        path: 'dashboard',
        element: <BankingDashBoard />,
      },
      {
        path: 'new-user',
        element: <CreateNewUser />,
        action: createNewUserAction
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'user/:userId',
        element: <UserInfo />,
        loader: userLoader,
        action: withdrawAction
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

ReactModal.setAppElement('#root')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
