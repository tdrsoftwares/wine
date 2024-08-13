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

const DsrBrandStock = () => {
  const [selectOptions, setselectOptions] = useState(null);
  const [newBrandName, setNewBrandName] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");

  const [filterData, setFilterData] = useState({
    dateFrom: "mm/dd/yyyy",
    dateTo: "mm/dd/yyyy",
    brandName: "",
    pack: "",
    companyName: "",
    billFrom: "",
    billTo: "",
    series: "",
    group: "",
    stockIn: "",
  });

  const [tableData, setTableData] = useState([
    {
      brand: "",
      qty: "",
      opening: "",
      closing: "",

      issue: "",
      total: "",
      sale: "",
      rate: "",
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

  const packOptions = [
    "50up IML",
    "60UP Country Spirit",
    "60up IML",
    "70up IML",
    "Beer(India)",
    "Brandy (IMFL)",
  ];

  const companyOptions = [
    "100 Pipers 375",
    "100 Pipers 12Yr 750",
    "100 Pipers W180",
  ];

  const stockInOptions = ["All", "Godown", "Showroom"];

  return (
    <form>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          DSR With Stock
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Brand DSR Item Total
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
                value="brand-size"
                control={<Radio />}
                label="Brand/Size"
              />
              <FormControlLabel
                value="all-brand"
                control={<Radio />}
                label="All Brand"
              />
              <FormControlLabel
                value="all-brand-size"
                control={<Radio />}
                label="All Brand/Size"
              />
              <FormControlLabel
                value="company"
                control={<Radio />}
                label="Company"
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
              name="pack"
              label="Pack"
              variant="outlined"
              className="input-field"
              value={filterData.pack}
              onChange={(e) =>
                setFilterData({ ...filterData, pack: e.target.value })
              }
            >
              {packOptions.map((pack, id) => (
                <MenuItem key={id} value={pack}>
                  {pack}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              name="companyName"
              label="Company"
              variant="outlined"
              value={filterData.companyName}
              onChange={(e) =>
                setFilterData({ ...filterData, companyName: e.target.value })
              }
            >
              {companyOptions.map((item, id) => (
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

        <Box gutterBottom>
          <Typography variant="subtitle2" gutterBottom sx={{ marginTop: 2 }}>
            Company Create
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                type="text"
                label="Brand Name"
                name="brandName"
                id="brandName"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                fullWidth
                type="text"
                label="Company Name"
                name="companyName"
                id="companyName"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
              />
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: 2,
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
                color="error"
                size="large"
                variant="outlined"
                onClick={() => {}}
                sx={{ marginTop: 2 }}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Box>

        <TableContainer
          component={Paper}
          sx={{ marginTop: 4, maxHeight: 300, overflowY: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Qty.</TableCell>
                <TableCell>Opening</TableCell>
                <TableCell>Closing</TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Sale</TableCell>
                <TableCell>Rate</TableCell>
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
                      value={row.brand}
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
                      value={row.opening || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.closing || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.issue || ""}
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
                      value={row.rate || ""}
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

export default DsrBrandStock;
