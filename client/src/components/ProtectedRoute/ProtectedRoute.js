import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ProtectedRoute = ({ children, ...rest }) => {
  const [authData] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authData.authenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", from: location }} />
        );
      }}
    />
  );
};

export default ProtectedRoute;
