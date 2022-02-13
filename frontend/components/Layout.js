import React from 'react'

import Header from "./Header"

function Layout({title="",description="", className="", children}) {
  return (
    <div>
        <Header />
        <div className="jumbotron">
          <h2>{title}</h2>
          <p className='lead'>{description}...</p>
        </div>
        <div className={className}>
          {children}
        </div>
    </div>
  )
}

export default Layout