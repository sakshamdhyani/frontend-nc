import React from 'react'
import "./forgetPassPopup.css"

const ForgetPassPopup = ({forgetPassPopup, setForgetPassPopup}) => {
  return (
    <div className='forgetPassPopupBody'>
        <div className='forgetPassContainer'>
            <div className='forgetPassCloseBtnParent'>
                <p className='forgetPassCloseBtn' onClick={()=>setForgetPassPopup(false)}>X</p>
            </div>
            <div className='forgetPassContent'>
                {/* <h2>()</h2> */}
                <div>
                    <div className='forgetPassContentRow'>
                        <div className='forgetPassHeading'>
                            <h1>Enter Your Registered E-mail</h1>
                        </div>
                        <input required type="mail" />
                    </div>
                </div>
                <div className='forgetPassSubmitParent'>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassPopup