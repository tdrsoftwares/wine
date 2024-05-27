import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { getAllCustomer } from "../../../services/customerService";
import { NotificationManager } from "react-notifications";
import { getAllItems } from "../../../services/itemService";
import { getAllBrands } from "../../../services/brandService";
import { getAllSuppliers } from "../../../services/supplierService";
import { DataGrid } from "@mui/x-data-grid";

const ItemWiseSaleReport = () => {
  const [selectOptions, setselectOptions] = useState(null);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
    batchNo: "",
    customerName: "",
    brandName: "",
    itemName: "",
    itemCode: "",
    supplierName: "",
    series: "",
    group: "",
    userName: "",
    billNo: "",
    pack: "",
    phone: "",
    isShortChecked: false,
    isBrkSummaryChecked: false,
  });
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [totalCount, setTotalCount] = useState(0);

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      width: 90,
      headerClassName: "custom-header",
    },
    {
      field: "itemCode",
      headerName: "Item Code",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "itemName",
      headerName: "Item Name",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "brandName",
      headerName: "Brand",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "customerName",
      headerName: "Customer",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "supplierName",
      headerName: "Supplier",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "batchNo",
      headerName: "Batch No.",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "series",
      headerName: "Series",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "group",
      headerName: "Group",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "billNo",
      headerName: "Bill No.",
      width: 120,
      headerClassName: "custom-header",
    },

    {
      field: "mrp",
      headerName: "MRP",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "pcs",
      headerName: "Pcs.",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "pack",
      headerName: "Pack",
      width: 120,
      headerClassName: "custom-header",
    },
    // {
    //   field: "caseNo",
    //   headerName: "Case No.",
    //   width: 120,
    //   headerClassName: "custom-header",
    // },
    // {
    //   field: "purchaseRate",
    //   headerName: "Purchase Rate",
    //   width: 150,
    //   headerClassName: "custom-header",
    // },
    {
      field: "rate",
      headerName: "Rate",
      width: 120,
      headerClassName: "custom-header",
    },

    {
      field: "itemAmount",
      headerName: "Amount",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 150,
      headerClassName: "custom-header",
    },
  ];

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

  const fetchAllItems = async () => {
    try {
      const allItemsResponse = await getAllItems();
      setAllItems(allItemsResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching items. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllBrands = async () => {
    try {
      const allBrandResponse = await getAllBrands();
      setAllBrands(allBrandResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllSuppliers = async () => {
    try {
      const response = await getAllSuppliers();
      setAllSuppliers(response?.data?.data || []);
    } catch (error) {
      NotificationManager.error(
        "Error fetching suppliers. Please try again later.",
        "Error"
      );
    }
  };

  useEffect(() => {
    fetchAllSuppliers()
    fetchAllBrands()
    fetchAllItems()
    fetchAllCustomers();
  },[])

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Item Wise Sale Report:
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Filter By:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RadioGroup
            row
            name="selectOptions"
            aria-labelledby="selectOptions"
            value={selectOptions}
            onChange={(e) => setselectOptions(e.target.value)}
          >
            <FormControlLabel value="date" control={<Radio />} label="Date" />
            <FormControlLabel
              value="customer"
              control={<Radio />}
              label="Customer"
            />

            <FormControlLabel value="brand" control={<Radio />} label="Brand" />
            <FormControlLabel
              value="itemName"
              control={<Radio />}
              label="Item Name"
            />
            <FormControlLabel
              value="itemCode"
              control={<Radio />}
              label="Item Code"
            />
            <FormControlLabel
              value="supplier"
              control={<Radio />}
              label="Supplier"
            />
            <FormControlLabel value="batch" control={<Radio />} label="Batch" />
            <FormControlLabel
              value="series"
              control={<Radio />}
              label="Series"
            />
            <FormControlLabel value="group" control={<Radio />} label="Group" />
            <FormControlLabel value="billNo" control={<Radio />} label="Bill" />
            <FormControlLabel value="pack" control={<Radio />} label="Pack" />

          </RadioGroup>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="dateFrom" className="input-label">
              Date from:
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="dateFrom"
                format="DD/MM/YYYY"
                value={filterData.dateFrom}
                className="input-field date-picker"
                onChange={(newDate) =>
                  setFilterData({ ...filterData, dateFrom: newDate })
                }
                renderInput={(params) => <TextField {...params} />}
                disabled={selectOptions === "date" ? false : true}
              />
            </LocalizationProvider>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="dateTo" className="input-label">
              Date to:
            </InputLabel>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="dateTo"
                format="DD/MM/YYYY"
                value={filterData.dateTo}
                className="input-field date-picker"
                onChange={(newDate) =>
                  setFilterData({ ...filterData, dateTo: newDate })
                }
                renderInput={(params) => <TextField {...params} />}
                disabled={selectOptions === "date" ? false : true}
              />
            </LocalizationProvider>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="customerName" className="input-label">
              Customer:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="customerName"
              className="input-field"
              value={filterData.customerName}
              onChange={(e) =>
                setFilterData({ ...filterData, customerName: e.target.value })
              }
              disabled={selectOptions === "customer" ? false : true}
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
              {allCustomerData?.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="brandName" className="input-label">
              Brand:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="brandName"
              className="input-field"
              value={filterData.brandName}
              onChange={(e) =>
                setFilterData({ ...filterData, brandName: e.target.value })
              }
              disabled={selectOptions === "brand" ? false : true}
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
              {allBrands?.map((brand) => (
                <MenuItem key={brand._id} value={brand.name}>
                  {brand.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="itemName" className="input-label">
              Item:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="itemName"
              className="input-field"
              value={filterData.itemName}
              onChange={(e) =>
                setFilterData({ ...filterData, itemName: e.target.value })
              }
              disabled={selectOptions === "itemName" ? false : true}
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
              {allItems?.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="itemCode" className="input-label">
              ItemCode:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="itemCode"
              className="input-field"
              value={filterData.itemCode}
              onChange={(e) =>
                setFilterData({ ...filterData, itemCode: e.target.value })
              }
              disabled={selectOptions === "itemCode" ? false : true}
            />
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="Supplier" className="input-label">
              Supplier:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="Supplier"
              className="input-field"
              value={filterData.supplierName}
              onChange={(e) =>
                setFilterData({ ...filterData, supplierName: e.target.value })
              }
              disabled={selectOptions === "supplier" ? false : true}
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
              {allSuppliers?.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="batchNo" className="input-label">
              Batch No.:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="batchNo"
              className="input-field"
              value={filterData.batchNo}
              onChange={(e) =>
                setFilterData({ ...filterData, batchNo: e.target.value })
              }
              disabled={selectOptions === "batch" ? false : true}
            />
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="series" className="input-label">
              Series:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="series"
              className="input-field"
              value={filterData.series}
              onChange={(e) =>
                setFilterData({ ...filterData, series: e.target.value })
              }
              disabled={selectOptions === "series" ? false : true}
            />
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="group" className="input-label">
              Group:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="group"
              className="input-field"
              value={filterData.group}
              onChange={(e) =>
                setFilterData({ ...filterData, group: e.target.value })
              }
              disabled={selectOptions === "group" ? false : true}
            >
              {["FL", "BEER", "IML"].map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="group" className="input-label">
              Bill No:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="billNo"
              className="input-field"
              value={filterData.billNo}
              onChange={(e) =>
                setFilterData({ ...filterData, billNo: e.target.value })
              }
              disabled={selectOptions === "billNo" ? false : true}
            />
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="volume" className="input-label">
              Pack:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              name="volume"
              className="input-field"
              value={filterData.pack}
              onChange={(e) =>
                setFilterData({ ...filterData, pack: e.target.value })
              }
              disabled={selectOptions === "pack" ? false : true}
            />
          </div>
        </Grid>

        {/* <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterData.isShortChecked}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    isShortChecked: e.target.checked,
                  })
                }
              />
            }
            label="Short"
          />
        </Grid>

        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterData.isBrkSummaryChecked}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    isBrkSummaryChecked: e.target.checked,
                  })
                }
              />
            }
            label="Brake Summary"
          />
        </Grid> */}
      </Grid>

      <Box
        sx={{
          height: 500,
          width: "100%",
          marginTop: 4,
          "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
          "& .custom-cell": { paddingLeft: 4 },
        }}
      >
        <DataGrid
          rows={([])?.map((item, index) => ({
            id: index,
            sNo: index + 1,
            itemCode: item.itemCode || "No Data",
            itemName: item?.item?.name || "No Data",
            brandName: item?.item?.brand?.name || "No Data",
            categoryName: item?.item?.category?.categoryName || "No Data",
            batchNo: item.batchNo || "No Data",
            brokenNo: item.brokenNo || "No Data",
            caseNo: item.caseNo || "No Data",
            pcs: item.pcs || "No Data",
            volume: item?.item?.volume || "No Data",
            // updatedAt: new Date(item.updatedAt).toLocaleDateString("en-GB"),
            mrp: item.mrp || "No Data",
            gro: item.gro || "No Data",
            sp: item.sp || "No Data",
            purchaseRate: item.purchaseRate || "No Data",
            saleRate: item.saleRate || "No Data",
            itemAmount: item.itemAmount || "No Data",
            createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
          }))}
          columns={columns}
          rowCount={totalCount}
          pagination
          paginationMode="server"
          pageSizeOptions={[10, 25, 50, 100]}
          // onPaginationModelChange={setPaginationModel}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          sx={{ backgroundColor: "#fff" }}
          disableRowSelectionOnClick
          loading={loading}
          loadingOverlay={
            <Box>
              <CircularProgress />
            </Box>
          }
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          "& button": { marginTop: 2, marginLeft: 2 },
        }}
      >
        <Button
          color="warning"
          size="medium"
          variant="outlined"
          onClick={() => {
            setFilterData({})
            setselectOptions(null)
            // setPaginationModel({ page: 1, pageSize: 25 });
            // fetchAllPurchases();
          }}
          sx={{ borderRadius: 8 }}
        >
          Clear
        </Button>
        <Button
          color="secondary"
          size="medium"
          variant="outlined"
          sx={{ borderRadius: 8 }}
        >
          Print
        </Button>
        <Button
          color="primary"
          size="medium"
          variant="contained"
          // onClick={fetchAllPurchases}
          sx={{ borderRadius: 8 }}
        >
          Display
        </Button>
      </Box>
    </Box>
  );
};

export default ItemWiseSaleReport;
