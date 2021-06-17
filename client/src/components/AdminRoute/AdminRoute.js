import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const AdminRoute = ({ children, ...rest }) => {
  const [authData] = useContext(AuthContext);

  const roles = authData.data.roles.split(",");

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authData.authenticated && roles.includes("admin") ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", from: location }} />
        );
      }}
    />
  );
};

export default AdminRoute;
