import React, { useState } from 'react';
import "./AboutUs.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MetaData from '../Layouts/MetaData';
import AboutUsCarousel from './AboutUsCarousel';

const AboutUs = () => {
  const imgs = ['/management/js.jpeg', '/management/sm.jpeg', '/management/sarikamam.jpeg' , "/management/yogesh.jpeg" , "/management/vivek.jpeg" , "/management/ss.jpeg"];
  
  const details = [
    {
      name: "J.S. Prasad",
      position: "CEO & Co. Founder",
      experience: "15 years",
      description: "",
    },

    {
      name: "Mr. Sanjay Marwah",
      position: "Joint Director",
      experience: "32 years",
      description: "Mr. Sanjay Marwah has extensive experience spanning 32 years as a business head in various companies. He has served as Vice President at Su-Kam, Director at GEM Batteries Private Limited, and Vice President at Genus Power Infrastructures Ltd. Additionally, he has been a business consultant for Massimo Batteries and Dixon Batteries in Hyderabad.",
    },

    {
      name: "Sarika",
      position: "Additional Director",
      experience: "7 years",
      description: "With a diverse professional background spanning multiple domains, I've excelled as an SME at Shine.com, fostered global client relations as a CRM Manager, and managed healthcare operations at Ujala Cygnus Bright Star Hospital in Uttar Pradesh."
    },
    {
      name: "Yogesh Kulkarni",
      position: "Additional Director",
      experience: "24 years",
      description: "Mr Yogesh Kulkarni is a seasoned executive over 24 years of experience in Sales, Marketing, and Business Development across Manufacturing, Telecom, FMCG, and Cable & Wires industries, wealth of expertise in driving growth and profitability. His career spans successful leadership roles in both B2B and B2C environments as Business head, where he has consistently delivered strategic initiatives that optimize market positioning and enhance revenue streams last 2 decades in India and some outside projects too."
    },
    {
      name: "Er. Vivek Kumar",
      position: "Marketing & Admin Head",
      experience: "10 years",
      description: "Er. Vivek Kumar has a decade of experience in the industry, serving as the Marketing and Admin Head. He holds a B.Tech in Electronics & Communication Engineering and has further enhanced his expertise with a certification in Digital Marketing."
    },
    {
      name: "Mr. Sanjay Sha",
      position: "Technical V.P",
      experience: "25 years",
      description: ""
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    setActiveIdx((prevIdx) => (prevIdx - 1 + imgs.length) % imgs.length);
  };

  const handleNext = () => {
    setActiveIdx((prevIdx) => (prevIdx + 1) % imgs.length);
  };

  return (
    <div className='managementBody'>
      <MetaData
        title="About Us - Moseta"
        description="Meet the management team at Moseta, including Mr. Sanjay Marwah, J.S. Prasad, and Sarika. Learn about their extensive experience and contributions to Moseta's success."
      />

      <h1 className='pageHeading'>About Us</h1>

      <div className='aboutUsContainer'>
        <div className='carouselContainer'>
          <AboutUsCarousel />
        </div>

        <div className='aboutPointsContainer' id="bulletPointsContainer">
          <ul className="bulletPoints">
            <li><strong>Company Overview</strong></li>
            <li className='list-disc'>At Oxyneuron India Pvt Ltd, we are a team of passionate and dedicated hard-core technical professionals.</li>
            <li className='list-disc'>We believe in challenging the status quo, pushing boundaries, and driving innovation in the field of renewable technology.</li>
            
            <li><strong>Management Team</strong></li>
            <li className='list-disc'>Our management team consists of experienced individuals from the esteemed R&D teams of well-known companies such as Luminous, Sukam, and Kodak.</li>
            <li className='list-disc'>We have talented members who are alumni of renowned institutions like the Indian Institute of Management (IIM).</li>
            <li className='list-disc'>Their extensive industry knowledge and expertise form the backbone of our operations, ensuring the highest standards of quality and excellence.</li>
            
            <li><strong>Commitment to Innovation and Sustainability</strong></li>
            <li className='list-disc'>What sets us apart is our unwavering commitment to innovation and sustainability.</li>
            <li className='list-disc'>We strive to create products and solutions that not only meet market demands but also have a positive impact on the environment.</li>
            <li className='list-disc'>By harnessing the power of solar energy, we aim to contribute to a greener and more sustainable future.</li>
            
            <li><strong>Business Model and Vision</strong></li>
            <li className='list-disc'>As a self-capital-based business, we have full control over our operations and decision-making process.</li>
            <li className='list-disc'>This allows us to pursue our long-term vision without compromising on our core values.</li>
            <li className='list-disc'>We prioritize initiatives that promote environmental consciousness, carbon rating, and the adoption of solar energy in various consumer electronics and refrigeration systems.</li>
            
            <li><strong>Research and Development</strong></li>
            <li className='list-disc'>We are engaged in continuous research and development in the field of health equipment, aiming to improve healthcare facilities using renewable energy sources.</li>
            
            <li><strong>Social and Environmental Impact</strong></li>
            <li className='list-disc'>Our vision extends beyond simple profit-making; we are driven by a genuine desire to make a positive impact on society and the environment.</li>
            <li className='list-disc'>We firmly believe that through our innovative and sustainable solutions, we can contribute to a healthier planet and a brighter future for generations to come.</li>
            
            <li><strong>Mission Statement</strong></li>
            <li className='list-disc'>Join us in our mission to revolutionize the renewable technology industry and create a world powered by clean, efficient, and sustainable energy.</li>
            <li className='list-disc'>Shaping the future through innovation and renewable technology.</li>
            <li className='list-disc'>Made-in-India Products: Our company focuses on developing completely made-in-India inverters and batteries that are of the highest quality, ensuring that customers have access to reliable and locally-made products.</li>
          </ul>
        </div>
      </div>

      {/* Management */}
      <div className='managementContainer'>

        <h2 className='pageHeading'>Management</h2>

        <div className='managementPrevBtn' onClick={handlePrev}>
          <FaChevronLeft />
        </div>
        <div className='managementNextBtn' onClick={handleNext}>
          <FaChevronRight />
        </div>

        <div className='managementAboutContainer'>
        
          <div className='managementImage'>
            {imgs.map((ele, idx) => (
              <div key={idx} className={`imgSlide ${idx === activeIdx ? 'active' : idx < activeIdx ? 'prev' : 'next'}`}>
                <div className='managementImageContainer'>
                  <img src={ele} alt={`Management ${idx + 1}`} />
                </div>
              </div>
            ))}
          </div>

          <div className='managementDetail'>
            {details.map((ele, idx) => (
              <div key={idx} className={`detailSlide ${idx === activeIdx ? 'active' : idx < activeIdx ? 'prev' : 'next'}`}>
                <div className="detailContent">
                  <h1>{ele.name}</h1>
                  <h2>{ele.position}</h2>
                  <h3>{ele.experience} experience</h3>
                  <p>{ele.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
