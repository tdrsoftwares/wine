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

const ItemWiseSaleReport = () => {
  const [selectOptions, setselectOptions] = useState(null);

  const [filterData, setFilterData] = useState({
    dateFrom: "mm/dd/yyyy",
    dateTo: "mm/dd/yyyy",
    batchNo: "",
    distributorName: "",
    group: "",
    userName: "",
    billNo: "",
    series: "",
    phone: "",
    isShortChecked: false,
    isBrkSummaryChecked: false,
  });

  const [tableData, setTableData] = useState([
    {
      billNo: "",
      billDate: "",
      customerName: "",
      pCode: "",
      category: "",
      brand: "",
      itemDesc: "",
      pack: "",
      pcs: "",
      mrp: "",
      rate: "",
      disc: "",
      bl: "",
      amt:"",
      brkPc: "",
      brkAmt: "",
      batch: "",
      total: ""
    },
  ]);

  const batchNoOptions = ["0", "00", "01", "516-1", "521-1", "526-1"];
  const distributorOptions = ["AA", "BB", "CC", "DD"];
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
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Sale Report
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Sale Report
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <RadioGroup
              row
              name="selectOptions"
              aria-labelledby="selectOptions"
              value={selectOptions}
              onChange={(e) => setselectOptions(e.target.value)}
            >
              <FormControlLabel value="date" control={<Radio />} label="Date" />
              <FormControlLabel
                value="customer"
                control={<Radio />}
                label="Customer"
              />
              <FormControlLabel value="code" control={<Radio />} label="Code" />
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="brand"
                control={<Radio />}
                label="Brand"
              />
              <FormControlLabel
                value="item-name"
                control={<Radio />}
                label="Item Name"
              />
              <FormControlLabel
                value="batch"
                control={<Radio />}
                label="Batch"
              />
              <FormControlLabel value="pack" control={<Radio />} label="Pack" />
              <FormControlLabel
                value="series"
                control={<Radio />}
                label="Series"
              />
              <FormControlLabel
                value="brand-packing"
                control={<Radio />}
                label="Brand/Packing"
              />
              <FormControlLabel
                value="cate-packing"
                control={<Radio />}
                label="Cate/Packing"
              />
              <FormControlLabel value="group" control={<Radio />} label="Group" />
              <FormControlLabel
                value="supplier"
                control={<Radio />}
                label="Supplier"
              />
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel value="bill" control={<Radio />} label="Bill" />
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
              name="batchNo"
              label="Batch No."
              variant="outlined"
              value={filterData.batchNo}
              onChange={(e) =>
                setFilterData({ ...filterData, batchNo: e.target.value })
              }
            >
              {batchNoOptions.map((option, i) => (
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
              name="distributorName"
              label="Distributor Name"
              variant="outlined"
              value={filterData.distributorName}
              onChange={(e) =>
                setFilterData({
                  ...filterData,
                  distributorName: e.target.value,
                })
              }
            >
              {distributorOptions.map((option, i) => (
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
              name="billNo"
              select
              label="Bill No"
              variant="outlined"
              fullWidth
              className="input-field"
              value={filterData.billNo}
              onChange={(e) =>
                setFilterData({ ...filterData, billNo: e.target.value })
              }
            >
              {[""].map((item, id) => (
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

          {/* <Grid item xs={3}></Grid> */}

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterData.isShortChecked}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      isShortChecked: e.target.checked,
                    })
                  }
                />
              }
              label="Short"
            />
          </Grid>

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterData.isBrkSummaryChecked}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      isBrkSummaryChecked: e.target.checked,
                    })
                  }
                />
              }
              label="Brake Summary"
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
                <TableCell>Bill Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>P. Code</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Item Desc.</TableCell>
                <TableCell>Packing</TableCell>
                <TableCell>Pcs</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Disc.</TableCell>
                <TableCell>BL</TableCell>
                <TableCell>Amt.(Rs)</TableCell>
                <TableCell>Brk Pc.</TableCell>
                <TableCell>Brk Amt.</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>

            {/* 
            
            const [tableData, setTableData] = useState([
    {
      
    },
  ]);
            
            */}
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
                      value={row.pCode || ""}
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
                      value={row.brand || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.itemDesc || ""}
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
                      value={row.pcs || ""}
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
                      value={row.rate || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.disc || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.bl || ""}
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
                      value={row.brkPc || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.brkAmt || ""}
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
                      value={row.total || ""}
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

export default ItemWiseSaleReport;
