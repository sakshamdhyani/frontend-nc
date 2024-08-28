import React from 'react';
import './productSpecs.css';

const ProductSpecs = ({ product }) => {
  // Utility function to chunk array into pairs
  const chunkArray = (array, size) => {
    return array.reduce((chunks, item, index) => {
      if (index % size === 0) {
        chunks.push([item]);
      } else {
        chunks[chunks.length - 1].push(item);
      }
      return chunks;
    }, []);
  };


  // Chunking specifications into pairs
  const specsChunks = chunkArray(product?.specifications || [], 2);

  return (
    <div id='specsBody' className='productSpecsBody'>
    
      <div className='productSpecsHeading'>
        <p className='productSpecsTitle'>SUMMARY</p>
      </div>

      <div className='productSpecsPicsContainer'>
        {/* Displaying product description */}
        {product?.description}
      </div>

    {product?.specifications?.length > 0 && product?.specifications[0] !== null &&
      <div className='productSpecsKeySpecs'>
        <p className='productSpecsKeySpecsTitle'>Key Specs</p>

        <div className='productSpecsContainer'>

          {/* Mapping over chunked specifications */}
          {specsChunks.map((chunk, index) => (
            <div key={index} className='productSpecsContainerRow'>
              {chunk.map((spec, innerIndex) => (
                <div key={innerIndex} className='productSpecsContainerCol'>
                  <h3>{spec?.title}</h3>
                  <p>{spec?.description}</p>
                </div>
              ))}
            </div>
          ))}

        </div>

      </div>
    }

    </div>
  );
};

export default ProductSpecs;
