/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loginData = JSON.parse(localStorage.getItem("loginData")) || false;
  console.log({ loginData });
  const registerData = JSON.parse(localStorage.getItem("RegisterData")) || false;
  console.log({ registerData });

  if (!registerData) {
    return <Navigate to={"/Register"} />;
  } else if (!loginData) {
    return <Navigate to={"/Login"} />;
  } else {
    return children;
  }
};

export default PrivateRoute;

//!registerData -> register
//registerData && !loginData - login
//register && loginData - children
