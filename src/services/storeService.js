import axios from "axios";
import { url } from "../utils/apiDomain";

export const createStore = async (payload, loginResponse) => {
  try {
    const apiURL = `${url}/store/create`;
    const createStoreData = await axios.post(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return createStoreData;
  } catch (error) {
    return error;
  }
};

export const updateStore = async (payload, id, loginResponse) => {
  try {
    const apiURL = `${url}/store/update/${id}`;
    const updateStoreData = await axios.put(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return updateStoreData;
  } catch (error) {
    return error;
  }
};

export const getAllStores = async (loginResponse) => {
  try {
    const apiURL = `${url}/store/get-all/`;
    const allStoresData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allStoresData;
  } catch (error) {
    return error;
  }
};

export const deleteStore = async (id, loginResponse) => {
  try {
    const apiURL = `${url}/store/delete/${id}`;
    const deleteStoreData = await axios.delete(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return deleteStoreData;
  } catch (error) {
    return error;
  }
};
