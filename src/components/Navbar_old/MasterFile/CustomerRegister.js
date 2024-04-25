import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
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
} from "@mui/material";
import { useLoginContext } from "../../../utils/loginContext";
import { createCustomer, deleteCustomer, getAllCustomer, updateCustomer } from "../../../services/customerService";
import { NotificationManager } from "react-notifications";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const CustomerRegister = () => {
  const { loginResponse } = useLoginContext();
  const tableRef = useRef(null)
  const [allCustomerData, setAllCustomerData] = useState(null);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [formData, setFormData] = useState({
    customerName: "",
    contactPerson: "",
    address: "",
    whatsAppNo: "",
    mobileNo: "",
    // openingBalance: "",
    discount: "",
    // validUpto: "mm/dd/yyyy",
    customerType: "",
    discountCategory: "",
    additionalCharges: "",
  });

  console.log("formData", formData);

  const handleClear = () => {
    setFormData({
      customerName: "",
      contactPerson: "",
      address: "",
      whatsAppNo: "",
      mobileNo: "",
      // openingBalance: "",
      discount: "",
      // validUpto: "mm/dd/yyyy",
      customerType: "",
      discountCategory: "",
      additionalCharges: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log(":---> ", value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditableIndex(null);
      setEditedRow({});
    }
  };

  const fetchAllCustomers = async () => {
    try {
      const allCustomerResponse = await getAllCustomer(loginResponse);
      console.log("allCustomerResponse ---> ", allCustomerResponse);
      setAllCustomerData(allCustomerResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchAllCustomers()
  }, [loginResponse]);

  const handleCreateCustomer = async () => {
    const mandatoryFields = [
      formData.customerName,
      formData.whatsAppNo,
      formData.mobileNo,
      formData.contactPerson,
      formData.address,
      formData.discount,
      formData.customerType,
      formData.discountCategory,
      formData.additionalCharges,
    ];
    if (mandatoryFields.some((field) => !field)) {
      NotificationManager.warning("Please fill in all fields.", "Error");
      return;
    }

    const payload = {
      name: formData.customerName,
      whatsAppNo: formData.whatsAppNo,
      contactNo: formData.mobileNo,
      contactPerson: formData.contactPerson,
      address: formData.address,
      discount: formData.discount,
      type: formData.customerType,
      discountCategory: formData.discountCategory,
      additionalCharge: formData.additionalCharges,
    };
    console.log("payload: ", payload);

    try {
      const customerResponse = await createCustomer(payload, loginResponse);
      if (customerResponse.status === 200) {
        NotificationManager.success("Item created successfully", "Success");
        handleClear();
        fetchAllCustomers();
      } else {
        NotificationManager.error(
          "Error creating item. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error creating item. Please try again later.",
        "Error"
      );
    }
  };

  const handleSaveClick = async (itemId) => {
    try {
      const updateCustomerResponse = await updateCustomer(
        editedRow,
        itemId,
        loginResponse
      );
      if (updateCustomerResponse.status === 200) {
        NotificationManager.success("Item updated successfully", "Success");
        setEditableIndex(null);
        setEditedRow({});
        fetchAllCustomers();
      } else {
        NotificationManager.error(
          "Error updating item. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error updating item. Please try again later.",
        "Error"
      );
    }
  };

  const handleEditClick = (index, itemId) => {
    setEditableIndex(index);
    const selectedItem = allCustomerData.find((item) => item._id === itemId);
    setEditedRow(selectedItem);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const deleteItemResponse = await deleteCustomer(itemId, loginResponse);
      if (deleteItemResponse.status === 200) {
        NotificationManager.success("Item deleted successfully", "Success");
        fetchAllCustomers();
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

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle1" gutterBottom>
          Create Customer:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="customerName"
                className="input-label label-adjustment"
              >
                Customer Name :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="customerName"
                variant="outlined"
                className="input-field field-adjustment"
                value={formData.customerName}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="contactPerson"
                className="input-label label-adjustment"
              >
                Contact Person :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="contactPerson"
                variant="outlined"
                className="input-field field-adjustment"
                value={formData.contactPerson}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="address"
                className="input-label label-adjustment"
              >
                Address :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="address"
                variant="outlined"
                className="input-field field-adjustment"
                value={formData.address}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="mobileNo"
                className="input-label label-adjustment"
              >
                Mobile No. :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="mobileNo"
                variant="outlined"
                className="input-field field-adjustment"
                type="number"
                value={formData.mobileNo}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="whatsAppNo"
                className="input-label label-adjustment"
              >
                Whats App No. :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="whatsAppNo"
                variant="outlined"
                className="input-field field-adjustment"
                type="number"
                value={formData.whatsAppNo}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid>
          {/* <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="openingBalance"
                className="input-label label-adjustment"
              >
                Opening Balance (Rs.) :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="openingBalance"
                variant="outlined"
                className="input-field field-adjustment"
                type="number"
                inputProps={{ min: 0 }}
                value={formData.openingBalance}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid> */}
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="discount"
                className="input-label label-adjustment"
              >
                Discount (%) :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="discount"
                variant="outlined"
                className="input-field field-adjustment"
                type="number"
                value={formData.discount}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid>
          {/* <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="validUpto"
                className="input-label label-adjustment"
              >
                Valid Upto :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="validUpto"
                variant="outlined"
                className="input-field field-adjustment"
                type="date"
                value={formData.validUpto}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid> */}
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="customerType"
                className="input-label label-adjustment"
              >
                Customer Type :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="customerType"
                variant="outlined"
                className="input-field field-adjustment"
                value={formData.customerType}
                onChange={(e) => handleFormChange(e)}
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="online">Online</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="discountCategory"
                className="input-label label-adjustment"
              >
                Discount Category :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="discountCategory"
                variant="outlined"
                className="input-field field-adjustment"
                value={formData.discountCategory}
                onChange={(e) => handleFormChange(e)}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="additionalCharges"
                className="input-label label-adjustment"
              >
                Additional Charges (%) :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="additionalCharges"
                variant="outlined"
                className="input-field field-adjustment"
                type="number"
                value={formData.additionalCharges}
                onChange={(e) => handleFormChange(e)}
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
            onClick={handleCreateCustomer}
            sx={{ borderRadius: 8 }}
          >
            Create
          </Button>
          <Button
            color="warning"
            size="medium"
            variant="outlined"
            onClick={handleClear}
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
                <TableRow className="table-head-2">
                  <TableCell align="center" style={{ minWidth: "80px" }}>
                    S. No.
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "180px" }}>
                    Customer Name
                  </TableCell>
                  
                  <TableCell align="center" style={{ minWidth: "180px" }}>
                    Customer Type
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "150px" }}>
                    Address
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "180px" }}>
                    Mobile No.
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "180px" }}>
                    Whats App No.
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "180px" }}>
                    Contact Person
                  </TableCell>
                  
                  {/* <TableCell align="center" style={{ minWidth: "150px" }}>
                    Opening Bal.
                  </TableCell> */}
                  <TableCell align="center" style={{ minWidth: "180px" }}>
                    Discount(%)
                  </TableCell>
                  {/* <TableCell align="center" style={{ minWidth: "180px" }}>
                    Valid Upto.
                  </TableCell> */}
                  <TableCell align="center" style={{ minWidth: "180px" }}>
                    Discount Category
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "150px" }}>
                    Add. Charges
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {allCustomerData ? (
                  allCustomerData.map((item, index) => (
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
                              setEditedRow({
                                ...editedRow,
                                name: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.name
                        )}
                      </TableCell>

                      <TableCell align="center">
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
                          item.type
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.address}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                address: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.address
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.contactNo}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                contactNo: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.contactNo
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.whatsAppNo}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                whatsAppNo: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.whatsAppNo
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.contactPerson}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                contactPerson: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.contactPerson
                        )}
                      </TableCell>

                      {/* <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.openingBalance}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                openingBalance: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.openingBalance
                        )}
                      </TableCell> */}

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.discount}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                discount: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.discount
                        )}
                      </TableCell>

                      {/* <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.validUpto}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                validUpto: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.validUpto
                        )}
                      </TableCell> */}

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.discountCategory}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                discountCategory: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.discountCategory
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.additionalCharge}
                            onChange={(e) =>
                              setEditedRow({
                                ...editedRow,
                                additionalCharge: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.additionalCharge
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {editableIndex !== index ? (
                          <EditIcon
                            sx={{ cursor: "pointer", color: "blue" }}
                            onClick={() => handleEditClick(index, item._id)}
                          />
                        ) : (
                          <SaveIcon
                            sx={{ cursor: "pointer", color: "green" }}
                            onClick={() => handleSaveClick(item._id)}
                          />
                        )}
                        <CloseIcon
                          sx={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleDeleteItem(item._id)}
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
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </form>
  );
};

export default CustomerRegister;
