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

const DailyItemStatus = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [onDate, setOnDate] = useState("mm/dd/yyyy");
  const [filter1, setFilter1] = useState(null);
  const [onlyValueChecked, setOnlyValueChecked] = useState(false);

  const items = ["100 Pipers 375", "100 Pipers 12Yr 750", "100 Pipers W180"];

  const [tableData, setTableData] = useState([
    {
      items: "",
      open: "",
      rec: "",
      total: "",
      sls: "",
      close: "",
      mrp: "",
    },
  ]);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Daily Item Status
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Daily Item Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              name="Item"
              label="Item"
              variant="outlined"
              className="input-field"
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
              fullWidth
              type="date"
              label="On Date"
              name="onDate"
              value={onDate}
              onChange={(e) => setOnDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel for="filter1">Filter by</InputLabel>
            <RadioGroup
              row
              name="filter1"
              aria-label="filter1"
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <FormControlLabel value="item" control={<Radio />} label="Item" />
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

              <FormControlLabel value="imfl" control={<Radio />} label="IMFL" />

              <FormControlLabel value="osbi" control={<Radio />} label="OSBI" />

              <FormControlLabel value="os" control={<Radio />} label="OS" />
            </RadioGroup>
          </Grid>

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
                <TableCell>Item</TableCell>
                <TableCell>Open</TableCell>
                <TableCell>Rec.</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Sale</TableCell>
                <TableCell>Close</TableCell>
                <TableCell>MRP</TableCell>
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
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.open}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.rec || ""}
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
                      value={row.sls || ""}
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

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.mrp || ""}
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

export default DailyItemStatus;
