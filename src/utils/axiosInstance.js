import axios from "axios";
import { getCookie } from "./cookie";
import { url } from "./apiDomain";

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    Authorization: getCookie('accessToken') ? `Bearer ${getCookie('accessToken')}` : '',
  },
});



axiosInstance.interceptors.request.use(
  config => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
