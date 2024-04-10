import axios from "axios";
import { url } from "../utils/apiDomain";

export const createSupplier = async (payload, loginResponse) => {
  try {
    const apiURL = `${url}/supplier/create`;
    const createSupplierData = await axios.post(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return createSupplierData;
  } catch (error) {
    return error;
  }
};

export const updateSupplier = async (payload, id, loginResponse) => {
  try {
    const apiURL = `${url}/supplier/update/${id}`;
    const updateSupplierData = await axios.put(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return updateSupplierData;
  } catch (error) {
    return error;
  }
};

export const getAllSuppliers = async (loginResponse) => {
  try {
    const apiURL = `${url}/supplier/get-all`;
    const allSuppliersData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allSuppliersData;
  } catch (error) {
    return error;
  }
};

export const deleteSupplier = async (id, loginResponse) => {
  try {
    const apiURL = `${url}/supplier/delete/${id}`;
    const deleteSupplierData = await axios.delete(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return deleteSupplierData;
  } catch (error) {
    return error;
  }
};
