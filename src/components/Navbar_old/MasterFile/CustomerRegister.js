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
  TableSortLabel,
  TablePagination,
  ThemeProvider,
} from "@mui/material";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  updateCustomer,
} from "../../../services/customerService";
import { NotificationManager } from "react-notifications";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { customTheme } from "../../../utils/customTheme";

const CustomerRegister = () => {
  const tableRef = useRef(null);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [formData, setFormData] = useState({
    customerName: "",
    contactPerson: "",
    address: "",
    whatsAppNo: "",
    contactNo: "",
    // openingBalance: "",
    discount: "",
    // validUpto: "mm/dd/yyyy",
    customerType: "",
    discountCategory: "",
    additionalCharge: "",
  });
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  console.log("allCustomerData", allCustomerData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClear = () => {
    setFormData({
      customerName: "",
      contactPerson: "",
      address: "",
      whatsAppNo: "",
      contactNo: "",
      // openingBalance: "",
      discount: "",
      // validUpto: "mm/dd/yyyy",
      customerType: "",
      discountCategory: "",
      additionalCharge: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // console.log(":---> ", value);
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

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = () => {
    let sorted = allCustomerData ? [...allCustomerData] : [];
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

  const fetchAllCustomers = async () => {
    try {
      const allCustomerResponse = await getAllCustomer();
      // console.log("allCustomerResponse ---> ", allCustomerResponse);
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
    fetchAllCustomers();
  }, []);

  const handleCreateCustomer = async () => {
    const mandatoryFields = [
      formData.customerName,
      formData.contactPerson,
      formData.address,
      formData.contactNo,
      formData.customerType,
    ];
    if (mandatoryFields.some((field) => !field)) {
      NotificationManager.warning("Please fill all mandatory fields.", "Error");
      return;
    }

    if ((formData?.contactNo).length < 10) {
      NotificationManager.warning("Invalid Mobile Number.", "Validation Error");
      return;
    }

    const payload = {
      name: formData.customerName,
      whatsAppNo: formData.whatsAppNo || 0,
      contactNo: formData.contactNo,
      contactPerson: formData.contactPerson,
      address: formData.address,
      discount: formData.discount || 0,
      type: formData.customerType,
      additionalCharge: formData.additionalCharge || 0,
    };
    if(formData.discountCategory) {
      payload.discountCategory = formData.discountCategory
    }
    // console.log("payload: ", payload);

    try {
      const customerResponse = await createCustomer(payload);
      if (customerResponse.status === 200) {
        NotificationManager.success("Customer created successfully", "Success");
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
      const updateCustomerResponse = await updateCustomer(editedRow, itemId);
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

  const handleEditClick = (index, itemId) => {
    setEditableIndex(index);
    const selectedItem = allCustomerData.find((item) => item._id === itemId);
    setEditedRow(selectedItem);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const deleteItemResponse = await deleteCustomer(itemId);
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

  useEffect(() => {
    setPage(0);
  }, [search]);

  const filteredData = sortedData().filter((item) => {
    const searchLower = search.toLowerCase();

    return (
      searchLower === "" ||
      String(item.name).toLowerCase().includes(searchLower) ||
      String(item.type).toLowerCase().includes(searchLower) ||
      String(item.address).toLowerCase().includes(searchLower) ||
      String(item.contactNo).toLowerCase().includes(searchLower) ||
      String(item.whatsAppNo).toLowerCase().includes(searchLower) ||
      String(item.contactPerson).toLowerCase().includes(searchLower) ||
      String(item.discount).toLowerCase().includes(searchLower) ||
      String(item.discountCategory).toLowerCase().includes(searchLower) ||
      String(item.additionalCharge).toLowerCase().includes(searchLower)
    );
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Create Customer:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="customerName" className="input-label" required>
                Customer Name :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="customerName"
                value={formData.customerName}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="contactPerson" className="input-label" required>
                Contact Person :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="address" className="input-label" required>
                Address :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="address"
                value={formData.address}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="contactNo" className="input-label" required>
                Mobile No. :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="contactNo"
                type="number"
                value={formData.contactNo}
                onChange={handleMobileChange}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="whatsAppNo" className="input-label">
                Whats App No. :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="whatsAppNo"
                type="number"
                value={formData.whatsAppNo}
                onChange={(e) => handleFormChange(e)}
                InputProps={{
                  inputProps: { type: "number", inputMode: "numeric", min: 0 },
                }}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="discount" className="input-label">
                Discount (%) :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={(e) => handleFormChange(e)}
                InputProps={{
                  inputProps: { type: "number", inputMode: "numeric", min: 0 },
                }}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="customerType" className="input-label" required>
                Customer Type :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="customerType"
                value={formData.customerType}
                onChange={(e) => handleFormChange(e)}
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="dealer">Dealer</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="discountCategory" className="input-label">
                Discount Category :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="discountCategory"
                value={formData.discountCategory}
                onChange={(e) => handleFormChange(e)}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="additionalCharge" className="input-label">
                Additional Charges (%) :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="additionalCharge"
                type="number"
                value={formData.additionalCharge}
                onChange={(e) => handleFormChange(e)}
                InputProps={{
                  inputProps: { type: "number", inputMode: "numeric", min: 0 },
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
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
                onClick={handleCreateCustomer}
                sx={{
                  marginRight: 1,
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
              >
                Create
              </Button>
              <Button
                color="warning"
                size="medium"
                variant="outlined"
                onClick={handleClear}
                sx={{
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
              >
                Clear
              </Button>
            </Box>
          </Grid>

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
                  <TableCell align="center" style={{ minWidth: "80px" }}>
                    S. No.
                  </TableCell>
                  <TableCell style={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "name"}
                      direction={sortOrder}
                      onClick={() => handleSort("name")}
                    >
                      Customer Name
                    </TableSortLabel>
                  </TableCell>

                  <TableCell style={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "type"}
                      direction={sortOrder}
                      onClick={() => handleSort("type")}
                    >
                      Customer Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "150px" }}>
                    <TableSortLabel
                      active={sortBy === "address"}
                      direction={sortOrder}
                      onClick={() => handleSort("address")}
                    >
                      Address
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "contactNo"}
                      direction={sortOrder}
                      onClick={() => handleSort("contactNo")}
                    >
                      Mobile No.
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "whatsAppNo"}
                      direction={sortOrder}
                      onClick={() => handleSort("whatsAppNo")}
                    >
                      Whats App No.
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "contactPerson"}
                      direction={sortOrder}
                      onClick={() => handleSort("contactPerson")}
                    >
                      Contact Person
                    </TableSortLabel>
                  </TableCell>

                  {/* <TableCell style={{ minWidth: "150px" }}>
                    Opening Bal.
                  </TableCell> */}
                  <TableCell style={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "discount"}
                      direction={sortOrder}
                      onClick={() => handleSort("discount")}
                    >
                      Discount(%)
                    </TableSortLabel>
                  </TableCell>
                  {/* <TableCell style={{ minWidth: "180px" }}>
                    Valid Upto.
                  </TableCell> */}
                  <TableCell style={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "discountCategory"}
                      direction={sortOrder}
                      onClick={() => handleSort("discountCategory")}
                    >
                      Discount Category
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "150px" }}>
                    <TableSortLabel
                      active={sortBy === "additionalCharge"}
                      direction={sortOrder}
                      onClick={() => handleSort("additionalCharge")}
                    >
                      Add. Charges
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "100px" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {allCustomerData !== 0 ? (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
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
                            item.name
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
                            item.type
                          )}
                        </TableCell>

                        <TableCell>
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

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.contactNo}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (!isNaN(value)) {
                                  setEditedRow({
                                    ...editedRow,
                                    contactNo: value,
                                  });
                                }
                              }}
                            />
                          ) : (
                            item.contactNo
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.whatsAppNo}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (!isNaN(value)) {
                                  setEditedRow({
                                    ...editedRow,
                                    whatsAppNo: value,
                                  });
                                }
                              }}
                            />
                          ) : (
                            item.whatsAppNo || "No Data"
                          )}
                        </TableCell>

                        <TableCell>
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

                        {/* <TableCell>
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

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.discount}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (!isNaN(value)) {
                                  setEditedRow({
                                    ...editedRow,
                                    discount: value,
                                  });
                                }
                              }}
                            />
                          ) : (
                            item.discount || "No Data"
                          )}
                        </TableCell>

                        {/* <TableCell>
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

                        <TableCell>
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
                            item.discountCategory || "No Data"
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.additionalCharge}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (!isNaN(value)) {
                                  setEditedRow({
                                    ...editedRow,
                                    additionalCharge: value,
                                  });
                                }
                              }}
                            />
                          ) : (
                            item.additionalCharge || "No Data"
                          )}
                        </TableCell>

                        <TableCell>
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

export default CustomerRegister;
