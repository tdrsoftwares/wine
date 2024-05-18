import axiosInstance from "../utils/axiosInstance";

export const createBrand = async (payload) => {
  try {
    const apiURL = `/brand/create`;
    const createBrandData = await axiosInstance.post(apiURL, payload);
    return createBrandData;
  } catch (error) {
    return error;
  }
};

export const updateBrand = async (payload, id) => {
  try {
    const apiURL = `/brand/update/${id}`;
    const updateBrandData = await axiosInstance.put(apiURL, payload);
    return updateBrandData;
  } catch (error) {
    return error;
  }
};

export const getAllBrands = async () => {
  try {
    const apiURL = `/brand/get-all`;
    const allBrandsData = await axiosInstance.get(apiURL);
    return allBrandsData;
  } catch (error) {
    return error;
  }
};

export const deleteBrand = async (id) => {
  try {
    const apiURL = `/brand/delete/${id}`;
    const deleteBrandData = await axiosInstance.delete(apiURL);
    return deleteBrandData;
  } catch (error) {
    return error;
  }
};
