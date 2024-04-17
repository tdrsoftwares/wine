import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";

const __StockRegister = () => {
  const [value, setValue] = useState([
    dayjs("2024-04-17"),
    dayjs("2024-04-21"),
  ]);
  const [itemCode, setItemCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [oldItemName, setOldItemName] = useState("");
  const [mrp, setMrp] = useState("");
  const [category, setCategory] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [batch, setBatch] = useState("");
  const [brandName, setBrandName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [packing, setPacking] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [newItem, setNewItem] = useState("");
  const [bottleRate, setBottleRate] = useState("");
  const [caseValue, setCaseValue] = useState("");
  const [closingStock, setClosingStock] = useState("");
  const [barcode, setBarcode] = useState("");
  const [stockAt, setStockAt] = useState("");
  const [lastYearStock, setLastYearStock] = useState("");
  const [stockOutPosition, setStockOutPosition] = useState("");
  const [netPurchaseRate, setNetPurchaseRate] = useState("");

  // Handle onChange for each field
  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  // Handle onClick for buttons
  const handleSave = () => {
    // Your save logic here
  };

  const handleClear = () => {
    // Clear all state values
    setItemCode("");
    setNewCode("");
    setItemName("");
    setItemDescription("");
    setOldItemName("");
    setMrp("");
    setCategory("");
    setNewItemName("");
    setBatch("");
    setBrandName("");
    setNewCategory("");
    setPacking("");
    setBatchNo("");
    setNewBrandName("");
    setPurchaseRate("");
    setNewItem("");
    setBottleRate("");
    setCaseValue("");
    setClosingStock("");
    setBarcode("");
    setStockAt("");
    setLastYearStock("");
    setStockOutPosition("");
    setNetPurchaseRate("");
  };

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Items Information
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Item Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              name="itemCode"
              label="Item Code"
              variant="outlined"
              fullWidth
              className="input-field"
              value={itemCode}
              onChange={(e) => handleChange(e, setItemCode)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="newCode">New Code</InputLabel>
              <Select
                labelId="newCode"
                id="demo-simple-select"
                value={newCode}
                label="New Code"
                onChange={(e) => handleChange(e, setNewCode)}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="itemName">Item Name</InputLabel>
              <Select
                labelId="itemName"
                id="demo-simple-select"
                value={itemName}
                label="Item Name"
                onChange={(e) => handleChange(e, setItemName)}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="itemDescription"
              label="Item Description"
              variant="outlined"
              fullWidth
              className="input-field"
              value={itemDescription}
              onChange={(e) => handleChange(e, setItemDescription)}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="oldItemName">Old Item Name</InputLabel>
              <Select
                labelId="oldItemName"
                id="demo-simple-select"
                value={oldItemName}
                label="Old Item Name"
                onChange={(e) => handleChange(e, oldItemName)}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="mrp"
              label="MRP (₹)"
              variant="outlined"
              fullWidth
              className="input-field"
              value={mrp}
              onChange={(e) => handleChange(e, setMrp)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="Category">Category</InputLabel>
              <Select
                labelId="Category"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(e) => handleChange(e, setCategory)}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="newItemName"
              label="New Item Name"
              variant="outlined"
              fullWidth
              className="input-field"
              value={newItemName}
              onChange={(e) => handleChange(e, newItemName)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="Batch">Batch</InputLabel>
              <Select
                labelId="Batch"
                id="demo-simple-select"
                value={batch}
                label="Batch"
                onChange={(e) => handleChange(e, setBatch)}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="BrandName">Brand Name</InputLabel>
              <Select
                labelId="BrandName"
                id="demo-simple-select"
                value={brandName}
                label="Brand Name"
                onChange={(e) => handleChange(e, setBrandName)}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ display: "flex", justifyContent: "center" }} xs={4}>
            <Button fullWidth variant="outlined" onClick={() => {}}>
              Change All
            </Button>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="NewCategory">New Category</InputLabel>
              <Select
                labelId="NewCategory"
                id="demo-simple-select"
                value={newCategory}
                label="New Category"
                onChange={(e) => handleChange(e, setNewCategory)}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="Packing"
              label="Packing"
              variant="outlined"
              fullWidth
              className="input-field"
              value={packing}
              onChange={(e) => handleChange(e, setPacking)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="itemCode">Item Code</InputLabel>
              <Select
                labelId="itemCode"
                id="demo-simple-select"
                value={itemCode}
                label="Item Code"
                onChange={(e) => handleChange(e, setItemCode)}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sx={{ display: "flex", justifyContent: "center" }} xs={4}>
            <Button fullWidth variant="outlined" onClick={() => {}}>
              Change All
            </Button>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="BatchNo">Batch No.</InputLabel>
              <Select
                labelId="BatchNo"
                id="demo-simple-select"
                value={batchNo}
                type="number"
                label="Batch No."
                onChange={(e) => handleChange(e, setBatchNo)}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="itemName"
              label="Item Name"
              variant="outlined"
              fullWidth
              className="input-field"
              value={itemName}
              onChange={(e) => handleChange(e, setItemName)}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="NewBrand">New Brand</InputLabel>
              <Select
                labelId="NewBrand"
                id="demo-simple-select"
                value={""}
                label="New Brand"
                onChange={() => {}}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="mrp"
              label="MRP (₹)"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={""}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="oldBrandName">Old Brand Name</InputLabel>
              <Select
                labelId="oldBrandName"
                id="demo-simple-select"
                value={""}
                label="Old Brand Name"
                onChange={() => {}}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sx={{ display: "flex", justifyContent: "center" }} xs={4}>
            <Button fullWidth variant="outlined" onClick={() => {}}>
              Change All
            </Button>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="purchaseRate"
              label="Purchase Rate"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={purchaseRate}
              onChange={(e) => handleChange(e, setPurchaseRate)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="newBrandName"
              label="New Brand Name"
              variant="outlined"
              fullWidth
              className="input-field"
              value={""}
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="newItem">New Item</InputLabel>
              <Select
                labelId="newItem"
                id="demo-simple-select"
                value={""}
                label="New Item"
                onChange={() => {}}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="bottleRate"
              label="Bottle Rate (₹)"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={bottleRate}
              onChange={(e) => handleChange(e, setBottleRate)}
            />
          </Grid>

          <Grid item sx={{ display: "flex", justifyContent: "center" }} xs={4}>
            <Button fullWidth variant="outlined" onClick={() => {}}>
              Change All
            </Button>
          </Grid>

          <Grid item sx={{ display: "flex", justifyContent: "center" }} xs={4}>
            <Button fullWidth variant="outlined" onClick={() => {}}>
              Change All
            </Button>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="caseValue"
              label="Case Value"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={caseValue}
              onChange={(e) => handleChange(e, setCaseValue)}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="oldItemName">Old Item Name</InputLabel>
              <Select
                labelId="oldItemName"
                id="demo-simple-select"
                value={""}
                label="Old Item Name"
                onChange={() => {}}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="itemName">Item Name</InputLabel>
              <Select
                labelId="itemName"
                id="demo-simple-select"
                value={""}
                label="Item Name"
                onChange={() => {}}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="closingStock"
              label="Closing Stock(current)"
              variant="outlined"
              fullWidth
              className="input-field"
              value={closingStock}
              onChange={(e) => handleChange(e, setClosingStock)}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="oldBrandName">Old Brand Name</InputLabel>
              <Select
                labelId="oldBrandName"
                id="demo-simple-select"
                value={""}
                label="Old Brand Name"
                onChange={() => {}}
              >
                <MenuItem value={10}>1</MenuItem>
                <MenuItem value={20}>2</MenuItem>
                <MenuItem value={30}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="barcode"
              label="Barcode"
              variant="outlined"
              fullWidth
              className="input-field"
              value={barcode}
              onChange={(e) => handleChange(e, setBarcode)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="stockAt"
              label="Stock at"
              variant="outlined"
              fullWidth
              className="input-field"
              value={stockAt}
              onChange={(e) => handleChange(e, setStockAt)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="newItemName"
              label="New Item Name"
              variant="outlined"
              fullWidth
              className="input-field"
              value={""}
              onChange={() => {}}
            />
          </Grid>

          <Grid item sx={{ display: "flex", justifyContent: "center" }} xs={4}>
            <Button fullWidth variant="outlined" onClick={() => {}}>
              Change All
            </Button>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="lastYearStock"
              label="Last Year Stock"
              variant="outlined"
              fullWidth
              className="input-field"
              value={lastYearStock}
              onChange={(e) => handleChange(e, setLastYearStock)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="stockOutPosition"
              label="Stock Out Position"
              variant="outlined"
              fullWidth
              className="input-field"
              value={stockOutPosition}
              onChange={(e) => handleChange(e, setStockOutPosition)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="netPurchaseRate"
              label="Net Purchase Rate"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={netPurchaseRate}
              onChange={(e) => handleChange(e, setNetPurchaseRate)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
          "& button": { m: 1, marginRight: 4 },
        }}
      >
        <Button
          color="primary"
          size="large"
          variant="outlined"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          color="error"
          size="large"
          variant="outlined"
          onClick={handleClear}
        >
          Clear
        </Button>
      </Box>
    </form>
  );
};

export default __StockRegister;
