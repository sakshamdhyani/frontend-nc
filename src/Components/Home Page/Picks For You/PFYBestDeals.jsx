import React from 'react'
import ProductCard from '../../Product Description/ProductCard'

const PFYBestDeals = ({products}) => {

  const product = {
    _id: "12345",
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless Bluetooth headphones with noise cancellation and 20-hour battery life.",
    themeImage: {
      url: "/computing1.png"
    },
    cuttedPrice: {
      $numberDecimal: "4999.99"
    },
    rating: 4.5,
    reviewsCount: 29062
  };

  return (
    <div initial={{opacity:0}} animate={{opacity:1}} transition={{staggerChildren : 5}} className='picksForYouProductsBodyChild'>
        {
          products?.map((product, idx) => {
                return <ProductCard key={idx} product={product} />
            })
        }
    </div>
  )
}

export default PFYBestDeals