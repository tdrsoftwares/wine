import {
  Box,
  Button,
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

const ItemWisePurchaseReport = () => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [code, setCode] = useState("");
  const [dateFrom, setDateFrom] = useState("mm/dd/yyyy");
  const [dateTo, setDateTo] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState("");

  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [itemName, setItemName] = useState("");
  const [packing, setPacking] = useState("");

  const [tableData, setTableData] = useState([
    {
      eNo: "",
      billNo: "",
      billDate: "",
      itemName: "",
      brand: "",
      cate: "",
      packing: "",
      bl: "",
      cases: "",
      qty: "",
      rate: "",
      mrp: "",
      disc: "",
      vat: "",
      brkReceipt: "",
      total: "",
      mrpTotal: "",
      margin: "",
      stockIn: "",
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
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Purchase Report
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Item Wise Purchase Report
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
                value="supplier"
                control={<Radio />}
                label="Supplier"
              />
              <FormControlLabel value="item" control={<Radio />} label="Item" />
              <FormControlLabel
                value="supplier/item"
                control={<Radio />}
                label="Supplier/Item"
              />
              <FormControlLabel
                value="category"
                control={<Radio />}
                label="Category"
              />

              <FormControlLabel
                value="brand"
                control={<Radio />}
                label="Brand"
              />

              <FormControlLabel value="fl" control={<Radio />} label="Fl" />

              <FormControlLabel value="beer" control={<Radio />} label="Beer" />

              <FormControlLabel
                value="cs/iml"
                control={<Radio />}
                label="CS/IML"
              />
              <FormControlLabel value="code" control={<Radio />} label="Code" />

              <FormControlLabel value="pack" control={<Radio />} label="Pack" />
            </RadioGroup>
          </Grid>

          {filter1 === "date" ? (
            <>
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
            </>
          ) : (
            ""
          )}

          {filter1 === "supplier" || filter1 === "supplier/item" ? (
            <Grid item xs={2}>
              <TextField
                select
                fullWidth
                name="Supplier"
                label="Supplier"
                variant="outlined"
                className="form-field"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                {["Bevco", "Diamond", "Kalyani", "Vikram dhull"].map(
                  (item, id) => (
                    <MenuItem key={id} value={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
          ) : (
            ""
          )}

          {filter1 === "item" || filter1 === "supplier/item" ? (
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
            ""
          )}

          {filter1 === "brand" ? (
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
            ""
          )}

          {filter1 === "category" ? (
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
            ""
          )}

          {filter1 === "pack" ? (
            <Grid item xs={2}>
              <TextField
                select
                fullWidth
                name="packing"
                label="Packing"
                variant="outlined"
                className="form-field"
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
            ""
          )}

          {filter1 === "code" ? (
            <Grid item xs={2}>
              <TextField
                select
                fullWidth
                name="code"
                label="Code"
                variant="outlined"
                className="form-field"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              >
                {packingOptions.map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : (
            ""
          )}
        </Grid>

        <TableContainer
          component={Paper}
          sx={{
            marginTop: 4,
            width: "100%",
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>E. No.</TableCell>
                <TableCell>Bill No.</TableCell>
                <TableCell>Bill Date</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Packing</TableCell>
                <TableCell>BL</TableCell>
                <TableCell>Cases</TableCell>
                <TableCell>Qty.</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Disc.</TableCell>
                <TableCell>Vat</TableCell>
                <TableCell>Brk. Receipt</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>MRP Total</TableCell>
                <TableCell>Margin(%)</TableCell>
                <TableCell>Stock In</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.eNo || ""}
                      fullWidth
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
                      value={row.itemName || ""}
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
                      value={row.cate || ""}
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
                      value={row.bl || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.cases || ""}
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
                      value={row.rate || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.mrp || ""}
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
                      value={row.vat || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.brkReceipt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.total || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.mrpTotal || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.margin || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.stockIn || ""}
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

export default ItemWisePurchaseReport;