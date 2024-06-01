import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  getAllPurchases,
  getItemPurchaseDetails,
} from "../../../services/purchaseService";
import { NotificationManager } from "react-notifications";
import { getAllSuppliers } from "../../../services/supplierService";
import { DataGrid } from "@mui/x-data-grid";
import PurchaseDetailsModal from "./PurchaseDetailsModal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const PurchaseReportSummary = () => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [dateFrom, setDateFrom] = useState(null);

  const [dateTo, setDateTo] = useState(null);
  const [filter1, setFilter1] = useState("date");
  const [allPurchases, setAllPurchases] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 25,
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
      width: 90,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "entryNo",
      headerName: "Entry No.",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "billNo",
      headerName: "Bill No.",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "passNo",
      headerName: "Pass No.",
      width: 120,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "billDate",
      headerName: "Bill Date",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "passDate",
      headerName: "Pass Date",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "supplierName",
      headerName: "Supplier Name",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "mrpValue",
      headerName: "MRP Value",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "grossAmount",
      headerName: "Gross Amt.",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "discountAmount",
      headerName: "Disc. Amt.",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "govtROff",
      headerName: "Govt. Round Off",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "specialPurpose",
      headerName: "Special Purposes",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "sTaxAmount",
      headerName: "Service Tax Amt.",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "tcsAmount",
      headerName: "Tcs Amt.",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "netAmount",
      headerName: "Net Amt.",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleViewClick(params.row)}
        >
          View
        </Button>
      ),
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

  const handleViewClick = (row) => {
    setSelectedRowData(row);
    setIsModalOpen(true);
  };

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
        limit: paginationModel.pageSize,
        fromDate: fromDate,
        toDate: toDate,
        supplierName: selectedSupplier,
      };
      const response = await getAllPurchases(filterOptions);
      setAllPurchases(response?.data?.data || []);
      setTotalCount(response?.data?.data?.length || 0);
    } catch (error) {
      NotificationManager.error(
        "Error fetching purchases. Please try again later.",
        "Error"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSuppliers = async () => {
    try {
      const response = await getAllSuppliers();
      setAllSuppliers(response?.data?.data || []);
    } catch (error) {
      NotificationManager.error(
        "Error fetching suppliers. Please try again later.",
        "Error"
      );
    }
  };

  useEffect(() => {
    fetchAllSuppliers();
    fetchAllPurchases();
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
  }, [paginationModel, dateFrom, dateTo, selectedSupplier]);


  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Purchase Report Summary:
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Filter By:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <RadioGroup
            row
            name="filter1"
            aria-label="filter1"
            value={filter1}
            onChange={(e) => setFilter1(e.target.value)}
          >
            <FormControlLabel value="date" control={<Radio />} label="Date" />
            <FormControlLabel
              value="supplier-date"
              control={<Radio />}
              label="Supplier-Date"
            />
          </RadioGroup>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="dateFrom" className="input-label">
              Bill date from:
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
              Bill date to:
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
            <InputLabel htmlFor="supplier" className="input-label">
              Supplier:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="supplier"
              className="input-field"
              value={selectedSupplier}
              disabled={filter1 === "supplier-date" ? false : true}
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
              {allSuppliers.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>
      </Grid>

      <Box
        sx={{
          height: 500,
          width: "100%",
          marginTop: 4,
          "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
          "& .custom-cell": { paddingLeft: 4 },
        }}
      >
        <DataGrid
          rows={(allPurchases || []).map((purchase, index) => ({
            id: index,
            sNo: index + 1,
            ...purchase,
            action: (
              <Button
                variant="contained"
                size="small"
                onClick={() => handleViewClick(purchase)}
              >
                View
              </Button>
            ),
          }))}
          columns={columnsData}
          rowCount={totalCount}
          pagination
          paginationMode="server"
          pageSizeOptions={[10, 25, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
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
        />

        <PurchaseDetailsModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          rowData={selectedRowData}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          "& button": { marginTop: 2, marginLeft: 2 },
        }}
      >
        <Button
          color="warning"
          size="medium"
          variant="outlined"
          onClick={() => {
            setDateFrom(null);
            setDateTo(null);
            setSelectedSupplier("");
            setFilter1("date");
            setPaginationModel({ page: 1, pageSize: 25 });
            fetchAllPurchases();
          }}
          sx={{ borderRadius: 8 }}
        >
          Clear
        </Button>
        <Button
          color="secondary"
          size="medium"
          variant="outlined"
          sx={{ borderRadius: 8 }}
        >
          Print
        </Button>
        <Button
          color="primary"
          size="medium"
          variant="contained"
          onClick={fetchAllPurchases}
          sx={{ borderRadius: 8 }}
        >
          Display
        </Button>
      </Box>
    </Box>
  );
};

export default PurchaseReportSummary;
