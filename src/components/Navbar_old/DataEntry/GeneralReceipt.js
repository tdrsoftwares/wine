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

const GeneralReceipt = () => {
  const todaysDate = dayjs();
  const [receivedFrom, setReceivedFrom] = useState([]);
  const [receiptType, setReceiptType] = useState("");
  const [onAccount, setOnAccount] = useState("");
  const [currentBal, setCurrentBal] = useState("");
  const [docNo, setDocNo] = useState("");
  const [amtReceipt, setAmtReceipt] = useState("");
  const [amtReceiptDate, setAmtReceiptDate] = useState(todaysDate);
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

  const handleItemCodeChange = () => {};

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Other Receipt
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ marginBottom: "16px" }}
        >
          Receiver Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="receivedFrom"
              label="Received From"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={receivedFrom}
              select
              onChange={(e) => setReceivedFrom(e.target.value)}
            >
              {["BEVCO F.L", "CAR A/C", "COMMISSION A/C", "CREDIT NOTE", "KALYANI BEER HUB", "Opening Stock"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="receiptType"
              label="Receipt Type"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={receiptType}
              onChange={(e) => setReceiptType(e.target.value)}
            />
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
              name="docNo"
              label="Document No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={docNo}
              onChange={(e) => setDocNo(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "22px" }}>
          <Typography variant="subtitle2" gutterBottom>
            Cash Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                name="amtReceipt"
                label="Amt. Receipt (₹)"
                variant="outlined"
                type="number"
                fullWidth
                className="input-field"
                value={amtReceipt}
                onChange={(e) => setAmtReceipt(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="amtReceiptDate"
                label="Amt. Receipt Date"
                variant="outlined"
                type="date"
                fullWidth
                className="input-field"
                value={dayjs(amtReceiptDate).format("YYYY-MM-DD")}
                onChange={(e) => setAmtReceiptDate(dayjs(e.target.value))}
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

export default GeneralReceipt;
