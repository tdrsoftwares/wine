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
import { DataGrid } from "@mui/x-data-grid";
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
      headerClassName: "custom-header",
    },
    {
      field: "itemCode",
      headerName: "Item Code",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "itemName",
      headerName: "Item Name",
      width: 180,
      headerClassName: "custom-header",
    },
    {
      field: "brandName",
      headerName: "Brand Name",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "categoryName",
      headerName: "Category",
      width: 150,
      headerClassName: "custom-header",
    },

    {
      field: "batchNo",
      headerName: "Batch No.",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "brokenNo",
      headerName: "Broken",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "gro",
      headerName: "G.R.O.",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "sp",
      headerName: "S. Purposes",
      width: 120,
      headerClassName: "custom-header",
    },

    {
      field: "mrp",
      headerName: "MRP",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "pcs",
      headerName: "Pcs.",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "volume",
      headerName: "Volume",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "caseNo",
      headerName: "Case No.",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "purchaseRate",
      headerName: "Purchase Rate",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "saleRate",
      headerName: "Sale Rate",
      width: 120,
      headerClassName: "custom-header",
    },

    {
      field: "itemAmount",
      headerName: "Amount",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 150,
      headerClassName: "custom-header",
    },
  ];

  const fetchAllPurchases = async () => {
    const fromDate = dateFrom ? formatDate(dateFrom) : null;
    const toDate = dateTo ? formatDate(dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        page: paginationModel.page,
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

      if (response.status === 200) {
        setAllPurchases(response?.data?.data || []);
        setTotalCount(response.data.data.length || 0);
      } else {
        console.log("Error", response);
        return;
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
        <Grid item xs={9}>
          <RadioGroup
            row
            name="filter1"
            aria-label="filter1"
            value={filter1}
            onChange={(e) => setFilter1(e.target.value)}
          >
            <FormControlLabel value="date" control={<Radio />} label="Date" />
            <FormControlLabel
              value="supplier"
              control={<Radio />}
              label="Supplier"
            />
            <FormControlLabel value="item" control={<Radio />} label="Item" />


            <FormControlLabel
              value="supplier/item"
              control={<Radio />}
              label="Supplier/Item"
            />

            <FormControlLabel
              value="itemCode"
              control={<Radio />}
              label="Item Code"
            />
            
            <FormControlLabel value="brand" control={<Radio />} label="Brand" />

            <FormControlLabel
              value="category"
              control={<Radio />}
              label="Category"
            />

            <FormControlLabel
              value="volume"
              control={<Radio />}
              label="Volume"
            />
          </RadioGroup>
        </Grid>

        <Grid item xs={3} display="flex" justifyContent="center">
          <FormGroup row>
            <FormControlLabel
              label="FL"
              control={
                <Checkbox
                  checked={checkController.fl}
                  onChange={(e) =>
                    setCheckController((prev) => ({
                      ...prev,
                      fl: e.target.checked,
                    }))
                  }
                />
              }
            />
            <FormControlLabel
              label="Beer"
              control={
                <Checkbox
                  checked={checkController.beer}
                  onChange={(e) =>
                    setCheckController((prev) => ({
                      ...prev,
                      beer: e.target.checked,
                    }))
                  }
                />
              }
            />
            <FormControlLabel
              label="CS/IML"
              control={
                <Checkbox
                  checked={checkController.cs_iml}
                  onChange={(e) =>
                    setCheckController((prev) => ({
                      ...prev,
                      cs_iml: e.target.checked,
                    }))
                  }
                />
              }
            />
          </FormGroup>
        </Grid>

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
                disabled={filter1 === "date" ? false : true}
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
                disabled={filter1 === "date" ? false : true}
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
              disabled={
                filter1 === "supplier" || filter1 === "supplier/item"
                  ? false
                  : true
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
              disabled={
                filter1 === "item" || filter1 === "supplier/item" ? false : true
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
              disabled={filter1 === "itemCode" ? false : true}
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
              disabled={filter1 === "brand" ? false : true}
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
              disabled={filter1 === "category" ? false : true}
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

        {/* <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="batch" className="input-label">
              batch:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="batch"
              className="input-field"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              // disabled={filter1 === "volume" ? false : true}
            />
          </div>
        </Grid> */}

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
              disabled={filter1 === "volume" ? false : true}
            />
          </div>
        </Grid>
      </Grid>

      <Box
        sx={{
          height: 500,
          width: "100%",
          marginTop: 4,
          "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
          "& .custom-cell": { paddingLeft: 4 },
        }}
      >
        <DataGrid
          rows={(allPurchases || [])?.map((item, index) => ({
            id: index,
            sNo: index + 1,
            itemCode: item.itemCode || "No Data",
            itemName: item?.item?.name || "No Data",
            brandName: item?.item?.brand?.name || "No Data",
            categoryName: item?.item?.category?.categoryName || "No Data",
            batchNo: item.batchNo || "No Data",
            brokenNo: item.brokenNo || "No Data",
            caseNo: item.caseNo || "No Data",
            pcs: item.pcs || "No Data",
            volume: item?.item?.volume || "No Data",
            // updatedAt: new Date(item.updatedAt).toLocaleDateString("en-GB"),
            mrp: item.mrp || "No Data",
            gro: item.gro || "No Data",
            sp: item.sp || "No Data",
            purchaseRate: item.purchaseRate || "No Data",
            saleRate: item.saleRate || "No Data",
            itemAmount: item.itemAmount || "No Data",
            createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
          }))}
          columns={columns}
          rowCount={totalCount}
          pagination
          paginationMode="server"
          pageSizeOptions={[10, 25, 50, 100]}
          // onPaginationModelChange={setPaginationModel}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          sx={{ backgroundColor: "#fff" }}
          disableRowSelectionOnClick
          loading={loading}
          loadingOverlay={
            <Box>
              <CircularProgress />
            </Box>
          }
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          "& button": { marginTop: 2, marginLeft: 2 },
        }}
      >
        <Button
          color="warning"
          size="medium"
          variant="outlined"
          onClick={() => {
            setDateFrom(null);
            setDateTo(null);
            setSelectedSupplier("");
            setItemName("");
            setBrandName("");
            setCategoryName("");
            setVolume("");
            setItemCode("");
            setFilter1("");
            setBatch("");
            setPaginationModel({ page: 1, pageSize: 25 });
            fetchAllPurchases();
          }}
          sx={{ borderRadius: 8 }}
        >
          Clear
        </Button>
        <Button
          color="secondary"
          size="medium"
          variant="outlined"
          sx={{ borderRadius: 8 }}
        >
          Print
        </Button>
        <Button
          color="primary"
          size="medium"
          variant="contained"
          onClick={fetchAllPurchases}
          sx={{ borderRadius: 8 }}
        >
          Display
        </Button>
      </Box>
    </Box>
  );
};

export default ItemWisePurchaseReport;
