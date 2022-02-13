import fetch from "isomorphic-fetch"
import {API} from "../config"
import cookie from "js-cookie"
import Router from "next/router"
import queryString from "query-string"


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
    console.log(query)
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