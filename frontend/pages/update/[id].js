import React, {useEffect, useState} from 'react'
import Router, { withRouter } from 'next/router'
import Layout from "../../components/Layout"
import { getCookie, isAuth } from '../../Actions/authActions';
import {updateProduct, getSingleProduct} from "../../Actions/productActions"
import {getAllCategories} from "../../Actions/categoryActions"
import axios from 'axios';


function ProductUpdate({prod}) {
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState({
        id:"",  // this is user id
        _id:"", // this is product id
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
        showForm: true,
        ...prod
    })
    const [photoPath, setPhotoPath] = useState(prod.photoPath);
    
    const {_id, id, name, description, price, token, category, shipping, quantity, error, loading, message, showForm} = values;
    
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
        console.log(values)
        e.preventDefault()
        setValues({...values, error:false, loading:true })

        let pro = {name, description, price, category, shipping, quantity, photoPath};
        // console.log(pro)

        updateProduct(pro, id, _id, token)
        .then(data => {
            if (data.error) {
                setValues({...values, error:data.error, loading:false })
            } else {
                setValues({
                    ...data
                })
            }
        })
    }
    
    
    const handleChange = name => (e) => {
        setValues({...values,[name]:e.target.value}) 
        //  error:false, message:"", 
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
                      Update Product
                  </button>
              </div>
          </form>
      )
    }
    
    return (
      <Layout title='Update Product' 
        description='Please! Use Following form to Update Product' 
        className='container col-md-8 offset-md-2'>
              {showError()}
              {showLoading()}
              {showMessage()}
              {showForm && proForm()}
              {goBack()}
      </Layout>
    )
}



ProductUpdate.getInitialProps = ({query}) => {

    return getSingleProduct(query.id)
        .then((data)=>{
            if (data.error) {
                console.log(data.error);
            }
            return {
                prod:data
            }
        })
}

export default withRouter(ProductUpdate)