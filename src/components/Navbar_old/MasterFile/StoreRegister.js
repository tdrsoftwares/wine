import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
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
  Typography,
} from "@mui/material";
import { NotificationManager } from "react-notifications";
import {
  createStore,
  updateStore,
  getAllStores,
  deleteStore,
} from "../../../services/storeService";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const StoreRegister = () => {
  const [storeName, setStoreName] = useState("");
  const [type, setType] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [allStores, setAllStores] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const tableRef = useRef(null);

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
    setStoreName("");
    setType("");
    setIndexNo("");
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
    let sorted = [...allStores];
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

  const handleCreateStore = async () => {
    const payload = {
      name: storeName,
      type: type,
      indexNo: indexNo,
    };
    try {
      const createStoreResponse = await createStore(payload);
      NotificationManager.success("Store created successfully", "Success");
      console.log("Store created successfully:", createStoreResponse);
      clearForm();
      fetchAllStores();
    } catch (error) {
      NotificationManager.error(
        "Error creating store. Please try again later.",
        "Error"
      );
      console.error("Error creating store:", error);
    }
  };

  const handleUpdateStore = async (storeId) => {
    const payload = {
      name: editedRow.name,
      type: editedRow.type,
      indexNo: editedRow.indexNo,
    };
    try {
      const updateStoreResponse = await updateStore(payload, storeId);
      NotificationManager.success("Store updated successfully", "Success");
      console.log("Store updated successfully:", updateStoreResponse);
      setEditableIndex(null);
      setEditedRow({});
      fetchAllStores();
    } catch (error) {
      NotificationManager.error(
        "Error updating store. Please try again later.",
        "Error"
      );
      console.error("Error updating store:", error);
    }
  };

  const handleDeleteStore = async (storeId) => {
    try {
      const deleteStoreResponse = await deleteStore(storeId);
      NotificationManager.success("Store deleted successfully", "Success");
      console.log("Store deleted successfully:", deleteStoreResponse);
      fetchAllStores();
    } catch (error) {
      NotificationManager.error(
        "Error deleting store. Please try again later.",
        "Error"
      );
      console.error("Error deleting store:", error);
    }
  };

  const fetchAllStores = async () => {
    try {
      const allStoresResponse = await getAllStores();
      console.log("allStoresResponse ---> ", allStoresResponse);
      setAllStores(allStoresResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching stores. Please try again later.",
        "Error"
      );
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    fetchAllStores();
  }, []);

  const handleEditClick = (index, storeId) => {
    setEditableIndex(index);
    const selectedStore = allStores.find((store) => store._id === storeId);
    setEditedRow(selectedStore);
  };

  const handleSaveClick = (storeId) => {
    handleUpdateStore(storeId);
  };

  const handleRemoveStore = (storeId) => {
    handleDeleteStore(storeId);
  };

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
        Create Store:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="storeName" className="input-label">
              Name of Store :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="storeName"
              className="input-field"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="type" className="input-label">
              Type :
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="type"
              className="input-field"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Sale Counter">Sale Counter</MenuItem>
              <MenuItem value="Godown">Godown</MenuItem>
            </TextField>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="indexNo" className="input-label">
              Index Number :
            </InputLabel>
            <TextField
              fullWidth
              type="number"
              size="small"
              name="indexNo"
              className="input-field"
              value={indexNo}
              onChange={(e) => setIndexNo(e.target.value)}
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
          color="primary"
          size="medium"
          variant="contained"
          onClick={handleCreateStore}
          sx={{ borderRadius: 8 }}
        >
          Create
        </Button>
        <Button
          color="warning"
          size="medium"
          variant="outlined"
          onClick={clearForm}
          sx={{ borderRadius: 8 }}
        >
          Clear
        </Button>
      </Box>

      <Box sx={{ borderRadius: 1, marginTop: 4 }}>
        <TableContainer
          ref={tableRef}
          component={Paper}
          sx={{
            marginTop: 1,
            height: 300,
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
          <Table>
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
                    Store Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ minWidth: "180px" }}>
                  <TableSortLabel
                    active={sortBy === "type"}
                    direction={sortOrder}
                    onClick={() => handleSort("type")}
                  >
                    Store Type
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ minWidth: "180px" }}>
                  <TableSortLabel
                    active={sortBy === "indexNo"}
                    direction={sortOrder}
                    onClick={() => handleSort("indexNo")}
                  >
                    Index No.
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ minWidth: "180px" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!allStores ? (
                <TableRow
                  sx={{
                    backgroundColor: "#fff",
                  }}
                >
                  <TableCell colSpan={5} align="center">
                    No Data
                  </TableCell>
                </TableRow>
              ) : (
                sortedData()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((store, index) => (
                    <TableRow
                      key={index}
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
                          store.name
                        )}
                      </TableCell>
                      <TableCell>
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.type}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                type: e.target.value,
                              })
                            }
                          />
                        ) : (
                          store.type
                        )}
                      </TableCell>
                      <TableCell>
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.indexNo}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (!isNaN(value)) {
                                setEditedRow({
                                  ...editedRow,
                                  indexNo: value,
                                });
                              }
                            }}
                          />
                        ) : (
                          store.indexNo
                        )}
                      </TableCell>
                      <TableCell>
                        {editableIndex !== index ? (
                          <EditIcon
                            sx={{ cursor: "pointer", color: "blue" }}
                            onClick={() => handleEditClick(index, store._id)}
                          />
                        ) : (
                          <SaveIcon
                            sx={{ cursor: "pointer", color: "green" }}
                            onClick={() => handleSaveClick(store._id)}
                          />
                        )}
                        <CloseIcon
                          sx={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleRemoveStore(store._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allStores?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default StoreRegister;
