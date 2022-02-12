import fetch from "isomorphic-fetch"
import {API} from "../config"
import cookie from "js-cookie"
import Router from "next/router"

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
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

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
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

export const googleSignin = (user) => {
    return fetch(`${API}/google-signin`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
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

export const signout = (next) => {
    removeCookie("token");
    removeLocalStorage("user")    
    next();

    return fetch(`${API}/signout`, {
        method:"GET"
    })
        .then((res)=>{
            console.log("Signout success");
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
}


// set cookie
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

// remove cookie
export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        })
    }
}

// get cookie
export const getCookie = (key) => {
    if (process.browser) {
        return cookie.get(key)
    }
}



// localStorage
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key)
    }
}


export const authenticate = (data, next) => {
    console.log("authentiate");
    console.log(data)
    setCookie("token", data.token);
    setLocalStorage("user", data.user);
    next();
}


export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie("token")
        if (cookieChecked) {
            if (localStorage.getItem("user")) {
                return JSON.parse(localStorage.getItem("user"))
            } else {
                return false
            }
        }
    }
}