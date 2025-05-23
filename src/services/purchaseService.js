import axiosInstance from "../utils/axiosInstance";

export const createPurchase = async (payload) => {
  try {
    const apiURL = `/purchases/create`;
    const createPurchaseData = await axiosInstance.post(apiURL, payload);
    return createPurchaseData;
  } catch (error) {
    return error;
  }
};

export const updatePurchase = async (payload, id) => {
  try {
    const apiURL = `/purchases/update/${id}`;
    const updatePurchaseData = await axiosInstance.put(apiURL, payload);
    return updatePurchaseData;
  } catch (error) {
    return error;
  }
};

export const getAllPurchases = async (filterOptions) => {
  try {
    const { page, pageSize, supplierName, storeName, fromDate, toDate } =
      filterOptions;
    let apiURL = `/purchases/reports?page=${page}&pageSize=${pageSize}`;

    if (supplierName) {
      apiURL += `&supplierName=${encodeURIComponent(supplierName)}`;
    }
    if (storeName) {
      apiURL += `&storeName=${encodeURIComponent(storeName)}`;
    }
    if (fromDate) {
      apiURL += `&fromDate=${fromDate}`;
    }
    if (toDate) {
      apiURL += `&toDate=${toDate}`;
    }

    const allPurchasesData = await axiosInstance.get(apiURL);
    return allPurchasesData;
  } catch (error) {
    return error;
  }
};

export const exportPurchaseSummaryDetails = async (filterOptions) => {
  try {
    const { supplierName, storeName, fromDate, toDate } = filterOptions;

    let apiURL = `/purchases/purchase-report-export`;

    const filters = {
      supplierName,
      storeName,
      fromDate,
      toDate,
    };

    const queryStringParts = Object.keys(filters)
      .filter((key) => filters[key])
      .map((key) => `${key}=${encodeURIComponent(filters[key])}`);

    if (queryStringParts.length > 0) {
      apiURL += `?${queryStringParts.join("&")}`;
    }

    const exportPurchaseData = await axiosInstance.get(apiURL);
    return exportPurchaseData;
  } catch (error) {
    console.error("Error exporting item purchase data:", error);
    return error;
  }
};

export const getItemPurchaseDetails = async (entryNo) => {
  try {
    const apiURL = `/purchases/item-reports/${entryNo}`;
    const getItemPurchaseData = await axiosInstance.get(apiURL);
    return getItemPurchaseData;
  } catch (error) {
    return error;
  }
};

export const getItemWisePurchaseDetails = async (filterOptions) => {
  try {
    const {
      page,
      pageSize,
      fromDate,
      toDate,
      itemName,
      supplierName,
      brandName,
      categoryName,
      volume,
      itemCode,
      mode,
    } = filterOptions;

    let apiURL = `/purchases/all-item-reports?page=${page}&pageSize=${pageSize}`;

    const filters = {
      fromDate,
      toDate,
      itemName,
      supplierName,
      brandName,
      categoryName,
      volume,
      itemCode,
      mode,
    };

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        apiURL += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    });
    const getItemPurchaseData = await axiosInstance.get(apiURL);
    return getItemPurchaseData;
  } catch (error) {
    return error;
  }
};

export const exportItemPurchaseDetails = async (filterOptions) => {
  try {
    const {
      fromDate,
      toDate,
      itemName,
      supplierName,
      brandName,
      categoryName,
      volume,
      itemCode,
      mode,
    } = filterOptions;

    let apiURL = `/purchases/purchase-item-report-export`;

    const filters = {
      fromDate,
      toDate,
      itemName,
      supplierName,
      brandName,
      categoryName,
      volume,
      itemCode,
      mode,
    };

    const queryStringParts = Object.keys(filters)
      .filter((key) => filters[key])
      .map((key) => `${key}=${encodeURIComponent(filters[key])}`);

    if (queryStringParts.length > 0) {
      apiURL += `?${queryStringParts.join("&")}`;
    }

    const getItemPurchaseData = await axiosInstance.get(apiURL);
    return getItemPurchaseData;
  } catch (error) {
    console.error("Error exporting item purchase data:", error);
    return error;
  }
};

// export const searchAllPurchasesByItemName = async (itemName) => {
//   try {
//     const apiURL = `/stock/purchases-item?name=${encodeURIComponent(itemName)}`;
//     const allPurchasesData = await axiosInstance.get(apiURL);
//     return allPurchasesData;
//   } catch (error) {
//     return error;
//   }
// };

export const searchAllPurchasesByItemName = async (
  itemName,
  page,
  pageSize
) => {
  try {
    const apiURL = `/stock/purchases-item?name=${encodeURIComponent(
      itemName
    )}&page=${page}&pageSize=${pageSize}`;
    const allPurchasesData = await axiosInstance.get(apiURL);
    return allPurchasesData;
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return null;
  }
};

export const searchAllPurchasesByItemCode = async (itemCode) => {
  try {
    const apiURL = `/stock/purchases-item-code/${encodeURIComponent(itemCode)}`;
    const allPurchasesData = await axiosInstance.get(apiURL);
    return allPurchasesData;
  } catch (error) {
    return error;
  }
};

export const deletePurchase = async (id) => {
  try {
    const apiURL = `/purchases/delete/${id}`;
    const deletePurchaseData = await axiosInstance.delete(apiURL);
    return deletePurchaseData;
  } catch (error) {
    return error;
  }
};

export const getPurchaseDetailsByEntryNo = async (entryNo) => {
  try {
    const apiURL = `/purchases/bill/${entryNo}`;
    const getPurchaseDetailsData = await axiosInstance.get(apiURL);
    return getPurchaseDetailsData;
  } catch (error) {
    return error;
  }
};

export const updatePurchaseDetailsByEntryNo = async (payload, entryNo) => {
  try {
    const apiURL = `/purchases/update/${entryNo}`;
    const updateDetails = await axiosInstance.put(apiURL, payload);
    return updateDetails;
  } catch (error) {
    return error;
  }
};

export const removePurchaseDetails = async (entryNo) => {
  try {
    const apiURL = `/purchases/delete-bill/${entryNo}`;
    const removeDetails = await axiosInstance.delete(apiURL, entryNo);
    return removeDetails;
  } catch (error) {
    return error;
  }
};

export const getAllEntryNo = async () => {
  try {
    const apiURL = `/purchases/bill-no`;
    const getAllDetails = await axiosInstance.get(apiURL);
    return getAllDetails;
  } catch (error) {
    return error;
  }
};

export const removeAllPurchases = async (allPurchases) => {
  try {
    const apiURL = `/utils/delete-records?purchases=${allPurchases}`;
    const response = await axiosInstance.delete(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};

export const getItemDetailsByItemCode = async (itemCode) => {
  try {
    const apiURL = `/stock/stock-info/${itemCode}`;
    const getDetails = await axiosInstance.get(apiURL);
    return getDetails;
  } catch (error) {
    return error;
  }
};
