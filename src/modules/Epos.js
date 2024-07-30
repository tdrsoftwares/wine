import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import { NotificationManager } from "react-notifications";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getAllBrands } from "../services/brandService";
import { getAllItems } from "../services/itemService";
import { customTheme } from "../utils/customTheme";
import { getAllItemCategory } from "../services/categoryService";
import { getAllEpos, loginEpos, multipleEpos } from "../services/eposService";
import { getLicenseInfo } from "../services/licenseService";
import EposResponseModal from "./EposResponseModal";


const Epos = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [allEposData, setAllEposData] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [itemName, setItemName] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [editedRows, setEditedRows] = useState({});
  const [successItems, setSuccessItems] = useState([]);
  const [failedItems, setFailedItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  let todaysDate = new Date();
  const [isLoading, setIsLoading] = useState(false);
  const [licenseDetails, setLicenseDetails] = useState({});

  const [openResponseModal, setOpenResponseModal] = useState(false);

  const formatDateTimeStamp = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const fetchLicenseData = async () => {
    try {
      const response = await getLicenseInfo();

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
      setLicenseDetails([]);
      NotificationManager.error(
        "Error fetching license. Please try again later.",
        "Error"
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
  };

  // console.log("dateFrom: ", formatDate(dateFrom));

  const columns = useMemo(
    () => [
      {
        field: "sNo",
        headerName: "S. No.",
        flex: 1,
        cellClassName: "custom-cell",
        headerClassName: "custom-header",
      },
      {
        field: "itemCode",
        headerName: "Item Code",
        flex: 1,
        cellClassName: "custom-cell",
        headerClassName: "custom-header",
      },
      {
        field: "itemName",
        headerName: "Item Name",
        flex: 1,
        cellClassName: "custom-cell",
        headerClassName: "custom-header",
      },
      {
        field: "mrp",
        headerName: "MRP",
        flex: 1,
        cellClassName: "custom-cell",
        headerClassName: "custom-header",
      },
      {
        field: "volume",
        headerName: "Volume",
        flex: 1,
        cellClassName: "custom-cell",
        headerClassName: "custom-header",
      },
      {
        field: "sendQty",
        headerName: "Send Quantity",
        flex: 1,
        cellClassName: "custom-cell",
        headerClassName: "custom-header",
        editable: true,
      },
      {
        field: "saleQty",
        headerName: "Sale Quantity",
        flex: 1,
        cellClassName: "custom-cell",
        headerClassName: "custom-header",
      },
    ],
    []
  );

  const rows = useMemo(
    () =>
      (allEposData || []).map((item, index) => ({
        id: index,
        sNo: index + 1,
        itemCode: item.itemCode || "No Data",
        itemName: item._id || "No Data",
        volume: item.volume || 0,
        mrp: item.mrp || 0,
        sendQty: parseFloat(item.totalPcs) || 0,
        saleQty: parseFloat(item.totalPcs) || 0,
      })),
    [allEposData]
  );

  const handleViewClick = (row) => {
    setSelectedRowData(row);
  };

  const fetchAllEposData = async () => {
    const fromDate = dateFrom ? formatDate(dateFrom) : null;
    const toDate = dateTo ? formatDate(dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        page:
          paginationModel.page === 0
            ? paginationModel.page + 1
            : paginationModel.page,
        pageSize: paginationModel.pageSize,
        fromDate: fromDate,
        toDate: toDate,
        itemName: itemName,
        brandName: brandName,
      };
      const response = await getAllEpos(filterOptions);
      // console.log("sales fetched", response?.data?.data);
      setAllEposData(response?.data?.data || []);
      setTotalCount(response?.data?.data?.length || 0);
    } catch (error) {
      NotificationManager.error(
        "Error fetching sales. Please try again later.",
        "Error"
      );
      setAllEposData([])
    } finally {
      setLoading(false);
    }
  };

  const fetchAllItems = async () => {
    try {
      const allItemsResponse = await getAllItems();
      if (allItemsResponse) {
        setAllItems(allItemsResponse?.data?.data);
      } else {
        setAllItems([]);
        NotificationManager.error("No items found");
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching items. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllBrands = async () => {
    try {
      const allBrandResponse = await getAllBrands();
      if (allBrandResponse) {
        setAllBrands(allBrandResponse?.data?.data);
      } else {
        setAllBrands([]);
        NotificationManager.error("No brands found");
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      setAllBrands([]);
    }
  };

  useEffect(() => {
    fetchAllBrands();
    fetchAllItems();
    fetchAllEposData();
    fetchLicenseData();
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
    const debouncedFetch = debounce(fetchAllEposData, 300);
    debouncedFetch();
  }, [paginationModel, dateFrom, dateTo, itemName, brandName]);

  const processRowUpdate = (newRow, oldRow) => {
    setEditedRows((prevEditedRows) => ({
      ...prevEditedRows,
      [newRow.id]: newRow,
    }));
    // console.log("newRow",newRow)
    return newRow;
  };

  const handleSendClick = async () => {
    const allRowData = rows.map((row) => {
      const editedRow = editedRows[row.id];
      return editedRow ? { ...row, ...editedRow } : row;
    });

    // console.log("allRowData: ", allRowData);
    const payload = allRowData.map((row) => ({
      licenseeIdNo: licenseDetails.licenceId,
      datetimeStamp: formatDateTimeStamp(todaysDate),
      itemName: row.itemName,
      packSize: row.volume,
      gtin: row.itemCode,
      mrp: row.mrp,
      quantity: row.sendQty,
    }));
    // console.log("send payload: ", payload);

    try {
      const response = await multipleEpos(payload);
      // console.log(response);

      const { successfulData, unsuccessfulData, message } =
        response?.response?.data;

      if (response?.response?.data) {
        setSuccessItems(successfulData || []);
        setFailedItems(
          (unsuccessfulData || []).map((item) => ({
            item,
            errorMessage: message,
          }))
        );
        NotificationManager.success("File processing completed.", "Success");
        setOpenResponseModal(true);
      } else {
        setSuccessItems(successfulData || []);
        setFailedItems(
          unsuccessfulData.map((item) => ({
            item,
            errorMessage: message,
          }))
        );
        NotificationManager.warning("Some items failed to process.", "Warning");
      }
      setOpenResponseModal(true);
    } catch (error) {
      setSuccessItems([]);
      setFailedItems(
        payload.map((item) => ({ item, errorMessage: error.message }))
      );
      NotificationManager.error("Error processing file.", "Error");
    }
  };


  const handleResendClick = async () => {
    const failedData = failedItems.map((failedItem) => failedItem.item);

    try {
      const response = await multipleEpos(failedData);
      if (response.status === 200) {
        setSuccessItems((prev) => [...prev, ...failedData]);
        setFailedItems([]);
        NotificationManager.success("Failed items resent successfully.","Success");
      } else {
        setFailedItems(
          failedData.map((item) => ({ item, errorMessage: response.message }))
        );
        NotificationManager.error("Some items still failed to process.","Error");
      }
    } catch (error) {
      setFailedItems(
        failedData.map((item) => ({ item, errorMessage: error.message }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenResponseModal(false);
  };


  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Epos :
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

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemName" className="input-label">
                Item Name:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="brandName" className="input-label">
                Brand:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
               
              />
              
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
                setDateFrom(null);
                setDateTo(null);
                setItemName("");
                setBrandName("");
                setPaginationModel({ page: 0, pageSize: 10 });
                fetchAllEposData();
              }}
              // sx={{ borderRadius: 8 }}
            >
              Clear Filters
            </Button>
            <Button
              color="info"
              size="small"
              variant="contained"
              onClick={fetchAllEposData}
              sx={{ marginLeft: 2 }}
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
            columns={columns}
            rowCount={totalCount}
            pagination
            paginationMode="server"
            pageSizeOptions={[10, 25, 50, 100]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
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
            processRowUpdate={processRowUpdate}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& button": { marginTop: 1 },
          }}
        >
          
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={handleSendClick}
            sx={{ mt: 2 }}
          >
            Send
          </Button>
        </Box>
        <EposResponseModal openResponseModal={openResponseModal} handleCloseModal={handleCloseModal} handleResendClick={handleResendClick}successItems={successItems} failedItems={failedItems} />
      </Box>
    </ThemeProvider>
  );
};

export default Epos;
