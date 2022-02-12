import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Layout from "../Layout"
import {signup, isAuth} from "../../Actions/authActions"

function SignupComponent() {

    const [values, setValues] = useState({
      name:"",
      email:"",
      password:"",
      error:"",
      loading: false,
      message:"",
      showForm: true
  })

  const {name, email, password, error, loading, message, showForm} = values;

  useEffect(()=>{
      isAuth() && Router.push("/")
  },[])

  const handleSubmit = (e) => {
      e.preventDefault()
      console.table({name, email, password, error, loading, message, showForm});
      setValues({...values, error:false, loading:true })
      const user = {name, email, password};

      signup(user)
      // accountActivationSignup(user)
      .then(data => {
          if (data.error) {
              setValues({...values, error:data.error, loading:false })
          } else {
              setValues({
                  name:"",
                  email:"",
                  password:"",
                  error:"",
                  loading: false,
                  message:data.message,
                  showForm: true
              })
          }
      })
  }


  const handleChange = name => (e) => {
      setValues({...values, error:false, [name]:e.target.value})
  }

  const showLoading = () => (loading ? <div className='alert alert-info'> {loading} </div> : "")
  const showError = () => (error ? <div className='alert alert-danger'> {error} </div> : "")
  const showMessage = () => (message ? <div className='alert alert-info'> {message} Please <Link href={`/signin`} style={{fontWeight:"bold"}}> Signin </Link> </div> : "")
  const showButton = () => (<button className='btn btn-outline-danger mt-2' onClick={()=>{Router.push("/auth/password/forgot")}}> 
                                  Reset Password
                              </button>)


  const signupForm = () => {
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className="text-muted">Name</label>
                <input value={name} onChange={handleChange("name")} type="text" className='form-control' />
            </div>
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
                    Signup
                </button>
            </div>
        </form>
    )
}

  return (
    <Layout title='Signup' description='Please Signup! A FullStack E-Commerce App' className='container col-md-8 offset-md-2'>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
            {showButton()}
            {JSON.stringify(values)}
    </Layout>
  )
}

export default SignupComponent