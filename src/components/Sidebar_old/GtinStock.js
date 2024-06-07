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

const GtinStock = () => {
  const [brandName, setBrandName] = useState("");
  const [date, setDate] = useState("mm/dd/yyyy");
  const [onlyValue, setOnlyValue] = useState(false);
  const [filter1, setFilter1] = useState(null);

  const brandOptions = [
    "All",
    "Beer",
    "Country Sprit",
    "Foreign Liquor",
    "India Made Liquor",
  ];

  const [tableData, setTableData] = useState([
    {
      brand: "",
      gtinNo: "",
      measure: "",
      retailPrice: "",
      noOfBtl: "",
    },
  ]);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          GSTIN STOCK
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          GSTIN Stock
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              label="Select Brand"
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

          <Grid item xs={3}>
            <TextField
              fullWidth
              type="date"
              label="On Date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
          <RadioGroup
              row
              name="filter1"
              aria-label="filter1"
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
              
            >
              <FormControlLabel
                value="current-stock"
                control={<Radio />}
                label="Current Stock"
              />
              <FormControlLabel
                value="opening-stock"
                control={<Radio />}
                label="Opening Stock"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={onlyValue}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => setOnlyValue(e.target.checked)}
                />
              }
              label="Only Value"
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
                <TableCell>Brand Name</TableCell>
                <TableCell>GSTIN No.</TableCell>
                <TableCell>Measures(ml)</TableCell>
                <TableCell>Retail Rate</TableCell>
                <TableCell>No. of Btl.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: "12px" }}>
                    <TextField
                      size="small"
                      value={index + 1}
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "12px" }}>
                    <TextField
                      size="small"
                      value={row.brand || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "12px" }}>
                    <TextField
                      size="small"
                      value={row.gtin || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "12px" }}>
                    <TextField
                      size="small"
                      value={row.measure || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "12px" }}>
                    <TextField
                      size="small"
                      value={row.retailPrice || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "12px" }}>
                    <TextField
                      size="small"
                      value={row.noOfBtl || ""}
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

export default GtinStock;