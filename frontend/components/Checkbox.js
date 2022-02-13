import React, { useState } from 'react'

function Checkbox({categories=[], handleFilters}) {

    const [checked, setChecked] = useState([]);

    const handleCategories = (id) => {
        // return the first index or -1
        const clickedCategoryTemp = checked.indexOf(id);
        const all = [...checked];
        if (clickedCategoryTemp === -1) {
          all.push(id)
        } else {
          all.splice(clickedCategoryTemp, 1)
        }
        setChecked(all);
        handleFilters(all)
    }


    // console.log(checked)

  return (
    <>
        {categories.map((cate, ind)=>{
            return (
                <li key={ind} className='list-unstyled'>
                    <input onChange={()=>handleCategories(cate._id)} type="checkbox" className='form-check-input' />
                    <label className='form-check-label'>{cate.name}</label>
                </li>
            )
        })}
    </>
  )
}

export default Checkbox