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
    const { page, limit, supplierName, fromDate, toDate } = filterOptions;
    let apiURL = `/purchases/reports?page=${page}&limit=${limit}`;

    if (supplierName) {
      apiURL += `&supplierName=${encodeURIComponent(supplierName)}`;
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
      limit,
      fromDate,
      toDate,
      itemName,
      supplierName,
      brandName,
      categoryName,
      volume,
      itemCode,
      // batchNo
    } = filterOptions;

    let apiURL = `/purchases/all-item-reports?page=${page}&limit=${limit}`;

    const filters = {
      fromDate,
      toDate,
      itemName,
      supplierName,
      brandName,
      categoryName,
      volume,
      itemCode,
      // batchNo
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

export const searchAllPurchasesByItemName = async (itemName) => {
  try {
    const apiURL = `/purchases/item-search?name=${encodeURIComponent(
      itemName
    )}`;
    const allPurchasesData = await axiosInstance.get(apiURL);
    return allPurchasesData;
  } catch (error) {
    return error;
  }
};

export const searchAllPurchasesByItemCode = async (itemCode) => {
  try {
    const apiURL = `/purchases/item-code/${encodeURIComponent(itemCode)}`;
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
