import axiosInstance from "../utils/axiosInstance";

export const createUser = async (payload) => {
  try {
    const apiURL = `/user/create`;
    const response = await axiosInstance.post(apiURL, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const createRole = async (payload) => {
  try {
    const apiURL = `/role/create`;
    const response = await axiosInstance.post(apiURL, payload);
    return response;
  } catch (error) {
    return error;
  }
};

// export const updateStore = async (payload, id) => {
//   try {
//     const apiURL = `/store/update/${id}`;
//     const updateStoreData = await axiosInstance.put(apiURL, payload);
//     return updateStoreData;
//   } catch (error) {
//     return error;
//   }
// };

export const getAllRoleNames = async () => {
  try {
    const apiURL = `/role`;
    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllModules = async () => {
  try {
    const apiURL = `/admin/module`;
    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};

// export const deleteStore = async (id) => {
//   try {
//     const apiURL = `/store/delete/${id}`;
//     const deleteStoreData = await axiosInstance.delete(apiURL);
//     return deleteStoreData;
//   } catch (error) {
//     return error;
//   }
// };
