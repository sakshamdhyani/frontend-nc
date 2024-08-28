import React from 'react'
import "./pRHowItWorksCard.css"

const PRHowItWorksCard = ({pRHeading, pRSubHeading, pRLogo}) => {
  return (
    <div className='pRHowItWorksCardBody'>
        <div className='pRHowItWorksCardTop'>
            <div className='pRHowItWorksCardContent'>
                <h1 className='pRHowItWorksCardContenth1'>{pRHeading}</h1>
                <h2 className='pRHowItWorksCardContenth2'>{pRSubHeading}</h2>
            </div>
            <div className='pRHowItWorksCardLogo'>
                <p>    
                    {pRLogo}
                </p>
            </div>
        </div>
    </div>
  )
}

export default PRHowItWorksCard