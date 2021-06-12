import axios from "axios";

const getCategories = async () => {
  try {
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/category`);
  } catch (response) {
    return response;
  }
};

export { getCategories };
