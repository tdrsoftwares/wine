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

const CatBrandStock = () => {
  const [categoryName, setCategoryName] = useState("");
  const [date, setDate] = useState("mm/dd/yyyy");
  const [onlyValue, setOnlyValue] = useState(false);
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

  const [tableData, setTableData] = useState([
    {
      category: "",
      pack1: "",
      pack2: "",
      pack3: "",
      pack4: "",
      pack5: "",
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
          Category Wise Stock
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Category/Brand Stock
        </Typography>

        <Grid container spacing={3}>
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
              fullWidth
              type="date"
              label="On Date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}></Grid>

          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={onlyValue}
                  inputProps={{ "aria-label": "controlled" }}
                  onChange={(e) => setOnlyValue(e.target.checked)}
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
                <TableCell>Pack 1</TableCell>
                <TableCell>Pack 2</TableCell>
                <TableCell>Pack 3</TableCell>
                <TableCell>Pack 4</TableCell>
                <TableCell>Pack 5</TableCell>
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
                      value={row.category || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.pack1}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.pack2}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.pack3 || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.pack4 || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>

                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.pack5 || ""}
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

export default CatBrandStock;
