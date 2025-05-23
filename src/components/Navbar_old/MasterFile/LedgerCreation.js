import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Input,
  InputLabel,
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
import {
  createLedger,
  deleteLedger,
  getAllLedgers,
  updateLedger,
} from "../../../services/ledgerService";
import { NotificationManager } from "react-notifications";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { customTheme } from "../../../utils/customTheme";
import { usePermissions } from "../../../utils/PermissionsContext";

const LedgerCreation = ({ sidebarVisible }) => {
  const [ledgerName, setLedgerName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [openingBal, setOpeningBal] = useState("");
  const [closingBal, setClosingBal] = useState("");
  const [allLedgers, setAllLedgers] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { permissions, role } = usePermissions();

  const companyPermissions =
    permissions?.find((permission) => permission.moduleName === "Ledger")
      ?.permissions || [];
  const canCreate = companyPermissions.includes("create");
  const canRead = companyPermissions.includes("read");
  const canUpdate = companyPermissions.includes("update");
  const canDelete = companyPermissions.includes("delete");

  const clearForm = () => {
    setLedgerName("");
    setGroupName("");
    setOpeningBal("");
    setClosingBal("");
  };

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

  const fetchAllLedger = async () => {
    try {
      const allLedgerResponse = await getAllLedgers();
      setAllLedgers(allLedgerResponse?.data?.data);
      setLoading(false);
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching companies. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching companies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLedger();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = () => {
    let sorted = allLedgers ? [...allLedgers] : [];
    if (sortBy) {
      sorted.sort((a, b) => {
        const firstValue =
          typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy];
        const secondValue =
          typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy];
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

  const handleCreateLedger = async () => {
    const payload = {
      name: ledgerName,
      underGroup: groupName,
      openingBlance: openingBal,
      closingBlance: closingBal,
    };

    try {
      const response = await createLedger(payload);
      if (response.status === 200) {
        NotificationManager.success("Ledger created successfully", "Success");
        clearForm();
        fetchAllLedger();
      } else {
        NotificationManager.error(
          "Error creating ledger. Please try again.",
          "Error"
        );
        console.error("Error creating ledger:", response);
      }
    } catch (error) {
      console.log("Error fetching ledgers", error);
      NotificationManager.error("Error fetching ledgers", "Error");
    }
  };

  const handleSaveClick = async (id) => {
    try {
      const updateResponse = await updateLedger(editedRow, id);
      if (updateResponse.status === 200) {
        NotificationManager.success("Ledger updated successfully", "Success");
        setEditableIndex(null);
        setEditedRow({});
        fetchAllLedger();
      } else {
        NotificationManager.error(
          "Error updating ledger. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error updating ledger. Please try again later.",
        "Error"
      );
    }
  };

  const handleEditClick = (index, id) => {
    setEditableIndex(index);
    const editedLedger = allLedgers.find((supplier) => supplier._id === id);
    setEditedRow({ ...editedLedger });
  };

  const handleRemoveLedger = async (id) => {
    try {
      const deleteResponse = await deleteLedger(id);
      if (deleteResponse.status === 200) {
        NotificationManager.success("Ledger deleted successfully", "Success");
        fetchAllLedger();
      } else {
        NotificationManager.error(
          "Error deleting ledger. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting ledger. Please try again later.",
        "Error"
      );
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
          Create Ledger:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="ledgerName" className="input-label">
                Ledger Name:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                margin="normal"
                name="ledgerName"
                value={ledgerName}
                onChange={(e) => setLedgerName(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="groupName" className="input-label">
                Under Group:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="groupName"
                margin="normal"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              {/* {["BANK 1", "BANK 2", "BANK 3", "BANK 4", "BANK 3"].map(
                  (item, id) => {
                    return (
                      <MenuItem key={id} value={item}>
                        {item}
                      </MenuItem>
                    );
                  }
                )}
              </TextField> */}
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="openingBal" className="input-label-3">
                Opening Balance:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="number"
                margin="normal"
                name="openingBal"
                value={openingBal}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value) && value >= 0) {
                    setOpeningBal(value);
                  }
                }}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="brandName" className="input-label-3">
                Closing Balance:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="number"
                margin="normal"
                name="closingBal"
                value={closingBal}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value) && value >= 0) {
                    setClosingBal(value);
                  }
                }}
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
            onClick={handleCreateLedger}
            sx={{
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
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: "11px",
            }}
          >
            Clear
          </Button>
        </Box>

        <Box sx={{ borderRadius: 1, marginTop: 2 }}>
          <TableContainer
            ref={tableRef}
            component={Paper}
            sx={{
              height: 400,
              width: "100%",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: 10,
                height: 10,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#fff",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#d5d8df",
                borderRadius: 2,
              },
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow className="table-head-2">
                  <TableCell align="center" sx={{ minWidth: "80px" }}>
                    S. No.
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "name"}
                      direction={sortOrder}
                      onClick={() => handleSort("name")}
                    >
                      Ledger Name
                    </TableSortLabel>
                  </TableCell>

                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "underGroup"}
                      direction={sortOrder}
                      onClick={() => handleSort("underGroup")}
                    >
                      Group
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "openingBlance"}
                      direction={sortOrder}
                      onClick={() => handleSort("openingBlance")}
                    >
                      Opening Balance
                    </TableSortLabel>
                  </TableCell>

                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "closingBlance"}
                      direction={sortOrder}
                      onClick={() => handleSort("closingBlance")}
                    >
                      Closing Balance
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
                        colSpan={6}
                        align="center"
                        sx={{
                          backgroundColor: "#fff !important",
                        }}
                      >
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : allLedgers ? (
                    sortedData()
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((brand, index) => (
                        <TableRow
                          key={brand._id}
                          sx={{
                            backgroundColor: "#fff",
                          }}
                        >
                          <TableCell align="center">
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow.name}
                                onChange={(e) =>
                                  setEditedRow({
                                    ...editedRow,
                                    name: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              brand.name
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow.underGroup}
                                onChange={(e) =>
                                  setEditedRow({
                                    ...editedRow,
                                    underGroup: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              brand?.underGroup
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow.openingBlance}
                                onChange={(e) =>
                                  setEditedRow({
                                    ...editedRow,
                                    openingBlance: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              brand.openingBlance
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow.closingBlance}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (!isNaN(value)) {
                                    setEditedRow({
                                      ...editedRow,
                                      closingBlance: value,
                                    });
                                  }
                                }}
                              />
                            ) : (
                              brand.closingBlance
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <SaveIcon
                                sx={{
                                  cursor: canUpdate || role === "admin" ? "pointer" : "not-allowed",
                                  color: canUpdate || role === "admin" ? "green" : "gray",
                                }}
                                onClick={
                                  canUpdate || role === "admin"
                                    ? () => handleSaveClick(brand._id)
                                    : null
                                }
                              />
                            ) : (
                              <EditIcon
                                sx={{
                                  cursor: canUpdate || role === "admin" ? "pointer" : "not-allowed",
                                  color: canUpdate || role === "admin" ? "blue" : "gray",
                                }}
                                onClick={() =>
                                  canUpdate || role === "admin"
                                    ? handleEditClick(index, brand._id)
                                    : null
                                }
                              />
                            )}
                            <CloseIcon
                              sx={{
                                cursor: canDelete || role === "admin" ? "pointer" : "not-allowed",
                                color: canDelete || role === "admin" ? "red" : "gray",
                              }}
                              onClick={
                                canDelete || role === "admin"
                                  ? () => handleRemoveLedger(brand._id)
                                  : null
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No Data
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      You do not have permission to view ledger data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {canRead || role === "admin" && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={allLedgers?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LedgerCreation;
