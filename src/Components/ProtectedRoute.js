import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import BigLoader from './Loader/BigLoader';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuth, accountType, loading } = useSelector((state) => state.userAuth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    if (!loading) {

      if (!isAuth) {

        timeoutId = setTimeout(() => {
          navigate('/', { state: { from: location }, replace: true });
        }, 3000); // 3 seconds timeout

      } 
      else if (!allowedRoles.includes(accountType)) {

        timeoutId = setTimeout(() => {
          navigate("/"); // Redirect to the previous page
        }, 1000); // 3 seconds timeout
      }
    }

    return () => {
      clearTimeout(timeoutId); // Clean up timeout if component unmounts or conditions change
    };
  }, [isAuth, accountType, allowedRoles, location, navigate, loading]);


  if (!isAuth || !allowedRoles.includes(accountType)) {
    return null; // Return null while redirecting
  }

  return children;
};

export default ProtectedRoute;
