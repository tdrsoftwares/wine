import axiosInstance from "../utils/axiosInstance";

export const createSupplier = async (payload) => {
  try {
    const apiURL = `/supplier/create`;
    const createSupplierData = await axiosInstance.post(apiURL, payload);
    return createSupplierData;
  } catch (error) {
    return error;
  }
};

export const updateSupplier = async (payload, id) => {
  try {
    const apiURL = `/supplier/update/${id}`;
    const updateSupplierData = await axiosInstance.put(apiURL, payload);
    return updateSupplierData;
  } catch (error) {
    return error;
  }
};

export const getAllSuppliers = async () => {
  try {
    const apiURL = `/supplier/get-all`;
    const allSuppliersData = await axiosInstance.get(apiURL);
    return allSuppliersData;
  } catch (error) {
    return error;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const apiURL = `/supplier/delete/${id}`;
    const deleteSupplierData = await axiosInstance.delete(apiURL);
    return deleteSupplierData;
  } catch (error) {
    return error;
  }
};
