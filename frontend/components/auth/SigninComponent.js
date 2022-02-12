import React, {useEffect, useState} from 'react'
import Router from 'next/router'
import Layout from "../Layout"
import {signin, authenticate, isAuth} from "../../Actions/authActions"

function SigninComponent() {
  const [values, setValues] = useState({
    email:"",
    password:"",
    error:"",
    loading: false,
    message:"",
    showForm: true
})

const {email, password, error, loading, message, showForm} = values;

useEffect(()=>{
    isAuth() && Router.push("/")
},[])

const handleSubmit = (e) => {
    e.preventDefault()
    console.table({ email, password, error, loading, message, showForm});
    setValues({...values, error:false, loading:true })
    const user = { email, password};

    signin(user)
    // accountActivationSignup(user)
    .then(data => {
        if (data.error) {
            setValues({...values, error:data.error, loading:false })
        } else {
            authenticate(data, ()=>{
                setValues({
                    email:"",
                    password:"",
                    error:"",
                    loading: false,
                    message:data.message,
                    showForm: true
                })
                Router.push("/")
            })
        }
    })
}


const handleChange = name => (e) => {
    setValues({...values, error:false, [name]:e.target.value})
}

const showLoading = () => (loading ? <div className='alert alert-info'> {loading} </div> : "")
const showError = () => (error ? <div className='alert alert-danger'> {error} </div> : "")
const showMessage = () => (message ? <div className='alert alert-info'> {message} </div> : "")
const showButton = () => (<button className='btn btn-outline-danger mt-2' onClick={()=>{Router.push("/auth/password/forgot")}}> 
                                Reset Password
                            </button>)


const signupForm = () => {
  return (
      <form onSubmit={handleSubmit}>
          <div className='form-group'>
              <label className="text-muted">Email</label>
              <input value={email} onChange={handleChange("email")} type="email" className='form-control' />
          </div>
          <div className='form-group'>
              <label className="text-muted">Password</label>
              <input value={password} onChange={handleChange("password")} type="password" className='form-control' />
          </div>
          <div>
              <button className='btn btn-primary'>
                  Signin
              </button>
          </div>
      </form>
  )
}

return (
  <Layout title='Signin' description='Please Signin! A FullStack E-Commerce App' className='container col-md-8 offset-md-2'>
          {showError()}
          {showLoading()}
          {showMessage()}
          {showForm && signupForm()}
          {showButton()}
          {JSON.stringify(values)}
  </Layout>
)
}

export default SigninComponent