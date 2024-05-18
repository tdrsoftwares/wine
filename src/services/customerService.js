
import axiosInstance from "../utils/axiosInstance";

export const createCustomer = async (payload) => {
  try {
    const apiURL = `/customer/create`;
    const createCustomerData = await axiosInstance.post(apiURL, payload);
    return createCustomerData;
  } catch (error) {
    return error;
  }
};

export const updateCustomer = async (payload, id) => {
  try {
    const apiURL = `/customer/update/${id}`;
    const updateCustomerData = await axiosInstance.put(apiURL, payload);
    return updateCustomerData;
  } catch (error) {
    return error;
  }
};

export const getAllCustomer = async () => {
  try {
    const apiURL = `/customer/get-all`;
    const allCustomerData = await axiosInstance.get(apiURL);
    return allCustomerData;
  } catch (error) {
    return error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const apiURL = `/customer/delete/${id}`;
    const deleteCustomerData = await axiosInstance.delete(apiURL);
    return deleteCustomerData;
  } catch (error) {
    return error;
  }
};
