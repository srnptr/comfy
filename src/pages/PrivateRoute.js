import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0();
  return user ? children : <Navigate to="/" />;
};
export default PrivateRoute;
