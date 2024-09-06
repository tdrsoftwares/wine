import axiosInstance from "../utils/axiosInstance";

export const getAllBrandStockMrp = async (filterOptions) => {
  try {
    const { fromDate, toDate, brandName, AllBrand } = filterOptions;

    let apiURL = `/reports/brand-stock-mrp?`;

    if (AllBrand) {
      apiURL += `AllBrand=true`;
    } else if (brandName) {
      apiURL += `brandName=${encodeURIComponent(brandName)}`;
    }

    if (fromDate) {
      apiURL += `&fromDate=${fromDate}`;
    }

    if (toDate) {
      apiURL += `&toDate=${toDate}`;
    }

    const getItemSalesData = await axiosInstance.get(apiURL);
    return getItemSalesData;
  } catch (error) {
    return error;
  }
};
