import {
  Autocomplete,
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
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getAllItems } from "../../../services/itemService";
import { getAllItemCategory } from "../../../services/categoryService";
import { customTheme } from "../../../utils/customTheme";
import { exportItemTransferDetails, getItemTransferDetails } from "../../../services/transferService";
import { getAllStores } from "../../../services/storeService";
import { getAllBrands } from "../../../services/brandService";
import debounce from "lodash.debounce";
import {
  searchByBrandName,
  searchByItemName,
} from "../../../services/saleBillService";
import { usePermissions } from "../../../utils/PermissionsContext";
import * as XLSX from "xlsx";


const ItemTransferReport = () => {
  const [allTransfers, setAllTransfers] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [brandName, setBrandName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [brandNameOptions, setBrandNameOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
    categoryName: "",
    brandName: "",
    itemName: "",
    itemCode: "",
    group: "",
    storeName: "",
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const { permissions, role } = usePermissions();

  const reportsPermissions =
    permissions?.find((permission) => permission.moduleName === "Reports")
      ?.permissions || [];
  const canRead = reportsPermissions.includes("read");

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
  };

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      width: 90,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "transferDate",
      headerName: "Transfer Date",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "transferFrom",
      headerName: "Transfer from",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "transferTo",
      headerName: "Transfer To",
      width: 150,
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
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "transferNo",
      headerName: "Transfer No.",
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
      field: "totalVolumeLiters",
      headerName: "Total Volume (ltr.)",
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
      field: "caseNo",
      headerName: "Case",
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
      field: "volume",
      headerName: "Volume",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "group",
      headerName: "Group",
      width: 150,
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
  ];

  const fetchAllTransfer = async () => {
    const fromDate = filterData.dateFrom
      ? formatDate(filterData.dateFrom)
      : null;
    const toDate = filterData.dateTo ? formatDate(filterData.dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        page:
          paginationModel.page === 0
            ? paginationModel.page + 1
            : paginationModel.page,
        pageSize: paginationModel.pageSize,
        fromDate: fromDate,
        toDate: toDate,
        itemCode: filterData.itemCode,
        itemName: filterData.itemName,
        storeName: filterData.storeName,
        categoryName: filterData.categoryName,
        brandName: filterData.brandName,
        group: filterData.group,
      };

      const response = await getItemTransferDetails(filterOptions);
      const itemsData = response?.data?.data;
      // console.log("itemsDataResponse: ", itemsData);

      if (itemsData) {
        setAllTransfers(itemsData || []);
        setTotalCount(itemsData?.length || 0);
      } else {
        console.log("Error", response);
        // NotificationManager.error("No transfers found.", "Error");
        setAllTransfers([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching purchases. Please try again later.",
      //   "Error"
      // );
      console.log("Error fetching purchases", error);
    } finally {
      setLoading(false);
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

  const fetchAllCategory = async () => {
    try {
      const getAllCategoryResponse = await getAllItemCategory();
      if (getAllCategoryResponse.status === 200) {
        setAllCategory(getAllCategoryResponse?.data?.data);
      } else {
        // NotificationManager.error("No category found." , "Error");
        setAllCategory([]);
      }
    } catch (err) {
      // NotificationManager.error(
      //   "Something went Wrong, Please try again later.",
      //   "Error"
      // );
      console.error(err);
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
      if (response?.data?.data && response.data.data.length > 0) {
        setBrandNameOptions(response.data.data);
      } else {
        setBrandNameOptions([]);
      }
    } catch (error) {
      console.error("Error searching brand:", error);
      setBrandNameOptions([]);
    }
  }, 500);

  const handleItemNameChange = (event, newValue) => {
    setItemName(newValue);
    setFilterData((prevData) => ({ ...prevData, itemName: newValue }));
  };

  const handleBrandNameChange = (event, newValue) => {
    setBrandName(newValue);
    setFilterData((prevData) => ({ ...prevData, brandName: newValue }));
  };

  useEffect(() => {
    fetchAllStores();
    fetchAllCategory();
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce(fetchAllTransfer, 300);
    if (filterData.storeName) {
      debouncedFetch();
    }
  }, [paginationModel, filterData]);

  const exportToExcel = async () => {
    const fromDate = filterData.dateFrom
      ? formatDate(filterData.dateFrom)
      : null;
    const toDate = filterData.dateTo ? formatDate(filterData.dateTo) : null;

    const filterOptions = {
      fromDate: fromDate,
      toDate: toDate,
      itemCode: filterData.itemCode,
      itemName: filterData.itemName,
      storeName: filterData.storeName,
      categoryName: filterData.categoryName,
      brandName: filterData.brandName,
      group: filterData.group,
    };
    // console.log("filterOptions: ",filterOptions)

    try {
      const response = await exportItemTransferDetails(filterOptions);
      const exportData = response?.data?.data;
      // console.log("exportData: ", exportData);

      const dataToExport = (exportData || []).map((item, index) => ({
        "S. No": index + 1,
        "Transfer Date": item.transferDate,
        "Transfer From": item.transferFrom?.name,
        "Transfer To": item.transferTo?.name,
        "Item Code":
          item.stocktransferitems?.itemDetails?.itemCode ||
          item.stocktransferitems?.itemCode,
        "Item Name": item.stocktransferitems?.item?.name,
        "Transfer No.": item.transferNo,
        Brand: item.stocktransferitems?.item?.brand?.name,
        Category:
          item.stocktransferitems?.item?.category?.categoryName,
        batch:
          item.stocktransferitems?.itemDetails?.batchNo ||
          item.stocktransferitems?.batchNo,
        "Case No.":
          item.stocktransferitems?.itemDetails?.case ||
          item.stocktransferitems?.case,
        Pcs: item.stocktransferitems?.pcs,
        Volume: item.stocktransferitems?.item?.volume,
        "Total Volume Liters": item.totalVolumeLiters,
        Group: item.stocktransferitems?.item?.group,
        MRP:
          item.stocktransferitems?.itemDetails?.mrp ||
          item.stocktransferitems?.mrp,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "ItemWiseTransferReport");

      XLSX.writeFile(workbook, "ItemWise_Transfer_Report.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Item Wise Transfer Report:
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>Filter By:</Typography>

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
              <InputLabel htmlFor="storeName" className="input-label">
                Stock In :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                className="input-field"
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
                <MenuItem value="">None</MenuItem>
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
              <InputLabel htmlFor="itemCode" className="input-label">
                ItemCode:
              </InputLabel>
              <TextField
                fullWidth
                name="itemCode"
                className="input-field"
                size="small"
                value={filterData.itemCode}
                onChange={(e) =>
                  setFilterData({ ...filterData, itemCode: e.target.value })
                }
              />
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
                <MenuItem value="">None</MenuItem>
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
              <InputLabel htmlFor="group" className="input-label">
                Group:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                className="input-field"
                value={filterData.group}
                onChange={(e) =>
                  setFilterData({ ...filterData, group: e.target.value })
                }
                required
              >
                <MenuItem value="">None</MenuItem>
                {["FL", "BEER", "IML"]?.map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
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
            gap: 1,
            "& button": { marginTop: 1 },
          }}
        >
          <Button
            color="success"
            size="small"
            variant="contained"
            onClick={exportToExcel}
            disabled={!canRead && role !== "admin"}
          >
            Export to Excel
          </Button>

          <div>
            <Button
              color="inherit"
              size="small"
              variant="contained"
              onClick={() => {
                setFilterData({
                  dateFrom: null,
                  dateTo: null,
                  categoryName: "",
                  brandName: "",
                  itemName: "",
                  itemCode: "",
                  group: "",
                  storeName: "",
                });
                setAllTransfers([])
                setItemName("");
                setBrandName("");
                setItemNameOptions([]);
                setBrandNameOptions([]);
                setPaginationModel({ page: 1, pageSize: 10 });
              }}
            >
              Clear Filters
            </Button>

            <Button
              color="info"
              size="small"
              variant="contained"
              onClick={fetchAllTransfer}
              sx={{ marginLeft: 1 }}
              disabled={!canRead && role !== "admin"}
            >
              Display
            </Button>
          </div>
        </Box>

        <Box
          sx={{
            height: 450,
            width: "100%",
            marginTop: 1,
            "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
            "& .custom-cell": { paddingLeft: 4 },
          }}
        >
          {canRead || role === "admin" ? (
            <DataGrid
              rows={(allTransfers || [])?.map((item, index) => ({
                id: index,
                sNo: index + 1,
                // createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
                transferDate: item.transferDate || "No Data",
                transferFrom: item.transferFrom?.name || "No Data",
                transferTo: item.transferTo?.name || "No Data",
                itemCode:
                  item.stocktransferitems?.itemDetails?.itemCode ||
                  item.stocktransferitems?.itemCode ||
                  "No Data",
                itemName: item.stocktransferitems?.item?.name || "No Data",
                transferNo: item.transferNo || "No Data",
                brandName:
                  item.stocktransferitems?.item?.brand?.name || "No Data",
                categoryName:
                  item.stocktransferitems?.item?.category?.categoryName ||
                  "No Data",
                batchNo:
                  item.stocktransferitems?.itemDetails?.batchNo ||
                  item.stocktransferitems?.batchNo ||
                  "No Data",
                caseNo:
                  item.stocktransferitems?.itemDetails?.case ||
                  item.stocktransferitems?.case ||
                  0,
                pcs: item.stocktransferitems?.pcs || 0,
                volume: item.stocktransferitems?.item?.volume || 0,
                totalVolumeLiters: item.totalVolumeLiters || 0,
                group: item.stocktransferitems?.item?.group || "No Data",
                mrp:
                  item.stocktransferitems?.itemDetails?.mrp ||
                  item.stocktransferitems?.mrp ||
                  0,
              }))}
              columns={columns}
              rowCount={totalCount}
              pagination
              paginationMode="server"
              paginationModel={paginationModel}
              pageSizeOptions={[10, 25, 50, 100]}
              onPaginationModelChange={(newModel) =>
                setPaginationModel(newModel)
              }
              sx={{ backgroundColor: "#fff" }}
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
                density: "compact",
              }}
            />
          ) : (
            <Typography variant="body1" color="red">
              You do not have permission to view this data.
            </Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ItemTransferReport;
