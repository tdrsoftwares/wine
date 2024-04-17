import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
  InputLabel,
} from "@mui/material";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    customerName: "",
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
      customerName: "",
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
  };

  const handleFormChange = (e) => {
    const {name, value} = e.target;
    console.log(":---> ", value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle1" gutterBottom>
          CUSTOMER REGISTER:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="customerName" className="input-label label-adjustment">
                Name of Customer :
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
              <InputLabel htmlFor="contactPersons" className="input-label label-adjustment">
                Contact Persons :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="contactPersons"
                variant="outlined"
                className="input-field field-adjustment"
                value={formData.contactPersons}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="address" className="input-label label-adjustment">
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
              <InputLabel htmlFor="phoneNo" className="input-label label-adjustment">
                Phone No. :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="phoneNo"
                variant="outlined"
                className="input-field field-adjustment"
                type="number"
                value={formData.phoneNo}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="mobileNo" className="input-label label-adjustment">
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
              <InputLabel htmlFor="openingBalance" className="input-label label-adjustment">
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
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="discount" className="input-label label-adjustment">
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
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="validUpto" className="input-label label-adjustment">
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
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="customerType" className="input-label label-adjustment">
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
              <InputLabel htmlFor="discountCategory" className="input-label label-adjustment">
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
              <InputLabel htmlFor="additionalCharges" className="input-label label-adjustment">
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
            gap: 2,
            marginTop: 2,
          }}
        >
          <Button
            color="success"
            size="medium"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            color="warning"
            size="medium"
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
