import React, { useState } from 'react';
import "./sendEmail.css";

const SendEmail = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server or email service
    console.log('Email data:', formData);
    // Reset form
    setFormData({
      to: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className='sendEmailBody'>
      <h1 className='sendEmailHeading'>Send Email</h1>
      <form className='sendEmailForm' onSubmit={handleSubmit}>
        <div className='formGroup'>
          <label htmlFor='to'>To</label>
          <input
            type='email'
            id='to'
            name='to'
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div className='formGroup'>
          <label htmlFor='subject'>Subject</label>
          <input
            type='text'
            id='subject'
            name='subject'
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className='formGroup'>
          <label htmlFor='message'>Message</label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='submitButton'>Send</button>
      </form>
    </div>
  );
};

export default SendEmail;
