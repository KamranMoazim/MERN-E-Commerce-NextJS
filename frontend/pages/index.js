import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout'
import {getProducts} from "../Actions/productActions"
import Card from '../components/Products/Card'


export default function Home() {

  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductsBySell = () => {
    getProducts("sold")
      .then((data)=>{
        if (data.error) {
          setError(data.error)
        } else {
          setProductsBySell(data)
        }
      })
  }

  const loadProductsByArrival = () => {
    getProducts("createdAt")
      .then((data)=>{
        if (data.error) {
          setError(data.error)
        } else {
          setProductsByArrival(data)
        }
      })
  }

  console.log(productsByArrival)
  console.log(productsBySell)

  useEffect(()=>{
    loadProductsBySell()
    loadProductsByArrival()
  },[])

  const showError = () => (error ? <div className='alert alert-danger'> {error} </div> : "")

  return (
    <Layout title='Home Page' description='A FullStack E-Commerce App' className='container-fluid'>
      {showError()}
      <h2 className='mb-4'>
        Best Sellers
      </h2>
      <div className='row'>
        {productsBySell.map((prod, ind)=>{
          return <Card product={prod} key={ind} />
        })}
      </div>

      <h2 className='mb-4'>
        New Arrivals
      </h2>
      <div className='row'>
        {productsByArrival.map((prod, ind)=>{
          return <Card product={prod} key={ind} />
        })}
      </div>
    </Layout>
  )
}
