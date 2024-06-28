import React, { useEffect, useRef, useState } from "react";
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
  ThemeProvider,
  Input,
  CircularProgress,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { customTheme } from "../../../utils/customTheme";
import { getAllStores } from "../../../services/storeService";
import { NotificationManager } from "react-notifications";
import {
  createTransfer,
  getTransferDetails,
  getTransferDetailsByItemCode,
  getTransferDetailsByItemName,
  removeTransferDetails,
} from "../../../services/transferService";
import debounce from "lodash.debounce";
import CloseIcon from "@mui/icons-material/Close";

const StockTransfer = () => {
  const toDaysDate = dayjs();
  const [allGodownStores, setAllGodownStores] = useState([]);
  const [allNonGodownStores, setAllNonGodownStores] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const [formData, setFormData] = useState({
    transferFrom: "",
    transferTo: "",
    transferDate: toDaysDate,
    itemId: "",
    itemDetailsId: "",
    itemCode: "",
    itemName: "",
    mrp: "",
    batch: "",
    case: "",
    caseValue: "",
    pcs: "",
    brand: "",
    category: "",
    volume: "",
    currentStock: "",
  });
  const [searchMode, setSearchMode] = useState(false);
  const [editableIndex, setEditableIndex] = useState(-1);
  const [editedRow, setEditedRow] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transferNo, setTransferNo] = useState("");
  const [transferNoEditable, setTransferNoEditable] = useState(false);

  const tableRef = useRef(null);
  const itemCodeRef = useRef(null);
  const itemNameRef = useRef(null);
  const mrpRef = useRef(null);
  const batchRef = useRef(null);
  const caseRef = useRef(null);
  const pcsRef = useRef(null);
  const brandRef = useRef(null);
  const categoryRef = useRef(null);
  const volumeRef = useRef(null);
  const transferFromRef = useRef(null);
  const transferToRef = useRef(null);
  const transferDateRef = useRef(null);
  const transferNoRef = useRef(null);
  const saveButtonRef = useRef(null);
  const newTransferRef = useRef(null);

  const resetTopFormData = () => {
    setFormData({
      transferFrom: "",
      transferTo: "",
      transferDate: toDaysDate,
    });
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
      case: "",
      pcs: "",
      brand: "",
      category: "",
      volume: "",
    }));
  };

  const convertToDayjsObject = (dateStr) => {
    return dayjs(dateStr, "DD/MM/YYYY");
  };

  const fetchAllStores = async () => {
    try {
      const allStoresResponse = await getAllStores();
      const allStoresData = allStoresResponse?.data?.data;

      if (!allStoresData) {
        throw new Error("No data received from getAllStores");
      }

      const allGodowns = [];
      const allNonGodowns = [];

      allStoresData.forEach((store) => {
        if (store?.type === "GODOWN") {
          allGodowns.push(store);
        } else {
          allNonGodowns.push(store);
        }
      });

      setAllGodownStores(allGodowns);
      setAllNonGodownStores(allNonGodowns);

      // console.log("allGodowns ---> ", allGodowns);
      // console.log("allNonGodowns ---> ", allNonGodowns);
    } catch (error) {
      NotificationManager.error(
        "Error fetching stores. Please try again later.",
        "Error"
      );
      console.error("Error fetching stores:", error);
    }
  };

  const itemCodeSearch = debounce(async (itemCode) => {
    try {
      setIsLoading(true);
      const response = await getTransferDetailsByItemCode(itemCode);
      // console.log("itemCodeSearch response: ", response);
      const searchedItem = response?.data?.data[0];
      // console.log("searchedItem: ", searchedItem);

      if (searchedItem) {
        setSearchResults(searchedItem);
        setFormData({
          ...formData,
          itemId: searchedItem.item._id,
          itemCode: searchedItem.itemCode || "",
          itemName: searchedItem.item.name || "",
          mrp: searchedItem.mrp || 0,
          batch: searchedItem.batchNo || 0,
          case: searchedItem.case || null,
          caseValue: searchedItem.item.caseValue || 0,
          pcs: searchedItem.pcs || 0,
          volume: searchedItem.item?.volume || 0,
          brand: searchedItem.item?.brand?.name || "",
          category: searchedItem.item?.category?.categoryName || "",
          currentStock: searchedItem.currentStock,
        });
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
  }, 700);

  const itemNameSearch = debounce(async (itemName) => {
    try {
      setIsLoading(true);
      const response = await getTransferDetailsByItemName(itemName);
      // console.log("itemNameSearch response: ", response);
      if (response?.data?.data) {
        setSearchResults(response?.data?.data);
        // console.log("ami itemNameSearch res ", searchResults);
      } else {
        // NotificationManager.error("No matching items found");
        setSearchResults([]);
        // setIsModalOpen(true);
        // setItemName(itemName);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching items:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 500);

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
            batch: selectedRow?.batchNo || "",
            case: selectedRow.case || null,
            caseValue: selectedRow.item?.caseValue || null,
            pcs: selectedRow.pcs || null,
            volume: selectedRow.item?.volume || 0,
            brand: selectedRow.item?.brand?.name || "",
            category: selectedRow.item?.category?.categoryName || "",
            currentStock: selectedRow.currentStock,
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
    fetchAllStores();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 120) {
        handleCreateTransfer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [formData]);

  useEffect(() => {
    if (transferDateRef.current) {
      transferDateRef.current.addEventListener("keydown", (e) =>
        handleEnterKey(e, itemCodeRef)
      );
    }
  }, []);

  const handleItemCodeChange = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, itemCode: value });
    await itemCodeSearch(value);

    if (!value) {
      resetMiddleFormData();
    }

    setEditedRow({});
    setEditableIndex(-1);
  };

  const handleItemNameChange = (event) => {
    const value = event.target.value;
    itemNameSearch(value);
    setFormData({
      ...formData,
      itemName: value,
    });
    setSearchMode(true);
    if (!value) {
      setSearchMode(false);
      resetMiddleFormData();
    }

    setEditedRow({});
    setEditableIndex(-1);
  };

  const handlePcsChange = (e) => {
    const regex = /^\d*\.?\d*$/;
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

    if (regex.test(e.target.value) || e.target.value === "") {
      setFormData({ ...formData, case: 0, pcs: e.target.value });
    }
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

  const handleSubmitIntoDataTable = (e) => {
    e.preventDefault();

    if (!formData.itemName) {
      NotificationManager.warning(`Please fill the Item Name`);
      return;
    }
    // if (!formData.mrp) {
    //   NotificationManager.warning(`Please fill the MRP`);
    //   return;
    // }
    if (!formData.pcs) {
      NotificationManager.warning(`Please fill the Pcs`);
      return;
    }

    if (formData.pcs > formData.currentStock) {
      NotificationManager.warning(
        `Out of Stock! Currently you have ${
          formData.currentStock || 0
        }pcs in stock.`
      );
      pcsRef.current.focus();
      return;
    }

    setTransferData([...transferData, formData]);
    resetMiddleFormData();
    handleEnterKey(e, itemCodeRef);
    setSearchMode(false);
  };

  const handleEdit = (e) => {};
  const handleEditClick = (e) => {};

  const handleSaveClick = (e) => {};

  const handleRowClick = (index) => {
    const selectedRow = searchResults[index];
    // console.log(selectedRow);

    setFormData({
      ...formData,
      itemId: selectedRow.item._id,
      itemCode: selectedRow.itemCode || "",
      itemName: selectedRow.item.name || 0,
      mrp: selectedRow.mrp || 0,
      batch: selectedRow?.batchNo || "",
      case: selectedRow.case || null,
      caseValue: selectedRow.item?.caseValue || null,
      pcs: selectedRow.pcs || null,
      volume: selectedRow.item?.volume,
      brand: selectedRow.item?.brand?.name || "",
      category: selectedRow.item?.category?.categoryName || "",
      currentStock: selectedRow.currentStock,
    });

    caseRef.current.focus();
  };

  const handleRemoveClick = (index) => {
    const updatedTrasfer = [...transferData];
    updatedTrasfer.splice(index, 1);
    setTransferData(updatedTrasfer);
  };

  const handleEnterKey = (event, nextInputRef) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();

      nextInputRef.current.focus();
    }
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

  const transferNoSearch = debounce(async () => {
    try {
      if (transferNo) {
        const response = await getTransferDetails(transferNo);

        if (response?.data?.data) {
          const receivedData = response.data.data;

          // console.log("transferNoSearch Data: ", receivedData);
          const transferDateObject = convertToDayjsObject(
            receivedData.transferDate
          );

          setFormData((prevData) => ({
            ...prevData,
            transferFrom: receivedData.transferFrom?._id,
            transferTo: receivedData.transferTo?._id,
            transferDate: transferDateObject,
          }));

          const stockTransferItems = receivedData?.stockTransferItems;
          const newTransferItems = stockTransferItems.map((transfer) => ({
            itemCode: transfer?.itemCode || 0,
            itemDetailsId: transfer?._id,
            itemId: transfer.itemId?._id,
            itemName: transfer.itemId?.name || "",
            mrp: transfer.mrp || 0,
            batch: transfer.batchNo || 0,
            pcs: transfer.pcs || 0,
            case: transfer.case || 0,
            volume: transfer.itemId?.volume || 0,
            brand: transfer.itemId?.brandId?.name || "",
            category: transfer.itemId?.categoryId?.categoryName || "",
            // currentStock: transfer.itemId?.stock || 0
          }));
          // console.log("newTransferItems: ", newTransferItems);

          setTransferData([...newTransferItems]);
        } else {
          resetTopFormData();
          resetMiddleFormData();
          setTransferData([]);
          NotificationManager.error("No transfer details found!");
        }
      }
    } catch (error) {
      resetTopFormData();
      resetMiddleFormData();
      setTransferData([]);
      NotificationManager.error("Error fetching transfer details!");
      console.error("Error fetching transfer:", error);
    }
  }, 700);

  useEffect(() => {
    if (transferNo && transferNoEditable) {
      transferNoSearch(transferNo);
    }
  }, [transferNo]);

  const handleCreateTransfer = async () => {
    const transferDateObj = formatDate(formData.transferDate);

    if (!formData.transferFrom) {
      NotificationManager.warning("Please input in Transfer From field.");
      transferFromRef.current.focus();
      return;
    }

    if (!formData.transferTo) {
      NotificationManager.warning("Please input in Transfer To field.");
      transferToRef.current.focus();
      return;
    }

    if (!formData.transferDate) {
      NotificationManager.warning("Please input in Transfer Date field.");
      transferDateRef.current.focus();
      return;
    }

    if (transferData.length <= 0) {
      NotificationManager.warning("Enter some item to transfer.", "Warning");
      itemNameRef.current.focus();
      return;
    }

    const payload = {
      transferFrom: formData.transferFrom,
      transferTo: formData.transferTo,
      transferDate: transferDateObj,

      transferItems: transferData.map((item) => ({
        itemCode: item.itemCode.toString(),
        itemId: item.itemId.toString(),
        mrp: parseFloat(item.mrp) || 0,
        batchNo: item.batch.toString(),
        caseNo: parseFloat(item.case) || 0,
        pcs: parseFloat(item.pcs) || 0,
      })),
    };

    try {
      const response = await createTransfer(payload);
      // console.log("response: ", response);
      if (response.status === 200) {
        NotificationManager.success("Transfer created successfully", "Success");
        setSearchMode(false);
        newTransferRef.current.focus();
        setTransferNo(response.data.data.transferNo);
      } else {
        NotificationManager.error("Problem creating transfer", "Error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTransfer = async () => {
    try {
      if (transferNoEditable && transferNo) {
        const response = await removeTransferDetails(transferNo);
        // console.log("del response: ", response);
        if (response.status === 200) {
          NotificationManager.success(
            "Transfer deleted successfully.",
            "Success"
          );
          resetTopFormData();
          resetMiddleFormData();
          setTransferNoEditable(true);
          setTransferData([]);
          setEditedRow({});
          setSelectedRowIndex(null);
          setSearchMode(false);
          setEditableIndex(-1);
        } else {
          console.log("error: ", response);
          NotificationManager.error(
            "Error deleting transfer. Please try again later.",
            "Error"
          );
        }
      } else {
        if (!transferNoEditable && transferNo) {
          NotificationManager.warning(
            "Transfer No field is disabled!",
            "Please click on Open Button to enable it."
          );
        }
        if (transferNoEditable && !transferNo) {
          NotificationManager.warning(
            "Please input something in transfer no. field!"
          );
        }
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting transfer. Please try again later.",
        "Error"
      );
      console.log(error);
    }
  };

  const handlePreviousTransfer = () => {
    // console.log(transferNoEditable);
    if (transferNo && transferNoEditable) {
      if (parseInt(transferNo) > 1) {
        // console.log("prev executing...");
        setTransferNo(parseInt(transferNo) - 1);
      }
    }
  };

  const handleNextTransfer = () => {
    if (transferNo && transferNoEditable)
      // console.log("next executing...")
      setTransferNo(parseInt(transferNo) + 1);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle1" component="div" gutterBottom>
          Stock Transfer
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="transferFrom" className="input-label">
                Transfer from :
              </InputLabel>
              <TextField
                select
                fullWidth
                inputRef={transferFromRef}
                name="transferFrom"
                value={formData.transferFrom}
                onChange={(e) =>
                  setFormData({ ...formData, transferFrom: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, transferToRef)}
              >
                {allGodownStores?.map((store) => (
                  <MenuItem key={store._id} value={store._id}>
                    {store.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="Transfer to" className="input-label">
                Transfer To :
              </InputLabel>
              <TextField
                select
                fullWidth
                inputRef={transferToRef}
                name="Transfer to"
                value={formData.transferTo}
                onChange={(e) =>
                  setFormData({ ...formData, transferTo: e.target.value })
                }
                onKeyDown={(e) => handleEnterKey(e, transferDateRef)}
              >
                {allNonGodownStores?.map((store) => (
                  <MenuItem key={store._id} value={store._id}>
                    {store.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="transferNo" className="input-label">
                Transfer No :
              </InputLabel>
              <TextField
                fullWidth
                inputRef={transferNoRef}
                name="transferNo"
                value={transferNo}
                disabled={!transferNoEditable}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) {
                    setTransferNo(value);
                  }
                }}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="transferDate" className="input-label">
                Transfer Date :
              </InputLabel>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <DatePicker
                  inputRef={transferDateRef}
                  name="transferDate"
                  value={formData.transferDate}
                  format="DD/MM/YYYY"
                  sx={{ width: "100%" }}
                  onChange={(newDate) =>
                    setFormData({ ...formData, transferDate: newDate })
                  }
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" />
                  )}
                  fullWidth
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
              <InputLabel className="input-label-2">Item Code</InputLabel>
              <TextField
                inputRef={itemCodeRef}
                variant="outlined"
                size="small"
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
                fullWidth
                value={formData.itemName}
                onChange={handleItemNameChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Tab") {
                    if (
                      transferData.length > 0 &&
                      formData.itemCode.trim() === "" &&
                      formData.itemName.trim() === ""
                    ) {
                      handleEnterKey(e, saveButtonRef);
                    } else {
                      handleEnterKey(e, mrpRef);
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={1.2}>
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
            <Grid item xs={1.2}>
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
                onKeyDown={(e) => handleEnterKey(e, caseRef)}
              />
            </Grid>

            <Grid item xs={1}>
              <InputLabel className="input-label-2">Case</InputLabel>
              <TextField
                fullWidth
                size="small"
                inputRef={caseRef}
                value={formData.case}
                onChange={(e) => handleCaseChange(e)}
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
                    handleEnterKey(e, itemCodeRef);
                  }
                }}
              />
            </Grid>

            <Grid item xs={1.6}>
              <InputLabel className="input-label-2">Brand</InputLabel>
              <TextField
                inputRef={brandRef}
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.brand}
                // onChange={handleRateChange}
                onKeyDown={(e) => handleEnterKey(e, categoryRef)}
              />
            </Grid>

            <Grid item xs={1.3}>
              <InputLabel className="input-label-2">Category</InputLabel>
              <TextField
                inputRef={categoryRef}
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.category}
                // onChange={handleDiscountChange}
                onKeyDown={(e) => handleEnterKey(e, volumeRef)}
              />
            </Grid>
            <Grid item xs={0.8}>
              <InputLabel className="input-label-2">Volume</InputLabel>
              <TextField
                inputRef={volumeRef}
                variant="outlined"
                size="small"
                fullWidth
                value={formData.volume}
                aria-readonly
                // onChange={handleAmountChange}
                onKeyDown={(e) => handleEnterKey(e, saveButtonRef)}
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
                    <TableCell align="center">Current Stock</TableCell>
                    <TableCell align="center">Volume</TableCell>
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
                          {row?.item?.name || "No Data"}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.mrp || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.batchNo || 0}
                        </TableCell>
                        {/* <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.case || 0}
                        </TableCell> */}
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.currentStock || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.item?.volume || 0}
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
              <Table size="small">
                <TableHead className="table-head">
                  <TableRow>
                    <TableCell>S. No.</TableCell>
                    <TableCell>Item Code</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>MRP</TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>Case</TableCell>
                    <TableCell>Pcs</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="purchase-data-table">
                  {transferData?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: "#fff",
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.itemCode}</TableCell>
                      <TableCell>
                        {/* {editableIndex === index ? (
                          <Input
                            type="text"
                            value={editedRow.itemName || row.itemName}
                            onChange={(e) =>
                              handleEdit(index, "itemName", e.target.value)
                            }
                          />
                        ) : ( */}
                        {row.itemName}
                        {/* )} */}
                      </TableCell>
                      <TableCell>{row.mrp}</TableCell>

                      <TableCell>{row.batch}</TableCell>

                      <TableCell>
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

                      <TableCell>{row.brand}</TableCell>

                      <TableCell>{row.category}</TableCell>

                      <TableCell>{row.volume}</TableCell>

                      <TableCell>
                        {/* {editableIndex !== index ? (
                          <EditIcon
                            sx={{ cursor: "pointer", color: "blue" }}
                            onClick={() => handleEditClick(index)}
                          />
                        ) : (
                          <SaveIcon
                            sx={{ cursor: "pointer", color: "green" }}
                            onClick={() => handleSaveClick(index)}
                          />
                        )} */}
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid container spacing={1} sx={{ marginTop: 0.8 }}>
            <Grid item xs={2.5}>
              <div className="input-wrapper">
                <InputLabel className="input-label">Total Pcs:</InputLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  disabled
                  // onKeyDown={(e) => handleEnterKey(e, netAmtRef)}
                />
              </div>
            </Grid>

            <Grid
              item
              xs={9.5}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="inherit"
                size="small"
                variant="contained"
                ref={newTransferRef}
                onClick={(e) => {
                  resetTopFormData();
                  setTransferNo("");
                  resetMiddleFormData();
                  setTransferNoEditable(false);
                  setSearchMode(false);
                  setTransferData([]);
                  handleEnterKey(e, itemCodeRef);
                  // setBillNoEditable(false);
                }}
                sx={{
                  marginRight: 1,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
              >
                New Transfer
              </Button>

              <Button
                color="success"
                size="small"
                variant="outlined"
                onClick={handlePreviousTransfer}
                sx={{
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
                onClick={handleNextTransfer}
                sx={{
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
                onClick={handleDeleteTransfer}
                sx={{
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
                onClick={() => {
                  setTransferNoEditable(true);
                  transferNoRef.current.focus();
                }}
                sx={{
                  marginRight: 1,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
              >
                OPEN
              </Button>

              <Button
                ref={saveButtonRef}
                color="success"
                size="small"
                variant="contained"
                onClick={handleCreateTransfer}
                sx={{
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     handleCreateSale();
                //     handleEnterKey(e, itemCodeRef);
                //   }
                // }}
              >
                SAVE
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default StockTransfer;
