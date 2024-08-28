import React from 'react';
import './productList.css';
import ProductCard from '../Product Description/ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="productList">
      <div className='productListContainer'>
        {products?.map((product, index) => (
          <div className='mb-4' key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
