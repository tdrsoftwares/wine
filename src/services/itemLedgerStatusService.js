import axiosInstance from "../utils/axiosInstance";

export const getAllItemLedgerStatuses = async (filterOptions) => {
  try {
    const {
      page,
      pageSize,
      storeName,
      toDate,
      fromDate,
      brandName,
      AllBrand,
      itemName,
      categoryName,
      AllCategory,
      group,
      company,
      bl,
    } = filterOptions;

    // let apiURL = `/reports/daily-item-status?page=${page}&pageSize=${pageSize}`;
    let apiURL = `/reports/item-ledger?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&storeName=${storeName}`;

    const filters = {
      // storeName,
      // toDate,
      // fromDate,
      brandName,
      AllBrand,
      itemName,
      categoryName,
      AllCategory,
      group,
      company,
      bl,
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

export const exportAllLedgerData = async (filterOptions) => {
  try {
    const {
      page,
      pageSize,
      storeName,
      toDate,
      fromDate,
      brandName,
      AllBrand,
      itemName,
      categoryName,
      AllCategory,
      group,
      company,
      bl,
    } = filterOptions;

    let apiURL = `reports/item-ledger-exports?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&storeName=${storeName}`;

    const filters = {
      brandName,
      AllBrand,
      itemName,
      categoryName,
      AllCategory,
      group,
      company,
      bl,
    };

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        apiURL += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    });

    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    console.error("Error exporting ledger data:", error);
    return error;
  }
};
