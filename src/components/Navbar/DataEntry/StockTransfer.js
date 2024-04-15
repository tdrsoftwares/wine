import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const StockTransfer = () => {
  const toDaysDate = dayjs();

  const [tableData, setTableData] = useState(
    Array.from({ length: 10 }, () => ({
      itemCode: "",
      itemDescription: "",
      brand: "",
      category: "",
      recBatch: "",
      newBatch: "",
      mrp: "",
      packing: "",
      case: "",
      pcs: "",
    }))
  );

  const handleItemChange = () => {

  }

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Stock Transfer
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              name="transferFrom"
              label="Transfer from"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={""}
              onChange={(e) => {}} //write the function
            >
              <MenuItem value="item1">Item 1</MenuItem>
              <MenuItem value="item2">Item 2</MenuItem>
              <MenuItem value="item3">Item 3</MenuItem>
              <MenuItem value="item4">Item 4</MenuItem>
              <MenuItem value="item5">Item 5</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              name="transferNo"
              label="Transfer No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={""}
              onChange={(e) => {}} //write the function
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              select
              name="transferTo"
              label="Transfer to"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={""}
              onChange={(e) => {}} //write the function
            >
              <MenuItem value="item1">Item 1</MenuItem>
              <MenuItem value="item2">Item 2</MenuItem>
              <MenuItem value="item3">Item 3</MenuItem>
              <MenuItem value="item4">Item 4</MenuItem>
              <MenuItem value="item5">Item 5</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DatePicker
                name="transferDate"
                label="Transfer Date"
                value={toDaysDate}
                sx={{ width: "100%" }}
                onChange={() => {}} //write the function
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                )}
                fullWidth
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <TableContainer
          component={Paper}
          sx={{ marginTop: 4, maxHeight: 450, overflowY: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Item Code</TableCell>
                <TableCell>Item Description</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Rec Batch</TableCell>
                <TableCell>New Batch</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Packing</TableCell>
                <TableCell>Case</TableCell>
                <TableCell>Pcs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={index + 1}
                      // fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.itemCode}
                      onChange={(event) =>
                        handleItemChange(event, index, "itemCode")
                      }
                      fullWidth
                      // InputProps={{ readOnly: row.itemDescription !== "" }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "10px" }}>
                    <TextField
                      select
                      size="small"
                      value={row.itemDescription}
                      onChange={(event) =>
                        handleItemChange(event, index, "itemDescription")
                      }
                      fullWidth
                    >
                      <MenuItem value="item1">Item 1</MenuItem>
                      <MenuItem value="item2">Item 2</MenuItem>
                      <MenuItem value="item3">Item 3</MenuItem>
                      <MenuItem value="item4">Item 4</MenuItem>
                      <MenuItem value="item5">Item 5</MenuItem>
                    </TextField>
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.brand}
                      onChange={(event) =>
                        handleItemChange(event, index, "brand")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.category || ""}
                      onChange={(event) =>
                        handleItemChange(event, index, "category")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.recBatch || ""}
                      onChange={(event) =>
                        handleItemChange(event, index, "recBatch")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.newBatch || ""}
                      onChange={(event) =>
                        handleItemChange(event, index, "newBatch")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.mrp || ""}
                      onChange={(event) =>
                        handleItemChange(event, index, "mrp")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.packing || ""}
                      onChange={(event) =>
                        handleItemChange(event, index, "packing")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.case || ""}
                      onChange={(event) =>
                        handleItemChange(event, index, "case")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.pcs || ""}
                      onChange={(event) =>
                        handleItemChange(event, index, "pcs")
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
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            New Transfer
          </Button>
          <Button
            color="primary"
            size="large"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            Save
          </Button>
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            Print
          </Button>
          <Button
            color="error"
            size="large"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginTop: 3 }}
          >
            Clear
          </Button>
        </Box>

      </Box>
    </form>
  );
};

export default StockTransfer;
