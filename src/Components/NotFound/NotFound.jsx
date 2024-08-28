import React from 'react';
import "./NotFound.css";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='notFoundContainer'>
      <div className='notFoundTextContainer'>
        <p className='oopsText'>Oops!</p>
        <p className='text404'>404 - PAGE NOT FOUND</p>
        <p className='message404'>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <Link to={"/"} className='homeBtn'>GO TO HOMEPAGE</Link>
      </div>
    </div>
  );
};

export default NotFound;
