import fetch from "isomorphic-fetch"
import {API} from "../config"
import queryString from "query-string"



export const updateStatusValue = (userId, token, orderId, status) => {

    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method:"PUT",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({status, orderId})
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}



export const getOrderStatuses = (userId, token) => {

    return fetch(`${API}/order/status-values/${userId}`, {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}



export const createOrder = (userId, token, orderData) => {

    return fetch(`${API}/order/create/${userId}`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(orderData)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const fetchOrders = (userId, token) => {

    return fetch(`${API}/order/list/${userId}`, {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}
