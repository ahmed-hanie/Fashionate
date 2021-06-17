import axios from "axios";
import { queryString } from "object-query-string";

const login = async (credentials) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user/login`,
      credentials
    );
  } catch (error) {
    return error.response;
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/user/token`, {
      token: refreshToken,
    });
  } catch (error) {
    return error.response;
  }
};

const register = async (credentials) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user/register`,
      credentials
    );
  } catch (error) {
    return error.response;
  }
};

const getUsers = async (query, limit = 10000) => {
  if (!("limit" in query)) {
    query.limit = limit;
  }

  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user?${queryString(query)}`
    );
  } catch (error) {
    return error.response;
  }
};

const disableUser = async (uuid) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_API_URL}/api/user/${uuid}/disable`
    );
  } catch (error) {
    return error.response;
  }
};

const createAdminAccount = async (credentials) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user`,
      credentials
    );
  } catch (error) {
    return error.response;
  }
};

export {
  login,
  refreshAccessToken,
  register,
  getUsers,
  disableUser,
  createAdminAccount,
};
