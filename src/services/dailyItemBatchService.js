import axiosInstance from "../utils/axiosInstance";

export const getDailyItemBatchDetails = async (filterOptions) => {
  try {
    const { storeName, toDayDate } = filterOptions;
    let apiURL = `/reports/daily-item-batch-status?`;

    const filters = { storeName, toDayDate };
    
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        apiURL += `${key}=${encodeURIComponent(filters[key])}&`;
      }
    });

    // Remove the trailing '&' if it exists
    apiURL = apiURL.slice(0, -1);

    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};
