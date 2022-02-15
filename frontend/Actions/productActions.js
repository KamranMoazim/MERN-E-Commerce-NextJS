import fetch from "isomorphic-fetch"
import {API} from "../config"
import cookie from "js-cookie"
import Router from "next/router"
import queryString from "query-string"


export const getProcessPayment = (userId, token, paymentData) => {

    return fetch(`${API}/braintree/payment/${userId}`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(paymentData)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}



export const getBrainTreeClientToken = (userId, token) => {
// console.log(token)
    return fetch(`${API}/braintree/getToken/${userId}`, {
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


export const createProduct = (product, userId, token) => {
    // console.log(product)
    return fetch(`${API}/product/create/${userId}`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(product)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const getProducts = (sortBy) => {
    // console.log(product)
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
        }
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const getFilteredProducts = (skip=0, limit=10, filters={}) => { //  sortBy="sold", order="asc",
    // console.log(filters)
    let data = {
        limit,
        skip,
        filters
    }
    return fetch(`${API}/products/by/search`, {  // ?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
        },
        body:JSON.stringify(data)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const getSearchedProducts = (params) => {

    const query = queryString.stringify(params)
    // console.log(query)
    return fetch(`${API}/products/search/?${query}`, {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
        }
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const getSingleProduct = (id) => {

    return fetch(`${API}/product/${id}`, {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
        }
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}

export const getRelatedProducts = (product) => {
    console.log(product)
    return fetch(`${API}/products/related/${product._id}`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
        },
        body: JSON.stringify(product)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}