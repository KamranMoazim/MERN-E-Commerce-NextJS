import React, {useEffect, useState} from 'react'
import {withRouter} from "next/router"
import {getSingleProduct, getRelatedProducts} from "../../Actions/productActions"
import {addItemToCart} from "../../Actions/cartActions"
import Layout from "../../components/Layout"
import moment from "moment"
import ShowImage from '../../components/Products/ShowImage'
import Card from '../../components/Products/Card'


function ProductDetails({data}) {

    const [relatedProducts, setRelatedProducts] = useState([])
    const [error, setError] = useState("")

    const showStock = (quantity) => {
        return quantity > 0 ? <span className='badge badge-primary'>
            In Stock
        </span> : <span className='badge badge-danger'>
            Out of Stock
        </span>
    }

    useEffect(()=>{
        loadRelatedProducts(data)
    },[])

    const showError = () => (error ? <div className='alert alert-danger'> {error} </div> : "")

    const loadRelatedProducts = (product) => {
        getRelatedProducts(product)
            .then((res)=>{
                if (res.error) {
                    setError(res.error)
                } else {
                    setRelatedProducts(res)
                    console.log(res)
                }
            })
    }

    const confirmedAddToCart = (product) => {
        addItemToCart(product)
    }

  return (
    <Layout title={data && data.name} description={data && data.description.substring(0, 100)}  className='container-fluid'>
        <div className='row'>
            {showError()}
            <div className='col-8 mb-3'>
                <div className='card'>
                    <div className='card-header'>
                        {data.name}
                    </div>
                    <div className='card-body'>
                        <ShowImage url={data.photoPath} />
                        {data.description}
                        <p className='black-9'>Price : ${data.price}</p>
                        <p className='black-8'>Category : {data.category.name}</p>
                        <p className='black-7'> Added On : {moment(data.createdAt).fromNow()}</p>
                        {showStock(data.quantity)}
                    </div>
                    <button onClick={()=>confirmedAddToCart(data)}  className='btn btn-outline-warning mt-2 mb-2 ml-2'>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className='col-4'>
                {/* className='col-12' */}
                <h3>Related Products</h3>
                {relatedProducts.map((rP, ind)=>{
                    return <Card key={ind} product={rP} className="col-12" />
                    //  className="col-12"
                })}
            </div>
        </div>
    </Layout>
  )
}

ProductDetails.getInitialProps = ({query}) => {

    return getSingleProduct(query.id)
        .then((data)=>{
            if (data.error) {
                console.log(data.error);
            }
            return {
                data
            }
        })
}


export default withRouter(ProductDetails)