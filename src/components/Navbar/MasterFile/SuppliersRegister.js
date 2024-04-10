import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../../services/supplierService";
import { NotificationManager } from "react-notifications";
import { useLoginContext } from "../../../utils/loginContext";

const SuppliersRegister = () => {
  const { loginResponse } = useLoginContext();

  const [formData, setFormData] = useState({
    supName: "",
    address: "",
    contactNo: "",
    gstinNo: "",
    panNo: "",
    cinNo: "",
    openingBlance: "",
  });

  const [newFormData, setNewFormData] = useState({
    supName: "",
    address: "",
    contactNo: "",
    gstinNo: "",
    panNo: "",
    cinNo: "",
    openingBlance: "",
  });

  const [allSuppliers, setAllSuppliers] = useState([]);
  const [existingSupplierUpdate, setExistingSupplierUpdate] = useState("");
  const [existingSupplierDelete, setExistingSupplierDelete] = useState("");

  console.log("newFormData: ", newFormData);
  
  useEffect(() => {
    fetchAllSuppliers();
  }, []);

  const clearForm = () => {
    setFormData({
      supName: "",
      address: "",
      contactNo: "",
      gstinNo: "",
      panNo: "",
      cinNo: "",
      openingBlance: "",
    });
  };

  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validatePanNo = (panNo) => {
    const panNoRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    return panNoRegex.test(panNo);
  };

  const validateGstinNo = (gstinNo) => {
    const gstinNoRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/;
    return gstinNoRegex.test(gstinNo);
  };

  const handleCreateSupplier = async () => {
    if (
      !formData.supName ||
      !formData.address ||
      !formData.contactNo ||
      !formData.gstinNo ||
      !formData.panNo ||
      !formData.cinNo ||
      !formData.openingBlance
    ) {
      NotificationManager.warning(
        "All fields are mandatory.",
        "Validation Error"
      );
      return;
    }

    if ((formData.contactNo).length < 10) {
      NotificationManager.warning("Invalid Mobile Number.", "Validation Error");
      return;
    }

    if (!validatePanNo(formData.panNo)) {
      NotificationManager.warning("Invalid PAN Number.", "Validation Error");
      return;
    }

    if (!validateGstinNo(formData.gstinNo)) {
      NotificationManager.warning("Invalid GSTIN Number.", "Validation Error");
      return;
    }

    const payload = {
      name: formData.supName,
      address: formData.address,
      contactNo: formData.contactNo,
      gstinNo: formData.gstinNo,
      panNo: formData.panNo,
      cinNo: formData.cinNo,
      openingBlance: formData.openingBlance,
    };

    try {
      const createSupplierResponse = await createSupplier(
        payload,
        loginResponse
      );
      if (createSupplierResponse.status === 200) {
        NotificationManager.success("Supplier created successfully", "Success");
        clearForm();
        fetchAllSuppliers();
      } else {
        NotificationManager.error(
          "Error creating Supplier. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error creating Supplier. Please try again later.",
        "Error"
      );
    }
  };

  const handleUpdateSupplier = async () => {
    if (!existingSupplierUpdate) {
      NotificationManager.warning(
        "Please select a supplier to update.",
        "Error"
      );
      return;
    }

    const payload = {
      name: newFormData.supName,
      address: newFormData.address,
      contactNo: newFormData.contactNo,
      gstinNo: newFormData.gstinNo,
      panNo: newFormData.panNo,
      cinNo: newFormData.cinNo,
      openingBlance: newFormData.openingBlance,
    };

    try {
      const updateItemResponse = await updateSupplier(
        payload,
        existingSupplierUpdate,
        loginResponse
      );
      if (updateItemResponse.status === 200) {
        NotificationManager.success("Supplier updated successfully", "Success");
        setExistingSupplierUpdate("");
        fetchAllSuppliers();
      } else {
        NotificationManager.error(
          "Error updating supplier. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error updating supplier. Please try again later.",
        "Error"
      );
    }
  };

  const handleDeleteSupplier = async () => {
    try {
      const deleteItemResponse = await deleteSupplier(
        existingSupplierDelete,
        loginResponse
      );
      if (deleteItemResponse.status === 200) {
        NotificationManager.success("Item deleted successfully", "Success");
        setExistingSupplierDelete("");
        fetchAllSuppliers();
      } else {
        NotificationManager.error(
          "Error deleting item. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting item. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllSuppliers = async () => {
    try {
      const allItemsResponse = await getAllSuppliers(loginResponse);
      console.log("allItemsResponse: ", allItemsResponse);
      setAllSuppliers(allItemsResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching suppliers. Please try again later.",
        "Error"
      );
    }
  };

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Suppliers Register
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Suppliers Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              name="supName"
              label="Name of Supplier/Company"
              variant="outlined"
              fullWidth
              className="form-field"
              value={formData.supName}
              onChange={handleSupplierChange}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              className="form-field"
              value={formData.address}
              onChange={handleSupplierChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              type="number"
              name="contactNo"
              label="Mobile Number"
              variant="outlined"
              fullWidth
              className="form-field"
              value={formData.contactNo}
              onChange={handleSupplierChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="gstinNo"
              label="GSTIN Number"
              variant="outlined"
              fullWidth
              className="form-field"
              value={formData.gstinNo}
              onChange={handleSupplierChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="panNo"
              label="PAN Number"
              variant="outlined"
              fullWidth
              className="form-field"
              value={formData.panNo}
              onChange={handleSupplierChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="cinNo"
              label="CIN Number"
              variant="outlined"
              fullWidth
              className="form-field"
              value={formData.cinNo}
              onChange={handleSupplierChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              type="number"
              name="openingBlance"
              label="Opening Balance"
              variant="outlined"
              fullWidth
              className="form-field"
              value={formData.openingBlance}
              onChange={handleSupplierChange}
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
              onClick={handleCreateSupplier}
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
          Update Supplier
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="existingSupplierUpdate"
              label="Existing Supplier"
              value={existingSupplierUpdate}
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
              onChange={(e) => {
                setExistingSupplierUpdate(e.target.value);
                const selectedSupplier = allSuppliers.find(
                  (supplier) => supplier._id === e.target.value
                );
                setNewFormData(selectedSupplier);
              }}
            >
              {allSuppliers?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {existingSupplierUpdate && (
            <>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="newSupplierName"
                  label="New Supplier Name"
                  value={newFormData.supName}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({ ...newFormData, supName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="address"
                  label="Address"
                  value={newFormData.address}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({ ...newFormData, address: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="number"
                  name="contactNo"
                  label="Mobile Number"
                  value={newFormData.contactNo}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({
                      ...newFormData,
                      contactNo: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="gstinNo"
                  label="GSTIN Number"
                  value={newFormData.gstinNo}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({ ...newFormData, gstinNo: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="panNo"
                  label="PAN Number"
                  value={newFormData.panNo}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({ ...newFormData, panNo: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="cinNo"
                  label="CIN Number"
                  value={newFormData.cinNo}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({ ...newFormData, cinNo: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="number"
                  name="openingBlance"
                  label="Opening Balance"
                  value={newFormData.openingBlance}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({
                      ...newFormData,
                      openingBlance: e.target.value,
                    })
                  }
                />
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
            size="large"
            variant="outlined"
            onClick={handleUpdateSupplier}
          >
            Change
          </Button>
          <Button
            color="warning"
            size="large"
            variant="outlined"
            onClick={() => {
              setExistingSupplierUpdate("");
            }}
          >
            Clear
          </Button>
        </Box>

        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
          Delete Supplier
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="existingSupplierDelete"
              label="Existing Supplier"
              value={existingSupplierDelete}
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
              onChange={(e) => setExistingSupplierDelete(e.target.value)}
            >
              {allSuppliers?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
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
              onClick={handleDeleteSupplier}
            >
              Delete
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => setExistingSupplierDelete("")}
            >
              Clear
            </Button>
          </Box>
        </Grid>
      </Box>
    </form>
  );
};

export default SuppliersRegister;
