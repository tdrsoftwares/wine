import axiosInstance from "../utils/axiosInstance";

export const createTransfer = async (payload) => {
  try {
    const apiURL = `/stock-transfer/create`;
    const createTransferResponse = await axiosInstance.post(apiURL, payload);
    return createTransferResponse;
  } catch (error) {
    return error;
  }
};

export const getTransferDetailsByItemCode = async (itemCode) => {
  try {
    const apiURL = `/stock-transfer/get-items/${encodeURIComponent(itemCode)}`;
    const getDetails = await axiosInstance.get(apiURL);
    return getDetails;
  } catch (error) {
    return error;
  }
};

export const getTransferDetailsByItemName = async (itemName) => {
  try {
    const apiURL = `/stock-transfer/get-item?name=${encodeURIComponent(
      itemName
    )}`;
    const getDetails = await axiosInstance.get(apiURL);
    return getDetails;
  } catch (error) {
    return error;
  }
};
