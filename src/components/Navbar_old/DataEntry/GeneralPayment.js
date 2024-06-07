import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const GeneralPayment = () => {
  const todaysDate = dayjs();
  const [payeeName, setPayeeName] = useState("");
  const [accountType, setAccountType] = useState([
    "Saving",
    "Current",
    "RD",
    "DD",
  ]);
  const defaultAccountType = accountType[0];
  const [onAccount, setOnAccount] = useState("");
  const [currentBal, setCurrentBal] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [amtPaid, setAmtPaid] = useState("");
  const [amtPaidDate, setAmtPaidDate] = useState(todaysDate);
  const [mode, setMode] = useState([]);
  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState(todaysDate);
  const [bankAccnt, setBankAccnt] = useState("");
  const [remarks, setRemarks] = useState("");
  const [bankBal, setBankBal] = useState("");

  const [tableData, setTableData] = useState(
    Array.from({ length: 4 }, () => ({
      billNo: "",
      billDate: "",
      billAmt: "",
      balanceAmt: "",
    }))
  );

  const handlePayeeNameChange = (selectedItem) => {
    setPayeeName(selectedItem);
    console.log(selectedItem);
  };

  const handleItemCodeChange = () => {};

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          General Payment
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ marginBottom: "16px" }}
        >
          Party Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="payeeName"
              label="Payee Name"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={payeeName}
              select
              onChange={(e) => handlePayeeNameChange(e.target.value)}
            >
              <MenuItem value="sur">Surinder Singh</MenuItem>
              <MenuItem value="dip">Dipak Adhikari</MenuItem>
              <MenuItem value="ark">Arka Das</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              select
              name="accountType"
              label="Account Type"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              {["Saving", "Current", "RD", "DD"].map((item, id) => {
                return (
                  <MenuItem value={item} key={id}>
                    {item}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="onAccount"
              label="On Account"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={onAccount}
              onChange={(e) => setOnAccount(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="currentBal"
              label="Current Balance"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={currentBal}
              onChange={(e) => setCurrentBal(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="voucherNo"
              label="Voucher No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={voucherNo}
              onChange={(e) => setVoucherNo(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "22px" }}>
          <Typography variant="subtitle2" gutterBottom>
            Payment Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                name="amtPaidRs"
                label="Amt. Paid (₹)"
                variant="outlined"
                type="number"
                fullWidth
                className="input-field"
                value={amtPaid}
                onChange={(e) => setAmtPaid(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="amtPaidDate"
                label="Amt. Paid Date"
                variant="outlined"
                type="date"
                fullWidth
                className="input-field"
                value={dayjs(amtPaidDate).format("YYYY-MM-DD")}
                onChange={(e) => setAmtPaidDate(dayjs(e.target.value))}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="mode"
                label="Payment Mode"
                variant="outlined"
                fullWidth
                select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                {["CASH", "ONLINE"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="chequeNo"
                label="Cheque No."
                variant="outlined"
                type="text"
                fullWidth
                className="input-field"
                value={chequeNo}
                onChange={(e) => setChequeNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="chequeDate"
                label="Cheque Date"
                variant="outlined"
                type="date"
                fullWidth
                className="input-field"
                value={chequeDate}
                onChange={(e) => setChequeDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="bankAccnt"
                label="Bank Account"
                variant="outlined"
                type="text"
                fullWidth
                className="input-field"
                value={bankAccnt}
                onChange={(e) => setBankAccnt(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
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
            <Grid item xs={3}>
              <TextField
                name="bankBal"
                label="Balance"
                variant="outlined"
                type="text"
                fullWidth
                className="input-field"
                value={bankBal}
                onChange={(e) => setBankBal(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

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

export default GeneralPayment;
