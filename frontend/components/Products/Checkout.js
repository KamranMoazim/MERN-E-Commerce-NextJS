import React from 'react'
import {isAuth} from "../../Actions/authActions"


function Checkout({products}) {

    const getTotal = () => {
        return products.reduce((currentValue, nextValue)=>{
            return currentValue+nextValue.count*nextValue.price
        },0)
    }

    const showCheckOut = () => isAuth() ? (
        <button className='btn btn-success'>Checkout</button>
    ) : (
        <a href='/signin'>
            <button className='btn btn-primary'>Signin to Checkout!</button>
        </a>
    )

  return (
    <div>
        <h2>
            Total : ${getTotal()}
        </h2>
        {showCheckOut()}
    </div>
  )
}

export default Checkout