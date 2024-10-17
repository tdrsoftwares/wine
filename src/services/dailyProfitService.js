import axiosInstance from "../utils/axiosInstance";

export const getDailyProfitDetails = async (filterOptions) => {
  const { page, pageSize, fromDate, toDate } = filterOptions;

  try {
    let apiURL = `/reports/daily-profit-reports?page=${page}&pageSize=${pageSize}`;

    const filters = { fromDate, toDate };

    const queryString = Object.keys(filters)
      .filter((key) => filters[key])
      .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
      .join("&");

    if (queryString) {
      apiURL += `&${queryString}`;
    }

    const response = await axiosInstance.get(apiURL);

    return response;
  } catch (error) {
    return error;
  }
};

export const exportDailyProfitDetails = async (filterOptions) => {
  const { fromDate, toDate } = filterOptions;

  try {
    let apiURL = `/reports/daily-profit-reports-export`;

    if (fromDate || toDate) {
      const filters = {};

      if (fromDate) filters.fromDate = fromDate;
      if (toDate) filters.toDate = toDate;

      const queryString = Object.keys(filters)
        .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
        .join("&");

      apiURL += `?${queryString}`;
    }

    const response = await axiosInstance.get(apiURL);

    return response;
  } catch (error) {
    return error;
  }
};
