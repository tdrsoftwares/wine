import {
  Box,
  Button,
  Checkbox,
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
import PrintableReport from "./PrintableExport";
import { getLicenseInfo } from "../../../services/licenseService";

const MonthlyStatement = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [allStatements, setAllStatements] = useState([]);
  const [isPcsTrue, setIsPcsTrue] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [licenseDetails, setLicenseDetails] = useState({});
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

  const fetchLicenseData = async () => {
    try {
      const response = await getLicenseInfo();
      // console.log("monthly statement lic response ---> ", response);

      if (response.statusCode === 200) {
        const licenseData = response?.data[0];
        setLicenseDetails({
          id: licenseData._id,
          nameOfLicence: licenseData.nameOfLicence,
          businessType: licenseData.businessType,
          address: licenseData.address,
          district: licenseData.district,
          phoneNo: licenseData.phoneNo,

          fiancialPeriodTo: licenseData.fiancialPeriodTo,
          fiancialPeriodfrom: licenseData.fiancialPeriodfrom,
          licenceId: licenseData.licenceId,
          billCategory: licenseData.billCategory,
          noOfBillCopies: licenseData.noOfBillCopies,

          autoBillPrint: licenseData.autoBillPrint,
          eposUserId: licenseData.eposUserId,
          eposPassword: licenseData.eposPassword,
          noOfItemPerBill: licenseData.noOfItemPerBill,
          perBillMaxWine: licenseData.perBillMaxWine,
          perBillMaxCs: licenseData.perBillMaxCs,

          billMessages: licenseData.billMessages,
          messageMobile: licenseData.messageMobile,
        });
      }

      if (response?.response?.status === 400) {
        setLicenseDetails([]);
        NotificationManager.error("No License Data Found", "Error");
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching license. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllStatements = async () => {
    const fromDate = dateFrom ? formatDate(dateFrom) : null;
    const toDate = dateTo ? formatDate(dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        fromDate: fromDate,
        toDate: toDate,
        pcs: isPcsTrue,
      };
      const response = await getAllStatements(filterOptions);
      // console.log("Statement fetched", response?.data?.data);

      const groupedByCategory = response?.data?.data?.groupedByCategory || [];
      const totals = response?.data?.data?.group || [];

      const statementsWithTotals = [
        ...groupedByCategory,
        ...totals.map((total, index) => ({
          ...total,
          sNo: groupedByCategory.length + index + 1,
          categoryName: `Total ${total.group}`,
        })),
      ];
      // console.log("statementsWithTotals: ",statementsWithTotals)
      setAllStatements(statementsWithTotals);
      setTotalCount(statementsWithTotals.length);
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
    fetchLicenseData();
    fetchAllStatements();
  }, []);

  const rows = useMemo(() => {
    return allStatements?.map((item, index) => ({
      id: index,
      sNo: index + 1,
      categoryName: item.categoryName || "No Data",
      openingBalance: isPcsTrue
        ? item.openingBalance || 0
        : item.openingBalance?.toFixed(3) || "0.000",
      purchases: isPcsTrue
        ? item.purchases || 0
        : item.purchases?.toFixed(3) || "0.000",
      sales: isPcsTrue ? item.sales || 0 : item.sales?.toFixed(3) || "0.000",
      closingBalance: isPcsTrue
        ? item.closingBalance || 0
        : item.closingBalance?.toFixed(3) || "0.000",
    }));
  }, [allStatements, isPcsTrue]);

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
  }, [dateFrom, dateTo, isPcsTrue]);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Monthly online statement - excise:
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

          <Grid item xs={6}>
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

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="pcsOnly" className="input-label">
                PCs Only:
              </InputLabel>
              <Checkbox
                name="pcsOnly"
                checked={isPcsTrue}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) => setIsPcsTrue(e.target.checked)}
              />
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
          <PrintableReport
            data={allStatements}
            licenseDetails={licenseDetails}
            isPcsTrue={isPcsTrue}
          />

          <div>
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
            rows={rows}
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
