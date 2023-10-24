import React from 'react'
import ReactDOM from 'react-dom/client'
import BudgetApp from './BudgetApp'
import BankingApp from './BankingApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BudgetApp/>
    <BankingApp/>
  </React.StrictMode>,
)
