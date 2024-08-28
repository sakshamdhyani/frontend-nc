import React, { useEffect } from 'react';
import './productPage.css';
import ProductNavbar from './ProductNavbar';
import ProductFeatures from './ProductFeatures';
import ProductGallery from './ProductGallery';
import ProductSpecs from './ProductSpecs';
import ProductReviews from './ProductReviews';
import PSupport from './PSupport';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productDetails } from '../../redux/slices/dataFetch';
import Loader from '../Loader/Loader';
import BigLoader from '../Loader/BigLoader';
import MetaData from '../Layouts/MetaData'; // Import MetaData component

const ProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { product, loading } = useSelector((state) => state.dataFetch);

  useEffect(() => {
    dispatch(productDetails(params.id));
  }, [dispatch, params]);

  if (loading) {
    return <BigLoader />;
  }

  return (
    <div className='productPageBody'>
      <MetaData title={product.name} description={product.description} /> {/* MetaData component */}
      <ProductNavbar product={product} />
      <ProductFeatures product={product} />
      <ProductGallery product={product} />
      <ProductSpecs product={product} />
      <ProductReviews product={product} />
      {/* <PWhereToBuy /> */}
      <PSupport />
    </div>
  );
};

export default ProductPage;
