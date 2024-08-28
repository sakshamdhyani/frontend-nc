import React from 'react'
import "./searchCard.css"
import { Link } from 'react-router-dom'
import formatPrice from '../../utils/formatPrice'

const SearchCard = ({product}) => {
  
  return (
    <Link to={`/learn-more-product/${product._id}`} className = "searchCardBody">

        <div className='searchCardLeft'>
            <img className='searchCardImage' src={product?.themeImage?.url} alt="" />
        </div>
        <div className='searchCardRight'>
            <h1>{product?.name}</h1>
            <p className='flex gap-4'>
              <span className='text-gray-600 line-through'> Rs. {formatPrice(product?.price.$numberDecimal)} </span>
              <span> Rs. {formatPrice(product?.cuttedPrice.$numberDecimal)} </span>
            </p>
        </div>
    </Link>
  )
}

export default SearchCard