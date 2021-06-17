import axios from "axios";

const createOrder = async (products) => {
  try {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/order`, {
      products,
    });
  } catch (error) {
    return error.response;
  }
};

const getOrdersForCurrentUser = async (limit = 10000) => {
  if (!axios.defaults.headers.common["Authorization"]) {
    console.log("NO TOKEN");
    return null;
  }
  try {
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/order/user`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    });
  } catch (error) {
    return error.response;
  }
};

export { createOrder, getOrdersForCurrentUser };
