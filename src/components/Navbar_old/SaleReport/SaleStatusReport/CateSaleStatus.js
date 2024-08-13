import React, { useState } from "react";
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

const CateSaleStatus = () => {
  const [uptoMonth, setUptoMonth] = useState("");
  const [filter1, setFilter1] = useState(null);

  const monthOptions = [
    "April 2023",
    "May 2023",
    "June 2023",
    "July 2023",
    "August 2023",
    "September 2023",
    "October 2023",
    "November 2023",
    "December 2023",
    "January 2024",
    "February 2024",
    "March 2024",
  ];

  const [tableData, setTableData] = useState([
    {
      companyItems: "",
      rate: "",
      amt: "",
      total: "",
    },
  ]);

  return (
    <form>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Category Sales Status
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Sales Analysis
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              label="Upto Month"
              name="uptoMonth"
              value={uptoMonth}
              onChange={(e) => setUptoMonth(e.target.value)}
            >
              {monthOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={3}></Grid>

          <Grid item xs={3}>
            <InputLabel htmlFor="filter1">Filter by</InputLabel>
            <RadioGroup
              row
              name="filter1"
              aria-label="filter1"
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <FormControlLabel
                value="btl(pcs)"
                control={<Radio />}
                label="Btl (Pcs)"
              />
              <FormControlLabel value="bl" control={<Radio />} label="BL" />
            </RadioGroup>
          </Grid>
        </Grid>

        <TableContainer
          component={Paper}
          sx={{ marginTop: 4, maxHeight: 300, overflow: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Items</TableCell>
                {uptoMonth
                  ? Array.from(
                      { length: monthOptions.indexOf(uptoMonth) + 1 },
                      (_, i) => {
                        const monthIndex = monthOptions.indexOf(uptoMonth) - i;
                        const month = monthOptions[monthIndex];
                        return <TableCell key={monthIndex}>{month}</TableCell>;
                      }
                    ).reverse()
                  : ""}
                <TableCell>Total</TableCell>
                <TableCell>Average</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      fullWidth
                      value={index + 1}
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.companyItems}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  {uptoMonth &&
                    Array.from(
                      { length: monthOptions.indexOf(uptoMonth) + 1 },
                      (_, i) => {
                        const monthIndex = monthOptions.indexOf(uptoMonth) - i;
                        const cellValue = "";
                        return (
                          <TableCell key={monthIndex} sx={{ padding: "8px" }}>
                            <TextField
                              size="small"
                              value={cellValue}
                              fullWidth
                              InputProps={{ readOnly: true }}
                            />
                          </TableCell>
                        );
                      }
                    ).reverse()}

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

export default CateSaleStatus;