import fetch from "isomorphic-fetch"
import {API} from "../config"



export const getUser = (id, token) => {
    // console.log(token)
    return fetch(`${API}/user/${id}`, {
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



export const updateUser = (id, user, token) => {
    return fetch(`${API}/user/${id}`, {
        method:"PUT",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(user)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}




export const getUserPurchaseHistory = (id, token) => {
    return fetch(`${API}/orders/by/user/${id}`, {
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
