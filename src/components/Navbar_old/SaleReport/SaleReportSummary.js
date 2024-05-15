import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getAllSales } from "../../../services/saleBillService";
import { DataGrid } from "@mui/x-data-grid";
import { useLoginContext } from "../../../utils/loginContext";
import { NotificationManager } from "react-notifications";

const SaleReportSummary = () => {
  const [selectOptions, setselectOptions] = useState(null);
  const [allSalesData, setAllSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loginResponse } = useLoginContext();
  const [filterData, setFilterData] = useState({
    dateFrom: "mm/dd/yyyy",
    dateTo: "mm/dd/yyyy",
    customerName: "",
    userName: "",
    series: "",
    customerType: "",
    phone: "",
    isChecked: false,
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 25,
  });
  const [totalCount, setTotalCount] = useState(0);

  const seriesOptions = ["A", "B", "C", "D", "E", "ALL"];

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      width: 90,
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
      field: "billDate",
      headerName: "Bill Date",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "billType",
      headerName: "Bill Type",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "billSeries",
      headerName: "Bill Series",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "customer",
      headerName: "Customer Name",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "volume",
      headerName: "Volume",
      width: 180,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalPcs",
      headerName: "Total Pcs.",
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
      field: "discAmount",
      headerName: "Discount Amt.",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "splDisc",
      headerName: "Special Discount",
      width: 160,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "splDiscAmount",
      headerName: "S. Discount Amt.",
      width: 160,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "taxAmount",
      headerName: "Tax Amt.",
      width: 150,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "adjustment",
      headerName: "Adjustment",
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
          // onClick={() => handleViewClick(params.row)}
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

  const fetchAllSales = async () => {
    setLoading(true);
    console.log("Fetching data...");
    try {
      const filterOptions = {
        page:
          paginationModel.page === 0
            ? paginationModel.page + 1
            : paginationModel.page,
        limit: paginationModel.pageSize,
        // supplierName: selectedSupplier,
        // fromDate: dateFrom,
        // toDate: dateTo,
      };
      const allSalesResponse = await getAllSales(loginResponse, filterOptions);
      console.log("allSalesResponse ---> ", allSalesResponse?.data?.data);
      setAllSalesData(allSalesResponse?.data?.data);
      setTotalCount(allSalesResponse?.data.data?.length);
    } catch (error) {
      NotificationManager.error(
        "Error fetching sales. Please try again later.",
        "Error"
      );
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
      console.log("Data fetching completed.");
    }
  };

  useEffect(() => {
    fetchAllSales();
  }, []);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          Sale Report Summary:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RadioGroup
              row
              name="selectOptions"
              aria-labelledby="selectOptions"
              value={selectOptions}
              onChange={(e) => setselectOptions(e.target.value)}
            >
              <FormControlLabel
                value="date-wise-sale"
                control={<Radio />}
                label="Date Wise Sale"
              />
              <FormControlLabel
                value="customer"
                control={<Radio />}
                label="Customer"
              />
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="customer-type"
                control={<Radio />}
                label="Customer Type"
              />
              <FormControlLabel
                value="receipt-mode"
                control={<Radio />}
                label="Receipt Mode"
              />
              <FormControlLabel
                value="customer-phone"
                control={<Radio />}
                label="Customer/Phone"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterData.isChecked}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      isChecked: e.target.checked,
                    })
                  }
                />
              }
              label="Only Disc. Bills"
            />
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="dateFrom" className="input-label">
                Date from :
              </InputLabel>
              <TextField
                fullWidth
                type="date"
                size="small"
                className="input-field"
                name="dateFrom"
                value={filterData.dateFrom}
                onChange={(e) =>
                  setFilterData({ ...filterData, dateFrom: e.target.value })
                }
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="dateFrom" className="input-label">
                Date To :
              </InputLabel>
              <TextField
                fullWidth
                type="date"
                size="small"
                className="input-field"
                name="dateTo"
                value={filterData.dateTo}
                onChange={(e) =>
                  setFilterData({ ...filterData, dateTo: e.target.value })
                }
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="customerName" className="input-label">
                Customer Name :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="customerName"
                className="input-field"
                value={filterData.customerName}
                onChange={(e) =>
                  setFilterData({ ...filterData, customerName: e.target.value })
                }
              >
                {["CASH BILL", "DEALER"].map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="customerType" className="input-label">
                Customer Type :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="customerType"
                className="input-field"
                value={filterData.customerType}
                onChange={(e) =>
                  setFilterData({ ...filterData, customerType: e.target.value })
                }
              >
                {["Cash", "Online"].map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="userName" className="input-label">
                User Name :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="userName"
                className="input-field"
                value={filterData.userName}
                onChange={(e) =>
                  setFilterData({ ...filterData, userName: e.target.value })
                }
              >
                {["admin"].map((pack, id) => (
                  <MenuItem key={id} value={pack}>
                    {pack}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="series" className="input-label">
                Series :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="series"
                className="input-field"
                value={filterData.series}
                onChange={(e) =>
                  setFilterData({ ...filterData, series: e.target.value })
                }
              >
                {seriesOptions.map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="phone" className="input-label">
                Phone :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="phone"
                className="input-field"
                value={filterData.phone}
                onChange={(e) =>
                  setFilterData({ ...filterData, phone: e.target.value })
                }
              >
                {["0", "Cash", "Online"].map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
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
            rows={(allSalesData || [])?.map((sale, index) => ({
              id: index,
              sNo: index + 1,
              billNo: sale.billNo || "No Data",
              billDate:
                new Date(sale.billDate).toLocaleDateString("en-GB") ||
                "No Data",
              billType: sale.billType || "No Data",
              billSeries: sale.billSeries || "No Data",
              customer: sale.customer || "No Data",
              volume: sale.volume || "No Data",
              totalPcs: sale.totalPcs || "No Data",
              grossAmount: sale.grossAmount || "No Data",
              discAmount: sale.discAmount || "No Data",
              splDisc: sale.splDisc || "No Data",
              splDiscAmount: sale.splDiscAmount || "No Data",
              taxAmount: sale.taxAmount || "No Data",
              adjustment: sale.adjustment || "No Data",
              netAmount: sale.netAmount || "No Data",
              action: (
                <Button
                  variant="contained"
                  size="small"
                  // onClick={() => handleViewClick(sale)}
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
    </form>
  );
};

export default SaleReportSummary;
