import { refreshAccessToken } from "../api/auth";
import axios from "axios";

const TOKEN_EXPIRE_TIME = 10 * 60 * 1000;
// Refresh token 15 seconds early to avoid any api request errors
const TOKEN_REFRESH_EARLY_MS = 15000;
// Refresh funcion hanndle
let REFRESH_INTERVAL_HANDLE = null;

// Continuously refresh token as long as webpage is open
const startRefreshInterval = (refreshToken, setAuthData) => {
  REFRESH_INTERVAL_HANDLE = setInterval(async () => {
    const response = await refreshAccessToken(refreshToken);
    if (response.status === 200) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("went here");
    } else {
      // Handle token expiry or any API error
      localStorage.clear();
      clearInterval(REFRESH_INTERVAL_HANDLE);
      REFRESH_INTERVAL_HANDLE = null;
      setAuthData({ authenticated: false, data: null });
      delete axios.defaults.headers.common["Authorization"];
    }
  }, TOKEN_EXPIRE_TIME - TOKEN_REFRESH_EARLY_MS);
};

// Stop refreshing
const stopRefreshInterval = () => {
  clearInterval(REFRESH_INTERVAL_HANDLE);
  REFRESH_INTERVAL_HANDLE = null;
};

/*
  Store tokens and user roles in local storage,
  start refresh token process, update authcontext and
  set axios Authorization header
  setAuthData from AuthContext, login axios response
*/
const login = (setAuthData, response) => {
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  let roles = [];
  response.data.roles.forEach((role) => {
    roles.push(role.name);
  });
  localStorage.setItem("roles", roles.join(","));
  startRefreshInterval(response.data.refreshToken, setAuthData);
  setAuthData({
    authenticated: true,
    data: { ...response.data, roles: roles.join(",") },
  });
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.accessToken}`;
};

/*
  Clear local storage, update authcontext, stop refresh process
  and remove axios Authorization header
  setAuthData and authData from AuthContext
*/
const logout = (setAuthData, authData) => {
  localStorage.clear();
  stopRefreshInterval();
  setAuthData({ authenticated: false, data: null });
  delete axios.defaults.headers.common["Authorization"];
};

/*
  Validate that refresh token in local storage hasn't expired,
  update AuthContext and start refresh token process
*/
const syncAuthContext = async (setAuthData) => {
  if (localStorage.getItem("refreshToken")) {
    const response = await refreshAccessToken(
      localStorage.getItem("refreshToken")
    );
    if (response.status === 200) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      localStorage.setItem("accessToken", response.data.accessToken);
      setAuthData({
        authenticated: true,
        data: {
          accessToken: response.data.token,
          refreshToken: localStorage.getItem("refreshToken"),
          roles: localStorage.getItem("roles"),
        },
      });
      stopRefreshInterval();
      startRefreshInterval(localStorage.getItem("refreshToken"), setAuthData);
    } else {
      localStorage.clear();
    }
  }
};

export { login, logout, syncAuthContext };
