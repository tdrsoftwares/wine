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
  ThemeProvider,
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
import { customTheme } from "../../../utils/customTheme";
import { useLicenseContext } from "../../../utils/licenseContext";

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const tableRef = useRef(null);
  const { licenseDetails } = useLicenseContext();

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
    let sorted = allStores ? [...allStores] : [];
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
      // console.log("Store created successfully:", createStoreResponse);
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
      if (updateStoreResponse.status === 200) {
        NotificationManager.success("Store updated successfully", "Success");
        setEditableIndex(null);
        setEditedRow({});
        fetchAllStores();
      } else {
        NotificationManager.error(
          "Error updating store. Please try again later.",
          "Error"
        );
      }
      // console.log("Store updated successfully:", updateStoreResponse);
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
      if (deleteStoreResponse.status === 200) {
        NotificationManager.success("Store deleted successfully", "Success");
        fetchAllStores();
      } else {
        NotificationManager.error(
          "Error deleting store. Please try again later.",
          "Error"
        );
      }
      // console.log("Store deleted successfully:", deleteStoreResponse);
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
      // console.log("allStore response: ", allStoresResponse)
      
      if (allStoresResponse.status === 200) {
        setAllStores(allStoresResponse?.data?.data);
      } else {
        // NotificationManager.error("No stores found", "Error");
        setAllStores([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching stores. Please try again later.",
      //   "Error"
      // );
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

  useEffect(() => {
    setPage(0);
  }, [search]);

  const filteredData = sortedData().filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      searchLower === "" ||
      String(item.name).toLowerCase().includes(searchLower) ||
      String(item.type).toLowerCase().includes(searchLower) ||
      String(item.indexNo).toLowerCase().includes(searchLower)
    );
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
          Create Store:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="storeName" className="input-label" required>
                Name of Store :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="type" className="input-label" required>
                Type :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="SALE COUNTER">Sale Counter</MenuItem>
                <MenuItem value="GODOWN">Godown</MenuItem>
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="indexNo" className="input-label" required>
                Index Number :
              </InputLabel>
              <TextField
                fullWidth
                type="number"
                size="small"
                name="indexNo"
                value={indexNo}
                onChange={(e) => setIndexNo(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="warning"
                size="medium"
                variant="outlined"
                onClick={clearForm}
                sx={{
                  marginRight: 1,
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
              >
                Clear
              </Button>
              <Button
                color="primary"
                size="medium"
                variant="contained"
                onClick={handleCreateStore}
                sx={{
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
              >
                Create
              </Button>
            </Box>
          </Grid>

          {/* <Grid item xs={9}></Grid> */}

          <Grid item xs={3} sx={{ marginTop: 1 }}>
            <div className="input-wrapper">
              <InputLabel htmlFor="searchInput" className="input-label">
                Search Here :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="searchInput"
                placeholder="Enter your input..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>

        <Box sx={{ borderRadius: 1, marginTop: 1 }}>
          <TableContainer
            ref={tableRef}
            component={Paper}
            sx={{
              marginTop: 1,
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
                  <TableCell sx={{ minWidth: "220px" }}>
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
                  allStores && filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
            count={filteredData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default StoreRegister;
