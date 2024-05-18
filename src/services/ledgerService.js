import axiosInstance from "../utils/axiosInstance";

export const createLedger = async (payload) => {
  try {
    const apiURL = `/ledger/create`;
    const createLedgerData = await axiosInstance.post(apiURL, payload);
    return createLedgerData;
  } catch (error) {
    return error;
  }
};

export const updateLedger = async (payload, id) => {
  try {
    const apiURL = `/ledger/update/${id}`;
    const updateLedgerData = await axiosInstance.put(apiURL, payload);
    return updateLedgerData;
  } catch (error) {
    return error;
  }
};

export const getAllLedgers = async () => {
  try {
    const apiURL = `/ledger/get-all`;
    const allLedgersData = await axiosInstance.get(apiURL);
    return allLedgersData;
  } catch (error) {
    return error;
  }
};

export const deleteLedger = async (id) => {
  try {
    const apiURL = `/ledger/delete/${id}`;
    const deleteLedgerData = await axiosInstance.delete(apiURL);
    return deleteLedgerData;
  } catch (error) {
    return error;
  }
};
