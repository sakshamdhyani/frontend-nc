import React, { useState } from 'react';
import './contactUs.css';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../redux/slices/contact';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    subject: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(contactUs(formData, setFormData));
      setSuccessMessage('Message Sent Successfully. We will get back to you soon.');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Nand Computers</title>
        <meta name="description" content="Contact Nand Computers for inquiries, feedback, or support. Fill out the form and we'll get back to you soon." />
        <meta name="keywords" content="Nand Computers, contact us, customer support, feedback, inquiries, electronics" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Us - Nand Computers" />
        <meta property="og:description" content="Get in touch with Nand Computers for any inquiries or support needs. We're here to help!" />
        <meta property="og:url" content="https://www.nandcomputers.com/contact-us" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.nandcomputers.com/logo.png" />
      </Helmet>

      <div className="contact-us">
        <div className="contact-us-content">
          <h2>Contact Us</h2>
          <p>We'd love to hear from you! Please fill out the form below and we'll get in touch with you shortly.</p>

          {submitted ? (
            <div className="success-message">
              <p>{successMessage}</p>
              <Link to="/" className="home-button">
                Go to Home
              </Link>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <fieldset>
                <legend>Contact Information</legend>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-label="Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    aria-label="Contact Number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-label="Email Address"
                  />
                </div>
              </fieldset>

              <fieldset>
                <legend>Message Details</legend>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    aria-label="Subject"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-label="Your Message"
                  ></textarea>
                </div>
              </fieldset>

              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
