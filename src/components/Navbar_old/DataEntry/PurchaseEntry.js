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
  CircularProgress,
} from "@mui/material";
import { useLoginContext } from "../../../utils/loginContext";
import { NotificationManager } from "react-notifications";
import { getAllSuppliers } from "../../../services/supplierService";
import { getAllStores } from "../../../services/storeService";
import {
  createPurchase,
  searchAllPurchasesByItemCode,
  searchAllPurchasesByItemName,
} from "../../../services/purchaseService";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import debounce from "lodash.debounce";
import ItemRegisterModal from "./ItemRegisterModal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const PurchaseEntry = () => {
  const { loginResponse } = useLoginContext();
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allStores, setAllStores] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [searchMode, setSearchMode] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [entryNumber, setEntryNumber] = useState("");
  const [entryNoEditable, setEntryNoEditable] = useState(true);
  const [formData, setFormData] = useState({
    supplierName: "",
    passNo: "",
    passDate: null,
    address: "",
    billNo: "",
    billDate: null,
    stockIn: "",
    itemId: "",
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
    spcPurpose: "",
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
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const tableRef = useRef(null);
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

  const resetMiddleFormData = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      itemId: "",
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
    }));
  };

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditableIndex(null);
      setEditedRow({});
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemNameChange = (event) => {
    const itemName = event.target.value;
    // console.log("itemName: ", itemName);
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

  const handleSupplierNameChange = (e) => {
    setFormData({ ...formData, supplierName: e.target.value });
  };

  const handleStockInChange = (e) => {
    setFormData({ ...formData, stockIn: e.target.value });
  };

  const isValidNumber = (value) => {
    return !isNaN(value) && parseFloat(value) >= 0;
  };

  const handleEdit = (index, field, value) => {
    if (!isValidNumber(value)) {
      return;
    }

    const editedRowCopy = { ...editedRow };
    // console.log("editedRowCopy: ", editedRowCopy);
    editedRowCopy[field] = value;

    if (
      field === "purchaseRate" ||
      field === "pcs" ||
      field === "case" ||
      field === "gro" ||
      field === "sp"
    ) {
      let amount = 0;
      const purRate =
        parseFloat(
          editedRowCopy.purchaseRate || purchases[index].purchaseRate
        ) || 0;
      const pcs = parseFloat(editedRowCopy.pcs || purchases[index].pcs) || 0;
      const caseValue =
        parseFloat(editedRowCopy.case || purchases[index].case) || 0;
      const gro = parseFloat(editedRowCopy.gro || purchases[index].gro) || 0;
      const sp = parseFloat(editedRowCopy.sp || purchases[index].sp) || 0;

      if (parseFloat(caseValue) === 0) {
        amount = (purRate * pcs).toFixed(2);
      } else if (parseFloat(caseValue) > 0) {
        amount = (purRate * parseFloat(caseValue) + gro + sp).toFixed(2);
      }

      editedRowCopy.amount = amount;
    }
    setEditedRow(editedRowCopy);
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
      // console.log("allItemsResponse: ", allItemsResponse);
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
      // console.log("allStoresResponse ---> ", allStoresResponse);
      setAllStores(allStoresResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching stores. Please try again later.",
        "Error"
      );
      console.error("Error fetching stores:", error);
    }
  };

  const itemNameSearch = debounce(async (itemName) => {
    try {
      setIsLoading(true);
      const response = await searchAllPurchasesByItemName(loginResponse, itemName);
      // console.log("itemNameSearch response: ", response);
      if (response?.data?.data) {
        setSearchResults(response?.data?.data);
        // console.log("ami serc res ", searchResults);
      } else if (response.response.data.message === "No matching items found") {
        NotificationManager.error("No matching items found");
        setSearchResults([]);
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching items:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const itemCodeSearch = debounce(async (itemCode) => {
    try {
      setIsLoading(true);
      const response = await searchAllPurchasesByItemCode(loginResponse, itemCode);
      console.log("itemCodeSearch response: ", response);
      const searchedItem = response?.data?.data;
      console.log("searchedItem: ", searchedItem);

      if (searchedItem) {
        setSearchResults(searchedItem);
        setFormData({
          ...formData,
          itemId: searchedItem._id,
          itemCode: searchedItem.itemCode || 0,
          itemName: searchedItem.name || "",
          mrp: searchedItem.mrp || 0,
          batch: searchedItem.batchNo || 0,
          case: searchedItem.case || null,
          caseValue: searchedItem.caseValue || 0,
          pcs: searchedItem.pcs || null,
          brk: searchedItem.brk || 0,
          purchaseRate: searchedItem.purchaseRate || 0,
          btlRate: searchedItem.saleRate || 0,
          gro: searchedItem.gro || 0,
          sp: searchedItem.sp || 0,
          amount: searchedItem.amount || 0,
        });
      } else if (response.response.data.message === "No matching items found") {
        NotificationManager.error("No matching items found");
        setSearchResults([]);
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching items:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 1000);

  const handleRowClick = (index) => {
    const selectedRow = searchResults[index];
    // console.log("selectedRow --> ", selectedRow)
    setFormData({
      ...formData,
      itemId: selectedRow._id,
      itemCode: selectedRow.itemCode || 0,
      itemName: selectedRow.name || 0,
      mrp: selectedRow.mrp || 0,
      batch: selectedRow?.batchNo || 0,
      case: selectedRow.case || null,
      caseValue: selectedRow.caseValue || 0,
      pcs: selectedRow.pcs || null,
      brk: selectedRow.brk || 0,
      purchaseRate: selectedRow.purchaseRate || 0,
      btlRate: selectedRow.saleRate || 0,
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
          handleSubmitIntoDataTable(event);
          break;
        default:
          break;
      }
    }
  };

  // console.log("purchases: ", purchases);

  const handleSubmitIntoDataTable = (e) => {
    console.log("handleSubmitIntoDataTable formData: ", formData);
    e.preventDefault();

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
    if (!formData.purchaseRate) {
      NotificationManager.warning(`Please fill the Purchase Rate`);
      handleEnterKey(e, purRateRef);
      return;
    }
    if (!formData.amount) {
      NotificationManager.warning(`Please fill the Amount`);
      handleEnterKey(e, amountRef);
      return;
    }

    // if(formData.itemCode && formData.batch && formData.mrp && formData.stockIn) {
    //   setFormData({...formData, stockIn: parseInt(formData.stockIn) + parseInt(formData.pcs)})
    // }

    // console.log("stockIn: " + formData.stockIn)
    setPurchases([...purchases, formData]);
    resetMiddleFormData();
    handleEnterKey(e, itemCodeRef);
    setSearchMode(false);
  };

  // let dateObj = new Date(formData.passDate);
  // let newDate = `${dateObj.getDate()}/${
  //   dateObj.getMonth() + 1
  // }/${dateObj.getFullYear()}`
  // console.log("1 newDate --> ", newDate);
  // console.log("2 totalValues --> ", totalValues);

  const handleCreatePurchase = async () => {
    console.log("handleCreatePurchase formData --> ", formData);

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

    if (purchases.length === 0) {
      missingFields.push("Item Purchase");
    }

    if (missingFields.length > 0) {
      const missingFieldsMessage = missingFields.join(", ");
      NotificationManager.warning(
        `Please fill in the necessary details for: ${missingFieldsMessage}.`,
        "Error"
      );
      return;
    }

    const passDateObj = formatDate(formData.passDate);
    // console.log("passDateObj: ", passDateObj);
    // console.log("formData.passDate: ", formData.passDate);
    const billDateObj = formatDate(formData.billDate);
    // console.log("billDateObj: ", billDateObj);

    const payload = {
      supplierName: formData.supplierName,
      storeName: formData.stockIn,
      passNo: formData.passNo,
      // passDate: `${passDateObj.getDate()}/${
      //   passDateObj.getMonth() + 1
      // }/${passDateObj.getFullYear()}`,
      passDate: passDateObj,
      billNo: formData.billNo,
      // billDate: `${billDateObj.getDate()}/${
      //   billDateObj.getMonth() + 1
      // }/${billDateObj.getFullYear()}`,
      billDate: billDateObj,
      mrpValue: parseFloat(totalValues.totalMrp) || 0,
      splDisc: parseFloat(totalValues.totalSDiscount) || 0,
      govtROff: parseFloat(totalValues.govtRate) || 0,
      specialPurpose: parseFloat(totalValues.spcPurpose) || 0,
      sTaxP: parseFloat(totalValues.sTax) || 0,
      sTaxAmount: 0,
      tcsP: parseFloat(totalValues.tcs) || 1,
      tcsAmount: parseFloat(totalValues.tcsAmt) || 0,
      grossAmount: parseFloat(totalValues.grossAmt) || 0,
      discountAmount: parseFloat(totalValues.discountAmt) || 0,
      taxAmount: parseFloat(totalValues.taxAmt) || 0,
      adjustment: parseFloat(totalValues.adjustment) || 0,
      netAmount: parseFloat(totalValues.netAmt) || 0,
      purchaseItems: purchases.map((item) => ({
        itemCode: item.itemCode.toString(),
        itemId: item.itemId.toString(),
        mrp: parseFloat(item.mrp) || 0,
        batchNo: item.batch.toString(),
        caseNo: parseFloat(item.case) || 0,
        pcs: parseFloat(item.pcs) || 0,
        brokenNo: parseFloat(item.brk) || 0,
        purchaseRate: parseFloat(item.purchaseRate) || 0,
        saleRate: parseFloat(item.btlRate) || 0,
        gro: parseFloat(item.gro) || 0,
        sp: parseFloat(item.sp) || 0,
        itemAmount: parseFloat(item.amount) || 0,
      })),
    };

    try {
      const response = await createPurchase(payload, loginResponse);

      if (response.status === 200) {
        // console.log("Purchase created successfully:", response);
        NotificationManager.success("Purchase created successfully", "Success");
        setEntryNumber(response?.data?.data?.purchase?.entryNo);
        setSearchMode(false);
      } else {
        NotificationManager.error(
          "Error creating Purchase. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      console.error("Error creating purchase:", error);
    }
  };

  const handlePurRatePcsChange = () => {
    const purRate = parseFloat(formData.purchaseRate) || 0;
    const pcs = parseFloat(formData.pcs) || 0;
    let amount = 0;

    if (parseFloat(formData.case) === 0) {
      amount = (purRate * pcs).toFixed(2);
    } else if (parseFloat(formData.case) > 0) {
      amount = (purRate * parseFloat(formData.case)).toFixed(2);
    }

    setFormData({ ...formData, amount });
  };

  const handleAmountChange = (event) => {
    const newAmountValue = parseFloat(event.target.value) || 0;
    // console.log("newAmountValue: ", newAmountValue);
    const pcs = parseFloat(formData.caseValue) || 1;
    // console.log("pcs: ", pcs);
    let newPurchaseRate = 0;

    if (pcs !== 0) {
      newPurchaseRate = parseFloat(newAmountValue / pcs);
      // console.log("newPurchaseRate: ", newPurchaseRate);
    }

    setFormData({
      ...formData,
      amount: newAmountValue.toString(),
      purchaseRate: newPurchaseRate.toString(),
    });
    console.log("amount formData: ", formData);
  };

  const handleCaseChange = (event) => {
    const newCase = parseFloat(event.target.value) || 0;
    // console.log("newCase: ", newCase);
    const newPcsValue = newCase * parseFloat(formData.caseValue) || 0;
    // console.log("newPcsValue: ", newPcsValue);
    setFormData({
      ...formData,
      case: newCase,
      pcs: newPcsValue,
    });
  };

  const handleGROChange = (event) => {
    const regex = /^\d*\.?\d*$/; 
  
    if (regex.test(event.target.value) || event.target.value === '') {
      const newGROValue = parseFloat(event.target.value) || 0;
      const currentAmt = parseFloat(formData.amount) || 0;
      const updatedAmtValue = (
        currentAmt -
        parseFloat(formData.gro) +
        newGROValue
      ).toFixed(2);
  
      setFormData({ ...formData, gro: newGROValue, amount: updatedAmtValue });
    }
  };


  const handleSPChange = (event) => {
    const regex = /^\d*\.?\d*$/;
  
    if (regex.test(event.target.value) || event.target.value === '') {
      const newSPValue = parseFloat(event.target.value) || 0;
      const currentAmt = parseFloat(formData.amount) || 0;
      const updatedAmtValue = (
        currentAmt -
        parseFloat(formData.sp) +
        newSPValue
      ).toFixed(2);
  
      setFormData({ ...formData, sp: newSPValue, amount: updatedAmtValue });
    }
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
    const newTotalMRPValue = parseFloat(event.target.value);
    // setTotalValues((prevValues) => ({
    //     ...prevValues,
    //     totalMrp: newTotalMRPValue
    // }));
  };

  const handleSDiscountChange = (event) => {
    const sDiscount = parseFloat(event.target.value) || 0;
    setTotalValues({ ...totalValues, totalSDiscount: sDiscount });
  };

  const handleGovtRateChange = (event) => {
    const govtRate = parseFloat(event.target.value) || 0;
    setTotalValues((prevValues) => ({ ...prevValues, govtRate }));
  };

  const handleSpcPurchasesChange = (event) => {
    const spcPurpose = parseFloat(event.target.value) || 0;
    setTotalValues((prevValues) => ({ ...prevValues, spcPurpose }));
  };

  const handlePurchaseOpen = () => {
    setEntryNoEditable(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // console.log("date: ", date);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    // console.log("formattedDate: ", formattedDate);
    return formattedDate;
  };

  const handlePassDateChange = (date) => {
    setFormData({ ...formData, passDate: date });
  };

  const handleBillDateChange = (date) => {
    setFormData({ ...formData, billDate: date });
  };

  const handlePcsChanges = (e) => {
    const regex = /^\d*\.?\d*$/;
    if (regex.test(e.target.value) || e.target.value === "") {
      setFormData({ ...formData, case: 0, pcs: e.target.value });
    }
  };

  useEffect(() => {
    fetchAllSuppliers();
    fetchAllStores();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (searchMode) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          const currentIndex =
            selectedRowIndex !== null ? selectedRowIndex : -1;
          let nextIndex;
          if (event.key === "ArrowDown") {
            nextIndex =
              currentIndex === searchResults.length - 1 ? 0 : currentIndex + 1;
          } else {
            nextIndex =
              currentIndex === 0 ? searchResults.length - 1 : currentIndex - 1;
          }
          setSelectedRowIndex(nextIndex);
          setFormData({
            ...formData,
            itemName: searchResults[nextIndex]?.itemName || "",
          });
        } else if (event.key === "Enter" && selectedRowIndex !== null) {
          const selectedRow = searchResults[selectedRowIndex];
          setFormData({
            ...formData,
            itemId: selectedRow._id,
            itemCode: selectedRow.itemCode || 0,
            itemName: selectedRow.item[0].name || 0,
            mrp: selectedRow.mrp || 0,
            batch: selectedRow.batchNo || 0,
            case: selectedRow.case || null,
            caseValue: selectedRow.item[0].caseValue || 0,
            pcs: selectedRow.pcs || null,
            brk: selectedRow.brk || 0,
            purchaseRate: selectedRow.purchaseRate || 0,
            btlRate: selectedRow.saleRate || 0,
            gro: selectedRow.gro || 0,
            sp: selectedRow.sp || 0,
            amount: selectedRow.amount || 0,
          });
          setSearchMode(false);
          setSelectedRowIndex(null);
          caseRef.current.focus();
        }
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchMode, formData.itemName, searchResults, selectedRowIndex]);

  useEffect(() => {
    handlePurRatePcsChange();
  }, [formData.purchaseRate, formData.pcs]);

  useEffect(() => {
    const totalMrpValue = purchases.reduce((total, purchase) => {
      return total + parseFloat(purchase.mrp) * parseFloat(purchase.pcs);
    }, 0);
    setTotalValues((prevValues) => ({
      ...prevValues,
      totalMrp: totalMrpValue,
    }));
    // console.log("totalMrpValue: ", totalMrpValue);
  }, [formData.amount, purchases]);

  useEffect(() => {
    const grossAmount = purchases.reduce(
      (total, purchase) => total + parseFloat(purchase.amount),
      0
    );
    const sDiscount = parseFloat(totalValues.totalSDiscount) || 0;
    const grossAmt = grossAmount - sDiscount;

    const govtRate = parseFloat(totalValues.govtRate) || 0;
    const spcPurpose = parseFloat(totalValues.spcPurpose) || 0;
    const netAmt = grossAmt + govtRate + spcPurpose;

    setTotalValues((prevValues) => ({ ...prevValues, grossAmt, netAmt }));
  }, [
    purchases,
    totalValues.totalSDiscount,
    totalValues.govtRate,
    totalValues.spcPurpose,
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
    const specialPurpose = parseFloat(totalValues.spcPurpose) || 0;

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
    totalValues.spcPurpose,
    totalValues.tcs,
  ]);

  const clearAllFields = () => {
    setFormData({
      supplierName: "",
      passNo: "",
      passDate: null,
      address: "",
      billNo: "",
      billDate: null,
      stockIn: "",
    });
    resetMiddleFormData();
    setPurchases([]);
    setEditedRow({});
    setSelectedRowIndex(null);
    setSearchMode(false);
    setEditableIndex(-1);
    setTotalValues({
      totalMrp: "",
      totalSDiscount: "",
      govtRate: "",
      spcPurpose: "",
      sTax: "",
      tcs: "",
      tcsAmt: "",
      grossAmt: "",
      discount: "",
      tax: "",
      adjustment: "",
      netAmt: "",
    });
  };

  const handleItemCodeChange = async (e) => {
    const itemCode = e.target.value;
    setFormData({ ...formData, itemCode: itemCode });
    await itemCodeSearch(itemCode);
    console.log("search result: ", searchResults);

    if (!itemCode) {
      setSearchMode(false);
      resetMiddleFormData();
    }

    setEditedRow({});
    setEditableIndex(-1);
  };

  return (
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
              size="small"
              type="text"
              className="input-field"
              value={formData.supplierName}
              onChange={handleSupplierNameChange}
            >
              {allSuppliers?.map((item) => (
                <MenuItem key={item._id} value={item.name}>
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
              className="input-field"
              value={formData.passNo}
              onChange={(e) => {
                const regex = /^\d*\.?\d*$/;
                if (regex.test(e.target.value) || e.target.value === "") {
                  setFormData({ ...formData, passNo: e.target.value });
                }
              }}
            />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="passDate" className="input-label">
              Pass Date :
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="passDate"
                format="DD/MM/YYYY"
                value={formData.passDate}
                className="input-field date-picker"
                onChange={handlePassDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
              onChange={handleStockInChange}
            >
              {allStores?.map((store) => (
                <MenuItem key={store._id} value={store.name}>
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
              className="input-field entryNo-adjustment"
              value={entryNumber}
              disabled={entryNoEditable}
              onChange={(e) => {
                const regex = /^\d*\.?\d*$/;
                if (regex.test(e.target.value) || e.target.value === "") {
                  setEntryNumber(e.target.value);
                }
              }}
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
              className="input-field"
              value={formData.billNo}
              onChange={(e) => {
                const regex = /^\d*\.?\d*$/;
                if (regex.test(e.target.value) || e.target.value === "") {
                  setFormData({ ...formData, billNo: e.target.value });
                }
              }}
            />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="billDate" className="input-label">
              Bill Date :
            </InputLabel>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="billDate"
                format="DD/MM/YYYY"
                value={formData.billDate}
                className="input-field date-picker"
                onChange={handleBillDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={formData.itemCode}
              onChange={handleItemCodeChange}
              onKeyDown={(e) => handleEnterKey(e, itemNameRef)}
            />
          </Grid>
          <Grid item xs={1.8}>
            <InputLabel className="input-label-2">Item Name</InputLabel>
            <TextField
              fullWidth
              size="small"
              inputRef={itemNameRef}
              type="text"
              className="input-field"
              value={formData.itemName}
              onChange={handleItemNameChange}
              onKeyDown={(e) => handleEnterKey(e, mrpRef)}
            />
          </Grid>
          <Grid item xs={0.8}>
            <InputLabel className="input-label-2">MRP</InputLabel>
            <TextField
              fullWidth
              size="small"
              inputRef={mrpRef}
              className="input-field"
              value={formData.mrp}
              onChange={(e) => {
                const regex = /^\d*\.?\d*$/;
                if (regex.test(e.target.value) || e.target.value === "") {
                  setFormData({ ...formData, mrp: e.target.value });
                }
              }}
              onKeyDown={(e) => handleEnterKey(e, batchRef)}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Batch</InputLabel>
            <TextField
              fullWidth
              size="small"
              inputRef={batchRef}
              className="input-field"
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
              fullWidth
              size="small"
              inputRef={caseRef}
              className="input-field"
              value={formData.case}
              onChange={(e) => handleCaseChange(e)}
              onKeyDown={(e) => handleEnterKey(e, pcsRef)}
            />
          </Grid>
          <Grid item xs={0.8}>
            <InputLabel className="input-label-2">Pcs</InputLabel>
            <TextField
              fullWidth
              size="small"
              inputRef={pcsRef}
              className="input-field"
              value={formData.pcs}
              onChange={handlePcsChanges}
              onKeyDown={(e) => handleEnterKey(e, brkRef)}
            />
          </Grid>
          <Grid item xs={0.8}>
            <InputLabel className="input-label-2">Brk</InputLabel>
            <TextField
              fullWidth
              size="small"
              inputRef={brkRef}
              className="input-field"
              value={formData.brk}
              onChange={(e) => {
                const regex = /^\d*\.?\d*$/;
                if (regex.test(e.target.value) || e.target.value === "") {
                  setFormData({ ...formData, brk: e.target.value });
                }
              }}
              onKeyDown={(e) => handleEnterKey(e, purRateRef)}
            />
          </Grid>
          <Grid item xs={0.9}>
            <InputLabel className="input-label-2">Pur. Rate</InputLabel>
            <TextField
              fullWidth
              size="small"
              inputRef={purRateRef}
              className="input-field"
              value={formData.purchaseRate}
              onChange={(e) => {
                const regex = /^\d*\.?\d*$/;
                if (regex.test(e.target.value) || e.target.value === "") {
                  setFormData({ ...formData, purchaseRate: e.target.value });
                }
              }}
              onKeyDown={(e) => handleEnterKey(e, btlRateRef)}
            />
          </Grid>
          <Grid item xs={0.9}>
            <InputLabel className="input-label-2">Btl. Rate</InputLabel>
            <TextField
              fullWidth
              size="small"
              inputRef={btlRateRef}
              className="input-field"
              value={formData.btlRate}
              onChange={(e) => {
                const regex = /^\d*\.?\d*$/;
                if (regex.test(e.target.value) || e.target.value === "") {
                  setFormData({ ...formData, btlRate: e.target.value });
                }
              }}
              onKeyDown={(e) => handleEnterKey(e, groRef)}
            />
          </Grid>
          <Grid item xs={0.8}>
            <InputLabel className="input-label-2">GRO</InputLabel>
            <TextField
              fullWidth
              size="small"
              inputRef={groRef}
              className="input-field"
              value={formData.gro}
              onChange={handleGROChange}
              onKeyDown={(e) => handleEnterKey(e, spRef)}
            />
          </Grid>
          <Grid item xs={0.8}>
            <InputLabel className="input-label-2">SP</InputLabel>
            <TextField
              fullWidth
              size="small"
              inputRef={spRef}
              className="input-field"
              value={formData.sp}
              onChange={handleSPChange}
              onKeyDown={(e) => handleEnterKey(e, amountRef)}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Amt(₹)</InputLabel>
            <TextField
              fullWidth
              size="small"
              inputRef={amountRef}
              className="input-field"
              value={formData.amount}
              aria-readonly
              onChange={(e) => handleAmountChange(e)}
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
            ref={tableRef}
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
                  <TableCell align="center">Pur Rate</TableCell>
                  <TableCell align="center">Btl Rate</TableCell>
                  <TableCell align="center">GRO</TableCell>
                  <TableCell align="center">SP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(searchResults) && searchResults.length > 0 ? (
                  searchResults.map((row, index) => (
                    <TableRow
                      key={index}
                      onClick={() => {
                        handleRowClick(index);
                        setSearchMode(false);
                      }}
                      sx={{
                        cursor: "pointer",
                        backgroundColor:
                          index === selectedRowIndex
                            ? "rgba(25, 118, 210, 0.08) !important"
                            : "#fff !important",
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{ padding: "14px", paddingLeft: 2 }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row.itemCode || "No Data"}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row.item[0].name || "No Data"}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row.mrp || 0}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row.batchNo || 0}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row.item[0].caseValue || 0}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row.purchaseRate || 0}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row.saleRate || 0}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row.gro || 0}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row.sp || 0}
                      </TableCell>
                    </TableRow>
                  ))
                ) : isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      align="center"
                      sx={{
                        backgroundColor: "#fff !important",
                      }}
                    >
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      align="center"
                      sx={{
                        backgroundColor: "#fff !important",
                      }}
                    >
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer
            component={Paper}
            ref={tableRef}
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
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  >
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
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={totalValues.totalMrp}
              InputProps={{ readOnly: true }}
              // onChange={handleTotalMRPChanges}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">S. Discount</InputLabel>
            <TextField
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
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={totalValues.govtRate}
              onChange={handleGovtRateChange}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Special Purposes</InputLabel>
            <TextField
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={totalValues.spcPurpose}
              onChange={handleSpcPurchasesChange}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Service Tax</InputLabel>
            <TextField
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
              type="text"
              size="small"
              className="input-field"
              fullWidth
              value={totalValues.tcs || 1}
              // onChange={handleTcsChange}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Tcs Amt.</InputLabel>
            <TextField
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
          justifyContent: "space-between",
        }}
      >
        <Button
          color="inherit"
          size="medium"
          variant="contained"
          onClick={() => setIsModalOpen(true)}
          sx={{ marginTop: 3, marginRight: 2 }}
        >
          CREATE ITEM
        </Button>
        <div>
          <ItemRegisterModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <Button
            color="inherit"
            size="medium"
            variant="outlined"
            onClick={clearAllFields}
            sx={{ marginTop: 3, marginRight: 2 }}
          >
            CLEAR
          </Button>

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
            onClick={handlePurchaseOpen}
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
        </div>
      </Box>
    </Box>
  );
};

export default PurchaseEntry;
