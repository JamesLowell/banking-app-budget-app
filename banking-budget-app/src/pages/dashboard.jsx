/* eslint-disable react/display-name */
import React, {useEffect} from 'react'

const Dashboard = () => {

    const firstName = ()=>{
        const getuser = localStorage.getItem("user_login");

        if(getuser && getuser.length){
            const user = JSON.parse(getuser);
            console.log(user);
        }
    }

    useEffect(()=>{
        firstName();
    },[])

    return(
    <>
    <div>test</div>
    </>
        
    )
}

export default Dashboard;