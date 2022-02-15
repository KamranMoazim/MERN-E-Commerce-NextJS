import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout';
import Router from 'next/router';
import {isAuth, getCookie} from "../../Actions/authActions"
import {getAllProducts, deleteProduct} from "../../Actions/productActions"

function manage() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const loadProducts = () => {
        getAllProducts()
            .then((res)=>{
                if (res.error) {
                    setError(res.error)
                } else {
                    setError(false)
                    // console.log(res)
                    setProducts(res)
                }
            })
    }

    useEffect(()=>{
        (isAuth().role !== 1) && Router.push("/")
        loadProducts()
    },[])
    
    const showError = () => (error ? <div className='alert alert-danger'> {error} </div> : "")
    const showSuccess = () => (success ? <div className='alert alert-primary'> {success} </div> : "")

    const goBack = () => {
        return (
            <a href='/dashboard' className='btn btn-outline-primary mt-3'>
                Go Back
            </a>
        )
    }

    const token = getCookie("token");
    const userId = isAuth()&&isAuth()._id;

    const callDeleteProd = (userId, pId, token) => {
        deleteProduct(userId, pId, token)
            .then((res)=>{
                if (res.error) {
                    setError(res.error)
                    setSuccess(false)
                } else {
                    setError(false)
                    setSuccess(res.message)
                    setTimeout(()=>{
                        Router.reload(window.location.pathname)
                    }, 1000)
                }
            })
    }
    
    const showProducts = () => (
        <div className='row'>
            <div className='col-12'>
                <ul className='list-group'>
                    {products.map((p, ind)=>{
                        return <li key={ind} className="row">
                            <strong className='mr-3 mt-3'>{p.name}</strong>
                            <a className='btn btn-outline-warning mr-3 mt-3' href={`/update/${p._id}`}>
                                Update
                            </a>
                            <button onClick={()=>callDeleteProd(userId, p._id, token)}
                            className='btn btn-outline-danger mr-3 mt-3'>
                                Delete
                            </button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )

    
    return (
      <Layout title='Manage Products' description='Manage All Your Products!' className='container col-md-8 offset-md-2'>
              {showError()}
              {showSuccess()}
              {showProducts()}
              {goBack()}
      </Layout>
    )
}

export default manage