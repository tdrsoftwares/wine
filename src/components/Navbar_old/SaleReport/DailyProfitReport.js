import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
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

const DailyProfitReport = () => {
  const [selectOptions, setselectOptions] = useState(null);

  const [filterData, setFilterData] = useState({
    dateFrom: "mm/dd/yyyy",
    dateTo: "mm/dd/yyyy",
    batchNo: "",
    brandName: "",
    group: "",
    customerName: "",
    userName: "",
    billNo: "",
    series: "",
    phone: "",
    isDsrByRateChecked: false,
    isDsrByMrpChecked: false,
  });

  const [tableData, setTableData] = useState([
    {
      sNo: "",
      items: "",
      batch: "",
      mrp: "",
      btl: "",
      saleAmt: "",
      profitAmt: "",
    },
  ]);

  const brandNameOptions = [
    "100 Pipers",
    "100 Pipers 12Yr",
    "8Pm Black",
    "Absolut",
    "Absolut Citron",
    "Absolut Raspberry",
    "Amrut",
    "Antiquity Blue",
    "B Pride",
  ];
  const categoryOptions = [
    "All",
    "Beer",
    "Country Sprit",
    "Foreign Liquor",
    "India Made Liquor",
  ];
  const billFromOptions = [
    "A0",
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
  ];
  const billToOptions = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"];
  const items = ["100 Pipers 375", "100 Pipers 12Yr 750", "100 Pipers W180"];
  const seriesOptions = ["A", "B", "C", "D", "E", "ALL"];
  const groupOptions = [
    "All",
    "Beer",
    "Country Sprit",
    "Foreign Liquor",
    "India Made Liquor",
  ];

  return (
    <form>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Daily Profit Report
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Daily Profit Report (Item Total)
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RadioGroup
              row
              name="selectOptions"
              aria-labelledby="selectOptions"
              value={selectOptions}
              onChange={(e) => setselectOptions(e.target.value)}
            >
              <FormControlLabel value="date" control={<Radio />} label="Date" />
              <FormControlLabel
                value="brand"
                control={<Radio />}
                label="Brand"
              />
              <FormControlLabel
                value="category"
                control={<Radio />}
                label="Category"
              />

              <FormControlLabel value="item" control={<Radio />} label="Item" />

              <FormControlLabel value="type" control={<Radio />} label="Type" />

              <FormControlLabel
                value="all-brand"
                control={<Radio />}
                label="All Brand"
              />

              <FormControlLabel
                value="all-category"
                control={<Radio />}
                label="All Category"
              />

              <FormControlLabel
                value="range"
                control={<Radio />}
                label="Range"
              />

              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="customer"
                control={<Radio />}
                label="Customer"
              />

              
            </RadioGroup>
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
              name="brandName"
              label="Brand"
              variant="outlined"
              value={filterData.brandName}
              onChange={(e) =>
                setFilterData({ ...filterData, brandName: e.target.value })
              }
            >
              {brandNameOptions.map((option, i) => (
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
              label="Name of Category"
              name="categoryName"
              value={filterData.categoryName}
              onChange={(e) =>
                setFilterData({ ...filterData, categoryName: e.target.value })
              }
            >
              {categoryOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              name="group"
              label="Select Group"
              variant="outlined"
              value={filterData.group}
              onChange={(e) =>
                setFilterData({ ...filterData, group: e.target.value })
              }
            >
              {groupOptions?.map((option, i) => (
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
              name="Item"
              label="Item"
              variant="outlined"
              className="input-field"
              value={filterData.item}
              onChange={(e) =>
                setFilterData({ ...filterData, item: e.target.value })
              }
            >
              {items.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              name="billFrom"
              label="Bill from"
              variant="outlined"
              className="input-field"
              value={filterData.billFrom}
              onChange={(e) =>
                setFilterData({ ...filterData, billFrom: e.target.value })
              }
            >
              {billFromOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              name="billTo"
              label="Bill to"
              variant="outlined"
              className="input-field"
              value={filterData.billTo}
              onChange={(e) =>
                setFilterData({ ...filterData, billTo: e.target.value })
              }
            >
              {billToOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
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
              name="billType"
              select
              label="Bill Type"
              variant="outlined"
              fullWidth
              className="input-field"
              value={filterData.billType}
              onChange={(e) =>
                setFilterData({ ...filterData, billType: e.target.value })
              }
            >
              {["Cash", "Dealer"].map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
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

        </Grid>

        <TableContainer
          component={Paper}
          sx={{ marginTop: 4, maxHeight: 300, overflowY: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Btl.</TableCell>
                <TableCell>Sale Amt.</TableCell>
                <TableCell>Profit Amt.</TableCell>
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
                      value={row.items}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.batch}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.mrp || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.btl || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.saleAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.profitAmt || ""}
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
      {/* <Box sx={{ p: 2, marginTop: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Bill No. Details
        </Typography>
      </Box> */}
    </form>
  );
};

export default DailyProfitReport;