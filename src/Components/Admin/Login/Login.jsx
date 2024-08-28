import React, { useEffect, useState } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../../redux/slices/userAuth';
import BigLoader from '../../Loader/BigLoader';

const AdminLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuth , loading} = useSelector((state) => state.userAuth);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginAdmin(email , password , navigate));
  };

  useEffect(() => {

    if(isAuth){
      navigate("/admin/dashboard");
    }
    
  },[isAuth])

  return (

    loading ? <BigLoader/> :

    <div className="container">
      <div className="heading">Sign In</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          required
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="forgot-password">
          <a href="#">Forgot Password ?</a>
        </span>
        <input className="login-button" type="submit" value="Sign In" />
      </form>
    </div>
  );
};

export default AdminLogin;
