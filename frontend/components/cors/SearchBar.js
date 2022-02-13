import React,{useState, useEffect} from 'react'
import {getAllCategories} from "../../Actions/categoryActions"
import {getSearchedProducts} from "../../Actions/productActions"
import Card from '../Products/Card'


function SearchBar() {

    const [data, setData] = useState({
        categories:[],
        category:"",
        search:"",
        results:[],
        searched:false,
    })
    const [error, setError] = useState(false)
    const {categories, category, search, results, searched} = data

    const showError = () => (error ? <div className='alert alert-danger'> {error} </div> : "")

    useEffect(()=>{
        loadAllCateories()
    },[])

    const loadAllCateories = () => {
        getAllCategories()
            .then((res)=>{
                if (res.error) {
                    setError(res.error)
                } else {
                    setData({...data, categories:res})
                }
            })
    }

    const handleChange = name => (e) => {
        setData({...data, [name]:e.target.value, searched:false})
    }

    const searchData = () => {
        if (search) {
            getSearchedProducts({search:search, category:category})
                .then((res)=>{
                    if (res.error) {
                        setError(res.error)
                    } else {
                        console.log(data)
                        setData({...data, results:res, searched:true})
                        // loadAllCateories()
                        console.log(res)
                    }
                })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        searchData()
    }

    const showForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <span className='input-group-text'>
                    <div className='input-group input-group-lg'>
                        <div className='input-group-prepend'>
                            <select className='btn mr-2' onChange={handleChange("category")}>
                                <option value="All">
                                    Pick Category
                                </option>
                                {categories?.map((cate, ind)=>{
                                    return (
                                        <option key={ind} value={cate._id}>
                                            {cate.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <input
                            type="search"
                            className='form-control'
                            onChange={handleChange("search")}
                            placeholder='Search By Name'
                        />
                    </div>
                    <div className='btn input-group-append' style={{border:'none'}}>
                        <button className='input-group-text'>
                            Search
                        </button>
                    </div>
                </span>
            </form>
        )
    }

    const searchedProducts = (results=[]) => {
        return results.map((res, ind)=>{
            return <Card key={ind} product={res}  />
        })
    }

  return (
    <div className='row'>
        <div className='container mt-3'>
            {showError()}
            {showForm()}
            {searched && <h2 className='mt-2'>Searched Result : {results.length}</h2>}
            <div className='mt-2'>
                {searched && searchedProducts(results)}
            </div>
        </div>
    </div>
  )
}

export default SearchBar