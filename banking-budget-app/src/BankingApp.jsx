import { Outlet } from "react-router-dom";
import NavBarSide from "./NavBarSide";

export default function BankingApp() {
    
    return (
        <main style={{display: 'flex'}}>
        <NavBarSide />
        <Outlet />
        </main>
    )
    
}
