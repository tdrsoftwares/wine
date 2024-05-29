import axiosInstance from "../utils/axiosInstance";

export const createSale = async (payload) => {
  try {
    const apiURL = `/sales/create`;
    const createSaleBillData = await axiosInstance.post(apiURL, payload);
    return createSaleBillData;
  } catch (error) {
    return error;
  }
};

export const searchAllSalesByItemName = async (itemName) => {
  try {
    const apiURL = `/sales/get-items?name=${itemName}`;
    const allSalesData = await axiosInstance.get(apiURL);
    return allSalesData;
  } catch (error) {
    return error;
  }
};

export const searchAllSalesByItemCode = async (itemCode) => {
  try {
    const apiURL = `/sales/get-items/${itemCode}`;
    const allSalesData = await axiosInstance.get(apiURL);
    return allSalesData;
  } catch (error) {
    return error;
  }
};

export const getItemSaleDetails = async (billNo) => {
  try {
    const apiURL = `/sales/reports/${billNo}`;
    const getItemSaleData = await axiosInstance.get(apiURL);
    return getItemSaleData;
  } catch (error) {
    return error;
  }
};

export const getAllSales = async (filterOptions) => {
  try {
    const {
      page,
      limit,
      fromDate,
      toDate,
      customerName,
      series,
      phoneNo,
      customerType,
    } = filterOptions;

    let apiURL = `/sales/reports?page=${page}&limit=${limit}`;

    const filters = {
      fromDate,
      toDate,
      customerName,
      series,
      phoneNo,
      customerType,
    };

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        apiURL += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    });

    const allSalesData = await axiosInstance.get(apiURL);
    return allSalesData;
  } catch (error) {
    return error;
  }
};

export const getItemWiseSaleDetails = async (filterOptions) => {
  try {
    const {
      page,
      limit,
      fromDate,
      toDate,
      customerName,
      brandName,
      itemName,
      itemCode,
      supplierName,
      batchNo,
      series,
      groupName,
      billNo,
      volume,
    } = filterOptions;

    let apiURL = `/sales/all-item-reports?page=${page}&limit=${limit}`;

    const filters = {
      fromDate,
      toDate,
      customerName,
      brandName,
      itemName,
      itemCode,
      supplierName,
      batchNo,
      series,
      groupName,
      billNo,
      volume,
    };

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        apiURL += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    });
    const getItemSalesData = await axiosInstance.get(apiURL);
    return getItemSalesData;
  } catch (error) {
    return error;
  }
};
