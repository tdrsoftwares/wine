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

const CustomerDueReport = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedParty, setSelectedParty] = useState("");
  const [dateFrom, setDateFrom] = useState("mm/dd/yyyy");
  const [dateTo, setDateTo] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState(null);
  console.log("filter1: ", filter1);
  const [currDuesChecked, setcurrDuesChecked] = useState(false);
  const [onDateDuesChecked, setonDateDuesChecked] = useState(false);
  const [onlyValueChecked, setOnlyValueChecked] = useState(false);

  const items = ["100 Pipers 375", "100 Pipers 12Yr 750", "100 Pipers W180"];

  const [tableData, setTableData] = useState([
    {
      custName: "",
      open: "",
      recAmt: "",
      address: "",
      sls: "",
      close: "",
    },
  ]);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Customer Report
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Customer Balance Report
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={5}>
            <InputLabel for="filter1">Filter by</InputLabel>
            <RadioGroup
              row
              name="filter1"
              aria-label="filter1"
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <FormControlLabel
                value="all-dues"
                control={<Radio />}
                label="All Dues"
              />

              <FormControlLabel
                value="type-wise-dues"
                control={<Radio />}
                label="Type Wise Dues"
              />

              <FormControlLabel
                value="party-wise-dues"
                control={<Radio />}
                label="Party Wise Dues"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid item xs={2}>
            {filter1 === "type-wise-dues" ? (
              <TextField
                select
                fullWidth
                name="type"
                label="Type"
                variant="outlined"
                className="input-field"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {["cash", "dealer"].map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            ) : filter1 === "party-wise-dues" ? (
              <TextField
                select
                fullWidth
                name="party"
                label="Party"
                variant="outlined"
                className="input-field"
                value={selectedParty}
                onChange={(e) => setSelectedParty(e.target.value)}
              >
                {["cash", "dealer", "rohit dhull"].map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              ""
            )}
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

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currDuesChecked}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => setcurrDuesChecked(e.target.checked)}
                />
              }
              label="Current Dues"
            />
          </Grid>

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={onDateDuesChecked}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => setonDateDuesChecked(e.target.checked)}
                />
              }
              label="On Date Dues"
            />
          </Grid>
          <Grid item xs={6}></Grid>

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={onlyValueChecked}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => setOnlyValueChecked(e.target.checked)}
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
                <TableCell>Customer Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Opening Bal.</TableCell>
                <TableCell>Sales Amt.</TableCell>
                <TableCell>Rec. Amt.</TableCell>
                <TableCell>Closing Bal.</TableCell>
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
                      value={row.custName}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.address}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.open || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.sls || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.recAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.close || ""}
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

export default CustomerDueReport;
