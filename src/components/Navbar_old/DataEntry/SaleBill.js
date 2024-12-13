// saleBill

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { toWords } from "number-to-words";
import { getAllCustomer } from "../../../services/customerService";
import { NotificationManager } from "react-notifications";
import debounce from "lodash.debounce";
import {
  createSale,
  getAllBillsBySeries,
  getAllBrandWiseItems,
  getAllSaleStores,
  getSaleDetailsByEntryNo,
  removeSaleDetails,
  searchAllSalesByItemCode,
  searchAllSalesByItemName,
  updateSaleDetailsByBillNo,
} from "../../../services/saleBillService";
import { getAllLedgers } from "../../../services/ledgerService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { utc } from "dayjs";
import { customTheme } from "../../../utils/customTheme";
import { useLicenseContext } from "../../../utils/licenseContext";
import SaleBillPrintModal from "./SaleBillPrintModal";
import { useReactToPrint } from "react-to-print";
import { getLicenseInfo } from "../../../services/licenseService";
import SaleBrandPanel from "./SaleBrandPanel";
import SalebillSearchTable from "./SalebillSearchTable";
import SalebillDataTable from "./SalebillDataTable";
import socketService from "../../../utils/socket";
import { usePermissions } from "../../../utils/PermissionsContext";

const SaleBill = () => {
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [allLedgers, setAllLedgers] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const todaysDate = dayjs();
  const [searchMode, setSearchMode] = useState(false);
  const [formData, setFormData] = useState({
    billType: "CASHBILL",
    customerName: "",
    store: allStores.length > 0 ? allStores[0] : { _id: "", name: "" },
    phoneNo: "",
    address: "",
    series: "",
    billno: "",
    billDate: todaysDate,
    itemId: "",
    itemDetailsId: "",
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
    stockAt: "",
  });
  const [billNumber, setBillNumber] = useState("");
  const [editableIndex, setEditableIndex] = useState(-1);
  const [editedRow, setEditedRow] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [billNoEditable, setBillNoEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [seriesData, setSeriesData] = useState([]);
  const [seriesEditable, setSeriesEditable] = useState(false);
  const [totalValues, setTotalValues] = useState({
    totalVolume: "",
    flBeerVolume: "",
    imlVolume: "",
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
  const [isSplitPrinted, setIsSplitPrinted] = useState(false);
  const [brandPanelLoading, setBrandPanelLoading] = useState(false);
  const [brandWiseItemData, setBrandWiseItemData] = useState([]);
  const [brandName, setBrandName] = useState("");
  // const { licenseDetails, setLicenseDetails } = useLicenseContext();
  const [licenseDetails, setLicenseDetails] = useState({});
  const [hasItems, setHasItems] = useState(false);
  // console.log("lc",licenseDetails)
  const [totalSales, setTotalSales] = useState(0);
  const [totalCash, setTotalCash] = useState(0);
  const [totalOnline, setTotalOnline] = useState(0);

  const [printData, setPrintData] = useState([]);
  const [printTotalValues, setPrintTotalValues] = useState([]);
  const [isAutoBillPrint, setIsAutoBillPrint] = useState(false);
  const [isSaveAndPrintClicked, setIsSaveAndPrintClicked] = useState(false);
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [noMoreData, setNoMoreData] = useState(false);
  // console.log("isAutoBillPrint", isAutoBillPrint)

  const tableRef = useRef(null);
  const customerNameRef = useRef(null);
  const addressRef = useRef(null);
  const phoneNoRef = useRef(null);
  const billNoRef = useRef(null);
  const billDateRef = useRef(null);
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
  const flBeerVolRef = useRef(null);
  const imlVolRef = useRef(null);
  const totalPcsRef = useRef(null);
  const grossAmtRef = useRef(null);
  const rectMode1Ref = useRef(null);
  const rectMode2Ref = useRef(null);
  const rectMode2AmtRef = useRef(null);
  const sDiscPercentRef = useRef(null);
  const sDiscAmtRef = useRef(null);
  const discAmtRef = useRef(null);
  const storeNameRef = useRef(null);
  const adjustmentRef = useRef(null);
  const netAmtRef = useRef(null);
  const saveButtonRef = useRef(null);
  const printModalRef = useRef(null);
  const pcsEditRef = useRef(null);
  const { permissions, role } = usePermissions();

  const companyPermissions =
    permissions?.find((permission) => permission.moduleName === "Sales")
      ?.permissions || [];
  const canCreate = companyPermissions.includes("create");
  const canRead = companyPermissions.includes("read");
  const canUpdate = companyPermissions.includes("update");
  const canDelete = companyPermissions.includes("delete");

  const handlePrint = useReactToPrint({
    content: () => printModalRef.current,
  });

  const handleSaveAndPrint = () => {
    if (salesData.length > 0 && !billNumber && !billNoEditable) 
      setIsSaveAndPrintClicked(true);
      handleCreateSale();
  }

  const fetchLicenseData = async () => {
    try {
      const response = await getLicenseInfo();
      // console.log("lic response ---> ", response);

      if (response.statusCode === 200) {
        const licenseData = response?.data[0];
        setLicenseDetails({
          id: licenseData._id,
          nameOfLicence: licenseData.nameOfLicence,
          businessType: licenseData.businessType,
          address: licenseData.address,
          district: licenseData.district,
          phoneNo: licenseData.phoneNo,

          fiancialPeriodTo: licenseData.fiancialPeriodTo,
          fiancialPeriodfrom: licenseData.fiancialPeriodfrom,
          licenceId: licenseData.licenceId,
          billCategory: licenseData.billCategory,
          noOfBillCopies: licenseData.noOfBillCopies,

          autoBillPrint: licenseData.autoBillPrint,
          eposUserId: licenseData.eposUserId,
          eposPassword: licenseData.eposPassword,
          noOfItemPerBill: licenseData.noOfItemPerBill,
          perBillMaxWine: licenseData.perBillMaxWine,
          perBillMaxCs: licenseData.perBillMaxCs,

          billMessages: licenseData.billMessages,
          messageMobile: licenseData.messageMobile,
        });
      }

      if (response?.response?.status === 400) {
        setLicenseDetails([]);
        // NotificationManager.error("No License Data Found", "Error");
        console.log("No License Found", "Error");
      }
    } catch (error) {
      console.log(error);
      // NotificationManager.error(
      //   "Error fetching license. Please try again later.",
      //   "Error"
      // );
    }
  };

  const fetchAllStores = async () => {
    try {
      const response = await getAllSaleStores();
      // console.log("sale-stores response: ",response)
      if (response.status === 200) {
        setAllStores(response?.data?.data);

        if (response?.data?.data.length > 0 && formData.store._id === "") {
          setFormData({ ...formData, store: response.data.data[0] });
        }
      } else {
        setAllStores([]);
        // NotificationManager.error("No Stores Found", "Error");
        console.log("No Stores Found", "Error");
      }
    } catch (err) {
      // NotificationManager.error("Failed to fetch all stores", "Error");
      console.log(err);
    }
  };

  const fetchAllCustomers = async () => {
    try {
      const allCustomerResponse = await getAllCustomer();
      // console.log("Fetching all customers: ", allCustomerResponse)
      if (allCustomerResponse.status === 200) {
        setAllCustomerData(allCustomerResponse?.data?.data);
      } else {
        setAllCustomerData([]);
        // NotificationManager.error("No Customers Found", "Error");
        console.log("No Customers Found", "Error");
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching customers. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching customers:", error);
    }
  };

  const fetchAllLedger = async () => {
    try {
      const allLedgerResponse = await getAllLedgers();
      // console.log("allLedger response: ", allLedgerResponse);
      if (allLedgerResponse.status === 200) {
        setAllLedgers(allLedgerResponse?.data?.data);
      }
      if (allLedgerResponse?.response?.status === 400) {
        setAllLedgers([]);
        // NotificationManager.error("No Ledgers Found", "Error");
        console.log("No Ledgers Found", "Error");
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching ledgers. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching ledgers:", error);
    }
  };

  const fetchAllBills = async () => {
    try {
      const allBills = await getAllBillsBySeries(formData.series);
      if (allBills.status === 200) {
        setSeriesData(allBills?.data?.data);
      } else if (allBills.status === 404) {
        // NotificationManager.error("No bills found", "Error");
        // setSeriesData([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching bills. Please try again later.",
      //   "Error"
      // );
      setSeriesData([]);
      console.error("Error fetching bills:", error);
    }
  };

  const fetchAllBrandWiseItems = async () => {
    setBrandPanelLoading(true);
    // console.log("Fetching data...");
    try {
      const filterOptions = {
        storeName: formData.store.name,
        brandName,
      };
      const response = await getAllBrandWiseItems(filterOptions);
      // console.log("BrandWiseItemData response ---> ", response?.data?.data);
      if (response.status === 200) {
        setBrandWiseItemData(response?.data?.data);
      } else {
        // NotificationManager.error("No items found.", "Error");
        setBrandWiseItemData([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching items. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching items:", error);
    } finally {
      setBrandPanelLoading(false);
      // console.log("Data fetching completed.");
    }
  };

  useEffect(() => {
    if (seriesEditable) fetchAllBills();
  }, [formData.series]);

  const isValidNumber = (value) => {
    return !isNaN(value) && parseFloat(value) >= 0;
  };

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditableIndex(null);
      setEditedRow({});
    }
  };

  const handleStoreChange = (event) => {
    const selectedStoreId = event.target.value;
    const selectedStore = allStores.find(
      (store) => store._id === selectedStoreId
    );

    if (selectedStore) {
      setFormData({ ...formData, store: selectedStore });
      sessionStorage.setItem("storeName", selectedStore._id);
    }
  };

  const resetTopFormData = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      billType: "CASHBILL",
      customerName: "",
      address: "",
      phoneNo: "",
      billDate: todaysDate,
      // series: "",
    }));
  };

  const resetMiddleFormData = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      itemId: "",
      itemDetailsId: "",
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
      volume: "",
      currentStock: "",
      group: "",
      stockAt: "",
    }));
  };

  const resetTotalValues = () => {
    setTotalValues((prevData) => ({
      ...prevData,
      totalVolume: "",
      flBeerVolume: "",
      imlVolume: "",
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

  const printModalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90mm",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
    textAlign: "center",
    display: 'none'
  };

  const itemNameSearch = debounce(
    async (itemName, storeName, page, pageSize) => {
      try {
        setIsLoading(true);
        const response = await searchAllSalesByItemName(itemName, storeName, page, pageSize);
  
        if (response?.data?.data?.items?.length > 0) {
          
          setSearchResults((prevResults) =>
            page === 1 ? response?.data?.data?.items : [...prevResults, ...response?.data?.data?.items]
          );
        }

        if (response.data.data?.items?.length === 0) {
          setNoMoreData(true); 
        }

      } catch (error) {
        console.error("Error searching items:", error);
      } finally {
        setIsLoading(false);
      }
    },
    500
  );  

  const itemCodeSearch = async (itemCode, storeName) => {
    if (isLoading) {
      console.log("Scan in progress, skipping duplicate scan.");
      return;
    }
  
    if (!itemCode || itemCode.trim().length === 0) {
      console.warn("Invalid or empty item code.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await searchAllSalesByItemCode(itemCode, storeName);
      const items = response?.data?.data || [];

      if (!items.length) {
        NotificationManager.warning("No matching items found.");
        return;
      }

      // Calculating the total pcs already used in salesData for each item
      const pcsUsed = salesData.reduce((acc, item) => {
        const key = `${item.itemCode}-${item.mrp}-${item.batch}`;
        acc[key] = (acc[key] || 0) + item.pcs;
        return acc;
      }, {});

      // Finding the first item with sufficient currentStock
      const searchedItem = items.find((item) => {
        const key = `${item.itemCode}-${item.mrp}-${item.batchNo}`;
        const usedPcs = pcsUsed[key] || 0;
        return item.currentStock > usedPcs;
      });

      // if a searchedItem doesnt have currentStock
      if (!searchedItem) {
        NotificationManager.warning("No items with stock available.");
        setIsLoading(false);
        return;
      }

      const currentItemsStock = searchedItem.currentStock;
      const key = `${searchedItem.itemCode}-${searchedItem.mrp}-${searchedItem.batchNo}`;
      const usedPcs = pcsUsed[key] || 0;
      const availableStock = currentItemsStock - usedPcs;

      const existingItemIndex = salesData.findIndex(
        (item) =>
          item.itemCode === searchedItem.itemCode &&
          item.mrp === searchedItem.mrp &&
          item.batch === searchedItem.batchNo
      );
      const updatedSalesData = [...salesData];

      if (formData.billType === "CASHBILL") {
        // for existing item
        if (existingItemIndex !== -1) {
          if (
            updatedSalesData[existingItemIndex].pcs >= availableStock ||
            formData.pcs >= availableStock
          ) {
            // NotificationManager.warning(
            //   `Out of Stock! Currently you have ${
            //     availableStock || 0
            //   } pcs in stock.`
            // );
            setSalesData([
              {
                itemId: searchedItem?.itemId,
                itemDetailsId: searchedItem?._id,
                itemCode: searchedItem?.itemCode || 0,
                itemName: searchedItem?.item?.name || 0,
                mrp: searchedItem?.mrp || 0,
                batch: searchedItem?.batchNo || 0,
                pcs: 1,
                rate: searchedItem?.mrp || 0,
                currentStock: searchedItem?.currentStock || 0,
                volume: searchedItem?.item?.volume || 0,
                discount: formData.discount || 0,
                brk: formData.brk || 0,
                split: formData.split || 0,
                amount: searchedItem?.mrp || 0,
                group: searchedItem?.item?.group,
              },
              ...salesData,
            ]);
            setHighlightedRows([...highlightedRows, existingItemIndex]);

            setFormData({ ...formData, itemCode: "" });
            itemCodeRef.current.focus();

            // pcsRef.current.focus();
            setIsLoading(false);
            // return;
          } else {
            if (formData.pcs >= availableStock) {
              NotificationManager.warning(
                `Out of Stock! Currently you have ${
                  availableStock || 0
                } pcs in stock.`
              );
              pcsRef.current.focus();
              setIsLoading(false);
              return;
            }
            // updatedSalesData[existingItemIndex].pcs += 1;
            // updatedSalesData[existingItemIndex].amount =
            //   updatedSalesData[existingItemIndex].pcs *
            //   updatedSalesData[existingItemIndex].rate;
            // setSalesData(updatedSalesData);
            // itemCodeRef.current.focus();
          }
          updatedSalesData[existingItemIndex].pcs += 1;
          updatedSalesData[existingItemIndex].amount =
            updatedSalesData[existingItemIndex].pcs *
            updatedSalesData[existingItemIndex].rate;
          setSalesData(updatedSalesData);
          setHighlightedRows([...highlightedRows, existingItemIndex]);
          itemCodeRef.current.focus();
          // setFormData({ ...formData, itemCode: "" });
        } else {
          // for new item
          if (availableStock <= 0) {
            NotificationManager.warning(
              `Out of Stock! Currently you have ${
                availableStock || 0
              } pcs in stock.`
            );
            pcsRef.current.focus();
            setIsLoading(false);
            return;
          }
          setSalesData([
            {
              itemId: searchedItem?.itemId,
              itemDetailsId: searchedItem?._id,
              itemCode: searchedItem?.itemCode || 0,
              itemName: searchedItem?.item?.name || 0,
              mrp: searchedItem?.mrp || 0,
              batch: searchedItem?.batchNo || 0,
              pcs: 1,
              rate: searchedItem?.mrp || 0,
              currentStock: searchedItem?.currentStock || 0,
              volume: searchedItem?.item?.volume || 0,
              discount: formData.discount || 0,
              brk: formData.brk || 0,
              split: formData.split || 0,
              amount: searchedItem?.mrp || 0,
              group: searchedItem?.item?.group,
            },
            ...salesData,
          ]);
          setHighlightedRows([...highlightedRows, 0]);
        }
        setFormData({ ...formData, itemCode: "" });
        itemCodeRef.current.focus();
      } else if (formData.billType === "CREDITBILL") {
        setFormData({
          ...formData,
          itemId: searchedItem?.itemId,
          itemDetailsId: searchedItem?._id,
          itemCode: searchedItem?.itemCode || 0,
          itemName: searchedItem?.item?.name || 0,
          mrp: searchedItem?.mrp || 0,
          batch: searchedItem?.batchNo || 0,
          pcs: formData.pcs || null,
          rate: searchedItem?.mrp || 0,
          currentStock: searchedItem?.currentStock || 0,
          volume: searchedItem?.item?.volume || 0,
          discount: formData.discount || 0,
          brk: formData.brk || 0,
          split: formData.split || 0,
          amount: searchedItem?.mrp || 0,
          group: searchedItem?.item?.group,
        });
        pcsRef.current.focus();
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching items:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("highlightedRows: ",highlightedRows);

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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [formData]);

  useEffect(() => {
    if (formData.customerName) {
      const selectedCustomer = allCustomerData.find(
        (customer) => customer._id === formData.customerName._id
      );
      if (selectedCustomer) {
        setFormData((prevData) => ({
          ...prevData,
          customerName: selectedCustomer,
          address: selectedCustomer.address,
          phoneNo: selectedCustomer.contactNo,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        customerName: "",
        address: "",
        phoneNo: "",
      }));
    }
  }, [formData.customerName, allCustomerData]);

  useEffect(() => {
    itemCodeRef.current.focus();

    fetchLicenseData();
    fetchAllCustomers();
    fetchAllLedger();
    fetchAllStores();

    // const savedSalesData = sessionStorage.getItem("salesData");
    // if (savedSalesData) {
    //   setSalesData(JSON.parse(savedSalesData));
    // }
  }, []);

  useEffect(() => {
    const savedStoreId = sessionStorage.getItem("storeName");
    if (savedStoreId) {
      const store = allStores.find((store) => store._id === savedStoreId);
      if (store) {
        setFormData({ ...formData, store });
      }
    }
  }, [allStores]);

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

          // console.log("Enter click selected row: " , selectedRow?._id);
          let found = false;

          salesData.forEach((item) => {
            if (
              item.itemCode === selectedRow.itemCode &&
              item.mrp === selectedRow.mrp &&
              item.batch === selectedRow.batch
            ) {
              setFormData({
                ...formData,
                itemId: selectedRow.item?._id,
                itemDetailsId: selectedRow._id,
                itemCode: selectedRow.itemCode || 0,
                itemName: selectedRow.item?.name || 0,
                mrp: selectedRow.mrp || 0,
                batch: selectedRow.batchNo || 0,
                pcs: selectedRow.pcs || 1,
                rate: selectedRow.mrp || 0,
                volume: selectedRow.item?.volume || 0,
                currentStock: selectedRow.currentStock || 0,
                group: selectedRow.item?.group,
              });
              found = true;
            }
          });

          if (!found) {
            if (selectedRow?._id) {
              setFormData({
                ...formData,
                itemId: selectedRow.item?._id,
                itemCode: selectedRow.itemCode || 0,
                itemDetailsId: selectedRow._id,
                itemName: selectedRow.item?.name || 0,
                mrp: selectedRow.mrp || 0,
                batch: selectedRow.batchNo || 0,
                pcs: selectedRow.pcs || 1,
                rate: selectedRow.mrp || 0,
                volume: selectedRow.item?.volume || 0,
                currentStock: selectedRow.currentStock || 0,
                group: selectedRow.item?.group,
              });
            } else {
              setFormData({
                ...formData,
                itemId: selectedRow.item?._id,
                itemCode: selectedRow.itemCode || 0,
                itemName: selectedRow.item?.name || 0,
                mrp: selectedRow.mrp || 0,
                batch: selectedRow.batchNo || 0,
                pcs: selectedRow.pcs || 1,
                rate: selectedRow.mrp || 0,
                volume: selectedRow.item?.volume || 0,
                currentStock: selectedRow.currentStock || 0,
                group: selectedRow.item?.group,
              });
            }
          }

          if (!hasItems) {
            setFormData({
              ...formData,
              itemId: selectedRow.item?._id,
              itemDetailsId: selectedRow._id,
              itemCode: selectedRow.itemCode || 0,
              itemName: selectedRow.item?.name || 0,
              mrp: selectedRow.mrp || 0,
              batch: selectedRow.batchNo || 0,
              pcs: selectedRow.pcs || 1,
              rate: selectedRow.mrp || 0,
              volume: selectedRow.item?.volume || 0,
              currentStock: selectedRow.currentStock || 0,
              group: selectedRow.item?.group,
            });
          }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const loadMoreData = () => {
    if (!isLoading && !noMoreData) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        itemNameSearch(formData.itemName, formData.store?.name, nextPage, pageSize);
        return nextPage;
      });
    }
  };
  
  const handleItemNameChange = (event) => {
    const itemName = event.target.value;

    setSearchResults([]);
    setPage(1);
    itemNameSearch(itemName, formData.store?.name, 1, pageSize);

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
  };

  const handleEnterKey = (event, nextInputRef) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      nextInputRef.current.focus();
    }
  };

  const handleEdit = (index, field, value) => {
    const updatedRow = { ...salesData[index] };

    updatedRow[field] = parseFloat(value);

    if (
      field === "rate" ||
      field === "pcs" ||
      field === "discount" ||
      field === "amount"
    ) {
      if (field === "pcs") {
        if (updatedRow.pcs > updatedRow.currentStock) {
          NotificationManager.warning(
            `Out of Stock! Currently you have ${
              updatedRow.currentStock || 0
            }pcs in stock.`
          );
          if (pcsEditRef && pcsEditRef.current) {
            pcsEditRef.current.blur();
          }
          return;
        } else {
          updatedRow.amount = parseFloat(updatedRow.rate) * parseFloat(value);
        }
      } else if (field === "rate") {
        updatedRow.amount = parseFloat(updatedRow.pcs) * parseFloat(value);
      }
      // else if (field === "discount") {
      //   const originalAmount =
      //     parseFloat(updatedRow.rate) * parseFloat(updatedRow.pcs);
      //   let newAmount = originalAmount - parseFloat(value);
      //   if (newAmount < 0) {
      //     newAmount = 0;
      //   }
      //   updatedRow.amount = newAmount;
      // }
      else if (field === "amount") {
        if (parseFloat(updatedRow.pcs) !== 0) {
          updatedRow.rate = parseFloat(value) / parseFloat(updatedRow.pcs);
        }
      }
    }

    const updatedSalesData = [...salesData];
    updatedSalesData[index] = updatedRow;

    setSalesData(updatedSalesData);

    if (
      updatedRow.pcs <= updatedRow.currentStock &&
      formData.billType === "CASHBILL" &&
      (totalValues.flBeerVolume >= licenseDetails?.perBillMaxWine ||
        totalValues.imlVolume >= licenseDetails?.perBillMaxCs)
    ) {
      autoSaveCashBill();
    }
  };

  const handleBillDateChange = (date) => {
    setFormData({ ...formData, billDate: date });
  };

  const handleRowClick = (index) => {
    const selectedRow = searchResults[index];
    // console.log("selectedRow rowClick", selectedRow._id);

    let found = false;

    salesData.forEach((item) => {
      if (
        item.itemCode === selectedRow.itemCode &&
        item.mrp === selectedRow.mrp &&
        item.batch === selectedRow.batch
      ) {
        setFormData({
          ...formData,
          itemId: selectedRow.item?._id,
          itemDetailsId: selectedRow._id,
          itemCode: selectedRow.itemCode || 0,
          itemName: selectedRow.item?.name || 0,
          mrp: selectedRow.mrp || 0,
          batch: selectedRow.batchNo || 0,
          pcs: selectedRow.pcs || 1,
          rate: selectedRow.mrp || 0,
          volume: selectedRow.item?.volume || 0,
          currentStock: selectedRow.currentStock || 0,
          group: selectedRow.item?.group,
        });
        found = true;
      }
    });

    if (!found) {
      if (selectedRow?._id) {
        setFormData({
          ...formData,
          itemId: selectedRow.item?._id,
          itemCode: selectedRow.itemCode || 0,
          itemDetailsId: selectedRow._id,
          itemName: selectedRow.item?.name || 0,
          mrp: selectedRow.mrp || 0,
          batch: selectedRow.batchNo || 0,
          pcs: selectedRow.pcs || 1,
          rate: selectedRow.mrp || 0,
          volume: selectedRow.item?.volume || 0,
          currentStock: selectedRow.currentStock || 0,
          group: selectedRow.item?.group,
        });
      } else {
        setFormData({
          ...formData,
          itemId: selectedRow.item?._id,
          itemCode: selectedRow.itemCode || 0,
          itemName: selectedRow.item?.name || 0,
          mrp: selectedRow.mrp || 0,
          batch: selectedRow.batchNo || 0,
          pcs: selectedRow.pcs || 1,
          rate: selectedRow.mrp || 0,
          volume: selectedRow.item?.volume || 0,
          currentStock: selectedRow.currentStock || 0,
          group: selectedRow.item?.group,
        });
      }
    }

    if (!hasItems) {
      setFormData({
        ...formData,
        itemId: selectedRow.item?._id,
        itemDetailsId: selectedRow._id,
        itemCode: selectedRow.itemCode || 0,
        itemName: selectedRow.item?.name || 0,
        mrp: selectedRow.mrp || 0,
        batch: selectedRow.batchNo || 0,
        pcs: selectedRow.pcs || 1,
        rate: selectedRow.mrp || 0,
        volume: selectedRow.item?.volume || 0,
        currentStock: selectedRow.currentStock || 0,
        group: selectedRow.item?.group,
      });
    }

    pcsRef.current.focus();
  };

  const handleEditClick = (index) => {
    setEditableIndex(index);
  };

  const autoSaveCashBill = async () => {
    const billDateObj = formatDate(formData.billDate);
    const todaysDateObj = formatDate(new Date());

    const groupedItems = {
      FL_BEER: salesData.filter(
        (item) => item.group === "FL" || item.group === "BEER"
      ),
      IML: salesData.filter((item) => item.group === "IML"),
    };

    const splitBill = (items, volumeLimit) => {
      let payloads = [];
      let remainingItems = [...items];
      let currentVolume = 0;
      let currentPcs = 0;
    
      while (remainingItems.length > 0) {
        let billItems = [];
        currentVolume = 0;
        currentPcs = 0;
    
        for (let i = 0; i < remainingItems.length; ) {
          const item = remainingItems[i];
          const itemVolume = item.volume * item.pcs;
    
          if (currentVolume + itemVolume <= volumeLimit) {
            currentVolume += itemVolume;
            currentPcs += item.pcs;
            billItems.push(item);
            remainingItems.splice(i, 1);
          } else {
            const remainingVolume = volumeLimit - currentVolume;
            const splitPcs = Math.floor(remainingVolume / item.volume);
            if (splitPcs > 0) {
              const splitItem = { ...item, pcs: splitPcs };
              const remainingItem = { ...item, pcs: item.pcs - splitPcs };
              currentVolume += splitItem.volume * splitItem.pcs;
              currentPcs += splitItem.pcs;
              billItems.push(splitItem);
              remainingItems[i] = remainingItem;
            }
            break;
          }
        }
    
        const grossAmount = billItems.reduce((sum, item) => sum + item.pcs * item.rate, 0);
        const discountAmount = billItems.reduce(
          (sum, item) => sum + (item.discount || 0) * item.pcs,
          0
        );
        const splDiscAmount = (grossAmount * (totalValues.splDiscount || 0)) / 100;
        const netAmount = grossAmount - discountAmount - splDiscAmount - (totalValues.adjustment || 0);
    
        const newPayload = {
          billType: formData.billType,
          customer: formData.customerName?._id || null,
          storeId: formData.store?._id,
          billSeries: items[0].group,
          billDate: formData.billDate ? billDateObj : todaysDateObj,
          volume: currentVolume,
          totalPcs: currentPcs,
          splDisc: parseFloat(totalValues.splDiscount),
          splDiscAmount: parseFloat(splDiscAmount.toFixed(2)),
          grossAmount: parseFloat(grossAmount.toFixed(2)),
          discAmount: parseFloat(discountAmount.toFixed(2)),
          adjustment: parseFloat(totalValues.adjustment || 0),
          netAmount: parseFloat(netAmount.toFixed(2)),
          receiptMode1: parseFloat(netAmount.toFixed(2)),
    
          salesItem: billItems.map((item) => ({
            itemDetailsId: item.itemDetailsId,
            itemCode: item.itemCode,
            itemId: item.itemId,
            batchNo: item.batch,
            mrp: parseFloat(item.mrp),
            pcs: parseFloat(item.pcs),
            rate: parseFloat(item.rate),
            discount: parseFloat(item.discount),
            amount: parseFloat(item.pcs) * parseFloat(item.rate),
            split: parseFloat(item.split),
            break: parseFloat(item.brk),
          })),
        };
    
        if (totalValues.receiptMode2) {
          newPayload.receiptMode2 = totalValues.receiptMode2;
        }
    
        if (totalValues.receiptAmt && totalValues.receiptAmt !== 0) {
          newPayload.receiptAmount = parseFloat(totalValues.receiptAmt);
        }
    
        payloads.push(newPayload);
      }
    
      return payloads;
    };
    

    let payload = [];

    if (groupedItems.IML.length > 0) {
      payload = payload.concat(
        splitBill(groupedItems.IML, licenseDetails?.perBillMaxCs)
      );
    }

    if (groupedItems.FL_BEER.length > 0) {
      payload = payload.concat(
        splitBill(groupedItems.FL_BEER, licenseDetails?.perBillMaxWine)
      );
    }

    if (salesData.length === 0) {
      NotificationManager.warning("Enter some item in table.", "Warning");
      itemCodeRef.current.focus();
      return;
    }

    try {
      const response = await createSale(payload);

      if (response.status === 200) {
        NotificationManager.success("Sale created successfully", "Success");
        if (licenseDetails?.autoBillPrint === "YES") {
          handlePrint();
        }
        resetTopFormData();
        resetMiddleFormData();
        resetTotalValues();
        setSearchResults([]);
        setSalesData([]);
        sessionStorage.setItem("salesData", JSON.stringify([]));
        setSearchMode(false);
        fetchAllBrandWiseItems();
        fetchAllBills();
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

  const handleSaveClick = async (index) => {
    const updatedSales = [...salesData];
    const updatedRow = { ...updatedSales[index] };

    const pcsAfterBrk =
      parseFloat(updatedRow.pcs) - parseFloat(updatedRow.brk || 0);

    if (pcsAfterBrk > updatedRow.currentStock) {
      NotificationManager.warning(
        `Out of Stock! Currently you have ${
          updatedRow.currentStock || 0
        } pcs in stock.`
      );
      return;
    }

    for (const key in editedRow) {
      if (editedRow.hasOwnProperty(key)) {
        updatedRow[key] = editedRow[key];
      }
    }

    // updatedRow.pcs = pcsAfterBrk;
    updatedRow.amount = pcsAfterBrk * parseFloat(updatedRow.rate || 1);

    updatedSales[index] = updatedRow;
    setSalesData(updatedSales);
    sessionStorage.setItem("salesData", JSON.stringify(updatedSales));

    setEditedRow({});
    setEditableIndex(-1);

    const calculatedTotalVolume = updatedSales.reduce((total, item) => {
      return total + parseFloat(item.volume || 0) * (parseInt(item.pcs) - parseFloat(item.brk || 0));
    }, 0);

    const calculatedTotalPcs = updatedSales.reduce((total, item) => {
      return total + parseInt(item.pcs || 0);
    }, 0);

    const calculatedGrossAmt = updatedSales.reduce((total, item) => {
      return total + parseFloat(item.amount || 0);
    }, 0);

    const totalDiscount = updatedSales.reduce((total, item) => {
      return total + parseFloat(item.discount * (parseInt(item.pcs) - parseFloat(item.brk || 0)) || 0);
    }, 0);

    const splDiscAmount =
      (calculatedGrossAmt * parseFloat(totalValues.splDiscount || 0)) / 100;

    const netAmt =
      parseFloat(calculatedGrossAmt || 0) -
      parseFloat(splDiscAmount || 0) -
      parseFloat(totalValues.adjustment || 0) +
      parseFloat(totalValues.taxAmt || 0);

      // console.log("netAmt---> " + netAmt)
      setTotalValues({
        ...totalValues,
        totalVolume: calculatedTotalVolume.toFixed(0),
        totalPcs: calculatedTotalPcs,
        grossAmt: calculatedGrossAmt.toFixed(0),
        discountAmt: totalDiscount.toFixed(0),
        splDiscAmount: (splDiscAmount + totalDiscount).toFixed(0),
        netAmt: netAmt.toFixed(2),
        receiptMode1: totalValues.receiptMode1 ? netAmt.toFixed(2) : 0,
        receiptAmt: totalValues.receiptMode2 ? netAmt.toFixed(2) : 0,
      });
      // console.log("totalValues ---> " + totalValues);

    if (
      pcsAfterBrk <= updatedRow.currentStock &&
      formData.billType === "CASHBILL" &&
      (totalValues.flBeerVolume >= licenseDetails?.perBillMaxWine ||
        totalValues.imlVolume >= licenseDetails?.perBillMaxCs)
    ) {
      await autoSaveCashBill();
    }
  }; 

  const handleRemoveClick = (index) => {
    const updatedSales = [...salesData];
    updatedSales.splice(index, 1);
    setSalesData(updatedSales);
    sessionStorage.setItem("salesData", JSON.stringify(updatedSales));
    resetTotalValues();
  };

  const handleSubmitIntoDataTable = async (e) => {
    e.preventDefault();

    const pcsAfterBrk =
      parseFloat(formData.pcs) - parseFloat(formData.brk || 0);
    const rate = parseFloat(formData.rate) || 1;
    const amount = pcsAfterBrk * rate || 0;


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

    if (formData.pcs > formData.currentStock) {
      pcsRef.current.focus();
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

        if (
          updatedSalesData[existingItemIndex].pcs >= formData.currentStock ||
          formData.pcs >= formData.currentStock
        ) {
          NotificationManager.warning(
            `Out of Stock! Currently you have ${
              formData.currentStock || 0
            }pcs in stock.`
          );
          pcsRef.current.focus();
          return;
        } else {
          if (formData.pcs >= formData.currentStock) {
            NotificationManager.warning(
              `Out of Stock! Currently you have ${
                formData.currentStock || 0
              }pcs in stock.`
            );
            pcsRef.current.focus();
            return;
          }
          let currItem = updatedSalesData[existingItemIndex];
          let currPcs = parseFloat(currItem.pcs);
          let currRate = parseFloat(currItem.rate);
          let totalPcs = parseFloat(currItem.pcs) + parseFloat(formData.pcs);

          if (totalPcs > formData.currentStock) {
            NotificationManager.warning(
              `Out of Stock! Currently you have ${
                formData.currentStock || 0
              }pcs in stock.`
            );
            pcsRef.current.focus();
            return;
          } else {
            updatedSalesData[existingItemIndex].pcs =
              currPcs + parseFloat(formData.pcs);
            updatedSalesData[existingItemIndex].amount = parseFloat(
              currPcs * currRate
            );
            setSalesData(updatedSalesData);
            setHighlightedRows([...highlightedRows, existingItemIndex]);

            // console.log("updatedSalesData:",updatedSalesData)
            // Save updated salesData to session storage
            sessionStorage.setItem(
              "salesData",
              JSON.stringify(updatedSalesData)
            );

            itemCodeRef.current.focus();
          }
        }
      } else {
        const newItem = {
          itemId: formData.itemId,
          itemCode: formData.itemCode || 0,
          itemName: formData.itemName || 0,
          mrp: formData.mrp || 0,
          batch: formData.batch || 0,
          pcs: formData.pcs || 1,
          rate: formData.rate || 0,
          currentStock: formData.currentStock || 0,
          group: formData.group || "",
          volume: formData.volume || 0,
          discount: formData.discount || 0,
          brk: formData.brk || 0,
          split: formData.split || 0,
          // amount: formData.amount || 0
          amount: amount || 0,
        };
        
        // console.log("formData.itemDetailsId: ",formData.itemDetailsId);

        if (formData.itemDetailsId) {
          newItem.itemDetailsId = formData.itemDetailsId;
        }

        const updatedSalesData = [newItem, ...salesData];
        setSalesData(updatedSalesData);
        setHighlightedRows([...highlightedRows, 0]);
        // Save updated salesData to session storage
        sessionStorage.setItem("salesData", JSON.stringify(updatedSalesData));

        itemCodeRef.current.focus();
      }

      // if (
      //   formData.billType === "CASHBILL" &&
      //   (totalValues.flBeerVolume >= licenseDetails?.perBillMaxWine ||
      //     totalValues.imlVolume >= licenseDetails?.perBillMaxCs)
      // ) {
      //   await autoSaveCashBill();
      // }

      resetMiddleFormData();
    } catch (error) {
      console.error("Error submitting item:", error);
      // NotificationManager.error(
      //   "Error submitting item. Please try again later.",
      //   "Error"
      // );
    }
  };

  const handleCreateSale = async (itemsToSale = null) => {
    const items = isSplitPrinted ? itemsToSale : salesData;
    const billDateObj = formatDate(formData.billDate);
    const todaysDateObj = formatDate(new Date());

    if (formData.billType === "CREDITBILL" && !formData.customerName) {
      NotificationManager.warning("Customer name is required", "Warning");
      return;
    }

    if (!licenseDetails?.perBillMaxCs || licenseDetails?.perBillMaxCs < 1000) {
      NotificationManager.warning(
        "Per Bill Max CS(ML) is missing or less than 1000ml",
        "Please fill in the license details first"
      );
      return;
    }

    if (
      !licenseDetails?.perBillMaxWine ||
      licenseDetails?.perBillMaxWine < 1000
    ) {
      NotificationManager.warning(
        "Per Bill Max Wine(ML) is missing or less than 1000ml",
        "Please fill in the license details first"
      );
      return;
    }

    if (items.length === 0) {
      NotificationManager.warning("Enter some item in table.", "Warning");
      itemCodeRef.current.focus();
      return;
    }

    const groupedItems = {
      FL_BEER: items.filter(
        (item) => item.group === "FL" || item.group === "BEER"
      ),
      IML: items.filter((item) => item.group === "IML"),
    };

    const splitBill = (items, volumeLimit) => {
      let payloads = [];
      let remainingItems = [...items];
      let currentVolume = 0;
      let currentPcs = 0;

      while (remainingItems.length > 0) {
        let billItems = [];
        currentVolume = 0;
        currentPcs = 0;

        for (let i = 0; i < remainingItems.length; ) {
          const item = remainingItems[i];
          const itemVolume =
            item.volume * (parseFloat(item.pcs) - parseFloat(item.brk));

          if (currentVolume + itemVolume <= volumeLimit) {
            currentVolume += itemVolume;
            currentPcs += item.pcs;
            billItems.push(item);
            remainingItems.splice(i, 1);
          } else {
            const remainingVolume = volumeLimit - currentVolume;
            const splitPcs = Math.floor(remainingVolume / item.volume);
            if (splitPcs > 0) {
              const splitItem = { ...item, pcs: splitPcs };
              const remainingItem = { ...item, pcs: item.pcs - splitPcs };
              currentVolume += splitItem.volume * splitItem.pcs;
              currentPcs += splitItem.pcs;
              billItems.push(splitItem);
              remainingItems[i] = remainingItem;
            }
            break;
          }
        }

        console.log("volumeLimit: ",volumeLimit)
        console.log("billItems: ",billItems)

        if (billItems.length === 0 || volumeLimit <= 0) {
          break;
        }

        const newPayload = {
          billType: formData.billType,
          customer: formData.customerName._id,
          storeId: formData.store?._id,
          billSeries: items[0].group,
          billDate: formData.billDate ? billDateObj : todaysDateObj,
          volume: currentVolume,
          totalPcs: currentPcs,
          splDisc: parseFloat(totalValues.splDiscount),
          splDiscAmount: parseFloat(totalValues.splDiscAmount),
          grossAmount: parseFloat(totalValues.grossAmt),
          discAmount: parseFloat(totalValues.discountAmt),
          adjustment: parseFloat(totalValues.adjustment),
          netAmount: parseFloat(totalValues.netAmt),
          receiptMode1: parseFloat(totalValues.receiptMode1),

          salesItem: billItems.map((item) => ({
            itemDetailsId: item.itemDetailsId,
            itemCode: item.itemCode,
            itemId: item.itemId,
            batchNo: item.batch,
            mrp: parseFloat(item.mrp),
            pcs: parseFloat(item.pcs),
            rate: parseFloat(item.rate),
            discount: parseFloat(item.discount),
            amount:
              (parseFloat(item.pcs) - parseFloat(item.brk)) *
              parseFloat(item.rate),
            split: parseFloat(item.split),
            break: parseFloat(item.brk),
          })),
        };

        if (totalValues.receiptMode2) {
          newPayload.receiptMode2 = totalValues.receiptMode2;
        }

        if (totalValues.receiptAmt && totalValues.receiptAmt !== 0) {
          newPayload.receiptAmount = parseFloat(totalValues.receiptAmt);
        }

        payloads.push(newPayload);
      }

      return payloads;
    };

    let payload = [];

    if (groupedItems.IML.length > 0) {
      payload = payload.concat(
        splitBill(groupedItems.IML, licenseDetails?.perBillMaxCs)
      );
    }
    if (groupedItems.FL_BEER.length > 0) {
      payload = payload.concat(
        splitBill(groupedItems.FL_BEER, licenseDetails?.perBillMaxWine)
      );
    }

    try {
      const response = await createSale(payload);

      const billNo = response?.data?.data[0]?.billNo;
      // console.log("bill no: ", billNo);

      if (response?.data?.data) {
        NotificationManager.success("Sale created successfully", "Success");
        setFormData({ ...formData, billno: billNo });

        setTimeout(() => {
          if (!isSplitPrinted) {
            resetTopFormData();
            resetMiddleFormData();
            resetTotalValues();
            setSearchResults([]);
            setSalesData([]);
            sessionStorage.setItem("salesData", JSON.stringify([]));
            fetchAllBills();
            fetchAllBrandWiseItems();
            setSearchMode(false);
            setIsSaveAndPrintClicked(false);
            setIsAutoBillPrint(false);
          } else {
            setIsSplitPrinted(false);
          }
        }, 1000);
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


  // console.log("salesData --> ",salesData)

  const handleUpdateSale = async () => {
    let payload = {};
    const billDateObj = formatDate(formData.billDate);
    const todaysDateObj = formatDate(new Date());

    if (formData.billType === "CREDITBILL" && !formData.customerName) {
      NotificationManager.warning("Customer name is required", "Warning");
      return;
    }

    if (salesData.length === 0) {
      NotificationManager.warning("Enter some item in table.", "Warning");
      itemCodeRef.current.focus();
      return;
    }

    let groupedItems = {
      FL_BEER: [],
      IML: [],
    };

    salesData.forEach((item) => {
      if (item.group === "FL" || item.group === "BEER") {
        groupedItems.FL_BEER.push(item);
      } else if (item.group === "IML") {
        groupedItems.IML.push(item);
      }
    });

    let flBeerBillSeries = "";
    if (groupedItems.FL_BEER.length > 0) {
      flBeerBillSeries = groupedItems.FL_BEER[0].group;
    }

    if (groupedItems.FL_BEER.length > 0) {
      let flBeerPayload = {
        billType: formData.billType,
        customer: formData.customerName._id,
        storeId: formData.store?._id,
        billSeries: flBeerBillSeries,
        billDate: formData.billDate ? billDateObj : todaysDateObj,
        volume: parseInt(totalValues.totalVolume),
        totalPcs: parseInt(totalValues.totalPcs),
        splDisc: parseFloat(totalValues.splDiscount || 0),
        splDiscAmount: parseFloat(totalValues.splDiscAmount || 0),
        grossAmount: parseFloat(totalValues.grossAmt),
        discAmount: parseFloat(totalValues.discountAmt || 0),
        // taxAmount: parseFloat(totalValues.taxAmt || 0),
        adjustment: parseFloat(totalValues.adjustment || 0),
        netAmount: parseFloat(totalValues.netAmt),
        receiptMode1: parseFloat(totalValues.receiptMode1),
        salesItem: [],
      };

      groupedItems.FL_BEER.forEach((item) => {
        let salesItem = {
          itemCode: item.itemCode,
          itemId: item.itemId,
          batchNo: item.batch,
          mrp: parseFloat(item.mrp),
          pcs: parseFloat(item.pcs),
          rate: parseFloat(item.rate),
          discount: parseFloat(item.discount),
          amount: parseFloat(item.amount),
          split: parseFloat(item.split),
          break: parseFloat(item.brk),
          // stockAt: item.stockAt,
        };

        if (item.itemDetailsId) {
          salesItem._id = item.itemDetailsId;
        }

        flBeerPayload.salesItem.push(salesItem);
      });

      if (totalValues.receiptMode2) {
        flBeerPayload.receiptMode2 = totalValues.receiptMode2;
      }

      if (totalValues.receiptAmt && totalValues.receiptAmt !== 0) {
        flBeerPayload.receiptAmount = parseFloat(totalValues.receiptAmt);
      }

      payload = flBeerPayload;
    }

    if (groupedItems.IML.length > 0) {
      let imlPayload = {
        billType: formData.billType,
        customer: formData.customerName._id,
        storeId: formData.store?._id,
        billSeries: "IML",
        billDate: formData.billDate ? billDateObj : todaysDateObj,
        volume: parseInt(totalValues.totalVolume),
        totalPcs: parseInt(totalValues.totalPcs),
        splDisc: parseFloat(totalValues.splDiscount || 0),
        splDiscAmount: parseFloat(totalValues.splDiscAmount || 0),
        grossAmount: parseFloat(totalValues.grossAmt),
        discAmount: parseFloat(totalValues.discountAmt || 0),
        // taxAmount: parseFloat(totalValues.taxAmt || 0),
        adjustment: parseFloat(totalValues.adjustment || 0),
        netAmount: parseFloat(totalValues.netAmt),
        receiptMode1: parseFloat(totalValues.receiptMode1),
        salesItem: [],
      };

      groupedItems.IML.forEach((item) => {
        let salesItem = {
          itemCode: item.itemCode,
          itemId: item.itemId,
          batchNo: item.batch,
          mrp: parseFloat(item.mrp),
          pcs: parseFloat(item.pcs),
          rate: parseFloat(item.rate),
          discount: parseFloat(item.discount),
          amount: parseFloat(item.amount),
          split: parseFloat(item.split),
          break: parseFloat(item.brk),
          // stockAt: item.stockAt,
        };

        if (item.itemDetailsId) {
          salesItem._id = item.itemDetailsId;
        }

        imlPayload.salesItem.push(salesItem);
      });

      if (totalValues.receiptMode2) {
        imlPayload.receiptMode2 = totalValues.receiptMode2;
      }

      if (totalValues.receiptAmt && totalValues.receiptAmt !== 0) {
        imlPayload.receiptAmount = parseFloat(totalValues.receiptAmt);
      }

      payload = imlPayload;
    }

    try {
      const response = await updateSaleDetailsByBillNo(payload, billNumber);

      if (response.status === 200) {
        NotificationManager.success("Sale updated successfully", "Success");

        setSearchMode(false);
      } else {
        if (response.response.data.statusCode === 400) {
          NotificationManager.error(response.response.data.message, "Error");
          fetchAllBrandWiseItems();
        } else {
          NotificationManager.error(
            "Error updating Sale. Please try again later.",
            "Error"
          );
        }
      }
    } catch (error) {
      console.error("Error updating sale:", error);
    }
  };

  const handleDeleteSale = async () => {
    try {
      if (billNoEditable && billNumber) {
        const response = await removeSaleDetails(billNumber);
        if (response.status === 200) {
          NotificationManager.success("Sale deleted successfully.", "Success");
          resetTopFormData();
          resetMiddleFormData();
          resetTotalValues();
          setSeriesEditable(false);
          setBillNoEditable(false);
          setSalesData([]);
          sessionStorage.setItem("salesData", JSON.stringify([]));
          setEditedRow({});
          fetchAllBills();
          setSelectedRowIndex(null);
          setSearchMode(false);
          setEditableIndex(-1);
          fetchAllBrandWiseItems()
        } else {
          console.log("error: ", response);
          NotificationManager.error(
            "Error deleting Sale. Please try again later.",
            "Error"
          );
        }
      } else {
        if (!billNoEditable && billNumber) {
          NotificationManager.warning(
            "Bill no. field is disabled!",
            "Please click on Open Button to enable it."
          );
        }
        if (billNoEditable && !billNumber) {
          NotificationManager.warning(
            "Please input something in bill no. field!"
          );
        }
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting Sale. Please try again later.",
        "Error"
      );
      console.log(error);
    }
  };

  const handleItemCodeChange = (e) => {
    const itemCode = e.target.value;
    // setBarCode(itemCode);
    setFormData({ ...formData, itemCode });

    if (!itemCode) {
      resetMiddleFormData();
    }

    setEditedRow({});
    setEditableIndex(-1);
  };

  let debounceTimeout = null;
  const barcodeQueue = [];
  let isProcessingQueue = false;

  const handleKeyDown = (e) => {
    const inputElement = e.target;
    const value = inputElement.value.trim();

    if (e.ctrlKey) {
      handleSaveAndPrint();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      inputElement.value = "";
      setFormData({ ...formData, itemCode: "" });

      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        if (value) {
          barcodeQueue.push(value);
          // console.log("Barcode added to queue: ", value);
          processBarcodeQueue();
        }
      }, 30);
    }
  };

  const processBarcodeQueue = async () => {
    if (isProcessingQueue) return;

    isProcessingQueue = true;

    while (barcodeQueue.length > 0) {
      const barcode = barcodeQueue.shift();
      // console.log("Processing barcode: ", barcode);

      try {
        await itemCodeSearch(barcode, formData.store?.name);
      } catch (error) {
        // console.error("Error processing barcode: ", error);
      }
    }

    isProcessingQueue = false;
  };


  const handleCustomerNameChange = (e) => {
    const updatedFormData = { ...formData, customerName: e.target.value };
    setFormData(updatedFormData);
  };

  const handleAddressChange = (e) => {
    const updatedFormData = { ...formData, address: e.target.value };
    setFormData(updatedFormData);
  };

  const handlePhoneNoChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      const updatedFormData = { ...formData, phoneNo: value };
      setFormData(updatedFormData);
    }
  };

  const handlePcsChange = (e) => {
    const value = e.target.value;
    let pcs = parseFloat(value) || "";

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
    const brk = parseFloat(formData.brk) || 1;
    // console.log("brk: " , brk);
    let rate;
    if (amount && pcs) {
      rate = amount / (pcs - brk);
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
    if (e.key === "Enter" || e.key === "Tab") {
      handleDiscountChange(e);
    }
  };

  const handleBrkChange = (e) => {
    const value = e.target.value;

    setFormData({ ...formData, brk: value });
  };

  const calculatePcs = () => {
    let totPcs = 0;

    if (salesData.length > 0) {
      salesData.forEach((row) => {
        totPcs += parseInt(row.pcs);
      });
      return totPcs;
    }
  };

  const handleBillNoChange = (e) => {
    const { value } = e.target;
    // setFormData({ ...formData, billno: value });
    setBillNumber(value);
  };

  const handleReceiptModeChange = (e) => {
    const value = e.target.value;
    // const receiptMode2Amt = parseInt(totalValues.receiptAmt)
    setTotalValues({
      ...totalValues,
      receiptMode1: value,
      receiptAmt: parseInt(totalValues.netAmt) - parseInt(value),
    });
  };

  const handlePrevClick = () => {
    if ((billNumber && billNoEditable) || (billNumber && seriesData)) {
      const match = billNumber.match(/^([A-Za-z]*)(\d+)$/);
      if (match) {
        const prefix = match[1];

        const number = parseInt(match[2]) - 1;

        const paddedNumber = number.toString().padStart(match[2].length, "0");
        const newBillNo = `${prefix}${paddedNumber}`;

        // setFormData((prevData) => ({ ...prevData, billno: newBillNo }));
        setBillNumber(newBillNo);
      }
    }
  };

  const handleNextClick = () => {
    if ((billNumber && billNoEditable) || (billNumber && seriesData)) {
      const match = billNumber.match(/^([A-Za-z]*)(\d+)$/);
      if (match) {
        const prefix = match[1];
        const number = parseInt(match[2]) + 1;
        const paddedNumber = number.toString().padStart(match[2].length, "0");
        const newBillNo = `${prefix}${paddedNumber}`;
        // setFormData((prevData) => ({ ...prevData, billno: newBillNo }));
        setBillNumber(newBillNo);
      }
    }
  };

  const convertToDayjsObject = (dateStr) => {
    return dayjs(dateStr, "DD/MM/YYYY");
  };

  const billNumberSearch = debounce(async () => {
    try {
      if (billNoEditable && billNumber) {
        const response = await getSaleDetailsByEntryNo(billNumber);

        if (response?.data?.data) {
          const receivedData = response.data.data;
          // console.log("data received: " , receivedData)

          const billDateObject = convertToDayjsObject(receivedData.billDate);

          setFormData((prevData) => ({
            ...prevData,
            billType: receivedData.billType,
            customerName: receivedData.customer,
            store: {
              _id: receivedData?.storeId?._id,
              name: receivedData?.storeId?.name,
            },
            address: receivedData.customer?.address,
            phoneNo: receivedData.customer?.contactNo,
            billDate: billDateObject,
          }));

          const salesItems = receivedData?.salesItems;
          salesItems.length > 0 ? setHasItems(true) : setHasItems(false);
          const newSalesItems = salesItems.map((sale) => ({
            // itemCode: sale?.itemDetailsId?.itemCode,
            itemCode: sale?.itemCode,
            // itemCode: sale?.itemDetailsId?.itemCode,
            itemDetailsId: sale?._id,
            itemId: sale?.itemId?._id,
            itemName: sale?.itemId?.name,
            mrp: sale?.mrp,
            // mrp: sale?.itemDetailsId?.mrp,
            batch: sale?.batchNo,
            // batch: sale?.itemDetailsId?.batchNo,
            pcs: sale?.pcs,
            rate: sale?.rate,
            discount: sale?.discount,
            amount: sale?.amount,
            brk: sale?.break,
            split: sale?.split,
            volume: sale?.itemId?.volume,
            group: sale?.itemId?.group,
            // stockAt: sale?.stockAt?._id,
            currentStock: sale?.currentStock,
            // currentStock: sale?.itemDetailsId?.currentStock,
          }));

          setSalesData([...newSalesItems]);
          // console.log(salesData);

          setTotalValues({
            totalVolume: receivedData.volume,
            totalPcs: receivedData.totalPcs || 0,
            splDiscount: receivedData.splDisc || 0,
            splDiscAmount: receivedData.splDiscAmount,
            grossAmt: receivedData.grossAmount,
            discountAmt: receivedData.discAmount,
            taxAmt: receivedData.taxAmount,
            // totalMrp: receivedData.,
            adjustment: receivedData.adjustment,
            netAmt: receivedData.netAmount,
            receiptMode1: receivedData.receiptMode1,
            receiptMode2: receivedData.receiptMode2?._id,
            receiptAmt: receivedData.receiptAmount,
          });
        } else {
          // resetTopFormData();
          resetMiddleFormData();
          resetTotalValues();
          setSalesData([]);
          sessionStorage.setItem("salesData", JSON.stringify([]));
          NotificationManager.error("No sales details found!");
        }
      }
    } catch (error) {
      resetTopFormData();
      resetMiddleFormData();
      resetTotalValues();
      setSalesData([]);
      sessionStorage.setItem("salesData", JSON.stringify([]));
      NotificationManager.error("Error fetching sales details!");
      console.error("Error fetching sales:", error);
    }
  }, 700);

  const calculateNetAmount = () => {
    const totalVolume = salesData.reduce(
      (total, item) =>
        total + (parseFloat(item.volume) || 0) * ((parseInt(item.pcs) - (parseInt(item.brk))) || 0),
      0
    );

    const flBeerVolume = salesData.reduce((total, item) => {
      if (item.group === "FL" || item.group === "BEER") {
        return (
          total + (parseFloat(item.volume) || 0) * ((parseInt(item.pcs) - (parseInt(item.brk))) || 0)
        );
      }
      return total;
    }, 0);

    const imlVolume = salesData.reduce((total, item) => {
      if (item.group === "IML") {
        return (
          total + (parseFloat(item.volume) || 0) * ((parseInt(item.pcs) - (parseInt(item.brk))) || 0)
        );
      }
      return total;
    }, 0);

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

    // const taxAmt = parseFloat(totalValues.taxAmt) || 0;

    const adjustment = parseFloat(totalValues.adjustment) || 0;

    const netAmt = grossAmt - splDiscAmount - adjustment;

    const newNetAmount = netAmt - totalDiscount;

    setTotalValues({
      ...totalValues,
      totalVolume: totalVolume.toFixed(2),
      flBeerVolume: flBeerVolume.toFixed(2),
      imlVolume: imlVolume.toFixed(2),
      totalPcs: totalPcs,
      grossAmt: grossAmt.toFixed(2),
      receiptMode1: billNumber
        ? totalValues.receiptMode1
        : newNetAmount.toFixed(2),
      splDiscAmount: (splDiscAmount + totalDiscount).toFixed(0),
      discountAmt: totalDiscount.toFixed(0),
      netAmt: newNetAmount.toFixed(2),
    });
  };

  useEffect(() => {
    calculateNetAmount();
  }, [
    salesData,
    totalValues.splDiscount,
    totalValues.splDiscAmount,
    totalValues.discountAmt,
    // totalValues.taxAmt,
    totalValues.adjustment,
  ]);

  // const calculatePrintDataTotalValues = (printData) => {
  //   const calculatedTotalVolume = printData.reduce((total, item) => {
  //     return total + parseFloat(item.volume || 0) * parseInt(item.pcs || 1);
  //   }, 0);

  //   const calculatedTotalPcs = printData.reduce((total, item) => {
  //     return total + parseInt(item.pcs || 0);
  //   }, 0);

  //   const calculatedGrossAmt = printData.reduce((total, item) => {
  //     return total + parseFloat(item.amount || 0) * parseInt(item.pcs || 1);
  //   }, 0);

  //   const totalDiscount = printData.reduce((total, item) => {
  //     return total + parseFloat(item.discount * item.pcs || 0);
  //   }, 0);

  //   const splDiscAmount =
  //     (calculatedGrossAmt * parseFloat(totalValues.splDiscount || 0)) / 100;

  //   const netAmt =
  //     parseFloat(calculatedGrossAmt || 0) - parseFloat(splDiscAmount || 0);

  //   return {
  //     totalVolume: calculatedTotalVolume.toFixed(2),
  //     totalPcs: calculatedTotalPcs,
  //     grossAmt: calculatedGrossAmt.toFixed(2),
  //     discountAmt: totalDiscount.toFixed(2),
  //     splDiscAmount: (splDiscAmount + totalDiscount).toFixed(0),
  //     netAmt: netAmt.toFixed(2),
  //   };
  // };

  useEffect(() => {
    if (billDateRef.current) {
      billDateRef.current.addEventListener("keydown", (e) =>
        handleEnterKey(e, itemCodeRef)
      );
    }
  }, []);

  const debounceAutoSave = useCallback(
    debounce(() => {
      if (
        formData.billType === "CASHBILL" &&
        (totalValues.flBeerVolume >= licenseDetails?.perBillMaxWine ||
          totalValues.imlVolume >= licenseDetails?.perBillMaxCs)
      ) {
        const exceedsStock = salesData.some(
          (item) => item.pcs > item.currentStock
        );

        if (!exceedsStock) {
          autoSaveCashBill();
        } else {
          NotificationManager.warning(
            "One or more items exceed available stock. Cannot auto-save."
          );
        }
      }
    }, 300),
    [formData.billType, totalValues, licenseDetails]
  );

  //hanging issue here
  // useEffect(() => {
  //   if (licenseDetails?.perBillMaxWine && licenseDetails?.perBillMaxCs) {
  //     debounceAutoSave();
  //   }
  //   return () => {
  //     debounceAutoSave.cancel();
  //   };
  // }, [totalValues.flBeerVolume, totalValues.imlVolume, debounceAutoSave]);

  useEffect(() => {
    if ((billNumber && billNoEditable) || (billNumber && seriesData)) {
      billNumberSearch(billNumber);
    }
  }, [billNumber, billNoEditable]);

  useEffect(() => {
    if (
      formData?.billno &&
      (licenseDetails?.autoBillPrint === "YES" || isSaveAndPrintClicked)
    ) {
      handlePrint();
    }
 }, [formData.billno]);
 

  useEffect(() => {
    // console.log("Connecting to WebSocket...");
    const savedTotalSales = sessionStorage.getItem("totalSales");
    const savedTotalCash = sessionStorage.getItem("totalCash");
    const savedTotalOnline = sessionStorage.getItem("totalOnline");

    if (savedTotalSales) setTotalSales(savedTotalSales); else setTotalSales(0);
    if (savedTotalCash) setTotalCash(savedTotalCash); else setTotalCash(0);
    if (savedTotalOnline) setTotalOnline(savedTotalOnline); else setTotalOnline(0);

    socketService.connect(process.env.REACT_APP_API_URL + "/total-sales");

    socketService.onMessage((data) => {
      console.log("Received data from WebSocket:", data);

      setTotalSales(data.totalAmount || 0);
      setTotalCash(data.cash || 0);
      setTotalOnline(data.online || 0);
    });

    return () => {
      // console.log("Component unmounting, disconnecting WebSocket...");
      socketService.disconnect();
    };
  }, []);

  const handlePrintClick = () => {
    const updatedSalesData = [...salesData];
    let splitItems = [];

    updatedSalesData.forEach((item, idx) => {
      if (item.split > 0 && item.pcs >= item.split) {
        const splitItem = {
          ...item,
          pcs: item.split,
          amount: parseFloat(item.split) * parseFloat(item.rate),
        };
        // console.log("splitItem: ", splitItem);

        const remainingPcs = item.pcs - item.split;
        updatedSalesData[idx].pcs = remainingPcs;
        updatedSalesData[idx].split = 0;

        updatedSalesData[idx].amount =
          parseFloat(remainingPcs) * parseFloat(item.rate);
        // console.log("updatedSalesData: ", updatedSalesData[idx]);

        splitItems.push(splitItem);
      }
    });

    const filteredSalesData = updatedSalesData.filter((item) => item.pcs > 0);

    if (splitItems.length > 0) {
      setSalesData(filteredSalesData);
      sessionStorage.setItem("salesData", JSON.stringify(filteredSalesData));

      setPrintData(splitItems);

      const printTotalVal = calculatePrintTotalValues(splitItems);
      setPrintTotalValues(printTotalVal);

      setIsSplitPrinted(true);
    }
  };

  const calculatePrintTotalValues = (splitItems) => {
    let totalVolume = 0;
    let totalPcs = 0;
    let grossAmt = 0;
    let discountAmt = 0;
    let splDiscAmount = 0;
    let netAmt = 0;

    splitItems.forEach((item) => {
      const itemGrossAmt = item.rate * item.pcs;
      const itemDiscountAmt = item.discount || 0;
      const itemSplDiscAmount = item.splDiscAmount || 0;
      const itemNetAmt = itemGrossAmt - itemDiscountAmt - itemSplDiscAmount;

      totalVolume += item.volume;
      totalPcs += item.pcs;
      grossAmt += itemGrossAmt;
      discountAmt += itemDiscountAmt;
      splDiscAmount += itemSplDiscAmount;
      netAmt += itemNetAmt;
    });

    return {
      totalVolume: totalVolume.toFixed(2),
      totalPcs: totalPcs,
      grossAmt: grossAmt.toFixed(2),
      discountAmt: discountAmt.toFixed(2),
      splDiscAmount: splDiscAmount.toFixed(2),
      netAmt: netAmt.toFixed(2),
    };
  };

  useEffect(() => {
    if (isSplitPrinted) {
      handleCreateSale(printData);
      handlePrint();
    }
  }, [isSplitPrinted]);

  return (
    <ThemeProvider theme={customTheme}>
      <Box display="flex">
        <Box component="form" sx={{ p: 2, minWidth: "900px" }}>
          {/* <Typography variant="subtitle2" gutterBottom>
            Sale Entry:
          </Typography> */}
          <Grid container>
            <Grid item xs={3}>
              <div className="radio-buttons-wrapper">
                
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
                  sx={{ gap: "10px" }}
                >
                  <FormControlLabel
                    value="CASHBILL"
                    control={<Radio />}
                    label="Cash Bill"
                  />
                  <FormControlLabel
                    value="CREDITBILL"
                    control={<Radio />}
                    label="Credit Bill"
                  />
                </RadioGroup>
              </div>
            </Grid>

            <Grid item xs={3}>
              <div className="input-wrapper">
                <InputLabel
                  htmlFor="customerName"
                  className="input-label"
                  required
                >
                  Customer :
                </InputLabel>
                <TextField
                  select
                  fullWidth
                  inputRef={customerNameRef}
                  size="small"
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleCustomerNameChange}
                  onKeyDown={(e) => handleEnterKey(e, addressRef)}
                >
                  <MenuItem value="">None</MenuItem>
                  {allCustomerData.map((item) => (
                    <MenuItem key={item._id} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>

            <Grid item xs={3}>
              <div className="input-wrapper">
                <InputLabel htmlFor="address" className="input-label" required>
                  Address :
                </InputLabel>
                <TextField
                  fullWidth
                  inputRef={addressRef}
                  size="small"
                  name="address"
                  value={formData.address}
                  onChange={handleAddressChange}
                  onKeyDown={(e) => handleEnterKey(e, phoneNoRef)}
                />
              </div>
            </Grid>

            <Grid item xs={3}>
              <div className="input-wrapper">
                <InputLabel htmlFor="phoneNo" className="input-label" required>
                  Phone Number :
                </InputLabel>
                <TextField
                  fullWidth
                  inputRef={phoneNoRef}
                  size="small"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handlePhoneNoChange}
                  onKeyDown={(e) => handleEnterKey(e, billDateRef)}
                />
              </div>
            </Grid>

            <Grid item xs={3}>
              <div className="input-wrapper">
                <InputLabel htmlFor="stockIn" className="input-label" required>
                  Store Name :
                </InputLabel>
                <TextField
                  select
                  fullWidth
                  inputRef={storeNameRef}
                  id="stockIn"
                  size="small"
                  value={formData.store._id}
                  onChange={handleStoreChange}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    },
                  }}
                  onKeyDown={(e) => handleEnterKey(e, customerNameRef)}
                >
                  {allStores?.map((store) => (
                    <MenuItem key={store._id} value={store._id}>
                      {store.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>

            <Grid item xs={1.5}>
              <div className="input-wrapper">
                <InputLabel htmlFor="series" className="input-label">
                  Series:
                </InputLabel>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="series"
                  value={formData.series}
                  onChange={(e) =>
                    setFormData({ ...formData, series: e.target.value })
                  }
                  disabled={!seriesEditable}
                >
                  {["A", "C"].map((item, id) => (
                    <MenuItem key={id} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>

            <Grid item xs={1.5}>
              <div className="input-wrapper">
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={billNumber}
                  onChange={(e) =>
                    // setFormData({ ...formData, billno: e.target.value })
                    setBillNumber(e.target.value)
                  }
                  disabled={!seriesEditable}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    },
                  }}
                >
                  {seriesData?.map((item) => (
                    <MenuItem key={item._id} value={item.billNo}>
                      {item.billNo}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>

            <Grid item xs={3}>
              <div className="input-wrapper">
                <InputLabel htmlFor="billno" className="input-label">
                  Bill No. :
                </InputLabel>
                <TextField
                  fullWidth
                  inputRef={billNoRef}
                  size="small"
                  name="billno"
                  className="entryNo-adjustment"
                  value={billNumber}
                  onChange={handleBillNoChange}
                  disabled={!billNoEditable && !seriesEditable}
                  onKeyDown={(e) => {
                    if (billNoEditable && seriesEditable) {
                      handleEnterKey(e, billDateRef);
                    }
                  }}
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
                    // className="input-field"
                    onChange={handleBillDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </div>
            </Grid>
          </Grid>

          <Box
            sx={{ p: 1.5, boxShadow: 2, borderRadius: 1, marginTop: 0.5 }}
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
                  fullWidth
                  value={formData.itemCode}
                  onChange={handleItemCodeChange}
                  onKeyDown={handleKeyDown}
                  // onKeyDown={(e) => handleEnterKey(e, itemNameRef)}
                />
              </Grid>
              <Grid item xs={2.2}>
                <InputLabel className="input-label-2">Item Name</InputLabel>
                <TextField
                  inputRef={itemNameRef}
                  variant="outlined"
                  type="text"
                  size="small"
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
                    if (
                      e.key === "Enter" &&
                      formData.pcs <= formData.currentStock
                    ) {
                      e.preventDefault();
                      handleSubmitIntoDataTable(e);
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
                  fullWidth
                  value={formData.brk}
                  onChange={handleBrkChange}
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
                  fullWidth
                  value={formData.split}
                  onChange={(e) =>
                    setFormData({ ...formData, split: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (salesData.length > 0) {
                        flBeerVolRef.current.focus();
                      } else {
                        handleSubmitIntoDataTable(e);
                        handleEnterKey(e, itemCodeRef);
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>

            {searchMode ? (
              <SalebillSearchTable
                tableRef={tableRef}
                searchResults={searchResults}
                handleRowClick={handleRowClick}
                setSearchMode={setSearchMode}
                selectedRowIndex={selectedRowIndex}
                isLoading={isLoading}
                canRead={canRead}
                role={role}
                loadMoreData={loadMoreData}
                itemName={formData.itemName} 
                storeName={formData.store?.name}
                page={page}
                pageSize={pageSize}
                itemNameSearch={itemNameSearch}
              />
            ) : (
              <SalebillDataTable
                tableRef={tableRef}
                salesData={salesData}
                editedRow={editedRow}
                editableIndex={editableIndex}
                handleEdit={handleEdit}
                handleEditClick={handleEditClick}
                handleSaveClick={handleSaveClick}
                handleRemoveClick={handleRemoveClick}
                handleCreateSale={handleCreateSale}
                handlePrint={handlePrint}
                setSalesData={setSalesData}
                handlePrintClick={handlePrintClick}
                pcsEditRef={pcsEditRef}
                highlightedRows={highlightedRows}
                setHighlightedRows={setHighlightedRows}
              />
            )}
          </Box>

          {/* Calculation part */}
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
              <Grid item xs={1}>
                <InputLabel className="input-label-2">
                  FL/BEER Vol(ml)
                </InputLabel>
                <TextField
                  inputRef={flBeerVolRef}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={totalValues.flBeerVolume}
                  InputProps={{ readOnly: true }}
                  onKeyDown={(e) => handleEnterKey(e, imlVolRef)}
                />
              </Grid>
              <Grid item xs={1}>
                <InputLabel className="input-label-2">IML Vol(ml)</InputLabel>
                <TextField
                  inputRef={imlVolRef}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={totalValues.imlVolume}
                  InputProps={{ readOnly: true }}
                  onKeyDown={(e) => handleEnterKey(e, totalPcsRef)}
                />
              </Grid>
              <Grid item xs={0.8}>
                <InputLabel className="input-label-2">Total Pcs.</InputLabel>
                <TextField
                  inputRef={totalPcsRef}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={totalValues.totalPcs}
                  InputProps={{ readOnly: true }}
                  onKeyDown={(e) => handleEnterKey(e, grossAmtRef)}
                />
              </Grid>
              <Grid item xs={1.1}>
                <InputLabel className="input-label-2">
                  Gross Amt. (₹)
                </InputLabel>
                <TextField
                  inputRef={grossAmtRef}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={totalValues.grossAmt}
                  InputProps={{ readOnly: true }}
                  onKeyDown={(e) => handleEnterKey(e, rectMode1Ref)}
                />
              </Grid>
              <Grid item xs={1}>
                <InputLabel className="input-label-2">Cash</InputLabel>
                <TextField
                  inputRef={rectMode1Ref}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={totalValues.receiptMode1}
                  onChange={handleReceiptModeChange}
                  onKeyDown={(e) => handleEnterKey(e, rectMode2Ref)}
                />
              </Grid>
              <Grid item xs={1.3}>
                <InputLabel className="input-label-2">Online</InputLabel>
                <TextField
                  select
                  inputRef={rectMode2Ref}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={totalValues.receiptMode2}
                  onChange={(e) =>
                    setTotalValues({
                      ...totalValues,
                      receiptMode2: e.target.value,
                    })
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
                <InputLabel className="input-label-2">Online Amt.</InputLabel>
                <TextField
                  inputRef={rectMode2AmtRef}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={totalValues.receiptAmt}
                  onChange={(e) =>
                    setTotalValues({
                      ...totalValues,
                      receiptAmt: e.target.value,
                    })
                  }
                  onKeyDown={(e) => handleEnterKey(e, sDiscPercentRef)}
                />
              </Grid>
              <Grid item xs={0.8}>
                <InputLabel className="input-label-2">S Disc(%)</InputLabel>
                <TextField
                  inputRef={sDiscPercentRef}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={totalValues.splDiscount}
                  onChange={(e) =>
                    setTotalValues({
                      ...totalValues,
                      splDiscount: e.target.value,
                    })
                  }
                  onKeyDown={(e) => handleEnterKey(e, sDiscAmtRef)}
                />
              </Grid>
              <Grid item xs={1}>
                <InputLabel className="input-label-2">S Disc Amt.</InputLabel>
                <TextField
                  inputRef={sDiscAmtRef}
                  variant="outlined"
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
                  size="small"
                  fullWidth
                  value={totalValues.discountAmt}
                  InputProps={{ readOnly: true }}
                  onKeyDown={(e) => handleEnterKey(e, adjustmentRef)}
                />
              </Grid>
              {/* <Grid item xs={0.8}>
              <InputLabel className="input-label-2">Tax Amt.</InputLabel>
              <TextField
                inputRef={taxAmtRef}
                variant="outlined"
                size="small"
                fullWidth
                value={totalValues.taxAmt}
                InputProps={{ readOnly: true }}
                onKeyDown={(e) => handleEnterKey(e, adjustmentRef)}
              />
            </Grid> */}

              <Grid item xs={0.8}>
                <InputLabel className="input-label-2">Adjustment</InputLabel>
                <TextField
                  inputRef={adjustmentRef}
                  variant="outlined"
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
                  size="small"
                  fullWidth
                  value={totalValues.netAmt}
                  InputProps={{ readOnly: true }}
                  onKeyDown={(e) => handleEnterKey(e, saveButtonRef)}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box>
          <SaleBrandPanel
            storeName={formData.store.name}
            formData={formData}
            setFormData={setFormData}
            pcsRef={pcsRef}
            brandName={brandName}
            setBrandName={setBrandName}
            brandPanelLoading={brandPanelLoading}
            setBrandPanelLoading={setBrandPanelLoading}
            brandWiseItemData={brandWiseItemData}
            setBrandWiseItemData={setBrandWiseItemData}
            fetchAllBrandWiseItems={fetchAllBrandWiseItems}
            canRead={canRead}
            role={role}
          />
          <Box
            component="form"
            sx={{
              p: 1.2,
              marginTop: 1,
              borderRadius: 1,
              boxShadow: 2,
              maxWidth: 340,
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <InputLabel className="input-label-2">Total Sales:</InputLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={totalSales || 0}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel className="input-label-2">Total Cash:</InputLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={totalCash || 0}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel className="input-label-2">Total Online:</InputLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={totalOnline || 0}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: 1,
          marginTop: 0,
          // minWidth: "900px"
        }}
      >
        <Button
          color="inherit"
          size="small"
          variant="outlined"
          onClick={(e) => {
            setFormData({
              billType: "CASHBILL",
              customerName: "",
              store:
                allStores.length > 0 ? allStores[0] : { _id: "", name: "" },
              address: "",
              phoneNo: "",
              billDate: todaysDate,
              billno: "",
              storeId: "",
            });
            setBillNumber("");
            resetMiddleFormData();
            resetTotalValues();
            setSalesData([]);
            sessionStorage.setItem("salesData", JSON.stringify([]));
            handleEnterKey(e, itemCodeRef);
            setBillNoEditable(false);
            setSeriesEditable(false);
            setSearchMode(false);
            setIsAutoBillPrint(false);
          }}
          sx={{
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
          onClick={handlePrevClick}
          sx={{
            marginRight: 1,
            padding: "4px 10px",
            fontSize: "11px",
          }}
          disabled={role !== "admin" && !canUpdate}
        >
          PREV BILL
        </Button>
        <Button
          color="secondary"
          size="small"
          variant="outlined"
          onClick={handleNextClick}
          sx={{
            marginRight: 1,
            padding: "4px 10px",
            fontSize: "11px",
          }}
          disabled={role !== "admin" && !canUpdate}
        >
          NEXT BILL
        </Button>

        <Button
          color="error"
          size="small"
          variant="contained"
          onClick={handleDeleteSale}
          sx={{
            marginRight: 1,
            padding: "4px 10px",
            fontSize: "11px",
          }}
          disabled={role !== "admin" && !canDelete}
        >
          DELETE
        </Button>
        <Button
          color="warning"
          size="small"
          variant="contained"
          onClick={() => {
            billNoRef.current.focus();
            setBillNoEditable(true);
            setSeriesEditable(true);
          }}
          sx={{
            marginRight: 1,
            padding: "4px 10px",
            fontSize: "11px",
          }}
          disabled={role !== "admin" && !canUpdate}
        >
          OPEN
        </Button>
        <Button
          color="info"
          size="small"
          variant="contained"
          onClick={handlePrint}
          sx={{
            marginRight: 1,
            padding: "4px 10px",
            fontSize: "11px",
          }}
          disabled={!canRead && role !== "admin"}
        >
          PRINT
        </Button>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={handleSaveAndPrint}
          sx={{
            marginRight: 1,
            padding: "4px 10px",
            fontSize: "11px",
          }}
          // disabled={!billNumber && !billNoEditable}
        >
          SAVE & PRINT
        </Button>
        <Button
          ref={saveButtonRef}
          color="success"
          size="small"
          variant="contained"
          onClick={() => {
            if (!billNumber && !billNoEditable) handleCreateSale();
            else if (billNumber && billNoEditable) handleUpdateSale();
          }}
          sx={{
            padding: "4px 10px",
            fontSize: "11px",
          }}
          // disabled={!billNumber && !billNoEditable}
        >
          SAVE
        </Button>
      </Box>

      <SaleBillPrintModal
        ref={printModalRef}
        salesData={salesData}
        formData={formData}
        totalValues={totalValues}
        licenseDetails={licenseDetails}
        billNumber={formData.billno || billNumber}
        printData={printData}
        isSplitPrinted={isSplitPrinted}
        printTotalValues={printTotalValues}
      />

    </ThemeProvider>
  );
};

export default SaleBill;
