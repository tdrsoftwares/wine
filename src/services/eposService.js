import { eposUrl } from "../utils/apiDomain";
import axiosInstance from "../utils/axiosInstance";

export const getAllEpos = async (filterOptions) => {
  try {
    const { page, pageSize, fromDate, toDate, brandName, itemName } =
      filterOptions;

    let apiURL = `/reports/daily-sales-reports?page=${page}&pageSize=${pageSize}`;

    const filters = {
      fromDate,
      toDate,
      brandName,
      itemName,
    };

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        apiURL += `&${key}=${encodeURIComponent(filters[key])}`;
      }
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
    const loginEposData = await axiosInstance.post(apiURL, payload);
    const token = loginEposData.data.token;
    document.cookie = `token=${token}; path=/;`;
    return loginEposData;
  } catch (error) {
    return error;
  }
};

export const multipleEpos = async (posData) => {
  try {
    const apiURL = `${eposUrl}/multiple-epos`;
    const multipleEposData = await axiosInstance.post(apiURL, posData);
    return multipleEposData;
  } catch (error) {
    return error;
  }
};
