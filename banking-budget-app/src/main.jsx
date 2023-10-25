import React from 'react'
import ReactDOM from 'react-dom/client'
import BudgetApp from './BudgetApp'
import BankingApp from './BankingApp'
import LandingPage from './LandingPage'
import Login from './login-signup/Login'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BudgetApp/>
    <BankingApp/> */}
    <LandingPage/>
    {/* <Login /> */}
  </React.StrictMode>,
)
