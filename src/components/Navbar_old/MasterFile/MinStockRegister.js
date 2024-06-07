import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const MinStockRegister = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [brandName, setBrandName] = useState("");
  const [packing, setPacking] = useState("");
  const [minStock, setMinStock] = useState("");

  const clearForm = () => {
    setItemName("");
    setCategory("");
    setPacking("");
    setBrandName("");
    setMinStock("");
  }

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Minimum Stock Register
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Item Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
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

          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              type="text"
              name="packing"
              label="Packing (Volume)"
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
              name="minStock"
              label="Minimum Stock (Pcs)"
              value={minStock}
              variant="outlined"
              onChange={(e) => setMinStock(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}></Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                // marginTop: "10px",
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
                onClick={clearForm}
                sx={{ marginTop: 3 }}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default MinStockRegister;
