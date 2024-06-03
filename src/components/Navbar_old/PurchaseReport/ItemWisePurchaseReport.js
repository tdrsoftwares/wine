import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getItemWisePurchaseDetails } from "../../../services/purchaseService";
import { NotificationManager } from "react-notifications";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getAllSuppliers } from "../../../services/supplierService";
import { getAllItems } from "../../../services/itemService";
import { getAllItemCategory } from "../../../services/categoryService";
import { getAllBrands } from "../../../services/brandService";

const ItemWisePurchaseReport = () => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [filter1, setFilter1] = useState("");
  const [allPurchases, setAllPurchases] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [checkController, setCheckController] = useState({
    fl: false,
    beer: false,
    cs_iml: false,
  });
  const [allBrands, setAllBrands] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [itemName, setItemName] = useState("");
  const [volume, setVolume] = useState("");
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const [batch, setBatch] = useState("");

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
      field: "createdAt",
      headerName: "Created Date",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    // {
    //   field: "billDate",
    //   headerName: "Bill Date",
    //   width: 150,
    //   cellClassName: "custom-cell",
    //   headerClassName: "custom-header",
    // },
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
      field: "itemAmount",
      headerName: "Amount",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
  ];

  const fetchAllPurchases = async () => {
    const fromDate = dateFrom ? formatDate(dateFrom) : null;
    const toDate = dateTo ? formatDate(dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        fromDate: fromDate,
        toDate: toDate,
        itemName: itemName,
        supplierName: selectedSupplier,
        brandName,
        categoryName,
        volume,
        itemCode,
        // batchNo: batch
      };
      const response = await getItemWisePurchaseDetails(filterOptions);
      // console.log("Response: ", response);

      if (response.status === 200) {
        setAllPurchases(response?.data?.data || []);
        setTotalCount(response.data.data.length || 0);
      } else {
        console.log("Error", response);
        NotificationManager.error("No items found.", "Error");
        setAllPurchases([]);
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching purchases. Please try again later.",
        "Error"
      );
      console.log("Error fetching purchases", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSuppliers = async () => {
    try {
      const response = await getAllSuppliers();
      setAllSuppliers(response?.data?.data || []);
    } catch (error) {
      NotificationManager.error(
        "Error fetching suppliers. Please try again later.",
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

  useEffect(() => {
    fetchAllPurchases();
    fetchAllSuppliers();
    fetchAllItems();
    fetchAllItemCategory();
    fetchAllBrands();
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
    const debouncedFetch = debounce(fetchAllPurchases, 300);
    debouncedFetch();
  }, [
    paginationModel,
    dateFrom,
    dateTo,
    selectedSupplier,
    dateFrom,
    dateTo,
    itemName,
    brandName,
    categoryName,
    volume,
    itemCode,
    // batch
  ]);

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Item Wise Purchase Report:
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
                value={dateFrom}
                className="input-field date-picker"
                onChange={(date) => setDateFrom(date)}
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
                value={dateTo}
                className="input-field date-picker"
                onChange={(date) => setDateTo(date)}
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
            <TextField
              select
              fullWidth
              size="small"
              name="itemName"
              className="input-field"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}

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
            <InputLabel htmlFor="itemCode" className="input-label">
              ItemCode:
            </InputLabel>
            <TextField
              fullWidth
              name="itemCode"
              size="small"
              className="input-field"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
            />
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
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
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
              {allBrands.map((brand) => (
                <MenuItem key={brand._id} value={brand.name}>
                  {brand.name}
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
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
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
            <InputLabel htmlFor="volume" className="input-label">
              Volume:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="volume"
              className="input-field"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
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
            setDateFrom(null);
            setDateTo(null);
            setSelectedSupplier("");
            setItemName("");
            setBrandName("");
            setCategoryName("");
            setVolume("");
            setItemCode("");
            // setFilter1("");
            setBatch("");
            setPaginationModel({ page: 0, pageSize: 25 });
            // fetchAllPurchases();
          }}
          // sx={{ borderRadius: 8 }}
        >
          Clear Filters
        </Button>
        <div>
          <Button
            color="inherit"
            size="small"
            variant="contained"
            // sx={{ borderRadius: 8 }}
          >
            Print
          </Button>
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={() => fetchAllPurchases()}
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
          rows={(allPurchases || [])?.map((item, index) => ({
            id: index,
            sNo: index + 1,
            createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
            // billDate: item.billDate || "No Data",
            entryNo: item.entryNo || "No Data",
            billNo: item.billNo || "No Data",
            itemCode: item.purchaseItems?.itemCode || "No Data",
            itemName: item.purchaseItems?.item?.name || "No Data",
            brandName: item.purchaseItems?.item?.brand?.name || "No Data",
            categoryName: item.purchaseItems?.item?.category?.categoryName || "No Data",
            batchNo: item.purchaseItems.batchNo || "No Data",
            brokenNo: item.purchaseItems?.brokenNo || "No Data",
            caseNo: item.purchaseItems?.caseNo || "No Data",
            pcs: item.purchaseItems?.pcs || "No Data",
            volume: item.purchaseItems?.item?.volume || "No Data",
            mrp: item.purchaseItems?.mrp || "No Data",
            gro: item.purchaseItems?.gro || "No Data", // item er gro lagbe
            sp: item.purchaseItems?.sp || "No Data", // item er sp lagbe
            supplierName: item.supplierName || "No Data",
            purchaseRate: item.purchaseItems?.purchaseRate || "No Data",
            saleRate: item.purchaseItems?.saleRate || "No Data",
            itemAmount: item.purchaseItems?.itemAmount || "No Data",
          }))}
          columns={columns}
          rowCount={totalCount}
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          pageSizeOptions={[10, 25, 50, 100]}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          sx={{ backgroundColor: "#fff" }}
          loading={loading}
          loadingOverlay={
            <Box>
              <CircularProgress />
            </Box>
          }
          slots={{
            toolbar: GridToolbar
          }}
        />
      </Box>
    </Box>
  );
};

export default ItemWisePurchaseReport;
