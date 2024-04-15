import axios from "axios";
import { url } from "../utils/apiDomain";

export const createPurchase = async (payload, loginResponse) => {
  try {
    const apiURL = `${url}/purchases/create`;
    const createPurchaseData = await axios.post(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return createPurchaseData;
  } catch (error) {
    return error;
  }
};

export const updatePurchase = async (payload, id, loginResponse) => {
  try {
    const apiURL = `${url}/purchases/update/${id}`;
    const updatePurchaseData = await axios.put(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return updatePurchaseData;
  } catch (error) {
    return error;
  }
};

export const getAllPurchases = async (loginResponse) => {
  try {
    const apiURL = `${url}/purchases/get-all/`;
    const allPurchasesData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allPurchasesData;
  } catch (error) {
    return error;
  }
};

export const searchAllPurchases = async (loginResponse, itemName) => {
  try {
    const apiURL = `${url}/purchases/item-search?name=${itemName}`;
    const allPurchasesData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allPurchasesData;
  } catch (error) {
    return error;
  }
};

export const deletePurchase = async (id, loginResponse) => {
  try {
    const apiURL = `${url}/purchases/delete/${id}`;
    const deletePurchaseData = await axios.delete(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return deletePurchaseData;
  } catch (error) {
    return error;
  }
};
