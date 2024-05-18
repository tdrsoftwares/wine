import axiosInstance from "../utils/axiosInstance";

export const createItem = async (payload) => {
  try {
    const apiURL = `/item/create`;
    const createItemData = await axiosInstance.post(apiURL, payload);
    return createItemData;
  } catch (error) {
    return error;
  }
};

export const updateItem = async (payload, id) => {
  try {
    const apiURL = `/item/update/${id}`;
    const updateItemData = await axiosInstance.put(apiURL, payload);
    return updateItemData;
  } catch (error) {
    return error;
  }
};

export const getAllItems = async () => {
  try {
    const apiURL = `/item/get-all`;
    const allItemsData = await axiosInstance.get(apiURL);
    return allItemsData;
  } catch (error) {
    return error;
  }
};

export const deleteItem = async (id) => {
  try {
    const apiURL = `/item/delete/${id}`;
    const deleteItemData = await axiosInstance.delete(apiURL);
    return deleteItemData;
  } catch (error) {
    return error;
  }
};
