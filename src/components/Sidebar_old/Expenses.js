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
  getAllExpenses,
  searchAllExpenseTypes,
  updateExpense,
} from "../../services/expensesService";
import { getAllLedgers } from "../../services/ledgerService";
import dayjs from "dayjs";
import { AddBox } from "@mui/icons-material";
import debounce from "lodash.debounce";

const Expenses = () => {
  const todaysDate = dayjs();
  const [date, setDate] = useState(todaysDate);
  const [expenseType, setExpenseType] = useState("");
  const [allExpenseTypes, setAllExpenseTypes] = useState([]);
  const [allExpenseData, setAllExpenseData] = useState({});
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newExpenseType, setNewExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [paidTo, setPaidTo] = useState("");
  const [payMode, setPayMode] = useState([]);
  const [paymentRefNo, setPaymentRefNo] = useState([]);
  const [paidBy, setPaidBy] = useState("");
  const [remarks, setRemarks] = useState("");
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [allLedgers, setAllLedgers] = useState([]);

  console.log("allExpenseData: ",allExpenseData)
  const tableRef = useRef(null);
  const { permissions, role } = usePermissions();

  const companyPermissions =
    permissions?.find((permission) => permission.moduleName === "Expense")
      ?.permissions || [];
  const canCreate = companyPermissions.includes("create");
  const canRead = companyPermissions.includes("read");
  const canUpdate = companyPermissions.includes("update");
  const canDelete = companyPermissions.includes("delete");

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditableIndex(null);
      setEditedRow({});
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearForm = () => {
    setDate(todaysDate);
    setExpenseType("");
    setAmount("");
    setPayMode("");
    setPaidBy("");
    setPaidTo("");
    setRemarks("");
    setEditableIndex(null);
    setEditedRow({});
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
        setAllExpenseTypes((prev) => [...prev, response.data]);

        setNewExpenseType("");
        setOpenCreateDialog(false);
      } else {
        console.error("Failed to create expense type", response.message);
      }
    } catch (error) {
      NotificationManager.error("Error creating expense type", "Error");
      console.error("Error creating expense type", error);
    }
  };

  const handleCreateExpense = async () => {
    try {
      const payload = {
        date,
        expenseTypeId: expenseType,
        amount,
        payModeId: payMode,
        paidBy,
        paidTo,
        remarks,
      };

      const response = await createExpense(payload);

      if (response.status === 200 || response.status === 201) {
        NotificationManager.success(
          "Expense type created successfully",
          "Success"
        );
        clearForm();
        fetchAllExpenseData();
      } else {
        NotificationManager.error("Error creating expense type", "Error");
      }
    } catch (error) {
      NotificationManager.error("Error creating expense type", "Error");
    }
  };

  const handleUpdateExpense = async (ExpenseId) => {
    const formattedDate = dayjs(editedRow.date).format("DD/MM/YYYY");
    console.log("editedRow: ",editedRow);

    const payload = {
      date: formattedDate,
      expenseTypeId: editedRow.expenseTypeId?._id || editedRow.expenseTypeId,
      amount: editedRow.amount,
      payModeId: editedRow.payModeId?._id || editedRow.payModeId,
      paidBy: editedRow.paidBy,
      paidTo: editedRow.paidTo,
      remarks: editedRow.remarks,
    };
    try {
      const updateExpenseResponse = await updateExpense(payload, ExpenseId);
      if (updateExpenseResponse.status === 200) {
        NotificationManager.success("Expense updated successfully", "Success");
        setEditableIndex(null);
        setEditedRow({});
        fetchAllExpenseData();
      } else {
        NotificationManager.error(
          "Error updating Expense. Please try again later.",
          "Error"
        );
        console.error("Error updating Expense:", updateExpenseResponse);
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
    try {
      const response = await getAllExpenses(page+1, rowsPerPage);
      // console.log("expense data response ---> ", response);
      
      if (response.status === 200) {
        setAllExpenseData(response?.data?.data);
      } else {
        // NotificationManager.error("No expense data found!" , "Error");
        setAllExpenseData({});
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching expense data! Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching expense!", error);
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
    fetchAllExpenseData();
    fetchAllExpenseTypes();
    fetchAllLedger();
  }, []);

  const handleEditClick = (index, expenseId) => {
    setEditableIndex(index);
    const selectedExpense = allExpenseData?.expenses?.find((item) => item._id === expenseId);
    setEditedRow(selectedExpense);
  };

  const handleSaveClick = (expenseId) => {
    handleUpdateExpense(expenseId);
  };

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
    const expenses = allExpenseData?.expenses;
    let sorted = expenses ? [...expenses] : [];
  
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
          firstValue = typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy];
          secondValue = typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy];
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
                  className="date-picker"
                  onChange={(newDate) => setDate(newDate)}
                  renderInput={(params) => <TextField {...params} />}
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
                onClick={() => setOpenCreateDialog(true)}
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
                onChange={(e) => setAmount(e.target.value)}
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
                fullWidth
                size="small"
                type="number"
                name="paymentRefNo"
                value={paymentRefNo}
                onChange={(e) => setPaymentRefNo(e.target.value)}
                disabled={true}
              />
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            color="primary"
            size="medium"
            variant="contained"
            onClick={handleCreateExpense}
            sx={{
              marginTop: 1,
              marginRight: 1,
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: "11px",
            }}
            disabled={role !== "admin" && !canCreate}
          >
            Create
          </Button>
          <Button
            color="warning"
            size="medium"
            variant="outlined"
            onClick={clearForm}
            sx={{
              marginTop: 1,
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: "11px",
            }}
          >
            Clear
          </Button>
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
                      expenseTypeId
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
                      payModeId
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "paidBy"}
                      direction={sortOrder}
                      onClick={() => handleSort("paidBy")}
                    >
                      paidBy
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
                      remarks
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
                  ) : allExpenseData && sortedData().length > 0 ? (
                    sortedData()
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => (
                        <TableRow
                          key={item._id}
                          sx={{
                            backgroundColor: "#fff",
                          }}
                        >
                          <TableCell align="center">
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  id="date"
                                  format="DD/MM/YYYY"
                                  value={dayjs(editedRow.date)}
                                  className="date-picker"
                                  onChange={(newDate) => {
                                    setEditedRow({
                                      ...editedRow,
                                      date: newDate?.format("YYYY-MM-DD"),
                                    });
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </LocalizationProvider>
                            ) : (
                              item.date
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow?.expenseTypeId?.name}
                                onChange={(e) =>
                                  setEditedRow({
                                    ...editedRow,
                                    expenseTypeId: { name: e.target.value },
                                  })
                                }
                                readOnly
                              />
                            ) : (
                              item?.expenseTypeId?.name
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow.amount}
                                onChange={(e) =>
                                  setEditedRow({
                                    ...editedRow,
                                    amount: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              item.amount
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editableIndex?.payModeId?.name}
                                onChange={(e) => {
                                  setEditedRow({
                                    ...editedRow,
                                    payModeId: { name: e.target.value },
                                  });
                                }}
                                readOnly
                              />
                            ) : (
                              item?.payModeId?.name
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow.paidBy}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setEditedRow({
                                    ...editedRow,
                                    paidBy: value,
                                  });
                                }}
                              />
                            ) : (
                              item.paidBy
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow.paidTo}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setEditedRow({
                                    ...editedRow,
                                    paidTo: value,
                                  });
                                }}
                              />
                            ) : (
                              item.paidTo
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow.remarks}
                                onChange={(e) => {
                                  setEditedRow({
                                    ...editedRow,
                                    remarks: e.target.value,
                                  });
                                }}
                              />
                            ) : (
                              item.remarks
                            )}
                          </TableCell>

                          <TableCell>
                            {editableIndex === index ? (
                              <SaveIcon
                                sx={{
                                  cursor:
                                    canUpdate || role === "admin"
                                      ? "pointer"
                                      : "not-allowed",
                                  color:
                                    canUpdate || role === "admin"
                                      ? "green"
                                      : "gray",
                                }}
                                onClick={
                                  canUpdate || role === "admin"
                                    ? () => handleSaveClick(item._id)
                                    : null
                                }
                              />
                            ) : (
                              <EditIcon
                                sx={{
                                  cursor:
                                    canUpdate || role === "admin"
                                      ? "pointer"
                                      : "not-allowed",
                                  color:
                                    canUpdate || role === "admin"
                                      ? "blue"
                                      : "gray",
                                }}
                                onClick={
                                  canUpdate || role === "admin"
                                    ? () => handleEditClick(index, item._id)
                                    : null
                                }
                              />
                            )}
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
                      ))
                  ) : (
                    <TableRow
                      sx={{
                        backgroundColor: "#fff",
                      }}
                    >
                      <TableCell colSpan={11} align="center">
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
                    <TableCell colSpan={11} align="center">
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
                count={allExpenseData?.totalLength}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            ))}
        </Box>
      </Box>

      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
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
          <Button onClick={() => setOpenCreateDialog(false)} color="primary">
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
