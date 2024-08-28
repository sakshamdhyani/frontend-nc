import React, { useRef, useState, useEffect } from 'react';
import "./Categories.css";
import CategoryCard from './CategoryCard';
import { useSelector } from 'react-redux';

const Categories = () => {
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const {categories} = useSelector((state) => state.dataFetch);
  // console.log(categories)

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setIsOverflowing(scrollWidth > clientWidth);
      }
    };
    
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -containerRef.current.clientWidth / 2,
        behavior: 'smooth'
      });
      setScrollPosition(containerRef.current.scrollLeft - containerRef.current.clientWidth / 2);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.clientWidth / 2,
        behavior: 'smooth'
      });
      setScrollPosition(containerRef.current.scrollLeft + containerRef.current.clientWidth / 2);
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  return (
    <div className='categoriesContainer'>
      <h2 className='homePageTitles'>Start Shopping</h2>

      <div className='categoryCardsWrapper'>

        <div 
          className='categoryCardsContainer' 
          ref={containerRef}
          onScroll={handleScroll}
        >
          {
            categories?.map((category , idx) => (
              <CategoryCard key={idx} category={category} />
            ))
          }

        </div>


        {isOverflowing && (
          <div className='scrollButtons'>
            <button 
              className={`scrollButton left ${scrollPosition <= 0 ? 'inactive' : ''}`} 
              onClick={scrollLeft}
              disabled={scrollPosition <= 0}
            >
              &#9664;
            </button>
            <button 
              className={`scrollButton right ${containerRef.current && scrollPosition + containerRef.current.clientWidth >= containerRef.current.scrollWidth ? 'inactive' : ''}`} 
              onClick={scrollRight}
              disabled={containerRef.current && scrollPosition + containerRef.current.clientWidth >= containerRef.current.scrollWidth}
            >
              &#9654;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
