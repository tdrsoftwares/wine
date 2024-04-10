import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const ReceiptReport = () => {
  const [accountType, setAccountType] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [bill, setBill] = useState("");
  const [dateFrom, setDateFrom] = useState("mm/dd/yyyy");
  const [dateTo, setDateTo] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState(null);
  console.log("filter1: ", filter1);
  const [onAccount, setOnAccount] = useState("");


  const [tableData, setTableData] = useState([
    {
      recNo: "",
      billNo: "",
      recDate: "",
      partyName: "",
      modeOfPayment: "",
      paidAmt: "",
      totalAmt: "",
      adjustAmt: "",
    },
  ]);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Receipt Report
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Receipt Report
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={10}>
            <RadioGroup
              row
              name="filter1"
              aria-label="filter1"
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <FormControlLabel
                value="date-wise"
                control={<Radio />}
                label="Date Wise"
              />

              <FormControlLabel
                value="customer/date-wise"
                control={<Radio />}
                label="Customer/Date Wise"
              />
              <FormControlLabel
                value="user/date-wise"
                control={<Radio />}
                label="User/Date Wise"
              />

              <FormControlLabel
                value="bill-wise"
                control={<Radio />}
                label="Bill Wise"
              />

              <FormControlLabel
                value="cheque/date-wise"
                control={<Radio />}
                label="cheque/Date Wise"
              />

              <FormControlLabel
                value="ac-type-wise"
                control={<Radio />}
                label="A/c Type Wise"
              />
              <FormControlLabel
                value="on-a/c-wise"
                control={<Radio />}
                label="On A/c Wise"
              />
            </RadioGroup>
          </Grid>

          {filter1 !== "date-wise" ? (
            <Grid item xs={2}>
              <TextField
                select
                fullWidth
                name="Customer"
                label="Customer"
                variant="outlined"
                className="form-field"
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                {["cash", "dealer", "rohit dhull"].map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : (
            <Grid item xs={2}></Grid>
          )}

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              label="Date from"
              name="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              label="Date to"
              name="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              name="userName"
              label="User Name"
              variant="outlined"
              className="form-field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            >
              {["admin"].map((user, id) => (
                <MenuItem key={id} value={user}>
                  {user}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="bill"
              label="Bill"
              variant="outlined"
              className="form-field"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="accountType"
              label="Account Type"
              variant="outlined"
              className="form-field"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="onAccount"
              label="On Account"
              variant="outlined"
              className="form-field"
              value={onAccount}
              onChange={(e) => setOnAccount(e.target.value)}
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
                <TableCell>Rec. No.</TableCell>
                <TableCell>Bill No.</TableCell>
                <TableCell>Rec. Date</TableCell>
                <TableCell>Party Name</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Paid (₹)</TableCell>
                <TableCell>Total (₹)</TableCell>
                <TableCell>Adjs. (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={index + 1}
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.recNo || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.billNo || "5"}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.recDate || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.partyName || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.modeOfPayment || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.paidAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.totalAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.adjustAmt || "8.00"}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 2,
          }}
        >
          <Button
            color="primary"
            size="large"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginTop: 2, marginRight: 2 }}
          >
            Display
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
      </Box>
    </form>
  );
};

export default ReceiptReport;
