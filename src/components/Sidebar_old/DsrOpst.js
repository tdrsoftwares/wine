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

const DsrOpst = () => {
  const [selectOptions, setselectOptions] = useState(null);

  const [filterData, setFilterData] = useState({
    dateFrom: "mm/dd/yyyy",
    dateTo: "mm/dd/yyyy",
    brandName: "",
    categoryName: "",
    itemName: "",
    billFrom: "",
    billTo: "",
    series: "",
    group: "",
    stockIn: "",
  });

  const [tableData, setTableData] = useState([
    {
      items: "",
      mrp: "",
      opst: "",
      sale: "",
      amt: "",
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

  const categories = [
    "50up IML",
    "60UP Country Spirit",
    "60up IML",
    "70up IML",
    "Beer(India)",
    "Brandy (IMFL)",
  ];

  const itemsOptions = [
    "100 Pipers 375",
    "100 Pipers 12Yr 750",
    "100 Pipers W180",
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
  const seriesOptions = ["A", "B", "C", "D", "E", "ALL"];
  const stockInOptions = ["All", "Godown", "Showroom"];
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
          DSR With Stock
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          DSR Item Total
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
              <FormControlLabel
                value="item-name"
                control={<Radio />}
                label="Item Name"
              />
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
                value="bill-range"
                control={<Radio />}
                label="Bill Range"
              />
              <FormControlLabel
                value="fl-beer-cs"
                control={<Radio />}
                label="Fl,Beer,Cs"
              />
              <FormControlLabel
                value="all-brand-size"
                control={<Radio />}
                label="All Brand/Size"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={2.4}>
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

          <Grid item xs={2.4}>
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

          <Grid item xs={2.4}>
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

          <Grid item xs={2.4}>
            <TextField
              select
              fullWidth
              name="category"
              label="Category"
              variant="outlined"
              className="input-field"
              value={filterData.categoryName}
              onChange={(e) =>
                setFilterData({ ...filterData, categoryName: e.target.value })
              }
            >
              {categories.map((category, id) => (
                <MenuItem key={id} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              select
              fullWidth
              name="itemName"
              label="Item Name"
              variant="outlined"
              value={filterData.itemName}
              onChange={(e) =>
                setFilterData({ ...filterData, itemName: e.target.value })
              }
            >
              {itemsOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2.4}>
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

          <Grid item xs={2.4}>
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

          <Grid item xs={2.4}>
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

          <Grid item xs={2.4}>
            <TextField
              select
              fullWidth
              name="group"
              label="group"
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

          <Grid item xs={2.4}>
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
                <TableCell>MRP</TableCell>
                <TableCell>OP ST</TableCell>
                <TableCell>Sale</TableCell>

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
                      value={row.items}
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
                      value={row.opst || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.sale || ""}
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

export default DsrOpst;
