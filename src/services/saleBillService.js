import axios from "axios";
import { url } from "../utils/apiDomain";


export const createSale = async (payload, loginResponse) => {

  try {

    const apiURL = `${url}/sales/create`;
    const createSaleBillData = await axios.post(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return createSaleBillData;

  } catch (error) {
    return error;
  }
};



export const searchAllSalesByItemName = async (loginResponse, itemName) => {
  try {

    const apiURL = `${url}/sales/get-items?name=${itemName}`;
    const allSalesData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allSalesData;

  } catch (error) {

    return error;
  }

};



export const searchAllSalesByItemCode = async (loginResponse, itemCode) => {

  try {
    
    const apiURL = `${url}/sales/get-items/${itemCode}`;
    const allSalesData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allSalesData;

  } catch (error) {
    return error;
  }
};


// export const getAllSales = async (loginResponse) => {
//   try {
//     const apiURL = `${url}/sales/reports`;
//     const allSalesData = await axios.get(apiURL, {
//       headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
//     });
//     return allSalesData;
//   } catch (error) {
//     return error;
//   }
// };

export const getAllSales = async (loginResponse, filterOptions) => {
  try {
    const { page, limit, supplierName, fromDate, toDate } = filterOptions;
    const apiURL = `${url}/sales/reports?page=${page}&limit=${limit}`;
    const allSalesData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allSalesData;
  } catch (error) {
    return error;
  }
};