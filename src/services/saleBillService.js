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

export const updateSaleDetailsByBillNo = async (payload, billNo) => {
  try {
    const apiURL = `/sales/update-bill/${billNo}`;
    const updateDetails = await axiosInstance.put(apiURL, payload);
    return updateDetails;
  } catch (error) {
    return error;
  }
};

export const searchAllSalesByItemName = async (itemName, storeName) => {
  try {
    const apiURL = `/stock/sales-items?name=${itemName}&storeName=${storeName}`;
    const allSalesData = await axiosInstance.get(apiURL);
    return allSalesData;
  } catch (error) {
    return error;
  }
};

export const searchAllSalesByItemCode = async (itemCode, storeName) => {
  try {
    const apiURL = `/stock/sales-items-code/${storeName}/${encodeURIComponent(
      itemCode
    )}`;
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
      pageSize,
      fromDate,
      toDate,
      customerName,
      series,
      phoneNo,
      customerType,
    } = filterOptions;

    let apiURL = `/sales/reports?page=${page}&pageSize=${pageSize}`;

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
      pageSize,
      fromDate,
      toDate,
      customerName,
      categoryName,
      brandName,
      itemName,
      itemCode,
      supplierName,
      batchNo,
      series,
      groupName,
      billNo,
      volume,
      mode,
    } = filterOptions;

    let apiURL = `/sales/all-item-reports?page=${page}&pageSize=${pageSize}`;

    const filters = {
      fromDate,
      toDate,
      customerName,
      categoryName,
      brandName,
      itemName,
      itemCode,
      supplierName,
      batchNo,
      series,
      groupName,
      billNo,
      volume,
      mode,
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

export const exportItemSaleDetails = async (filterOptions) => {
  try {
    const {
      fromDate,
      toDate,
      customerName,
      categoryName,
      brandName,
      itemName,
      itemCode,
      supplierName,
      batchNo,
      series,
      groupName,
      billNo,
      volume,
      mode,
    } = filterOptions;

    let apiURL = `/sales/sale-item-report-export`;

    const filters = {
      fromDate,
      toDate,
      customerName,
      categoryName,
      brandName,
      itemName,
      itemCode,
      supplierName,
      batchNo,
      series,
      groupName,
      billNo,
      volume,
      mode,
    };

    const queryStringParts = Object.keys(filters)
      .filter((key) => filters[key])
      .map((key) => `${key}=${encodeURIComponent(filters[key])}`);

    if (queryStringParts.length > 0) {
      apiURL += `?${queryStringParts.join('&')}`;
    }

    const exportItemSaleData = await axiosInstance.get(apiURL);
    return exportItemSaleData;
  } catch (error) {
    console.error("Error exporting item sales data:", error);
    return error;
  }
};

export const getDailySalesDetails = async (filterOptions) => {
  try {
    const {
      page,
      pageSize,
      fromDate,
      toDate,
      brandName,
      customerName,
      categoryName,
      group,
      itemName,
      volume,
      mode,
    } = filterOptions;

    let apiURL = `/reports/daily-sales-reports?page=${page}&pageSize=${pageSize}`;

    const filters = {
      fromDate,
      toDate,
      brandName,
      customerName,
      categoryName,
      group,
      itemName,
      volume,
      mode,
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

export const exportDailySalesDetails = async (filterOptions) => {
  try {
    const {
      fromDate,
      toDate,
      brandName,
      customerName,
      categoryName,
      group,
      itemName,
      volume,
      mode,
    } = filterOptions;

    let apiURL = `/reports/dsr-reports-export`;

    const filters = {
      fromDate,
      toDate,
      brandName,
      customerName,
      categoryName,
      group,
      itemName,
      volume,
      mode,
    };

    const queryStringParts = Object.keys(filters)
      .filter((key) => filters[key])
      .map((key) => `${key}=${encodeURIComponent(filters[key])}`);

    if (queryStringParts.length > 0) {
      apiURL += `?${queryStringParts.join("&")}`;
    }
    // console.log(apiURL);

    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    console.error("Error exporting sales data:", error);
    return error;
  }
};

export const getSaleDetailsByEntryNo = async (billNo) => {
  try {
    const apiURL = `/sales/bill/${billNo}`;
    const getSalesData = await axiosInstance.get(apiURL);
    return getSalesData;
  } catch (error) {
    return error;
  }
};

export const removeSaleDetails = async (billNo) => {
  try {
    const apiURL = `/sales/delete-bill/${billNo}`;
    const removeDetails = await axiosInstance.delete(apiURL, billNo);
    return removeDetails;
  } catch (error) {
    return error;
  }
};

export const getAllBillsBySeries = async (series) => {
  try {
    const apiURL = `/sales/bill-no/${encodeURIComponent(series)}`;
    const allBillsData = await axiosInstance.get(apiURL);
    return allBillsData;
  } catch (error) {
    return error;
  }
};

export const getAllSaleStores = async () => {
  try {
    const apiURL = `/store/sell-counter`;
    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};

export const removeAllSales = async (allSales) => {
  try {
    const apiURL = `/utils/delete-records?sales=${allSales}`;
    const response = await axiosInstance.delete(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllBrandWiseItems = async (filterOptions) => {
  try {
    const { storeName, brandName } = filterOptions;

    let apiURL = `/stock/brand-stock?`;

    const filters = { storeName, brandName };

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

export const searchByItemName = async (itemName) => {
  try {
    const apiURL = `/item/search?name=${itemName}`;
    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};

export const searchByBrandName = async (brandName) => {
  try {
    const apiURL = `/brand/search?name=${brandName}`;
    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};
