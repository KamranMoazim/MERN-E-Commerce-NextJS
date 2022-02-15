import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Layout from '../Layout'
import {isAuth, getCookie} from "../../Actions/authActions"
import {getUserPurchaseHistory} from "../../Actions/userActions"


function UserDashboard() {

    const {role, name, email, _id} = isAuth()
    const [history, setHistory] = useState([])
    const [error, setError] = useState(false)

    const token = getCookie("token")

    const loadHistory = () => {
        getUserPurchaseHistory(_id, token)
            .then((res)=>{
                if (res.error) {
                    setError(res.error)
                } else {
                    // console.log(res)
                    setHistory(res)
                }
            })
    }

    const showUserLinks = () => {
        return (
            <div className='card mb-5'>
            <h3 className='card-header'>User Links</h3>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <a className="nav-link" to="/cart">
                        Cart
                    </a>
                </li>
                <li className='list-group-item'>
                    <a className="nav-link" href={`/profile/${_id?_id:""}`}>
                        Update Profile
                    </a>
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

    const showUserHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, ind) => {
                            return (
                                <div key={ind}>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>Product price: ${p.price}</h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(p.createdAt).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };
    

    // const showUserHistory = () => {
    //     return (
    //         <div className='card mb-5'>
    //             <h3 className='card-header'>User Purchase History</h3>
    //             <ul className='list-group'>
    //                 <li className='list-group-item'>History</li>

    //             </ul>
    //         </div>
    //     )
    // }

    const showError = () => (error ? <div className='alert alert-danger'> {error} </div> : "")

    useEffect(()=>{
        loadHistory()
    },[])

  return (
    <Layout title='Dashboard' description={`G'day ${name}`} className='container'>
        <div className='row'>
            <div className='col-md-3'>
                {showUserLinks()}
            </div>
            <div className='col-md-9'>
                {showError()}
                {showUserInfo()}
                {showUserHistory(history)}
            </div>
        </div>
           
    </Layout>
  )
}

export default UserDashboard