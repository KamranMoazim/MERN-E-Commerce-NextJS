
import React, { useEffect, useState } from 'react'

import DropIn from 'braintree-web-drop-in-react'
import {isAuth, getCookie} from "../../Actions/authActions"
import { getBrainTreeClientToken, getProcessPayment } from '../../Actions/productActions'
import { emptyCart } from '../../Actions/cartActions'
import Router from 'next/router'


function Checkout({products}) {

    const [data, setData] = useState({
        loading:false,
        success:false,
        error:false,
        clientToken:"",
        instance:{},
        address:""
    })
    // const [cartAction, setCartAction] = useState(false)

    const userId = isAuth() && isAuth()._id
    const token = isAuth() && getCookie("token")

    const getTotal = () => {
        return products.reduce((currentValue, nextValue)=>{
            return currentValue+nextValue.count*nextValue.price
        },0)
    }
    let total = getTotal();

    const getToken = () => {
        getBrainTreeClientToken(userId, token)
            .then((res)=>{
                console.log(res)
                if (res.error) {
                    setData({...data, error:res.error})
                } else {
                    setData({...data, clientToken:res.clientToken})
                }
            })
    }

    useEffect(()=>{
        getToken()
    },[])

    const showCheckOut = () => {
        if (isAuth().name) {
            return (showFropIn())
        } else {
            return (
                    <a href='/signin'>
                        <button className='btn btn-primary'>Signin to Checkout!</button>
                    </a>
                )
        }
    }

    useEffect(()=>{
        // emptyCart()
        // Router.push("/cart")
        total = getTotal();
    },[products])

    const onBuy = () => {
        setData({...data, loading:true})
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then((res)=>{
            nonce = res.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount:total
            }

            getProcessPayment(userId, token, paymentData)
                .then((nRes)=>{
                    console.log(nRes)
                    setData({...data, success:nRes.success, loading:false})
                    // setCartAction(true)
                    // setData({...data, loading:false})
                })
                .catch((err)=>{
                    setData({...data, error:err.message, loading:false})
                    // setData({...data, loading:false})  != null
                })
        })
        .catch((err)=>{
            setData({...data, error:err.message})
        })
        console.log(getNonce)
    }

    const showFropIn = () => {
        // console.log("firstfirstfirstfirstfirst")
        return <div>
            {(data.clientToken) ? (
                <div>
                    <DropIn 
                    // , paypal:{flow:"vault"}
                        options={{authorization:data.clientToken}} 
                        onInstance={instance=>data.instance=instance}
                    />
                    <button className='btn btn-success' onClick={onBuy}>Pay</button>
                </div>
            ) : (<div className='alert alert-warning'>Loading...</div>) }
        </div>
    }

    const showError = () => (data.error ? <div className='alert alert-danger'> {data.error} </div> : <></>)
    const showSuccess = () => (data.success ? <div className='alert alert-success'> Thanks, Your Payment of ${getTotal()} was Successfull! </div> : <></> )
    const showLoading = () => (data.loading ? <div className='alert alert-primary'> Transaction is in Process.....! </div> : <></> )

  return (
    <div>
        <h2>
            Total : ${getTotal()}
        </h2>
        {showLoading()}
        {showError()}
        {showSuccess()}
        {showCheckOut()}
    </div>
  )
}

export default Checkout
