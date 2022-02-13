import React from 'react'
import Router, {withRouter} from "next/router"
import {APP_NAME} from "../config"

import {signout, isAuth} from "../Actions/authActions"

function Header({router}) {

    const isActive = (path) => {
        if (router.pathname == path) {
            return {
                color:"#4187e8"
            }
        }
    }

    // console.log(isAuth())

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
            <a className="navbar-brand" style={isActive("/")}  href="/"> {APP_NAME} </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" style={isActive("/shop")} href="/shop"> Shop </a>
                    </li>
                    {isAuth() && (<><li className="nav-item">
                        <a className="nav-link" style={isActive("/dashboard")} href="/dashboard"> Dashboard </a>
                    </li>
                    <li className="nav-item">
                            <a className="nav-link" href="/signin" onClick={()=>signout(()=>Router.push("/signin"))} > Signout </a>
                    </li>
                    </>)}
                    { !isAuth() &&
                    (<><li className="nav-item">
                        <a className="nav-link" style={isActive("/signin")} href="/signin"> Signin </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" style={isActive("/signup")} href="/signup"> Signup</a>
                    </li></>)
                    }
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> 
            </div>
        </nav>
    </div>
  )
}

export default withRouter(Header)