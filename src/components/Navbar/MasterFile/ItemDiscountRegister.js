import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const ItemDiscountRegister = () => {
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [size, setSize] = useState("");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [cashBillDiscount, setCashBillDiscount] = useState("");

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Discount Adjustment
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Item Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              type="text"
              name="itemName"
              label="Item Name"
              value={itemName}
              variant="outlined"
              onChange={(e) => setItemName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              name="brandName"
              label="Brand Name"
              value={brandName}
              variant="outlined"
              onChange={(e) => setBrandName(e.target.value)}
            >
              {[
                "Brand 1",
                "Brand 2",
                "Brand 3",
                "Brand 4",
                "Brand 5",
                "Brand 6",
              ].map((item, id) => {
                return (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              type="text"
              name="itemCategory"
              label="Item Category"
              value={category}
              variant="outlined"
              onChange={(e) => setCategory(e.target.value)}
            >
              {[
                "25 UP IML",
                "50 UP Country Sprit",
                "50 UP IML",
                "60 UP IML",
                "70 UP IML",
                "80 UP Country Sprit",
              ].map((item, id) => {
                return (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              name="size"
              label="Size"
              value={size}
              variant="outlined"
              onChange={(e) => setSize(e.target.value)}
            >
              {["Size 1", "Size 2", "Size 3"].map((item, id) => {
                return (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              type="number"
              name="dealerDiscount"
              label="Dealer Discount Amt/Pcs"
              value={dealerDiscount}
              variant="outlined"
              onChange={(e) => setDealerDiscount(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              type="number"
              name="cashBillDiscount"
              label="Cash Bill Discount Amt/Pcs"
              value={cashBillDiscount}
              variant="outlined"
              onChange={(e) => setCashBillDiscount(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Button
              color="primary"
              size="large"
              variant="outlined"
              onClick={() => {}}
              sx={{ marginTop: 3, marginRight: 2 }}
            >
              Save
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="outlined"
              onClick={() => {}}
              sx={{ marginTop: 3, marginRight: 2 }}
            >
              Print
            </Button>
            <Button
              color="error"
              size="large"
              variant="outlined"
              onClick={() => {}}
              sx={{ marginTop: 3 }}
            >
              Clear
            </Button>
          </Box>
      </Box>
    </form>
  );
};

export default ItemDiscountRegister;