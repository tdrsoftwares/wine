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
import React, { useEffect, useState } from "react";
import { customTheme } from "../../utils/customTheme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { getAllItemCategory } from "../../services/categoryService";
import dayjs from "dayjs";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const CatBrandStock = () => {
  const [categoryName, setCategoryName] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [allStockData, setAllStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
  };

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
      field: "totalRecipt",
      headerName: "Total Recipt",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalSales",
      headerName: "Total Sales",
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
    {
      field: "purchasedValue",
      headerName: "Purchased Value",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    }
  ];

  const fetchAllCategory = async () => {
    try {
      const getAllCategoryResponse = await getAllItemCategory();
      if (getAllCategoryResponse.status === 200) {
        setAllCategory(getAllCategoryResponse?.data?.data);
      } else {
        // NotificationManager.error("No category found.", "Error");
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

  const fetchAllStock = async () => {
    const fromDate = dateFrom
      ? formatDate(dateFrom)
      : null;
    const toDate = dateTo ? formatDate(dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        fromDate,
        toDate,
        categoryName,
      };

      if (categoryName === "all") {
        filterOptions.AllCategory = true;
      } else {
        filterOptions.categoryName = categoryName;
      }

      // const response = await getCatWiseStockData(filterOptions) || [];
      const response = [];
      const stockData = response?.data?.data;
      // console.log("Response StockData: ", stockData);

      if (stockData) {
        setAllStockData(stockData || []);
        setTotalCount(stockData?.length || 0);
      } else {
        // console.log("Error", response);
        // NotificationManager.error("No items found.", "Error");
        setAllStockData([]);
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

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const exportToExcel = () => {

  }

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Category Wise Stock:
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>Filter by:</Typography>
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
                  onChange={(newDate) => setDateFrom(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: "100%" }}
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
                  onChange={(newDate) => setDateTo(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
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
                <MenuItem value="all">All Categories</MenuItem>
                {allCategory?.map((category) => (
                  <MenuItem key={category._id} value={category.categoryName}>
                    {category.categoryName}
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
            // disabled={!canRead && role !== "admin"}
          >
            Export to Excel
          </Button>
          <div>
          <Button
            color="inherit"
            size="small"
            variant="contained"
            onClick={() => {
              setDateFrom(null);
              setDateTo(null);
              setCategoryName("");
              setPaginationModel({ page: 0, pageSize: 10 });
              setAllStockData([]);
            }}
            sx={{
                marginRight: 1,

            }}
          >
            Clear Filters
          </Button>

          {/* <Button
            color="warning"
            size="small"
            variant="contained"
            // onClick={handlePrint}
            // disabled={!canRead && role !== "admin"}
            sx={{
                marginRight: 1,

            }}
          >
            Print
          </Button> */}
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllStock}
            // disabled={!canRead && role !== "admin"}
            
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
          <DataGrid
            rows={(allStockData || [])?.map((item, index) => ({
              id: index,
              sNo: index + 1,
              itemName: item.itemName || "No Data",
              totalPcs: item.totalPcs || "No Data",
              rate: item.rate?.toFixed(2) || "No Data",
              totalVolumeLiters:
                item.totalVolumeLiters?.toFixed(3) || "No Data",
              totalAmount: item.totalAmount?.toFixed(2) || "No Data",
            }))}
            columns={columns}
            rowCount={totalCount}
            pagination
            paginationModel={paginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            onPaginationModelChange={(newPaginationModel) =>
              setPaginationModel(newPaginationModel)
            }
            sx={{ backgroundColor: "#fff" }}
            disableRowSelectionOnClick
            loading={loading}
            loadingOverlay={
              <Box>
                <CircularProgress />
              </Box>
            }
            slots={{
              // footer: CustomFooter,
              toolbar: GridToolbar,
            }}
            initialState={{
              density: "compact",
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CatBrandStock;
