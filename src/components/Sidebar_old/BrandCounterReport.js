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
import dayjs from "dayjs";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getAllBrandCounter } from "../../services/brandCounterService";
import { batch } from "react-redux";

const BrandCounterReport = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
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
      flex: 2,
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
      field: "supplierNames",
      headerName: "Supplier Names",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "trNo",
      headerName: "TR No.",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "batchNo",
      headerName: "Batch No.",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "receipt650ml",
      headerName: "Receipt 650ml",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "receipt500ml",
      headerName: "Receipt 500ml",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "total",
      headerName: "Total",
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
  ];

  const fetchAllStock = async () => {
    const fromDate = dateFrom ? formatDate(dateFrom) : null;
    const toDate = dateTo ? formatDate(dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        fromDate,
        toDate,
      };
      const response = await getAllBrandCounter(filterOptions);

      console.log("response", response);
      if (response.status === 200) {
        const rowData = response?.data?.data;

        setAllStockData(rowData);
        setTotalCount(rowData.length);
      } else {
        console.log("Error", response);
        // NotificationManager.error("No records found.", "Error");
        setAllStockData([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching records. Please try again later.",
      //   "Error"
      // );
      console.log("Error fetching records", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dateFrom && dateTo) {
      fetchAllStock();
    }
  }, [dateFrom, dateTo]);

  const exportToExcel = () => {};

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Brand Counter Details:
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
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            "& button": { marginTop: 1 },
          }}
        >
          {/* <Button
              color="success"
              size="small"
              variant="contained"
              onClick={exportToExcel}
              // disabled={!canRead && role !== "admin"}
            >
              Export to Excel
            </Button> */}
          <div>
            <Button
              color="inherit"
              size="small"
              variant="contained"
              onClick={() => {
                setDateFrom(null);
                setDateTo(null);
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
              item: item.name || "No Data",
              openingBalance: item.openingBalance || "No Data",
              supplierNames: item.supplierNames || "No Data",
              trNo: item.trNo || "No Data",
              batchNo: item.batchNo || "No Data",
              receipt650ml: item.receipt650ml || "0",
              receipt500ml: item.receipt500ml || "0",
              total: item.total || "0",
              totalSales: item.totalCurrentSalesPcs || "0",
              closingBalance: item.closingBlance || "0",
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

export default BrandCounterReport;
