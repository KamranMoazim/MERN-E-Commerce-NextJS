import fetch from "isomorphic-fetch"
import {API} from "../config"
import cookie from "js-cookie"
import Router from "next/router"


export const createCate = (name, userId, token) => {
    
    return fetch(`${API}/category/create/${userId}`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(name)
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


export const getAllCategories = () => {
    
    return fetch(`${API}/categories`, {
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
        },
    })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}