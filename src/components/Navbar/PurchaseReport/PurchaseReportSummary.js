import {
  Box,
  Button,
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

const PurchaseReportSummary = () => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [dateFrom, setDateFrom] = useState("mm/dd/yyyy");
  const [dateTo, setDateTo] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState("date-wise");

  const [tableData, setTableData] = useState([
    {
      eNo: "",
      billNo: "",
      passNo: "",
      billDate: "",
      supplierName: "",
      mrp: "",
      grossAmt: "",
      discAmt: "",
      govtRoundOff: "",
      specialPurposes: "",
      serviceTax: "",
      tcsAmt: "",
      netAmt: "",
    },
  ]);



  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Purchase Report
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Purchase Report Summary
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={4.8}>
            <RadioGroup
              row
              name="filter1"
              aria-label="filter1"
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <FormControlLabel
                value="date-wise"
                control={<Radio />}
                label="Date Wise"
              />

              <FormControlLabel
                value="supplier/date-wise"
                control={<Radio />}
                label="Supplier/Date Wise"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              fullWidth
              type="date"
              label="Date from"
              name="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              fullWidth
              type="date"
              label="Date to"
              name="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Grid>

          {filter1 === "supplier/date-wise" && (
            <Grid item xs={2.4}>
              <TextField
                select
                fullWidth
                name="Supplier"
                label="Supplier"
                variant="outlined"
                className="input-field"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                {["cash", "dealer", "rohit dhull"].map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
        </Grid>

        <TableContainer
          component={Paper}
          sx={{
            marginTop: 4,
            width: "100%",
            maxHeight: 300,
            overflow: "scroll",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>E. No.</TableCell>
                <TableCell>Bill No.</TableCell>
                <TableCell>Pass No.</TableCell>
                <TableCell>Bill Date</TableCell>
                <TableCell>Supplier Name</TableCell>
                <TableCell>MRP Value</TableCell>
                <TableCell>Gross Amt.</TableCell>
                <TableCell>Disc. Amt.</TableCell>
                <TableCell>Govt. Round Off</TableCell>
                <TableCell>Special Purposes</TableCell>
                <TableCell>Service Tax</TableCell>
                <TableCell>Tcs Amt.</TableCell>
                <TableCell>Net Amt.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={index + 1}
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.eNo || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.billNo || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.passNo || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.billDate || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.supplierName || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.mrp || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.grossAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.discAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.govtRoundOff || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.specialPurposes || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.serviceTax || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.tcsAmt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "6px" }}>
                    <TextField
                      size="small"
                      value={row.netAmt || ""}
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

export default PurchaseReportSummary;
