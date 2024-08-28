// Location.jsx

import React from 'react';
import './Location.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Location = () => {
  return (
    <div className="location-container">
      <div className="location-header">
        <i>
          <FaMapMarkerAlt />
        </i>
        <h2>Our Location</h2>
      </div>

      <div className="location-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.9048689561673!2d84.40344593413883!3d25.034477591403494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d0fa96125ab39%3A0x327d95b810fcae07!2sNand%20Computers!5e0!3m2!1sen!2sin!4v1724824684932!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Location"
        ></iframe>
      </div>

      <div className="location-details">
        <h3>Visit Us At:</h3>
        <p>
          <i>
            <FaMapMarkerAlt />
          </i>
          Lakhan More, <br />
          Main Road Daudnagar,
          Aurangabad <br />
          Bihar,
          pincode : 824143
        </p>
        <p>
          <i>
            <FaPhoneAlt />
          </i>
          (+91) 9204906311
        </p>
        <p>
          <i>
            <FaEnvelope />
          </i>
          nandcomputers@gmail.com
        </p>
      </div>
    </div>
  );
};

export default Location;
