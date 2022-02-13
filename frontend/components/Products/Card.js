import React from 'react'
import Link from 'next/link'
import ShowImage from './ShowImage'


function Card({product}) {

  return (
    <div className='col-4 mb-3'>
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
                <a href="/">
                    <button className='btn btn-outline-primary mt-2 mb-2'>
                        View Product
                    </button>
                </a>
                <button className='btn btn-outline-warning mt-2 mb-2 ml-2'>
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
  )
}

export default Card