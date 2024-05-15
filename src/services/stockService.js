import axios from "axios";
import { url } from "../utils/apiDomain";

export const createPurchase = async (payload, loginResponse) => {
  try {
    const apiURL = `${url}/stocks/create`;
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
    const apiURL = `${url}/stocks/update/${id}`;
    const updatePurchaseData = await axios.put(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return updatePurchaseData;
  } catch (error) {
    return error;
  }
};

// export const getAllStocks = async (loginResponse, filterOptions) => {
//   try {
//     const { page, limit, supplierName, fromDate, toDate } = filterOptions;
//     const apiURL = `${url}/stocks/stock-reports?page=${page}&limit=${limit}&supplierName=${supplierName}&fromDate=${fromDate}&toDate=${toDate}`;
//     const allStocksData = await axios.get(apiURL, {
//       headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
//     });
//     return allStocksData;
//   } catch (error) {
//     return error;
//   }
// };

export const getAllStocks = async (loginResponse) => {
  try {
    // const { page, limit, supplierName, fromDate, toDate } = filterOptions;
    const apiURL = `${url}/purchases/stock-reports`;
    const allStocksData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allStocksData;
  } catch (error) {
    return error;
  }
};

export const getItemPurchaseDetails = async (entryNo, loginResponse) => {
  try {
    const apiURL = `${url}/stocks/item-reports/${entryNo}`;
    const getItemPurchaseData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return getItemPurchaseData;
  } catch (error) {
    return error;
  }
};

export const searchAllStocks = async (loginResponse, itemName) => {
  try {
    const apiURL = `${url}/stocks/item-search?name=${itemName}`;
    const allStocksData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allStocksData;
  } catch (error) {
    return error;
  }
};

export const deletePurchase = async (id, loginResponse) => {
  try {
    const apiURL = `${url}/stocks/delete/${id}`;
    const deletePurchaseData = await axios.delete(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return deletePurchaseData;
  } catch (error) {
    return error;
  }
};
