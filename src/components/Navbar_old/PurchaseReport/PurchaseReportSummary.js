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
import { exportPurchaseSummaryDetails, getAllPurchases } from "../../../services/purchaseService";
import { NotificationManager } from "react-notifications";
import { getAllSuppliers } from "../../../services/supplierService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PurchaseDetailsModal from "./PurchaseDetailsModal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { customTheme } from "../../../utils/customTheme";
import { getAllStores } from "../../../services/storeService";
import { usePermissions } from "../../../utils/PermissionsContext";
import * as XLSX from "xlsx";

const PurchaseReportSummary = () => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [stockIn, setStockIn] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [allStores, setAllStores] = useState([]);
  const [allPurchases, setAllPurchases] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

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
      field: "supplierName",
      headerName: "Supplier Name",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "storeName",
      headerName: "Store Name",
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
      field: "discount",
      headerName: "Disc.",
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
      disableExport: true,
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
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        fromDate: fromDate,
        toDate: toDate,
        supplierName: selectedSupplier,
        storeName: stockIn,
      };
      const response = await getAllPurchases(filterOptions);
      // console.log("Purchases fetched", response?.data?.data)
      setAllPurchases(response?.data?.data?.items || []);
      setTotalCount(response?.data?.data?.totalItems || 0);
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching purchases. Please try again later.",
      //   "Error"
      // );
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
        // NotificationManager.error("No stores found", "Error");
        setAllStores([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching stores. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching stores:", error);
    }
  };

  const fetchAllSuppliers = async () => {
    try {
      const response = await getAllSuppliers();
      // console.log("response: ", response)
      if (response.status === 200) {
        setAllSuppliers(response?.data?.data);
      } else {
        setAllSuppliers([]);
        // NotificationManager.error("No suppliers found.", "Error");
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching suppliers. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchAllStores();
    fetchAllSuppliers();
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
    if (stockIn) {
      debouncedFetch();
    }
  }, [paginationModel, dateFrom, dateTo, selectedSupplier, stockIn]);
  

  const exportToExcel = async () => {
    const fromDate = dateFrom ? formatDate(dateFrom) : null;
    const toDate = dateTo ? formatDate(dateTo) : null;
    
    const filterOptions = {
      fromDate: fromDate,
      toDate: toDate,
      supplierName: selectedSupplier,
      storeName: stockIn,
    };
    
    try {
      const response = await exportPurchaseSummaryDetails(filterOptions);
      const exportData = response?.data?.data;
      console.log("exportData: ", exportData)
      
      if (!exportData || exportData.length === 0) {
        throw new Error("No data returned from API for export.");
      }
  
      
      const dataToExport = exportData.map((purchase, index) => ({
        "S No.": index + 1,
        "Bill Date": purchase.billDate,
        "Pass Date": purchase.passDate,
        "Entry No.": purchase.entryNo,
        "Bill No.": purchase.billNo,
        "Pass No.": purchase.passNo,
        Supplier: purchase.supplier?.name,
        Store: purchase.store?.name,
        MRP: purchase.mrpValue?.toFixed(2),
        "Gross Amount": purchase.grossAmount?.toFixed(2),
        Discount: purchase.discount,
        "Govt ROff": purchase.govtROff?.toFixed(2),
        "Special Purpose": purchase.specialPurpose?.toFixed(2),
        "Tcs Amount": purchase.tcsAmount?.toFixed(2),
        "Net Amount": purchase.netAmount?.toFixed(2),
      }));
      
      console.log("Data to export: ", dataToExport);
  
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "PurchaseReportSummary");
  
      XLSX.writeFile(workbook, "Purchase_Report_Summary.xlsx");
  
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };
    


  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Purchase Report Summary:
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>Filter By:</Typography>

        <Grid container spacing={2}>
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
                Bill date to:
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
              <InputLabel htmlFor="supplier" className="input-label">
                Supplier:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="supplier"
                value={selectedSupplier}
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
                <MenuItem value="">None</MenuItem>
                {allSuppliers.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="stockIn" className="input-label">
                Stock In :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="stockIn"
                value={stockIn}
                onChange={(e) => setStockIn(e.target.value)}
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
            disabled={!canRead && role !== "admin"}
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
              setSelectedSupplier("");
              setStockIn("");
              setPaginationModel({ page: 0, pageSize: 10 });
              setAllPurchases([]);
            }}
          >
            Clear Filters
          </Button>
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllPurchases}
            sx={{ marginLeft: 1 }}
            disabled={!canRead && role !== "admin"}
          >
            Display
          </Button>
          </div>
        </Box>

        <Box
          sx={{
            height: 500,
            width: "100%",
            marginTop: 2,
            "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
            "& .custom-cell": { paddingLeft: 4 },
          }}
        >
          {canRead || role === "admin" ? (
            <DataGrid
              rows={(allPurchases || []).map((purchase, index) => ({
                id: index,
                sNo: index + paginationModel.page * paginationModel.pageSize + 1,
                billDate: purchase.billDate || "No Data",
                passDate: purchase.passDate || "No Data",
                entryNo: purchase.entryNo || 0,
                billNo: purchase.billNo || 0,
                passNo: purchase.passNo || 0,
                supplierName: purchase.supplier?.name || "No Data",
                storeName: purchase.store?.name || "No Data",
                mrpValue: purchase.mrpValue?.toFixed(2) || 0,
                grossAmount: purchase.grossAmount?.toFixed(2) || 0,
                discount: purchase.discount || 0,
                govtROff: purchase.govtROff?.toFixed(2) || 0,
                specialPurpose: purchase.specialPurpose?.toFixed(2) || 0,
                tcsAmount: purchase.tcsAmount?.toFixed(2) || 0,
                netAmount: purchase.netAmount?.toFixed(2) || 0,
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
              onPaginationModelChange={(newPaginationModel) =>
                setPaginationModel(newPaginationModel)
              }
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
          ) : (
            <Typography variant="body1" color="red">
              You do not have permission to view this data.
            </Typography>
          )}

          <PurchaseDetailsModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
            rowData={selectedRowData}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PurchaseReportSummary;
