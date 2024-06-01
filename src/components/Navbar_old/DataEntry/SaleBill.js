import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
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
} from "@mui/material";
import { getAllCustomer } from "../../../services/customerService";
import { NotificationManager } from "react-notifications";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import debounce from "lodash.debounce";
import {
  createSale,
  searchAllSalesByItemCode,
  searchAllSalesByItemName,
} from "../../../services/saleBillService";
import { getAllLedgers } from "../../../services/ledgerService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';

const SaleBill = () => {
  const [allCustomerData, setAllCustomerData] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [allLedgers, setAllLedgers] = useState([]);

  const todaysDate = dayjs();
  console.log("salesData: ", salesData);
  const [searchMode, setSearchMode] = useState(false);
  const [formData, setFormData] = useState({
    barCode: "",
    billType: "CASHBILL",
    customerName: "",
    balance: "",
    phoneNo: "",
    type: "",
    address: "",
    newcode: "",
    series: "",
    billno: "",
    billDate: todaysDate,
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
    currentStock: "",
    group: "",
  });

  const [editableIndex, setEditableIndex] = useState(-1);
  const [editedRow, setEditedRow] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [billNoEditable, setBillNoEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const tableRef = useRef(null);
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
  const totalVolRef = useRef(null);
  const totalPcsRef = useRef(null);
  const grossAmtRef = useRef(null);
  const rectMode1Ref = useRef(null);
  const rectMode2Ref = useRef(null);
  const rectMode2AmtRef = useRef(null);
  const sDiscPercentRef = useRef(null);
  const sDiscAmtRef = useRef(null);
  const discAmtRef = useRef(null);
  const taxAmtRef = useRef(null);
  const adjustmentRef = useRef(null);
  const netAmtRef = useRef(null);
  const saveButtonRef = useRef(null);


  const fetchAllCustomers = async () => {
    try {
      const allCustomerResponse = await getAllCustomer();
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

  const fetchAllLedger = async () => {
    try {
      const allLedgerResponse = await getAllLedgers();
      setAllLedgers(allLedgerResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching companies. Please try again later.",
        "Error"
      );
      console.error("Error fetching companies:", error);
    }
  };

  const isValidNumber = (value) => {
    return !isNaN(value) && parseFloat(value) >= 0;
  };

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditableIndex(null);
      setEditedRow({});
    }
  };

  const resetTopFormData = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      customerName: "",
      address: "",
      phoneNo: "",
      type: "",
      billDate: todaysDate,
      series: "",
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
      setIsLoading(true);
      const response = await searchAllSalesByItemName(itemName);
      console.log("itemNameSearch response: ", response);

      if (response?.data?.data) {
        setSearchResults(response?.data?.data);
        console.log("ami serc res ", searchResults);
      }  else {
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
      const response = await searchAllSalesByItemCode(itemCode);
      const searchedItem = response?.data?.data[0];

      if (searchedItem) {
        const existingItemIndex = salesData.findIndex(
          (item) =>
            item.itemCode === searchedItem.itemCode &&
            item.mrp === searchedItem.mrp &&
            item.batch === searchedItem.batchNo
        );

        if (formData.billType === "CASHBILL") {
          // for exisiting item
          if (existingItemIndex !== -1) {
            const updatedSalesData = [...salesData];
            updatedSalesData[existingItemIndex].pcs += 1;
            updatedSalesData[existingItemIndex].amount =
              updatedSalesData[existingItemIndex].pcs *
              updatedSalesData[existingItemIndex].rate;
            setSalesData(updatedSalesData);
          } else {
            // for new item
            setSalesData([
              ...salesData,
              {
                itemId: searchedItem?.itemId,
                itemCode: searchedItem?.itemCode || 0,
                itemName: searchedItem?.item[0]?.name || 0,
                mrp: searchedItem?.mrp || 0,
                batch: searchedItem?.batchNo || 0,
                pcs: 1,
                rate: searchedItem?.mrp || 0,
                currentStock: searchedItem?.currentStock || 0,
                volume: searchedItem?.item[0]?.volume || 0,
                discount: formData.discount || 0,
                brk: formData.brk || 0,
                split: formData.split || 0,
                amount: searchedItem?.mrp || 0,
              },
            ]);
          }
          resetMiddleFormData();
        }

        else {
          setFormData({
            ...formData,
            itemId: searchedItem?.itemId,
            itemCode: searchedItem?.itemCode || 0,
            itemName: searchedItem?.item[0]?.name || 0,
            mrp: searchedItem?.mrp || 0,
            batch: searchedItem?.batchNo || 0,
            pcs: formData.pcs || "",
            rate: searchedItem?.mrp || 0,
            currentStock: searchedItem?.currentStock || 0,
            volume: searchedItem?.item[0]?.volume || 0,
            amount: searchedItem?.mrp || 0,
          });
          pcsRef.current.focus();
        }


        // setTotalValues({
        //   ...totalValues,
        //   totalVolume: formData.volume,
        //   grossAmt: formData.amount,
        //   receiptMode1: formData.amount,
        //   netAmt: formData.amount,
        // });

        
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


  // const updateTotalDiscounts = (salesData) => {
  //   const totalDiscounts = salesData.reduce((total, item) => {
  //     const discountValue = parseFloat(item.discount) || 0;
  //     return total + discountValue;
  //   }, 0);
  
  //   setTotalValues((prevTotalValues) => ({
  //     ...prevTotalValues,
  //     splDiscAmount: totalDiscounts.toFixed(2),
  //   }));
  // };  

  useEffect(() => {
    const newPcs = parseInt(formData.pcs) * parseInt(formData.mrp);
    setFormData((prevFormData) => ({
      ...prevFormData,
      amount: newPcs ? parseInt(newPcs) : 0,
    }));
  }, [formData.pcs]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 120) {
        handleCreateSale();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [formData]);

  useEffect(() => {
    if (formData.customerName) {
      const selectedCustomer = allCustomerData.find(
        (customer) => customer._id === formData.customerName._id
      );
      console.log("selectedCustomer: ", selectedCustomer)
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
    itemCodeRef.current.focus();
    fetchAllCustomers();
    fetchAllLedger();
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
            itemId: selectedRow.item[0]._id,
            itemCode: selectedRow.itemCode || 0,
            itemName: selectedRow.item[0].name || 0,
            mrp: selectedRow.mrp || 0,
            batch: selectedRow.batchNo || 0,
            pcs: selectedRow.pcs || 1,
            rate: selectedRow.mrp || 0,
            volume: selectedRow.item[0].volume || 0,
            currentStock: selectedRow.currentStock || 0,
            group: selectedRow.item[0].group || "",
          });
          pcsRef.current.focus();
          setSearchMode(false);
          setSelectedRowIndex(null);
        }
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchMode, formData.itemName, searchResults, selectedRowIndex]);

  useEffect(() => {
    resetTopFormData();
  }, [formData.billType]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    console.log("date: ", date);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    console.log("formattedDate: ", formattedDate);
    return formattedDate;
  };

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
    if (event.key === "Enter" || event.key === "Tab") {
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
        case totalVolRef:
        case totalPcsRef:
        case grossAmtRef:
        case rectMode1Ref:
        case rectMode2Ref:
        case rectMode2AmtRef:
        case sDiscPercentRef:
        case sDiscAmtRef:
        case taxAmtRef:
        case adjustmentRef:
        case netAmtRef:
        case saveButtonRef:
          handleCreateSale();
          break;
        default:
          nextInputRef.current.focus();
          break;
      }
    }
  };

  const handleEdit = (index, field, value) => {
    const updatedRow = { ...salesData[index] };
  
    updatedRow[field] = value;
  
    if (
      field === "rate" ||
      field === "pcs" ||
      field === "discount" ||
      field === "amount"
    ) {
      if (field === "pcs") {
        updatedRow.amount = parseFloat(updatedRow.rate) * parseFloat(value);
      } else if (field === "rate") {
        updatedRow.amount = parseFloat(updatedRow.pcs) * parseFloat(value);
      } else if (field === "discount") {
        const originalAmount =
          parseFloat(updatedRow.rate) * parseFloat(updatedRow.pcs);
        let newAmount = originalAmount - parseFloat(value);
        if (newAmount < 0) {
          newAmount = 0;
        }
        updatedRow.amount = newAmount;
      } else if (field === "amount") {
        if (parseFloat(updatedRow.pcs) !== 0) {
          updatedRow.rate = parseFloat(value) / parseFloat(updatedRow.pcs);
        }
      }
    }
  
    const updatedSalesData = [...salesData];
    updatedSalesData[index] = updatedRow;
  
    setSalesData(updatedSalesData);
  };

  const handleBillDateChange = (date) => {
    setFormData({ ...formData, billDate: date });
  };

  const handleRowClick = (index) => {
    const selectedRow = searchResults[index];

    console.log("handleRowClick selectedRow: ", selectedRow);
    setFormData({
      ...formData,
      itemId: selectedRow.item[0]._id,
      itemCode: selectedRow.itemCode || 0,
      itemName: selectedRow.item[0].name || 0,
      mrp: selectedRow.mrp || 0,
      batch: selectedRow.batchNo || 0,
      pcs: selectedRow.pcs || 1,
      rate: selectedRow.mrp || 0,
      volume: selectedRow.item[0].volume || 0,
      currentStock: selectedRow.currentStock || 0,
      group: selectedRow.item[0].group || "",
    });
    pcsRef.current.focus();
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
  
    // Recalculate total values
    const calculatedTotalVolume = updatedSales.reduce((total, item) => {
      return total + parseFloat(item.volume || 0) * parseInt(item.pcs || 1);
    }, 0);
  
    const calculatedTotalPcs = updatedSales.reduce((total, item) => {
      return total + parseInt(item.pcs || 0);
    }, 0);
  
    const calculatedGrossAmt = updatedSales.reduce((total, item) => {
      return total + parseFloat(item.amount || 0) * parseInt(item.pcs || 1);
    }, 0);
  
    
    const totalDiscount = updatedSales.reduce((total, item) => {
      return total + parseFloat(item.discount * item.pcs || 0);
    }, 0);
  
    const splDiscAmount = (calculatedGrossAmt * parseFloat(totalValues.splDiscount || 0)) / 100;
  
    const netAmt =
      parseFloat(calculatedGrossAmt || 0) -
      parseFloat(splDiscAmount || 0) -
      parseFloat(totalValues.adjustment || 0) +
      parseFloat(totalValues.taxAmt || 0);
  
    setTotalValues({
      ...totalValues,
      totalVolume: calculatedTotalVolume.toFixed(0),
      totalPcs: calculatedTotalPcs,
      grossAmt: calculatedGrossAmt.toFixed(0),
      discountAmt: totalDiscount.toFixed(0),
      splDiscAmount: (splDiscAmount + totalDiscount).toFixed(0),
      netAmt: netAmt.toFixed(2),
    });
  };
  
  const handleRemoveClick = (index) => {
    const updatedSales = [...salesData];
    updatedSales.splice(index, 1);
    setSalesData(updatedSales);
    resetTotalValues();
  };

  const handleSubmitIntoDataTable = async (e) => {
    e.preventDefault();

    if (
      !formData.itemCode ||
      !formData.itemName ||
      !formData.mrp ||
      !formData.pcs ||
      formData.pcs > formData.currentStock ||
      !formData.rate ||
      !formData.amount
    ) {
      NotificationManager.warning("Please fill all required fields correctly");
      return;
    }

    try {
      const existingItemIndex = salesData.findIndex(
        (item) =>
          item.itemCode === formData.itemCode &&
          item.mrp === formData.mrp &&
          item.batch === formData.batch
      );

      if (existingItemIndex !== -1) {
        const updatedSalesData = [...salesData];
        updatedSalesData[existingItemIndex].pcs += parseInt(formData.pcs);
        updatedSalesData[existingItemIndex].amount =
          updatedSalesData[existingItemIndex].pcs *
          updatedSalesData[existingItemIndex].rate;
        setSalesData(updatedSalesData);
      } else {
        setSalesData([
          ...salesData,
          {
            itemId: formData.itemId,
            itemCode: formData.itemCode || 0,
            itemName: formData.itemName || 0,
            mrp: formData.mrp || 0,
            batch: formData.batch || 0,
            pcs: formData.pcs || 1,
            rate: formData.rate || 0,
            currentStock: formData.currentStock || 0,
            volume: formData.volume || 0,
            discount: formData.discount || 0,
            brk: formData.brk || 0,
            split: formData.split || 0,
            amount: formData.amount || 0,
          },
        ]);
      }

      resetMiddleFormData();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleCreateSale = async () => {
    let payload = [];
    const billDateObj = formatDate(formData.billDate);
    const todaysDateObj = formatDate(new Date);

    if (formData.billType === "CREDITBILL" && !formData.customerName) {
      NotificationManager.warning("Customer name is required", "Warning");
      return;
    }

    if (salesData.length === 0) {
      NotificationManager.warning("Enter some item in table.", "Warning");
      itemNameRef.current.focus();
      return;
    }

    if (salesData.length > 0) {
      salesData.forEach((item) => {
        let newPayload = {
          billType: formData.billType,
          customer: formData.customerName._id,
          billSeries: item.group,
          billDate: formData.billDate ? billDateObj : todaysDateObj,
          volume: totalValues.totalVolume,
          totalPcs: totalValues.totalPcs,
          splDisc: totalValues.splDiscount,
          splDiscAmount: totalValues.splDiscAmount,
          grossAmount: totalValues.grossAmt,
          discAmount: totalValues.discountAmt,
          taxAmount: totalValues.taxAmt,
          adjustment: totalValues.adjustment,
          netAmount: totalValues.netAmt,
          receiptAmount: totalValues.receiptAmt,
          receiptMode1: totalValues.receiptMode1,
          receiptMode2: totalValues.receiptMode2,
          salesItem: [
            {
              itemCode: item.itemCode,
              itemId: item.itemId,
              batchNo: item.batch,
              mrp: item.mrp,
              pcs: item.pcs,
              rate: item.rate,
              discount: item.discount,
              amount: item.amount,
              split: item.split,
              break: item.brk,
            },
          ],
        };
        payload.push(newPayload);
      });
    }
    console.log("payload: --> ", payload);

    

    try {
      const response = await createSale(payload);
      console.log("response: ", response);

      if (response.status === 200) {
        console.log("Sale created successfully:", response);
        NotificationManager.success("Sale created successfully", "Success");
        resetTopFormData();
        resetMiddleFormData();
        resetTotalValues();
        setSearchResults([]);
        setSalesData([]);
        setSearchMode(false);
      } else {
        NotificationManager.error(
          "Error creating Sale. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      console.error("Error creating sale:", error);
    }
  };

  const handleItemCodeChange = async (e) => {
    const itemCode = e.target.value;
    setFormData({ ...formData, itemCode: itemCode });
    await itemCodeSearch(itemCode);
    console.log("search result: ", searchResults);

    if (!itemCode) {
      resetMiddleFormData();
    }

    setEditedRow({});
    setEditableIndex(-1);
  };

  const handleCustomerNameChange = (e) => {
    setFormData({ ...formData, customerName: e.target.value });
  };

  console.log("formData: ", formData);

  const handlePcsChange = (e) => {
    const value = e.target.value;
    let pcs = parseFloat(value) || "";
    // if (formData.billType === "CREDITBILL") pcs = parseFloat(value) || "";
    // else pcs = parseFloat(value) || 1;

    const stock = parseFloat(formData.currentStock) || 0;
    if (pcs > stock) {
      NotificationManager.warning(
        `Out of Stock! Currently you have ${
          formData.currentStock || 0
        }pcs in stock.`
      );
      pcsRef.current.focus();
    }
    const rate = parseFloat(formData.rate) || 1;
    const amount = pcs * rate;
    setFormData({ ...formData, pcs, amount });
  };

  const handleRateChange = (e) => {
    const rate = parseFloat(e.target.value) || 1;
    const pcs = parseFloat(formData.pcs) || 1;
    const amount = pcs * rate || 0;
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
    const discount = parseFloat(e.target.value) || 0;
    setFormData({ ...formData, discount });

    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      const totalDiscount = parseFloat(discount) * parseFloat(formData.pcs);
      let newAmount = totalValues.netAmt - totalDiscount || 0;
      if (newAmount < 0) {
        newAmount = 0;
      }
      setTotalValues({ ...totalValues, netAmt: newAmount });
      amountRef.current.focus();
    }
  };

  const handleDiscountKeyDown = (e) => {
    // console.log("handleDiscountKeyDown e: ", e)
    if (e.key === "Enter" || e.key === "Tab") {
      handleDiscountChange(e);
    }
  };

  const calculateGrossAmt = () => {
    let grossAmt = 0;
    salesData.forEach((row) => {
      grossAmt += parseInt(row.amount);
    });
    return grossAmt;
  };

  const handleReceiptModeChange = (e) => {
    const value = e.target.value;
    // const receiptMode2Amt = parseInt(totalValues.receiptAmt)
    setTotalValues({
      ...totalValues,
      receiptMode1: value,
      receiptAmt: parseInt(totalValues.grossAmt) - parseInt(value),
    });
  };

  const calculateNetAmount = () => {

    const totalVolume = salesData.reduce(
      (total, item) =>
        total + (parseFloat(item.volume) || 0) * (parseInt(item.pcs) || 0),
      0
    );

    const totalPcs = salesData.reduce(
      (total, item) => total + (parseInt(item.pcs) || 0),
      0
    );

    const grossAmt = salesData.reduce(
      (total, item) => total + (parseFloat(item.amount) || 0),
      0
    );

    const totalDiscount = salesData.reduce(
      (total, item) => total + parseFloat(item.discount * item.pcs || 0),
      0
    );

    const splDiscAmount =
      (grossAmt * (parseFloat(totalValues.splDiscount) || 0)) / 100;

    const taxAmt = parseFloat(totalValues.taxAmt) || 0;

    const adjustment = parseFloat(totalValues.adjustment) || 0;

    const netAmt = grossAmt - splDiscAmount + taxAmt - adjustment;

    setTotalValues({
      ...totalValues,
      totalVolume: totalVolume.toFixed(2),
      totalPcs: totalPcs,
      grossAmt: grossAmt.toFixed(2),
      receiptMode1: calculateGrossAmt(),
      splDiscAmount: (splDiscAmount + totalDiscount).toFixed(0),
      discountAmt: totalDiscount.toFixed(0),
      netAmt: (netAmt - totalDiscount).toFixed(0),
    });
  };


  useEffect(() => {
    calculateNetAmount();
  }, [
    salesData,
    totalValues.splDiscount,
    totalValues.discountAmt,
    totalValues.taxAmt,
    totalValues.adjustment,
  ]);

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Grid container>
        <Grid item xs={12}>
          <div className="radio-buttons-wrapper">
            <InputLabel htmlFor="billType" sx={{ marginRight: "10px" }}>
              Select Bill Type:
            </InputLabel>
            <RadioGroup
              row
              aria-label="billType"
              name="billType"
              value={formData.billType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billType: e.target.value,
                })
              }
            >
              <FormControlLabel
                value="CASHBILL"
                control={<Radio />}
                label="Cash Bill"
                style={{ marginRight: "20px" }}
              />
              <FormControlLabel
                value="CREDITBILL"
                control={<Radio />}
                label="Credit Bill"
              />
            </RadioGroup>
          </div>
        </Grid>

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
                <MenuItem key={item._id} value={item}>
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
              name="phoneNo"
              className="input-field"
              value={formData.phoneNo}
              onChange={(e) => {
                const value = e.target.value;
                if (!isNaN(value)) setFormData({ ...formData, phoneNo: value });
              }}
            />
          </div>
        </Grid>

        {/* billType == "Cash Bill" */}
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
              disabled={formData.billType === "CREDITBILL" ? true : false}
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
              disabled={billNoEditable ? false : true}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
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
        sx={{ p: 2, boxShadow: 2, borderRadius: 1, marginTop: .5 }}
        className="table-header"
      >
        <Grid container spacing={1}>
          <Grid item xs={1.7}>
            <InputLabel className="input-label-2">Bar Code</InputLabel>
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
              className={`input-field ${
                formData.pcs > formData.currentStock ? "pcs-input" : ""
              }`}
              fullWidth
              value={formData.pcs}
              onChange={handlePcsChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmitIntoDataTable(e);
                  handleEnterKey(e, itemCodeRef);
                }
              }}
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
              onKeyDown={handleDiscountKeyDown}
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
                  handleEnterKey(e, itemCodeRef);
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
                  <TableCell align="center">Closing Stock</TableCell>
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
                        {row?.itemCode || "No Data"}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row?.item[0]?.name || "No Data"}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row?.mrp || 0}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row?.batchNo || 0}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "14px" }}>
                        {row?.currentStock || 0}
                      </TableCell>
                    </TableRow>
                  ))
                ) : isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
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
                      colSpan={6}
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
            ref={tableRef}
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
          marginTop: .5,
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={0.8}>
            <InputLabel className="input-label-2">Vol (ml)</InputLabel>
            <TextField
              inputRef={totalVolRef}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.totalVolume}
              InputProps={{ readOnly: true }}
              onKeyDown={(e) => handleEnterKey(e, totalPcsRef)}
            />
          </Grid>
          <Grid item xs={0.8}>
            <InputLabel className="input-label-2">Total Pcs.</InputLabel>
            <TextField
              inputRef={totalPcsRef}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.totalPcs}
              InputProps={{ readOnly: true }}
              onKeyDown={(e) => handleEnterKey(e, grossAmtRef)}
            />
          </Grid>
          <Grid item xs={1.1}>
            <InputLabel className="input-label-2">Gross Amt. (₹)</InputLabel>
            <TextField
              inputRef={grossAmtRef}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.grossAmt}
              InputProps={{ readOnly: true }}
              onKeyDown={(e) => handleEnterKey(e, rectMode1Ref)}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Rect. Mode 1</InputLabel>
            <TextField
              inputRef={rectMode1Ref}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.receiptMode1}
              onChange={handleReceiptModeChange}
              onKeyDown={(e) => handleEnterKey(e, rectMode2Ref)}
            />
          </Grid>
          <Grid item xs={1.7}>
            <InputLabel className="input-label-2">Rect. Mode 2</InputLabel>
            <TextField
              select
              inputRef={rectMode2Ref}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.receiptMode2}
              onChange={(e) =>
                setTotalValues({ ...totalValues, receiptMode2: e.target.value })
              }
              onKeyDown={(e) => handleEnterKey(e, rectMode2AmtRef)}
            >
              {allLedgers?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Receipt Amt</InputLabel>
            <TextField
              inputRef={rectMode2AmtRef}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.receiptAmt}
              onChange={(e) =>
                setTotalValues({ ...totalValues, receiptAmt: e.target.value })
              }
              onKeyDown={(e) => handleEnterKey(e, sDiscPercentRef)}
            />
          </Grid>
          <Grid item xs={.8}>
            <InputLabel className="input-label-2">S Disc(%)</InputLabel>
            <TextField
              inputRef={sDiscPercentRef}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.splDiscount}
              onChange={(e) =>
                setTotalValues({ ...totalValues, splDiscount: e.target.value })
              }
              onKeyDown={(e) => handleEnterKey(e, sDiscAmtRef)}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">S Disc Amt.</InputLabel>
            <TextField
              inputRef={sDiscAmtRef}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.splDiscAmount}
              InputProps={{ readOnly: true }}
              onKeyDown={(e) => handleEnterKey(e, discAmtRef)}
            />
          </Grid>
          <Grid item xs={1}>
            <InputLabel className="input-label-2">Discount</InputLabel>
            <TextField
              inputRef={discAmtRef}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.discountAmt}
              InputProps={{ readOnly: true }}
              onKeyDown={(e) => handleEnterKey(e, taxAmtRef)}
            />
          </Grid>
          <Grid item xs={.8}>
            <InputLabel className="input-label-2">Tax Amt.</InputLabel>
            <TextField
              inputRef={taxAmtRef}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.taxAmt}
              InputProps={{ readOnly: true }}
              onKeyDown={(e) => handleEnterKey(e, adjustmentRef)}
            />
          </Grid>

          <Grid item xs={.8}>
            <InputLabel className="input-label-2">Adjustment</InputLabel>
            <TextField
              inputRef={adjustmentRef}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.adjustment}
              InputProps={{ readOnly: true }}
              onKeyDown={(e) => handleEnterKey(e, netAmtRef)}
            />
          </Grid>
          <Grid item xs={1.2}>
            <InputLabel className="input-label-2">Net Amount</InputLabel>
            <TextField
              inputRef={netAmtRef}
              variant="outlined"
              className="input-field"
              size="small"
              fullWidth
              value={totalValues.netAmt}
              InputProps={{ readOnly: true }}
              onKeyDown={(e) => handleEnterKey(e, saveButtonRef)}
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
            color="inherit"
            size="medium"
            variant="outlined"
            onClick={(e) => {
              resetTopFormData()
              resetMiddleFormData()
              resetTotalValues()
              setSalesData([])
              handleEnterKey(e, itemCodeRef);
            }}
            sx={{ marginTop: 1, marginRight: 2, borderRadius: 8 }}
          >
            CLEAR
          </Button>
        <Button
          color="success"
          size="medium"
          variant="outlined"
          onClick={() => {}}
          sx={{ marginTop: 1, marginRight: 2, borderRadius: 8 }}
        >
          PREV PAGE
        </Button>
        <Button
          color="secondary"
          size="medium"
          variant="outlined"
          onClick={() => {}}
          sx={{ marginTop: 1, marginRight: 2, borderRadius: 8 }}
        >
          NEXT PAGE
        </Button>

        <Button
          color="primary"
          size="medium"
          variant="outlined"
          onClick={() => {}}
          sx={{ marginTop: 1, marginRight: 2, borderRadius: 8 }}
        >
          EDIT
        </Button>
        <Button
          color="error"
          size="medium"
          variant="contained"
          onClick={() => {}}
          sx={{ marginTop: 1, marginRight: 2, borderRadius: 8 }}
        >
          DELETE
        </Button>
        <Button
          color="warning"
          size="medium"
          variant="contained"
          onClick={() => setBillNoEditable(true)}
          sx={{ marginTop: 1, marginRight: 2, borderRadius: 8 }}
        >
          OPEN
        </Button>
        <Button
          ref={saveButtonRef}
          color="success"
          size="medium"
          variant="contained"
          onClick={handleCreateSale}
          sx={{ marginTop: 1, borderRadius: 8 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateSale();
              handleEnterKey(e, itemCodeRef);
            }
          }}
        >
          SAVE
        </Button>
      </Box>
    </Box>
  );
};

export default SaleBill;
