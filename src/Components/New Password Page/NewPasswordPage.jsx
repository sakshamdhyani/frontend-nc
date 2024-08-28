import React from 'react'
import "./newPasswordPage.css"

const NewPasswordPage = () => {
  return (
    <div className='newPasswordPageBody'>
        <div className='newPassContent'>
            <div className='newPassContentRow'>
                <h1>New Password</h1>
                <input type="text" />
            </div>
            <div className='newPassContentRow'>
                <h1>Confirm Password</h1>
                <input type="text" />
            </div>
        </div>
    </div>
  )
}

export default NewPasswordPage