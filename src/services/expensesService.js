import axiosInstance from "../utils/axiosInstance";

export const createExpenseType = async (payload) => {
  try {
    const apiURL = `/expence-type/create`;
    const createExpenseTypeData = await axiosInstance.post(apiURL, payload);
    return createExpenseTypeData;
  } catch (error) {
    return error;
  }
};

export const createExpense = async (payload) => {
  try {
    const apiURL = `/expence/create`;
    const createExpenseData = await axiosInstance.post(apiURL, payload);
    return createExpenseData;
  } catch (error) {
    return error;
  }
};

export const searchAllExpenseTypes = async (expenseName = "") => {
  try {
    const apiURL = `/expence-type/search?name=${expenseName}`;
    const allExpenseTypes = await axiosInstance.get(apiURL);
    return allExpenseTypes;
  } catch (error) {
    return error;
  }
};

// for table data
export const getAllExpenses = async (filterOptions) => {
  try {
    const { fromDate, toDate } = filterOptions;

    let apiURL = `/expence/expence-reports-export-excel`;

    const filters = { fromDate, toDate };
    const filterKeys = Object.keys(filters).filter((key) => filters[key]);

    if (filterKeys.length > 0) {
      apiURL +=
        "?" +
        filterKeys
          .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
          .join("&");
    }

    const allExpenses = await axiosInstance.get(apiURL);
    return allExpenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return error;
  }
};

// for export data
export const exportAllExpenses = async () => {
  try {
    const apiURL = `/expence/expence-reports-export-excel`;
    const responseData = await axiosInstance.get(apiURL);
    return responseData;
  } catch (error) {
    return error;
  }
};

// for open
export const getExpenseByPaymentRefNo = async (paymentRefNo) => {
  try {
    const apiURL = `/expence/get-payment-no/${paymentRefNo}`;
    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllPaymentRefNumbers = async () => {
  try {
    const apiURL = `/expence/get-all-payment-no`;
    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateExpense = async (payload, id) => {
  try {
    const apiURL = `/expence/update/${id}`;
    const updateExpenseData = await axiosInstance.put(apiURL, payload);
    return updateExpenseData;
  } catch (error) {
    return error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const apiURL = `/expence/delete/${id}`;
    const deleteExpenseData = await axiosInstance.delete(apiURL);
    return deleteExpenseData;
  } catch (error) {
    return error;
  }
};
