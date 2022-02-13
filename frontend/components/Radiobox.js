import React, { useState } from 'react'

function Radiobox({prices=[], handleFilters}) {

    const [value, setValue] = useState(0);

    const handlePrice = (e) => {
        handleFilters(e.target.value)
        setValue(e.target.value)
    }


  return (
    <>
        {prices.map((price, ind)=>{
            return (
                <li key={ind} className='list-unstyled'>
                    <input
                        value={`${price._id}`} 
                        onChange={handlePrice} 
                        type="radio" 
                        name={price}
                        className='mr-2 ml-4' />
                    <label className='form-check-label'>{price.name}</label>
                </li>
            )
        })}
    </>
  )

}

export default Radiobox