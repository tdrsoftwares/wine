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

const JournalEntry = () => {
  const todaysDate = dayjs();
  const [voucherNo, setVoucherNo] = useState("");
  const [entryDate, setEntryDate] = useState(todaysDate);
  const [debitAc, setDebitAc] = useState("");
  const [debtAmt, setDebitAmt] = useState("");
  const [creditAmt, setCreditAmt] = useState("");
  const [creditAc, setCreditAc] = useState("");
  const [narration, setNarration] = useState("");

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Journal Entry
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ marginBottom: "16px" }}
        >
          Account Transfer
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="voucherNo"
              label="Voucher No."
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={voucherNo}
              onChange={(e) => setVoucherNo(e.target.value)}
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
              name="narration"
              label="Narration"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              select
              name="debitAc"
              label="Select Debit Account"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={debitAc}
              onChange={(e) => setDebitAc(e.target.value)}
            >
              {[
                "BEVCO F.L",
                "CAR A/C",
                "COMMISSION A/C",
                "CREDIT NOTE",
                "KALYANI BEER HUB",
                "Opening Stock",
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="debtAmt"
              label="Debit Amount (₹)"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={debtAmt}
              inputProps={{ "aria-readonly": true }}
              onChange={(e) => setDebitAmt(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="creditAmt"
              label="Credit Amount (₹)"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={creditAmt}
              onChange={(e) => setCreditAmt(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              select
              name="creditAc"
              label="Select Credit Account"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={creditAc}
              onChange={(e) => setCreditAc(e.target.value)}
            >
              {[
                "BEVCO F.L",
                "CAR A/C",
                "COMMISSION A/C",
                "CREDIT NOTE",
                "KALYANI BEER HUB",
                "Opening Stock",
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="debtAmt"
              label="Debit Amount (₹)"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={debtAmt}
              onChange={(e) => setDebitAmt(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="creditAmt"
              label="Credit Amount (₹)"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={creditAmt}
              onChange={(e) => setCreditAmt(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end"
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
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default JournalEntry;
