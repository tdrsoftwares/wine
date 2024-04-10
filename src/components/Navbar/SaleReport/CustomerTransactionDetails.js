import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  InputLabel,
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
import React, { useState } from "react";

const CustomerTransactionDetails = () => {
  const [customerName, setCustomerName] = useState("");
  const [dateFrom, setDateFrom] = useState("mm/dd/yyyy");
  const [dateTo, setDateTo] = useState("mm/dd/yyyy");
  const [openingBal, setOpeningBal] = useState("2");
  const [closingBal, setClosingBal] = useState("");
  const [currentBal, setCurrentBal] = useState("");

  const [tableData, setTableData] = useState([
    {
      trDate: "",
      vchBillNo: "",
      type: "",
      particular: "",
      qty: "",
      unit: "",
      debitAmt: "",
      creditAmt: "",
    },
  ]);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Transaction Details
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Customer Transaction Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              label="Select Customer"
              name="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            >
              {["Cash Bill", "Dealer", "Rohit Dhull"].map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
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

          <Grid item xs={1.5}></Grid>
        </Grid>

        <TableContainer
          component={Paper}
          sx={{ marginTop: 4, maxHeight: 300, overflowY: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Transaction Date</TableCell>
                <TableCell>Vch/Bill No</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Particular</TableCell>
                <TableCell>Qty.</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Debt. Amt.</TableCell>
                <TableCell>Cred. Amt.</TableCell>
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
                      value={row.trDate || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.vchBillNo || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.type || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.particular || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.qty || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.unit || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.debitAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.creditAmt || ""}
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
            marginTop: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField
                fullWidth
                variant="outlined"
                value={openingBal || ""}
                label="Opening Bal(₹)"
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                variant="outlined"
                value={closingBal}
                label="Closing Bal(₹)"
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                variant="outlined"
                value={currentBal}
                label="Current Bal(₹)"
                size="small"
                disabled
              />
            </Grid>
          </Grid>

          <Button
            color="primary"
            size="large"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginRight: 2 }}
          >
            Display
          </Button>
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginRight: 2 }}
          >
            Print
          </Button>
          <Button
            color="error"
            size="large"
            variant="outlined"
            onClick={() => {}}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CustomerTransactionDetails;