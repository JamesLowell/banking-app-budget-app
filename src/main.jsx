/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BudgetApp from './budget-app/BudgetApp.jsx';
import BankingDashBoard from './banking-app/pages/bankingDashBoard.jsx';
import BankingApp from './banking-app/BankingApp.jsx';
import Settings from './banking-app/pages/setting.jsx';
import CreateNewUser, { createNewUserAction } from './banking-app/bank-components/CreateNewUser.jsx'
import Home from './banking-app/pages/home.jsx';
import NotFound from './component/NotFound.jsx';
import { withdrawAction } from './banking-app/bank-components/transaction-modal/WithdrawModal.jsx';
import UserInfo, { userLoader } from './banking-app/pages/UserInfo.jsx';
import LandingPage from './landing-page/LandingPage.jsx';
import EditUser, { editUserAction } from './banking-app/bank-components/EditUser.jsx';
import CustomerList, { usersLoader } from './banking-app/bank-components/CustomerList.jsx';
import UserDetails from './banking-app/bank-components/UserDetails.jsx';
import { getContact } from './banking-app/bank-components/GetContact.jsx';
import Login from './budget-app/pages/login.jsx';
import Register from './budget-app/pages/register.jsx';
import BudgetDashboard from './budget-app/pages/budgetDashboard.jsx';
import ExpenseTracker from './budget-app/pages/expense-tracker.jsx';
import ProtectedRoute  from './budget-app/budget-components/protected-route.jsx';
import './assets/App.css';
import './assets/index.css';
import BankingLogin from './banking-app/pages/BankingLogin.jsx';
import BankingRegister from './banking-app/pages/BankingRegister.jsx';
import BankingAppProtectedRoute from './banking-app/bank-components/BankingAppProtectedRoute.jsx';
import BankingLogout from './banking-app/pages/bankingLogout.jsx';
import ReactModal from 'react-modal';

const router = createBrowserRouter([
  {path:'/landing-page',
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
      element: <ProtectedRoute> <BudgetDashboard /> </ProtectedRoute>,
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
    path: '/',
    element: <LandingPage />,
    index: true
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
