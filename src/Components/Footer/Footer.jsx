import React from 'react';
import "./footer.css";
import { CiGlobe } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiYoutubeLine } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Footer = () => {
  return (
    <div className='footerBody'>
      <div className='footerCategoriesBody'>

        <div className='footerCategoryColumn'>
          <Link to={"/"}>
            <img src="/logo.png" className='w-44 mt-4' alt="" />
          </Link>
          <h1>Address</h1>
            <p className='text-sm'>
              Lakhan More, 
              Main Road Daudnagar 
              District :Aurangabad 
              Bihar 
              pin : 824143
            </p>
        </div>

        <div className='footerCategoryColumn'>
          <h1>Categories</h1>
          <ul>
            <li> <Link to={"/category/66cc02c86736f377d92336cf"}> Television </Link> </li>
            <li> <Link to={"/category/66cc07f56736f377d92336e3"}>Computers</Link></li>
            <li> <Link to={"/category/66cc09a16736f377d9233714"}>Mobile</Link> </li>
            <li> <Link to={"/category/66cc0ad76736f377d923373f"}>Accessories</Link></li>

          </ul>
        </div>

        <div className='footerCategoryColumn'>
          <h1>Policies</h1>
          <ul>
            {/* <li><Link to={"/privacy-policy"}>Privacy Policy</Link></li>
            <li><Link to={"/refund-policy"}>Refund Policy</Link></li>
            <li><Link to={"/shipping-refund-policy"}>Shipping & Return Policy</Link></li> */}
          </ul>
        </div>


        <div className='footerCategoryColumn'>
          <h1>About</h1>
          <ul>
            {/* <li><Link to={"/media-gallery"}>Press & Media</Link></li>
            <li><Link to={"/about-us"}>About Us</Link></li>
            <li onClick={() => toast.success("Coming Soon")} >Careers</li>
            <li> 
              <a href="/brochure.pdf" download className="brochureLink">Download Brochure</a>
            </li> */}
          </ul>
        </div>

        <div className='footerCategoryColumn'>
          <h1>Product Support</h1>
          <ul>
            <li><Link to={"/contact-us"}>Contact Us</Link></li>
            {/* <li><Link to={"/manuals"}>Manuals</Link></li>
            <li><Link to={"/complaint-registration"}>Register complaint</Link></li>
            <li><Link to={"/repair-request"}>Register Request</Link></li> */}
            <li> <a href="https://wa.me/+919973605751" target='_blank' >Whatsapp</a> </li>
            <li> <a href="tel:+919973605751" target='_blank' >Call Us : +91 9973605751 </a> </li>
          </ul>
        </div>
        
      </div>


      <div className='footerEnding'>
        <div className='footerEndingCopyright'>
          <p>Copyright © 2009-2024 Moseta Electronics. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
