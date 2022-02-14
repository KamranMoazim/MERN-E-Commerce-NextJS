import React, { useEffect, useState } from 'react'
import {getCart} from "../Actions/cartActions"
import Layout from "../components/Layout"
import Card from '../components/Products/Card';
import Checkout from '../components/Products/Checkout';

function cart() {

    const [items, setItems] = useState([]);

    useEffect(()=>{
        setItems(getCart())
    },[items])

    const showItems = () => {
        return (
            <div>
                <h2>Your Cart has {items.length} items!</h2>
                <hr/>
                {items.map((item,ind)=>{
                    return <Card key={ind} product={item} 
                    showAddToCart={false} 
                    className="col-12"
                    cartUpdate={true}
                    removeProductFromCart={true} />
                })}
            </div>
        )
    }

    const noItems = () => {
        return (
            <h2>Your Cart is Empty! <a href='/shop' className='btn btn-outline-success'>Continue Shopping!</a> </h2>
        )
    }

  return (
    <Layout title='Your Cart' description='An Extreme Commerce Cart, Enabling the World to Knowledge by BOOKS!'>
        <div className='row'>
            <div className='col-6'>
                {items.length>0 ? showItems() : noItems()}
            </div>
            <div className='col-6'>
                {items.length>0 ? (<><h2>Your Cart Summary!</h2>
                <hr/>
                <Checkout products={items} /></>) : (<></>)}
                
            </div>
        </div>
    </Layout>
  )
}

export default cart