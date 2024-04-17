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

const daysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const DailyItemSaleBrand = () => {
  const [selectedType, setSelectedType] = useState("");
  const [forMonth, setForMonth] = useState("2024-03");
  const [filter1, setFilter1] = useState(null);
  const selectOptions = [
    "50up IML",
    "60UP Country Spirit",
    "60up IML",
    "70up IML",
    "Beer(India)",
    "Brandy (IMFL)",
    "Rum (IMFL)",
    "Vodka (IMFL)",
    "Vodka (OS)",
    "Whisky (IMFL)",
    "Whisky (OS)",
    "Wine (IMFL)",
    "Wine (OS)",
  ];

  const monthYearArray = forMonth.split("-");
  console.log("monthYearArray: ", monthYearArray);
  const daysCount = daysInMonth(
    parseInt(monthYearArray[0]),
    parseInt(monthYearArray[1]) - 1
  );
  console.log("daysCount: ", daysCount);
  const daysColumns = Array.from({ length: daysCount }, (_, i) => i + 1);
  console.log("daysColumns: ", daysColumns);

  const initialTableData = Array.from({ length: 1 }, (_, index) => ({
    companyItems: "",
    rate: "",
    amt: "",
    total: "",
    ...Array.from({ length: daysCount }, (_, i) => ({
      [`day${i + 1}`]: "",
    })).reduce((acc, val, idx) => ({ ...acc, ...val }), {}),
  }));

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Brand Sale Status
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Sales Analysis
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              label="Select Type"
              name="selectedType"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {selectOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              type="month"
              label="For Month"
              name="forMonth"
              value={forMonth}
              onChange={(e) => setForMonth(e.target.value)}
            />
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
          sx={{ marginTop: 4, maxHeight: 300, overflowY: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Rate</TableCell>
                {/* Render columns for each day of the selected month */}
                {daysColumns.map((day, id) => (
                  <TableCell key={id}>Day {day}</TableCell>
                ))}
                <TableCell>Total</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: "4px" }}>
                    <TextField
                      size="small"
                      value={index + 1}
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "4px" }}>
                    <TextField
                      size="small"
                      value={row.companyItems}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "4px" }}>
                    <TextField
                      size="small"
                      value={row.rate}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  {/* Render cells for each day of the selected month */}
                  {daysColumns.map((day, id) => (
                    <TableCell key={id} sx={{ padding: "4px" }}>
                      <TextField
                        size="small"
                        value={row[`day${day}`] || ""}
                        fullWidth
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                  ))}

                  <TableCell sx={{ padding: "4px" }}>
                    <TextField
                      size="small"
                      value={row.total || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "4px" }}>
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

export default DailyItemSaleBrand;