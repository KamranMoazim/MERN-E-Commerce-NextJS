import React, {useEffect, useState} from 'react';
import Head from "next/head"
import {withRouter} from "next/router"

import Link from "next/link"
import moment from "moment"
import Layout from "../../components/Layout"
import {userProfile} from "../../actions/user"


function UpdateProfile() {
  return (
    <div>UpdateProfile</div>
  )
}


UserProfile.getInitialProps = ({query}) => {

  return userProfile(query._id)
      .then((data)=>{
          if (data.error) {
              console.log(data.error);
          }
          // console.log(data);
          return {
              user: data.user[0],
              blogs: data.blogs
          }
      })
}

export default UpdateProfile