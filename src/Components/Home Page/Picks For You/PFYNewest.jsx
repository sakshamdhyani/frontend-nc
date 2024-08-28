import React from 'react'
import ProductCard from '../../Product Description/ProductCard'


const PFYNewest = ({products}) => {

  return (
    <div className='picksForYouProductsBodyChild'>
        {
          products?.map((product, idx) => {
                return <ProductCard product={product} key={idx} />
            })
        }
    </div>
  )
}

export default PFYNewest