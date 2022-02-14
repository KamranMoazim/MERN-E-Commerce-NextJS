import React, { useState } from 'react'
import Link from 'next/link'
import ShowImage from './ShowImage'
import {addItemToCart, removeItem, updateItem} from "../../Actions/cartActions"

function Card({product, className="", showAddToCart=true, cartUpdate=false, removeProductFromCart=false}) {

    const [count, setCount] = useState(product.count)

    const confirmedAddToCart = (product) => {
        addItemToCart(product)
    }

    const handleChange = (id) => (e) => {
        setCount(e.target.value<1 ? 1 : e.target.value)
        if (e.target.value>1) {
            updateItem(id, e.target.value)
        }
    }

    const showCartUpdateOptions = (product) => {
        return (
            <div>
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'> Adjust Quantity </span>
                    </div>
                    <input type="number" className='form-control' value={count}  onChange={handleChange(product._id)} />
                </div>
            </div>
        )
    }

    const showRemoveProductFromCart = (product) => {
        return (
            <button onClick={()=>removeItem(product._id)} className='btn btn-outline-danger mt-2 mb-2 ml-2'>
                Remove From Cart
            </button>
        )
    }

  return (
    <div className={className?className:'col-4 mb-3'}>
        <div className='card'>
            <div className='card-header'>
                {product.name}
            </div>
            <div className='card-body'>
                <ShowImage url={product.photoPath} name={product.name} />
                <p>
                    {product.description.substring(0, 250)}
                </p>
                <p>
                    ${product.price}
                </p>
                <a href={`/product/${product._id}`}>
                    <button className='btn btn-outline-primary mt-2 mb-2'>
                        View Product
                    </button>
                </a>
                {showAddToCart && (<button onClick={()=>confirmedAddToCart(product)} className='btn btn-outline-warning mt-2 mb-2 ml-2'>
                                        Add to Cart
                                    </button>)}
                {cartUpdate && (showCartUpdateOptions(product))}
                {removeProductFromCart && (showRemoveProductFromCart(product))}

            </div>
        </div>
    </div>
  )
}

export default Card