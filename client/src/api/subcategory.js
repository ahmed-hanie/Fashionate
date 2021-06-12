import axios from "axios";

const getSubcategoriesFromCategory = async (categoryId) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/api/subcategory?filter[categories.id]=${categoryId}`
    );
  } catch (response) {
    return response;
  }
};

export { getSubcategoriesFromCategory };
