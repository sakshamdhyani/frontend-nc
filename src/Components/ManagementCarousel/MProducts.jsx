import React from 'react'
// import ProductCard from '../../Product Description/ProductCard'
import MCard from './MCard'


const MProducts = ({products}) => {

  return (
    <div className='managementProductsBodyChild'>
        {
          products?.map((product, idx) => {
                return <MCard name={idx} />
            })
        }
    </div>
  )
}

export default MProducts