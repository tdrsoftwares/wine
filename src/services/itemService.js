import axios from "axios";
import { url } from "../utils/apiDomain";

export const createItem = async (payload, loginResponse) => {
  try {
    const apiURL = `${url}/item/create`;
    const createItemData = await axios.post(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return createItemData;
  } catch (error) {
    return error;
  }
};

export const updateItem = async (payload, id, loginResponse) => {
  try {
    const apiURL = `${url}/item/update/${id}`;
    const updateItemData = await axios.put(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return updateItemData;
  } catch (error) {
    return error;
  }
};

export const getAllItems = async (loginResponse) => {
  try {
    const apiURL = `${url}/item/get-all`;
    const allItemsData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allItemsData;
  } catch (error) {
    return error;
  }
};

export const deleteItem = async (id, loginResponse) => {
  try {
    const apiURL = `${url}/item/delete/${id}`;
    const deleteItemData = await axios.delete(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return deleteItemData;
  } catch (error) {
    return error;
  }
};
