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


export const searchAllExpenseTypes = async (expenseName = '') => {
  try {
    const apiURL = `/expence-type/search?name=${expenseName}`;
    const allExpenseTypes = await axiosInstance.get(apiURL);
    return allExpenseTypes;
  } catch (error) {
    return error;
  }
};

export const getAllExpenses = async (page, limit) => {
  try {
    const apiURL = `/expence/get-all?page=${page}&limit=${limit}`;
    const allExpenseTypes = await axiosInstance.get(apiURL);
    return allExpenseTypes;
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

