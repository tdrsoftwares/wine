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

const CashWithdrawn = () => {
  const todaysDate = dayjs();
  const [entryNo, setEntryNo] = useState("");
  const [entryDate, setEntryDate] = useState(todaysDate);
  const [withdrwBankAc, setWithdrwBankAc] = useState("");
  const [amtWithdraw, setamtWithdraw] = useState("");
  const [debit, setDebit] = useState("");
  const [remarks, setRemarks] = useState("");

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Cash Withdrawn
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
              name="withdrwBankAc"
              label="Withdrawn Bank Account"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={withdrwBankAc}
              onChange={(e) => setWithdrwBankAc(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="amtWithdraw"
              label="Amount Withdraw"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={amtWithdraw}
              onChange={(e) => setamtWithdraw(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="debit"
              label="Debit (₹)"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={debit}
              onChange={(e) => setDebit(e.target.value)}
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

export default CashWithdrawn;