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

const CashDeposit = () => {
  const todaysDate = dayjs();
  const [entryNo, setEntryNo] = useState("");
  const [entryDate, setEntryDate] = useState(todaysDate);
  const [depBankAc, setDepBankAc] = useState("");
  const [amtDeposit, setamtDeposit] = useState("");
  const [credit, setCredit] = useState("");
  const [remarks, setRemarks] = useState("");

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Cash Deposit
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ marginBottom: "16px" }}
        >
          Cash Transfer
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="entryNo"
              label="Entry No."
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={entryNo}
              onChange={(e) => setEntryNo(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="entryDate"
              label="Entry Date"
              variant="outlined"
              type="date"
              fullWidth
              className="input-field"
              value={dayjs(entryDate).format("YYYY-MM-DD")}
              onChange={(e) => setEntryDate(dayjs(e.target.value))}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="depBankAc"
              label="Deposit Bank Account"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={depBankAc}
              onChange={(e) => setDepBankAc(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="amtDeposit"
              label="Amount Deposit"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={amtDeposit}
              onChange={(e) => setamtDeposit(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="credit"
              label="Credit (₹)"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="remarks"
              label="Remarks"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
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

export default CashDeposit;
