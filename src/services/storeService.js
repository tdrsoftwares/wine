import axiosInstance from "../utils/axiosInstance";

export const createStore = async (payload) => {
  try {
    const apiURL = `/store/create`;
    const createStoreData = await axiosInstance.post(apiURL, payload);
    return createStoreData;
  } catch (error) {
    return error;
  }
};

export const updateStore = async (payload, id) => {
  try {
    const apiURL = `/store/update/${id}`;
    const updateStoreData = await axiosInstance.put(apiURL, payload);
    return updateStoreData;
  } catch (error) {
    return error;
  }
};

export const getAllStores = async () => {
  try {
    const apiURL = `/store/get-all/`;
    const allStoresData = await axiosInstance.get(apiURL);
    return allStoresData;
  } catch (error) {
    return error;
  }
};

export const deleteStore = async (id) => {
  try {
    const apiURL = `/store/delete/${id}`;
    const deleteStoreData = await axiosInstance.delete(apiURL);
    return deleteStoreData;
  } catch (error) {
    return error;
  }
};
