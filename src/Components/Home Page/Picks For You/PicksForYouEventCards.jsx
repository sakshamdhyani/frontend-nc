import React from 'react'
import "./picksForYouEventCards.css"

const PicksForYouEventCards = ({img}) => {
  return (
    <div className='picksForYouEventCardsBody'>
        <img src={img} alt="" />
    </div>
  )
}

export default PicksForYouEventCards