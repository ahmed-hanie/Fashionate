import axios from "axios";

const getSubcategoriesFromCategory = async (categoryId, limit = 10000) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/api/subcategory?filter[categoryId]=${categoryId}&limit=${limit}`
    );
  } catch (response) {
    return response;
  }
};

const getSubcategoryById = async (id) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/api/subcategory/${id}`
    );
  } catch (error) {
    return error.response;
  }
};

const getSubcategories = async (query, limit = 10000) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/api/subcategory?limit=${limit}`
    );
  } catch (error) {
    return error.response;
  }
};

const createSubcategory = async (subcategory) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/api/subcategory`,
      subcategory
    );
  } catch (error) {
    return error.response;
  }
};

const updateSubcategory = async (id, subcategory) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_API_URL}/api/subcategory/${id}`,
      subcategory
    );
  } catch (error) {
    return error.response;
  }
};

const deleteSubcategory = async (id) => {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/subcategory/${id}`
    );
  } catch (error) {
    return error.response;
  }
};

export {
  getSubcategoriesFromCategory,
  getSubcategoryById,
  getSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
