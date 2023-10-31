import React from 'react'
import {getLocalStorage, globals} from '@/utils'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute ({ children }){
    const userSignedIn = getLocalStorage("userSignedIn")
    const currentUser = getLocalStorage("currentUser")

    if (!userSignedIn && !currentUser) {
        alert('Please login to access the page');
        return <Navigate to = {globals.paths.login} replace = {true} />
    }

    return (
        <>
            {children}
        </>
    )


}
    