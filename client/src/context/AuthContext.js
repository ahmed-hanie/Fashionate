import React from "react";

const AuthContext = React.createContext([
  { authenticated: false, data: null },
  () => {},
]);
export default AuthContext;
