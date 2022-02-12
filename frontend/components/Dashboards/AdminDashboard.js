import React from 'react'
import Layout from '../Layout'

function AdminDashboard() {
    const {role, name, email, _id} = isAuth()

    const showAdminLinks = () => {
        return (
            <div className='card mb-5'>
            <h3 className='card-header'>Admin Links</h3>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <Link className="nav-link" to="/category/create">
                        Create Category
                    </Link>
                </li>
                <li className='list-group-item'>
                    <Link className="nav-link" to="/product/create">
                        Create Product
                    </Link>
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