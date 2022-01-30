import React from "react";
import { Navigate } from "react-router-dom";
import SecureLS from "secure-ls";
import { URL_PATH } from "../utils/urlPath";
const ls = new SecureLS();

const ProtectedRoute = ({ Component, ...props }) => {
  const userSession = ls.get("userSession");
  return userSession ? (
    <Component {...props} />
  ) : (
    <Navigate to={URL_PATH.SIGN_IN} {...props} />
  );
};

export default ProtectedRoute;
