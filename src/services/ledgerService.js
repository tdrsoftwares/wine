import axios from "axios";
import { url } from "../utils/apiDomain";

export const createLedger = async (payload, loginResponse) => {
  try {
    const apiURL = `${url}/ledger/create`;
    const createLedgerData = await axios.post(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return createLedgerData;
  } catch (error) {
    return error;
  }
};

export const updateLedger = async (payload, id, loginResponse) => {
  try {
    const apiURL = `${url}/ledger/update/${id}`;
    const updateLedgerData = await axios.put(apiURL, payload, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return updateLedgerData;
  } catch (error) {
    return error;
  }
};

export const getAllLedgers = async (loginResponse) => {
  try {
    const apiURL = `${url}/ledger/get-all`;
    const allLedgersData = await axios.get(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return allLedgersData;
  } catch (error) {
    return error;
  }
};

export const deleteLedger = async (id, loginResponse) => {
  try {
    const apiURL = `${url}/ledger/delete/${id}`;
    const deleteLedgerData = await axios.delete(apiURL, {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });
    return deleteLedgerData;
  } catch (error) {
    return error;
  }
};
