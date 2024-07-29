import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { getAllCustomer } from "../../../services/customerService";
import { NotificationManager } from "react-notifications";
import { getAllItems } from "../../../services/itemService";
import { getAllBrands } from "../../../services/brandService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { getItemWiseSaleDetails } from "../../../services/saleBillService";
import { getAllItemCategory } from "../../../services/categoryService";
import { customTheme } from "../../../utils/customTheme";

const ItemWiseSaleReport = () => {
  const [allSalesData, setAllSalesData] = useState([]);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
    batchNo: "",
    customerName: "",
    categoryName: "",
    brandName: "",
    itemName: "",
    itemCode: "",
    supplierName: "",
    series: "",
    group: "",
    userName: "",
    billNo: "",
    pack: "",
    phone: "",
  });
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      width: 90,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "billDate",
      headerName: "Bill Date",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "billNo",
      headerName: "Bill No.",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "billType",
      headerName: "Bill Type",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "itemCode",
      headerName: "Item Code",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "itemName",
      headerName: "Item Name",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "brandName",
      headerName: "Brand",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "categoryName",
      headerName: "Category",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "customerName",
      headerName: "Customer",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "batchNo",
      headerName: "Batch No.",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "series",
      headerName: "Series",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "group",
      headerName: "Group",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "mrp",
      headerName: "MRP",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "pcs",
      headerName: "Pcs.",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "pack",
      headerName: "Pack",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },

    {
      field: "rate",
      headerName: "Rate",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "broken",
      headerName: "Break",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    // {
    //   field: "split",
    //   headerName: "Split",
    //   width: 150,
    //   cellClassName: "custom-cell",
    //   headerClassName: "custom-header",
    // },
    {
      field: "itemAmount",
      headerName: "Amount",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
  ];

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
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
        pageSize: paginationModel.pageSize,
        fromDate: fromDate,
        toDate: toDate,
        customerName: filterData.customerName,
        categoryName: filterData.categoryName,
        brandName: filterData.brandName,
        itemName: filterData.itemName,
        itemCode: filterData.itemCode,
        supplierName: filterData.supplierName,
        batchNo: filterData.batchNo,
        series: filterData.series,
        groupName: filterData.group,
        billNo: filterData.billNo,
        volume: filterData.pack,
      };
      const response = await getItemWiseSaleDetails(filterOptions);
      // console.log("Response salesData: ", response);

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

  const fetchAllCustomers = async () => {
    try {
      const allCustomerResponse = await getAllCustomer();
      // console.log("allCustomerResponse ---> ", allCustomerResponse);

      if (allCustomerResponse.status === 200) {
        setAllCustomerData(allCustomerResponse?.data?.data);
      } else {
        setAllCustomerData([]);
        NotificationManager.error("No Customers Found", "Error");
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      console.error("Error fetching brands:", error);
    }
  };

  const fetchAllItems = async () => {
    try {
      const allItemsResponse = await getAllItems();
      if (allItemsResponse.status === 200) {
        setAllItems(allItemsResponse?.data?.data);
      }
      else {
        NotificationManager.error("No items found." , "Error");
        setAllItems([]);

      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching items. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllBrands = async () => {
    try {
      const allBrandsResponse = await getAllBrands();
      // console.log("allBrandsResponse ---> ", allBrandsResponse);
      if (allBrandsResponse.status === 200) {
        setAllBrands(allBrandsResponse?.data?.data);
      } else {
        setAllBrands([])
        NotificationManager.error("No brands found." , "Error");
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      console.error("Error fetching brands:", error);
    }
  };

  const fetchAllCategory = async () => {
    try {
      const getAllCategoryResponse = await getAllItemCategory();
      if (getAllCategoryResponse.status === 200) {
        setAllCategory(getAllCategoryResponse?.data?.data);
      } else {
        NotificationManager.error("No category found." , "Error");
        setAllCategory([])
      }
    } catch (err) {
      NotificationManager.error(
        "Something went Wrong, Please try again later.",
        "Error"
      );
    }
  };

  useEffect(() => {
    fetchAllBrands();
    fetchAllItems();
    fetchAllCustomers();
    fetchAllSales();
    fetchAllCategory();
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

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Item Wise Sale Report:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
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
              <InputLabel htmlFor="brandName" className="input-label">
                Brand:
              </InputLabel>
              <TextField
                
                fullWidth
                size="small"
                name="brandName"
                className="input-field"
                value={filterData.brandName}
                onChange={(e) =>
                  setFilterData({ ...filterData, brandName: e.target.value })
                }
              />
                
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemName" className="input-label">
                Item:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="itemName"
                className="input-field"
                value={filterData.itemName}
                onChange={(e) =>
                  setFilterData({ ...filterData, itemName: e.target.value })
                }
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemCode" className="input-label">
                ItemCode:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="itemCode"
                className="input-field"
                value={filterData.itemCode}
                onChange={(e) =>
                  setFilterData({ ...filterData, itemCode: e.target.value })
                }
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="batchNo" className="input-label">
                Batch No.:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="batchNo"
                className="input-field"
                value={filterData.batchNo}
                onChange={(e) =>
                  setFilterData({ ...filterData, batchNo: e.target.value })
                }
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="series" className="input-label">
                Series:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="series"
                className="input-field"
                value={filterData.series}
                onChange={(e) =>
                  setFilterData({ ...filterData, series: e.target.value })
                }
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="categoryName" className="input-label">
                Category :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="categoryName"
                className="input-field"
                variant="outlined"
                value={filterData.categoryName}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  },
                }}
                onChange={(e) =>
                  setFilterData({ ...filterData, categoryName: e.target.value })
                }
              >
                {allCategory?.map((item) => (
                  <MenuItem key={item._id} value={item.categoryName}>
                    {item.categoryName}
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
              <InputLabel htmlFor="billNo" className="input-label">
                Bill No:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="billNo"
                className="input-field"
                value={filterData.billNo}
                onChange={(e) =>
                  setFilterData({ ...filterData, billNo: e.target.value })
                }
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="volume" className="input-label">
                Pack:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="volume"
                className="input-field"
                value={filterData.pack}
                onChange={(e) =>
                  setFilterData({ ...filterData, pack: e.target.value })
                }
              />
            </div>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
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
                batchNo: "",
                customerName: "",
                brandName: "",
                itemName: "",
                itemCode: "",
                supplierName: "",
                series: "",
                group: "",
                userName: "",
                billNo: "",
                pack: "",
                phone: "",
              });
              setPaginationModel({ page: 0, pageSize: 10 });
              // fetchAllSales();
            }}
            // sx={{ borderRadius: 8 }}
          >
            Clear Filters
          </Button>
          {/* <div>
            <Button
              color="inherit"
              size="small"
              variant="contained"
              // sx={{ borderRadius: 8 }}
            >
              Print
            </Button> */}
            <Button
              color="info"
              size="small"
              variant="contained"
              onClick={fetchAllSales}
              sx={{ marginLeft: 2 }}
            >
              Display
            </Button>
          {/* </div> */}
        </Box>

        <Box
          sx={{
            height: 500,
            width: "100%",
            marginTop: 2,
            "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
            "& .custom-cell": { paddingLeft: 4 },
          }}
        >
          <DataGrid
            rows={(allSalesData || [])?.map((item, index) => ({
              id: index,
              sNo: index + 1,
              createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
              billDate: item.billDate || "No Data",
              billNo: item.billNo || "No Data",
              billType: item.billType || "No Data",
              itemCode: item.salesItems?.itemCode || "No Data",
              itemName: item?.salesItems?.item?.name || "No Data",
              brandName: item.salesItems?.item?.brand?.name || "No Data",
              categoryName: item?.item?.category?.categoryName || "No Data",
              customerName: item?.customer?.name || "No Data",
              batchNo: item.salesItems?.batchNo || "No Data",
              brokenNo: item.brokenNo || "No Data",
              caseNo: item.caseNo || "No Data",
              pcs: item.salesItems?.pcs || "No Data",
              pack: item.salesItems?.item?.volume || "No Data",
              series: item.billSeries || "No Data",
              group: item.salesItems?.item?.group || "No Data",
              // updatedAt: new Date(item.updatedAt).toLocaleDateString("en-GB"),
              mrp: item.salesItems?.mrp || "No Data",
              rate: item.salesItems?.rate || "No Data",
              broken: item.salesItems?.break || "No Data",
              // split: item.salesItems?.split || "No Data",
              itemAmount: item.salesItems?.amount || "No Data",
            }))}
            columns={columns}
            rowCount={totalCount}
            pagination
            paginationMode="server"
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
              toolbar: GridToolbar,
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  page: paginationModel.page,
                  pageSize: paginationModel.pageSize,
                },
                rowCount: totalCount,
              },
              density: "compact",
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ItemWiseSaleReport;
