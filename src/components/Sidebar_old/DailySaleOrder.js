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

const DailySaleOrder = () => {
  const [brandName, setBrandName] = useState("");
  const [dateFrom, setDateFrom] = useState("mm/dd/yyyy");
  const [dateTo, setDateTo] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState(null);
  const [distributorName, setDistributorName] = useState("");
  const brandOptions = [
    "All",
    "Beer",
    "Country Sprit",
    "Foreign Liquor",
    "India Made Liquor",
  ];

  const distributorOptions = ["AA", "BB", "CC", "DD"];

  const [tableData, setTableData] = useState([
    {
      group: "",
      openingBal: "",
      closingBal: "",
      total: "",
      totalReceipt: "",
      totalSales: "",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTableData({ ...tableData, [name]: value });
  };

  return (
    <form>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
        Order on Daily Sales
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
        Daily Sale Order
        </Typography>

        <Grid container spacing={2}>

        <Grid item xs={4}>
            <RadioGroup
              row
              name="filter1"
              aria-label="filter1"
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
              
            >
              <FormControlLabel value="all" control={<Radio />} label="All"/>
              <FormControlLabel
                value="brandWise"
                control={<Radio />}
                label="Brand Wise"
              />
              <FormControlLabel
                value="distributorWise"
                control={<Radio />}
                label="Distributor Wise"
              />
            </RadioGroup>
          </Grid>

          {/* <Grid item xs={2}></Grid> */}
          

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

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              label="Distributor Name"
              name="distributorName"
              value={distributorName}
              onChange={(e) => setDistributorName(e.target.value)}
            >
              {distributorOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
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
                <TableCell>P Name</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Distributor Name</TableCell>
                <TableCell>In Stock</TableCell>
                <TableCell>Sale Qty.</TableCell>
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
                      value={row.group}
                      onChange={(event) =>
                        handleInputChange(event, index, "group")
                      }
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "12px" }}>
                    <TextField
                      size="small"
                      value={row.openingBal}
                      onChange={(event) =>
                        handleInputChange(event, index, "openingBal")
                      }
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "12px" }}>
                    <TextField
                      size="small"
                      value={row.closingBal || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "closingBal")
                      }
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "12px" }}>
                    <TextField
                      size="small"
                      value={row.total || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "total")
                      }
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>


                  <TableCell sx={{ padding: "12px" }}>
                    <TextField
                      size="small"
                      value={row.totalSales || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "totalSales")
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

export default DailySaleOrder;