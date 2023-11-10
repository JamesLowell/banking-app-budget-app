import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { userList } from './bank-components/users.jsx'
import NavBarSide from "./NavBarSide";
import { ToastContainer } from 'react-toastify'

export default function BankingApp() {
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(userList))
    }, [])
    return (
        <main style={{display: 'flex'}}>
        <NavBarSide />
        <Outlet />
        <ToastContainer />
        </main>
    )
    
}
