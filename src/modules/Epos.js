import {
  Autocomplete,
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
import EposReportModal from "./EposReportModal";
import debounce from "lodash.debounce";
import { searchByBrandName, searchByItemName } from "../services/saleBillService";

const Epos = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [allEposData, setAllEposData] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [itemName, setItemName] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
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
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [brandNameOptions, setBrandNameOptions] = useState([]);

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
        // NotificationManager.error("No License Data Found", "Error");
      }
    } catch (error) {
      setLicenseDetails([]);
      // NotificationManager.error(
      //   "Error fetching license. Please try again later.",
      //   "Error"
      // );
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
        flex: 2,
        cellClassName: "custom-cell",
        headerClassName: "custom-header",
      },
      {
        field: "brandName",
        headerName: "Brand Name",
        flex: 2,
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
        itemName: item.itemName || "No Data",
        brandName: item.brandName || "No Data",
        volume: item.volume || 0,
        mrp: item.mrp || 0,
        sendQty: parseFloat(item.totalPcs) || 0,
        saleQty: parseFloat(item.totalPcs) || 0,
      })),
    [allEposData]
  );

  const fetchAllEposData = async () => {
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
        toDate: toDate,
        itemName: itemName,
        brandName: brandName,
      };
      const response = await getAllEpos(filterOptions);
      // console.log("sales fetched", response?.data?.data);
      setAllEposData(response?.data?.data || []);
      setTotalCount(response?.data?.data?.length || 0);
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching sales. Please try again later.",
      //   "Error"
      // );
      setAllEposData([]);
    } finally {
      setLoading(false);
    }
  };

  const itemNameSearch = debounce(async (searchText) => {
    try {
      const response = await searchByItemName(searchText);
      if (response?.data?.data && response.data.data.length > 0) {
        setItemNameOptions(response.data.data);
      } else {
        setItemNameOptions([]);
      }
    } catch (error) {
      console.error("Error searching items:", error);
      setItemNameOptions([]);
    }
  }, 500);


  const brandNameSearch = debounce(async (searchText) => {
    try {
      const response = await searchByBrandName(searchText);
      if (response?.data?.data && response.data.data.length > 0) {
        setBrandNameOptions(response.data.data);
      } else {
        setBrandNameOptions([]);
      }
    } catch (error) {
      console.error("Error searching brand:", error);
      setBrandNameOptions([]);
    }
  }, 500);
  

  const handleItemNameChange = (event, newValue) => {
    setItemName(newValue);
  };

  const handleBrandNameChange = (event, newValue) => {
    setBrandName(newValue);
  };

  useEffect(() => {
    fetchAllEposData();
    fetchLicenseData();
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce(fetchAllEposData, 300);
    debouncedFetch();
  }, [dateFrom, dateTo, itemName, brandName]);

  const processRowUpdate = (newRow, oldRow) => {
    setEditedRows((prevEditedRows) => ({
      ...prevEditedRows,
      [newRow.id]: newRow,
    }));
    // console.log("newRow",newRow)
    return newRow;
  };

  const handleSend = async () => {
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
      quantity: parseFloat(row.sendQty),
    }));

    // console.log("send payload: ", payload);

    setIsLoading(true);
    try {
      const loginPayload = {
        userName: licenseDetails?.eposUserId,
        password: licenseDetails?.eposPassword,
      };

      const loginResponse = await loginEpos(loginPayload);

      if (loginResponse.status === 200) {
        NotificationManager.success("Login successful!", "Success.", 2000);
        NotificationManager.info("Sending EPOS data...","", 4000);
        const response = await multipleEpos(payload);
        // console.log("response ", response);

        const { successfulData, unsuccessfulData } = response?.data || response?.response?.data;
        
        if (response.status === 200) {
          setSuccessItems(successfulData || []);
          setFailedItems(
            (unsuccessfulData || []).map((item) => ({
              item,
              errorMessage: item.error,
            }))
          );
          NotificationManager.success("Epos data sent.", "Success");
          setOpenResponseModal(true);
        } else {
          setSuccessItems(successfulData || []);
          setFailedItems(
            (unsuccessfulData || []).map((item) => ({
              item,
              errorMessage: item.error,
            }))
          );
          NotificationManager.warning(
            "Some items failed to process.",
            "Warning"
          );
        }
        setOpenResponseModal(true);
      } else {
        NotificationManager.error("Problem in login! Please try again.","Error!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error)
      setSuccessItems([]);
      setFailedItems(
        payload.map((item) => ({ item, errorMessage: error.message }))
      );
      NotificationManager.error("Problem processing data.", "Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    const failedData = failedItems.map(({ item }) => {
      const { error, ...rest } = item;
      return rest;
    });
    // console.log(failedData)

    setIsLoading(true);

    try {
      const response = await multipleEpos(failedData);

      if (response.status === 200) {
        setSuccessItems((prev) => [...prev, ...failedData]);
        setFailedItems([]);
        NotificationManager.success("EPOS data resent successfully", "Success");
      } else {
        setFailedItems(
          failedData.map((item) => ({ item, errorMessage: response.message }))
        );
        NotificationManager.error(
          "Some items still failed to process.",
          "Error"
        );
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
    setIsLoading(false);
    setSuccessItems([]);
    setFailedItems([]);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
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
                Item:
              </InputLabel>
              <Autocomplete
                options={itemNameOptions.map((option) => option.name)}
                value={itemName}
                onChange={handleItemNameChange}
                onInputChange={(event, newInputValue) => {
                  itemNameSearch(newInputValue);
                }}
                className="input-field"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    name="itemName"
                  />
                )}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="brandName" className="input-label">
                Brand:
              </InputLabel>
              <Autocomplete
                options={brandNameOptions.map((option) => option.name)}
                value={brandName}
                onChange={handleBrandNameChange}
                onInputChange={(event, newInputValue) => {
                  brandNameSearch(newInputValue);
                }}
                className="input-field"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    name="brandName"
                  />
                )}
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
                setItemNameOptions([]);
                setBrandNameOptions([]);
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
            // pagination={false}
            hideFooterPagination
            // paginationMode="client"
            // pageSizeOptions={[10, 25, 50, 100]}
            // paginationModel={paginationModel}
            // onPaginationModelChange={setPaginationModel}
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
            justifyContent: "flex-end",
            "& button": { marginTop: 1 },
          }}
        >
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={handleSend}
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "SEND"}
          </Button>
        </Box>
        <EposReportModal
          openResponseModal={openResponseModal}
          handleCloseModal={handleCloseModal}
          handleResend={handleResend}
          successItems={successItems}
          failedItems={failedItems}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Epos;
