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

const StockStatus = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [onDate, setOnDate] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState(null);
  const [onlyValueChecked, setOnlyValueChecked] = useState(false);
  const categoryOptions = [
    "All",
    "50 UP IML",
    "60 UP IML",
    "70 UP IML",
    "Beer (India)",
    "Brandy (IMFL)",
    "Rum (IMFL)",
    "Vodka (IMFL)",
    "Vodka (OS)",
    "Whisky (IMFL)",
    "Whisky (OS)",
    "Wine (IMFL)",
    "Wine (OS)",
  ];

  const groupOptions = [
    "All",
    "Beer",
    "Country Sprit",
    "Foreign Liquor",
    "India Made Liquor",
  ];

  const [tableData, setTableData] = useState([
    {
      companyItems: "",
      qty: "",
      amt: "",
      total: {
        qty: "",
        amt: "",
      },
      avg: {
        qty: "",
        amt: "",
      }
    },
  ]);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Daily Stock Book
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Category and Measure Wise Stock Status
        </Typography>

        <Grid container spacing={2}>

        <Grid item xs={3}>
            <TextField
              select
              fullWidth
              label="Name of Category"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            >
              {categoryOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>


          <Grid item xs={3}>
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

          <Grid item xs={3}>
            <TextField
              fullWidth
              type="date"
              label="On Date"
              name="onDate"
              value={onDate}
              onChange={(e) => setOnDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <InputLabel for="filter1">Filter by</InputLabel>
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
              <FormControlLabel
                value="bl"
                control={<Radio />}
                label="BL"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={1}>
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
                <TableCell>Category</TableCell>
                <TableCell>Pack</TableCell>
                <TableCell>Pack</TableCell>
                <TableCell>Pack</TableCell>
                <TableCell>Pack</TableCell>
                <TableCell>Pack</TableCell> 
                <TableCell>Total Qty.</TableCell>
                <TableCell>Total Amt.</TableCell>
                <TableCell>Average Qty.</TableCell>
                <TableCell>Average Amt.</TableCell>
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
                      value={row.companyItems}
                      
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
                      value={row.amt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.qty || ""}
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

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.qty || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.total.qty || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.total.amt || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.avg.qty || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.avg.amt || ""}
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
            marginTop: 2
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

export default StockStatus;