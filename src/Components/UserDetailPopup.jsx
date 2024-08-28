import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './userDetailPopup.css';
import { popupFormSubmit } from '../redux/slices/contact';
import Loader from './Loader/Loader';

const UserDetailPopup = ({ delay }) => {
  const { isAuth } = useSelector((state) => state.userAuth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contact);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiry: ''
  });
  const [errors, setErrors] = useState({});
  const popupRef = useRef(null);

  useEffect(() => {
    if (!isAuth) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isAuth, delay]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Unified change handler for form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'phone') {
      // Allow only numbers and restrict length to 10 digits
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form submit handler
  const handleSave = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.inquiry.trim()) {
      newErrors.inquiry = 'Inquiry is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(popupFormSubmit(formData))
      .then(() => {
        // Only close the popup if dispatch is successful
        setIsOpen(false);
        sessionStorage.setItem('popupSubmitted', 'true');
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error submitting form:", error);
        // Optionally, you might want to inform the user about the error
      });
  };

  useEffect(() => {
    if (!isAuth && sessionStorage.getItem('popupSubmitted')) {
      setIsOpen(false);
    }
  }, [isAuth]);

  if (!isOpen || isAuth) return null;

  return (
    <div className='popupOverlay'>
      <div className='popupContent' ref={popupRef}>
        <button className="closeButton" onClick={() => setIsOpen(false)}>×</button>
        <h2>Add Your Details</h2>
        <label>
          Full Name:
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error text-red-600">{errors.fullName}</p>}
        </label>
        <label>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error text-red-600">{errors.email}</p>}
        </label>
        <label>
          Phone Number:
          <input
            type='text'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error text-red-600">{errors.phone}</p>}
        </label>
        <label>
          Inquiry:
          <textarea
            name='inquiry'
            value={formData.inquiry}
            onChange={handleChange}
          />
          {errors.inquiry && <p className="error text-red-600">{errors.inquiry}</p>}
        </label>
        <button className='saveButton' onClick={handleSave}>
          Submit
          {loading ? <Loader /> : null}
        </button>
      </div>
    </div>
  );
};

export default UserDetailPopup;
