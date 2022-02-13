import React, {useEffect, useState} from 'react'
import Router from 'next/router'
import Layout from "../../components/Layout"
import { getCookie, isAuth } from '../../Actions/authActions';
import {createCate} from "../../Actions/categoryActions"


function createCategory() {
    const [values, setValues] = useState({
        id:"",
        token:"",
        name:"",
        error:"",
        loading: false,
        message:"",
        showForm: true
    })
    
    const {id, token, name, error, loading, message, showForm} = values;
    // const token =
    
    useEffect(()=>{
        (!isAuth()) && Router.push("/")
        setValues({...values, id:isAuth()&&isAuth()._id, token:getCookie("token")})
    },[])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({...values, error:false, loading:true })

    
        createCate({name}, id, token)
        .then(data => {
            if (data.error) {
                setValues({...values, error:data.error, loading:false })
            } else {
                setValues({
                    ...values,
                    name:"",
                    error:"",
                    loading: false,
                    message:data.message,
                    showForm: true
                })
            }
        })
    }
    
    
    const handleChange = name => (e) => {
        setValues({...values, error:false,message:"", [name]:e.target.value})
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
    
    
    const cateForm = () => {
      return (
          <form onSubmit={handleSubmit}>
              <div className='form-group'>
                  <label className="text-muted">Category Name</label>
                  <input value={name} onChange={handleChange("name")} type="text" className='form-control' />
              </div>
              <div>
                  <button className='btn btn-outline-primary'>
                      Create Category
                  </button>
              </div>
          </form>
      )
    }
    
    return (
      <Layout title='Add New Category' description='Please! Use Following form to Add New Category' className='container col-md-8 offset-md-2'>
              {showError()}
              {showLoading()}
              {showMessage()}
              {showForm && cateForm()}
              {goBack()}
      </Layout>
    )
}

export default createCategory