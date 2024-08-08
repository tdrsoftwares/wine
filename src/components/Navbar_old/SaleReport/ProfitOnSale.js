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

const ProfitOnSale = () => {
  const [packing, setPacking] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [dateFrom, setDateFrom] = useState("mm/dd/yyyy");
  const [dateTo, setDateTo] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState(null);

  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [itemName, setItemName] = useState("");

  const [tableData, setTableData] = useState([
    {
      billNo: "",
      billDate: "",
      customer: "",
      itemCode: "",
      type: "",
      packing: "",
      cate: "",
      brand: "",
      qty: "",
      fr: "",
      rate: "",
      disc: "",
      saleAmt: "",
      purAmt: "",
      marAmt: ""
    },
  ]);

  const categoryOptions = [
    "All",
    "50 UP IML",
    "60 UP IML",
    "70 UP IML",
    "Beer (India)",
    "Brandy (IMFL)",
    "Rum (IMFL)",
    "Vodka (IMFL)",
    "Vodka (OS)",
    "Whisky (IMFL)",
    "Whisky (OS)",
    "Wine (IMFL)",
    "Wine (OS)",
  ];

  const brandOptions = [
    "All",
    "Beer",
    "Country Sprit",
    "Foreign Liquor",
    "India Made Liquor",
  ];

  const items = ["100 Pipers 375", "100 Pipers 12Yr 750", "100 Pipers W180"];

  const packingOptions = [750, 700, 650, 550, 450, 350, 250, 180];

  return (
    <form>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Sale Report
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Profit Report On Sale
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
              <FormControlLabel value="date" control={<Radio />} label="Date" />

              <FormControlLabel
                value="customer/date"
                control={<Radio />}
                label="Customer/Date"
              />
              <FormControlLabel
                value="date/item-code"
                control={<Radio />}
                label="Date/Item Code"
              />

              <FormControlLabel
                value="date/category"
                control={<Radio />}
                label="Date/Category"
              />

              <FormControlLabel
                value="date/brand"
                control={<Radio />}
                label="Date/Brand"
              />

              <FormControlLabel
                value="date/item"
                control={<Radio />}
                label="Date/Item"
              />

              <FormControlLabel
                value="date/category/packing"
                control={<Radio />}
                label="Date/Category/Packing"
              />
              <FormControlLabel
                value="date/category/brand"
                control={<Radio />}
                label="Date/Category/Brand"
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

          {/*  || filter1 === "customer/date"  || filter1 === "date/item-code" || filter1 === "customer/date"? */}
          {filter1 === "customer/date" ? (
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

          {filter1 === "date/item-code" ? (
            <Grid item xs={2}>
              <TextField
                select
                fullWidth
                name="itemCode"
                label="Item Code"
                variant="outlined"
                className="input-field"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
              >
                {["123456", "655645", "77978798"].map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : (
            <Grid item xs={2}></Grid>
          )}

          {filter1 === "date/category" ||
          filter1 === "date/category/brand" ||
          filter1 === "date/category/packing" ? (
            <Grid item xs={2}>
              <TextField
                select
                fullWidth
                label="Select Category"
                name="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              >
                {categoryOptions.map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : (
            <Grid item xs={2}></Grid>
          )}

          {filter1 === "date/brand" || filter1 === "date/category/brand" ? (
            <Grid item xs={2}>
              <TextField
                select
                fullWidth
                label="Brand Name"
                name="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              >
                {brandOptions.map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : (
            <Grid item xs={2}></Grid>
          )}

          {filter1 === "date/item" ? (
            <Grid item xs={2}>
              <TextField
                select
                fullWidth
                label="Item Name"
                name="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              >
                {items.map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : (
            <Grid item xs={2}></Grid>
          )}

          {filter1 === "date/category/packing" ? (
            <Grid item xs={2}>
              <TextField
                select
                fullWidth
                name="packing"
                label="Packing"
                variant="outlined"
                className="input-field"
                value={packing}
                onChange={(e) => setPacking(e.target.value)}
              >
                {packingOptions.map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : (
            <Grid item xs={2}></Grid>
          )}
        </Grid>

        <TableContainer
          component={Paper}
          sx={{ marginTop: 4, width:"100%", maxHeight: 300, overflow: "scroll" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Bill No.</TableCell>
                <TableCell>Bill Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Item Code</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Packing</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Qty.</TableCell>
                <TableCell>Fr.</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Disc.</TableCell>
                <TableCell>Sale Amt.</TableCell>
                <TableCell>Pur. Amt.</TableCell>
                <TableCell>Mar. Amt.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={index + 1}
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.billNo || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.billDate || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.customer || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.itemCode || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.type || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.packing || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.cate || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.brand || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.qty || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.fr || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.rate || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.disc || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.saleAmt || "18.00"}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.purAmt || "8.00"}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.marAmt || "10.00"}
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

export default ProfitOnSale;
