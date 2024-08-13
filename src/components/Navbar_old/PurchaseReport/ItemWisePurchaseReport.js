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
  ThemeProvider,
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
import { customTheme } from "../../../utils/customTheme";

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
    page: 1,
    pageSize: 10,
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
    const fromDate = dateFrom ? formatDate(dateFrom) : null;
    const toDate = dateTo ? formatDate(dateTo) : null;

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
      // console.log("response: ", response)
      if(response.status === 200) {
        setAllSuppliers(response?.data?.data);
      } else {
        setAllSuppliers([])
        NotificationManager.error("No suppliers found.", "Error")
      }
      
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

  useEffect(() => {
    fetchAllPurchases();
    fetchAllSuppliers();
    fetchAllItems();
    fetchAllCategory();
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
              <TextField
                // select
                fullWidth
                size="small"
                name="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                // SelectProps={{
                //   MenuProps: {
                //     PaperProps: {
                //       style: {
                //         maxHeight: 200,
                //       },
                //     },
                //   },
                // }}
              />
                {/* {allItems?.map((item) => (
                  <MenuItem key={item._id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField> */}
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
                // select
                fullWidth
                size="small"
                name="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                // SelectProps={{
                //   MenuProps: {
                //     PaperProps: {
                //       style: {
                //         maxHeight: 200,
                //       },
                //     },
                //   },
                // }}
              />
                {/* {allBrands.map((brand) => (
                  <MenuItem key={brand._id} value={brand.name}>
                    {brand.name}
                  </MenuItem>
                ))}
              </TextField> */}
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
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            "& button": { marginTop: 1 },
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
              setPaginationModel({ page: 1, pageSize: 10 });
              // fetchAllPurchases();
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
              onClick={() => fetchAllPurchases()}
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
            marginTop: 1,
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
              categoryName:
                item.purchaseItems?.item?.category?.categoryName || "No Data",
              batchNo: item.purchaseItems.batchNo || "No Data",
              brokenNo: item.purchaseItems?.brokenNo || "No Data",
              caseNo: item.purchaseItems?.caseNo || "No Data",
              pcs: item.purchaseItems?.pcs || "No Data",
              volume: item.purchaseItems?.item?.volume || "No Data",
              mrp: item.purchaseItems?.mrp || "No Data",
              gro: item.purchaseItems?.gro || "No Data",
              sp: item.purchaseItems?.sp || "No Data",
              supplierName: item.supplierName || "No Data",
              storeName: item.storeName || "No Data",
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

export default ItemWisePurchaseReport;
