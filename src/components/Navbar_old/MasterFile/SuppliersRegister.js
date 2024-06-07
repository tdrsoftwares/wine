import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  InputLabel,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Input,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../../services/supplierService";
import { NotificationManager } from "react-notifications";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const SuppliersRegister = () => {
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
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    if (!formData.name) {
      NotificationManager.warning(
        `Supplier Name is mandatory.`,
        "Validation Error"
      );
      return;
    }

    if (!formData.address) {
      NotificationManager.warning(`Address is mandatory.`, "Validation Error");
      return;
    }

    if (formData.contactNo && formData.contactNo.length < 10) {
      NotificationManager.warning("Invalid Mobile Number.", "Validation Error");
      return;
    }

    if (formData.panNo && !validatePanNo(formData.panNo)) {
      NotificationManager.warning("Invalid PAN Number.", "Validation Error");
      return;
    }

    if (formData.gstinNo && !validateGstinNo(formData.gstinNo)) {
      NotificationManager.warning("Invalid GSTIN Number.", "Validation Error");
      return;
    }

    const payload = {};
    if (formData.name) payload.name = formData.name;
    if (formData.address) payload.address = formData.address;
    if (formData.contactNo) payload.contactNo = formData.contactNo;
    if (formData.gstinNo) payload.gstinNo = formData.gstinNo;
    if (formData.panNo) payload.panNo = formData.panNo;
    if (formData.cinNo) payload.cinNo = formData.cinNo;
    if (formData.openingBlance) payload.openingBlance = formData.openingBlance;

    try {
      const createSupplierResponse = await createSupplier(payload);
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

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = () => {
    let sorted = [...allSuppliers];
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

  const fetchAllSuppliers = async () => {
    try {
      const allItemsResponse = await getAllSuppliers();
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
      const updateItemResponse = await updateSupplier(editedRow, id);
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
      const deleteItemResponse = await deleteSupplier(id);
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
      <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
        Create Supplier:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="name" className="input-label" required>
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
            <InputLabel htmlFor="address" className="input-label" required>
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

      <Box sx={{ borderRadius: 1, marginTop: 2 }}>
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
              <TableRow className="table-head-2">
                <TableCell align="center" sx={{ minWidth: "80px" }}>
                  S. No.
                </TableCell>
                <TableCell sx={{ minWidth: "200px" }}>
                  <TableSortLabel
                    active={sortBy === "name"}
                    direction={sortOrder}
                    onClick={() => handleSort("name")}
                  >
                    Supplier Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ minWidth: "200px" }}>
                  <TableSortLabel
                    active={sortBy === "address"}
                    direction={sortOrder}
                    onClick={() => handleSort("address")}
                  >
                    Address
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ minWidth: "200px" }}>
                  <TableSortLabel
                    active={sortBy === "contactNo"}
                    direction={sortOrder}
                    onClick={() => handleSort("contactNo")}
                  >
                    Mobile Number
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ minWidth: "200px" }}>
                  <TableSortLabel
                    active={sortBy === "gstinNo"}
                    direction={sortOrder}
                    onClick={() => handleSort("gstinNo")}
                  >
                    GSTIN Number
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ minWidth: "180px" }}>
                  <TableSortLabel
                    active={sortBy === "panNo"}
                    direction={sortOrder}
                    onClick={() => handleSort("panNo")}
                  >
                    PAN Number
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ minWidth: "180px" }}>
                  <TableSortLabel
                    active={sortBy === "cinNo"}
                    direction={sortOrder}
                    onClick={() => handleSort("cinNo")}
                  >
                    CIN Number
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
                <TableCell sx={{ minWidth: "120px" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((supplier, index) => (
                  <TableRow
                    key={supplier._id}
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  >
                    <TableCell align="center" sx={{ minWidth: "80px" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>
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
                    <TableCell>
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
                    <TableCell>
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
                    <TableCell>
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
                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.panNo || supplier.panNo}
                          onChange={(e) =>
                            setEditedRow({
                              ...editedRow,
                              panNo: e.target.value,
                            })
                          }
                        />
                      ) : (
                        supplier.panNo
                      )}
                    </TableCell>
                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.cinNo || supplier.cinNo}
                          onChange={(e) =>
                            setEditedRow({
                              ...editedRow,
                              cinNo: e.target.value,
                            })
                          }
                        />
                      ) : (
                        supplier.cinNo
                      )}
                    </TableCell>
                    <TableCell>
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
                    <TableCell>
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

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allSuppliers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default SuppliersRegister;
