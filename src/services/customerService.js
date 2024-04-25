import axios from "axios";
import { url } from "../utils/apiDomain";

export const createCustomer = async (payload, loginResponse) => {
  console.log("loginResponse: ", loginResponse);
  try {
    const apiURL = `${url}/customer/create`;
    const createCustomerData = await axios.post(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return createCustomerData;
  } catch (error) {
    return error;
  }
};

export const updateCustomer = async (payload, id, loginResponse) => {
  try {
    const apiURL = `${url}/customer/update/${id}`;
    const updateCustomerData = await axios.put(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return updateCustomerData;
  } catch (error) {
    return error;
  }
};

export const getAllCustomer = async (loginResponse) => {
  try {
    const apiURL = `${url}/customer/get-all/`;
    const allCustomerData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allCustomerData;
  } catch (error) {
    return error;
  }
};

export const deleteCustomer = async (id, loginResponse) => {
  try {
    const apiURL = `${url}/customer/delete/${id}`;
    const deleteCustomerData = await axios.delete(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return deleteCustomerData;
  } catch (error) {
    return error;
  }
};
