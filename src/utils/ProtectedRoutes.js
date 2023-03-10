
import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    // localStorage.clear();
    const userToken = localStorage.getItem('token');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
      return navigate('/login');
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return (
    <React.Fragment>
      {
        isLoggedIn ? props.children : null
      }
    </React.Fragment>
  );
};

ProtectedRoute.propTypes = {
  children: propTypes.node.isRequired,
};
export default ProtectedRoute;