import axios from "axios";
import { url } from "../utils/apiDomain";

export const createCompany = async (payload, loginResponse) => {
  try {
    const apiURL = `${url}/company/create`;
    const createCompanyData = await axios.post(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return createCompanyData;
  } catch (error) {
    return error;
  }
};

export const updateCompany = async (payload, id, loginResponse) => {
  try {
    const apiURL = `${url}/company/update/${id}`;
    const updateCompanyData = await axios.put(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return updateCompanyData;
  } catch (error) {
    return error;
  }
};

export const getAllCompanies = async (loginResponse) => {
  try {
    const apiURL = `${url}/company/get-all`;
    const allCompaniesData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allCompaniesData;
  } catch (error) {
    return error;
  }
};

export const deleteCompany = async (id, loginResponse) => {
  try {
    const apiURL = `${url}/company/delete/${id}`;
    const deleteCompanyData = await axios.delete(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return deleteCompanyData;
  } catch (error) {
    return error;
  }
};
