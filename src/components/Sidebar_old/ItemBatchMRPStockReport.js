import {
  Box,
  Button,
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

const ItemBatchMRPStockReport = () => {
  const [selectOptions, setselectOptions] = useState(null);

  const [filterData, setFilterData] = useState({
    date: "mm/dd/yyyy",
    itemCode: "",
    itemName: "",
    itemCategory: "",
    pack: "",
    batchNo: "",
    brandNo: "",
    brandName: "",
    stockIn: "",
    distributor: "",
  })

  const [tableData, setTableData] = useState([
    {
      code: "",
      desc: "",
      category: "",
      pack: "",
      brand: "",
      batch: "",
      mrp: "",
      saleRate: "",
      btlPcs: "",
      pRate: "",
      mrpTotal: "",
      vatAmt: "",
      purTotal: "",
      stockIn: "",
    },
  ]);

  const batchNoOptions = ["0", "00", "01", "516-1", "521-1", "526-1"];

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

  const stockInOptions = ["All", "Godown", "Showroom"];
  const distributorOptions = ["AA", "BB", "CC", "DD"];
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setTableData({ ...tableData, [name]: value });
  // };

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          StockReport
        </Typography>
        {/* <Typography variant="subtitle1" gutterBottom>
        Stock Details
        </Typography> */}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel for="selectOptions">Select Options</InputLabel>
            <RadioGroup
              row
              name="selectOptions"
              aria-labelledby="selectOptions"
              value={selectOptions}
              onChange={(e) => setselectOptions(e.target.value)}
            >
              <FormControlLabel
                value="all-stock"
                control={<Radio />}
                label="All Stock"
              />
              <FormControlLabel value="item" control={<Radio />} label="Item" />
              <FormControlLabel
                value="category"
                control={<Radio />}
                label="Category"
              />
              <FormControlLabel value="pack" control={<Radio />} label="Pack" />
              <FormControlLabel
                value="brand-wise"
                control={<Radio />}
                label="Brand Wise"
              />
              <FormControlLabel
                value="cate/item"
                control={<Radio />}
                label="Cate/Item"
              />
              <FormControlLabel
                value="cate/pack"
                control={<Radio />}
                label="Cate/Pack"
              />
              <FormControlLabel
                value="cate/brand"
                control={<Radio />}
                label="Cate/Brand"
              />
              <FormControlLabel
                value="item/pack"
                control={<Radio />}
                label="Item/Pack"
              />
              <FormControlLabel
                value="brand/pack"
                control={<Radio />}
                label="Brand/Pack"
              />
              <FormControlLabel
                value="item/brand"
                control={<Radio />}
                label="Item/Brand"
              />

              <FormControlLabel
                value="item/pack/brand"
                control={<Radio />}
                label="Item/Pack/Brand"
              />
              <FormControlLabel
                value="item/cate/size"
                control={<Radio />}
                label="Item/Cate/Size"
              />
              <FormControlLabel
                value="item/cate/brand"
                control={<Radio />}
                label="Item/Cate/Brand"
              />

              <FormControlLabel
                value="cate/pack/brand"
                control={<Radio />}
                label="Cate/Pack/Brand"
              />
              <FormControlLabel
                value="distributor-wise"
                control={<Radio />}
                label="Distributor Wise"
              />
              <FormControlLabel
                value="code-wise"
                control={<Radio />}
                label="Code Wise"
              />
              <FormControlLabel
                value="batch-wise"
                control={<Radio />}
                label="Batch Wise"
              />
              <FormControlLabel
                value="batch/item"
                control={<Radio />}
                label="Batch/Item"
              />
              <FormControlLabel
                value="batch/cate"
                control={<Radio />}
                label="Batch/Cate"
              />
              <FormControlLabel
                value="batch/brand"
                control={<Radio />}
                label="Batch/Brand"
              />
              <FormControlLabel
                value="stock-on"
                control={<Radio />}
                label="Stock On"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              name="date"
              label="Date"
              variant="outlined"
              value={filterData.date}
              onChange={(e) =>
                setFilterData({ ...filterData, date: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="itemCode"
              label="Item Code"
              variant="outlined"
              value={filterData.itemCode}
              onChange={(e) =>
                setFilterData({ ...filterData, itemCode: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="itemName"
              label="Item Name"
              variant="outlined"
              value={filterData.itemName}
              onChange={(e) =>
                setFilterData({ ...filterData, itemName: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="itemCategory"
              label="Item Category"
              variant="outlined"
              value={filterData.itemCategory}
              onChange={(e) =>
                setFilterData({ ...filterData, itemCategory: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="pack"
              label="Pack"
              variant="outlined"
              value={filterData.pack}
              onChange={(e) =>
                setFilterData({ ...filterData, pack: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
            select
              fullWidth
              name="batchNo"
              label="Batch No."
              variant="outlined"
              value={filterData.batchNo}
              onChange={(e) =>
                setFilterData({ ...filterData, batchNo: e.target.value })
              }
            >{batchNoOptions.map((option, i) => (
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
              name="brandName"
              label="Brand Name"
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
              name="stockIn"
              label="Stock In"
              variant="outlined"
              value={filterData.stockIn}
              onChange={(e) =>
                setFilterData({ ...filterData, stockIn: e.target.value })
              }
            >
              {stockInOptions?.map((option, i) => (
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
              name="distributor"
              label="Distributor"
              variant="outlined"
              value={filterData.distributor}
              onChange={(e) =>
                setFilterData({ ...filterData, distributor: e.target.value })
              }
            >
              {distributorOptions?.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
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
                <TableCell>Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Pack</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Sale Rate</TableCell>
                <TableCell>Btl (Pcs)</TableCell>
                <TableCell>P. Rate</TableCell>
                <TableCell>MRP Total</TableCell>
                <TableCell>Vat Amt.</TableCell>
                <TableCell>Pur. Total</TableCell>
                <TableCell>Stock In</TableCell>
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
                      value={row.code}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.desc}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.category || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.pack || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.brand || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.batch || ""}
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
                      value={row.saleRate || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.btlPcs || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.pRate || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.mrpTotal || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.vatAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.purTotal || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
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

export default ItemBatchMRPStockReport;
