
import axiosInstance from "../utils/axiosInstance";

export const createItemCategory = async (payload) => {
  try {
    const apiURL = `/category/create`;
    const createCategoryData = await axiosInstance.post(apiURL, payload);
    return createCategoryData;
  } catch (error) {
    return error;
  }
};

export const updateItemCategory = async (payload, id) => {
  try {
    const apiURL = `/category/update/${id}`;
    const updateCategoryData = await axiosInstance.put(apiURL, payload);
    return updateCategoryData;
  } catch (error) {
    return error;
  }
};

export const getAllItemCategory = async () => {
  try {
    const apiURL = `/category/get-all`;
    const allCategoryData = await axiosInstance.get(apiURL);
    return allCategoryData;
  } catch (error) {
    return error;
  }
};

export const deleteItemCategory = async (id) => {
  try {
    const apiURL = `/category/delete/${id}`;
    const deleteCategoryData = await axiosInstance.delete(apiURL);
    return deleteCategoryData;
  } catch (error) {
    return error;
  }
};
