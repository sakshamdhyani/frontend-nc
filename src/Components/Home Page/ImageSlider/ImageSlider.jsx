import Carousel from 'react-bootstrap/Carousel';
import "./imageSlider.css"
import React from 'react';

function ImageSlider({slides}) {
  return (  

      <Carousel>

        {
          slides.map((image , key) => (
            <Carousel.Item key={key}>
              <img src={image} alt={key} />
            </Carousel.Item>
          ))
        }

      </Carousel>

  );
}

export default ImageSlider;