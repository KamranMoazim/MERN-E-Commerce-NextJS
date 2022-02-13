import React, {useEffect, useState} from 'react'
import Router from 'next/router'
import Layout from "../../components/Layout"
import { getCookie, isAuth } from '../../Actions/authActions';
import {createProduct} from "../../Actions/productActions"
import {getAllCategories} from "../../Actions/categoryActions"
import axios from 'axios';


function createProductFunc() {
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState({
        id:"",
        token:"",
        name:"",
        description:"",
        price:"",
        category:"",
        shipping:"0",
        quantity:"",
        error:"",
        loading: false,
        message:"",
        showForm: true
    })
    const [photoPath, setPhotoPath] = useState("");
    
    const {id, token, name, description, price, category, shipping, quantity, error, loading, message, showForm} = values;
    
    useEffect(()=>{
        (!isAuth()) && Router.push("/")
        setValues({...values, id:isAuth()&&isAuth()._id, token:getCookie("token")})
        callCate();
    },[])
    
    const callCate = async () => {
        getAllCategories()
            .then((data)=>{
                // console.log(data)
                setCategories(data)
            })
            .catch((err)=>console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({...values, error:false, loading:true })

        let pro = {name, description, price, category, shipping, quantity, photoPath};
        // console.log(pro)

        createProduct(pro, id, token)
        .then(data => {
            if (data.error) {
                setValues({...values, error:data.error, loading:false })
            } else {
                setValues({
                    ...values,
                    name:"",
                    description:"",
                    price:"",
                    category:"",
                    shipping:"",
                    quantity:"",
                    photoPath:"",
                    error:"",
                    loading: false,
                    message:data.message,
                    showForm: true
                })
            }
        })
    }
    
    
    const handleChange = name => (e) => {
        setValues({...values, error:false, message:"", [name]:e.target.value})
    }
    
    const showLoading = () => (loading ? <div className='alert alert-info'> {loading} </div> : "")
    const showError = () => (error ? <div className='alert alert-danger'> {error} </div> : "")
    const showMessage = () => (message ? <div className='alert alert-info'> {message} </div> : "")

    const goBack = () => {
        return (
            <a href='/dashboard' className='btn btn-outline-warning mt-3'>
                Go Back
            </a>
        )
    }
    

    const uploadImage = async (image) => {
        if (image) {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "ecommerce")
            axios.post("https://api.cloudinary.com/v1_1/dt3zsnhkv/image/upload", data)
                .then((data)=>{
                    setPhotoPath(data.data.url)
                    return data
                })
                .catch(err => console.log(err))
        } else {
            alert("Please Select Image!")
        }
      
    }
    
    const proForm = () => {
      return (
          <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label className='btn btn-primary mt-2' >
                        <input 
                        onChange={(e)=>uploadImage(e.target.files[0])}  
                        type="file" accept='image/*' className='form-control' />
                    </label>
                </div>
              <div className='form-group'>
                  <label className="text-muted">Product Name</label>
                  <input value={name} onChange={handleChange("name")} type="text" className='form-control' />
              </div>
              <div className='form-group'>
                  <label className="text-muted">Product Description</label>
                  <textarea value={description} onChange={handleChange("description")} rows={6} className='form-control' />
              </div>
              <div className='form-group'>
                  <label className="text-muted">Product Price</label>
                  <input value={price} onChange={handleChange("price")} type="number" className='form-control' />
              </div>
              <div className='form-group'>
                  <label className="text-muted">Product Category</label>
                  <select onChange={handleChange("category")} className='form-control'>
                  {categories.map((cate, ind)=>{
                      return <option key={ind} value={cate._id}>{cate.name}</option>
                  })}
                  </select>
              </div>
              <div className='form-group'>
                  <label className="text-muted">Product Shipping</label>
                  <select onChange={handleChange("shipping")} className='form-control'>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                  </select>
              </div>
              <div className='form-group'>
                  <label className="text-muted">Product Quantity</label>
                  <input value={quantity} onChange={handleChange("quantity")} type="number" className='form-control' />
              </div>
              <div>
                  <button className='btn btn-outline-primary'>
                      Create Product
                  </button>
              </div>
          </form>
      )
    }
    
    return (
      <Layout title='Add New Product' description='Please! Use Following form to Add New Product' className='container col-md-8 offset-md-2'>
              {showError()}
              {showLoading()}
              {showMessage()}
              {showForm && proForm()}
              {goBack()}
      </Layout>
    )
}

export default createProductFunc