import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const LedgerCreation = () => {
  const [ledgerName, setLedgerName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [openingBal, setOpeningBal] = useState("");
  const [closingBal, setClosingBal] = useState("");

  const clearForm = () => {
    setLedgerName("");
    setGroupName("");
    setOpeningBal("");
    setClosingBal("");
  };

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Ledger Creation
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Ledger Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="text"
              margin="normal"
              name="ledgerName"
              label="Name of Ledger"
              value={ledgerName}
              variant="outlined"
              onChange={(e) => setLedgerName(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="groupName"
              margin="normal"
              label="Under Group"
              value={groupName}
              variant="outlined"
              onChange={(e) => setGroupName(e.target.value)}
            >
              {["BANK 1", "BANK 2", "BANK 3", "BANK 4", "BANK 3"].map(
                (item, id) => {
                  return (
                    <MenuItem key={id} value={item}>
                      {item}
                    </MenuItem>
                  );
                }
              )}
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              type="number"
              margin="normal"
              name="openingBal"
              label="Opening Balance (₹)"
              value={openingBal}
              variant="outlined"
              onChange={(e) => setOpeningBal(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              type="number"
              margin="normal"
              name="closingBal"
              label="Closing Balance (₹)"
              value={closingBal}
              variant="outlined"
              onChange={(e) => setClosingBal(e.target.value)}
            />
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
            onClick={clearForm}
            sx={{ marginTop: 3 }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default LedgerCreation;
