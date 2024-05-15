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

// export const getAllPurchases = async (loginResponse, filterOptions) => {
//   try {
//     const { page, limit, supplierName, fromDate, toDate } = filterOptions;
//     const apiURL = `${url}/purchases/reports?page=${page}&limit=${limit}&supplierName=${supplierName}&fromDate=${fromDate}&toDate=${toDate}`;
//     const allPurchasesData = await axios.get(apiURL, {
//       headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
//     });
//     return allPurchasesData;
//   } catch (error) {
//     return error;
//   }
// };

export const getAllPurchases = async (loginResponse, filterOptions) => {
  try {
    const { page, limit, supplierName, fromDate, toDate } = filterOptions;
    const apiURL = `${url}/purchases/reports?page=${page}&limit=${limit}`;
    const allPurchasesData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allPurchasesData;
  } catch (error) {
    return error;
  }
};

export const getItemPurchaseDetails = async (entryNo, loginResponse) => {
  try {
    const apiURL = `${url}/purchases/item-reports/${entryNo}`;
    const getItemPurchaseData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return getItemPurchaseData;
  } catch (error) {
    return error;
  }
};

export const searchAllPurchasesByItemName = async (loginResponse, itemName) => {
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

export const searchAllPurchasesByItemCode = async (loginResponse, itemCode) => {

  try {
    
    const apiURL = `${url}/purchases/item-code/${itemCode}`;
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
