import axiosInstance from "../utils/axiosInstance";

export const getAllItemStatuses = async (filterOptions) => {

    try {
        const {
        //   page,
        //   pageSize,
          storeName,
          toDayDate,
          brandName,
          AllBrand,
          itemName,
          categoryName,
          AllCategory,
          group,
          company,
          bl
        } = filterOptions;
    
        // let apiURL = `/reports/daily-item-status?page=${page}&pageSize=${pageSize}`;
        let apiURL = `/reports/daily-item-status?storeName=${storeName}`;
    
        const filters = {
            // storeName,
            toDayDate,
            brandName,
            AllBrand,
            itemName,
            categoryName,
            AllCategory,
            group,
            company,
            bl
        };
    
        Object.keys(filters).forEach((key) => {
          if (filters[key]) {
            apiURL += `&${key}=${filters[key]}`;
          }
        });
        const getItemSalesData = await axiosInstance.get(apiURL);
        return getItemSalesData;
      } catch (error) {
        return error;
      }

}