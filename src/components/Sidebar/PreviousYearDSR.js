import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const PreviousYearDSR = () => {
  const [periodStartDate, setPeriodStartDate] = useState("mm/dd/yyyy");
  const [periodEndDate, setPeriodEndDate] = useState("mm/dd/yyyy");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billTo, setBillTo] = useState("");
  const [series, setSeries] = useState("");
  const [selectedBillType, setSelectedBillType] = useState("");

  const brands = [
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

  const [tableData, setTableData] = useState(
    Array.from({ length: 3 }, () => ({
      items: "",
      mrp: "",
      btl: "",
      blLpl: "",
      amt: "",
    }))
  );

  const items = ["100 Pipers 375", "100 Pipers 12Yr 750", "100 Pipers W180"];
  const billTypes = ["Cash", "Dealer"];
  const billFromOptions = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"];
  const billToOptions = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"];
  const seriesOptions = ["A", "B", "C", "D", "E", "ALL"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTableData({ ...tableData, [name]: value });
  };
  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Daily Sale Report
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Item Total
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="billDate"
                control={<Radio />}
                label="Bill Date"
              />
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
                value="allBrand"
                control={<Radio />}
                label="All Brand"
              />
              <FormControlLabel
                value="allCategory"
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
              <FormControlLabel
                value="flbeercs"
                control={<Radio />}
                label="FL/Beer/Cs"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              name="dateFrom"
              label="Date from"
              variant="outlined"
              className="form-field"
              value={periodStartDate}
              onChange={(e) => setPeriodStartDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              name="endDate"
              label="Date to"
              variant="outlined"
              className="form-field"
              value={periodEndDate}
              onChange={(e) => setPeriodEndDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              name="brand"
              label="Brand"
              variant="outlined"
              className="form-field"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              name="category"
              label="Category"
              variant="outlined"
              className="form-field"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, id) => (
                <MenuItem key={id} value={category}>
                  {category}
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
              className="form-field"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
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
              className="form-field"
              value={billFrom}
              onChange={(e) => setBillFrom(e.target.value)}
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
              className="form-field"
              value={billTo}
              onChange={(e) => setBillTo(e.target.value)}
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
              className="form-field"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
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
              select
              fullWidth
              type="text"
              name="billType"
              label="Bill Type"
              variant="outlined"
              className="form-field"
              value={selectedBillType}
              onChange={(e) => setSelectedBillType(e.target.value)}
            >
              {billTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
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
                <TableCell>BTL</TableCell>
                <TableCell>BL/LPL</TableCell>
                <TableCell>Amt(₹)</TableCell>
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
                      onChange={(event) =>
                        handleInputChange(event, index, "items")
                      }
                      fullWidth
                      InputProps={{ readOnly: true }}
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
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.btl || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "btl")
                      }
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.blLpl || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "blLpl")
                      }
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>


                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.amt || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "amt")
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
            justifyContent: "flex-end"
          }}
        >
          <Button
            color="primary"
            size="large"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginTop: 2, marginRight: 2 }}
          >
            Save
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

export default PreviousYearDSR;