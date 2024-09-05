import axiosInstance from "../utils/axiosInstance";

export const getAllBrandStockMrp = async (filterOptions) => {
  try {
    const { fromDate, toDate, brandName, AllBrand } = filterOptions;

    let apiURL = `/reports/brand-stock-mrp?brandName=${brandName}`;

    const filters = {
      fromDate,
      toDate,
      AllBrand,
    };

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        apiURL += `&${key}=${filters[key]}`;
      }
    });
    const getItemSalesData = await axiosInstance.get(apiURL);
    return getItemSalesData;
  } catch (error) {
    return error;
  }
};
