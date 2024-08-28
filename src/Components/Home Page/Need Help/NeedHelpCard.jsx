import React from 'react';
import "./needHelpCard.css";
import { TfiArrowRight } from "react-icons/tfi";
import { Link } from 'react-router-dom';

const NeedHelpCard = ({ heading, subHeading, logo, path, external }) => {
  const handleClick = (e) => {
    if (external) {
      // If external link, prevent default behavior (to avoid navigating away from the app)
      e.preventDefault();
      // Open link in a new window/tab
      window.open(path, '_blank');
    }
    // Internal links handled by <Link> from react-router-dom naturally
  };

  return (
    external ? (
      <a href={path} className='needHelpCardBody' target='_blank' rel='noopener noreferrer' onClick={handleClick}>
        <div className='needHelpCardTop'>
          <div className='needHelpCardContent'>
            <h1>{heading}</h1>
            <h2>{subHeading}</h2>
          </div>
          <div className='needHelpCardLogo'>
            <p>{logo}</p>
          </div>
        </div>
        <div className='needHelpCardBottom'>
          <p className='needHelpCardBottomArrow'><TfiArrowRight /></p>
        </div>
      </a>
    ) : (
      <Link to={path} className='needHelpCardBody'>
        <div className='needHelpCardTop'>
          <div className='needHelpCardContent'>
            <h1>{heading}</h1>
            <h2>{subHeading}</h2>
          </div>
          <div className='needHelpCardLogo'>
            <p>{logo}</p>
          </div>
        </div>
        <div className='needHelpCardBottom'>
          <p className='needHelpCardBottomArrow'><TfiArrowRight /></p>
        </div>
      </Link>
    )
  );
}

export default NeedHelpCard;
