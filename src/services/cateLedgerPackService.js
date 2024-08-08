import axiosInstance from "../utils/axiosInstance";

export const getCateLedgerPackDetails = async (filterOptions) => {
  try {
    const { fromDate, toDate, categoryName, bl } = filterOptions;
    let apiURL = `/reports/category-pack-ledger?`;

    const filters = { fromDate, toDate, categoryName, bl };
    
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
