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
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getItemWisePurchaseDetails } from "../../../services/purchaseService";
import { NotificationManager } from "react-notifications";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getAllItems } from "../../../services/itemService";
import { getAllItemCategory } from "../../../services/categoryService";
import { customTheme } from "../../../utils/customTheme";
import { getItemTransferDetails, removeAllTransfers } from "../../../services/transferService";
import { getAllStores } from "../../../services/storeService";
import { getAllBrands } from "../../../services/brandService";
import DeleteConfirmDialog from "../../../modules/DeleteConfirmDialog";

const ItemTransferReport = () => {
  const [transferFrom, setTransferFrom] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [allTransfers, setAllTransfers] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [allNonGodownStores, setAllNonGodownStores] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [itemName, setItemName] = useState("");
  const [group, setGroup] = useState("");
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);

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
        fromDate,
        toDate,
        itemCode,
        itemName,
        storeName,
        categoryName,
        brandName,
        group,
      };

      const response = await getItemTransferDetails(filterOptions);
      const itemsData = response?.data?.data;
      // console.log("itemsDataResponse: ", itemsData);

      if (itemsData) {
        setAllTransfers(itemsData || []);
        setTotalCount(itemsData?.length || 0);
      } else {
        console.log("Error", response);
        NotificationManager.error("No items found.", "Error");
        setAllTransfers([]);
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
    fetchAllTransfer();
    fetchAllStores();
    fetchAllBrands();
    fetchAllItems();
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
    const debouncedFetch = debounce(fetchAllTransfer, 300);
    debouncedFetch();
  }, [
    paginationModel,
    dateFrom,
    dateTo,
    itemCode,
    itemName,
    storeName,
    brandName,
    categoryName,
    group,
  ]);

  const handleOpenDeleteConfirmModal = () => {
    setOpenDeleteConfirmModal(true);
    return;
  };
  
  const handleCloseDeleteConfirmModal = () => {
    setOpenDeleteConfirmModal(false);
  };
  

  const handleDeleteAllTransfers = () => {
    handleOpenDeleteConfirmModal();
  };

  const handleConfirmDeleteAll = async () => {
    try {
      const response = await removeAllTransfers(true);
      if (response.status === 200) {
        NotificationManager.success(
          "All transfers deleted successfully.",
          "Success"
        );
        setAllTransfers([]);
      } else {
        console.log("error: ", response);
        NotificationManager.error(
          "Error deleting transfers. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting transfers. Please try again later.",
        "Error"
      );
      console.log(error);
    } finally {
      setOpenDeleteConfirmModal(false);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, width: "900px" }}>
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
                  value={dateFrom}
                  className="date-picker"
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
                  className="date-picker"
                  onChange={(date) => setDateTo(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </Grid>

          {/* <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="transferFrom" className="input-label">
                Transfer from :
              </InputLabel>
              <TextField
                select
                fullWidth
                name="transferFrom"
                value={transferFrom}
                onChange={(e) => setTransferFrom(e.target.value)}
              >
                {allGodownStores?.map((store) => (
                  <MenuItem key={store._id} value={store._id}>
                    {store.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="Transfer to" className="input-label">
                Transfer To :
              </InputLabel>
              <TextField
                select
                fullWidth
                name="Transfer to"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
              >
                {allNonGodownStores?.map((store) => (
                  <MenuItem key={store._id} value={store._id}>
                    {store.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid> */}

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="storeName" className="input-label">
                Stock In :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
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
              <InputLabel htmlFor="itemName" className="input-label">
                Item Name:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="itemName"
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
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
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
              <InputLabel htmlFor="brandName" className="input-label">
                Brand:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="brandName"
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
              <InputLabel htmlFor="group" className="input-label">
                Group:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                required
              >
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
              setItemCode("");
              setItemName("");
              setBrandName("");
              setCategoryName("");
              setGroup("");
              setStoreName("");
              setPaginationModel({ page: 1, pageSize: 10 });
              // fetchAllTransfer();
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
              onClick={() => fetchAllTransfer()}
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
            marginTop: 1,
            "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
            "& .custom-cell": { paddingLeft: 4 },
          }}
        >
          <DataGrid
            rows={(allTransfers || [])?.map((item, index) => ({
              id: index,
              sNo: index + 1,
              // createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
              transferDate: item.transferDate || "No Data",
              transferFrom: item.transferFrom?.name || "No Data",
              transferTo: item.transferTo?.name || "No Data",
              itemCode: item.stocktransferitems?.itemCode || "No Data",
              itemName: item.stocktransferitems?.item?.name || "No Data",
              transferNo: item.transferNo || "No Data",
              brandName:
                item.stocktransferitems?.item?.brand?.name || "No Data",
              categoryName:
                item.stocktransferitems?.item?.category?.categoryName ||
                "No Data",
              batchNo: item.stocktransferitems.batchNo || "No Data",
              caseNo: item.stocktransferitems?.case || "No Data",
              pcs: item.stocktransferitems?.pcs || "No Data",
              volume: item.stocktransferitems?.item?.volume || "No Data",
              totalVolumeLiters:
                item.totalVolumeLiters || "No Data",
              group: item.stocktransferitems?.item?.group || "No Data",
              mrp: item.stocktransferitems?.mrp || "No Data",
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
              density: "compact",
            }}
          />
        </Box>
        <Button
          color="error"
          size="small"
          variant="contained"
          onClick={handleDeleteAllTransfers}
          sx={{
            marginTop: 1,
            padding: "4px 10px",
            fontSize: "11px",
          }}
          disabled={allTransfers.length === 0}
        >
          DELETE ALL
        </Button>
        <DeleteConfirmDialog
          openDeleteConfirmModal={openDeleteConfirmModal}
          handleCloseDeleteConfirmModal={handleCloseDeleteConfirmModal}
          handleConfirmDeleteAll={handleConfirmDeleteAll}
        />
      </Box>
    </ThemeProvider>
  );
};

export default ItemTransferReport;
