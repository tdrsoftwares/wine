import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Input,
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
import { NotificationManager } from "react-notifications";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { customTheme } from "../../utils/customTheme";
import { usePermissions } from "../../utils/PermissionsContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  createExpense,
  createExpenseType,
  deleteExpense,
  exportAllExpenses,
  getAllExpenses,
  getAllPaymentRefNumbers,
  getExpenseByPaymentRefNo,
  searchAllExpenseTypes,
  updateExpense,
} from "../../services/expensesService";
import { getAllLedgers } from "../../services/ledgerService";
import dayjs from "dayjs";
import { AddBox } from "@mui/icons-material";
import debounce from "lodash.debounce";
import * as XLSX from "xlsx";

const Expenses = () => {
  const todaysDate = dayjs();
  const [date, setDate] = useState(todaysDate);
  const [expenseType, setExpenseType] = useState("");
  const [allExpenseTypes, setAllExpenseTypes] = useState([]);
  // console.log("allExpenseTypes: ",allExpenseTypes)
  const [allExpenseData, setAllExpenseData] = useState([]);
  const [openExpenseTypeCreateDialog, setOpenExpenseTypeCreateDialog] =
    useState(false);
  const [newExpenseType, setNewExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [paidTo, setPaidTo] = useState("");
  const [payMode, setPayMode] = useState([]);
  const [paymentRefNo, setPaymentRefNo] = useState([]);
  const [paymentRefNoEditable, setPaymentRefNoEditable] = useState(false);
  const [allPaymentRefNo, setAllPaymentRefNo] = useState([]);
  const [paidBy, setPaidBy] = useState("");
  const [remarks, setRemarks] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [allLedgers, setAllLedgers] = useState([]);
  const [expenseId, setExpenseId] = useState("");
  const [totalExpenseCount, setTotalExpenseCount] = useState(0);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [totalAmount, setTotalAmount] = useState("");

  // console.log("allExpenseData: ",allExpenseData)

  const paymentRefNoRef = useRef(null);
  const { permissions, role } = usePermissions();

  const companyPermissions =
    permissions?.find((permission) => permission.moduleName === "expense")
      ?.permissions || [];
  const canCreate = companyPermissions.includes("create");
  const canRead = companyPermissions.includes("read");
  const canUpdate = companyPermissions.includes("update");
  const canDelete = companyPermissions.includes("delete");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const clearForm = () => {
    setDate(todaysDate);
    setExpenseType("");
    setAmount("");
    setPayMode("");
    setPaidBy("");
    setPaidTo("");
    setRemarks("");
    setPaymentRefNoEditable(false);
  };

  const handleCreateExpenseType = async () => {
    if (!newExpenseType) return;

    const payload = { name: newExpenseType };
    try {
      const response = await createExpenseType(payload);
      if (response.status === 200) {
        NotificationManager.success(
          "Expense type created successfully",
          "Success"
        );
        fetchAllExpenseTypes();
        setAllExpenseTypes((prev) => [...prev, response.data]);

        setNewExpenseType("");
        setOpenExpenseTypeCreateDialog(false);
      } else {
        console.error("Failed to create expense type", response.message);
      }
    } catch (error) {
      NotificationManager.error("Error creating expense type", "Error");
      console.error("Error creating expense type", error);
    }
  };

  const handleCreateExpense = async () => {
    const formattedDate = dayjs(date).format("DD/MM/YYYY");

    try {
      const payload = {
        date: formattedDate,
        expenseTypeId: expenseType,
        amount,
        payModeId: payMode,
        paidBy,
        paidTo,
        remarks,
      };

      const response = await createExpense(payload);
      // console.log("created expense", response)

      if (response.status === 200 || response.status === 201) {
        NotificationManager.success("Expense created successfully", "Success");
        setPaymentRefNo(response?.data?.data?.paymentRefNo);
        clearForm();
        fetchAllExpenseData();
      } else {
        NotificationManager.error("Error creating expense", "Error");
      }
    } catch (error) {
      NotificationManager.error("Error creating expense", "Error");
    }
  };

  const handleSaveExpense = async () => {
    const formattedDate = dayjs(date).format("DD/MM/YYYY");
    // console.log("editedRow: ",editedRow);

    const payload = {
      date: formattedDate,
      expenseTypeId: expenseType,
      amount,
      payModeId: payMode,
      paidBy,
      paidTo,
      remarks,
    };

    try {
      if (paymentRefNo && paymentRefNoEditable) {
        const updateExpenseResponse = await updateExpense(payload, expenseId);
        if (updateExpenseResponse.status === 200) {
          NotificationManager.success(
            "Expense updated successfully",
            "Success"
          );
          fetchAllExpenseData();
        } else {
          NotificationManager.error(
            "Error updating Expense. Please try again later.",
            "Error"
          );
          console.error("Error updating Expense:", updateExpenseResponse);
        }
      }
    } catch (error) {
      NotificationManager.error(
        "Error updating Expense. Please try again later.",
        "Error"
      );
      console.error("Error updating Expense:", error);
    }
  };

  const handleDeleteExpense = async (ExpenseId) => {
    try {
      const deleteExpenseResponse = await deleteExpense(ExpenseId);
      if (deleteExpenseResponse.status === 200) {
        NotificationManager.success("Expense deleted successfully", "Success");
        fetchAllExpenseData();
      } else {
        NotificationManager.error(
          "Error deleting Expense. Please try again later.",
          "Error"
        );
        console.error("Error deleting Expense:", deleteExpenseResponse);
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting Expense. Please try again later.",
        "Error"
      );
      console.error("Error deleting Expense:", error);
    }
  };

  const expenseDataSearch = debounce(async () => {
    try {
      if (paymentRefNoEditable && paymentRefNo) {
        const response = await getExpenseByPaymentRefNo(paymentRefNo);

        if (response?.data?.data) {
          const receivedData = response.data.data[0];

          const dateObject = dayjs(receivedData.date, "DD/MM/YYYY");
          // console.log("date obj: ", dateObject);

          setDate(dateObject);
          setExpenseType(receivedData.expenseTypeId);
          setAmount(receivedData.amount);
          setPayMode(receivedData.payModeId?._id);
          setPaidBy(receivedData.paidBy);
          setPaidTo(receivedData.paidTo);
          setRemarks(receivedData.remarks);
          setPaymentRefNo(receivedData.paymentRefNo || "");
          setExpenseId(receivedData._id);
        } else {
          NotificationManager.error("No expense data found to open!", "Error");
        }
      }
    } catch (error) {
      NotificationManager.error("No expense data found to open!", "Error");
      console.error("Error fetching sales:", error);
    }
  }, 700);

  const handlePreviousPaymentRefNo = () => {
    if (paymentRefNo && paymentRefNoEditable)
      setPaymentRefNo(parseInt(paymentRefNo) - 1);
  };

  const handleNextPaymentRefNo = () => {
    if (paymentRefNo && paymentRefNoEditable)
      setPaymentRefNo(parseInt(paymentRefNo) + 1);
  };

  const fetchAllLedger = async () => {
    try {
      const allLedgerResponse = await getAllLedgers();
      // console.log("allLedger response: ", allLedgerResponse);
      if (allLedgerResponse.status === 200) {
        setAllLedgers(allLedgerResponse?.data?.data);
      }
      if (allLedgerResponse?.response?.status === 400) {
        setAllLedgers([]);
        // NotificationManager.error("No Ledgers Found", "Error");
        console.log("No Ledgers Found", "Error");
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching ledgers. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching ledgers:", error);
    }
  };

  const fetchAllExpenseTypes = async () => {
    setLoading(true);
    try {
      const response = await searchAllExpenseTypes();
      // console.log("response ---> ", response);
      if (response.status === 200) {
        setAllExpenseTypes(response?.data?.data);
      } else {
        setAllExpenseTypes([]);
      }
    } catch (error) {
      console.error("Error fetching Expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllExpenseData = async () => {
    const fromDate = dateFrom ? dayjs(dateFrom).format("DD/MM/YYYY") : null;
    const toDate = dateTo ? dayjs(dateTo).format("DD/MM/YYYY") : null;

    try {
      const filterOptions = { fromDate, toDate };
      const response = await getAllExpenses(filterOptions);

      // console.log("Expense data response:", response);

      if (response.status === 200) {
        const expenseData = response?.data?.data[0]?.expenses || [];
        setAllExpenseData(expenseData);
        setTotalAmount(response?.data?.data[0]?.totalAmount);
        setTotalExpenseCount(expenseData?.length);
      } else {
        setAllExpenseData([]);
      }
    } catch (error) {
      console.error("Error fetching expense data!", error);
    }
  };

  const fetchAllPaymentRefNo = async () => {
    try {
      const allPaymentRefNo = await getAllPaymentRefNumbers();
      // console.log("paymentRefNo response ---> ", allPaymentRefNo);
      if (allPaymentRefNo.status === 200 || allPaymentRefNo.status === 201) {
        setAllPaymentRefNo(allPaymentRefNo?.data?.data);
      } else if (allPaymentRefNo.status === 404) {
        NotificationManager.error("No ref no. found", "Error");
        // setAllPaymentRefNo([]);
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching ref no.. Please try again later.",
        "Error"
      );
      setAllPaymentRefNo([]);
      console.error("Error fetching ref no.:", error);
    }
  };

  const fetchExpenseTypesWithDebounce = useCallback(
    debounce((inputValue) => {
      fetchAllExpenseTypes(inputValue);
    }, 300),
    []
  );

  const handleInputChange = (event, newInputValue) => {
    fetchExpenseTypesWithDebounce(newInputValue);
  };

  useEffect(() => {
    // fetchAllExpenseData();
    fetchAllExpenseTypes();
    fetchAllLedger();
  }, []);

  useEffect(() => {
    fetchAllExpenseData();
  }, [dateFrom, dateTo]);

  const handleRemoveExpense = (expenseId) => {
    handleDeleteExpense(expenseId);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = () => {
    // const expenses = allExpenseData?.expenses;
    let sorted = allExpenseData ? [...allExpenseData] : [];

    if (sortBy) {
      sorted.sort((a, b) => {
        let firstValue;
        let secondValue;

        if (sortBy === "date") {
          firstValue = a.date ? dayjs(a.date) : dayjs(0);
          secondValue = b.date ? dayjs(b.date) : dayjs(0);
        } else if (sortBy === "expenseTypeId") {
          firstValue = a.expenseTypeId?.name?.toLowerCase() || "";
          secondValue = b.expenseTypeId?.name?.toLowerCase() || "";
        } else if (sortBy === "payModeId") {
          firstValue = a.payModeId?.name?.toLowerCase() || "";
          secondValue = b.payModeId?.name?.toLowerCase() || "";
        } else {
          firstValue =
            typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy];
          secondValue =
            typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy];
        }

        if (firstValue < secondValue) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (firstValue > secondValue) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sorted;
  };

  useEffect(() => {
    fetchAllPaymentRefNo();
  }, [paymentRefNo, paymentRefNoEditable]);

  useEffect(() => {
    if (paymentRefNo > 0 && paymentRefNoEditable) {
      expenseDataSearch(paymentRefNo);
    }
  }, [paymentRefNo]);

  const exportToExcel = async () => {
    const fromDate = dateFrom ? dayjs(dateFrom).format("DD/MM/YYYY") : null;
    const toDate = dateTo ? dayjs(dateTo).format("DD/MM/YYYY") : null;

    try {
      setLoading(true);
      const filterOptions = { fromDate, toDate };
      const allExpensesResponse = await exportAllExpenses(filterOptions);
      const allExpensesData =
        allExpensesResponse?.data?.data[0]?.expenses || [];

      const dataToExport = allExpensesData.map((expense, index) => ({
        "S. No.": index + 1,
        Date: expense.date || "",
        "Expense Type": expense.expenceType?.name || "",
        Amount: expense.amount || 0,
        "Pay Mode": expense.ledger?.name || "",
        "Paid By": expense.paidBy || "",
        "Paid To": expense.paidTo || "",
        Remarks: expense.remarks || "",
      }));

      dataToExport.push({
        "S. No.": "Total Amount",
        Date: "",
        "Expense Type": "",
        Amount: totalAmount || 0,
        "Pay Mode": "",
        "Paid By": "",
        "Paid To": "",
        Remarks: "",
      });

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

      XLSX.writeFile(workbook, "Expense_Report.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
          Add Expense:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
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
            <div className="input-wrapper">
              <InputLabel htmlFor="expenseType" className="input-label">
                Expense Type :
              </InputLabel>
              <Autocomplete
                options={allExpenseTypes}
                getOptionLabel={(option) => option.name || ""}
                className="input-field"
                value={expenseType}
                onChange={(event, newValue) => setExpenseType(newValue)}
                onInputChange={handleInputChange}
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
                onClick={() => setOpenExpenseTypeCreateDialog(true)}
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
              <InputLabel htmlFor="amount" className="input-label">
                Amount :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="amount"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) setAmount(value);
                }}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="paidTo" className="input-label">
                Paid To :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="paidTo"
                value={paidTo}
                onChange={(e) => setPaidTo(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="payMode" className="input-label">
                Pay Mode :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="payMode"
                value={payMode}
                onChange={(e) => setPayMode(e.target.value)}
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
              <InputLabel htmlFor="paymentRefNo" className="input-label">
                Payment Ref No. :
              </InputLabel>
              <TextField
                select
                fullWidth
                ref={paymentRefNoRef}
                size="small"
                type="number"
                name="paymentRefNo"
                value={paymentRefNo}
                onChange={(e) => setPaymentRefNo(e.target.value)}
                disabled={!paymentRefNoEditable}
              >
                {allPaymentRefNo?.map((item) => (
                  <MenuItem key={item._id} value={item.paymentRefNo}>
                    {item.paymentRefNo}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="paidBy" className="input-label">
                Paid By :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="paidBy"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
              />
            </div>
          </Grid>

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
          <Typography sx={{ marginTop: 1, fontSize: "13px" }}>
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
            onClick={exportToExcel}
            disabled={!canRead && role !== "admin"}
            sx={{
              marginTop: 1,

              padding: "4px 10px",
              fontSize: "11px",
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
                clearForm();
                setPaymentRefNo("");
              }}
              sx={{
                marginTop: 1,
                marginRight: 1,

                padding: "4px 10px",
                fontSize: "11px",
              }}
            >
              Clear
            </Button>
            <Button
              color="success"
              size="small"
              variant="outlined"
              onClick={handlePreviousPaymentRefNo}
              sx={{
                marginTop: 1,
                marginRight: 1,

                padding: "4px 10px",
                fontSize: "11px",
              }}
              disabled={role !== "admin" && !canUpdate}
            >
              Prev
            </Button>
            <Button
              color="secondary"
              size="small"
              variant="outlined"
              onClick={handleNextPaymentRefNo}
              sx={{
                marginTop: 1,
                marginRight: 1,

                padding: "4px 10px",
                fontSize: "11px",
              }}
              disabled={role !== "admin" && !canUpdate}
            >
              Next
            </Button>
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={handleCreateExpense}
              sx={{
                marginTop: 1,
                marginRight: 1,

                padding: "4px 10px",
                fontSize: "11px",
              }}
              disabled={role !== "admin" && !canCreate}
            >
              Create
            </Button>

            <Button
              color="warning"
              size="small"
              variant="contained"
              onClick={() => {
                paymentRefNoRef.current.focus();
                setPaymentRefNoEditable(true);
              }}
              sx={{
                marginRight: 1,
                marginTop: 1,

                padding: "4px 10px",
                fontSize: "11px",
              }}
            >
              Open
            </Button>
            <Button
              color="success"
              size="small"
              variant="contained"
              onClick={handleSaveExpense}
              sx={{
                marginTop: 1,

                padding: "4px 10px",
                fontSize: "11px",
              }}
              disabled={
                (role !== "admin" && !canCreate) || !paymentRefNoEditable
              }
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
                      Expense Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "amount"}
                      direction={sortOrder}
                      onClick={() => handleSort("amount")}
                    >
                      amount
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "payModeId"}
                      direction={sortOrder}
                      onClick={() => handleSort("payModeId")}
                    >
                      Pay Mode
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "paidBy"}
                      direction={sortOrder}
                      onClick={() => handleSort("paidBy")}
                    >
                      Paid By
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "paidTo"}
                      direction={sortOrder}
                      onClick={() => handleSort("paidTo")}
                    >
                      Paid To
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
                  ) : allExpenseData?.length > 0 ? (
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
                            <TableCell>{item.paidBy || ""}</TableCell>
                            <TableCell>{item.paidTo || ""}</TableCell>
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
                                    ? () => handleRemoveExpense(item._id)
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
                          {totalAmount}
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
                count={totalExpenseCount}
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

      <Dialog
        open={openExpenseTypeCreateDialog}
        onClose={() => setOpenExpenseTypeCreateDialog(false)}
      >
        <DialogTitle>Create Expense Type</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Expense Type Name"
            type="text"
            fullWidth
            value={newExpenseType}
            onChange={(e) => setNewExpenseType(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenExpenseTypeCreateDialog(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleCreateExpenseType} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Expenses;
