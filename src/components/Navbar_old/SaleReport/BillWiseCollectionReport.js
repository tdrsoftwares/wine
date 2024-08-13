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

const BillWiseCollectionReport = () => {
  const [mode, setmode] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [bill, setBill] = useState("");
  const [dateFrom, setDateFrom] = useState("mm/dd/yyyy");
  const [dateTo, setDateTo] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState(null);
  console.log("filter1: ", filter1);
  const [salesman, setSalesman] = useState("");
  const [onlyDues, setOnlyDues] = useState(false);
  const [details, setDetails] = useState(false);
  const [summary, setSummary] = useState(false);

  const [tableData, setTableData] = useState([
    {
      billNo: "",
      date: "",
      customerName: "",
      billAmt: "",
      collectionAmt: "",
      adjustAmt: "",
      dueAmt: "",
      reportMode: "",
      amt: "",
      reportMode2: "",
      amt2: "",
    },
  ]);

  return (
    <form>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Cash Collection Report
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Collection Report
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
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
                value="salesman/date-wise"
                control={<Radio />}
                label="Salesman/Date Wise"
              />

              <FormControlLabel
                value="cheque/date-wise"
                control={<Radio />}
                label="cheque/Date Wise"
              />

              <FormControlLabel
                value="mode-wise"
                control={<Radio />}
                label="Mode Wise"
              />
            </RadioGroup>
          </Grid>

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
              className="input-field"
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
              className="input-field"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
            select
              fullWidth
              name="mode"
              label="Mode"
              variant="outlined"
              className="input-field"
              value={mode}
              onChange={(e) => setmode(e.target.value)}
            >{["cash", "online"].map((user, id) => (
              <MenuItem key={id} value={user}>
                {user}
              </MenuItem>
            ))}
          </TextField>
          </Grid>

          <Grid item xs={2}>
          <TextField
              select
              fullWidth
              name="salesman"
              label="Salesman"
              variant="outlined"
              className="input-field"
              value={salesman}
              onChange={(e) => setSalesman(e.target.value)}
            >
              {["A", "B", "CA"].map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {filter1 !== "date-wise" ? (
            <Grid item xs={2}>
              <TextField
                select
                fullWidth
                name="Customer"
                label="Customer"
                variant="outlined"
                className="input-field"
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

          <Grid item xs={4}></Grid>

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={onlyDues}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => setOnlyDues(e.target.checked)}
                />
              }
              label="Dues Only"
            />
          </Grid>

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={details}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => setDetails(e.target.checked)}
                />
              }
              label="Details"
            />
          </Grid>

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={summary}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => setSummary(e.target.checked)}
                />
              }
              label="Summary"
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
                <TableCell>Customer Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Bill Amt.</TableCell>
                <TableCell>Coll. Amt.</TableCell>
                <TableCell>Adjs. Amt.</TableCell>
                <TableCell>Due Amt.</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Amt.</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Amt.</TableCell>
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
                      value={row.billNo || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.date || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.customerName || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.billAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.collectionAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.adjustAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.dueAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.reportMode || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.amt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.reportMode2 || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.amt2 || ""}
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

export default BillWiseCollectionReport;