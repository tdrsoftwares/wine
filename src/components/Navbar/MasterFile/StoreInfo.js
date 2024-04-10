import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
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

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Store Information
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Store Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="text"
              name="storeName"
              label="Name of Store"
              variant="outlined"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="type"
              label="Type"
              variant="outlined"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Seller">Seller</MenuItem>
              <MenuItem value="Buyer">Buyer</MenuItem>
              <MenuItem value="Distributor">Distributor</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              type="number"
              name="indexNo"
              label="Index Number"
              variant="outlined"
              value={indexNo}
              onChange={(e) => setIndexNo(e.target.value)}
            />
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
              size="large"
              variant="outlined"
              onClick={handleCreateStore}
            >
              Create
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={clearForm}
            >
              Clear
            </Button>
          </Box>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
          Update Store
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="existingStoreUpdate"
              label="Existing Store"
              value={existingStoreUpdate}
              variant="outlined"
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
              onChange={(e) => setExistingStoreUpdate(e.target.value)}
            >
              {allStores.map((store) => (
                <MenuItem key={store._id} value={store._id}>
                  {store.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              type="text"
              name="newStoreName"
              label="New Store Name"
              value={newStoreName}
              variant="outlined"
              onChange={(e) => setNewStoreName(e.target.value)}
            />
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
              size="large"
              variant="outlined"
              onClick={handleUpdateStore}
            >
              Change
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => {
                setExistingStoreUpdate("");
                setNewStoreName("");
              }}
            >
              Clear
            </Button>
          </Box>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
          Delete Store
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="existingStoreDelete"
              label="Existing Store"
              value={existingStoreDelete}
              variant="outlined"
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
              {allStores.map((store) => (
                <MenuItem key={store._id} value={store._id}>
                  {store.name}
                </MenuItem>
              ))}
            </TextField>
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
              size="large"
              variant="outlined"
              onClick={handleDeleteStore}
            >
              Delete
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => setExistingStoreDelete("")}
            >
              Clear
            </Button>
          </Box>
        </Grid>
      </Box>
    </form>
  );
};

export default StoreInfo;
