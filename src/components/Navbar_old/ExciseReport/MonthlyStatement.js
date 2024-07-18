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
import { customTheme } from "../../../utils/customTheme";
import { getAllStatements } from "../../../services/monthlyStatementService";

const MonthlyStatement = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [allStatements, setAllStatements] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
  };

  // console.log("dateFrom: ", formatDate(dateFrom));

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "categoryName",
      headerName: "Category Name",
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
      field: "purchases",
      headerName: "Purchases",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "sales",
      headerName: "Sales",
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

  const columnsData = useMemo(
    () =>
      columns.map((col) =>
        col.field === "action"
          ? { ...col, sortable: false, filterable: false }
          : col
      ),
    [columns]
  );

  const fetchAllStatements = async () => {
    const fromDate = dateFrom ? formatDate(dateFrom) : null;
    const toDate = dateTo ? formatDate(dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        // page:
        //   paginationModel.page === 0
        //     ? paginationModel.page + 1
        //     : paginationModel.page,
        // pageSize: paginationModel.pageSize,
        fromDate: fromDate,
        toDate: toDate
      };
      const response = await getAllStatements(filterOptions);
      console.log("Statement fetched", response?.data?.data)
      setAllStatements(response?.data?.data || []);
      setTotalCount(response?.data?.data?.groupedByCategory?.length || 0);
    } catch (error) {
      NotificationManager.error(
        "Error fetching statements. Please try again later.",
        "Error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStatements();
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
    const debouncedFetch = debounce(fetchAllStatements, 300);
    debouncedFetch();
  }, [dateFrom, dateTo]);


  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Monthly online statement - excise:
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>
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
            }}
            sx={{ padding: "4px 10px", fontSize: "11px" }}
          >
            Clear Filters
          </Button>

          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllStatements}
            sx={{ marginLeft: 2, padding: "4px 10px", fontSize: "11px" }}
          >
            Display
          </Button>
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
            rows={(allStatements?.groupedByCategory || []).map((item, index) => ({
              id: index,
              sNo: index + 1,
              categoryName: item.categoryName || "No Data",
              openingBalance: item.openingBalance || 0,
              purchases: item.purchases || 0,
              sales: item.sales || 0,
              closingBalance: item.closingBalance || 0,
            }))}

            columns={columnsData}
            rowCount={totalCount}
            pagination
            pageSizeOptions={[10, 25, 50, 100]}
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
              // pagination: Pagination
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

export default MonthlyStatement;
