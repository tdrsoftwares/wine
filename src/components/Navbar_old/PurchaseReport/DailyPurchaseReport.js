import {
  Box,
  Button,
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
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { getAllCustomer } from "../../../services/customerService";
import { getAllItemCategory } from "../../../services/categoryService";
import { getAllItems } from "../../../services/itemService";
import { getAllBrands } from "../../../services/brandService";
import { NotificationManager } from "react-notifications";
import { getAllSuppliers } from "../../../services/supplierService";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";

const DailyPurchaseReport = () => {
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
    brandName: "",
    categoryName: "",
    itemName: "",
    series: "",
    billType: "",
    pack: "",
    supplier: "",
  });
  const [allItems, setAllItems] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [totalCount, setTotalCount] = useState(0);
  

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      width: 100,
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
      field: "totalPcs",
      headerName: "Total Pcs.",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },

    {
      field: "rate",
      headerName: "Rate",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },

    {
      field: "totalVolumeLiters",
      headerName: "Total Vol. Ltr.",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
  ];
  
  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
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

  useEffect(() => {
    fetchAllItems();
    fetchAllBrands();
    fetchAllCustomers();
    fetchAllCategory();
    fetchAllSuppliers();
  }, [])

  return (
    <Box sx={{ p: 2, minWidth: "900px" }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Daily Purchase Report
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
            <InputLabel htmlFor="brandName" className="input-label">
              Brand:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="brandName"
              className="input-field"
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
            <InputLabel htmlFor="itemName" className="input-label">
              Item:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="itemName"
              className="input-field"
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
            <InputLabel htmlFor="Supplier" className="input-label">
              Supplier:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="Supplier"
              className="input-field"
              value={filterData.supplier}
              onChange={(e) =>
                setFilterData({ ...filterData, supplier: e.target.value })
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

        {/* <Grid item xs={2}>
          <TextField
            select
            fullWidth
            name="billType"
            label="Bill Type"
            variant="outlined"
            className="input-field"
            value={filterData.billType}
            onChange={(e) =>
              setFilterData({ ...filterData, billType: e.target.value })
            }
          >
            {["cash", "dealer"].map((item, id) => (
              <MenuItem key={id} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
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
              brandName: "",
              categoryName: "",
              itemName: "",
              series: "",
              billType: "",
              pack: "",
              supplier: "",
            });
            setPaginationModel({ page: 0, pageSize: 25 });
            // fetchAllSales();
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
            // onClick={fetchAllSales}
            sx={{ marginLeft: 2 }}
          >
            Display
          </Button>
        </div>
      </Box>

      <Box
        sx={{
          height: 500,
          width: "80%",
          marginTop: 2,
          "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
          "& .custom-cell": { paddingLeft: 4 },
        }}
      >
        <DataGrid
          rows={([])?.map((item, index) => ({
            id: index,
            sNo: index + 1,
            // createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
            // billDate: item.billDate || "No Data",
            // billNo: item.billNo || "No Data",
            // billType: item.billType || "No Data",
            // itemCode: item.salesItems?.itemCode || "No Data",
            // itemName: item?.salesItems?.item?.name || "No Data",
            // brandName: item.salesItems?.item?.brand?.name || "No Data",
            // categoryName: item?.item?.category?.categoryName || "No Data",
            // customerName: item?.customer?.name || "No Data",
            // batchNo: item.salesItems?.batchNo || "No Data",
            // brokenNo: item.brokenNo || "No Data",
            // caseNo: item.caseNo || "No Data",
            // pcs: item.salesItems?.pcs || "No Data",
            // pack: item.salesItems?.item?.volume || "No Data",
            // series: item.billSeries || "No Data",
            // group: item.salesItems?.item?.group || "No Data",
            // updatedAt: new Date(item.updatedAt).toLocaleDateString("en-GB"),
            // mrp: item.salesItems?.mrp || "No Data",
            // rate: item.salesItems?.rate || "No Data",
            // broken: item.salesItems?.break || "No Data",
            // split: item.salesItems?.split || "No Data",
            // itemAmount: item.salesItems?.amount || "No Data",
          }))}
          columns={columns}
          rowCount={totalCount}
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
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
        />
      </Box>
    </Box>
  );
};

export default DailyPurchaseReport;