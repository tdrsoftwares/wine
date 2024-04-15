import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
} from "@mui/material";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactPersons: "",
    address: "",
    phoneNo: "",
    mobileNo: "",
    openingBalance: "",
    discount: "",
    validUpto: "mm/dd/yyyy",
    customerType: "",
    discountCategory: "",
    additionalCharges: "",
  });

  console.log("formData", formData);

  const handleSave = () => {
    // Api to send data sendDataToApi(formData)
  };

  const handleClear = () => {
    setFormData({
      name: "",
      contactPersons: "",
      address: "",
      phoneNo: "",
      mobileNo: "",
      openingBalance: "",
      discount: "",
      validUpto: null,
      customerType: "",
      discountCategory: "",
      additionalCharges: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Customer Information
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Customer Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              name="name"
              label="Name of Customer/Company"
              variant="outlined"
              fullWidth
              className="input-field"
              value={formData.name}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="contactPersons"
              label="Contact Persons"
              variant="outlined"
              fullWidth
              className="input-field"
              value={formData.contactPersons}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              className="input-field"
              value={formData.address}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="phoneNo"
              label="Phone No."
              variant="outlined"
              fullWidth
              className="input-field"
              type="number"
              value={formData.phoneNo}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="mobileNo"
              label="Mobile No."
              variant="outlined"
              fullWidth
              className="input-field"
              type="number"
              value={formData.mobileNo}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="openingBalance"
              label="Opening Balance (Rs.)"
              variant="outlined"
              fullWidth
              className="input-field"
              type="number"
              inputProps={{ min: 0 }}
              value={formData.openingBalance}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="discount"
              label="Discount (%)"
              variant="outlined"
              fullWidth
              className="input-field"
              type="number"
              value={formData.discount}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              label="Valid Upto"
              name="validUpto"
              className="input-field"
              variant="outlined"
              value={formData.validUpto}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="customerType"
              select
              label="Customer Type"
              variant="outlined"
              fullWidth
              className="input-field"
              value={formData.customerType}
              onChange={handleFormChange}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="online">Online</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="discountCategory"
              select
              label="Discount Category"
              variant="outlined"
              fullWidth
              className="input-field"
              value={formData.discountCategory}
              onChange={handleFormChange}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="additionalCharges"
              label="Additional Charges (%)"
              variant="outlined"
              fullWidth
              className="input-field"
              type="number"
              value={formData.additionalCharges}
              onChange={handleFormChange}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            marginTop: 2
          }}
        >
          <Button
            color="primary"
            size="large"
            variant="outlined"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            color="error"
            size="large"
            variant="outlined"
            onClick={handleClear}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CustomerRegister;
