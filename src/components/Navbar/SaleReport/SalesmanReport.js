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

const SalesmanReport = () => {
  const [selectedItem, setselectedItem] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedSalesman, setSelectedSalesman] = useState("");
  const [dateFrom, setDateFrom] = useState("mm/dd/yyyy");
  const [dateTo, setDateTo] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState(null);
  console.log("filter1: ", filter1);
  const [currDuesChecked, setcurrDuesChecked] = useState(false);
  const [onDateDuesChecked, setonDateDuesChecked] = useState(false);
  const [onlyValueChecked, setOnlyValueChecked] = useState(false);

  const [tableData, setTableData] = useState([
    {
      billDate: "",
      custName: "",
      items: "",
      qty: "",
      fr: "",
      rate: "",
      mrp: "",
      dc: "",
      amt: "",
    },
  ]);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Salesman Report
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Salesman Sale Report
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RadioGroup
              row
              name="filter1"
              aria-label="filter1"
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <FormControlLabel
                value="date/item-wise"
                control={<Radio />}
                label="Date/Item Wise"
              />

              <FormControlLabel
                value="customer/date-wise"
                control={<Radio />}
                label="Customer/Date Wise"
              />
              <FormControlLabel
                value="customer/item-wise"
                control={<Radio />}
                label="Customer/Item Wise"
              />
              <FormControlLabel
                value="date/item/customer-wise"
                control={<Radio />}
                label="Date/Item/Customer Wise"
              />
              <FormControlLabel
                value="salesman/date-wise"
                control={<Radio />}
                label="Salesman/Date Wise"
              />
            </RadioGroup>
          </Grid>

          {filter1 === "date/item-wise" ||
          filter1 === "customer/date-wise" ||
          filter1 === "date/item/customer-wise" ||
          filter1 === "salesman/date-wise" ? (
            <>
              <Grid item xs={2.4}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date from"
                  name="dateFrom"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </Grid>
              <Grid item xs={2.4}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date to"
                  name="dateTo"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={4.8}></Grid>
          )}

          {filter1 === "customer/date-wise" ||
          filter1 === "date/item/customer-wise" ||
          filter1 === "customer/item-wise" ? (
            <Grid item xs={2.4}>
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
            <Grid item xs={2.4}></Grid>
          )}

          {filter1 === "date/item-wise" ||
          filter1 === "customer/item-wise" ||
          filter1 === "date/item/customer-wise" ? (
            <Grid item xs={2.4}>
              <TextField
                select
                fullWidth
                name="Item"
                label="Item"
                variant="outlined"
                className="input-field"
                value={selectedItem}
                onChange={(e) => setselectedItem(e.target.value)}
              >
                {[
                  "100 Pipers 375",
                  "100 Pipers 12Yr 750",
                  "100 Pipers W180",
                ].map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : (
            <Grid item xs={2.4}></Grid>
          )}

          <Grid item xs={2.4}>
            <TextField
              select
              fullWidth
              name="salesman"
              label="Salesman"
              variant="outlined"
              className="input-field"
              value={selectedSalesman}
              onChange={(e) => setSelectedSalesman(e.target.value)}
            >
              {["A", "B", "CA"].map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}></Grid>

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={onlyValueChecked}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => setOnlyValueChecked(e.target.checked)}
                />
              }
              label="Only Value"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currDuesChecked}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => setcurrDuesChecked(e.target.checked)}
                />
              }
              label="Current Dues"
            />
          </Grid>

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={onDateDuesChecked}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => setonDateDuesChecked(e.target.checked)}
                />
              }
              label="On Date Dues"
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
                <TableCell>Bill Date</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Qty.</TableCell>
                <TableCell>FR.</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>DC</TableCell>
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
                      value={row.billDate}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.custName}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.items}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.qty}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.fr || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.rate || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.mrp}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.dc || ""}
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

export default SalesmanReport;
