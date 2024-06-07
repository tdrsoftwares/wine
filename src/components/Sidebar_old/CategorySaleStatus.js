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

const CategorySaleStatus = () => {
  const [selectedType, setSelectedType] = useState("");
  const [uptoMonth, setUptoMonth] = useState("March, 2024");
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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setTableData({ ...tableData, [name]: value });
  // };

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Sales Analysis
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
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
              label="Upto Month"
              name="uptoMonth"
              value={uptoMonth}
              onChange={(e) => setUptoMonth(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}></Grid>

          <Grid item xs={3}>
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
                <TableCell>Qty.</TableCell>
                <TableCell>Amt.</TableCell>
                <TableCell>Qty.</TableCell>
                <TableCell>Amt.</TableCell>
                <TableCell>Qty.</TableCell>
                <TableCell>Amt.</TableCell>
                <TableCell>Qty.</TableCell>
                <TableCell>Amt.</TableCell>
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

export default CategorySaleStatus;