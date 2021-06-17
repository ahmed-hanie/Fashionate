import axios from "axios";

const getTags = async (limit = 10000) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/api/tag?limit=${limit}`
    );
  } catch (error) {
    return error.response;
  }
};

const getTagById = async (id) => {
  try {
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/tag/${id}`);
  } catch (error) {
    return error.response;
  }
};

const createTag = async (tag) => {
  try {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/tag`, tag);
  } catch (error) {
    return error.response;
  }
};

const updateTag = async (id, tag) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_API_URL}/api/tag/${id}`,
      tag
    );
  } catch (error) {
    return error.response;
  }
};

const deleteTag = async (id) => {
  try {
    return await axios.delete(`${process.env.REACT_APP_API_URL}/api/tag/${id}`);
  } catch (error) {
    return error.response;
  }
};

export { getTags, createTag, updateTag, deleteTag, getTagById };
