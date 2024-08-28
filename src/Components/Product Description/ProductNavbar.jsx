import React, { useState, useEffect } from 'react';
import './productNavbar.css';
import { Link, Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import formatPrice from '../../utils/formatPrice';

const ProductNavbar = ({ product }) => {
  const [popupLogin, setPopupLogin] = useState(false);
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const goToHome = () => {
    window.history.go(-1);
    location.reload();
  };

  
  const [scrolled2, setScrolled2] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the window has scrolled beyond a certain threshold
        if (window.scrollY < 5000) {
            setScrolled2(true);
        } else {
            setScrolled2(false);
        }
    };
    window.addEventListener('scroll', handleScroll);
})

  return (
    <nav className='productNav-barBody'>
      <div className='productNavbarLeft'>
          <div className='productNav-bar'>
            <div className='productName'>
              <h1>{product?.name}</h1>              {/* product name */}
              <div className='productPriceDetails'>

                <p className='productPrice text-gray-500 line-through'>₹ 
                  {
                    formatPrice(product?.price?.$numberDecimal)
                  } 
                </p>

                <p className='productPrice'>₹ 
                  {
                    formatPrice(product?.cuttedPrice?.$numberDecimal)
                  } 
                </p>

                <p className='productDiscount'>
                  MRP (Incl. of all taxes)
                </p>
              </div>
            </div>
          </div>
            <div className='mid-productNavbar'>
              <ul className='productNavbar-btn'>
                <li>
                  <ScrollLink
                    className='productNavbtns'
                    to='featuresBody'
                    spy={true}
                    smooth={true}
                    offset={-178}
                    duration={200}
                    aria-label='Features'
                  >
                    Features
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    className='productNavbtns'
                    to='galleryBody'
                    spy={true}
                    smooth={true}
                    offset={-178}
                    duration={200}
                    onClick={() => setShowProfilePic(true)}
                    aria-label='Gallery'
                  >
                    Gallery
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    className='productNavbtns'
                    to='specsBody'
                    spy={true}
                    smooth={true}
                    offset={-178}
                    duration={200}
                    onClick={() => setShowProfilePic(false)}
                    aria-label='Specifications'
                  >
                    Specs
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    className='productNavbtns'
                    to='reviewsBody'
                    spy={true}
                    smooth={true}
                    offset={-178}
                    duration={200}
                    onClick={() => setShowProfilePic(false)}
                    aria-label='Reviews'
                  >
                    Reviews
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    className='productNavbtns'
                    to='supportBody'
                    spy={true}
                    smooth={true}
                    offset={-178}
                    duration={200}
                    onClick={() => setShowProfilePic(false)}
                    aria-label='Support'
                  >
                    Support
                  </ScrollLink>
                </li>
              </ul>
            </div>
        </div>

      <div className='rightProductNavbar'>
        <Link to={`/buy-product/${product._id}`} className='rightProductNavbarButton' aria-label='Buy Now'>
          Buy Now
        </Link>
      </div>

      <div className={scrolled2 ? 'bottomNavbar' : "bottomNavbarHidden"}>
              <div className='bottomNavbarLeft'>
                  <div className='bottomNavbarName'>
                      <p>{product?.name}</p>
                  </div>
                  <div className='bottomNavbarPrice'>
                      <p>Rs. {formatPrice(product?.price?.$numberDecimal)}</p>
                  </div>
              </div>
            <div className='bottomNavbarRight'>
                <Link to={`/buy-product/${product._id}`} className='rightProductNavbarButton' aria-label='Buy Now'>
                  Buy Now
                </Link>
            </div>
      </div>
    </nav>
  );
};

export default ProductNavbar;
