import fetch from "isomorphic-fetch"
import {API} from "../config"
import cookie from "js-cookie"
import Router from "next/router"


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