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
  ThemeProvider,
} from "@mui/material";
import { NotificationManager } from "react-notifications";
import { getAllSuppliers } from "../../../services/supplierService";
import { getAllStores } from "../../../services/storeService";
import {
  createPurchase,
  getAllEntryNo,
  getPurchaseDetailsByEntryNo,
  removePurchaseDetails,
  searchAllPurchasesByItemCode,
  searchAllPurchasesByItemName,
  updatePurchaseDetailsByEntryNo,
} from "../../../services/purchaseService";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import debounce from "lodash.debounce";
import ItemRegisterModal from "./ItemRegisterModal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { customTheme } from "../../../utils/customTheme";
import PurchaseBillPrintModal from "./PurchaseBillPrintModal";
import { useLicenseContext } from "../../../utils/licenseContext";

const PurchaseEntry = () => {
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [itemName, setItemName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [allEntries, setAllEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [entryNumber, setEntryNumber] = useState("");
  const [entryNoEditable, setEntryNoEditable] = useState(true);
  const [showPurchaseBillPrintModal, setShowPurchaseBillPrintModal] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
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

  dayjs.extend(utc);
  dayjs.extend(customParseFormat);
  const { licenseDetails } = useLicenseContext();

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
    otherCharges: "",
    adjustment: "",
    netAmt: "",
  });

  const [editableIndex, setEditableIndex] = useState(-1);
  const [editedRow, setEditedRow] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isRowUpdated, setIsRowUpdated] = useState(false);

  const tableRef = useRef(null);
  const supplierNameRef = useRef(null);
  const passNoRef = useRef(null);
  const passDateRef = useRef(null);
  const storeNameRef = useRef(null);
  const entryNoRef = useRef(null);
  const billNoRef = useRef(null);
  const billDateRef = useRef(null);
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
  const totalMrpRef = useRef(null);
  const sDiscountRef = useRef(null);
  const totalGroRef = useRef(null);
  const totalSPRef = useRef(null);
  const tcsPercentRef = useRef(null);
  const tcsAmtRef = useRef(null);
  const grossAmountRef = useRef(null);
  const totalDiscountRef = useRef(null);
  const otherChargesRef = useRef(null);
  const adjustmentRef = useRef(null);
  const netAmountRef = useRef(null);
  const saveButtonRef = useRef(null);
  const clearButtonRef = useRef(null);

  const handleClosePurchaseBillPrintModal = () => {
    setShowPurchaseBillPrintModal(false);
  };

  const resetTopFormData = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      supplierName: "",
      passNo: "",
      passDate: null,
      address: "",
      billNo: "",
      billDate: null,
      stockIn: "",
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

  const resetTotalValuesData = () => {
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
      otherCharges: "",
      adjustment: "",
      netAmt: "",
    });
  };

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
    setEntryNumber("");
    setEntryNoEditable(true);
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
      otherCharges: "",
      adjustment: "",
      netAmt: "",
    });
    itemCodeRef.current.focus();
  };

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditableIndex(null);
      setEditedRow({});
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { supplierName, passNo, passDate, stockIn, billNo, billDate } =
        formData;
      if (event.keyCode === 120) {
        // 120 F9 key
        
        if (
          supplierName &&
          passNo &&
          passDate &&
          stockIn &&
          billNo &&
          billDate &&
          purchases.length > 0
        )
          handleCreatePurchase();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [formData]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemNameChange = (event) => {
    const itemNameValue = event.target.value;
    
    itemNameSearch(itemNameValue);
    setFormData({
      ...formData,
      itemName: itemNameValue,
    });
    setSearchMode(true);
    if (!itemNameValue) {
      setSearchMode(false);
      resetMiddleFormData();
    }

    setEditedRow({});
    setEditableIndex(-1);
    
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
    if (
      field === "mrp" ||
      field === "case" ||
      field === "pcs" ||
      field === "brk" ||
      field === "purchaseRate" ||
      field === "btlRate" ||
      field === "gro" ||
      field === "sp" ||
      field === "amount"
    ) {
      if (!isValidNumber(value)) {
        return;
      }
    }
  
    const editedRowCopy = { ...editedRow };
    
    editedRowCopy[field] = value;
  
    if (field === "mrp") {
      editedRowCopy.btlRate = editedRowCopy.mrp;
    }
  
    if (field === "case") {
      const newCase = parseFloat(value) || 0;
      
      const newPcsValue = newCase * purchases[index].caseValue || 0;

      editedRowCopy.case = newCase;
      editedRowCopy.pcs = newPcsValue;
    }
  
    if (field === "pcs") {
      const regex = /^\d*\.?\d*$/;
      if (regex.test(value) || value === "") {
        editedRowCopy.case = 0;
        editedRowCopy.pcs = value;
      }
    }
  
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

      const pcs = parseFloat(editedRowCopy.pcs || purchases[index].pcs || 0);
      const caseNo =
        parseFloat(editedRowCopy.case || purchases[index].caseNo || 0);
        

      const gro = parseFloat(editedRowCopy.gro || purchases[index].gro) || 0;
      const sp = parseFloat(editedRowCopy.sp || purchases[index].sp) || 0;
  
      if (parseFloat(caseNo) === 0) {
        amount = (purRate * pcs).toFixed(2);
      } else if (parseFloat(caseNo) > 0) {
        amount = (purRate * parseFloat(caseNo) + gro + sp).toFixed(2);
      }
  
      editedRowCopy.amount = amount;
    }
    
    setEditedRow(editedRowCopy);
  };
  

  const handleEditClick = (index) => {
    setEditableIndex(index);
  };

  const handleSaveClick = (index) => {
    setIsRowUpdated(true);
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
      const response = await getAllSuppliers();
      // console.log("response: ", response)
      if(response.status === 200) {
        setAllSuppliers(response?.data?.data);
      } else {
        setAllSuppliers([])
        NotificationManager.error("No suppliers found.", "Error")
      }
      
    } catch (error) {
      NotificationManager.error(
        "Error fetching suppliers. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllEntries = async () => {
    try {
      const response = await getAllEntryNo();
      // console.log("getAllEntryNo response: ", response);
      if (response.status === 200) {
        setAllEntries(response?.data?.data);
      } else {
        NotificationManager.error("No entry no. found", "Error");
        setAllEntries([]);
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching transfers. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllStores = async () => {
    try {
      const allStoresResponse = await getAllStores();
      // console.log("allStore response: ", allStoresResponse)
      
      if (allStoresResponse.status === 200) {
        setAllStores(allStoresResponse?.data?.data);
      } else {
        NotificationManager.error("No stores found", "Error");
        setAllStores([]);
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching stores. Please try again later.",
        "Error"
      );
      console.error("Error fetching stores:", error);
    }
  };

  const itemNameSearch = debounce(async (item) => {
    try {
      setIsLoading(true);
      const response = await searchAllPurchasesByItemName(item);
      
      if (response?.data?.data) {
        setSearchResults(response?.data?.data);
        
      } else {
        
        setSearchResults([]);
        setIsModalOpen(true);
        setItemName(item);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching items:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const itemCodeSearch = async (itemCode) => {
    try {
      setIsLoading(true);
      const response = await searchAllPurchasesByItemCode(itemCode);
      
      const searchedItem = response?.data?.data;
      

      if (searchedItem) {
        setSearchResults(searchedItem);
        setFormData({
          ...formData,
          itemId: searchedItem.itemId._id,
          itemCode: searchedItem.itemCode || 0,
          itemName: searchedItem.itemId.name || "",
          mrp: searchedItem.mrp || 0,
          batch: searchedItem.batchNo || 0,
          case: searchedItem.case || null,
          caseValue:
            searchedItem.caseValue || searchedItem.itemId.caseValue || 0,
          pcs: searchedItem.pcs || null,
          brk: searchedItem.brk || 0,
          purchaseRate: searchedItem.purchaseRate || 0,
          btlRate: searchedItem.mrp || 0,
          gro: searchedItem.gro || 0,
          sp: searchedItem.sp || 0,
          amount: searchedItem.amount || 0,
        });
        batchRef.current.focus();
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
  };

  const convertToDayjsObject = (dateStr) => {
    return dayjs(dateStr, "DD/MM/YYYY");
  };

  const entryNumberSearch = debounce(async (entryNumber) => {
    
    try {
      if (entryNumber > 0) {
        const response = await getPurchaseDetailsByEntryNo(entryNumber);
        

        if (response?.data?.data) {
          const receivedData = response.data.data;
          // console.log("receivedData > ", receivedData);

          const passDateObject = convertToDayjsObject(receivedData.passDate);
          const billDateObject = convertToDayjsObject(receivedData.billDate);

          setFormData({
            supplierName: receivedData.supplierId?._id,
            passNo: receivedData.passNo,
            passDate: passDateObject,
            stockIn: receivedData.storeId?._id,
            billNo: receivedData.billNo,
            billDate: billDateObject,
          });

          const purchaseItems = receivedData?.purchaseItems;

          const newPurchaseItems = purchaseItems.map((purchase) => ({
            _id: purchase?._id,
            itemId: purchase?.itemId?._id,
            itemCode: purchase?.itemCode,
            itemName: purchase?.itemId?.name,
            mrp: purchase?.mrp,
            batch: purchase?.batchNo,
            case: purchase?.caseNo,
            caseValue: purchase?.itemId?.caseValue,
            pcs: purchase?.pcs,
            brk: purchase?.brokenNo,
            purchaseRate: purchase?.purchaseRate,
            btlRate: purchase?.saleRate,
            gro: purchase?.gro,
            sp: purchase?.sp,
            amount: purchase?.itemAmount,
          }));

          setPurchases([...newPurchaseItems]);

          setTotalValues({
            totalMrp: receivedData.mrpValue,
            totalSDiscount: receivedData.splDisc,
            govtRate: receivedData.govtROff,
            spcPurpose: receivedData.specialPurpose,
            sTax: receivedData.sTaxAmount,
            tcs: receivedData.tcsP,
            tcsAmt: receivedData.tcsAmount,
            grossAmt: receivedData.grossAmount,
            discount: receivedData.discountAmount,
            otherCharges: receivedData.otherCharges,
            adjustment: receivedData.adjustment,
            netAmt: receivedData.netAmount,
          });
        } else {
          resetTopFormData();
          resetMiddleFormData();
          resetTotalValuesData();
          setPurchases([]);
          NotificationManager.error("No purchase details found!");
        }
      }
    } catch (error) {
      resetTopFormData();
      resetMiddleFormData();
      resetTotalValuesData();
      setPurchases([]);
      NotificationManager.error("Error fetching purchase details!");
      console.error("Error fetching items:", error);
    }
  }, 700);

  const handleRowClick = (index) => {
    const selectedRow = searchResults[index];

    
    setFormData({
      ...formData,
      itemId: selectedRow.item._id,
      itemCode: selectedRow.itemCode || "",
      itemName: selectedRow.item.name || 0,
      mrp: selectedRow.mrp || 0,
      batch: selectedRow?.batchNo || "",
      case: selectedRow.case || null,
      caseValue: selectedRow.caseValue || selectedRow.item.caseValue || 0,
      pcs: selectedRow.pcs || null,
      brk: selectedRow.brk || 0,
      purchaseRate: selectedRow.purchaseRate || 0,
      btlRate: selectedRow.mrp || formData.btlRate,
      gro: selectedRow.gro || 0,
      sp: selectedRow.sp || 0,
      amount: selectedRow.amount || 0,
    });

    if (!selectedRow.itemCode) {
      itemCodeRef.current.focus();
    } else {
      batchRef.current.focus();
    }
    
  };

  const handleRemovePurchasesTableRow = (index) => {
    const updatedPurchases = [...purchases];
    updatedPurchases.splice(index, 1);
    setPurchases(updatedPurchases);
  };

  const handleFocusOnSave = () => {
    saveButtonRef.current.focus();
  };
  // console.log("purchases ---> ", purchases);

  const handleEnterKey = (event, nextInputRef) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();

      nextInputRef.current.focus();
    }
  };


  const handleSubmitIntoDataTable = (e) => {
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

    setPurchases([...purchases, { ...formData, btlRate: formData.mrp }]);
    // setPurchases([...purchases, formData]);
    resetMiddleFormData();
    handleEnterKey(e, itemCodeRef);
    setSearchMode(false);
  };

  // Purchase Create
  const handleCreatePurchase = async () => {
    const missingFields = [];

    if (!formData.supplierName) {
      missingFields.push("Supplier Name");
      supplierNameRef.current.focus();
    }

    if (!formData.stockIn) {
      missingFields.push("Store Name");
      storeNameRef.current.focus();
    }

    if (!formData.passNo) {
      missingFields.push("Pass Number");
      passNoRef.current.focus();
    }

    if (!formData.passDate) {
      missingFields.push("Pass Date");
      passDateRef.current.focus();
    }

    if (!formData.billNo) {
      missingFields.push("Bill Number");
      billNoRef.current.focus();
    }

    if (!formData.billDate) {
      missingFields.push("Bill Date");
      billDateRef.current.focus();
    }

    if (purchases.length === 0) {
      missingFields.push("Item Purchase");
      itemCodeRef.current.focus();
    }

    if (missingFields.length > 0) {
      const missingFieldsMessage = missingFields.join(", ");
      NotificationManager.warning(
        `Please fill in the necessary details for: ${missingFieldsMessage}.`,
        "Warning"
      );
      return;
    }

    const passDateObj = formatDate(formData.passDate);
    const billDateObj = formatDate(formData.billDate);

    const payload = {
      supplierId: formData.supplierName,
      storeId: formData.stockIn,
      passNo: formData.passNo,
      passDate: passDateObj,
      billNo: formData.billNo,
      billDate: billDateObj,
      mrpValue: parseFloat(totalValues.totalMrp) || 0,
      splDisc: parseFloat(totalValues.totalSDiscount) || 0,
      govtROff: parseFloat(totalValues.govtRate) || 0,
      specialPurpose: parseFloat(totalValues.spcPurpose) || 0,
      tcsP: parseFloat(totalValues.tcs) || 1,
      tcsAmount: parseFloat(totalValues.tcsAmt) || 0,
      grossAmount: parseFloat(totalValues.grossAmt) || 0,
      discount: parseFloat(totalValues.discount) || 0,
      taxAmount: parseFloat(totalValues.taxAmt) || 0,
      adjustment: parseFloat(totalValues.adjustment) || 0,
      netAmount: parseFloat(totalValues.netAmt) || 0,
      otherCharges: parseInt(totalValues.otherCharges) || 0,
      purchaseItems: purchases.map((item) => ({
        itemCode: item.itemCode.toString(),
        itemId: item.itemId,
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
      const response = await createPurchase(payload);

      if (response.status === 200) {
        setEntryNumber("");
        NotificationManager.success("Purchase created successfully", "Success");
        setEntryNumber(response?.data?.data?.purchase?.entryNo);
        clearButtonRef.current.focus();
        setSearchMode(false);
      } else if (response.response.status === 400) {

        const errorMessage = response.response.data.message;
        NotificationManager.error(errorMessage, "Error");
      } else {
        NotificationManager.error(
          "Error creating Purchase. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error creating Purchase. Please try again later.",
        "Error"
      );
      console.error("Error creating purchase:", error);
    }
  };

  // Purchase update:
  const handleUpdatePurchase = async () => {
    const missingFields = [];

    if (!formData.supplierName) {
      missingFields.push("Supplier Name");
    }

    if (!formData.stockIn) {
      missingFields.push("Store Name");
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
        "Warning"
      );
      return;
    }

    const passDateObj = formatDate(formData.passDate);
    const billDateObj = formatDate(formData.billDate);

    const payload = {
      supplierId: formData.supplierName,
      storeId: formData.stockIn,
      passNo: formData.passNo,
      passDate: passDateObj,
      billNo: formData.billNo,
      billDate: billDateObj,
      mrpValue: parseFloat(totalValues.totalMrp) || 0,
      splDisc: parseFloat(totalValues.totalSDiscount) || 0,
      govtROff: parseFloat(totalValues.govtRate) || 0,
      specialPurpose: parseFloat(totalValues.spcPurpose) || 0,
      tcsP: parseFloat(totalValues.tcs) || 1,
      tcsAmount: parseFloat(totalValues.tcsAmt) || 0,
      grossAmount: parseFloat(totalValues.grossAmt) || 0,
      discount: parseFloat(totalValues.discount) || 0,
      taxAmount: parseFloat(totalValues.taxAmt) || 0,
      adjustment: parseFloat(totalValues.adjustment) || 0,
      netAmount: parseFloat(totalValues.netAmt) || 0,
      otherCharges: parseInt(totalValues.otherCharges) || 0,
      purchaseItems: purchases.map((item) => ({
        _id: item._id,
        itemCode: item.itemCode.toString(),
        itemId: item.itemId,
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
      if (entryNumber && !entryNoEditable) {

        const response = await updatePurchaseDetailsByEntryNo(
          payload,
          entryNumber
        );

        
        if (response.status === 200) {
          NotificationManager.success(
            "Purchase updated successfully",
            "Success"
          );
          setSearchMode(false);
        } else if (response.response.status === 400) {

          const errorMessage = response.response.data.message;
          NotificationManager.error(errorMessage, "Error");
        } else {
          NotificationManager.error(
            "Error creating Purchase. Please try again later.",
            "Error"
          );
        }
      }
    } catch (error) {
      NotificationManager.error(
        "Error creating Purchase. Please try again later.",
        "Error"
      );
      console.error("Error creating purchase:", error);
    }
  };

  // Purchase delete
  const handleDeletePurchase = async () => {
    try {
      if (!entryNoEditable && entryNumber) {
        const response = await removePurchaseDetails(entryNumber);

        NotificationManager.success(
          "Purchase deleted successfully.",
          "Success"
        );
        resetTopFormData();
        resetMiddleFormData();
        resetTotalValuesData();
        setEntryNumber("");
        setEntryNoEditable(true);
        resetMiddleFormData();
        setPurchases([]);
        setEditedRow({});
        setSelectedRowIndex(null);
        setSearchMode(false);
        setEditableIndex(-1);
      } else {
        // if (!entryNoEditable && entryNumber) {
        //   NotificationManager.warning(
        //     "Entry No field is disabled.",
        //     "Please click on Open Button first"
        //   );
        // }
        // if (entryNoEditable && !entryNumber) {
        //   NotificationManager.warning("Please input something in Entry No. field.")
        // }
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting Purchase. Please try again later.",
        "Error"
      );
      console.log(error);
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
    
    const pcs = parseFloat(formData.caseValue) || 1;
    
    let newPurchaseRate = 0;

    if (pcs !== 0) {
      newPurchaseRate = parseFloat(newAmountValue / pcs);
      
    }

    setFormData({
      ...formData,
      amount: newAmountValue.toString(),
      purchaseRate: newPurchaseRate.toString(),
    });
    
  };

  const handleCaseChange = (event) => {
    const newCase = parseFloat(event.target.value) || 0;
    
    const newPcsValue = newCase * parseFloat(formData.caseValue) || 0;
    
    setFormData({
      ...formData,
      case: newCase,
      pcs: newPcsValue,
    });
  };

  const handlePcsChanges = (e) => {
    const regex = /^\d*\.?\d*$/;
    if (regex.test(e.target.value) || e.target.value === "") {
      setFormData({ ...formData, case: 0, pcs: e.target.value });
    }
  };

  const handleGROChange = (event) => {
    const newGROValue =
      event.target.value === "" ? "" : parseFloat(event.target.value);
    if (!isNaN(newGROValue) || event.target.value === "") {
      setFormData({ ...formData, gro: event.target.value });
    }
  };

  const handleSPChange = (event) => {
    const newSPValue =
      event.target.value === "" ? "" : parseFloat(event.target.value);
    if (!isNaN(newSPValue) || event.target.value === "") {
      setFormData({ ...formData, sp: event.target.value });
    }
  };

  const handleDiscountChange = (event) => {
    const discount = parseFloat(event.target.value);
    setTotalValues((prevValues) => ({ ...prevValues, discount }));
  };

  const handleSDiscountChange = (event) => {
    const sDiscount = parseFloat(event.target.value) || 0;
    setTotalValues({ ...totalValues, totalSDiscount: sDiscount });
  };

  const handleGovtRateChange = (event) => {
    const govtRate =
      event.target.value === "" ? "" : parseFloat(event.target.value);
      

    if (!isNaN(govtRate) || event.target.value === "") {
      setTotalValues((prevValues) => ({
        ...prevValues,
        govtRate: event.target.value,
      }));
    }
  };

  const handleSpcPurchasesChange = (event) => {
    const spcPurpose =
      event.target.value === "" ? "" : parseFloat(event.target.value);
      

    if (!isNaN(spcPurpose) || event.target.value === "") {
      setTotalValues((prevValues) => ({
        ...prevValues,
        spcPurpose: event.target.value,
      }));
    }
  };

  const handlePurchaseOpen = () => {
    entryNoRef.current.focus();
    setEntryNoEditable(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate;
  };

  const handlePassDateChange = (date) => {
    setFormData({ ...formData, passDate: date });
  };

  const handleBillDateChange = (date) => {
    setFormData({ ...formData, billDate: date });
  };

  useEffect(() => {
    fetchAllSuppliers();
    fetchAllStores();
  }, []);

  useEffect(() => { fetchAllEntries() },[entryNumber, entryNoEditable]);

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
            itemId: selectedRow.item._id,
            itemCode: selectedRow.itemCode || "",
            itemName: selectedRow.item.name || 0,
            mrp: selectedRow.mrp || 0,
            batch: selectedRow.batchNo || "",
            case: selectedRow.case || null,
            caseValue: selectedRow.item.caseValue || 0,
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
          if (!selectedRow.itemCode) {
            itemCodeRef.current.focus();
          } else {
            batchRef.current.focus();
          }
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
    
  }, [formData.amount, purchases]);

  useEffect(() => {
    const grossAmount = purchases.reduce(
      (total, purchase) => total + parseFloat(purchase.amount),
      0
    );
    const sDiscount = parseFloat(totalValues.totalSDiscount) || 0;
    const grossAmt = grossAmount - sDiscount;

    const tcsPercentage = parseFloat(totalValues.tcs) || 1;
    const tcsAmt = (grossAmt * tcsPercentage) / 100;

    const govtRate = parseFloat(totalValues.govtRate) || 0;
    const spcPurpose = parseFloat(totalValues.spcPurpose) || 0;
    let netAmt = grossAmt + govtRate + spcPurpose;
    netAmt += tcsAmt;
    setTotalValues((prevValues) => ({ ...prevValues, grossAmt, netAmt }));
  }, [
    purchases,
    totalValues.grossAmt,
    totalValues.totalSDiscount,
    totalValues.govtRate,
    totalValues.tcs,
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
    // Calculating total government round off
    const totalGro = purchases.reduce((total, item) => {
      const gro = parseFloat(item.gro) || 0;
      const pcs = parseFloat(item.pcs) || 0;
      return total + gro * pcs;
    }, 0);

    // Calculating total special purpose
    const totalSP = purchases.reduce((total, item) => {
      const sp = parseFloat(item.sp) || 0;
      const pcs = parseFloat(item.pcs) || 0;
      return total + sp * pcs;
    }, 0);

    // Updating total special purpose and gro in totalValues
    if (!entryNumber || isRowUpdated) {
      
      if (totalGro) {
        setTotalValues((prevValues) => ({
          ...prevValues,
          govtRate: totalGro.toFixed(2),
        }));
      }
      if (totalSP) {
        setTotalValues((prevValues) => ({
          ...prevValues,
          spcPurpose: totalSP.toFixed(2),
        }));
      }
    }
  }, [purchases]);

  useEffect(() => {
    if (passDateRef.current) {
      passDateRef.current.addEventListener("keydown", (e) =>
        handleEnterKey(e, storeNameRef)
      );
    }
    if (billDateRef.current) {
      billDateRef.current.addEventListener("keydown", (e) =>
        handleEnterKey(e, itemCodeRef)
      );
    }
  }, []);

  const handleItemCodeChange = (e) => {
    const itemCode = e.target.value;
    setFormData({ ...formData, itemCode });

    // if (!itemCode) {
    //   resetMiddleFormData();
    // }

    setEditedRow({});
    setEditableIndex(-1);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await itemCodeSearch(e.target.value);
    }
  };

  const handleEntryNumberChange = (e) => {
    const value = e.target.value;
    
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value) || value === "") {
      setEntryNumber(value);
    }
  };

  const handlePreviousEntryChange = () => {
    
    if (entryNumber && !entryNoEditable)
      setEntryNumber(parseInt(entryNumber) - 1);
  };

  const handleNextEntryChange = () => {
    if (entryNumber && !entryNoEditable)
      setEntryNumber(parseInt(entryNumber) + 1);
  };

  useEffect(() => {
    if (entryNumber > 0 && !entryNoEditable) {
      entryNumberSearch(entryNumber);
    }
  }, [entryNumber]);

  const handleCreatePurchaseKeyDown = (e) => {
    if (!entryNumber) {
      if (e.key === "Enter") {
        handleCreatePurchase(e);
      }
    } else {
      if (e.key === "Enter") {
        handleUpdatePurchase();
        handleEnterKey(e, clearButtonRef);
      }
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box component="form" sx={{ p: 2, width: "900px" }}>
        <Grid container>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="supplierName"
                className="input-label"
                required
              >
                Supplier Name :
              </InputLabel>
              <TextField
                select
                fullWidth
                inputRef={supplierNameRef}
                id="supplierName"
                size="small"
                type="text"
                className="input-field"
                value={formData.supplierName}
                onChange={handleSupplierNameChange}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  },
                }}
                onKeyDown={(e) => handleEnterKey(e, passNoRef)}
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
              <InputLabel htmlFor="passNo" className="input-label" required>
                Pass No :
              </InputLabel>
              <TextField
                inputRef={passNoRef}
                id="passNo"
                size="small"
                className="input-field"
                value={formData.passNo}
                onChange={(e) =>
                  setFormData({ ...formData, passNo: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, passDateRef)}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="passDate" className="input-label" required>
                Pass Date :
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  inputRef={passDateRef}
                  id="passDate"
                  format="DD/MM/YYYY"
                  value={formData.passDate}
                  className="input-field date-picker"
                  onChange={handlePassDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  onKeyDown={(e) => handleEnterKey(e, storeNameRef)}
                />
              </LocalizationProvider>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="stockIn"
                className="input-label store-adjustment"
                required
              >
                Store Name :
              </InputLabel>
              <TextField
                select
                inputRef={storeNameRef}
                id="stockIn"
                size="small"
                className="input-field"
                value={formData.stockIn}
                onChange={handleStockInChange}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  },
                }}
                onKeyDown={(e) => handleEnterKey(e, billNoRef)}
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
              <InputLabel htmlFor="entryNo" className="input-label">
                Entry No :
              </InputLabel>
              <TextField
                select
                inputRef={entryNoRef}
                id="entryNo"
                size="small"
                className="input-field"
                value={entryNumber}
                disabled={entryNoEditable}
                onChange={handleEntryNumberChange}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  },
                }}
                onKeyDown={(e) => handleEnterKey(e, billNoRef)}
              >
                {allEntries?.map((entry) => (
                  <MenuItem key={entry._id} value={entry.entryNo}>
                    {`${entry.entryNo}`}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="billNo" className="input-label" required>
                Bill No :
              </InputLabel>
              <TextField
                inputRef={billNoRef}
                id="billNo"
                size="small"
                className="input-field"
                value={formData.billNo}
                onChange={(e) => {
                  setFormData({ ...formData, billNo: e.target.value });
                }}
                onKeyDown={(e) => handleEnterKey(e, billDateRef)}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="billDate" className="input-label" required>
                Bill Date :
              </InputLabel>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  inputRef={billDateRef}
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

          <Grid item xs={3}>
            <Button
              color="inherit"
              size="medium"
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              sx={{
                float: "right",
                borderRadius: 8,
                padding: "4px 14px",
                fontSize: "12px",
              }}
            >
              CREATE ITEM
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{ p: 1.5, boxShadow: 2, borderRadius: 1, marginTop: 0.5 }}
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
                onKeyDown={handleKeyDown}
                // onKeyDown={(e) => handleEnterKey(e, itemNameRef)}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Tab") {
                    if (
                      purchases.length > 0 &&
                      formData.itemCode.trim() === "" &&
                      formData.itemName.trim() === ""
                    ) {
                      handleEnterKey(e, totalGroRef);
                    } else if (!formData.itemCode) {
                      handleEnterKey(e, itemCodeRef);
                    } else {
                      handleEnterKey(e, mrpRef);
                    }
                  }
                }}
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
                value={formData.mrp}
                onChange={(e) => {
                  const regex = /^\d*\.?\d*$/;
                  if (regex.test(e.target.value) || e.target.value === "") {
                    setFormData({ ...formData, btlRate: e.target.value });
                  }
                }}
                onKeyDown={(e) => handleEnterKey(e, groRef)}
              />
            </Grid>
            <Grid item xs={0.9}>
              <InputLabel className="input-label-2">GRO</InputLabel>
              <TextField
                fullWidth
                size="small"
                inputRef={groRef}
                className="input-field"
                value={formData.gro}
                onChange={handleGROChange}
                inputProps={{ pattern: "^\\d*\\.?\\d*$" }}
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
                inputProps={{ pattern: "^\\d*\\.?\\d*$" }}
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
                InputProps={{ readOnly: true }}
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
                marginTop: 0.8,
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
              <Table size="small">
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
                              ? "rgba(25, 118, 210, 0.2) !important"
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
                          {row?.item?.name || "No Data"}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.mrp || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.batchNo || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.item?.caseValue || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.purchaseRate || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.saleRate || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.gro || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.sp || 0}
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
              <Table size="small">
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
                            readOnly
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
                            readOnly
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
            p: 1.2,
            marginTop: 1,
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={1.2}>
              <InputLabel className="input-label-2">MRP Value</InputLabel>
              <TextField
                inputRef={totalMrpRef}
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={totalValues.totalMrp}
                InputProps={{ readOnly: true }}
                // onChange={handleTotalMRPChanges}
                onKeyDown={(e) => handleEnterKey(e, sDiscountRef)}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">S. Discount</InputLabel>
              <TextField
                inputRef={sDiscountRef}
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={totalValues.totalSDiscount}
                onChange={handleSDiscountChange}
                onKeyDown={(e) => handleEnterKey(e, totalGroRef)}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Govt. Rate Off</InputLabel>
              <TextField
                inputRef={totalGroRef}
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={totalValues.govtRate}
                onChange={handleGovtRateChange}
                inputProps={{ pattern: "^\\d*\\.?\\d*$" }}
                onKeyDown={(e) => handleEnterKey(e, totalSPRef)}
              />
            </Grid>
            <Grid item xs={1.2}>
              <InputLabel className="input-label-2">
                Special Purposes
              </InputLabel>
              <TextField
                inputRef={totalSPRef}
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={totalValues.spcPurpose}
                onChange={handleSpcPurchasesChange}
                inputProps={{ pattern: "^\\d*\\.?\\d*$" }}
                onKeyDown={(e) => handleEnterKey(e, tcsPercentRef)}
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">Tcs(%)</InputLabel>
              <TextField
                inputRef={tcsPercentRef}
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={totalValues.tcs || 1}
                // onChange={handleTcsChange}
                InputProps={{ readOnly: true }}
                onKeyDown={(e) => handleEnterKey(e, tcsAmtRef)}
              />
            </Grid>
            <Grid item xs={1.1}>
              <InputLabel className="input-label-2">Tcs Amt.</InputLabel>
              <TextField
                inputRef={tcsAmtRef}
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={parseFloat(totalValues.tcsAmt).toFixed(2)}
                InputProps={{ readOnly: true }}
                onKeyDown={(e) => handleEnterKey(e, grossAmountRef)}
              />
            </Grid>
            <Grid item xs={1.2}>
              <InputLabel className="input-label-2">Gross Amt.</InputLabel>
              <TextField
                inputRef={grossAmountRef}
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={parseFloat(totalValues.grossAmt).toFixed(2)}
                InputProps={{ readOnly: true }}
                onKeyDown={(e) => handleEnterKey(e, totalDiscountRef)}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel className="input-label-2">Discount(%)</InputLabel>
              <TextField
                inputRef={totalDiscountRef}
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={totalValues.discount}
                onChange={handleDiscountChange}
                onKeyDown={(e) => handleEnterKey(e, otherChargesRef)}
              />
            </Grid>
            <Grid item xs={1.2}>
              <InputLabel className="input-label-2">Other Charges</InputLabel>
              <TextField
                inputRef={otherChargesRef}
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={totalValues.otherCharges}
                InputProps={{ readOnly: true }}
                onKeyDown={(e) => handleEnterKey(e, adjustmentRef)}
              />
            </Grid>
            <Grid item xs={1.1}>
              <InputLabel className="input-label-2">Adjustment</InputLabel>
              <TextField
                inputRef={adjustmentRef}
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={totalValues.adjustment}
                InputProps={{ readOnly: true }}
                // onChange={handleAdjustmentChange}
                onKeyDown={(e) => handleEnterKey(e, netAmountRef)}
              />
            </Grid>
            <Grid item xs={1.2}>
              <InputLabel className="input-label-2">Net Amount</InputLabel>
              <TextField
                inputRef={netAmountRef}
                type="text"
                size="small"
                className="input-field"
                fullWidth
                value={parseFloat(totalValues.netAmt).toFixed(2)}
                InputProps={{ readOnly: true }}
                onKeyDown={(e) => {
                  handleEnterKey(e, saveButtonRef);
                  // handleFocusOnSave();
                }}
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
          <ItemRegisterModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            itemName={itemName}
            setItemName={setItemName}
          />
          <Button
            ref={clearButtonRef}
            color="inherit"
            size="small"
            variant="outlined"
            onClick={(e) => {
              clearAllFields();
              handleEnterKey(e, itemCodeRef);
            }}
            sx={{
              marginTop: 1,
              marginRight: 1,
              padding: "4px 10px",
              fontSize: "11px",
            }}
          >
            CLEAR
          </Button>

          <Button
            color="success"
            size="small"
            variant="outlined"
            onClick={handlePreviousEntryChange}
            sx={{
              marginTop: 1,
              marginRight: 1,
              padding: "4px 10px",
              fontSize: "11px",
            }}
          >
            PREV BILL
          </Button>
          <Button
            color="secondary"
            size="small"
            variant="outlined"
            onClick={handleNextEntryChange}
            sx={{
              marginTop: 1,
              marginRight: 1,
              padding: "4px 10px",
              fontSize: "11px",
            }}
          >
            NEXT BILL
          </Button>

          <Button
            color="error"
            size="small"
            variant="contained"
            onClick={handleDeletePurchase}
            sx={{
              marginTop: 1,
              marginRight: 1,
              padding: "4px 10px",
              fontSize: "11px",
            }}
          >
            DELETE
          </Button>
          <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={handlePurchaseOpen}
            sx={{
              marginTop: 1,
              marginRight: 1,
              padding: "4px 10px",
              fontSize: "11px",
            }}
          >
            OPEN
          </Button>
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={() => {
              setShowPurchaseBillPrintModal(true);
            }}
            sx={{
              marginTop: 1,
              marginRight: 1,
              padding: "4px 10px",
              fontSize: "11px",
            }}
          >
            PRINT
          </Button>
          <Button
            ref={saveButtonRef}
            color="success"
            size="small"
            variant="contained"
            onClick={() => {
              if (!entryNumber) handleCreatePurchase();
              else handleUpdatePurchase();
            }}
            sx={{
              marginTop: 1,
              padding: "4px 10px",
              fontSize: "11px",
            }}
            onKeyDown={handleCreatePurchaseKeyDown}
          >
            SAVE
          </Button>
        </Box>
      </Box>
      <PurchaseBillPrintModal
        open={showPurchaseBillPrintModal}
        handleClose={handleClosePurchaseBillPrintModal}
        purchases={purchases}
        formData={formData}
        totalValues={totalValues}
        licenseDetails={licenseDetails}
      />
    </ThemeProvider>
  );
};

export default PurchaseEntry;
