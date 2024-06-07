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

const FLBeerCSLedger = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [dateFrom, setDateFrom] = useState("mm/dd/yyyy");
  const [dateTo, setDateTo] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState(null);
  const [filter2, setFilter2] = useState(null);
  const groupOptions = [
    "All",
    "Beer",
    "Country Sprit",
    "Foreign Liquor",
    "India Made Liquor",
  ];

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
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Group Ledger
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          FL Beer CS Ledger
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              label="Select Group"
              name="selectedGroup"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {groupOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
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

          <Grid item xs={3}>
            <InputLabel for="filter1">Filter 1</InputLabel>
            <RadioGroup
              row
              name="filter1"
              aria-label="filter1"
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel
                value="counter"
                control={<Radio />}
                label="Counter"
              />
              <FormControlLabel
                value="godown"
                control={<Radio />}
                label="Godown"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={3}>
            <InputLabel for="filter2">Filter 2</InputLabel>
            <RadioGroup
              row
              name="filter2"
              value={filter2}
              onChange={(e) => setFilter2(e.target.value)}
            >
              <FormControlLabel value="pcs" control={<Radio />} label="PCS" />
              <FormControlLabel
                value="bl/lpl"
                control={<Radio />}
                label="BL/LPL"
              />
            </RadioGroup>
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
                <TableCell>Group</TableCell>
                <TableCell>Opening Balance</TableCell>
                <TableCell>Closing Balance</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Total Receipt</TableCell>
                <TableCell>Total Transaction</TableCell>
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
                      value={row.group}
                      onChange={(event) =>
                        handleInputChange(event, index, "group")
                      }
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
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

                  <TableCell sx={{ padding: "8px" }}>
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

                  <TableCell sx={{ padding: "8px" }}>
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

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.totalReceipt || ""}
                      onChange={(event) =>
                        handleInputChange(event, index, "totalReceipt")
                      }
                      fullWidth
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
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

export default FLBeerCSLedger;