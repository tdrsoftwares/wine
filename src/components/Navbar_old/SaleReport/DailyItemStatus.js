import {
  Autocomplete,
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
import DailyItemStatusPrintComponent from "./DailyItemStatusPrintComponent";
import { searchByBrandName, searchByItemName } from "../../../services/saleBillService";

import debounce from "lodash.debounce";
import { usePermissions } from "../../../utils/PermissionsContext";

const DailyItemStatus = () => {
  const todaysDate = dayjs();
  const [allItemStatusData, setAllItemStatusData] = useState([]);
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
  const [totalOpeningBalance, setTotalOpeningBalance] = useState("");
  const [totalClosingBalance, setTotalClosingBalance] = useState("");
  const [totalPurchased, setTotalPurchased] = useState("");
  const [totalSold, setTotalSold] = useState("");
  const [totalTransferredFrom, setTotalTransferredFrom] = useState("");
  const [totalTransferredTo, setTotalTransferredTo] = useState("");
  const [itemName, setItemName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [brandNameOptions, setBrandNameOptions] = useState([]);

  const { permissions, role } = usePermissions();

  const reportsPermissions =
    permissions?.find((permission) => permission.moduleName === "Reports")
      ?.permissions || [];
  const canRead = reportsPermissions.includes("read");

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

  const fetchAllCategory = async () => {
    try {
      const getAllCategoryResponse = await getAllItemCategory();
      if (getAllCategoryResponse.status === 200) {
        setAllCategory(getAllCategoryResponse?.data?.data);
      } else {
        // NotificationManager.error("No category found." , "Error");
        setAllCategory([])
      }
    } catch (err) {
      // NotificationManager.error(
      //   "Something went Wrong, Please try again later.",
      //   "Error"
      // );
    }
  };

  const fetchAllCompanies = async () => {
    try {
      const allCompaniesResponse = await getAllCompanies();
      // console.log("allCompaniesResponse ---> ", allCompaniesResponse);
      if (allCompaniesResponse.status === 200) {
        setAllCompanies(allCompaniesResponse?.data?.data);
      } else {
        // NotificationManager.error("No companies found." , "Error");
        setAllCompanies([]);

      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching companies. Please try again later.",
      //   "Error"
      // );
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
        // NotificationManager.error("No stores found", "Error");
        setAllStores([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching stores. Please try again later.",
      //   "Error"
      // );
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
        // NotificationManager.error("No items found.", "Error");
        setAllItemStatusData([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching items. Please try again later.",
      //   "Error"
      // );
      console.log("Error fetching items", error);
    } finally {
      setLoading(false);
    }
  };

  const itemNameSearch = debounce(async (searchText) => {
    try {
      const response = await searchByItemName(searchText);
      if (response?.data?.data && response.data.data.length > 0) {
        setItemNameOptions(response.data.data);
      } else {
        setItemNameOptions([]);
      }
    } catch (error) {
      console.error("Error searching items:", error);
      setItemNameOptions([]);
    }
  }, 500);

  const brandNameSearch = debounce(async (searchText) => {
    try {
      const response = await searchByBrandName(searchText);
      const brandsData = response?.data?.data || [];
  
      const allBrandsOption = { name: "All Brands" };
      const updatedBrandsData = [allBrandsOption, ...brandsData];
  
      setBrandNameOptions(updatedBrandsData);
    } catch (error) {
      console.error("Error searching brand:", error);
      setBrandNameOptions([{ name: "All Brands" }]);
    }
  }, 500);
  

  const handleItemNameChange = (event, newValue) => {
    setItemName(newValue);
    setFilterData((prevData) => ({ ...prevData, itemName: newValue }));
  };

  const handleBrandNameChange = (event, newValue) => {
    setBrandName(newValue);
    
    if (newValue === "All Brands") {
      setFilterData((prevData) => ({ ...prevData, brandName: "All Brands" }));
    } else {
      setFilterData((prevData) => ({ ...prevData, brandName: newValue }));
    }
  };
  

  useEffect(() => {
    fetchAllCompanies();
    fetchAllCategory();
    fetchAllStores();
  }, []);

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setFilterData({ ...filterData, brandName: selectedBrand });
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetchAllItemStatus, 300);
    // console.log("debounce effect runs...");
    if (filterData.storeName) {
      debouncedFetch();
    }
  }, [filterData]);


  useEffect(() => {
    const totalOpeningBal = allItemStatusData?.reduce(
      (sum, row) => sum + row.openingBalance,
      0
    );
    setTotalOpeningBalance(totalOpeningBal);

    const totalPur = allItemStatusData?.reduce(
      (sum, row) => sum + row.totalPurchased,
      0
    );
    setTotalPurchased(totalPur);

    const totalSolds = allItemStatusData?.reduce(
      (sum, row) => sum + row.totalSold,
      0
    );
    setTotalSold(totalSolds);

    const totalTransferFrom = allItemStatusData?.reduce(
      (sum, row) => sum + row.totalTransferredFrom,
      0
    );
    setTotalTransferredFrom(totalTransferFrom);

    const totalTransferTo = allItemStatusData?.reduce(
      (sum, row) => sum + row.totalTransferredTo,
      0
    );
    setTotalTransferredTo(totalTransferTo);

    const totalClosingBal = allItemStatusData?.reduce(
      (sum, row) => sum + row.closingBalance,
      0
    );
    setTotalClosingBalance(totalClosingBal);
  }, [fetchAllItemStatus]);

  
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
      <Box sx={{ p: 2, minWidth: "900px" }}>
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
              <InputLabel htmlFor="itemName" className="input-label">
                Item:
              </InputLabel>
              <Autocomplete
                options={itemNameOptions.map((option) => option.name)}
                value={itemName}
                onChange={handleItemNameChange}
                onInputChange={(event, newInputValue) => {
                  itemNameSearch(newInputValue);
                }}
                className="input-field"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    name="itemName"
                  />
                )}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="brandName" className="input-label">
                Brand:
              </InputLabel>
              <Autocomplete
                options={brandNameOptions.map((option) => option.name)}
                value={brandName}
                onChange={handleBrandNameChange}
                onInputChange={(event, newInputValue) => {
                  brandNameSearch(newInputValue);
                }}
                className="input-field"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    name="brandName"
                  />
                )}
              />
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
                className="input-field"
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
                className="input-field"
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
                className="input-field"
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
            gap: 1,
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
              setItemName("");
              setBrandName("");
              setItemNameOptions([]);
              setBrandNameOptions([]);
              setPaginationModel({ page: 0, pageSize: 10 });
              setAllItemStatusData([]);
            }}
          >
            Clear Filters
          </Button>
          <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={handlePrint}
            // sx={{ marginLeft: 2 }}
            disabled={!canRead && role !== "admin"}
          >
            Print
          </Button>
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllItemStatus}
            // sx={{ marginLeft: 2 }}
            disabled={!canRead && role !== "admin"}
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
          {canRead || role === "admin" ? (
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
                footer: {
                  allItemStatusData,
                  filterData,
                  totalOpeningBalance,
                  totalClosingBalance,
                  totalPurchased,
                  totalSold,
                  totalTransferredFrom,
                  totalTransferredTo,
                },
              }}
              sx={{
                backgroundColor: "#fff",
                fontSize: "12px",
              }}
            />
          ) : (
            <Typography variant="body1" color="red">
              You do not have permission to view this data.
            </Typography>
          )}
        </Box>

        <div style={{ display: "none" }}>
          <DailyItemStatusPrintComponent
            ref={printRef}
            filterData={filterData}
            allItemStatusData={allItemStatusData}
            totalOpeningBalance={totalOpeningBalance}
            totalClosingBalance={totalClosingBalance}
            totalPurchased={totalPurchased}
            totalSold={totalSold}
          />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default DailyItemStatus;
