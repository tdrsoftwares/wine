import axiosInstance from "../utils/axiosInstance";

export const getAllStatements = async (filterOptions) => {
  try {
    const { fromDate, toDate } = filterOptions;
    let apiURL = `/reports/monthly-online-statements?`;

    const filters = { fromDate, toDate };
    
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        apiURL += `${key}=${encodeURIComponent(filters[key])}&`;
      }
    });

    // Remove the trailing '&' if it exists
    apiURL = apiURL.slice(0, -1);

    const allPurchasesData = await axiosInstance.get(apiURL);
    return allPurchasesData;
  } catch (error) {
    return error;
  }
};
