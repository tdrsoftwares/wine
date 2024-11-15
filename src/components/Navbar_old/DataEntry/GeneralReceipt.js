import React, { useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { customTheme } from "../../../utils/customTheme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AddBox } from "@mui/icons-material";
import { usePermissions } from "../../../utils/PermissionsContext";
import { NotificationManager } from "react-notifications";
import CloseIcon from "@mui/icons-material/Close";


const GeneralReceipt = () => {
  const todaysDate = dayjs();
  const [date, setDate] = useState(todaysDate);
  const [receiptType, setReceiptType] = useState("");
  const [allReceiptTypes, setAllReceiptTypes] = useState([]);
  const [openReceiptTypeCreateDialog, setOpenReceiptTypeCreateDialog] = useState(false);
  const [receiptFrom, setReceiptFrom] = useState("");
  const [receiptBy, setReceiptBy] = useState("");
  const [receiptMode, setReceiptMode] = useState([]);
  const [allReceiptRefNo, setAllReceiptRefNo] = useState([]);
  const [paymentRefNoEditable, setPaymentRefNoEditable] = useState(false);
  const [allPaymentRefNo, setAllPaymentRefNo] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [allLedgers, setAllLedgers] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState(todaysDate);
  const [bankAccnt, setBankAccnt] = useState("");
  const [bankBal, setBankBal] = useState("");
  const [allReceiptData, setAllReceiptData] = useState([]);

  const paymentRefNoRef = useRef(null);
  const { permissions, role } = usePermissions();

  const companyPermissions =
    permissions?.find((permission) => permission.moduleName === "receipt")
      ?.permissions || [];
  const canCreate = companyPermissions.includes("create");
  const canRead = companyPermissions.includes("read");
  const canUpdate = companyPermissions.includes("update");
  const canDelete = companyPermissions.includes("delete");

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = () => {
    // const expenses = allReceiptData?.expenses;
    // let sorted = allReceiptData ? [...allReceiptData] : [];
    let sorted = [];

    if (sortBy) {
      // sorted.sort((a, b) => {
      //   let firstValue;
      //   let secondValue;

      //   if (sortBy === "date") {
      //     firstValue = a.date ? dayjs(a.date) : dayjs(0);
      //     secondValue = b.date ? dayjs(b.date) : dayjs(0);
      //   } else if (sortBy === "expenseTypeId") {
      //     firstValue = a.expenseTypeId?.name?.toLowerCase() || "";
      //     secondValue = b.expenseTypeId?.name?.toLowerCase() || "";
      //   } else if (sortBy === "receiptModeId") {
      //     firstValue = a.receiptModeId?.name?.toLowerCase() || "";
      //     secondValue = b.receiptModeId?.name?.toLowerCase() || "";
      //   } else {
      //     firstValue =
      //       typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy];
      //     secondValue =
      //       typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy];
      //   }

      //   if (firstValue < secondValue) {
      //     return sortOrder === "asc" ? -1 : 1;
      //   }
      //   if (firstValue > secondValue) {
      //     return sortOrder === "asc" ? 1 : -1;
      //   }
      //   return 0;
      // });
    }

    return sorted;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchAllReceiptData = async () => {
    const fromDate = dateFrom ? dayjs(dateFrom).format("DD/MM/YYYY") : null;
    const toDate = dateTo ? dayjs(dateTo).format("DD/MM/YYYY") : null;

    try {
      const filterOptions = { fromDate, toDate };
      // const response = await getAllReceipts(filterOptions);
      const response = [];

      // console.log("Receipt data response:", response);

      if (response.status === 200) {
        const receiptData = response?.data?.data[0]?.expenses || [];
        setAllReceiptData(receiptData);
        // setTotalAmount(response?.data?.data[0]?.totalAmount);
        // setTotalExpenseCount(receiptData?.length);
      } else {
        setAllReceiptData([]);
      }
    } catch (error) {
      console.error("Error fetching receipt data!", error);
    }
  };

  const handleDeleteReceipt = async (ExpenseId) => {
    try {
      // const deleteReceiptResponse = await deleteExpense(ExpenseId);
      const deleteReceiptResponse = [];
      if (deleteReceiptResponse.status === 200) {
        NotificationManager.success("Receipt deleted successfully", "Success");
        fetchAllReceiptData();
      } else {
        NotificationManager.error(
          "Error deleting Receipt. Please try again later.",
          "Error"
        );
        console.error("Error deleting Receipt:", deleteReceiptResponse);
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting Receipt. Please try again later.",
        "Error"
      );
      console.error("Error deleting Receipt:", error);
    }
  };

  const handleRemoveReceipt = (expenseId) => {
    handleDeleteReceipt(expenseId);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle1" gutterBottom>
          Add Receipt:
        </Typography>

        <Typography variant="body2" gutterBottom>
          Receiver Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            {/* <div className="input-wrapper">
              <InputLabel htmlFor="receivedFrom" className="input-label">
                Received from :
              </InputLabel>
              <TextField
                select
                fullWidth
                name="receivedFrom"
                className="input-field"
                value={receivedFrom}
                onChange={(e) => setReceiptFrom(e.target.value)}
              >
                {[
                  "BEVCO F.L",
                  "CAR A/C",
                  "COMMISSION A/C",
                  "CREDIT NOTE",
                  "KALYANI BEER HUB",
                  "Opening Stock",
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div> */}

            <div className="input-wrapper">
              <InputLabel htmlFor="date" className="input-label">
                Date :
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="date"
                  format="DD/MM/YYYY"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </div>
          </Grid>

          <Grid item xs={3}>
            {/* <div className="input-wrapper">
              <InputLabel htmlFor="receiptType" className="input-label">
                Receipt Type :
              </InputLabel>
              <TextField
                fullWidth
                name="receiptType"
                className="input-field"
                value={receiptType}
                onChange={(e) => setReceiptType(e.target.value)}
              />
            </div> */}

            <div className="input-wrapper">
              <InputLabel htmlFor="receiptType" className="input-label">
              Receipt Type :
              </InputLabel>
              <Autocomplete
                options={allReceiptTypes}
                getOptionLabel={(option) => option.name || ""}
                className="input-field"
                value={receiptType}
                onChange={(event, newValue) => setReceiptType(newValue)}
                // onInputChange={handleInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search here..."
                    fullWidth
                    size="small"
                  />
                )}
              />

              <IconButton
                onClick={() => setOpenReceiptTypeCreateDialog(true)}
                size="small"
                color="primary"
                style={{ marginLeft: 1 }}
              >
                <AddBox />
              </IconButton>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="receiptBy" className="input-label">
                Receipt By :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="receiptBy"
                value={receiptBy}
                onChange={(e) => setReceiptBy(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="receiptMode" className="input-label">
                Receipt Mode :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="receiptMode"
                value={receiptMode}
                onChange={(e) => setReceiptMode(e.target.value)}
              >
                {allLedgers?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="allReceiptRefNo" className="input-label">
                Receipt Ref No. :
              </InputLabel>
              <TextField
                select
                fullWidth
                // ref={paymentRefNoRef}
                size="small"
                name="allReceiptRefNo"
                value={allReceiptRefNo}
                onChange={(e) => setAllReceiptRefNo(e.target.value)}
                disabled={!paymentRefNoEditable}
              >
                {allPaymentRefNo?.map((item) => (
                  <MenuItem key={item._id} value={item.allReceiptRefNo}>
                    {item.allReceiptRefNo}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="receiptFrom" className="input-label">
                Receipt From :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="receiptFrom"
                value={receiptFrom}
                onChange={(e) => setReceiptFrom(e.target.value)}
              />
            </div>
          </Grid>

          {/* <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="currentBal" className="input-label">
                Current Bal :
              </InputLabel>
              <TextField
                fullWidth
                name="currentBal"
                className="input-field"
                value={currentBal}
                onChange={(e) => setCurrentBal(e.target.value)}
              />
            </div>
          </Grid> */}

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="remarks" className="input-label">
                Remarks :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>

        <Box sx={{ minWidth: "900px" }}>
          <Typography sx={{ marginTop: 2, fontSize: "13px" }}>
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
                    onChange={(newDate) => setDateFrom(newDate)}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: "100%" }}
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
                    onChange={(newDate) => setDateTo(newDate)}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </div>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            color="success"
            size="small"
            variant="contained"
            // onClick={exportToExcel}
            // disabled={!canRead && role !== "admin"}
            sx={{
              marginTop: 1,
            }}
          >
            Export to Excel
          </Button>

          <div>
            <Button
              color="inherit"
              size="small"
              variant="outlined"
              onClick={() => {
                // clearForm();
                // setAllReceiptRefNo("");
              }}
              sx={{
                marginTop: 1,
                marginRight: 1,
              }}
            >
              Clear
            </Button>
            <Button
              color="success"
              size="small"
              variant="outlined"
              // onClick={handlePreviousPaymentRefNo}
              sx={{
                marginTop: 1,
                marginRight: 1,
              }}
              // disabled={role !== "admin" && !canUpdate}
            >
              Prev
            </Button>
            <Button
              color="secondary"
              size="small"
              variant="outlined"
              // onClick={handleNextPaymentRefNo}
              sx={{
                marginTop: 1,
                marginRight: 1,
              }}
              // disabled={role !== "admin" && !canUpdate}
            >
              Next
            </Button>
            <Button
              color="primary"
              size="small"
              variant="contained"
              // onClick={handleCreateExpense}
              sx={{
                marginTop: 1,
                marginRight: 1,
              }}
              // disabled={role !== "admin" && !canCreate}
            >
              Create
            </Button>

            <Button
              color="warning"
              size="small"
              variant="contained"
              onClick={() => {
                // paymentRefNoRef.current.focus();
                // setPaymentRefNoEditable(true);
              }}
              sx={{
                marginRight: 1,
                marginTop: 1,
              }}
            >
              Open
            </Button>
            <Button
              color="success"
              size="small"
              variant="contained"
              // onClick={handleSaveExpense}
              sx={{
                marginTop: 1,
              }}
              // disabled={
              //   (role !== "admin" && !canCreate) || !paymentRefNoEditable
              // }
            >
              Save
            </Button>
          </div>
        </Box>

        <Box sx={{ borderRadius: 1, marginTop: 2 }}>
          <TableContainer component={Paper}>
            <Table size="small" padding="normal" stickyHeader={true}>
              <TableHead>
                <TableRow className="table-head-2">
                  <TableCell align="center" sx={{ minWidth: "80px" }}>
                    S. No.
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "date"}
                      direction={sortOrder}
                      onClick={() => handleSort("date")}
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "expenseTypeId"}
                      direction={sortOrder}
                      onClick={() => handleSort("expenseTypeId")}
                    >
                      Receipt Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "amount"}
                      direction={sortOrder}
                      onClick={() => handleSort("amount")}
                    >
                      Amount
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "receiptModeId"}
                      direction={sortOrder}
                      onClick={() => handleSort("receiptModeId")}
                    >
                      Receipt Mode
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "receiptBy"}
                      direction={sortOrder}
                      onClick={() => handleSort("receiptBy")}
                    >
                      Received By
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "receiptFrom"}
                      direction={sortOrder}
                      onClick={() => handleSort("receiptFrom")}
                    >
                      Received From
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "remarks"}
                      direction={sortOrder}
                      onClick={() => handleSort("remarks")}
                    >
                      Remarks
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {canRead || role === "admin" ? (
                  loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={11}
                        align="center"
                        sx={{
                          backgroundColor: "#fff !important",
                        }}
                      >
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : allReceiptData?.length > 0 ? (
                    <>
                      {sortedData()
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => (
                          <TableRow
                            key={item._id}
                            sx={{ backgroundColor: "#fff" }}
                          >
                            <TableCell align="center">
                              {page * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell>{item.date || ""}</TableCell>
                            <TableCell>
                              {item?.expenceType?.name || ""}
                            </TableCell>
                            <TableCell>{item.amount || 0}</TableCell>
                            <TableCell>{item?.ledger?.name || ""}</TableCell>
                            <TableCell>{item.receiptFrom || ""}</TableCell>
                            <TableCell>{item.receiptFrom || ""}</TableCell>
                            <TableCell>{item.remarks || ""}</TableCell>
                            <TableCell>
                              <CloseIcon
                                sx={{
                                  cursor:
                                    canDelete || role === "admin"
                                      ? "pointer"
                                      : "not-allowed",
                                  color:
                                    canDelete || role === "admin"
                                      ? "red"
                                      : "gray",
                                }}
                                onClick={
                                  canDelete || role === "admin"
                                    ? () => handleRemoveReceipt(item._id)
                                    : null
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      {/* Total Amount Row */}
                      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                          Total
                        </TableCell>
                        <TableCell colSpan={2} />
                        <TableCell
                          colSpan={10}
                          align="left"
                          sx={{ fontWeight: "bold" }}
                        >
                          {/* {totalAmount} */}
                          {0}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <TableRow
                      sx={{
                        backgroundColor: "#fff",
                      }}
                    >
                      <TableCell colSpan={12} align="center">
                        No Data
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  <TableRow
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  >
                    <TableCell colSpan={12} align="center">
                      You do not have permission to view item data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {canRead ||
            (role === "admin" && (
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                    {
                      fontSize: "12px",
                    },
                }}
              />
            ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default GeneralReceipt;
