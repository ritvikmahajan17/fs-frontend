import React, { useState } from 'react';
import './Registerpage.css';
import makeRequest from '../../utils/makeRequest/makeRequestAuth';
import { useNavigate } from 'react-router-dom';
import { REGISTER } from '../../constants/apiEndPoints';


export const Registerpage =  () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    
    console.log(email,password);
    makeRequest(REGISTER,{ data: {
      email: email,
      password: password
    }})
      .then((response) => {
        console.log(response);
        navigate('/login');
      });

  };




  return (
    <div className="login-main">
      <div className='login-one'>
        <div className="header-text">
          <a><b>Design APIs fast,</b></a>
          <a><b>Manage content easily.</b></a>
        </div>
        <div className="img-main">
          <img src={require('../../assets/undraw-upload-re-pasx_2023-03-09/undraw-upload-re-pasx.png')} alt="login" />
        </div>
      </div>
      <div className="login-two">
        <a id="login-msg">Register to your CMS+ account</a>
        <div className="login-inputs">
          <div className='inputs'>
            <label>Email</label>
            <input type="text" onChange={handleEmailChange} />
          </div>
          <div className='inputs'>
            <label>Password</label>
            <input type="password" onChange={handlePasswordChange} />
          </div>
          <button onClick={handleLoginClick}>
            Register
          </button>
          <a>Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};