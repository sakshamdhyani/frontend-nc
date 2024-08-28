import React from 'react'
import "./mCard.css"

const MCard = ({name}) => {
  return (
    <div className='mCardBody'>
        <p>{name}</p>
    </div>
  )
}

export default MCard