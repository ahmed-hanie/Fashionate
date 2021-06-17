import axios from "axios";

const getCategories = async (limit = 10000) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/api/category?limit=${limit}`
    );
  } catch (response) {
    return response;
  }
};

const getCategoryById = async (id) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/api/category/${id}`
    );
  } catch (response) {
    return response;
  }
};

const getCategoriesWithSubcategories = async (limit = 10000) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/api/category?limit=${limit}&include=subcategory`
    );
  } catch (response) {
    return response;
  }
};

const createCategory = async (category) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/api/category`,
      category
    );
  } catch (response) {
    return response;
  }
};

const updateCategory = async (id, category) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_API_URL}/api/category/${id}`,
      category
    );
  } catch (response) {
    return response;
  }
};

const deleteCategory = async (id) => {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/category/${id}`
    );
  } catch (response) {
    return response;
  }
};

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesWithSubcategories,
  getCategoryById,
};
