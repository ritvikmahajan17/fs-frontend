import React, { useState } from 'react';
import './Loginpage.css';
import makeRequest from '../../utils/makeRequest/makeRequestAuth';
import { LOGIN } from '../../constants/apiEndPoints';
import { useNavigate } from 'react-router-dom';


export const Loginpage =  () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    
    console.log(email,password);
    makeRequest(LOGIN,{ data: {
      email: email,
      password: password
    }})
      .then((response) => {
        if(response.accessToken){
          localStorage.setItem('token', response.accessToken);
          navigate('/');
        }
        else{
          alert('Invalid Credentials');
        }
      }
      );

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
        <a id="login-msg">Login to your CMS+ account</a>
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
            Login
          </button>
          <a>Forgot Password?</a>
          <a onClick={handleRegisterClick}>Register</a>
        </div>
      </div>
    </div>
  );
};