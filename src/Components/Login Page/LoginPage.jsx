import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './loginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/userAuth';
import BigLoader from '../Loader/BigLoader';
import toast from 'react-hot-toast';
import ForgetPassPopup from './ForgetPassPopup';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, loading } = useSelector((state) => state.userAuth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberEmail: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleGoogleSignIn = () => {
    // window.location.href = "http://localhost:4005/api/v1/auth/google"; // Redirect to your backend Google OAuth route
  };

  const [forgetPassPopup, setForgetPassPopup] = useState(false);

  return (
    <>
      <Helmet>
        <title>Login - Nand Computers</title>
        <meta name="description" content="Login to your Nand Computers account to enjoy exclusive benefits, special discounts, and more." />
        <meta name="keywords" content="Nand Computers, login, member, benefits, discounts, electronics, computers, TVs, fridges" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Login - Nand Computers" />
        <meta property="og:description" content="Access your Nand Computers account for exclusive benefits and discounts on electronics." />
        <meta property="og:url" content="https://www.nandcomputers.com/login" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.nandcomputers.com/logo.png" />
      </Helmet>
      {loading ? <BigLoader /> :
        <main className='loginPageBody'>

          <div className={forgetPassPopup ? "showForgetPopup" : "hideForgetPopup"}>
            <ForgetPassPopup forgetPassPopup={forgetPassPopup} setForgetPassPopup={setForgetPassPopup}/>
          </div>
          
          <section className='loginPageContainerParent'>
            <div className='loginPageContainer'>
              <header className='loginPageContainerHeading'>
                <h1 className='loginPageContainerTitle'>Sign Into Your Account</h1>
                <h2 className='loginPageContainerSubTitle'>Take advantage of exclusive benefits</h2>
              </header>

              <form onSubmit={handleSubmit} className='loginPageCredentialsContainer'>
                <label>
                  <h1>Email Address</h1>
                  <input
                    required
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Email Account'
                    aria-label="Email Address"
                  />
                </label>

                <label>
                  <h1>Password</h1>
                  <input
                    required
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Password'
                    aria-label="Password"
                  />
                </label>

                <div className='loginPageCredentialsContainerPassRow'>
                  <p className='loginPageCredentialsContainerForgetPass' onClick={()=>setForgetPassPopup(true)} aria-label="Forgot Password">Forgot Password?</p>
                </div>

                <div className='loginPageSignInBtn'>
                  <button type='submit'>Sign In</button>

                  <Link to='/registration'>
                    <button type="button">Join</button>
                  </Link>

                </div>
                
              </form>

              {/* <div className='loginPageGoogleSignInContainer'>
                <div className='loginPageGoogleSignInTopBar'>
                  <p>or</p>
                </div>
                <div className='loginPageGoogleSignIn'>
                  <button onClick={handleGoogleSignIn}>
                    <img src='/google.png' alt='Google Sign In' />
                    <p>Sign in with Google</p>
                  </button>
                </div>
              </div> */}
            </div>
          </section>

        </main>
      }
    </>
  );
};

export default LoginPage;
