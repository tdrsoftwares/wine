
import axiosInstance from "../utils/axiosInstance";

export const createCompany = async (payload) => {
  try {
    const apiURL = `/company/create`;
    const createCompanyData = await axiosInstance.post(apiURL, payload);
    return createCompanyData;
  } catch (error) {
    return error;
  }
};

export const updateCompany = async (payload, id) => {
  try {
    const apiURL = `/company/update/${id}`;
    const updateCompanyData = await axiosInstance.put(apiURL, payload);
    return updateCompanyData;
  } catch (error) {
    return error;
  }
};

export const getAllCompanies = async () => {
  try {
    const apiURL = `/company/get-all`;
    const allCompaniesData = await axiosInstance.get(apiURL);
    return allCompaniesData;
  } catch (error) {
    return error;
  }
};

export const deleteCompany = async (id) => {
  try {
    const apiURL = `/company/delete/${id}`;
    const deleteCompanyData = await axiosInstance.delete(apiURL);
    return deleteCompanyData;
  } catch (error) {
    return error;
  }
};
