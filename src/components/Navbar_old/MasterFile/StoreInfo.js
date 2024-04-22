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
  TableRow,
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
import { useLoginContext } from "../../../utils/loginContext";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const StoreInfo = () => {
  const { loginResponse } = useLoginContext();
  const [storeName, setStoreName] = useState("");
  const [type, setType] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [allStores, setAllStores] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  const tableRef = useRef(null);

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditableIndex(null);
      setEditedRow({});
    }
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

  const handleCreateStore = async () => {
    const payload = {
      name: storeName,
      type: type,
      indexNo: indexNo,
    };
    try {
      const createStoreResponse = await createStore(payload, loginResponse);
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
      const updateStoreResponse = await updateStore(
        payload,
        storeId,
        loginResponse
      );
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
      const deleteStoreResponse = await deleteStore(storeId, loginResponse);
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
      const allStoresResponse = await getAllStores(loginResponse);
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
      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
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

      <Box sx={{ boxShadow: 2, borderRadius: 1, marginTop: 4 }}>
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
              <TableRow>
                <TableCell align="center">S. No.</TableCell>
                <TableCell align="center">Store Name</TableCell>
                <TableCell align="center">Store Type</TableCell>
                <TableCell align="center">Index No.</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!allStores ? (
                <TableRow sx={{
                  backgroundColor: "#fff",
                }}>
                  <TableCell colSpan={5} align="center">
                    No Data
                  </TableCell>
                </TableRow>
              ) : (allStores?.map((store, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: "#fff",
                  }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.name}
                        onChange={(e) =>
                          setEditedRow({ ...editedRow, name: e.target.value })
                        }
                      />
                    ) : (
                      store.name
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.type}
                        onChange={(e) =>
                          setEditedRow({ ...editedRow, type: e.target.value })
                        }
                      />
                    ) : (
                      store.type
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.indexNo}
                        onChange={(e) =>
                          setEditedRow({
                            ...editedRow,
                            indexNo: e.target.value,
                          })
                        }
                      />
                    ) : (
                      store.indexNo
                    )}
                  </TableCell>
                  <TableCell align="center">
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
      </Box>
    </Box>
  );
};

export default StoreInfo;
