import React, { useEffect, useState } from "react";
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
  Popover,
  Input,
  Select,
} from "@mui/material";
import dayjs from "dayjs";
import { getAllItems } from "../../../services/itemService";
import { useLoginContext } from "../../../utils/loginContext";
import { NotificationManager } from "react-notifications";
import { getAllSuppliers } from "../../../services/supplierService";
import { getAllStores } from "../../../services/storeService";
import { searchAllPurchases } from "../../../services/purchaseService";
import debounce from "lodash.debounce";
import { CheckBox } from "@mui/icons-material";

const PurchaseEntry = () => {
  const { loginResponse } = useLoginContext();
  const todaysDate = dayjs();
  const [allItems, setAllItems] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allStores, setAllStores] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    supplierName: "",
    passNo: "",
    passDate: "mm/dd/yyyy",
    address: "",
    billNo: "",
    billDate: "mm/dd/yyyy",
    stockIn: "",
    entryNo: "",
    itemCode: "",
    itemName: "",
    mrp: "",
    batch: "",
    case: "",
    pcs: "",
    brk: "",
    purRate: "",
    btlRate: "",
    gro: "",
    sp: "",
    amount: "",
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const label = { inputProps: { "aria-label": "select" } };

  const handleItemNameChange = (event) => {
    const itemName = event.target.value;
    console.log("itemName: ", itemName);
    debouncedSearch(itemName);
    setFormData({ ...formData, itemName });
    setAnchorEl(event.currentTarget);
  };

  const handleItemCodeChange = (event, index, field) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const calculateMRPValue = (rowData) => {
    const pcs = parseInt(rowData.pcs) || 0;
    const mrp = parseFloat(rowData.mrp) || 0;
    return (pcs * mrp).toFixed(2);
  };

  const fetchAllItems = async () => {
    try {
      const allItemsResponse = await getAllItems(loginResponse);
      console.log("allItemsResponse ---> ", allItemsResponse);
      setAllItems(allItemsResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching items. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllSuppliers = async () => {
    try {
      const allItemsResponse = await getAllSuppliers(loginResponse);
      console.log("allItemsResponse: ", allItemsResponse);
      setAllSuppliers(allItemsResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching suppliers. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllStores = async () => {
    try {
      const allStoresResponse = await getAllStores(loginResponse);
      console.log("allStoresResponse ---> ", allStoresResponse);
      setAllStores(allStoresResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching stores. Please try again later.",
        "Error"
      );
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    fetchAllItems();
    fetchAllSuppliers();
    fetchAllStores();
  }, []);

  const debouncedSearch = debounce(async (itemName) => {
    try {
      const response = await searchAllPurchases(loginResponse, itemName);
      console.log("debouncedSearch response: ", response);
      if (response?.data?.data) {
        setSearchResults(response?.data?.data);
        console.log("ami serc res ", searchResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching items:", error);
      setSearchResults([]);
    }
  }, 1000);

  const handleRowClick = (index) => {
    const selectedRow = searchResults[index];
    setFormData({
      ...formData,
      itemCode: selectedRow.details[0]?.itemCode || "",
      itemName: selectedRow.name || "",
      mrp: selectedRow.details[0]?.mrp || "",
      batch: selectedRow.batch || "",
      case: selectedRow.caseValue || "",
      pcs: selectedRow.pcs || "",
      brk: selectedRow.brk || "",
      purRate: selectedRow.purRate || "",
      btlRate: selectedRow.btlRate || "",
      gro: selectedRow.gro || "",
      sp: selectedRow.sp || "",
      amount: selectedRow.amount || "",
    });
  };
  

  return (
    <form>
      <Box component="form" sx={{ p: 2, width: "900px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="supplierName"
                className="input-label supplier-adjustment"
              >
                Supplier Name :
              </InputLabel>
              <TextField
                select
                fullWidth
                id="supplierName"
                variant="outlined"
                size="small"
                type="text"
                className="input-field"
                value={formData.supplierName}
                onChange={(e) =>
                  setFormData({ ...formData, supplierName: e.target.value })
                }
              >
                {allSuppliers?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="passNo" className="input-label">
                Pass No :
              </InputLabel>
              <TextField
                id="passNo"
                size="small"
                type="number"
                className="input-field"
                value={formData.passNo}
                onChange={(e) =>
                  setFormData({ ...formData, passNo: e.target.value })
                }
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="passDate" className="input-label">
                Pass Date :
              </InputLabel>
              <TextField
                id="passDate"
                size="small"
                type="date"
                className="input-field"
                value={formData.passDate}
                onChange={(e) =>
                  setFormData({ ...formData, passDate: e.target.value })
                }
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="stockIn"
                className="input-label store-adjustment"
              >
                Store Name :
              </InputLabel>
              <TextField
                select
                id="stockIn"
                size="small"
                className="input-field"
                value={formData.stockIn}
                onChange={(e) =>
                  setFormData({ ...formData, stockIn: e.target.value })
                }
              >
                {allStores?.map((store) => (
                  <MenuItem key={store._id} value={store._id}>
                    {store.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="entryNo"
                className="input-label entryno-adjustment"
              >
                Entry No :
              </InputLabel>
              <TextField
                id="entryNo"
                size="small"
                type="number"
                className="input-field"
                value={formData.entryNo}
                onChange={(e) =>
                  setFormData({ ...formData, entryNo: e.target.value })
                }
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="billNo" className="input-label">
                Bill No :
              </InputLabel>
              <TextField
                id="billNo"
                size="small"
                type="number"
                className="input-field"
                value={formData.billNo}
                onChange={(e) =>
                  setFormData({ ...formData, billNo: e.target.value })
                }
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="billDate" className="input-label">
                Bill Date :
              </InputLabel>
              <TextField
                id="billDate"
                size="small"
                type="date"
                className="input-field"
                value={formData.billDate}
                onChange={(e) =>
                  setFormData({ ...formData, billDate: e.target.value })
                }
              />
            </div>
          </Grid>
        </Grid>

        <Box
          sx={{ p: 2, boxShadow: 2, borderRadius: 1, marginTop: 4 }}
          className="table-header"
        >
          <Grid container spacing={1}>
            <Grid item xs={1.5}>
              <InputLabel className="input-label-2">Item Code</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.itemCode || 0}
                onChange={(e) =>
                  setFormData({ ...formData, itemCode: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={1.8}>
              <InputLabel className="input-label-2">Item Name</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.itemName}
                onChange={handleItemNameChange}
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">MRP</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.mrp}
                onChange={(e) =>
                  setFormData({ ...formData, mrp: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Batch</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.batch}
                onChange={(e) =>
                  setFormData({ ...formData, batch: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">Case</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.case}
                onChange={(e) =>
                  setFormData({ ...formData, case: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">Pcs.</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.pcs}
                onChange={(e) =>
                  setFormData({ ...formData, pcs: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">Brk.</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.brk}
                onChange={(e) =>
                  setFormData({ ...formData, brk: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={0.9}>
              <InputLabel className="input-label-2">Pur. Rate</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.purRate}
                onChange={(e) =>
                  setFormData({ ...formData, purRate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={0.9}>
              <InputLabel className="input-label-2">Btl. Rate</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.btlRate}
                onChange={(e) =>
                  setFormData({ ...formData, btlRate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">GRO</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.gro}
                onChange={(e) =>
                  setFormData({ ...formData, gro: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">SP</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.sp}
                onChange={(e) =>
                  setFormData({ ...formData, sp: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Amt(₹)</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <TableContainer
            component={Paper}
            sx={{ marginTop: 1, maxHeight: 300, overflowY: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S. No.</TableCell>
                  <TableCell>Item Code</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>MRP</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>Case</TableCell>
                  <TableCell>Pcs</TableCell>
                  <TableCell>Brk</TableCell>
                  <TableCell>Pur Rate</TableCell>
                  <TableCell>Btl Rate</TableCell>
                  <TableCell>GRO</TableCell>
                  <TableCell>SP</TableCell>
                  <TableCell>Amt(₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults
                  ? searchResults.map((row, index) => (
                      <TableRow
                        key={index}
                        onClick={() => handleRowClick(index)}
                        sx={{
                          cursor: "pointer",
                          backgroundColor:
                            formData.itemName === row.name ? "#fff" : "inherit",
                        }}
                      >
                        <TableCell sx={{ padding: "14px", paddingLeft: 3 }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row?.details[0].itemCode || 0}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row?.name || "No Data"}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row?.details[0].mrp || 0.0}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row.batch || 0}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row.caseValue || 0.0}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row.pcs || 0}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row.brk || 0}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row.purRate || 0.0}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row.btlRate || 0.0}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row.gro || 0.0}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row.sp || 0}
                        </TableCell>
                        <TableCell sx={{ padding: "14px" }}>
                          {row.amount || 0.0}
                        </TableCell>
                      </TableRow>
                    ))
                  : "No Data"}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box
          component="form"
          sx={{
            width: "100%",
            p: 2,
            marginTop: 3,
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">MRP Value</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">S. Discount</InputLabel>
              <TextField
                // label="Special Discount"
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Govt. Rate Off</InputLabel>
              <TextField
                // label="Govt. Rate Off"
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">
                Special Purposes
              </InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Service Tax</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Tcs(%)</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Tcs Amt.</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Gross Amt.</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Discount</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Tax</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Adjustment</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Net Amount</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            color="success"
            size="small"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            PREV PAGE
          </Button>
          <Button
            color="secondary"
            size="small"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            NEXT PAGE
          </Button>

          <Button
            color="primary"
            size="large"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            EDIT
          </Button>
          <Button
            color="error"
            size="large"
            variant="contained"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            DELETE
          </Button>
          <Button
            color="warning"
            size="large"
            variant="contained"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            OPEN
          </Button>
          <Button
            color="success"
            size="small"
            variant="contained"
            onClick={() => {}}
            sx={{ marginTop: 3 }}
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default PurchaseEntry;
