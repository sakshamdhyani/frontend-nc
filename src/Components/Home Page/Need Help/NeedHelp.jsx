import React from 'react';
import "./needHelp.css";
import NeedHelpCard from './NeedHelpCard';
import { CiCirclePlus } from "react-icons/ci";
import { TbAirConditioning } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { FaWrench } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";

const NeedHelp = () => {

    const routes = [
        {
            heading: "Contact Us",
            subHeading: "Chat with Moseta Product Experts for shopping assistance, discounts, and offers.",
            route: "/contact-us",
            logo: <FaRegMessage />
        },
        {
            heading: "Whatsapp",
            subHeading: "Chat with Moseta Service Support using the most popular messenger on +91 9204906311.",
            route: "https://wa.me/+919204906311",
            external: true,
            logo: <FaWhatsapp />,
            contactInfo: "WhatsApp: +91 9204906311"
        },
        {
            heading: "Email Us",
            subHeading: "Send an email to Moseta Service Support at nandcomputers@gmail.com.",
            route: "mailto:nandcomputers@gmail.com",
            external: true,
            logo: <MdOutlineEmail />,
            contactInfo: "Email: nandcomputers@gmail.com"
        },
        {
            heading: "Call Us",
            subHeading: "Contact Moseta support 24/7 (excluding national holidays) at +91 9204906311.",
            route: "tel:+919204906311",
            external: true,
            logo: <IoCallOutline />,
            contactInfo: "Phone: +91 9204906311"
        }
    ];

    return (
        <div className='needHelpBody'>
            <div className='needHelpHeading'>
                <p className='homePageTitles'>Need Help?</p>
                <div className='needHelpSlideBtns'>
                    {/* <button className='needHelpSignIn'>Get Support</button> */}
                    {/* <button className='needHelpJoinUs'>Join Us</button> */}
                </div>
            </div>
            <p className='needHelpSubHeading'>We're here to provide all the help you need.</p>

            <div className='needHelpOfferCardsParent'>
                {
                    routes.map((ele, idx) => (
                        <NeedHelpCard 
                            path={ele.route} 
                            key={idx} 
                            heading={ele.heading} 
                            subHeading={ele.subHeading} 
                            logo={ele.logo} 
                            external={ele.external || false}
                            contactInfo={ele.contactInfo} // Pass contact information to NeedHelpCard
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default NeedHelp;
