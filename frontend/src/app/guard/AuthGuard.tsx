import React from 'react'
import { useAppSelector } from '../store/hooks'
import { Navigate, Outlet } from 'react-router-dom'
interface AuthGuardProps{
    requiresAuth:boolean
}
const AuthGuard = ({requiresAuth}:AuthGuardProps) => {

    const AuthStatus = useAppSelector((state)=>state.auth.status)
    if(AuthStatus==="initializing") return <div>loading...</div>
    if(AuthStatus==="authenticated" && requiresAuth )return <Outlet/>
    if(AuthStatus==="authenticated" && !requiresAuth)return <Navigate to="/"/>
    if(AuthStatus==="unauthenticated" && requiresAuth) return <Navigate to="/login"/>
    if(AuthStatus ==="unauthenticated" && !requiresAuth) return <Outlet/>


}

export default AuthGuard
