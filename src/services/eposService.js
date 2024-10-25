import axiosInstance, { axiosEposInstance } from "../utils/axiosInstance";
import { eposUrl } from "../utils/apiDomain";

export const getAllEpos = async (filterOptions) => {
  try {
    const { page, pageSize, fromDate, toDate, brandName, itemName } =
      filterOptions;
    let apiURL = `/reports/daily-sales-reports`;

    const filters = { fromDate, toDate, brandName, itemName };
    const filterKeys = Object.keys(filters).filter((key) => filters[key]);
    if (filterKeys.length > 0) {
      apiURL += "?";
    }

    filterKeys.forEach((key, index) => {
      apiURL += `${index === 0 ? "" : "&"}${key}=${encodeURIComponent(
        filters[key]
      )}`;
    });
    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginEpos = async (payload) => {
  try {
    const apiURL = `${eposUrl}/login`;
    const loginEposData = await axiosEposInstance.post(apiURL, payload);
    const token = loginEposData.data.token;
    document.cookie = `eposToken=${token}; path=/;`;
    return loginEposData;
  } catch (error) {
    return error;
  }
};

export const multipleEpos = async (posData) => {
  try {
    const apiURL = `${eposUrl}/multiple-epos`;
    const multipleEposData = await axiosEposInstance.post(apiURL, posData);
    return multipleEposData;
  } catch (error) {
    return error;
  }
};
