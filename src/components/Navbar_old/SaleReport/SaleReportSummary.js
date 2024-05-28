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
import { NotificationManager } from "react-notifications";
import SalesDetailsModal from "./SalesDetailsModal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getAllCustomer } from "../../../services/customerService";
import dayjs from "dayjs";

const SaleReportSummary = () => {
  const [selectOptions, setselectOptions] = useState(null);
  const [allSalesData, setAllSalesData] = useState([]);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
    customerName: "",
    userName: "",
    series: "",
    customerType: "",
    phone: "",
    isChecked: false,
  });
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
  };

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
      field: "customerType",
      headerName: "Customer Type",
      width: 160,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "phoneNumber",
      headerName: "Phone No.",
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
    // {
    //   field: "discAmount",
    //   headerName: "Discount Amt.",
    //   width: 150,
    //   cellClassName: "custom-cell",
    //   headerClassName: "custom-header",
    // },

    {
      field: "splDiscAmount",
      headerName: "S. Discount Amt.",
      width: 160,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    // {
    //   field: "taxAmount",
    //   headerName: "Tax Amt.",
    //   width: 150,
    //   cellClassName: "custom-cell",
    //   headerClassName: "custom-header",
    // },
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
    setSelectedRowData(row);
    setIsModalOpen(true);
  };

  const fetchAllSales = async () => {
    const fromDate = filterData.dateFrom
      ? formatDate(filterData.dateFrom)
      : null;
    const toDate = filterData.dateTo ? formatDate(filterData.dateTo) : null;

    setLoading(true);
    console.log("Fetching data...");
    try {
      const filterOptions = {
        // page:
        //   paginationModel.page === 0
        //     ? paginationModel.page + 1
        //     : paginationModel.page,
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        customerName: filterData.customerName,
        fromDate: fromDate,
        toDate: toDate,
        series: filterData.series,
        phoneNo: filterData.phone,
        customerType: filterData.customerType,
      };
      const allSalesResponse = await getAllSales(filterOptions);
      console.log("allSalesResponse ---> ", allSalesResponse?.data?.data);
      if (allSalesResponse.status === 200) {
        setAllSalesData(allSalesResponse?.data?.data);
        setTotalCount(allSalesResponse?.data.data?.length);
      } else {
        NotificationManager.error("No items found.", "Error");
        setAllSalesData([])
      }
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

  const fetchAllCustomers = async () => {
    try {
      const allCustomerResponse = await getAllCustomer();
      console.log("allCustomerResponse ---> ", allCustomerResponse);
      setAllCustomerData(allCustomerResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchAllSales();
    fetchAllCustomers();
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
    const debouncedFetch = debounce(fetchAllSales, 300);
    debouncedFetch();
  }, [paginationModel, filterData]);

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Sale Report Summary:
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Filter By:
      </Typography>

      <Grid container spacing={2}>
        {/* <Grid item xs={9.5}>
            <RadioGroup
              row
              name="selectOptions"
              aria-labelledby="selectOptions"
              value={selectOptions}
              onChange={(e) => setselectOptions(e.target.value)}
            >
              <FormControlLabel value="date" control={<Radio />} label="Date" />

              <FormControlLabel
                value="series"
                control={<Radio />}
                label="Bill Series"
              />

              <FormControlLabel
                value="customerName"
                control={<Radio />}
                label="Customer Name"
              />
              <FormControlLabel
                value="customerType"
                control={<Radio />}
                label="Customer Type"
              />

              <FormControlLabel
                value="phone"
                control={<Radio />}
                label="Phone No."
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={2.5}>
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
          </Grid> */}

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="dateFrom" className="input-label">
              Bill date from:
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="dateFrom"
                format="DD/MM/YYYY"
                value={filterData.dateFrom}
                className="input-field date-picker"
                onChange={(date) =>
                  setFilterData({ ...filterData, dateFrom: date })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="dateTo" className="input-label">
              Bill date to:
            </InputLabel>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="dateTo"
                format="DD/MM/YYYY"
                value={filterData.dateTo}
                className="input-field date-picker"
                onChange={(date) =>
                  setFilterData({ ...filterData, dateTo: date })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="series" className="input-label">
              Bill Series:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="series"
              className="input-field"
              value={filterData.series}
              onChange={(e) =>
                setFilterData({ ...filterData, series: e.target.value })
              }
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="customerName" className="input-label">
              Customer Name:
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
              {allCustomerData?.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="customerType" className="input-label">
              Customer Type:
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
              {["cash", "online"].map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="phone" className="input-label">
              Phone No.:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="phone"
              className="input-field"
              value={filterData.phone}
              onChange={(e) =>
                setFilterData({ ...filterData, phone: e.target.value })
              }
            />
          </div>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          "& button": { marginTop: 2, marginLeft: 2 },
        }}
      >
        <Button
          color="error"
          size="medium"
          variant="outlined"
          onClick={() => {
            setFilterData({
              dateFrom: null,
              dateTo: null,
              customerName: "",
              userName: "",
              series: "",
              customerType: "",
              phone: "",
              isChecked: false,
            });
            setselectOptions(null);
            setPaginationModel({ page: 0, pageSize: 25 });
            // fetchAllSales();
          }}
          sx={{ borderRadius: 8 }}
        >
          Clear
        </Button>
        <Button
          color="secondary"
          size="medium"
          variant="outlined"
          onClick={() => {}}
          sx={{ borderRadius: 8 }}
        >
          Print
        </Button>
        <Button
          color="primary"
          size="medium"
          variant="contained"
          onClick={() => fetchAllSales()}
          sx={{ borderRadius: 8 }}
        >
          Display
        </Button>
      </Box>

      <Box
        sx={{
          height: 500,
          width: "100%",
          marginTop: 2,
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
            billDate: sale.billDate || "No Data",
            // new Date(sale.billDate).toLocaleDateString("en-GB"),
            billType: sale.billType || "No Data",
            billSeries: sale.billSeries || "No Data",
            customer: sale.customer?.name || "No Data",
            customerType: sale.customer?.type || "No Data",
            phoneNumber: sale.customer?.contactNo || "No Data",
            volume: sale.volume || "No Data",
            totalPcs: sale.totalPcs || "No Data",
            grossAmount: sale.grossAmount || "No Data",
            // discAmount: sale.discAmount || "No Data",
            // splDisc: sale.splDisc,
            splDiscAmount: sale.splDiscAmount || "No Data",
            // taxAmount: sale.taxAmount || "No Data",
            adjustment: sale.adjustment || "No Data",
            netAmount: sale.netAmount || "No Data",
            action: (
              <Button
                variant="contained"
                size="small"
                onClick={() => handleViewClick(sale)}
              >
                View
              </Button>
            ),
          }))}
          columns={columnsData}
          rowCount={totalCount}
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          pageSizeOptions={[10, 25, 50, 100]}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          sx={{ backgroundColor: "#fff" }}
          loading={loading}
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
        />
        <SalesDetailsModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          rowData={selectedRowData}
        />
      </Box>
    </Box>
  );
};

export default SaleReportSummary;
