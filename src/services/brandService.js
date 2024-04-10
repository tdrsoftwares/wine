import axios from "axios";
import { url } from "../utils/apiDomain";

export const createBrand = async (payload, loginResponse) => {
  try {
    const apiURL = `${url}/brand/create`
    const createBrandData = await axios.post(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return createBrandData;
  } catch (error) {
    return error;
  }
};

export const updateBrand = async (payload, id, loginResponse) => {
  try {
    const apiURL = `${url}/brand/update/${id}`;
    const updateBrandData = await axios.put(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return updateBrandData;
  } catch (error) {
    return error;
  }
};

export const getAllBrands = async (loginResponse) => {
  console.log("loginResponse: ", loginResponse);
  try {
    const apiURL = `${url}/brand/get-all`;
    const allBrandsData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allBrandsData;
  } catch (error) {
    return error;
  }
};

export const deleteBrand = async (id, loginResponse) => {
  try {
    const apiURL = `${url}/brand/delete/${id}`;
    const deleteBrandData = await axios.delete(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return deleteBrandData;
  } catch (error) {
    return error;
  }
};
