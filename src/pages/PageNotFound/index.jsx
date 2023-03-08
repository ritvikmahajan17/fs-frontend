import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.scss';

export const PageNotFound = () => {
  const navigate = useNavigate();

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

      <h1>Page Not Found</h1>
      <div onClick={handleClick} className="btn">
        Return to Home
      </div>
    </div>
  );
};
