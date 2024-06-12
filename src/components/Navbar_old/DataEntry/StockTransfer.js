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

const StockTransfer = () => {
  const toDaysDate = dayjs();
  const [allGodownStores, setAllGodownStores] = useState([]);
  const [allNonGodownStores, setAllNonGodownStores] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [formData, setFormData] = useState({
    transferFrom: "",
    transferTo: "",
    transferNo: "",
    transferDate: toDaysDate,
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
    volume: ""
  })
  const [searchMode, setSearchMode] = useState(false);
  const [editableIndex, setEditableIndex] = useState(-1);
  const [editedRow, setEditedRow] = useState({});
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const tableRef = useRef(null);
  const storeNameRef = useRef(null);
  const itemCodeRef = useRef(null);
  const itemNameRef = useRef(null);
  const mrpRef = useRef(null);
  const batchRef = useRef(null);
  const caseRef = useRef(null);
  const pcsRef = useRef(null);
  const brandRef = useRef(null);
  const categoryRef = useRef(null);
  const volumeRef = useRef(null);
  const totalMrpRef = useRef(null);
  const sDiscountRef = useRef(null);
  const totalGroRef = useRef(null);
  const totalSPRef = useRef(null);
  const tcsAmtRef = useRef(null);
  const grossAmountRef = useRef(null);
  const totalDiscountRef = useRef(null);
  const otherChargesRef = useRef(null);
  const adjustmentRef = useRef(null);
  const netAmountRef = useRef(null);
  const saveButtonRef = useRef(null);
  const clearButtonRef = useRef(null);

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
        if (store?.type === "Godown") {
          allGodowns.push(store);
        } else {
          allNonGodowns.push(store);
        }
      });
  
      setAllGodownStores(allGodowns);
      setAllNonGodownStores(allNonGodowns);
  
      console.log("allGodowns ---> ", allGodowns);
      console.log("allNonGodowns ---> ", allNonGodowns);
    } catch (error) {
      NotificationManager.error(
        "Error fetching stores. Please try again later.",
        "Error"
      );
      console.error("Error fetching stores:", error);
    }
  };
  

  useEffect(() => {
    fetchAllStores();
  }, [])

  const handleItemCodeChange = () => {}
  const handleItemNameChange = () => {}

  const handlePcsChange =()=>{}
  const handleCaseChange=() => {}

  const handleSubmitIntoDataTable =() => {}

  const handleEdit = (e) => {}
  const handleEditClick = (e) => {}

  const handleSaveClick = (e) => {}
  const handleRowClick = (e) => {}

  const handleRemoveClick = (e) => {}
  const handleEnterKey = (e) => {}


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
                name="transferFrom"
                value={formData.transferFrom}
                onChange={(e) => setFormData({...formData, transferFrom: e.target.value})}
              >
                {allGodownStores?.map((store) => (
                  <MenuItem key={store._id} value={store.name}>
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
                name="transferNo"
                value={formData.transferNo}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) {
                    setFormData({...formData, transferNo: e.target.value})}
                  }
                }
              />
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
                name="Transfer to"
                value={formData.transferTo}
                onChange={(e) => setFormData({...formData, transferTo: e.target.value})}
              >
                {allNonGodownStores?.map((store) => (
                  <MenuItem key={store._id} value={store.name}>
                    {store.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="transferDate" className="input-label">
                Transfer Date :
              </InputLabel>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="transferDate"
                  value={formData.transferDate}
                  format="DD/MM/YYYY"
                  sx={{ width: "100%" }}
                  onChange={(newDate) => setFormData({...formData, transferDate: newDate})}
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
                type="text"
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
                onKeyDown={(e) => handleEnterKey(e, mrpRef)}
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
                onKeyDown={(e) => handleEnterKey(e, pcsRef)}
              />
            </Grid>

            <Grid item xs={1}>
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

            <Grid item xs={1.5}>
              <InputLabel className="input-label-2">Brand</InputLabel>
              <TextField
                inputRef={brandRef}
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.brand}
                // onChange={handleRateChange}
                // onKeyDown={(e) => handleEnterKey(e, discountRef)}
              />
            </Grid>

            <Grid item xs={1}>
              <InputLabel className="input-label-2">Category</InputLabel>
              <TextField
                inputRef={categoryRef}
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={formData.category}
                // onChange={handleDiscountChange}
                // onKeyDown={handleDiscountKeyDown}
              />
            </Grid>
            <Grid item xs={1.2}>
              <InputLabel className="input-label-2">Volume</InputLabel>
              <TextField
                inputRef={volumeRef}
                variant="outlined"
                size="small"
                fullWidth
                value={formData.volume}
                aria-readonly
                // onChange={handleAmountChange}
                // onKeyDown={(e) => handleEnterKey(e, brkRef)}
              />
            </Grid>

            {/* <Grid item xs={1}>
              <InputLabel className="input-label-2">Brk.</InputLabel>
              <TextField
                inputRef={brkRef}
                variant="outlined"
                type="text"
                size="small"
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
            </Grid> */}
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
                    <TableCell align="center">Case</TableCell>
                    <TableCell align="center">Pcs</TableCell>
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
                          {row?.item[0]?.name || "No Data"}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.mrp || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.batchNo || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.case || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.pcs || 0}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.volume || 0}
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
              <Table size="small">
                <TableHead className="table-head">
                  <TableRow>
                    <TableCell>S. No.</TableCell>
                    <TableCell>Item Code</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>MRP</TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>Case Value</TableCell>
                    <TableCell>Pcs</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Volume</TableCell>
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

                      <TableCell>
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.brand || row.brand}
                            onChange={(e) =>
                              handleEdit(index, "brand", e.target.value)
                            }
                          />
                        ) : (
                          row.brand
                        )}
                      </TableCell>

                      <TableCell>
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.category || row.category}
                            onChange={(e) =>
                              handleEdit(index, "category", e.target.value)
                            }
                          />
                        ) : (
                          row.category
                        )}
                      </TableCell>

                      <TableCell>
                        {editableIndex === index ? (
                          <Input
                            value={editedRow.volume || row.volume}
                            onChange={(e) =>
                              handleEdit(index, "volume", e.target.value)
                            }
                          />
                        ) : (
                          row.volume
                        )}
                      </TableCell>

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
                        )}
                        <CloseIcon
                          sx={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleRemoveClick(index)}
                        /> */}
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
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="inherit"
          size="medium"
          variant="contained"
          onClick={(e) => {
            // resetTopFormData();
            // resetMiddleFormData();
            // resetTotalValues();
            // setSalesData([]);
            // handleEnterKey(e, itemCodeRef);
            // setBillNoEditable(false);
          }}
          sx={{
            marginTop: 1,
            marginRight: 1,
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: "11px",
          }}
        >
          New Transfer
        </Button>
        <Button
            color="warning"
            size="medium"
            variant="contained"
            // onClick={handlePurchaseOpen}
            sx={{
              marginTop: 1,
              marginRight: 1,
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: "11px",
            }}
          >
            OPEN
          </Button>

        <Button
          color="error"
          size="medium"
          variant="contained"
          onClick={() => {}}
          sx={{
            marginTop: 1,
            marginRight: 1,
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: "11px",
          }}
        >
          DELETE
        </Button>
        
        <Button
          ref={saveButtonRef}
          color="success"
          size="medium"
          variant="contained"
          // onClick={handleCreateSale}
          sx={{
            marginTop: 1,
            borderRadius: 8,
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
      </Box>
      </Box>
    </ThemeProvider>
  );
};

export default StockTransfer;
