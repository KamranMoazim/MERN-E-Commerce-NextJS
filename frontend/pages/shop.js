import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout'
import {getAllCategories} from "../Actions/categoryActions"
import {getFilteredProducts} from "../Actions/productActions"
import Card from '../components/Products/Card'
import Checkbox from '../components/Checkbox'
import Radiobox from '../components/Radiobox'
import {prices} from "../components/cors/fixedPrice"

function shop() {

    const [products, setProducts] = useState([])
    const [myFilters, setMyFilters] = useState({
        filters: {categories:[], price:[]}
    })
    const [categories, setCategories] = useState([])
    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [error, setError] = useState(false)

    useEffect(()=>{
        loadAllCateories()
    },[])



    const loadAllCateories = () => {
        getAllCategories()
            .then((data)=>{
                if (data.error) {
                    setError(data.error)
                } else {
                    setCategories(data)
                }
            })
    }


    const loadAllProducts = (myFilters) => {
        getFilteredProducts(skip, limit, myFilters.filters)
            .then((data)=>{
                if (data.error) {
                    setError(data.error)
                } else {
                    setProducts(data.products)
                    setSize(data.size)
                    setSkip(0)
                    // console.log(data)
                }
            })
    }


    const loadMoreProducts = (myFilters) => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters)
            .then((data)=>{
                if (data.error) {
                    setError(data.error)
                } else {
                    setProducts([...products, ...data.products])
                    setSize(size+data.size)
                    setSkip(0)
                    // console.log(data)
                }
            })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMoreProducts} className='btn btn-warning mb-5'>
                    Load More
                </button>
            )
        )
    }

    const handlePrice = (value) => {
        const data = prices;
        let array = []

        for(let key in data){
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
                break;
            }
        }
        return array;
    }

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy]=filters
        
        // console.log(myFilters)
        if (filterBy === "price") {
            let priceValue = handlePrice(filters)
            newFilters.filters[filterBy]=priceValue
        }
        loadAllProducts(myFilters)
        setMyFilters(newFilters);
    }


    const showError = () => (error ? <div className='alert alert-danger'> {error} </div> : "")
  
    return (
      <Layout title='Shop Page' description='Search And Find Books of your Choice!' className='container-fluid'>
          {showError()}
        <div className='row'>
            <div className='col-md-4'>
                <h3>Filter By Categories</h3>
                <ul>
                    <Checkbox handleFilters={filters => handleFilters(filters, "categories")} categories={categories} />
                </ul>
                <h3>Filter By Price</h3>
                <ul>
                    <Radiobox handleFilters={filters => handleFilters(filters, "price")} prices={prices} />
                </ul>
            </div>
            <div className='col-md-8'>
                {/* {JSON.stringify(myFilters)} */}
                <h2 className='mb-4'>
                    Search Results
                </h2>
                <div className='row'>
                    {products.map((prod, ind)=>{
                        return <Card product={prod} key={ind} />
                    })}
                </div>
                {loadMoreButton()}
            </div>
        </div>
      </Layout>
    )
  
}

export default shop