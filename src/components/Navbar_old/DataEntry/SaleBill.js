import React, { useState } from "react";
import {
  Box,
  Button,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const SaleBill = () => {
  const todaysDate = dayjs();

  const [filterData, setFilterData] = useState({
    customerName: "",
    balance: "",
    phoneNo: "",
    type: "",
    address: "",
    newcode: "",
    item: "",
    mrp: "",
    series: "",
    billno: "",
    date: todaysDate,
  });

  const [tableData, setTableData] = useState(
    Array.from({ length: 5 }, () => ({
      codeId: "",
      itemName: "",
      batch: "",
      packing: "",
      pcs: "",
      mrp: "",
      rate: "",
      dis: "",
      amt: "",
      split: "",
      brk: "",
    }))
  );

  // const handleInputChange = (event, index, key) => {
  //   const { value } = event.target;
  //   const dummyData = {
  //     codeId: "111",
  //     itemName: "Item 1",
  //     batch: "0",
  //     packing: "",
  //     pcs: "1",
  //     mrp: "650",
  //     rate: "650",
  //     dis: "10",
  //     amt: "585",
  //     split: "",
  //     brk: "2",
  //   };

  //   const newData = [...tableData];
  //   newData[index] = { ...newData[index], ...dummyData };

  //   if (index === newData.length - 1) {
  //     newData.push({
  //     codeId: "",
  //     itemName: "",
  //     batch: "",
  //     packing: "",
  //     pcs: "",
  //     mrp: "",
  //     rate: "",
  //     dis: "",
  //     amt: "",
  //     split: "",
  //     brk: "",
  //     });
  //   }
  //   setTableData(newData);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const handleBillDateChange = (selectedDate) => {
    setFilterData({ ...filterData, date: selectedDate });
    console.log("filterData: ", filterData);
  };

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Sales Entry
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Customer Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              name="customerName"
              label="Customer Name"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={filterData.customerName}
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="balance"
              label="Balance"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={filterData.balance}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="phoneNo"
              label="Phone Number"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={filterData.phoneNo}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="type"
              label="Type"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={filterData.type}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={filterData.address}
              onChange={() => {}}
            />
          </Grid>

          <Grid item sx={{ display: "flex", justifyContent: "center" }} xs={2}>
            <Button fullWidth variant="outlined" onClick={() => {}}>
              Add New Code
            </Button>
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="newcode"
              label="New Code"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={filterData.newcode}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="item"
              label="Item"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={filterData.item}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="mrp"
              label="MRP (₹)"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={filterData.mrp}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="series"
              label="Series"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={filterData.series}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="billno"
              label="Bill No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={filterData.billno}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={2}>
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DatePicker
                name="billdate"
                label="Bill Date"
                value={filterData.date}
                onChange={handleBillDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                )}
                fullWidth
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: "12px" }}>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>Vol (ml)</InputLabel>
            <TextField
              // label="MRP Value"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>Total Pcs.</InputLabel>
            <TextField
              // label="Special Discount"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>Gross Amt. (₹)</InputLabel>
            <TextField
              // label="Govt. Rate Off"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>Rec. Mode 1</InputLabel>
            <TextField
              // label="Special Purposes"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>Receipt 1</InputLabel>
            <TextField
              // label="Special Purposes"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>Spl Disc(%)</InputLabel>
            <TextField
              // label="Special Purposes"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>Disc Amt.</InputLabel>
            <TextField
              // label="Special Purposes"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>Tax Amt.</InputLabel>
            <TextField
              // label="Special Purposes"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>Receipt 2</InputLabel>
            <TextField
              // label="Special Purposes"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>S. Disc Amt.</InputLabel>
            <TextField
              // label="Special Purposes"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>Adjustment</InputLabel>
            <TextField
              // label="Special Purposes"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ marginBottom: "8px" }}>Net Amount</InputLabel>
            <TextField
              // label="Special Purposes"
              variant="outlined"
              type="text"
              size="small"
              fullWidth
              value={""}
              InputProps={{ readOnly: true }}
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
                <TableCell>Code Id</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>Packing</TableCell>
                <TableCell>Pcs</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Dis.</TableCell>
                <TableCell>Amt(₹)</TableCell>
                <TableCell>Split</TableCell>
                <TableCell>Brk</TableCell>
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
                      value={row.codeId}
                      onChange={(event) =>
                        handleInputChange(event, index, "codeId")
                      }
                      fullWidth
                      // InputProps={{ readOnly: row.itemDescription !== "" }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "10px" }}>
                    <TextField
                      select
                      size="small"
                      value={row.itemName}
                      onChange={(event) =>
                        handleInputChange(event, index, "itemName")
                      }
                      fullWidth
                    >
                      <MenuItem value="item1">Item 1</MenuItem>
                      <MenuItem value="item2">Item 2</MenuItem>
                      <MenuItem value="item3">Item 3</MenuItem>
                      <MenuItem value="item4">Item 4</MenuItem>
                      <MenuItem value="item5">Item 5</MenuItem>
                    </TextField>
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.batch || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "batch")
                      }
                      fullWidth
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.packing || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "packing")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.pcs || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "pcs")
                      }
                      fullWidth
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.mrp}
                      onChange={(event) =>
                        handleInputChange(event, index, "mrp")
                      }
                      fullWidth
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.rate || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "rate")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.dis || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "dis")
                      }
                      fullWidth
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.amount || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "amount")
                      }
                      fullWidth
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.split || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "split")
                      }
                      fullWidth
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.brk || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "brk")
                      }
                      fullWidth
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
            p: 2,
            "& button": { m: 1, marginRight: 4 },
          }}
        >
          <Button
            color="primary"
            size="large"
            variant="outlined"
            onClick={() => {}}
          >
            Save
          </Button>
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            onClick={() => {}}
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

export default SaleBill;
