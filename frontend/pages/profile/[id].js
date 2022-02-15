import React, {useEffect, useState} from 'react';
import Router,{withRouter} from "next/router"
import moment from "moment"
import Layout from "../../components/Layout"
import {getUser, updateUser} from "../../Actions/userActions"
import { getCookie } from '../../Actions/authActions';


function UpdateProfile({user}) {

  // console.log(user)

  const [data, setData] = useState(user)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const {name, email, password} = data

  const handleChange = (name) => (e) => {
    setData({...data, [name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(data)
    updateUser(data._id, data, getCookie("token"))
      .then((res)=>{
        console.log(res)
        if (res.error) {
          setError(res.error)
          setSuccess(false)
        } else {
          setError(false)
          setSuccess(true)
          // setData()
          
        }
      })
  }

  const showError = () => (error ? <div className='alert alert-danger'> {error} </div> : "")
  const showSuccess = () => (success ? <div className='alert alert-info'> "Profile Updated Successfully!" </div> : "")

  const profileUpdateForm = () => (  // name, email, password
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input type="text" onChange={handleChange("name")} value={name} className="form-control" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" onChange={handleChange("email")} value={email} className="form-control" />
      </div>
      <div className="form-group">
        <label>Passwrod</label>
        <input type="password" onChange={handleChange("password")} value={password} className="form-control" />
      </div>
      <div className="form-group">
        <button className='btn btn-primary'>
          Update Profile
        </button>
      </div>
    </form>
  )

  return (
    <Layout title='Profile Update' description='Update your Profile hrer!' className='container'>
      {showError()}
      {showSuccess()}
      {profileUpdateForm()}
      <button className='btn btn-outline-warning' onClick={()=>Router.push("/dashboard")}>
        Go To Dashboard
      </button>
    </Layout>
  )
}


UpdateProfile.getInitialProps = async ({req, query}) => {


  return await getUser(query.id, req.cookies.token)
          .then((data)=>{
              if (data.error) {
                  console.log(data.error);
              }
              // console.log(data);
              return {
                  user: data
              }
          })
}

export default withRouter(UpdateProfile)