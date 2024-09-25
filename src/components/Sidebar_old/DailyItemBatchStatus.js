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
import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { NotificationManager } from "react-notifications";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getAllStores } from "../../services/storeService";
import { getDailyItemBatchDetails } from "../../services/dailyItemBatchService";
import { customTheme } from "../../utils/customTheme";
import { usePermissions } from "../../utils/PermissionsContext";

const DailyItemBatchStatus = () => {
  const [todayDate, setTodayDate] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [allRowData, setAllRowData] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [licenseDetails, setLicenseDetails] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

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
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "itemName",
      headerName: "Item",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "openingBalance",
      headerName: "Opening",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "supplierNames",
      headerName: "Source",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },

    {
      field: "passNo",
      headerName: "Pass No",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "batchNo",
      headerName: "Batch",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "pcs",
      headerName: "Receipts",
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
      field: "totalSold",
      headerName: "Sales",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "closingBalance",
      headerName: "Closing",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
  ];

  const columnsData = useMemo(
    () =>
      columns.map((col) =>
        col.field === "action"
          ? { ...col, sortable: false, filterable: false }
          : col
      ),
    [columns]
  );

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

  const fetchAllItemBatchDetails = async () => {
    const toDayDate = todayDate ? formatDate(todayDate) : null;

    setLoading(true);
    try {
      const filterOptions = {
        toDayDate,
        storeName,
      };
      const response = await getDailyItemBatchDetails(filterOptions);
      // console.log("Statement fetched", response?.data?.data);

      if (response.status === 200) {
        setAllRowData(response?.data?.data);
        setTotalCount(response?.data?.data.length);
      } else {
        setAllRowData([]);
        setTotalCount(0);
        NotificationManager.error(
          "Error fetching item batch data. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching item batch data. Please try again later.",
        "Error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStores();
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
    const debouncedFetch = debounce(fetchAllItemBatchDetails, 300);
    if (todayDate && storeName) debouncedFetch();
  }, [todayDate, storeName]);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Daily Item Batch Report:
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>Filter By:</Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="todayDate" className="input-label">
                Date:
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="todayDate"
                  format="DD/MM/YYYY"
                  value={todayDate}
                  className="date-picker"
                  onChange={(date) => setTodayDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="storeName" className="input-label">
                Store :
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
                <MenuItem value="">None</MenuItem>
                {allStores?.map((store) => (
                  <MenuItem key={store._id} value={store.name}>
                    {store.name}
                  </MenuItem>
                ))}
              </TextField>
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
          <div>
            <Button
              color="inherit"
              size="small"
              variant="contained"
              onClick={() => {
                setTodayDate(null);
                setStoreName("");
              }}
            >
              Clear Filters
            </Button>

            <Button
              color="info"
              size="small"
              variant="contained"
              onClick={fetchAllItemBatchDetails}
              sx={{ marginLeft: 2 }}
              disabled={!canRead && role !== "admin"}
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
          {canRead || role === "admin" ? (
            <DataGrid
              rows={(allRowData || []).map((item, index) => {
                const purchasedData =
                  item.currentPurchasedData.length > 0
                    ? item.currentPurchasedData[0]
                    : {};
                return {
                  id: index,
                  sNo: index + 1,
                  itemName: item.item,
                  openingBalance: item.openingBalance,
                  supplierNames: purchasedData.supplierNames
                    ? purchasedData.supplierNames.join(", ")
                    : "-",
                  passNo: purchasedData.passNo
                    ? purchasedData.passNo.join(", ")
                    : "-",
                  batchNo: purchasedData.batchNo
                    ? purchasedData.batchNo.join(", ")
                    : "-",
                  pcs: purchasedData.pcs ? purchasedData.pcs.join(", ") : "-",
                  total: item.total,
                  totalSold: item.totalSold,
                  closingBalance: item.closingBalance,
                };
              })}
              columns={columnsData}
              rowCount={totalCount}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 25, 50]}
              sx={{ backgroundColor: "#fff" }}
              loading={loading}
              components={{
                LoadingOverlay: () => (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ),
              }}
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

export default DailyItemBatchStatus;
