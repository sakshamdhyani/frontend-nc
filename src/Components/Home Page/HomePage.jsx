import React, { useEffect, useState } from 'react';
import "./homePage.css";
import ImageSlider from './ImageSlider/ImageSlider';
import NeedHelp from './Need Help/NeedHelp';
import PicksForYou from './Picks For You/PicksForYou';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeals, fetchHomeCarousel } from '../../redux/slices/dataFetch';
import MetaData from '../Layouts/MetaData';
import { Helmet } from 'react-helmet';
import BigLoader from '../Loader/BigLoader';
import Categories from './Categories/Categories';
import Location from './Location';

const HomePage = () => {
  const [slideImages, setSlideImages] = useState([]);
  const dispatch = useDispatch();
  const { heroCarousel , loading } = useSelector((state) => state.dataFetch);
  const { isAuth } = useSelector((state) => state.userAuth);

  // Default images to use if heroCarousel images are not available
  const defaultImages = [
    'default home slider/AC1.jpeg',
    'default home slider/AC2.jpeg',
    'default home slider/AC3.jpeg',
    'default home slider/AC4.jpeg'
  ];

  // Fetch home carousel and deals when the component mounts
  useEffect(() => {
    dispatch(fetchHomeCarousel());
    dispatch(fetchDeals());
  }, [dispatch]);

  // Update slideImages state when heroCarousel data changes
  useEffect(() => {
    if (heroCarousel && heroCarousel.images && heroCarousel.images.length > 0) {
      const imagesArray = heroCarousel.images.map(image => image.url);
      setSlideImages(imagesArray);
    } else {
      setSlideImages(defaultImages);
    }
  }, [heroCarousel]);

  return (
    loading ? <BigLoader/> : 
    <div className='homePageBody'>
      {/* Setting the page title using MetaData component */}
      <MetaData title="Home - Nand Computers | Best Electronics Deals" />

      {/* Additional meta tags for SEO */}
      <Helmet>
        <meta name="description" content="Welcome to Nand Computers, your go-to destination for top-rated electronics including TVs, computers, fridges, and more. Discover unbeatable deals on the latest tech." />
        <meta name="keywords" content="electronics, TVs, computers, fridges, Nand Computers, best electronics deals" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nand Computers" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Nand Computers",
              "description": "Your go-to destination for top-rated electronics including TVs, computers, fridges, and more.",
              "url": "https://www.nandcomputers.com",
              "logo": "https://www.nandcomputers.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/nandcomputers",
                "https://www.instagram.com/nandcomputers"
              ],
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.nandcomputers.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>

      {/* Image slider for displaying carousel images */}
      <ImageSlider slides={slideImages} />

      <div className='homePagePaddingBody'>
        {/* Categories section */}
        <section aria-labelledby="categories-section">
          <h2 id="categories-section" className="visually-hidden">Product Categories</h2>
          <Categories />
        </section>

        {/* Picks for the user */}
        <section aria-labelledby="picks-for-you-section">
          <h2 id="picks-for-you-section" className="visually-hidden">Picks For You</h2>
          <PicksForYou />
        </section>

        {/* Map location */}
        <section aria-labelledby="location-section">
          <h2 id="location-section" className="visually-hidden">Our Location</h2>
          <Location />
        </section>

        {/* Need help section */}
        <section aria-labelledby="need-help-section">
          <h2 id="need-help-section" className="visually-hidden">Need Help</h2>
          <NeedHelp />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
