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
import React, { useState } from "react";

const CustomerReceipt = () => {
  const todaysDate = dayjs();
  const [custName, setcustName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [currentBal, setCurrentBal] = useState("");
  const [receiptNo, setreceipttNo] = useState("");
  
  const [amtPaidRs, setAmtPaidRs] = useState("");
  const [amtPaidDate, setAmtPaidDate] = useState(todaysDate);
  const [mode, setMode] = useState([]);
  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState(todaysDate);
  const [bankAccnt, setBankAccnt] = useState("");
  const [remarks, setRemarks] = useState("");
  const [bankBal, setBankBal] = useState("");
  const [adjustAmt, setAdjustAmt] = useState("");

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
          Customer Receipt
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Customer Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="custName"
              label="Customer Name"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={custName}
              select
              onChange={(e) => setcustName(e.target.value)}
            >
              <MenuItem value="sur">Surinder Singh</MenuItem>
              <MenuItem value="dip">Dipak Adhikari</MenuItem>
              <MenuItem value="ark">Arka Das</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="contactNo"
              label="Contact No."
              variant="outlined"
              type="tel"
              fullWidth
              className="input-field"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
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
              name="receiptNo"
              label="Receipt No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={receiptNo}
              onChange={(e) => setreceipttNo(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="billNo"
              label="Bill No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={receiptNo}
              onChange={(e) => setreceipttNo(e.target.value)}
            />
          </Grid>
        </Grid>

        <TableContainer
          component={Paper}
          sx={{ marginTop: 4, maxHeight: 300, overflowY: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Bill No.</TableCell>
                <TableCell>Bill Date</TableCell>
                <TableCell>Bill Amt.</TableCell>
                <TableCell>Balance Amt.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={index + 1}
                      // fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.billNo}
                      onChange={(event) =>
                        handleItemCodeChange(event, index, "billNo")
                      }
                      fullWidth
                      // InputProps={{ readOnly: row.itemDescription !== "" }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "10px" }}>
                    <TextField
                      size="small"
                      value={row.billDate}
                      onChange={(event) =>
                        handleItemCodeChange(event, index, "billDate")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.billAmt}
                      onChange={(event) =>
                        handleItemCodeChange(event, index, "billAmt")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.balanceAmt || ""}
                      onChange={(event) =>
                        handleItemCodeChange(event, index, "balanceAmt")
                      }
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ marginTop: "12px" }}>
          <Typography variant="subtitle1" gutterBottom>
            Payment Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                name="amtPaidRs"
                label="Amt. Paid (₹)"
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                className="input-field"
                value={amtPaidRs}
                onChange={(e) => setAmtPaidRs(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="amtPaidDate"
                label="Amt. Paid Date"
                variant="outlined"
                size="small"
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
                size="small"
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
                name="bankAccnt"
                label="Bank Account"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                className="input-field"
                value={bankAccnt}
                onChange={(e) => setBankAccnt(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="chequeNo"
                label="Cheque No."
                variant="outlined"
                size="small"
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
                size="small"
                type="date"
                fullWidth
                className="input-field"
                value={chequeDate}
                onChange={(e) => setChequeDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="bankBal"
                label="Balance"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                className="input-field"
                value={bankBal}
                onChange={(e) => setBankBal(e.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="adjustAmt"
                label="Adjust Amt.(₹)"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                className="input-field"
                value={adjustAmt}
                onChange={(e) => setAdjustAmt(e.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="remarks"
                label="Remarks"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                className="input-field"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Grid>
            <Grid item xs={9}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  color="primary"
                  size="large"
                  variant="outlined"
                  onClick={() => {}}
                  sx={{ marginTop: 2, marginRight: 2 }}
                >
                  Save
                </Button>
                <Button
                  color="secondary"
                  size="large"
                  variant="outlined"
                  onClick={() => {}}
                  sx={{ marginTop: 2, marginRight: 2 }}
                >
                  Print
                </Button>
                <Button
                  color="error"
                  size="large"
                  variant="outlined"
                  onClick={() => {}}
                  sx={{ marginTop: 2 }}
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </form>
  );
};

export default CustomerReceipt;