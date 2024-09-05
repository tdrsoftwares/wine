import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useRef, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid";
import { searchByBrandName } from "../../../services/saleBillService";
import dayjs from "dayjs";
import { customTheme } from "../../../utils/customTheme";
import { useReactToPrint } from "react-to-print";
import debounce from "lodash.debounce";
import { getAllBrandStockMrp } from "../../../services/brandStockMrpService";

const BrandStockMrp = () => {
  const [allBrandStockMrp, setAllBrandStockMrp] = useState([]);
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
    brandName: "",
  });
  // console.log(filterData)
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPcs, setTotalPcs] = useState(0);

  const [itemName, setItemName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [brandNameOptions, setBrandNameOptions] = useState([]);
  const [totals, setTotals] = useState({
    openingBalance: 0,
    totalPurchased: 0,
    totalSold: 0,
    closingBalance: 0,
    openingMrpValue: 0,
    reciptMrpValue: 0,
    salesMrpValue: 0,
    closingMrpValue: 0,
  });

  const calculateTotals = (data) => {
    const totals = data.reduce(
      (acc, item) => {
        acc.openingBalance += item.openingBalance || 0;
        acc.totalPurchased += item.totalPurchased || 0;
        acc.totalSold += item.totalSold || 0;
        acc.closingBalance += item.closingBalance || 0;
        acc.openingMrpValue += item.openingMrpValue || 0;
        acc.reciptMrpValue += item.reciptMrpValue || 0;
        acc.salesMrpValue += item.salesMrpValue || 0;
        acc.closingMrpValue += item.closingMrpValue || 0;
        return acc;
      },
      {
        openingBalance: 0,
        totalPurchased: 0,
        totalSold: 0,
        closingBalance: 0,
        openingMrpValue: 0,
        reciptMrpValue: 0,
        salesMrpValue: 0,
        closingMrpValue: 0,
      }
    );

    return totals;
  };
  const apiRef = useGridApiRef();
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "itemName",
      headerName: "Item Name",
      flex: 1.5,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "brandName",
      headerName: "Brand Name",
      flex: 1.5,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "mrp",
      headerName: "MRP",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "openingBalance",
      headerName: "Opening Balance",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "openingMrp",
      headerName: "Opening MRP",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalPurchased",
      headerName: "Total Purchased",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "receiptMrpValue",
      headerName: "Receipt MRP",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalSold",
      headerName: "Total Sold",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "salesMrpValue",
      headerName: "Sales MRP",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "closingBalance",
      headerName: "Closing Balance",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "closingMrpValue",
      headerName: "Closing MRP",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
  ];

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
  };

  const fetchAllBrandStockMrp = async () => {
    const fromDate = filterData.dateFrom
      ? formatDate(filterData.dateFrom)
      : null;
    const toDate = filterData.dateTo ? formatDate(filterData.dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        fromDate: fromDate,
        toDate: toDate,
        brandName: filterData.brandName,
        bl: filterData.isBLTrue,
      };
      // console.log("filterData:", filterData)

      if (filterData.brandName === "All Brands") {
        filterOptions.AllBrand = true;
      } else {
        filterOptions.brandName = filterData.brandName;
      }

      const response = await getAllBrandStockMrp(filterOptions);
      const responseData = response?.data?.data;
      // console.log("Response responseData: ", responseData);
      const itemsData = response?.data?.data[0]?.items;

      if (responseData) {
        setAllBrandStockMrp(itemsData || []);
        setTotalCount(responseData?.length || 0);
        const totalValues = calculateTotals(responseData);
        setTotals(totalValues);
      } else {
        // console.log("Error", response);
        // NotificationManager.error("No items found.", "Error");
        setAllBrandStockMrp([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching items. Please try again later.",
      //   "Error"
      // );
      console.log("Error fetching items", error);
    } finally {
      setLoading(false);
    }
  };

  const brandNameSearch = debounce(async (searchText) => {
    try {
      const response = await searchByBrandName(searchText);
      if (response?.data?.data && response.data.data.length > 0) {
        setBrandNameOptions(response.data.data);
      } else {
        setBrandNameOptions([]);
      }
    } catch (error) {
      console.error("Error searching brand:", error);
      setBrandNameOptions([]);
    }
  }, 500);

  const handleBrandNameChange = (event, newValue) => {
    setBrandName(newValue);
    setFilterData((prevData) => ({ ...prevData, brandName: newValue }));
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetchAllBrandStockMrp, 300);
    if (filterData.dateFrom && filterData.dateTo && filterData.brandName) {
      debouncedFetch();
    }
  }, [paginationModel, filterData]);

  useEffect(() => {
    const calculateSums = (data) => {
      let totalVolume = 0;
      let totalAmount = 0;
      let totalPcs = 0;

      data.forEach((item) => {
        totalVolume += item.totalVolumeLiters || 0;
        totalAmount += item.totalAmount || 0;
        totalPcs += item.totalPcs || 0;
      });

      return { totalVolume, totalAmount, totalPcs };
    };

    const { totalVolume, totalAmount, totalPcs } = calculateSums(allBrandStockMrp);
    setTotalVolume(totalVolume);
    setTotalAmount(totalAmount);
    setTotalPcs(totalPcs);
  }, [allBrandStockMrp]);

  const rows = (allBrandStockMrp || []).map((item, index) => ({
    id: index,
    sNo: index + 1,
    itemName: item.item || "No Data",
    brandName: item.brand || "No Data",
    mrp: item.mrp || 0,
    openingBalance: item.openingBalance || 0,
    openingMrp: item.openingMrpValue || 0,
    totalPurchased: item.totalPurchased || 0,
    receiptMrpValue: item.reciptMrpValue || 0,
    totalSold: item.totalSold || 0,
    salesMrpValue: item.salesMrpValue || 0,
    closingBalance: item.closingBalance || 0,
    closingMrpValue: item.closingMrpValue || 0,
  }));

  
  rows.push({
    id: "totals", 
    sNo: "Total",
    itemName: "",
    brandName: "",
    mrp: "",
    openingBalance: totals.openingBalance,
    openingMrp: totals.openingMrpValue,
    totalPurchased: totals.totalPurchased,
    receiptMrpValue: totals.reciptMrpValue,
    totalSold: totals.totalSold,
    salesMrpValue: totals.salesMrpValue,
    closingBalance: totals.closingBalance,
    closingMrpValue: totals.closingMrpValue,
  });

  // const CustomFooter = () => {
  //   return (
  //     <GridFooterContainer>
  //       <div
  //         style={{
  //           flex: 1,
  //           display: "flex",
  //           justifyContent: "space-around",
  //           // margin: "0 20px",
  //         }}
  //       >
  //         <span>Total Volume: {totalVolume?.toFixed(2) + "ltr"}</span>
  //         <span>Total Amount: {totalAmount?.toFixed(2)}</span>
  //         <span>Total Pcs: {totalPcs?.toFixed(0)}</span>
  //       </div>
  //       <GridFooter />
  //     </GridFooterContainer>
  //   );
  // };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Brand Stock Mrp Report
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Filter By:
        </Typography>

        <Grid container spacing={2}>
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
                />
              </LocalizationProvider>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="brandName" className="input-label">
                Brand:
              </InputLabel>
              <Autocomplete
                options={brandNameOptions.map((option) => option.name)}
                value={brandName}
                onChange={handleBrandNameChange}
                onInputChange={(event, newInputValue) => {
                  brandNameSearch(newInputValue);
                }}
                className="input-field"
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" name="brandName" />
                )}
              />
            </div>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            "& button": { marginTop: 2 },
          }}
        >
          
          <Button
            color="inherit"
            size="small"
            variant="contained"
            onClick={() => {
              setFilterData({
                dateFrom: null,
                dateTo: null,
                brandName: "",
                
              });
              setBrandName("")
              setBrandNameOptions([])
              setAllBrandStockMrp([])
              setPaginationModel({ page: 1, pageSize: 10 });
            }}
          >
            Clear Filters
          </Button>
          <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={handlePrint}
          >
            Print
          </Button>
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllBrandStockMrp}
          >
            Display
          </Button>
        </Box>

        <Box
          sx={{
            height: 450,
            width: "100%",
            marginTop: 2,
            "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
            "& .custom-cell": { paddingLeft: 4 },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={totalCount}
            apiRef={apiRef}
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            onPaginationModelChange={setPaginationModel}
            sx={{ backgroundColor: "#fff" }}
            disableRowSelectionOnClick
            loading={loading}
            loadingOverlay={
              <Box>
                <CircularProgress />
              </Box>
            }
            slots={{
              toolbar: GridToolbar,
            }}
            initialState={{
              density: "compact",
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BrandStockMrp;
