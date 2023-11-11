import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { userList } from './bank-components/users.jsx'
import NavBarSide from "./bank-components/NavBarSide.jsx";
import { ToastContainer } from 'react-toastify'

export default function BankingApp() {
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        

        if (storedUsers === null) {
            localStorage.setItem('users', JSON.stringify(userList));
        }
    }, [userList])
    return (
        <main style={{display: 'flex'}}>
        <NavBarSide />
        <Outlet />
        <ToastContainer />
        </main>
    )
    
}
