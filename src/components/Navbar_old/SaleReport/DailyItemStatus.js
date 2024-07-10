import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { customTheme } from "../../../utils/customTheme";
import dayjs from "dayjs";
import { getAllCompanies } from "../../../services/companyService";
import { NotificationManager } from "react-notifications";
import { getAllItems } from "../../../services/itemService";
import { getAllBrands } from "../../../services/brandService";
import { getAllItemCategory } from "../../../services/categoryService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getAllStores } from "../../../services/storeService";
import { getAllItemStatuses } from "../../../services/dailyitemStatusService";

const DailyItemStatus = () => {
  const [allItemStatusData, setAllItemStatusData] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
    company: "",
    brandName: "",
    itemName: "",
    group: "",
    categoryName: "",
    storeName: "",
  });
  const [allCompanies, setAllCompanies] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [allStores, setAllStores] = useState([]);
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
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "item",
      headerName: "Item Name",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "openingBalance",
      headerName: "Opening Balance",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalPurchased",
      headerName: "Total Purchased",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalTransferredFrom",
      headerName: "Total Transfered from",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalTransferredTo",
      headerName: "Total Transfered to",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalSold",
      headerName: "Total Sold",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "closingBalance",
      headerName: "Closing Balance",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    // {
    //   field: "storeName",
    //   headerName: "Store Name",
    //   flex: 1,
    //   cellClassName: "custom-cell",
    //   headerClassName: "custom-header",
    // },
  ];

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
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

  const fetchAllCategory = async () => {
    try {
      const getAllCategoryResponse = await getAllItemCategory();
      setAllCategory(getAllCategoryResponse?.data?.data);
    } catch (err) {
      NotificationManager.error(
        "Something went Wrong, Please try again later.",
        "Error"
      );
    }
  };

  

  const fetchAllCompanies = async () => {
    try {
      const allCompaniesResponse = await getAllCompanies();
      // console.log("allCompaniesResponse ---> ", allCompaniesResponse);
      setAllCompanies(allCompaniesResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching companies. Please try again later.",
        "Error"
      );
      console.error("Error fetching companies:", error);
    }
  };

  const fetchAllStores = async () => {
    try {
      const allStoresResponse = await getAllStores();
      // console.log("allStoresResponse ---> ", allStoresResponse);
      setAllStores(allStoresResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching stores. Please try again later.",
        "Error"
      );
      console.error("Error fetching stores:", error);
    }
  };

  const fetchAllItemStatus = async () => {
    const fromDate = filterData.dateFrom
      ? formatDate(filterData.dateFrom)
      : null;
    const toDate = filterData.dateTo ? formatDate(filterData.dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        toDate: toDate,
        categoryName: filterData.categoryName,
        company: filterData.company,
        brandName: filterData.brandName,
        itemName: filterData.itemName,
        groupName: filterData.group,
        storeName: filterData.storeName,
      };
      const response = await getAllItemStatuses(filterOptions);
      // console.log("Response salesData: ", response);

      if (response.status === 200) {
        setAllItemStatusData(response?.data?.data || []);
        setTotalCount(response.data.data.length || 0);
      } else {
        // console.log("Error", response);
        NotificationManager.error("No items found.", "Error");
        setAllItemStatusData([]);
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
    fetchAllItems();
    fetchAllCompanies();
    fetchAllCategory();
    fetchAllStores();
    fetchAllItemStatus();
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Daily Item Status
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Filter By:
        </Typography>

        <Grid container spacing={2}>
          {/* <Grid item xs={3}>
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
          </Grid> */}

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
                  className="date-picker"
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
              <InputLabel htmlFor="itemName" className="input-label">
                Item:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="itemName"
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

          {/* <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemCode" className="input-label">
                ItemCode:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="itemCode"
                value={filterData.itemCode}
                onChange={(e) =>
                  setFilterData({ ...filterData, itemCode: e.target.value })
                }
              />
            </div>
          </Grid> */}

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
              <InputLabel htmlFor="company" className="input-label">
                Company :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="company"
                value={filterData.company}
                onChange={(e) =>
                  setFilterData({ ...filterData, company: e.target.value })
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
                {allCompanies?.map((item) => (
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
                Category :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="categoryName"
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
              <InputLabel htmlFor="storeName" className="input-label">
              Store Name :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="storeName"
                value={filterData.storeName}
                onChange={(e) =>
                  setFilterData({ ...filterData, storeName: e.target.value })
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
                {allStores?.map((store) => (
                  <MenuItem key={store._id} value={store.name}>
                    {store.name}
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
                company: "",
                brandName: "",
                categoryName: "",
                itemName: "",
                group: "",
                storeName: "",
              });
              setPaginationModel({ page: 0, pageSize: 10 });
              // fetchAllSales();
            }}
          >
            Clear Filters
          </Button>
          <div>
            <Button
              color="inherit"
              size="small"
              variant="contained"
            >
              Print
            </Button>
            <Button
              color="info"
              size="small"
              variant="contained"
              onClick={fetchAllItemStatus}
              sx={{ marginLeft: 2 }}
            >
              Display
            </Button>
          </div>
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
            rows={(allItemStatusData || [])?.map((item, index) => ({
              id: index,
              sNo: index + 1,
              item: item.item || "No Data",
              openingBalance: item.openingBalance || 0,
              totalPurchased: item.totalPurchased || 0,
              totalTransferredFrom: item.totalTransferredFrom || "No Data",
              totalTransferredTo: item.totalTransferredTo || "No Data",
              // itemName: item.salesItems?.item?.name || "No Data",
              // brandName: item.salesItems?.item?.brand?.name || "No Data",
              // categoryName: item.item?.category?.categoryName || "No Data",
              totalSold: item.totalSold || 0,
              closingBalance: item.closingBalance || 0,
              // group: item.salesItems?.item?.group || "No Data",
              
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

export default DailyItemStatus;
