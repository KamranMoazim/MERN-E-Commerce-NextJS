import React from 'react'

function ShowImage({url, name}) {
  return (
    <div className='product-img'>
        <img
            src={url}
            alt={name}
            className="mb-3"
            style={{maxHeight:"100%", maxWidth:"100%"}}
        />
    </div>
  )
}

export default ShowImage