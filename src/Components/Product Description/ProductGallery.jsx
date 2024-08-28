import React, { useEffect, useState } from 'react';
import './productGallery.css';
import EmblaCarousel from './EmblaCarousel';

const ProductGallery = ({ product }) => {
  const [slideImages, setSlideImages] = useState([]);

  // setting carousel images
  useEffect(() => {
    if (product) {
      if (product.otherImages && product.otherImages.length > 0) {
        // Extract image URLs from otherImages array
        const imagesArray = product.otherImages.map(image => image.url);
        setSlideImages(imagesArray);
      } else if (product.themeImage) {
        // Use themeImage if otherImages are not available
        setSlideImages([product.themeImage.url]);
      }
    }
  }, [product]);

  const OPTIONS = {};

  return (
    <div id='galleryBody' className='productGalleryBody'>
      <div className='productGalleryHeading'>
        <p className='productGalleryTitle'>Gallery</p>
      </div>

      <div className='productGalleryPicsContainer'>
        <EmblaCarousel slides={slideImages} options={OPTIONS} />
      </div>
    </div>
  );
};

export default ProductGallery;
