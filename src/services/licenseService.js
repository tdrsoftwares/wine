import axiosInstance from "../utils/axiosInstance";

export const createLicenseInfo = async (payload) => {
  try {
    const apiURL = `/licence/create`;
    const createLicenseData = await axiosInstance.post(apiURL, payload);
    return createLicenseData;
  } catch (error) {
    return error;
  }
};


export const getLicenseInfo = async () => {
  try {
    const apiURL = `licence/get-licence`;
    const getLicenseData = await axiosInstance.get(apiURL);
    return getLicenseData.data;
  } catch (error) {
    return error;
  }
};


export const updateLicenseInfo = async (payload, id) => {
  try {
    const apiURL = `/licence/update/${id}`;
    const updateLicenseData = await axiosInstance.put(apiURL, payload);
    return updateLicenseData.data;
  } catch (error) {
    return error;
  }
};
