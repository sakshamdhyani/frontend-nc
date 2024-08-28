import React from 'react'
import "./CategoryCard.css"
import { Link } from 'react-router-dom'

const CategoryCard = ({category}) => {

  return (

    <Link to={`/category/${category._id}`} className='categoryCard'>
        
        <div className='imgDiv'>
          <img src={category?.images[0]?.secureUrl} alt="" />
        </div>

        <h2>{category?.name || "NA"}</h2>

    </Link>

  )
}

export default CategoryCard