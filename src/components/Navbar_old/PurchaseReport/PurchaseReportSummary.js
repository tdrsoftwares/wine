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
import { getAllPurchases, getItemPurchaseDetails } from "../../../services/purchaseService";
import { useLoginContext } from "../../../utils/loginContext";
import { NotificationManager } from "react-notifications";
import { getAllSuppliers } from "../../../services/supplierService";
import { DataGrid } from "@mui/x-data-grid";
import PurchaseDetailsModal from "./PurchaseDetailsModal";

const PurchaseReportSummary = () => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [dateFrom, setDateFrom] = useState("mm/dd/yyyy");
  const [dateTo, setDateTo] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState("date-wise");
  const [allPurchases, setAllPurchases] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 25
  })

  const [totalCount, setTotalCount] = useState(0);
  const { loginResponse } = useLoginContext();
  const [loading, setLoading] = useState(false);
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
          ? { ...col, sortable: false, fiterable: false }
          : col
      ),
    [columns]
  );

  const handleViewClick = (row) => {
    console.log("row: ", row);
    setSelectedRowData(row);
    setIsModalOpen(true);

  };
  
  const fetchAllPurchase = async () => {
    setLoading(true);
    try {
      const filterOptions = {
        page:
          paginationModel.page === 0
            ? paginationModel.page + 1
            : paginationModel.page,
        limit: paginationModel.pageSize,
        //   supplierName: selectedSupplier,
        //   fromDate: dateFrom,
        //   toDate: dateTo,
      };
      const allPurchaseResponse = await getAllPurchases(
        loginResponse,
        filterOptions
      );
      console.log("allPurchaseResponse ---> ", allPurchaseResponse?.data?.data);
      setAllPurchases(allPurchaseResponse?.data?.data);
      setTotalCount(allPurchaseResponse?.data?.data?.length);
    } catch (error) {
      NotificationManager.error(
        "Error fetching purchase. Please try again later.",
        "Error"
      );
      console.error("Error fetching purchase:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSuppliers = async () => {
    try {
      const allSuppliersResponse = await getAllSuppliers(loginResponse);
      console.log("allSuppliersResponse: ", allSuppliersResponse);
      setAllSuppliers(allSuppliersResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching suppliers. Please try again later.",
        "Error"
      );
    }
  };
  
  useEffect(() => {
    fetchAllSuppliers();
    fetchAllPurchase();
  }, [loginResponse]);
  

  useEffect(() => {
    fetchAllPurchase();
  }, [paginationModel]);

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
        Purchase Report Summary:
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RadioGroup
            row
            name="filter1"
            aria-label="filter1"
            value={filter1}
            onChange={(e) => setFilter1(e.target.value)}
          >
            <FormControlLabel
              value="date-wise"
              control={<Radio />}
              label="Date Wise"
            />

            <FormControlLabel
              value="supplier/date-wise"
              control={<Radio />}
              label="Supplier/Date Wise"
            />
          </RadioGroup>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="dateFrom" className="input-label">
              Date from :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              type="date"
              name="dateFrom"
              className="input-field"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="dateFrom" className="input-label">
              Date To :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              type="date"
              name="dateTo"
              className="input-field"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </Grid>

        {filter1 === "supplier/date-wise" && (
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="supplier" className="input-label">
                Supplier :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="supplier"
                className="input-field"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                {allSuppliers.map((item, id) => (
                  <MenuItem key={id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
        )}
      </Grid>

      <Box
        sx={{
          height: 500,
          width: "100%",
          marginTop: 4,
          "& .custom-header": {
            backgroundColor: "#dae4ed",
            paddingLeft: 4,
          },
          "& .custom-cell": {
            paddingLeft: 4,
          },
        }}
      >
        <DataGrid
          rows={(allPurchases || []).map((purchase, index) => ({
            id: index,
            sNo: index + 1,
            entryNo: purchase.entryNo,
            billNo: purchase.billNo,
            passNo: purchase.passNo,
            billDate: purchase.billDate,
            passDate: purchase.passDate,
            supplierName: purchase.supplierName,
            mrpValue: purchase.mrpValue,
            grossAmount: purchase.grossAmount,
            discountAmount: purchase.discountAmount,
            govtROff: purchase.govtROff,
            specialPurpose: purchase.specialPurpose,
            sTaxAmount: purchase.sTaxAmount,
            tcsAmount: purchase.tcsAmount,
            netAmount: purchase.netAmount,
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
          onPaginationModelChange={setPaginationModel}
          sx={{ backgroundColor: "#fff" }}
          loadingOverlay={
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
          }
          loading={loading}
        />
        {/* Modal to display details */}
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
          color="primary"
          size="medium"
          variant="contained"
          onClick={() => {}}
          sx={{ borderRadius: 8 }}
        >
          Display
        </Button>
        <Button
          color="secondary"
          size="medium"
          variant="contained"
          onClick={() => {}}
          sx={{ borderRadius: 8 }}
        >
          Print
        </Button>
        <Button
          color="error"
          size="medium"
          variant="outlined"
          onClick={() => {}}
          sx={{ borderRadius: 8 }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default PurchaseReportSummary;
