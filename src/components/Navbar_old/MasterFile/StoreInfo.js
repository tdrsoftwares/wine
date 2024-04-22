import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
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

const StoreInfo = () => {
  const { loginResponse } = useLoginContext();
  const [storeName, setStoreName] = useState("");
  const [type, setType] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [allStores, setAllStores] = useState([]);
  const [existingStoreUpdate, setExistingStoreUpdate] = useState("");
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreType, setNewStoreType] = useState("");
  const [newIndexNo, setNewIndexNo] = useState("");
  const [existingStoreDelete, setExistingStoreDelete] = useState("");

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

  const handleUpdateStore = async () => {
    const payload = {
      name: newStoreName,
    };
    try {
      const updateStoreResponse = await updateStore(
        payload,
        existingStoreUpdate,
        loginResponse
      );
      NotificationManager.success("Store updated successfully", "Success");
      console.log("Store updated successfully:", updateStoreResponse);
      setExistingStoreUpdate("");
      setNewStoreName("");
      fetchAllStores();
    } catch (error) {
      NotificationManager.error(
        "Error updating store. Please try again later.",
        "Error"
      );
      console.error("Error updating store:", error);
    }
  };

  const handleDeleteStore = async () => {
    try {
      const deleteStoreResponse = await deleteStore(
        existingStoreDelete,
        loginResponse
      );
      NotificationManager.success("Store deleted successfully", "Success");
      console.log("Store deleted successfully:", deleteStoreResponse);
      setExistingStoreDelete("");
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

  const handleUpdateChange = (e) => {
    setExistingStoreUpdate(e.target.value);
    const selectedItem = allStores.find((item) => item._id === e.target.value);
    console.log("selectedItem: ", selectedItem);
    setNewStoreName(selectedItem?.name);
    setNewStoreType(selectedItem?.type);
    setNewIndexNo(selectedItem?.indexNo);
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
              <MenuItem value="sale-counter">Sale Counter</MenuItem>
              <MenuItem value="godown">Godown</MenuItem>
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

      <Typography variant="subtitle1" sx={{ marginBottom: 2, marginTop: 2 }}>
        Update Store:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="existingStoreUpdate" className="input-label">
              Existing Store :
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="existingStoreUpdate"
              className="input-field"
              value={existingStoreUpdate}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
              onChange={(e) => handleUpdateChange(e)}
            >
              {allStores?.map((store) => (
                <MenuItem key={store._id} value={store._id}>
                  {store.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        {existingStoreUpdate && (
          <>
            <Grid item xs={4}>
              <div className="input-wrapper">
                <InputLabel htmlFor="storeName" className="input-label">
                  Store Name :
                </InputLabel>
                <TextField
                  fullWidth
                  type="text"
                  size="small"
                  name="storeName"
                  className="input-field"
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                />
              </div>
            </Grid>

            <Grid item xs={4}>
              <div className="input-wrapper">
                <InputLabel htmlFor="newStoreType" className="input-label">
                  Type :
                </InputLabel>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="newStoreType"
                  className="input-field"
                  value={newStoreType}
                  onChange={(e) => setNewStoreType(e.target.value)}
                >
                  <MenuItem value="sale-counter">Sale Counter</MenuItem>
                  <MenuItem value="godown">Godown</MenuItem>
                </TextField>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div className="input-wrapper">
                <InputLabel htmlFor="newIndexNo" className="input-label">
                  Index No. :
                </InputLabel>
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  name="newIndexNo"
                  className="input-field"
                  value={newIndexNo}
                  onChange={(e) => setNewIndexNo(e.target.value)}
                />
              </div>
            </Grid>
          </>
        )}
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
          onClick={handleUpdateStore}
          sx={{ borderRadius: 8 }}
        >
          Change
        </Button>
        <Button
          color="warning"
          size="medium"
          variant="outlined"
          sx={{ borderRadius: 8 }}
          onClick={() => {
            setExistingStoreUpdate("");
            setNewStoreName("");
          }}
        >
          Clear
        </Button>
      </Box>

      <Typography variant="subtitle1" sx={{ marginBottom: 2, marginTop: 2 }}>
        Delete Store:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="existingStoreDelete" className="input-label">
              Existing Store :
            </InputLabel>
            <TextField
              select
              fullWidth
              name="existingStoreDelete"
              size="small"
              className="input-field"
              value={existingStoreDelete}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
              onChange={(e) => setExistingStoreDelete(e.target.value)}
            >
              {allStores?.map((store) => (
                <MenuItem key={store._id} value={store._id}>
                  {store.name}
                </MenuItem>
              ))}
            </TextField>
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
          sx={{ borderRadius: 8 }}
          onClick={handleDeleteStore}
        >
          Delete
        </Button>
        <Button
          color="warning"
          size="medium"
          variant="outlined"
          sx={{ borderRadius: 8 }}
          onClick={() => setExistingStoreDelete("")}
        >
          Clear
        </Button>
      </Box>

      <Box sx={{ boxShadow: 2, borderRadius: 1, marginTop: 4 }}>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: 1,
            // height: 300,
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
            <TableHead className="table-head">
              <TableRow>
                <TableCell align="center">S. No.</TableCell>
                <TableCell align="center">Store Name</TableCell>
                <TableCell align="center">Store Type</TableCell>
                <TableCell align="center">Index No.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allStores.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.indexNo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default StoreInfo;
