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

const SaleReportSummary = () => {
  const [selectOptions, setselectOptions] = useState(null);


  const [filterData, setFilterData] = useState({
    dateFrom: "mm/dd/yyyy",
    dateTo: "mm/dd/yyyy",
    customerName: "",
    userName: "",
    series: "",
    customerType: "",
    phone: "",
    isChecked: false,
  });

  const [tableData, setTableData] = useState([
    {
      billNo: "",
      billDate: "",
      customerName: "",
      spDiscPercent: "",
      spDiscAmt: "",
      otherCharges: "",
      billAmt: "",
      saleDis: "",
    },
  ]);

  const seriesOptions = ["A", "B", "C", "D", "E", "ALL"];

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Sale Report Summary
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Report Summary
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={9}>
            <RadioGroup
              row
              name="selectOptions"
              aria-labelledby="selectOptions"
              value={selectOptions}
              onChange={(e) => setselectOptions(e.target.value)}
            >
              <FormControlLabel
                value="date-wise-sale"
                control={<Radio />}
                label="Date Wise Sale"
              />
              <FormControlLabel
                value="customer"
                control={<Radio />}
                label="Customer"
              />
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="customer-type"
                control={<Radio />}
                label="Customer Type"
              />
              <FormControlLabel
                value="receipt-mode"
                control={<Radio />}
                label="Receipt Mode"
              />
              <FormControlLabel
                value="customer-phone"
                control={<Radio />}
                label="Customer/Phone"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterData.isChecked}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      isChecked: e.target.checked,
                    })
                  }
                />
              }
              label="Only Disc. Bills"
              
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              label="Date from"
              name="dateFrom"
              value={filterData.dateFrom}
              onChange={(e) =>
                setFilterData({ ...filterData, dateFrom: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              label="Date to"
              name="dateTo"
              value={filterData.dateTo}
              onChange={(e) =>
                setFilterData({ ...filterData, dateTo: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              name="customerName"
              label="Customer Name"
              variant="outlined"
              value={filterData.customerName}
              onChange={(e) =>
                setFilterData({ ...filterData, customerName: e.target.value })
              }
            >
              {["CASH BILL", "DEALER"].map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              name="userName"
              label="User Name"
              variant="outlined"
              className="input-field"
              value={filterData.userName}
              onChange={(e) =>
                setFilterData({ ...filterData, userName: e.target.value })
              }
            >
              {["admin"].map((pack, id) => (
                <MenuItem key={id} value={pack}>
                  {pack}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              name="series"
              label="Series"
              variant="outlined"
              className="input-field"
              value={filterData.series}
              onChange={(e) =>
                setFilterData({ ...filterData, series: e.target.value })
              }
            >
              {seriesOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="customerType"
              select
              label="Customer Type"
              variant="outlined"
              fullWidth
              className="input-field"
              value={filterData.customerType}
              onChange={(e) =>
                setFilterData({ ...filterData, customerType: e.target.value })
              }
            >
              {["Cash", "Online"].map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="phone"
              select
              label="Phone"
              variant="outlined"
              fullWidth
              className="input-field"
              value={filterData.phone}
              onChange={(e) =>
                setFilterData({ ...filterData, phone: e.target.value })
              }
            >
              {["0", "Cash", "Online"].map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* <Grid item xs={3}></Grid> */}

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
                <TableCell>Customer Name</TableCell>
                <TableCell>Special Discount(%)</TableCell>
                <TableCell>Special Discount Amt.</TableCell>
                <TableCell>Other Charges</TableCell>
                <TableCell>Bill Amt.(Rs)</TableCell>
                <TableCell>Sale-0 / Dis-0</TableCell>
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
                      value={row.billNo}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.billDate}
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
                      value={row.spDiscPercent || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.spDiscAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.otherCharges || ""}
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
                      value={row.saleDis || ""}
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

export default SaleReportSummary;
