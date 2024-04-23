import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  InputLabel,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Input,
} from "@mui/material";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../../services/supplierService";
import { NotificationManager } from "react-notifications";
import { useLoginContext } from "../../../utils/loginContext";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const SuppliersRegister = () => {
  const { loginResponse } = useLoginContext();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNo: "",
    gstinNo: "",
    panNo: "",
    cinNo: "",
    openingBlance: "",
  });

  const [allSuppliers, setAllSuppliers] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    fetchAllSuppliers();
  }, []);

  const clearForm = () => {
    setFormData({
      name: "",
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
      !formData.name ||
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

    if (formData.contactNo.length < 10) {
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
      name: formData.name,
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

  const handleMobileChange = (event) => {
    const regex = /^[0-9]{0,10}$/;
    if (regex.test(event.target.value) || event.target.value === "") {
      setFormData((prevState) => ({
        ...prevState,
        contactNo: event.target.value,
      }));
    } else {
      NotificationManager.warning("Only 10 digits are allowed.", "", 500);
    }
  };

  const fetchAllSuppliers = async () => {
    try {
      const allItemsResponse = await getAllSuppliers(loginResponse);
      setAllSuppliers(allItemsResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching suppliers. Please try again later.",
        "Error"
      );
    }
  };

  const handleEditClick = (index, id) => {
    setEditableIndex(index);
    const editedSupplier = allSuppliers.find((supplier) => supplier._id === id);
    setEditedRow({ ...editedSupplier });
  };

  const handleSaveClick = async (id) => {

    try {
      const updateItemResponse = await updateSupplier(
        editedRow,
        id,
        loginResponse
      );
      if (updateItemResponse.status === 200) {
        NotificationManager.success("Supplier updated successfully", "Success");
        setEditableIndex(null);
        setEditedRow({});
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

  const handleRemoveSupplier = async (id) => {

    try {
      const deleteItemResponse = await deleteSupplier(id, loginResponse);
      if (deleteItemResponse.status === 200) {
        NotificationManager.success("Supplier deleted successfully", "Success");
        fetchAllSuppliers();
      } else {
        NotificationManager.error(
          "Error deleting supplier. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting supplier. Please try again later.",
        "Error"
      );
    }
  };

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
        Create Supplier:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="name" className="input-label">
              Supplier Name :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="name"
              className="input-field"
              value={formData.name}
              onChange={handleSupplierChange}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="address" className="input-label">
              Address :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="address"
              className="input-field"
              value={formData.address}
              onChange={handleSupplierChange}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="contactNo" className="input-label">
              Mobile Number :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="contactNo"
              className="input-field"
              value={formData.contactNo}
              onChange={handleMobileChange}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="gstinNo" className="input-label">
              GSTIN Number :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="gstinNo"
              className="input-field"
              value={formData.gstinNo}
              onChange={handleSupplierChange}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="panNo" className="input-label">
              PAN Number :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="panNo"
              className="input-field"
              value={formData.panNo}
              onChange={handleSupplierChange}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="cinNo" className="input-label">
              CIN Number :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="cinNo"
              className="input-field"
              value={formData.cinNo}
              onChange={handleSupplierChange}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="openingBlance" className="input-label">
              Opening Balance :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              type="number"
              name="openingBlance"
              className="input-field"
              value={formData.openingBlance}
              onChange={handleSupplierChange}
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
          onClick={handleCreateSupplier}
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

      <Box sx={{ boxShadow: 2, borderRadius: 1, marginTop: 2 }}>
        <TableContainer
          ref={tableRef}
          component={Paper}
          sx={{
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
                <TableCell align="center" style={{ minWidth: "80px" }}>
                  S. No.
                </TableCell>
                <TableCell align="center" style={{ minWidth: "200px" }}>
                  Supplier Name
                </TableCell>
                <TableCell align="center" style={{ minWidth: "200px" }}>
                  Address
                </TableCell>
                <TableCell align="center" style={{ minWidth: "150px" }}>
                  Mobile Number
                </TableCell>
                <TableCell align="center" style={{ minWidth: "150px" }}>
                  GSTIN Number
                </TableCell>
                <TableCell align="center" style={{ minWidth: "150px" }}>
                  PAN Number
                </TableCell>
                <TableCell align="center" style={{ minWidth: "150px" }}>
                  CIN Number
                </TableCell>
                <TableCell align="center" style={{ minWidth: "150px" }}>
                  Opening Balance
                </TableCell>
                <TableCell align="center" style={{ minWidth: "120px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSuppliers.map((supplier, index) => (
                <TableRow key={supplier._id} sx={{
                  backgroundColor: "#fff",
                }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.name || supplier.name}
                        onChange={(e) =>
                          setEditedRow({
                            ...editedRow,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      supplier.name
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.address || supplier.address}
                        onChange={(e) =>
                          setEditedRow({
                            ...editedRow,
                            address: e.target.value,
                          })
                        }
                      />
                    ) : (
                      supplier.address
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.contactNo || supplier.contactNo}
                        onChange={(e) =>
                          setEditedRow({
                            ...editedRow,
                            contactNo: e.target.value,
                          })
                        }
                      />
                    ) : (
                      supplier.contactNo
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.gstinNo || supplier.gstinNo}
                        onChange={(e) =>
                          setEditedRow({
                            ...editedRow,
                            gstinNo: e.target.value,
                          })
                        }
                      />
                    ) : (
                      supplier.gstinNo
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.panNo || supplier.panNo}
                        onChange={(e) =>
                          setEditedRow({ ...editedRow, panNo: e.target.value })
                        }
                      />
                    ) : (
                      supplier.panNo
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.cinNo || supplier.cinNo}
                        onChange={(e) =>
                          setEditedRow({ ...editedRow, cinNo: e.target.value })
                        }
                      />
                    ) : (
                      supplier.cinNo
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={
                          editedRow.openingBlance || supplier.openingBlance
                        }
                        onChange={(e) =>
                          setEditedRow({
                            ...editedRow,
                            openingBlance: e.target.value,
                          })
                        }
                      />
                    ) : (
                      supplier.openingBlance
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <SaveIcon
                        sx={{ cursor: "pointer", color: "green" }}
                        onClick={() => handleSaveClick(supplier._id)}
                      />
                    ) : (
                      <EditIcon
                        sx={{ cursor: "pointer", color: "blue" }}
                        onClick={() => handleEditClick(index, supplier._id)}
                      />
                    )}
                    <CloseIcon
                      sx={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleRemoveSupplier(supplier._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default SuppliersRegister;
