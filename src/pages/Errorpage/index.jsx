import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Errorpage.scss';

export const Errorpage = () => {
  const navigate = useNavigate();
  const { errorcode } = useParams();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div>
      <div className="face">
        <div className="band">
          <div className="red"></div>
          <div className="white"></div>
          <div className="blue"></div>
        </div>
        <div className="eyes"></div>
        <div className="dimples"></div>
        <div className="mouth"></div>
      </div>

      <h1>Error Code: {errorcode}</h1>
      <div onClick={handleClick} className="btn">
        Return to Home
      </div>
    </div>
  );
};
