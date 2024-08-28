import React from 'react';
import './productFeatures.css';
import Rating from '@mui/material/Rating';

const ProductFeatures = ({ product }) => {

  return (
    <div id='featuresBody' className='productFeaturesBody'>
      <div className='productFeaturesHeading'>

        <div className='productFeaturesLeft'>

          {/* product name */}
          <h1 className='productFeaturesName'>{product?.name}</h1>

          {/* product ratings */}
          <div className='productFeaturesRating'>
            <Rating name='read-only' value={product?.ratings} readOnly />
            {" "}
            <span>{product?.rating || 0}</span>
            {" "}
            <span>({product?.reviews?.length})</span>
          </div>

          {/* highlights */}
          <div className='productFeaturesHighlights'>
            <p className="productFeaturesHighlightTitle">Key Features:</p>

            <ul className="ml-4">
              {product?.highlights?.map((feature , index) => (
                <li className="list-disc" key={index}>
                 {feature} 
                 </li>
              ))}
            </ul>
          </div>

        </div>

        <div className='productFeaturesRight'>
          <div className='productFeaturesImageParent'>
            <img
              className='productFeaturesImage'
              src={product?.themeImage?.url}
              alt={product?.name}
              loading='lazy'
            />
          </div>
        </div>
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Product",
          "name": product?.name,
          "image": product?.themeImage?.url,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product?.rating,
            "reviewCount": product?.reviews?.length
          }
        })}
      </script>
    </div>
  );
};

export default ProductFeatures;
