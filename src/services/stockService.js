import axiosInstance from "../utils/axiosInstance";

export const createPurchase = async (payload) => {
  try {
    const apiURL = `/stocks/create`;
    const createPurchaseData = await axiosInstance.post(apiURL, payload);
    return createPurchaseData;
  } catch (error) {
    return error;
  }
};

export const getSupplierData = async () => {
  try {
    const apiURL = `/supplier/get-all`;
    const getLicenseData = await axiosInstance.get(apiURL);
    return getLicenseData.data;
  } catch (error) {
    return error;
  }
};
export const getSupplierDataById = async (id) => {
  try {
    const apiURL = `/supplier-payment-reciept/get-biils/${id}`;
    const getSupplierData = await axiosInstance.get(apiURL);
    return getSupplierData.data;
  } catch (error) {
    return error;
  }
};
export const getCustomerData = async () => {
  try {
    const apiURL = `/customer/get-all`;
    const getCustomerData = await axiosInstance.get(apiURL);
    return getCustomerData.data;
  } catch (error) {
    return error;
  }
};

export const getCustomerDataById = async (id) => {
  try {
    const apiURL = `/customer-reciept/get-biils/${id}`;
    const getCustomerData = await axiosInstance.get(apiURL);
    return getCustomerData.data;
  } catch (error) {
    return error;
  }
};

export const updatePurchase = async (payload, id) => {
  try {
    const apiURL = `/stocks/update/${id}`;
    const updatePurchaseData = await axiosInstance.put(apiURL, payload);
    return updatePurchaseData;
  } catch (error) {
    return error;
  }
};

export const getAllStocks = async (filterOptions) => {
  try {
    const {
      page,
      pageSize,
      itemName,
      categoryName,
      AllCategory,
      volume,
      brandName,
      AllBrand,
      batch,
      storeName,
      company,
      itemCode,
    } = filterOptions;

    let apiURL = `/stock/stock-reports?page=${page}&pageSize=${pageSize}`;

    const filters = {
      itemName,
      categoryName,
      AllCategory,
      volume,
      brandName,
      AllBrand,
      batch,
      storeName,
      company,
      itemCode,
    };

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        apiURL += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    });

    const allStocksData = await axiosInstance.get(apiURL);
    return allStocksData;
  } catch (error) {
    return error;
  }
};

export const exportAllStocks = async (filterOptions) => {
  try {
    const {
      itemName,
      categoryName,
      AllCategory,
      volume,
      brandName,
      AllBrand,
      batch,
      storeName,
      company,
      itemCode,
    } = filterOptions;

    let apiURL = `/stock/export-excel?storeName=${encodeURIComponent(storeName)}`;

    const filters = {
      itemName,
      categoryName,
      AllCategory,
      volume,
      brandName,
      AllBrand,
      batch,
      company,
      itemCode,
    };

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        apiURL += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    });

    const allStocksData = await axiosInstance.get(apiURL);
    return allStocksData;
  } catch (error) {
    console.error("Error exporting stocks:", error);
    return error;
  }
};


export const getItemPurchaseDetails = async (entryNo) => {
  try {
    const apiURL = `/stocks/item-reports/${entryNo}`;
    const getItemPurchaseData = await axiosInstance.get(apiURL);
    return getItemPurchaseData;
  } catch (error) {
    return error;
  }
};

export const searchAllStocks = async (itemName) => {
  try {
    const apiURL = `/stocks/item-search?name=${itemName}`;
    const allStocksData = await axiosInstance.get(apiURL);
    return allStocksData;
  } catch (error) {
    return error;
  }
};

export const deletePurchase = async (id) => {
  try {
    const apiURL = `/stocks/delete/${id}`;
    const deletePurchaseData = await axiosInstance.delete(apiURL);
    return deletePurchaseData;
  } catch (error) {
    return error;
  }
};


export const removeAllStocks = async (stocks) => {
  try {
    const apiURL = `/utils/delete-records?stock=${stocks}`;
    const response = await axiosInstance.delete(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};