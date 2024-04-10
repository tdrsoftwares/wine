import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const DealerCatDiscRegister = () => {
  const [custCategory, setcustCategory] = useState("");
  const [brandName, setBrandName] = useState("");
  const [packing, setPacking] = useState("");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [cashBillDiscount, setCashBillDiscount] = useState("");

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Dealer Discount Register
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Item Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
            select
              fullWidth
              type="text"
              name="custCategory"
              label="Customer Category"
              value={custCategory}
              variant="outlined"
              onChange={(e) => setcustCategory(e.target.value)}
            >
              {[
                "category 1",
                "category 2",
                "category 3",
                "category 4",
                "category 5",
              ].map((item, id) => {
                return (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
          <Grid item xs={3}>
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

          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              type="text"
              name="packing"
              label="Packing (ML)"
              value={packing}
              variant="outlined"
              onChange={(e) => setPacking(e.target.value)}
            >
              {["180 ML", "350 ML", "750 ML", "1200 ML"].map((item, id) => {
                return (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              type="number"
              name="discount"
              label="Dealer Amt/Pcs"
              value={dealerDiscount}
              variant="outlined"
              onChange={(e) => setDealerDiscount(e.target.value)}
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

export default DealerCatDiscRegister;
