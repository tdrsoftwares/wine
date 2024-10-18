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
import {
  exportItemPurchaseDetails,
  getItemWisePurchaseDetails,
} from "../../../services/purchaseService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getAllSuppliers } from "../../../services/supplierService";
import { getAllItemCategory } from "../../../services/categoryService";
import { customTheme } from "../../../utils/customTheme";
import debounce from "lodash.debounce";
import {
  searchByBrandName,
  searchByItemName,
} from "../../../services/saleBillService";
import { usePermissions } from "../../../utils/PermissionsContext";
import * as XLSX from "xlsx";

const ItemWisePurchaseReport = () => {
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
    mode: "",
  });
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [allPurchases, setAllPurchases] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [itemName, setItemName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [brandNameOptions, setBrandNameOptions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
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
    // {
    //   field: "createdAt",
    //   headerName: "Created Date",
    //   width: 150,
    //   cellClassName: "custom-cell",
    //   headerClassName: "custom-header",
    // },
    {
      field: "billDate",
      headerName: "Bill Date",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "entryNo",
      headerName: "Entry No.",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "billNo",
      headerName: "Bill No.",
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
      field: "brandName",
      headerName: "Brand Name",
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
      field: "batchNo",
      headerName: "Batch No.",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "brokenNo",
      headerName: "Broken",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "gro",
      headerName: "G.R.O.",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "sp",
      headerName: "S. Purposes",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "bl",
      headerName: "BL",
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
      field: "volume",
      headerName: "Volume",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "caseNo",
      headerName: "Case No.",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "purchaseRate",
      headerName: "Purchase Rate",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "saleRate",
      headerName: "Sale Rate",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "supplierName",
      headerName: "Supplier Name",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "storeName",
      headerName: "Store Name",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "itemAmount",
      headerName: "Amount",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
  ];

  const fetchAllPurchases = async () => {
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
        itemName: filterData.itemName,
        supplierName: selectedSupplier,
        brandName: filterData.brandName,
        categoryName: filterData.categoryName,
        volume: filterData.pack,
        itemCode: filterData.itemCode,
        mode: filterData.mode,
      };
      const response = await getItemWisePurchaseDetails(filterOptions);
      // console.log("Response: ", response);

      if (response.status === 200) {
        setAllPurchases(response?.data?.data?.items || []);
        setTotalCount(response?.data?.data?.totalItems || 0);
      } else {
        console.log("Error", response);
        // NotificationManager.error("No items found.", "Error");
        setAllPurchases([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //  "Error fetching purchases. Please try again later.",
      //   "Error"
      // );
      console.log("Error fetching purchases", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSuppliers = async () => {
    try {
      const response = await getAllSuppliers();
      // console.log("response: ", response)
      if (response.status === 200) {
        setAllSuppliers(response?.data?.data);
      } else {
        setAllSuppliers([]);
        // NotificationManager.error("No suppliers found.", "Error")
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching suppliers. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching suppliers:", error);
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
    fetchAllPurchases();
    fetchAllSuppliers();
    fetchAllCategory();
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce(fetchAllPurchases, 300);
    debouncedFetch();
  }, [paginationModel, selectedSupplier, filterData]);

  const exportToExcel = async () => {
    const fromDate = filterData.dateFrom
      ? formatDate(filterData.dateFrom)
      : null;
    const toDate = filterData.dateTo ? formatDate(filterData.dateTo) : null;

    const filterOptions = {
      fromDate: fromDate,
      toDate: toDate,
      itemName: filterData.itemName,
      supplierName: selectedSupplier,
      brandName: filterData.brandName,
      categoryName: filterData.categoryName,
      volume: filterData.pack,
      itemCode: filterData.itemCode,
      mode: filterData.mode,
    };
    // console.log("filterOptions: ",filterOptions)

    try {
      setLoading(true);
      const response = await exportItemPurchaseDetails(filterOptions);
      const exportData = response?.data?.data;
      console.log("exportData: ", exportData);

      const dataToExport = (exportData || []).map((item, index) => ({
        "S. No.": index + 1,
        "Bill Date": item.billDate,
        "Entry No.": item.entryNo,
        "Bill No.": item.billNo,
        "Item Code": item.purchaseItems?.itemCode,
        "Item Name": item.purchaseItems?.item?.name,
        "Brand": item.purchaseItems?.item?.brand?.name,
        "Category": item.purchaseItems?.item?.category?.categoryName,
        "Batch": item.purchaseItems?.batchNo,
        "Broken": item.purchaseItems?.brokenNo || 0,
        "Case No.": item.purchaseItems?.caseNo || 0,
        "Pcs": item.purchaseItems?.pcs || 0,
        "Volume": item.purchaseItems?.item?.volume || 0,
        "MRP": item.purchaseItems?.mrp || 0,
        "GRO": item.purchaseItems?.gro || 0,
        "SP": item.purchaseItems?.sp || 0,
        "BL": item.bl || 0,
        "Supplier Name": item.supplier?.name,
        "Store Name": item.store?.name,
        "Purchase Rate": item.purchaseItems?.purchaseRate || 0,
        "Sale Rate": item.purchaseItems?.saleRate || 0,
        "Amount": item.purchaseItems?.itemAmount || 0,
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "ItemWisePurchaseReport");

      XLSX.writeFile(workbook, "ItemWise_Purchase_Report.xlsx");
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
          Item Wise Purchase Report:
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
              <InputLabel htmlFor="Supplier" className="input-label">
                Supplier:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="Supplier"
                className="input-field"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
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
                {allSuppliers?.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
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
              <InputLabel htmlFor="volume" className="input-label">
                Volume:
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
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="mode" className="input-label">
                Mode:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="mode"
                className="input-field"
                value={filterData.mode}
                onChange={(e) =>
                  setFilterData({ ...filterData, mode: e.target.value })
                }
              >
                <MenuItem value="">None</MenuItem>
                {["cash", "online"].map((option, i) => (
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
                  mode: "",
                });
                setSelectedSupplier("");
                setItemName("");
                setBrandName("");
                setItemNameOptions([]);
                setBrandNameOptions([]);
                setPaginationModel({ page: 0, pageSize: 10 });
              }}
            >
              Clear Filters
            </Button>
            
            <Button
              color="info"
              size="small"
              variant="contained"
              onClick={() => fetchAllPurchases()}
              sx={{ marginLeft: 1 }}
              disabled={!canRead && role !== "admin"}
            >
              Display
            </Button>
          </div>
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
              rows={(allPurchases || [])?.map((item, index) => ({
                id: index,
                sNo:
                  index + paginationModel.page * paginationModel.pageSize + 1,
                // createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
                billDate: item.billDate || "No Data",
                entryNo: item.entryNo || "No Data",
                billNo: item.billNo || "No Data",
                itemCode: item.purchaseItems?.itemCode || "No Data",
                itemName: item.purchaseItems?.item?.name || "No Data",
                brandName: item.purchaseItems?.item?.brand?.name || "No Data",
                categoryName:
                  item.purchaseItems?.item?.category?.categoryName || "No Data",
                batchNo: item.purchaseItems?.batchNo || "No Data",
                brokenNo: item.purchaseItems?.brokenNo || 0,
                caseNo: item.purchaseItems?.caseNo || 0,
                pcs: item.purchaseItems?.pcs || 0,
                volume: item.purchaseItems?.item?.volume || 0,
                mrp: item.purchaseItems?.mrp || 0,
                gro: item.purchaseItems?.gro || 0,
                sp: item.purchaseItems?.sp || 0,
                bl: item.bl || 0,
                supplierName: item.supplier?.name || "No Data",
                storeName: item.store?.name || "No Data",
                purchaseRate: item.purchaseItems?.purchaseRate || 0,
                saleRate: item.purchaseItems?.saleRate || 0,
                itemAmount: item.purchaseItems?.itemAmount || 0,
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

export default ItemWisePurchaseReport;
