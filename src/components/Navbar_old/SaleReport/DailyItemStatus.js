import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import CustomItemStatusFooter from "./CustomItemStatusFooter";
import ReactToPrint, { useReactToPrint } from "react-to-print";

const DailyItemStatus = () => {
  const todaysDate = dayjs();
  const [allItemStatusData, setAllItemStatusData] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: todaysDate,
    company: "",
    brandName: "",
    itemName: "",
    group: "",
    categoryName: "",
    // storeName: allStores.length > 0 ? allStores[0] : "",
    storeName: "",
    isBLTrue: false,
  });
  const [allCompanies, setAllCompanies] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const printRef = useRef();

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
      headerName: "Opening Stock",
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
      headerName: "Total Transfer Out",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalTransferredTo",
      headerName: "Total Transfer In",
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
      headerName: "Closing Stock",
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
  // console.log(allBrands)

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

  const fetchAllCompanies = async () => {
    try {
      const allCompaniesResponse = await getAllCompanies();
      // console.log("allCompaniesResponse ---> ", allCompaniesResponse);
      if (allCompaniesResponse.status === 200) {
        setAllCompanies(allCompaniesResponse?.data?.data);
      } else {
        NotificationManager.error("No companies found." , "Error");
        setAllCompanies([]);

      }
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
      // console.log("allStore response: ", allStoresResponse)
      
      if (allStoresResponse.status === 200) {
        setAllStores(allStoresResponse?.data?.data);
      } else {
        NotificationManager.error("No stores found", "Error");
        setAllStores([]);
      }
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
        // page: paginationModel.page + 1,
        // pageSize: paginationModel.pageSize,
        toDayDate: toDate,
        company: filterData.company,
        itemName: filterData.itemName,
        group: filterData.group,
        storeName: filterData.storeName,
        bl: filterData.isBLTrue,
      };
      // console.log("filterData:", filterData)

      if (filterData.brandName === "All Brands") {
        filterOptions.AllBrand = true;
      } else {
        filterOptions.brandName = filterData.brandName;
      }

      if (filterData.categoryName === "All Categories") {
        filterOptions.AllCategory = true;
      } else {
        filterOptions.categoryName = filterData.categoryName;
      }

      const response = await getAllItemStatuses(filterOptions);
      const itemStatusData = response?.data?.data;
      // console.log("Response itemStatusData: ", itemStatusData);

      if (itemStatusData) {
        setAllItemStatusData(itemStatusData || []);
        setTotalCount(itemStatusData?.length || 0);
      } else {
        // console.log("Error", response);
        NotificationManager.error("No items found.", "Error");
        setAllItemStatusData([]);
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching items. Please try again later.",
        "Error"
      );
      console.log("Error fetching items", error);
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
    // fetchAllItemStatus();
  }, []);

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setFilterData({ ...filterData, brandName: selectedBrand });
  };

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
    const debouncedFetch = debounce(fetchAllItemStatus, 300);
    // console.log("debounce effect runs...");
    if (filterData.storeName) {
      debouncedFetch();
    }
  }, [filterData]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const flattenItemStatusData = (data) => {
    let flattenedData = [];
    data.forEach((item, index) => {
      if (item.items && Array.isArray(item.items)) {
        item.items.forEach((nestedItem, nestedIndex) => {
          flattenedData.push({
            id: `${index}-${nestedIndex}`,
            sNo: flattenedData.length + 1,
            item: nestedItem.item,
            openingBalance: filterData.isBLTrue
              ? nestedItem.openingBalance?.toFixed(3)
              : nestedItem.openingBalance,
            totalPurchased: filterData.isBLTrue
              ? nestedItem.totalPurchased?.toFixed(3)
              : nestedItem.totalPurchased,
            totalTransferredFrom: filterData.isBLTrue
              ? nestedItem.totalTransferredFrom?.toFixed(3)
              : nestedItem.totalTransferredFrom,
            totalTransferredTo: filterData.isBLTrue
              ? nestedItem.totalTransferredTo?.toFixed(3)
              : nestedItem.totalTransferredTo,
            totalSold: filterData.isBLTrue
              ? nestedItem.totalSold?.toFixed(3)
              : nestedItem.totalSold,
            closingBalance: filterData.isBLTrue
              ? nestedItem.closingBalance?.toFixed(3)
              : nestedItem.closingBalance,
          });
        });

        // Subtotal row
        flattenedData.push({
          id: `${index}-subtotal`,
          sNo: item.brand
            ? `Subtotal (${item.brand})`
            : `Subtotal (${item.category})`,
          item: null,
          openingBalance: filterData.isBLTrue
            ? item.openingBalance?.toFixed(3)
            : item.openingBalance,
          totalPurchased: filterData.isBLTrue
            ? item.totalPurchased?.toFixed(3)
            : item.totalPurchased,
          totalTransferredFrom: filterData.isBLTrue
            ? item.totalTransferredFrom?.toFixed(3)
            : item.totalTransferredFrom,
          totalTransferredTo: filterData.isBLTrue
            ? item.totalTransferredTo?.toFixed(3)
            : item.totalTransferredTo,
          totalSold: filterData.isBLTrue
            ? item.totalSold?.toFixed(3)
            : item.totalSold,
          closingBalance: filterData.isBLTrue
            ? item.closingBalance?.toFixed(3)
            : item.closingBalance,
        });
      } else {
        flattenedData.push({
          id: index,
          sNo: index + 1,
          item: item.item,
          openingBalance: filterData.isBLTrue
            ? item.openingBalance?.toFixed(3)
            : item.openingBalance,
          totalPurchased: filterData.isBLTrue
            ? item.totalPurchased?.toFixed(3)
            : item.totalPurchased,
          totalTransferredFrom: filterData.isBLTrue
            ? item.totalTransferredFrom?.toFixed(3)
            : item.totalTransferredFrom,
          totalTransferredTo: filterData.isBLTrue
            ? item.totalTransferredTo?.toFixed(3)
            : item.totalTransferredTo,
          totalSold: filterData.isBLTrue
            ? item.totalSold?.toFixed(3)
            : item.totalSold,
          closingBalance: filterData.isBLTrue
            ? item.closingBalance?.toFixed(3)
            : item.closingBalance,
        });
      }
    });
    return flattenedData;
  };

  const rows = flattenItemStatusData(allItemStatusData);

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
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="dateTo" className="input-label">
                Date :
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
                value={filterData.brandName || ""}
                onChange={handleBrandChange}
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
                <MenuItem value="All Brands">All Brands</MenuItem>
                {allBrands?.map((brand) => (
                  <MenuItem key={brand._id} value={brand.name}>
                    {`${brand.name}`}
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
                <MenuItem value="All Categories">All Categories</MenuItem>
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

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="blOnly" className="input-label">
                BL Only:
              </InputLabel>
              <Checkbox
                name="blOnly"
                checked={filterData.isBLTrue}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) =>
                  setFilterData({ ...filterData, isBLTrue: e.target.checked })
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
                dateTo: todaysDate,
                company: "",
                brandName: "",
                categoryName: "",
                itemName: "",
                group: "",
                storeName: "",
                isBLTrue: false,
              });
              setPaginationModel({ page: 0, pageSize: 10 });
              setAllItemStatusData([]);
            }}
          >
            Clear Filters
          </Button>
          {/* <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={handleExportCSV}
              sx={{ marginLeft: 2 }}
            >
              Export CSV
            </Button> */}
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllItemStatus}
            sx={{ marginLeft: 2 }}
          >
            Display
          </Button>
        </Box>

        <Box
          sx={{
            height: 500,
            width: "100%",
            marginTop: 1,
            "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
            "& .custom-cell": { paddingLeft: 4 },
          }}
        >
          <DataGrid
            rows={rows}
            getRowId={(row) => row.id}
            columns={columns}
            rowCount={totalCount}
            pagination
            paginationMode="server"
            pageSizeOptions={[10, 25, 50, 100]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            disableRowSelectionOnClick
            loading={loading}
            loadingOverlay={
              <Box>
                <CircularProgress />
              </Box>
            }
            initialState={{
              density: "compact",
            }}
            slots={{
              footer: CustomItemStatusFooter,
              toolbar: GridToolbar,
            }}
            slotProps={{
              // toolbar: {
              //   printOptions: {
              //     hideFooter: false,
              //     hideToolbar: true,
              //   },
              // },
              footer: { allItemStatusData, filterData },
            }}
            sx={{
              backgroundColor: "#fff",
              fontSize: "12px",
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DailyItemStatus;
