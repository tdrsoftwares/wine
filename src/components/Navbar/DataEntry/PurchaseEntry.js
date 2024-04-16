import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
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
import { getAllItems } from "../../../services/itemService";
import { useLoginContext } from "../../../utils/loginContext";
import { NotificationManager } from "react-notifications";
import { getAllSuppliers } from "../../../services/supplierService";
import { getAllStores } from "../../../services/storeService";
import { searchAllPurchases } from "../../../services/purchaseService";
import debounce from "lodash.debounce";
import CloseIcon from "@mui/icons-material/Close";

const PurchaseEntry = () => {
  const { loginResponse } = useLoginContext();
  const [allItems, setAllItems] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allStores, setAllStores] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [searchMode, setSearchMode] = useState(false);

  console.log("purchases: ", purchases);
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
    caseValue: "",
    pcs: "",
    brk: "",
    purchaseRate: "",
    btlRate: "",
    gro: "",
    sp: "",
    amount: "",
    action: false,
  });

  const itemNameRef = useRef(null);
  const mrpRef = useRef(null);
  const batchRef = useRef(null);
  const caseRef = useRef(null);
  const pcsRef = useRef(null);
  const brkRef = useRef(null);
  const purRateRef = useRef(null);
  const btlRateRef = useRef(null);
  const groRef = useRef(null);
  const spRef = useRef(null);
  const amountRef = useRef(null);

  const handleItemNameChange = (event) => {
    const itemName = event.target.value;
    console.log("itemName: ", itemName);
    debouncedSearch(itemName);
    setFormData({
      ...formData,
      itemName,
      itemCode: "",
      mrp: "",
      batch: "",
      caseValue: "",
      pcs: "",
      brk: "",
      purchaseRate: "",
      btlRate: "",
      gro: "",
      sp: "",
      amount: "",
    });
    setSearchMode(true);
    if (!itemName) setSearchMode(false);
  };

  // const calculateMRPValue = (rowData) => {
  //   const pcs = parseInt(rowData.pcs) || 0;
  //   const mrp = parseFloat(rowData.mrp) || 0;
  //   return (pcs * mrp).toFixed(2);
  // };

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
      itemCode: selectedRow.details[0]?.itemCode || 0,
      itemName: selectedRow.name || 0,
      mrp: selectedRow.details[0]?.mrp || 0,
      batch: selectedRow.batch || 0,
      caseValue: selectedRow.caseValue || 0,
      pcs: selectedRow.pcs || 0,
      brk: selectedRow.brk || 0,
      purchaseRate: selectedRow.details[0]?.purchaseRate || 0,
      btlRate: selectedRow.btlRate || 0,
      gro: selectedRow.gro || 0,
      sp: selectedRow.sp || 0,
      amount: selectedRow.amount || 0,
    });
  };

  const handleRemoveSearchTableRow = (index) => {
    const updatedResults = [...searchResults];
    updatedResults.splice(index, 1);
    setSearchResults(updatedResults);
  };

  const handleRemovePurchasesTableRow = (index) => {
    const updatedPurchases = [...purchases];
    updatedPurchases.splice(index, 1);
    setPurchases(updatedPurchases);
  };

  const handleEnterKey = (event, nextInputRef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextInputRef.current.focus();
    }
  };

  const handleSubmitIntoDataTable = () => {
    setPurchases([...purchases, formData]);
    setFormData({
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
      caseValue: "",
      pcs: "",
      brk: "",
      purchaseRate: "",
      btlRate: "",
      gro: "",
      sp: "",
      amount: "",
      action: false,
    });
    setSearchMode(false);
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
                className="input-field"
                fullWidth
                value={formData.itemCode}
                onChange={(e) =>
                  setFormData({ ...formData, itemCode: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, itemNameRef)}
              />
            </Grid>
            <Grid item xs={1.8}>
              <InputLabel className="input-label-2">Item Name</InputLabel>
              <TextField
                inputRef={itemNameRef}
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={formData.itemName}
                onChange={(e) => {
                  handleItemNameChange(e);
                }}
                onKeyDown={(e) => handleEnterKey(e, mrpRef)}
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">MRP</InputLabel>
              <TextField
                inputRef={mrpRef}
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={formData.mrp}
                onChange={(e) =>
                  setFormData({ ...formData, mrp: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, batchRef)}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Batch</InputLabel>
              <TextField
                inputRef={batchRef}
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={formData.batch}
                onChange={(e) =>
                  setFormData({ ...formData, batch: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, caseRef)}
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">Case</InputLabel>
              <TextField
                inputRef={caseRef}
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={formData.caseValue}
                onChange={(e) =>
                  setFormData({ ...formData, caseValue: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, pcsRef)}
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">Pcs</InputLabel>
              <TextField
                inputRef={pcsRef}
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={formData.pcs}
                onChange={(e) =>
                  setFormData({ ...formData, pcs: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, brkRef)}
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">Brk</InputLabel>
              <TextField
                inputRef={brkRef}
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={formData.brk}
                onChange={(e) =>
                  setFormData({ ...formData, brk: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, purRateRef)}
              />
            </Grid>
            <Grid item xs={0.9}>
              <InputLabel className="input-label-2">Pur. Rate</InputLabel>
              <TextField
                inputRef={purRateRef}
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={formData.purchaseRate}
                onChange={(e) =>
                  setFormData({ ...formData, purchaseRate: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, btlRateRef)}
              />
            </Grid>
            <Grid item xs={0.9}>
              <InputLabel className="input-label-2">Btl. Rate</InputLabel>
              <TextField
                inputRef={btlRateRef}
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={formData.btlRate}
                onChange={(e) =>
                  setFormData({ ...formData, btlRate: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, groRef)}
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">GRO</InputLabel>
              <TextField
                inputRef={groRef}
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={formData.gro}
                onChange={(e) =>
                  setFormData({ ...formData, gro: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, spRef)}
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">SP</InputLabel>
              <TextField
                inputRef={spRef}
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={formData.sp}
                onChange={(e) =>
                  setFormData({ ...formData, sp: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, amountRef)}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Amt(₹)</InputLabel>
              <TextField
                inputRef={amountRef}
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmitIntoDataTable();
                  } else {
                    handleEnterKey(e, amountRef);
                  }
                }}
              />
            </Grid>
          </Grid>

          {searchMode ? (
            <TableContainer
              component={Paper}
              sx={{
                marginTop: 1,
                height: 200,
                width: 800,
                overflowY: "scroll",
                overflowX: "auto",
                "&::-webkit-scrollbar": {
                  width: 10,
                  height: 10,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#fff",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#d5d8df",
                  borderRadius: 2,
                },
              }}
            >
              <Table>
                <TableHead className="table-head">
                  <TableRow>
                    <TableCell align="center">S. No.</TableCell>
                    <TableCell align="center">Item Code</TableCell>
                    <TableCell align="center">Item Name</TableCell>
                    <TableCell align="center">MRP</TableCell>
                    <TableCell align="center">Batch</TableCell>
                    <TableCell align="center">Case</TableCell>
                    <TableCell align="center">Pcs</TableCell>
                    <TableCell align="center">Brk</TableCell>
                    <TableCell align="center">Pur Rate</TableCell>
                    <TableCell align="center">Btl Rate</TableCell>
                    <TableCell align="center">GRO</TableCell>
                    <TableCell align="center">SP</TableCell>
                    <TableCell align="center">Amt(₹)</TableCell>
                    {/* <TableCell>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults
                    ? searchResults.map((row, index) => (
                        <TableRow
                          key={index}
                          onClick={() => {
                            handleRowClick(index);
                            setSearchMode(false);
                          }}
                          sx={{
                            cursor: "pointer",
                            backgroundColor:
                              formData.itemName === row.name
                                ? "#fff"
                                : "inherit",
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{ padding: "14px", paddingLeft: 2 }}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row?.details[0]?.itemCode || "No Data"}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row?.name || "No Data"}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row?.details[0]?.mrp || 0.0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.batch || 0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.caseValue || 0.0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.pcs || 0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.brk || 0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row?.details[0]?.purchaseRate || 0.0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.btlRate || 0.0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.gro || 0.0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.sp || 0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.amount || 0.0}
                          </TableCell>
                          {/* <TableCell>
                          <CloseIcon
                            sx={{ color: "red" }}
                            onClick={() => handleRemoveSearchTableRow(index)}
                          />
                        </TableCell> */}
                        </TableRow>
                      ))
                    : "No Data"}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                marginTop: 1,
                height: 200,
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: 10,
                  height: "auto",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#fff",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#d5d8df",
                  borderRadius: 2,
                },
              }}
            >
              <Table>
                <TableHead className="table-head">
                  <TableRow>
                    <TableCell align="center">S. No.</TableCell>
                    <TableCell align="center">Item Code</TableCell>
                    <TableCell align="center">Item Name</TableCell>
                    <TableCell align="center">MRP</TableCell>
                    <TableCell align="center">Batch</TableCell>
                    <TableCell align="center">Case</TableCell>
                    <TableCell align="center">Pcs</TableCell>
                    <TableCell align="center">Brk</TableCell>
                    <TableCell align="center">Pur Rate</TableCell>
                    <TableCell align="center">Btl Rate</TableCell>
                    <TableCell align="center">GRO</TableCell>
                    <TableCell align="center">SP</TableCell>
                    <TableCell align="center">Amt(₹)</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchases.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.itemCode}</TableCell>
                      <TableCell align="center">{row.itemName}</TableCell>
                      <TableCell align="center">{row.mrp}</TableCell>
                      <TableCell align="center">{row.batch}</TableCell>
                      <TableCell align="center">{row.caseValue}</TableCell>
                      <TableCell align="center">{row.pcs}</TableCell>
                      <TableCell align="center">{row.brk}</TableCell>
                      <TableCell align="center">{row.purchaseRate}</TableCell>
                      <TableCell align="center">{row.btlRate}</TableCell>
                      <TableCell align="center">{row.gro}</TableCell>
                      <TableCell align="center">{row.sp}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                      <TableCell align="center">
                        <CloseIcon
                          sx={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleRemovePurchasesTableRow(index)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
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
                className="input-field"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">S. Discount</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Govt. Rate Off</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
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
                className="input-field"
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
                className="input-field"
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
                className="input-field"
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
                className="input-field"
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
                className="input-field"
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
                className="input-field"
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
                className="input-field"
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
                className="input-field"
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
                className="input-field"
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
