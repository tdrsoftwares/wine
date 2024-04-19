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
  Input,
} from "@mui/material";
import { useLoginContext } from "../../../utils/loginContext";
import { NotificationManager } from "react-notifications";
import { getAllSuppliers } from "../../../services/supplierService";
import { getAllStores } from "../../../services/storeService";
import { createPurchase, searchAllPurchases } from "../../../services/purchaseService";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import debounce from "lodash.debounce";

const PurchaseEntry = () => {
  const { loginResponse } = useLoginContext();
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
    case: "",
    caseValue: "",
    pcs: "",
    brk: "",
    purchaseRate: "",
    btlRate: "",
    gro: "",
    sp: "",
    amount: "",
  });

  const [totalValues, setTotalValues] = useState({
    totalMrp: "",
    totalSDiscount: "",
    govtRate: "",
    spcPurchases: "",
    sTax: "",
    tcs: "",
    tcsAmt: "",
    grossAmt: "",
    discount: "",
    tax: "",
    adjustment: "",
    netAmt: "",
  });

  const [editableIndex, setEditableIndex] = useState(-1);
  const [editedRow, setEditedRow] = useState({});

  const itemCodeRef = useRef(null);
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
      case: "",
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

    setEditedRow({});
    setEditableIndex(-1);
  };

  const isValidNumber = (value) => {
    return !isNaN(value) && parseFloat(value) >= 0;
  };

  const handleEdit = (index, field, value) => {
    const newEditedRow = { ...editedRow };
    newEditedRow[field] = isValidNumber(value) ? value : editedRow[field];
    setEditedRow(newEditedRow);
    if (index !== editableIndex) {
      setEditableIndex(index);
    }

    if (field === "purchaseRate") {
      handlePurRatePcsChange();
    }
  };

  const handleEditClick = (index) => {
    setEditableIndex(index);
  };

  const handleSaveClick = (index) => {
    const updatedPurchases = [...purchases];
    const updatedRow = { ...updatedPurchases[index] };

    for (const key in editedRow) {
      if (editedRow.hasOwnProperty(key)) {
        updatedRow[key] = editedRow[key];
      }
    }

    updatedPurchases[index] = updatedRow;
    setPurchases(updatedPurchases);

    setEditedRow({});
    setEditableIndex(-1);
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

  const debouncedSearch = debounce(async (itemName) => {
    try {
      const response = await searchAllPurchases(loginResponse, itemName);
      console.log("debouncedSearch response: ", response);
      if (response?.data?.data) {
        setSearchResults(response?.data?.data);
        // console.log("ami serc res ", searchResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching items:", error);
      setSearchResults([]);
    }
  }, 500);

  const handleRowClick = (index) => {
    const selectedRow = searchResults[index];
    setFormData({
      ...formData,
      itemCode: selectedRow.details[0]?.itemCode || 0,
      itemName: selectedRow.name || 0,
      mrp: selectedRow.details[0]?.mrp || 0,
      batch: selectedRow.batch || 0,
      case: selectedRow.case || null,
      caseValue: selectedRow.caseValue || 0,
      pcs: selectedRow.pcs || null,
      brk: selectedRow.brk || 0,
      purchaseRate: selectedRow.details[0]?.purchaseRate || 0,
      btlRate: selectedRow.btlRate || 0,
      gro: selectedRow.gro || 0,
      sp: selectedRow.sp || 0,
      amount: selectedRow.amount || 0,
    });
    // calculateMRPValue(formData);
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

      switch (nextInputRef.current) {
        case itemCodeRef:
        case itemNameRef:
          handleItemNameChange(event);
          break;
        case mrpRef:
        case batchRef:
        case caseRef:
        case pcsRef:
        case brkRef:
        case purRateRef:
        case btlRateRef:
        case groRef:
        case spRef:
          handlePurRatePcsChange();
          break;
        case amountRef:
          handleSubmitIntoDataTable();
          break;
        default:
          break;
      }
    }
  };

  console.log("purchases: ", purchases);

  const handleSubmitIntoDataTable = () => {
    if (
      formData.itemName &&
      formData.mrp &&
      formData.pcs &&
      formData.purchaseRate &&
      formData.amount
    ) {
      setPurchases([...purchases, formData]);
      setFormData({
        itemCode: "",
        itemName: "",
        mrp: "",
        batch: "",
        case: "",
        caseValue: "",
        pcs: "",
        brk: "",
        purchaseRate: "",
        btlRate: "",
        gro: "",
        sp: "",
        amount: "",
      });
      setSearchMode(false);
    }
  };

  const handleCreatePurchase = async () => {
    const missingFields = [];

    if (!formData.supplierName) {
      missingFields.push("Supplier Name");
    }

    if (!formData.stockIn) {
      missingFields.push("Stock In");
    }

    if (!formData.passNo) {
      missingFields.push("Pass Number");
    }

    if (!formData.passDate) {
      missingFields.push("Pass Date");
    }

    if (!formData.billNo) {
      missingFields.push("Bill Number");
    }

    if (!formData.billDate) {
      missingFields.push("Bill Date");
    }

    if (!totalValues.netAmt) {
      missingFields.push("Net Amount");
    }

    if (!totalValues.grossAmt) {
      missingFields.push("Gross Amount");
    }

    if (missingFields.length > 0) {
      const missingFieldsMessage = missingFields.join(", ");
      NotificationManager.warning(
        `Please fill in the necessary details for: ${missingFieldsMessage}.`,
        "Error"
      );
      return;
    }

    const payload = {
      supplierName: formData.supplierName,
      storeName: formData.stockIn,
      passNo: formData.passNo,
      passDate: formData.passDate,
      billNo: formData.billNo,
      billDate: formData.billDate,
      entryNo: formData.entryNo,
      mrpValue: totalValues.totalMrp,
      splDisc: totalValues.totalSDiscount,
      govtROff: totalValues.govtRate,
      specialPurpose: totalValues.spcPurchases,
      sTaxP: totalValues.sTax,
      sTaxAmount: "",
      tcsP: totalValues.tcs,
      tcsAmount: totalValues.tcsAmt,
      grossAmount: totalValues.grossAmt,
      discountAmount: totalValues.discount,
      taxAmount: totalValues.tax,
      adjustment: totalValues.adjustment,
      netAmount: totalValues.netAmt,
      purchaseItems: purchases.map((item) => ({
        itemCode: item.itemCode,
        itemId: "No Data",
        mrp: item.mrp,
        batch: item.batch,
        caseNo: item.case,
        pcs: item.pcs,
        brokenNo: item.brk,
        purchaseRate: item.purchaseRate,
        saleRate: item.btlRate,
        gro: item.gro,
        sp: item.sp,
        itemAmount: item.amount,
      })),
    };
    try {
      const response = await createPurchase(payload, loginResponse);
      console.log("Purchase created successfully:", response);

      NotificationManager.success("Purchase created successfully", "Success");
      setFormData({});
      setTotalValues({});
      setPurchases([]);
      searchMode(false);
    } catch (error) {
      console.error("Error creating purchase:", error);

      NotificationManager.error("Failed to create purchase", "Error");
    }
  };

  const calculateAmount = () => {
    const purRate = parseFloat(formData.purchaseRate) || 0;
    const pcs = parseInt(formData.pcs) || 0;
    return parseInt((purRate * pcs).toFixed(2));
  };

  const handlePurRatePcsChange = () => {
    const purRate = parseFloat(formData.purchaseRate) || 0;
    const pcs = parseInt(formData.pcs) || 0;
    let amount = 0;

    if (parseInt(formData.case) === 0) {
      amount = (purRate * pcs).toFixed(2);
    } else if (parseInt(formData.case) > 0) {
      amount = (purRate * parseInt(formData.case)).toFixed(2);
    }

    setFormData({ ...formData, amount });
  };

  const handleAmountChange = (event) => {
    const newAmountValue = parseInt(event.target.value) || 0;
    console.log("newAmountValue: ", newAmountValue);
    const pcs = parseInt(formData.caseValue) || 1;
    console.log("pcs: ", pcs);
    let newPurchaseRate = 0;

    if (pcs !== 0) {
      newPurchaseRate = parseInt(newAmountValue / pcs);
      console.log("newPurchaseRate: ", newPurchaseRate);
    }

    setFormData({
      ...formData,
      amount: newAmountValue.toString(),
      purchaseRate: newPurchaseRate.toString(),
    });
    console.log("amount formData: ", formData);
  };

  const handleCaseChange = (event) => {
    const newCase = parseInt(event.target.value) || 0;
    console.log("newCase: ", newCase);
    const newPcsValue = newCase * parseInt(formData.caseValue) || 0;
    console.log("newPcsValue: ", newPcsValue);
    setFormData({
      ...formData,
      case: newCase,
      pcs: newPcsValue,
    });
  };

  const handleGROChange = (event) => {
    const newGROValue = parseFloat(event.target.value) || 0;
    const currentAmt = parseFloat(formData.amount) || 0;
    const updatedAmtValue = (
      currentAmt -
      parseFloat(formData.gro) +
      newGROValue
    ).toFixed(2);

    setFormData({ ...formData, gro: newGROValue, amount: updatedAmtValue });
  };

  const handleSPChange = (event) => {
    const newSPValue = parseFloat(event.target.value) || 0;
    const currentAmt = parseFloat(formData.amount) || 0;
    const updatedAmtValue = (
      currentAmt -
      parseFloat(formData.sp) +
      newSPValue
    ).toFixed(2);

    setFormData({ ...formData, sp: newSPValue, amount: updatedAmtValue });
  };

  const handleDiscountChange = (event) => {
    const discount = parseFloat(event.target.value) || 0;
    setTotalValues((prevValues) => ({ ...prevValues, discount }));
  };

  const handleTcsChange = (event) => {
    const tcs = parseFloat(event.target.value) || 1;
    setTotalValues((prevValues) => ({ ...prevValues, tcs }));
  };

  const handleTotalMRPChanges = (event) => {
    const newTotalMRPValue = parseInt(event.target.value);
    // setTotalValues((prevValues) => ({
    //     ...prevValues,
    //     totalMrp: newTotalMRPValue
    // }));
  };

  const handleSDiscountChange = (event) => {
    const sDiscount = parseInt(event.target.value) || 0;
    setTotalValues({ ...totalValues, totalSDiscount: sDiscount });
  };

  const handleGovtRateChange = (event) => {
    const govtRate = parseFloat(event.target.value) || 0;
    setTotalValues((prevValues) => ({ ...prevValues, govtRate }));
  };

  const handleSpcPurchasesChange = (event) => {
    const spcPurchases = parseFloat(event.target.value) || 0;
    setTotalValues((prevValues) => ({ ...prevValues, spcPurchases }));
  };

  useEffect(() => {
    fetchAllSuppliers();
    fetchAllStores();
  }, []);

  useEffect(() => {
    handlePurRatePcsChange();
  }, [formData.purchaseRate, formData.pcs]);

  useEffect(() => {
    const totalMrpValue = purchases.reduce((total, purchase) => {
      return total + parseInt(purchase.mrp) * parseInt(purchase.pcs);
    }, 0);
    setTotalValues((prevValues) => ({
      ...prevValues,
      totalMrp: totalMrpValue,
    }));
    console.log("totalMrpValue: ", totalMrpValue);
  }, [formData.amount, purchases]);

  useEffect(() => {
    const grossAmount = purchases.reduce(
      (total, purchase) => total + parseFloat(purchase.amount),
      0
    );
    const sDiscount = parseInt(totalValues.totalSDiscount) || 0;
    const grossAmt = grossAmount - sDiscount;

    const govtRate = parseFloat(totalValues.govtRate) || 0;
    const spcPurchases = parseFloat(totalValues.spcPurchases) || 0;
    const netAmt = grossAmt + govtRate + spcPurchases;

    setTotalValues((prevValues) => ({ ...prevValues, grossAmt, netAmt }));
  }, [
    purchases,
    totalValues.totalSDiscount,
    totalValues.govtRate,
    totalValues.spcPurchases,
  ]);

  useEffect(() => {
    const tcsPercentage = parseFloat(totalValues.tcs) || 1;
    const grossAmt = parseFloat(totalValues.grossAmt) || 0;
    const tcsAmt = (grossAmt * tcsPercentage) / 100;

    const discount = parseFloat(totalValues.discount) || 0;
    const discountAmt = (grossAmt * discount) / 100;

    const netAmt = grossAmt + tcsAmt - discountAmt;

    setTotalValues((prevValues) => ({
      ...prevValues,
      tcsAmt,
      discountAmt,
      netAmt,
    }));
  }, [totalValues.tcs, totalValues.grossAmt, totalValues.discount]);

  useEffect(() => {
    const grossAmt = parseFloat(totalValues.grossAmt) || 0;
    const govtRound = parseFloat(totalValues.govtRate) || 0;
    const specialPurpose = parseFloat(totalValues.spcPurchases) || 0;

    let netAmt = grossAmt + govtRound + specialPurpose;

    const tcsPercentage = parseFloat(totalValues.tcs) || 1;
    const tcsAmt = (grossAmt * tcsPercentage) / 100;

    netAmt += tcsAmt;

    setTotalValues((prevValues) => ({
      ...prevValues,
      netAmt,
      tcsAmt,
    }));
  }, [
    totalValues.grossAmt,
    totalValues.govtRate,
    totalValues.spcPurchases,
    totalValues.tcs,
  ]);


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
                inputRef={itemCodeRef}
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
                value={formData.case}
                onChange={(e) => handleCaseChange(e)}
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
                onChange={handleGROChange}
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
                onChange={handleSPChange}
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
                aria-readonly
                onChange={(e) => handleAmountChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmitIntoDataTable();
                    handleEnterKey(e, itemCodeRef);
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
                    <TableCell align="center">Case Value</TableCell>
                    {/* <TableCell align="center">Pcs</TableCell> */}
                    {/* <TableCell align="center">Brk</TableCell> */}
                    <TableCell align="center">Pur Rate</TableCell>
                    <TableCell align="center">Btl Rate</TableCell>
                    <TableCell align="center">GRO</TableCell>
                    <TableCell align="center">SP</TableCell>
                    {/* <TableCell align="center">Amt(₹)</TableCell> */}
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
                            {row?.details[0]?.mrp || 0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.batch || 0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.caseValue || 0}
                          </TableCell>
                          {/* <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.pcs || 0}
                          </TableCell> */}
                          {/* <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.brk || 0}
                          </TableCell> */}
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row?.details[0]?.purchaseRate || 0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.btlRate || 0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.gro || 0}
                          </TableCell>
                          <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.sp || 0}
                          </TableCell>
                          {/* <TableCell align="center" sx={{ padding: "14px" }}>
                            {row.amount || 0.0}
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
                <TableBody className="purchase-data-table">
                  {purchases.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
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
                      <TableCell align="center">
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
                      <TableCell align="center">
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

                      <TableCell align="center">
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

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.case || row.case}
                            onChange={(e) =>
                              handleEdit(index, "case", e.target.value)
                            }
                          />
                        ) : (
                          row.case
                        )}
                      </TableCell>

                      <TableCell align="center">
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

                      <TableCell align="center">
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

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.purchaseRate || row.purchaseRate}
                            onChange={(e) =>
                              handleEdit(index, "purchaseRate", e.target.value)
                            }
                          />
                        ) : (
                          row.purchaseRate
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.btlRate || row.btlRate}
                            onChange={(e) =>
                              handleEdit(index, "btlRate", e.target.value)
                            }
                          />
                        ) : (
                          row.btlRate
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.gro || row.gro}
                            onChange={(e) =>
                              handleEdit(index, "gro", e.target.value)
                            }
                          />
                        ) : (
                          row.gro
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.sp || row.sp}
                            onChange={(e) =>
                              handleEdit(index, "sp", e.target.value)
                            }
                          />
                        ) : (
                          row.sp
                        )}
                      </TableCell>

                      <TableCell align="center">
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

                      <TableCell align="center">
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
                value={totalValues.totalMrp}
                onChange={handleTotalMRPChanges}
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
                value={totalValues.totalSDiscount}
                onChange={handleSDiscountChange}
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
                value={totalValues.govtRate}
                onChange={handleGovtRateChange}
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
                value={totalValues.spcPurchases}
                onChange={handleSpcPurchasesChange}
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
                value={totalValues.sTax}
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
                value={totalValues.tcs}
                onChange={handleTcsChange}
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
                value={totalValues.tcsAmt}
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
                value={totalValues.grossAmt}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Discount(%)</InputLabel>
              <TextField
                variant="outlined"
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={totalValues.discount}
                onChange={handleDiscountChange}
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
                value={totalValues.tax}
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
                value={totalValues.adjustment}
                InputProps={{ readOnly: true }}
                // onChange={handleAdjustmentChange}
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
                value={totalValues.netAmt}
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
            size="medium"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            PREV PAGE
          </Button>
          <Button
            color="secondary"
            size="medium"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            NEXT PAGE
          </Button>

          <Button
            color="primary"
            size="medium"
            variant="outlined"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            EDIT
          </Button>
          <Button
            color="error"
            size="medium"
            variant="contained"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            DELETE
          </Button>
          <Button
            color="warning"
            size="medium"
            variant="contained"
            onClick={() => {}}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            OPEN
          </Button>
          <Button
            color="success"
            size="medium"
            variant="contained"
            onClick={handleCreatePurchase}
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
