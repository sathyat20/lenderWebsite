import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  const authenticated = useSelector((state) => state.auth.authenticated);

  if (!authenticated) {
    return <Navigate to="/signin" />;
  } else {
    return children;
  }
}

export default RequireAuth;
