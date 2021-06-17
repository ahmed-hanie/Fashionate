import axios from "axios";
import { queryString } from "object-query-string";

const getProducts = async (query = {}, limit = 10000) => {
  if (!("limit" in query)) {
    query.limit = limit;
  }
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/api/product?${queryString(query)}`
    );
  } catch (response) {
    return response;
  }
};

const getProductByUuid = async (uuid) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/api/product/${uuid}`
    );
  } catch (response) {
    return response;
  }
};

const createProduct = async (product) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/api/product`,
      product
    );
  } catch (response) {
    return response;
  }
};

const updateProduct = async (uuid, product) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_API_URL}/api/product/${uuid}`,
      product
    );
  } catch (response) {
    return response;
  }
};

const deleteProduct = async (uuid) => {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/product/${uuid}`
    );
  } catch (response) {
    return response;
  }
};

export {
  getProducts,
  getProductByUuid,
  createProduct,
  updateProduct,
  deleteProduct,
};
