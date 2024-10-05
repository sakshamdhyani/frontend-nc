import React, { useRef, useEffect, useState } from 'react';
import "./Categories.css";
import CategoryCard from './CategoryCard';
import { useSelector } from 'react-redux';

const Categories = () => {
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  
  const {categories} = useSelector((state) => state.dataFetch);

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

  return (
    <div className='categoriesContainer'>
      <h2 className='homePageTitles'>Start Shopping</h2>
      
      <div className='categoryCardsContainer' ref={containerRef}>
        {categories?.map((category, idx) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
