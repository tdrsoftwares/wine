import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Input,
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
import { getAllCustomer } from "../../../services/customerService";
import { useLoginContext } from "../../../utils/loginContext";
import { NotificationManager } from "react-notifications";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import debounce from "lodash.debounce";
import {
  searchAllSalesByItemCode,
  searchAllSalesByItemName,
} from "../../../services/saleBillService";

const SaleBill = () => {
  const { loginResponse } = useLoginContext();
  const [allCustomerData, setAllCustomerData] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [salesData, setSalesData] = useState([]);

  console.log("salesData: ", salesData);
  const [searchMode, setSearchMode] = useState(false);
  const [formData, setFormData] = useState({
    barCode: "",
    billType: "Cash Bill",
    customerName: "",
    balance: "",
    phoneNo: "",
    type: "",
    address: "",
    newcode: "",
    series: "",
    billno: "",
    billDate: "mm/dd/yyyy",
    itemId: "",
    itemCode: "",
    itemName: "",
    mrp: "",
    batch: "",
    pcs: "",
    rate: "",
    discount: "",
    amount: "",
    brk: "",
    split: "",
    volume: "",
  });

  const [editableIndex, setEditableIndex] = useState(-1);
  const [editedRow, setEditedRow] = useState({});
  const [totalValues, setTotalValues] = useState({
    totalVolume: "",
    totalPcs: "",
    splDiscount: "",
    splDiscAmount: "",

    grossAmt: "",
    discountAmt: "",
    taxAmt: "",
    totalMrp: "",
    adjustment: "",
    netAmt: "",

    receiptAmt: "",
    receiptMode1: "",
    receiptMode2: "",
  });

  console.log("totalValues: ", totalValues);

  const itemCodeRef = useRef(null);
  const itemNameRef = useRef(null);
  const mrpRef = useRef(null);
  const batchRef = useRef(null);
  const pcsRef = useRef(null);
  const brkRef = useRef(null);
  const rateRef = useRef(null);
  const discountRef = useRef(null);
  const splitRef = useRef(null);
  const amountRef = useRef(null);

  const fetchAllCustomers = async () => {
    try {
      const allCustomerResponse = await getAllCustomer(loginResponse);
      console.log("allCustomerResponse ---> ", allCustomerResponse);
      setAllCustomerData(allCustomerResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      console.error("Error fetching brands:", error);
    }
  };

  const isValidNumber = (value) => {
    return !isNaN(value) && parseFloat(value) >= 0;
  };

  const resetTopFormData = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      customerName: "",
      address: "",
      phoneNo: "",
      type: "",
    }));
  };

  const resetMiddleFormData = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      itemId: "",
      itemCode: "",
      itemName: "",
      mrp: "",
      batch: "",
      pcs: "",
      rate: "",
      brk: "",
      split: "",
      discount: "",
      amount: "",
    }));
  };

  const resetTotalValues = () => {
    setTotalValues((prevData) => ({
      ...prevData,
      totalVolume: "",
      totalPcs: "",
      splDiscount: "",
      splDiscAmount: "",
      grossAmt: "",
      discountAmt: "",
      taxAmt: "",
      totalMrp: "",
      adjustment: "",
      netAmt: "",
      receiptAmt: "",
      receiptMode1: "",
      receiptMode2: "",
    }));
  };

  const itemNameSearch = debounce(async (itemName) => {
    try {
      const response = await searchAllSalesByItemName(loginResponse, itemName);
      console.log("itemNameSearch response: ", response);

      if (response?.data?.data) {
        setSearchResults(response?.data?.data);
        console.log("ami serc res ", searchResults);
      } else if (response.response.data.message === "No matching items found") {
        NotificationManager.error("No matching items found");
        setSearchResults([]);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching items:", error);
      setSearchResults([]);
    }
  }, 500);

  const itemCodeSearch = debounce(async (itemCode) => {
    try {
      const response = await searchAllSalesByItemCode(loginResponse, itemCode);
      console.log("itemCodeSearch response: ", response);

      if (response?.data?.data) {
        setSearchResults(response?.data?.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching items:", error);
      setSearchResults([]);
    }
  }, 1000);

  useEffect(() => {
    if (formData.customerName) {
      const selectedCustomer = allCustomerData.find(
        (customer) => customer.name === formData.customerName
      );
      if (selectedCustomer) {
        setFormData({
          ...formData,
          address: selectedCustomer.address,
          phoneNo: selectedCustomer.contactNo,
          type: selectedCustomer.type,
        });
      }
    } else {
      setFormData({
        ...formData,
        address: "",
        phoneNo: "",
        type: "",
      });
    }
  }, [formData.customerName, allCustomerData]);

  useEffect(() => {
    fetchAllCustomers();
  }, [loginResponse]);

  useEffect(() => {
    resetTopFormData();
  }, [formData.billType]);

  useEffect(() => {
    const calculatedTotalPcs = salesData.reduce((total, item) => {
      return total + parseInt(item.pcs || 1);
    }, 0);

    console.log("calculatedTotalPcs: ", calculatedTotalPcs);

    const calculatedTotalVolume = salesData.reduce((total, item) => {
      return total + parseInt(item.pcs || 1) * parseInt(item.volume || 0);
    }, 0);

    console.log("calculatedTotalVolume: ", calculatedTotalVolume);

    const calculatedGrossAmt = salesData.reduce((total, item) => {
      return total + parseInt(item.amount || 0) * parseInt(item.pcs || 1);
    }, 0);

    console.log("calculatedGrossAmt: ", calculatedGrossAmt);

    setTotalValues({
      ...totalValues,
      totalPcs: calculatedTotalPcs,
      totalVolume: calculatedTotalVolume,
      grossAmt: calculatedGrossAmt,
    });
  }, [salesData]);

  useEffect(() => {
    const totalAmount = salesData.reduce((total, item) => {
      return total + (parseInt(item.amount) || 0);
    }, 0);

    const specialDiscount = totalValues.splDiscount || 0;
    const specialDiscountAmount = (totalAmount * specialDiscount) / 100;

    const grossAmount = totalAmount - specialDiscountAmount;

    setTotalValues({
      ...totalValues,
      splDiscAmount: specialDiscountAmount,
      grossAmt: grossAmount,
    });
  }, [salesData, totalValues.splDiscount]);

  const handleItemNameChange = (event) => {
    const itemName = event.target.value;
    console.log("itemName: ", itemName);
    itemNameSearch(itemName);
    setFormData({
      ...formData,
      itemName,
    });
    setSearchMode(true);
    if (!itemName) {
      setSearchMode(false);
      resetMiddleFormData();
    }

    setEditedRow({});
    setEditableIndex(-1);
    // console.log("handleItemNameChange formData: ", formData);
  };

  const handleEnterKey = (event, nextInputRef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextInputRef.current.focus();

      switch (nextInputRef.current) {
        case itemCodeRef:
          handleItemCodeChange(event);
        case itemNameRef:
          handleItemNameChange(event);
          break;
        case mrpRef:
        case batchRef:
        case pcsRef:
        case rateRef:
        case discountRef:
        case amountRef:
        case brkRef:
        case splitRef:
          handleSubmitIntoDataTable(event);
          break;
        default:
          break;
      }
    }
  };

  const handleEdit = (index, field, value) => {
    if (!isValidNumber(value)) {
      return;
    }
    const editedRowCopy = { ...editedRow };
    editedRowCopy[field] = value;

    if (field === "pcs" || field === "rate") {
      const pcs = field === "pcs" ? value : editedRowCopy["pcs"];
      const rate = field === "rate" ? value : editedRowCopy["rate"];
      const amount = pcs * rate;
      editedRowCopy["amount"] = amount;
    }

    if (field === "discount") {
      const amount = editedRowCopy["amount"] || 0;
      let discount = value;
      if (parseFloat(discount) > parseFloat(amount)) {
        discount = amount;
      }
      editedRowCopy["discount"] = discount;
    }
    setEditedRow(editedRowCopy);
  };

  const handleRowClick = (index) => {
    const selectedRow = searchResults[index];

    console.log("handleRowClick selectedRow: ", selectedRow);
    setFormData({
      ...formData,
      itemId: selectedRow._id,
      itemCode: selectedRow.itemCode || 0,
      itemName: selectedRow.item[0].name || 0,
      mrp: selectedRow.mrp || 0,
      batch: selectedRow.batchNo || 0,
      volume: selectedRow.item[0].volume || 0,
    });
  };
  console.log("formData after row click: ", formData);

  const handleEditClick = (index) => {
    setEditableIndex(index);
  };

  const handleSaveClick = (index) => {
    const updatedSales = [...salesData];
    const updatedRow = { ...updatedSales[index] };

    for (const key in editedRow) {
      if (editedRow.hasOwnProperty(key)) {
        updatedRow[key] = editedRow[key];
      }
    }

    updatedSales[index] = updatedRow;
    setSalesData(updatedSales);

    setEditedRow({});
    setEditableIndex(-1);
  };

  const handleRemoveClick = (index) => {
    const updatedSales = [...salesData];
    updatedSales.splice(index, 1);
    setSalesData(updatedSales);
    resetTotalValues();
  };

  const handleSubmitIntoDataTable = (e) => {
    console.log("handleSubmitIntoDataTable formData: ", formData);
    e.preventDefault();

    if (!formData.itemCode) {
      NotificationManager.warning(`Please fill the Item Code`);
      handleEnterKey(e, itemCodeRef);
      return;
    }
    if (!formData.itemName) {
      NotificationManager.warning(`Please fill the Item Name`);
      handleEnterKey(e, itemNameRef);
      return;
    }
    if (!formData.mrp) {
      NotificationManager.warning(`Please fill the MRP`);
      handleEnterKey(e, mrpRef);
      return;
    }
    if (!formData.pcs) {
      NotificationManager.warning(`Please fill the Pcs`);
      handleEnterKey(e, pcsRef);
      return;
    }
    if (!formData.rate) {
      NotificationManager.warning(`Please fill the Rate`);
      handleEnterKey(e, rateRef);
      return;
    }
    if (!formData.discount) {
      NotificationManager.warning(`Please fill the Discount`);
      handleEnterKey(e, discountRef);
      return;
    }
    if (!formData.amount) {
      NotificationManager.warning(`Please fill the Amount`);
      handleEnterKey(e, amountRef);
      return;
    }
    if (!formData.brk) {
      NotificationManager.warning(`Please fill the Brk Field`);
      handleEnterKey(e, brkRef);
      return;
    }
    if (!formData.split) {
      NotificationManager.warning(`Please fill the Split`);
      handleEnterKey(e, splitRef);
      return;
    }

    setTotalValues({ ...totalValues, totalVolume: formData.volume });

    setSalesData([...salesData, formData]);
    resetMiddleFormData();
    handleEnterKey(e, itemCodeRef);
    setSearchMode(false);
  };

  const handleItemCodeChange = (e) => {
    const itemCode = e.target.value;
    setFormData({ ...formData, itemCode: itemCode });
    itemCodeSearch(itemCode);
    setSearchMode(true);
    if (!itemCode) {
      setSearchMode(false);
      resetMiddleFormData();
    }

    setEditedRow({});
    setEditableIndex(-1);
  };

  const handleCustomerNameChange = (e) => {
    setFormData({ ...formData, customerName: e.target.value });
  };

  console.log("formData: ", formData);

  const handleBarCodeChange = (e) => {
    setFormData({ ...formData, barCode: e.target.value });
  };

  const handlePcsChange = (e) => {
    const pcs = parseFloat(e.target.value) || 1;
    const rate = parseFloat(formData.rate) || 1;
    const amount = pcs * rate;
    setFormData({ ...formData, pcs, amount });
  };

  const handleRateChange = (e) => {
    const rate = parseFloat(e.target.value) || 1;
    const pcs = parseFloat(formData.pcs) || 1;
    const amount = pcs * rate;
    setFormData({ ...formData, rate, amount });
  };

  const handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value) || 0;
    const pcs = parseFloat(formData.pcs) || 1;
    let rate;
    if (amount && pcs) {
      rate = amount / pcs;
    } else {
      rate = 0;
    }
    setFormData({ ...formData, amount, rate });
  };

  const handleDiscountChange = (e) => {
    setFormData({ ...formData, discount: e.target.value });
  };

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InputLabel for="billType">Select Bill Type:</InputLabel>
          <RadioGroup
            row
            aria-label="billType"
            name="billType"
            sx={{ gap: 3 }}
            value={formData.billType}
            onChange={(e) =>
              setFormData({
                ...formData,
                billType: e.target.value,
              })
            }
          >
            <FormControlLabel
              value="Cash Bill"
              control={<Radio />}
              label="Cash Bill"
            />
            <FormControlLabel
              value="Credit Bill"
              control={<Radio />}
              label="Credit Bill"
            />
          </RadioGroup>
        </Grid>

        <Grid item xs={4}>
          {formData.billType === "Credit Bill" && (
            <div className="input-wrapper">
              <InputLabel htmlFor="type" className="input-label">
                Customer Type :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="type"
                className="input-field"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                {["cash", "online"].map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          )}
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="barCode" className="input-label">
              Enter Barcode :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="barCode"
              className="input-field"
              value={formData.barCode}
              onChange={handleBarCodeChange}
            />
          </div>
        </Grid>

        {formData.billType === "Credit Bill" && (
          <>
            <Grid item xs={4}>
              <div className="input-wrapper">
                <InputLabel htmlFor="customerName" className="input-label">
                  Customer Name :
                </InputLabel>
                <TextField
                  select
                  fullWidth
                  size="small"
                  type="text"
                  name="customerName"
                  className="input-field"
                  value={formData.customerName}
                  onChange={handleCustomerNameChange}
                >
                  {allCustomerData.map((item) => (
                    <MenuItem key={item._id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div className="input-wrapper">
                <InputLabel htmlFor="address" className="input-label">
                  Address :
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  name="address"
                  className="input-field"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
            </Grid>

            <Grid item xs={4}>
              <div className="input-wrapper">
                <InputLabel htmlFor="phoneNo" className="input-label">
                  Phone Number :
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="phoneNo"
                  className="input-field"
                  value={formData.phoneNo}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNo: e.target.value })
                  }
                />
              </div>
            </Grid>
          </>
        )}

        {formData.billType === "Cash Bill" && (
          <>
            <Grid item xs={4}>
              <div className="input-wrapper">
                <InputLabel htmlFor="series" className="input-label">
                  Series :
                </InputLabel>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="series"
                  className="input-field"
                  value={formData.series}
                  onChange={(e) =>
                    setFormData({ ...formData, series: e.target.value })
                  }
                >
                  {["A", "C"].map((item, id) => (
                    <MenuItem key={id} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div className="input-wrapper">
                <InputLabel htmlFor="billno" className="input-label">
                  Bill No. :
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="billno"
                  className="input-field"
                  value={formData.billno}
                  onChange={(e) =>
                    setFormData({ ...formData, billno: e.target.value })
                  }
                />
              </div>
            </Grid>

            <Grid item xs={4}>
              <div className="input-wrapper">
                <InputLabel htmlFor="billDate" className="input-label">
                  Bill Date :
                </InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  name="billDate"
                  className="input-field"
                  value={formData.billDate}
                  onChange={(e) =>
                    setFormData({ ...formData, billDate: e.target.value })
                  }
                />
              </div>
            </Grid>
          </>
        )}
      </Grid>

      <Box
        sx={{ p: 2, boxShadow: 2, borderRadius: 1, marginTop: 4 }}
        className="table-header"
      >
        <Grid container spacing={1}>
          <Grid item xs={1.7}>
            <InputLabel className="input-label-2">Item Code</InputLabel>
            <TextField
              inputRef={itemCodeRef}
              variant="outlined"
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={formData.itemCode}
              onChange={handleItemCodeChange}
              onKeyDown={(e) => handleEnterKey(e, itemNameRef)}
            />
          </Grid>
          <Grid item xs={2.2}>
            <InputLabel className="input-label-2">Item Name</InputLabel>
            <TextField
              inputRef={itemNameRef}
              variant="outlined"
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={formData.itemName}
              onChange={handleItemNameChange}
              onKeyDown={(e) => handleEnterKey(e, mrpRef)}
            />
          </Grid>
          <Grid item xs={1}>
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
              onKeyDown={(e) => handleEnterKey(e, pcsRef)}
            />
          </Grid>

          <Grid item xs={1}>
            <InputLabel className="input-label-2">Pcs</InputLabel>
            <TextField
              inputRef={pcsRef}
              variant="outlined"
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={formData.pcs}
              onChange={handlePcsChange}
              onKeyDown={(e) => handleEnterKey(e, rateRef)}
            />
          </Grid>

          <Grid item xs={0.9}>
            <InputLabel className="input-label-2">Rate</InputLabel>
            <TextField
              inputRef={rateRef}
              variant="outlined"
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={formData.rate}
              onChange={handleRateChange}
              onKeyDown={(e) => handleEnterKey(e, discountRef)}
            />
          </Grid>

          <Grid item xs={1}>
            <InputLabel className="input-label-2">Discount</InputLabel>
            <TextField
              inputRef={discountRef}
              variant="outlined"
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={formData.discount}
              onChange={handleDiscountChange}
              onKeyDown={(e) => handleEnterKey(e, amountRef)}
            />
          </Grid>
          <Grid item xs={1.2}>
            <InputLabel className="input-label-2">Amt (₹)</InputLabel>
            <TextField
              inputRef={amountRef}
              variant="outlined"
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={formData.amount}
              aria-readonly
              onChange={handleAmountChange}
              onKeyDown={(e) => handleEnterKey(e, brkRef)}
            />
          </Grid>

          <Grid item xs={1}>
            <InputLabel className="input-label-2">Brk.</InputLabel>
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
              onKeyDown={(e) => handleEnterKey(e, splitRef)}
            />
          </Grid>

          <Grid item xs={1}>
            <InputLabel className="input-label-2">Split</InputLabel>
            <TextField
              inputRef={splitRef}
              variant="outlined"
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={formData.split}
              onChange={(e) =>
                setFormData({ ...formData, split: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmitIntoDataTable(e);
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
              height: 300,
              width: 850,
              overflowY: "unset",
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
                  <TableCell align="center">Closing Stock</TableCell>
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
                          formData.itemName === row.name ? "inherit" : "#fff",
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{ padding: "14px", paddingLeft: 2 }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row?.itemCode || "No Data"}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row?.item[0]?.name || "No Data"}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row?.mrp || 0}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row.batch || 0}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row.currentStock || 0}
                      </TableCell>
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
              height: 300,
              width: "100%",
              overflowY: "auto",
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
                  <TableCell>S. No.</TableCell>
                  <TableCell>Item Code</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>MRP</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>Pcs</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Amt (₹)</TableCell>
                  <TableCell>Brk</TableCell>
                  <TableCell>Split</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="purchase-data-table">
                {salesData?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          type="text"
                          value={editedRow.itemCode || row.itemCode}
                          onChange={(e) =>
                            handleEdit(index, "itemCode", e.target.value)
                          }
                        />
                      ) : (
                        row.itemCode
                      )}
                    </TableCell>
                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          type="text"
                          value={editedRow.itemName || row.itemName}
                          onChange={(e) =>
                            handleEdit(index, "itemName", e.target.value)
                          }
                        />
                      ) : (
                        row.itemName
                      )}
                    </TableCell>
                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.mrp || row.mrp}
                          onChange={(e) =>
                            handleEdit(index, "mrp", e.target.value)
                          }
                        />
                      ) : (
                        row.mrp
                      )}
                    </TableCell>

                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          type="text"
                          value={editedRow.batch || row.batch}
                          onChange={(e) =>
                            handleEdit(index, "batch", e.target.value)
                          }
                        />
                      ) : (
                        row.batch
                      )}
                    </TableCell>

                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.pcs || row.pcs}
                          onChange={(e) =>
                            handleEdit(index, "pcs", e.target.value)
                          }
                        />
                      ) : (
                        row.pcs
                      )}
                    </TableCell>

                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.rate || row.rate}
                          onChange={(e) =>
                            handleEdit(index, "rate", e.target.value)
                          }
                        />
                      ) : (
                        row.rate
                      )}
                    </TableCell>

                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.discount || row.discount}
                          onChange={(e) =>
                            handleEdit(index, "discount", e.target.value)
                          }
                        />
                      ) : (
                        row.discount
                      )}
                    </TableCell>

                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          size="medium"
                          value={editedRow.amount || row.amount}
                          onChange={(e) =>
                            handleEdit(index, "amount", e.target.value)
                          }
                        />
                      ) : (
                        row.amount
                      )}
                    </TableCell>

                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.brk || row.brk}
                          onChange={(e) =>
                            handleEdit(index, "brk", e.target.value)
                          }
                        />
                      ) : (
                        row.brk
                      )}
                    </TableCell>

                    <TableCell>
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.split || row.split}
                          onChange={(e) =>
                            handleEdit(index, "split", e.target.value)
                          }
                        />
                      ) : (
                        row.split
                      )}
                    </TableCell>

                    <TableCell>
                      {editableIndex !== index ? (
                        <EditIcon
                          sx={{ cursor: "pointer", color: "blue" }}
                          onClick={() => handleEditClick(index)}
                        />
                      ) : (
                        <SaveIcon
                          sx={{ cursor: "pointer", color: "green" }}
                          onClick={() => handleSaveClick(index)}
                        />
                      )}
                      <CloseIcon
                        sx={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleRemoveClick(index)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Calculation part */}
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
            <InputLabel className="input-label-2">Vol (ml)</InputLabel>
            <TextField
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.totalVolume}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Total Pcs.</InputLabel>
            <TextField
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.totalPcs}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Gross Amt. (₹)</InputLabel>
            <TextField
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.grossAmt}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Rect. Mode 1</InputLabel>
            <TextField
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.receiptMode1}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Rect. Mode 2</InputLabel>
            <TextField
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.receiptMode2}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Receipt Amt</InputLabel>
            <TextField
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.receiptAmt}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">S Disc(%)</InputLabel>
            <TextField
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.splDiscount}
              onChange={(e) =>
                setTotalValues({ ...totalValues, splDiscount: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">S Disc Amt.</InputLabel>
            <TextField
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.splDiscAmount}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Tax Amt.</InputLabel>
            <TextField
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.taxAmt}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={1}>
            <InputLabel className="input-label-2">Adjustment</InputLabel>
            <TextField
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.adjustment}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Net Amount</InputLabel>
            <TextField
              variant="outlined"
              className="input-field"
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
        {/* <Button
          color="inherit"
          size="medium"
          variant="outlined"
          // onClick={() => setIsModalOpen(true)}
          sx={{ marginTop: 3, marginRight: 2 }}
        >
          CREATE ITEM
        </Button> */}
        <Button
          color="success"
          size="medium"
          variant="outlined"
          onClick={() => { }}
          sx={{ marginTop: 3, marginRight: 2 }}
        >
          PREV PAGE
        </Button>
        <Button
          color="secondary"
          size="medium"
          variant="outlined"
          onClick={() => { }}
          sx={{ marginTop: 3, marginRight: 2 }}
        >
          NEXT PAGE
        </Button>

        <Button
          color="primary"
          size="medium"
          variant="outlined"
          onClick={() => { }}
          sx={{ marginTop: 3, marginRight: 2 }}
        >
          EDIT
        </Button>
        <Button
          color="error"
          size="medium"
          variant="contained"
          onClick={() => { }}
          sx={{ marginTop: 3, marginRight: 2 }}
        >
          DELETE
        </Button>
        <Button
          color="warning"
          size="medium"
          variant="contained"
          onClick={() => { }}
          sx={{ marginTop: 3, marginRight: 2 }}
        >
          OPEN
        </Button>
        <Button
          color="success"
          size="medium"
          variant="contained"
          onClick={() => { }}
          sx={{ marginTop: 3 }}
        >
          SAVE
        </Button>
      </Box>
    </Box>
  );
};

export default SaleBill;
