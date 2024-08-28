import React from 'react'
import "./productRegistrationPage.css"
import PRWhyRegisterCard from './PRWhyRegisterCard'
import PRHowItWorksCard from './PRHowItWorksCard'
import { RiQrScan2Line } from "react-icons/ri";
import { CgScan } from "react-icons/cg";
import { GoPencil } from "react-icons/go";
import { IoGiftOutline } from "react-icons/io5";


const ProductRegistrationPage = () => {

    const pRHeading = ["Sign In", "Enter Your Model", "Fill In Your Info", "Enjoy Your Benefits"]

    const pRSubHeading = ["You need to sign in for product registration.", "If you have a ThinQ product, you can select the product automatically.", "Expedited support and service on questions and issues.", "You can find registered product at MyLG page."]

    const pRLogo = [<RiQrScan2Line/>, <CgScan/> , <GoPencil/>, <IoGiftOutline/>]

  return (
    <div className='productRegistrationPageBody'>
        <div className='productRegistrationPageHeading'>
            <p className='productRegistrationTitle'>
                Product Registration
                <div className='productRegistrationSubTitle'>If you are a member, we can provide help depending on your product, sign in to find out more.</div>
            </p>

            <p className='productRegistrationRegister'>Register As A Member</p>
        </div>

        <div className='productRegistrationWhyRegister'>
            <div className='productRegistrationWhyRegisterHeading'>
                <p className='productRegistrationWhyRegisterTitle'>Why Register</p>
            </div>

            <div className='productRegistrationWhyRegisterCards'>
                <div className='productRegistrationWhyRegisterCard'>
                    <PRWhyRegisterCard/>
                    <h1>Warranty information</h1>
                    <h2>Verify ownership to get efficient warranty service.</h2>
                </div>
                <div className='productRegistrationWhyRegisterCard'>
                    <PRWhyRegisterCard/>
                    <h1>Product tips</h1>
                    <h2>Get informed product maintenance, important updates, and useful tips.</h2>
                </div>
                <div className='productRegistrationWhyRegisterCard'>
                    <PRWhyRegisterCard/>
                    <h1>Support & Service</h1>
                    <h2>Support and services on your issues.</h2>
                </div>
                <div className='productRegistrationWhyRegisterCard'>
                    <PRWhyRegisterCard/>
                    <h1>Exclusive promotion</h1>
                    <h2>Receive notice on new launches, special offers, contests, and more.</h2>
                </div>
            </div>
        </div>


        <div className='productRegistrationHowItWorks'>
            
            <div className='productRegistrationHowItWorksHeading'>
                <p className='productRegistrationHowItWorksTitle'>How It Works</p>
            </div>

            <div className='productRegistrationHowItWorksCards'>
                <div className='productRegistrationHowItWorksCard'>
                    {
                        pRHeading.map((ele, idx) => {
                            return <PRHowItWorksCard pRHeading={pRHeading[idx]} pRSubHeading={pRSubHeading[idx]} pRLogo={pRLogo[idx]}/>
                        })
                    }
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ProductRegistrationPage