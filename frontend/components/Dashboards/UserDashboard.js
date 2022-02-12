import React from 'react'
import Link from 'next/link'
import Layout from '../Layout'
import {isAuth} from "../../Actions/authActions"


function UserDashboard() {

    const {role, name, email, _id} = isAuth()

    const showUserLinks = () => {
        return (
            <div className='card mb-5'>
            <h3 className='card-header'>User Links</h3>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <Link className="nav-link" to="/cart">
                        Cart
                    </Link>
                </li>
                <li className='list-group-item'>
                    <Link className="nav-link" to={`/profile/${_id}`}>
                        Update Profile
                    </Link>
                </li>
            </ul>
        </div>
        )
    }

    const showUserInfo = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>User Information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>{name}</li>
                    <li className='list-group-item'>{email}</li>
                    <li className='list-group-item'>{role === 0 ? "Registered User" : "Admin"}</li>
                </ul>
            </div>
        )
    }

    const showUserHistory = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>User Purchase History</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>History</li>
                </ul>
            </div>
        )
    }

  return (
    <Layout title='Dashboard' description={`G'day ${name}`} className='container'>
        <div className='row'>
            <div className='col-md-3'>
                {showUserLinks()}
            </div>
            <div className='col-md-9'>
                {showUserInfo()}
                {showUserHistory()}
            </div>
        </div>
           
    </Layout>
  )
}

export default UserDashboard