import React from 'react'
import "./searchPageCard.css"

const SearchPageCard = () => {
  return (
    <div className='searchPageCardBody'>
        <div className='searchPageCardLeft'>
            <img className='searchPageCardImage' src="/productImage.jpg" alt="" />
        </div>
        <div className='searchPageCardMid'>
            <h1>Name</h1>
            <p>Rs.100000</p>
        </div>
        <div className='searchPageCardRight'>
            <button className='searchPageCardLearnMore'>Learn More</button>
            <button className='searchPageCardBuyNow'>Buy Now</button>
        </div>
    </div>
  )
}

export default SearchPageCard