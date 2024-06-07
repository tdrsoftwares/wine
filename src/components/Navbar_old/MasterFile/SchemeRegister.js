import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const SchemeRegister = () => {
  const today = dayjs();
  console.log("---- ", today);
  const [schemeNo, setSchemeNo] = useState("");
  const [category, setCategory] = useState("");
  const [brandHead, setBrandHead] = useState("");
  const [schemePeriodFrom, setSchemePeriodFrom] = useState(today);
  const [schemePeriodTo, setSchemePeriodTo] = useState("mm/dd/yyyy");
  const [brandName, setBrandName] = useState("");
  const [size, setSize] = useState("");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [cashBillDiscount, setCashBillDiscount] = useState("");

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Scheme Register
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Scheme Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="text"
              name="schemeNo"
              label="Scheme No."
              value={schemeNo}
              variant="outlined"
              onChange={(e) => setSchemeNo(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="brandHead"
              label="Brand Head"
              value={brandHead}
              variant="outlined"
              onChange={(e) => setBrandHead(e.target.value)}
            >
              {[
                "Brand Head 1",
                "Brand Head 2",
                "Brand Head 3",
                "Brand Head 4",
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
              fullWidth
              type="date"
              name="schemePeriodFrom"
              label="Scheme Period from"
              value={schemePeriodFrom}
              variant="outlined"
              onChange={(e) => setSchemePeriodFrom(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="date"
              name="schemePeriodTo"
              label="Scheme Period to"
              value={schemePeriodTo}
              variant="outlined"
              onChange={(e) => setSchemePeriodTo(e.target.value)}
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
        </Grid>
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

export default SchemeRegister;
