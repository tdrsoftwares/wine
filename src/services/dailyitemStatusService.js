import axiosInstance from "../utils/axiosInstance";

export const getAllItemStatuses = async (filterOptions) => {

    try {
        const {
          page,
          pageSize,
          toDate,
          brandName,
          itemName,
          categoryName,
          group,
          companyName
        } = filterOptions;
    
        let apiURL = `/reports/daily-item-status?page=${page}&pageSize=${pageSize}`;
    
        const filters = {
            toDate,
            brandName,
            itemName,
            categoryName,
            group,
            companyName
        };
    
        Object.keys(filters).forEach((key) => {
          if (filters[key]) {
            apiURL += `&${key}=${encodeURIComponent(filters[key])}`;
          }
        });
        const getItemSalesData = await axiosInstance.get(apiURL);
        return getItemSalesData;
      } catch (error) {
        return error;
      }

}