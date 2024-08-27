import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDailyProfitDetails } from "../../../services/dailyProfitService";
import { NotificationManager } from "react-notifications";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { customTheme } from "../../../utils/customTheme";
import debounce from "lodash/debounce";

const DailyProfitReport = () => {
  const [allProfitData, setAllProfitData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
  });

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "itemName",
      headerName: "Item Name",
      flex: 2,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "TotalQuantity",
      headerName: "Quantity",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "salesAmount",
      headerName: "Sale Amt.",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "purchaseRate",
      headerName: "Purchase Rate",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "profit",
      headerName: "Profit Amt.",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
  ];

  const fetchAllProfits = async () => {
    const filterOptions = {
      fromDate: filterData.dateFrom,
      toDate: filterData.dateTo,
    };

    setLoading(true);
    try {
      const response = await getDailyProfitDetails(filterOptions);

      if (response.status === 200) {
        setAllProfitData(response?.data?.data || []);
        setTotalCount(response.data.data.length || 0);
      } else {
        console.log("Error", response);
        NotificationManager.error("No records found.", "Error");
        setAllProfitData([]);
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching records. Please try again later.",
        "Error"
      );
      console.log("Error fetching records", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProfits();
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchAllProfits();
    }, 300);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [filterData]);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Daily Profit Report
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
                    setFilterData({
                      ...filterData,
                      dateFrom: newDate ? newDate.format("YYYY/MM/DD") : null,
                    })
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
                    setFilterData({
                      ...filterData,
                      dateTo: newDate ? newDate.format("YYYY/MM/DD") : null,
                    })
                  }
                  renderInput={(params) => <TextField {...params} />}
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
              });
              setPaginationModel({ page: 1, pageSize: 10 });
            }}
          >
            Clear Filters
          </Button>
          <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={() => {}}
          >
            Print
          </Button>
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllProfits}
          >
            Display
          </Button>
        </Box>

        <Box
          sx={{
            height: 450,
            width: "100%",
            marginTop: 2,
            "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
            "& .custom-cell": { paddingLeft: 4 },
          }}
        >
          <DataGrid
            rows={(allProfitData || [])?.map((item, index) => ({
              id: index,
              sNo: index + 1,
              itemName: item.itemName || "No Data",
              TotalQuantity: item.TotalQuantity || 0,
              salesAmount: item.salesAmount || 0,
              purchaseRate: item.purchaseRate || 0,
              profit: item.profit || 0,
            }))}
            columns={columns}
            rowCount={totalCount}
            pagination
            paginationModel={paginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            onPaginationModelChange={setPaginationModel}
            sx={{ backgroundColor: "#fff" }}
            disableRowSelectionOnClick
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
      </Box>
    </ThemeProvider>
  );
};

export default DailyProfitReport;
