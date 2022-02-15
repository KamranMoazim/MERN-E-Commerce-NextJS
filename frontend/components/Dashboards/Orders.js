import React, {useEffect, useState} from 'react'
import moment from "moment"
import {fetchOrders, getOrderStatuses, updateStatusValue} from "../../Actions/orderActions"
import {isAuth, getCookie} from "../../Actions/authActions"
import Layout from "../Layout"

function Orders() {

    const [orders, setOrders] = useState([])
    const [statuses, setStatuses] = useState([])

    const userId = isAuth() && isAuth()._id
    const token = isAuth() && getCookie("token")

    const loadOrders = () => {
        fetchOrders(userId, token)
            .then((data)=>{
                if (data.error) {
                    console.log(data.error)
                } else {
                    setOrders(data)
                }
            })
    }
    const loadStatuses = () => {
        getOrderStatuses(userId, token)
            .then((data)=>{
                if (data.error) {
                    console.log(data.error)
                } else {
                    setStatuses(data)
                }
            })
    }

    useEffect(()=>{
        loadOrders()
        loadStatuses()
    },[])

    const showInput = (key, value) => {
        return (
            <div className='input-group mb-2 mr-sm-2'>
                <div className='input-group-prepend'>
                    <div className='input-group-text'>{key}</div>
                </div>
                <input 
                    type="text"
                    value={value}
                    className="form-control"
                    readOnly
                />
            </div>
        )
    }

    const handleStatusChange = (e, orderId) => {
        updateStatusValue(userId, token, orderId, e.target.value)
            .then((res)=>{
                if (res.error) {
                    console.log(res.error)
                } else {
                    loadOrders()
                }
            })
    }

    const showStatus = (o) => (
        <div className='form-group'>
            <h3 className='mark mb-4'>
                Status : {o.status}
            </h3>
            <select className='form-control' onChange={(e)=>{handleStatusChange(e, o._id)}}>
                <option>Update Status</option>
                {statuses.map((s,i)=>(
                    <option key={i} value={s}>
                        {s}
                    </option>
                ))}
            </select>
        </div>
    )

  return (
    <Layout title='Orders' description='Viewing Latest Orders!'>
        <div className='row'>
            <div className='col-md-8 offset-md-2'>
                {/* {JSON.stringify(orders)} */}
                {orders.map((o, i)=>{
                    // console.log(o)
                    return <div className='mt-5' key={i} style={{borderBottom:"5px solid indigo"}}>
                        <h2 className='mb-5'>
                            <span className='bg-primary'>
                                Order ID : {o._id}
                            </span>
                        </h2>
                        <ul className='list-group mb-2'>
                            <li className='list-group-item'> {showStatus(o)} </li>
                            <li className='list-group-item'> {o.status} </li>
                            <li className='list-group-item'> Transaction ID : {o.transaction} </li>
                            <li className='list-group-item'> Amount : {o.amount} </li>
                            <li className='list-group-item'> Order By : {o.user.name} </li>
                            <li className='list-group-item'> Order On : {moment(o.createdAt).fromNow()} </li>
                            <li className='list-group-item'> Delievery Address : {o.address} </li>
                        </ul>
                        <h3 className='mt-3 mb-3 font-italic'>
                            Total Products in Order : {o.products.length}
                        </h3>
                        {o.products.map((p, ind)=>{
                            return <div className='mb-4' key={ind} style={{padding:"20px", border:"1px solid indigo"}}>
                                {showInput("Product Name", p.name)}
                                {showInput("Product Price", p.price)}
                                {showInput("Product Total", p.count)}
                                {showInput("Product ID", p._id)}
                            </div>
                        })}
                    </div>
                })}
            </div>
        </div>
    </Layout>
  )
}

export default Orders