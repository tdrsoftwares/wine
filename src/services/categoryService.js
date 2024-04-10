import axios from "axios";
import { url } from "../utils/apiDomain";

export const createItemCategory = async (payload, loginResponse) => {
  console.log("loginResponse: ", loginResponse);
  try {
    const apiURL = `${url}/category/create`;
    const createCategoryData = await axios.post(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return createCategoryData;
  } catch (error) {
    return error;
  }
};

export const updateItemCategory = async (payload, id, loginResponse) => {
  try {
    const apiURL = `${url}/category/update/${id}`;
    const updateCategoryData = await axios.put(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return updateCategoryData;
  } catch (error) {
    return error;
  }
};

export const getAllItemCategory = async (loginResponse) => {
  try {
    const apiURL = `${url}/category/get-all/`;
    const allCategoryData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allCategoryData;
  } catch (error) {
    return error;
  }
};

export const deleteItemCategory = async (id, loginResponse) => {
  try {
    const apiURL = `${url}/category/delete/${id}`;
    const deleteCategoryData = await axios.delete(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return deleteCategoryData;
  } catch (error) {
    return error;
  }
};
