import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { getAllBrands } from "../../../services/brandService";
import { getAllItemCategory } from "../../../services/categoryService";
import { getAllCustomer } from "../../../services/customerService";
import { DataGrid, GridFooterContainer, GridFooter, GridToolbar } from "@mui/x-data-grid";
import { getDailySalesDetails } from "../../../services/saleBillService";
import dayjs from "dayjs";
import { getAllItems } from "../../../services/itemService";

const DailySaleReport = () => {
  const [allBrands, setAllBrands] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [allSalesData, setAllSalesData] = useState([]);
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
    brandName: "",
    customerName: "",
    categoryName: "",
    group: "",
    itemName: "",
    billNo: "",
    volume: "",
  });
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPcs, setTotalPcs] = useState(0);

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      width: 90,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "itemName",
      headerName: "Item Name",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalPcs",
      headerName: "Total Pcs.",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "rate",
      headerName: "Rate",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalVolumeLiters",
      headerName: "Total Vol. Ltr.",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
  ];

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
  };

  const fetchAllBrands = async () => {
    try {
      const allBrandResponse = await getAllBrands();
      setAllBrands(allBrandResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllItems = async () => {
    try {
      const allItemsResponse = await getAllItems();
      setAllItems(allItemsResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching items. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllItemCategory = async () => {
    try {
      const allCategoryResponse = await getAllItemCategory();
      setAllCategory(allCategoryResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching categories. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllCustomers = async () => {
    try {
      const allCustomerResponse = await getAllCustomer();
      // console.log("allCustomerResponse ---> ", allCustomerResponse);
      setAllCustomerData(allCustomerResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      console.error("Error fetching brands:", error);
    }
  };

  const fetchAllSales = async () => {
    const fromDate = filterData.dateFrom
      ? formatDate(filterData.dateFrom)
      : null;
    const toDate = filterData.dateTo ? formatDate(filterData.dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        fromDate: fromDate,
        toDate: toDate,
        brandName: filterData.brandName,
        categoryName: filterData.categoryName,
        group: filterData.group,
        itemName: filterData.itemName,
        volume: filterData.volume,
      };
      const response = await getDailySalesDetails(filterOptions);
      console.log("Response salesData: ", response);

      if (response.status === 200) {
        setAllSalesData(response?.data?.data || []);
        setTotalCount(response.data.data.length || 0);
      } else {
        console.log("Error", response);
        NotificationManager.error("No items found.", "Error");
        setAllSalesData([]);
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching sales. Please try again later.",
        "Error"
      );
      console.log("Error fetching sales", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBrands();
    fetchAllItemCategory();
    fetchAllCustomers();
    fetchAllSales();
    fetchAllItems();
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetchAllSales, 300);
    debouncedFetch();
  }, [paginationModel, filterData]);

  useEffect(() => {
    const calculateSums = (data) => {
      let totalVolume = 0;
      let totalAmount = 0;
      let totalPcs = 0;

      data.forEach((item) => {
        totalVolume += item.totalVolumeLiters || 0;
        totalAmount += item.totalAmount || 0;
        totalPcs += item.totalPcs || 0;
      });

      console.log("total data: ", data);
      console.log("calculated totalVolume: ", totalVolume);
      console.log("calculated totalAmount: ", totalAmount);
      console.log("calculated totalPcs: ", totalPcs);

      return { totalVolume, totalAmount, totalPcs };
    };


    const { totalVolume, totalAmount, totalPcs } = calculateSums(allSalesData);
    setTotalVolume(totalVolume);
    setTotalAmount(totalAmount);
    setTotalPcs(totalPcs);
  }, [allSalesData]);

  const CustomFooter = () => {
    return (
      <GridFooterContainer sx={{margin: "0 14px"}}>
        <span>Total Volume: {totalVolume.toFixed(2) + "ltr"}</span>
        <span>Total Amount: {totalAmount.toFixed(2)}</span>
        <span>Total Pcs: {totalPcs.toFixed(0)}</span>
      </GridFooterContainer>
    );
  };

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Daily Sale Report
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Filter By:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="dateFrom" className="input-label">
              Date from:
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="dateFrom"
                format="DD/MM/YYYY"
                value={filterData.dateFrom}
                className="input-field date-picker"
                onChange={(newDate) =>
                  setFilterData({ ...filterData, dateFrom: newDate })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="dateTo" className="input-label">
              Date to:
            </InputLabel>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="dateTo"
                format="DD/MM/YYYY"
                value={filterData.dateTo}
                className="input-field date-picker"
                onChange={(newDate) =>
                  setFilterData({ ...filterData, dateTo: newDate })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="brandName" className="input-label">
              Brand:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="brandName"
              className="input-field"
              value={filterData.brandName}
              onChange={(e) =>
                setFilterData({ ...filterData, brandName: e.target.value })
              }
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
            >
              {allBrands?.map((brand) => (
                <MenuItem key={brand._id} value={brand.name}>
                  {brand.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="customerName" className="input-label">
              Customer:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="customerName"
              className="input-field"
              value={filterData.customerName}
              onChange={(e) =>
                setFilterData({ ...filterData, customerName: e.target.value })
              }
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
            >
              {allCustomerData?.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="categoryName" className="input-label">
              Category:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="categoryName"
              className="input-field"
              value={filterData.categoryName}
              onChange={(e) =>
                setFilterData({ ...filterData, categoryName: e.target.value })
              }
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
            >
              {allCategory?.map((category) => (
                <MenuItem key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="group" className="input-label">
              Group:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="group"
              className="input-field"
              value={filterData.group}
              onChange={(e) =>
                setFilterData({ ...filterData, group: e.target.value })
              }
            >
              {["FL", "BEER", "IML"].map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="itemName" className="input-label">
              Item:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="itemName"
              className="input-field"
              value={filterData.itemName}
              onChange={(e) =>
                setFilterData({ ...filterData, itemName: e.target.value })
              }
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
            >
              {allItems?.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="volume" className="input-label">
              Volume:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="volume"
              className="input-field"
              value={filterData.volume}
              onChange={(e) =>
                setFilterData({ ...filterData, volume: e.target.value })
              }
            />
          </div>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          "& button": { marginTop: 2 },
        }}
      >
        <Button
          color="inherit"
          size="small"
          variant="contained"
          onClick={() => {
            setFilterData({
              dateFrom: null,
              dateTo: null,
              brandName: "",
              customerName: "",
              categoryName: "",
              group: "",
              itemName: "",
              billNo: "",
              volume: "",
            });
            setPaginationModel({ page: 0, pageSize: 25 });
          }}
        >
          Clear Filters
        </Button>
        <div>
          <Button color="inherit" size="small" variant="contained">
            Print
          </Button>
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllSales}
            sx={{ marginLeft: 2 }}
          >
            Display
          </Button>
        </div>
      </Box>

      <Box
        sx={{
          height: 500,
          width: "80%",
          marginTop: 2,
          "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
          "& .custom-cell": { paddingLeft: 4 },
        }}
      >
        <DataGrid
          rows={(allSalesData || [])?.map((item, index) => ({
            id: index,
            sNo: index + 1,
            itemName: item._id || "No Data",
            totalPcs: item.totalPcs || "No Data",
            rate: item.rate || "No Data",
            totalVolumeLiters: item.totalVolumeLiters || "No Data",
            totalAmount: item.totalAmount || "No Data",
          }))}
          columns={columns}
          rowCount={totalCount}
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          pageSizeOptions={[10, 25, 50, 100]}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          sx={{ backgroundColor: "#fff" }}
          disableRowSelectionOnClick
          loading={loading}
          loadingOverlay={
            <Box>
              <CircularProgress />
            </Box>
          }
          slots={{
            footer: CustomFooter,
            toolbar: GridToolbar
          }}
        />
      </Box>
    </Box>
  );
};

export default DailySaleReport;
