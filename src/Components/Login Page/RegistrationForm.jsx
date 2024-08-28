import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
import './registrationForm.css';
import { register, sendOtp } from '../../redux/slices/userAuth';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { isAuth, loading } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    privacyPolicyAccepted: false,
    marketingMessagesAccepted: false,
    otpValue: '',
  });

  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isStrongPassword(formData.password)) {
      toast.error(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      toast.error('Mobile number must be exactly 10 digits.');
      return;
    }

    // Dispatch action to request OTP
    dispatch(sendOtp(formData.email, setShowOtpPopup));
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    if (!formData.otpValue || formData.otpValue.length !== 4) {
      toast.error('Please enter a valid 4-digit OTP.');
      return;
    }

    // Dispatch action to register the user
    dispatch(register(formData, navigate));
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <>
      <Helmet>
        <title>Register - Nand Computers</title>
        <meta name="description" content="Register to become a member and enjoy exclusive benefits with Nand Computers." />
        <meta name="keywords" content="Nand Computers, registration, sign up, electronics, benefits" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Register - Nand Computers" />
        <meta property="og:description" content="Sign up to enjoy exclusive benefits and deals on electronics at Nand Computers." />
        <meta property="og:url" content="https://www.nandcomputers.com/register" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.nandcomputers.com/logo.png" />
      </Helmet>

      <form className="registrationFormBody" onSubmit={handleSubmit}>
        <Toaster />
        <h1 className="registrationFormHeading">Registration Form</h1>
        <div className="registrationFormContainer">
          <fieldset>
            <legend>Personal Information</legend>
            <div className="registrationFormRow">
              <label htmlFor="email">
                <h1>Email <span className="required">*</span></h1>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  placeholder="Your Email"
                  required
                  aria-label="Email"
                />
              </label>
              <p className="infoText">Your email address is the account identifier and cannot be changed once registered.</p>
            </div>

            <div className="registrationFormRow">
              <label htmlFor="firstName">
                <h1>First Name <span className="required">*</span></h1>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  placeholder="First Name"
                  required
                  aria-label="First Name"
                />
              </label>
            </div>

            <div className="registrationFormRow">
              <label htmlFor="lastName">
                <h1>Last Name <span className="required">*</span></h1>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  placeholder="Last Name"
                  required
                  aria-label="Last Name"
                />
              </label>
            </div>

            <div className="registrationFormRow">
              <label htmlFor="mobileNumber">
                <h1>Mobile Number <span className="required">*</span></h1>
                <input
                  type="text"
                  id="mobileNumber"
                  inputMode="numeric"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Replace non-numeric characters
                    handleChange('mobileNumber', value);
                  }}
                  placeholder="Mobile Number"
                  minLength={10}
                  maxLength={10}
                  required
                  aria-label="Mobile Number"
                />
                {submitted && formData.mobileNumber.length !== 10 && (
                  <p className="errorText">Please enter a 10-digit mobile number.</p>
                )}
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Account Security</legend>
            <div className="registrationFormRow">
              <label htmlFor="password">
                <h1>Password <span className="required">*</span></h1>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  placeholder="Your Password"
                  required
                  aria-label="Password"
                />
              </label>
            </div>

            <div className="registrationFormRow">
              <label htmlFor="confirmPassword">
                <h1>Confirm Password <span className="required">*</span></h1>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  placeholder="Confirm Password"
                  required
                  aria-label="Confirm Password"
                />
              </label>
            </div>
          </fieldset>
        </div>

        <div className="registrationFormSubmitBtn">
          <button type="submit" disabled={loading}>
            {loading ? <Loader /> : 'Submit'}
          </button>
        </div>
      </form>

      {showOtpPopup && (
        <div className="popupContainer">
          <div className="otpPopup">
            <form onSubmit={handleOtpSubmit}>
              <h2>Enter OTP</h2>
              <input
                type="text"
                name="otpValue"
                value={formData.otpValue}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="Enter OTP"
                maxLength={4}
                required
                aria-label="OTP"
              />
              <br />
              <button type="submit" disabled={loading}>
                {loading ? <Loader /> : 'Verify OTP'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationForm;
