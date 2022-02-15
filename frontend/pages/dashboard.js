import React, {useEffect, useLayoutEffect} from 'react'
import Layout from "../components/Layout"
import UserDashboard from '../components/Dashboards/UserDashboard'
import AdminDashboard from '../components/Dashboards/AdminDashboard'
import {isAuth} from "../Actions/authActions"

function dashboard() {
    
    

    useEffect(()=>{
        // console.log(isAuth())
        ((!isAuth()) && Router.push("/"))
    },[])

    // console.log(isAuth())

  return (
    <>
        {isAuth() && isAuth().role == 0 && <>
            <UserDashboard />
        </>}
        {isAuth() && isAuth().role == 1 && <>
            <AdminDashboard />
        </>}
    </>
  )
}

export default dashboard