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
import dayjs from "dayjs";
import { usePermissions } from "../../../utils/PermissionsContext";

const DailyProfitReport = () => {
  const [allProfitData, setAllProfitData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
  });

  const { permissions, role } = usePermissions();

  const reportsPermissions =
    permissions?.find((permission) => permission.moduleName === "Reports")
      ?.permissions || [];
  const canRead = reportsPermissions.includes("read");

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
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      fromDate: filterData.dateFrom ? dayjs(filterData.dateFrom).format("DD/MM/YYYY") : null,
      toDate: filterData.dateTo ? dayjs(filterData.dateTo).format("DD/MM/YYYY") : null,
    };

    setLoading(true);
    try {
      const response = await getDailyProfitDetails(filterOptions);

      if (response.status === 200) {
        setAllProfitData(response?.data?.data?.items || []);
        setTotalCount(response?.data?.data?.totalItems || 0);
      } else {
        console.log("Error", response);
        // NotificationManager.error("No records found.", "Error");
        setAllProfitData([]);
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
  }, [paginationModel, filterData]);

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
                  className="input-field date-picker"
                  value={
                    filterData.dateFrom ? filterData.dateFrom : null
                  }
                  onChange={(newDate) =>
                    setFilterData({
                      ...filterData,
                      dateFrom: newDate ? newDate : null,
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
                  className="input-field date-picker"
                  value={filterData.dateTo ? filterData.dateTo : null}
                  onChange={(newDate) =>
                    setFilterData({
                      ...filterData,
                      dateTo: newDate ? newDate : null,
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
              setPaginationModel({ page: 0, pageSize: 10 });
            }}
          >
            Clear Filters
          </Button>
          {/* <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={() => {}}
          >
            Print
          </Button> */}
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllProfits}
            disabled={!canRead && role !== "admin"}
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
          {canRead || role === "admin" ? <DataGrid
            rows={(allProfitData || [])?.map((item, index) => ({
              id: index,
              sNo: index + paginationModel.page * paginationModel.pageSize + 1,
              itemName: item.itemName || "No Data",
              TotalQuantity: item.TotalQuantity || 0,
              salesAmount: item.salesAmount || 0,
              purchaseRate: item.purchaseRate || 0,
              profit: item.profit?.toFixed(2) || 0,
            }))}
            columns={columns}
            rowCount={totalCount}
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            pageSizeOptions={[5, 10, 25, 50, 100]}
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
              toolbar: GridToolbar,
            }}
            initialState={{
              density: "compact",
            }}
          />: (
            <Typography variant="body1" color="red">
              You do not have permission to view this data.
            </Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DailyProfitReport;
