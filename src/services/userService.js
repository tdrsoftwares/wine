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

export const updateUser = async (payload, id) => {
  try {
    const apiURL = `/user/update/${id}`;
    const updateUserData = await axiosInstance.put(apiURL, payload);
    return updateUserData;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const apiURL = `/user/delete/${userId}`;
    const deleteUserData = await axiosInstance.delete(apiURL);
    return deleteUserData;
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

export const getAllUsers = async () => {
  try {
    const apiURL = `/user/get-all`;
    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllRoleNames = async () => {
  try {
    const apiURL = `/role`;
    const response = await axiosInstance.get(apiURL);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllRoleAndPermissions = async () => {
  try {
    const apiURL = `/role/all-roles`;
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

export const updateRolePermissions = async (payload, id) => {
  try {
    const apiURL = `/role/update/${id}`;
    const updateResponse = await axiosInstance.put(apiURL, payload);
    return updateResponse;
  } catch (error) {
    return error;
  }
};

export const deleteRole = async (roleId) => {
  try {
    const apiURL = `/role/delete/${roleId}`;
    const deleteRoleData = await axiosInstance.delete(apiURL);
    return deleteRoleData;
  } catch (error) {
    return error;
  }
};
