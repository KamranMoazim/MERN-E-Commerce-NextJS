import React from 'react'
import Layout from '../Layout'
import {isAuth} from "../../Actions/authActions"

function AdminDashboard() {
    const {role, name, email, _id} = isAuth()

    const showAdminLinks = () => {
        return (
            <div className='card mb-5'>
            <h3 className='card-header'>Admin Links</h3>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <a className="nav-link" href="/category/create">
                        Create Category
                    </a>
                </li>
                <li className='list-group-item'>
                    <a className="nav-link" href="/product/create">
                        Create Product
                    </a>
                </li>
                <li className='list-group-item'>
                    <a className="nav-link" href="/orders/list">
                        Show Orders
                    </a>
                </li>
            </ul>
        </div>
        )
    }

    const showAdminInfo = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>Admin Information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>{name}</li>
                    <li className='list-group-item'>{email}</li>
                    <li className='list-group-item'>{role === 0 ? "Registered User" : "Admin"}</li>
                </ul>
            </div>
        )
    }

  return (
    <Layout title='Dashboard' description={`G'day ${name}`} className='container'>
        <div className='row'>
            <div className='col-md-3'>
                {showAdminLinks()}
            </div>
            <div className='col-md-9'>
                {showAdminInfo()}
            </div>
        </div>
           
    </Layout>
  )
}

export default AdminDashboard