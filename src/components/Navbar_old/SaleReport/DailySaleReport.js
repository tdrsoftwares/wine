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
import { NotificationManager } from "react-notifications";
import { getAllItemCategory } from "../../../services/categoryService";
import { getAllCustomer } from "../../../services/customerService";
import {
  DataGrid,
  GridFooterContainer,
  GridFooter,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  exportDailySalesDetails,
  getDailySalesDetails,
  searchByBrandName,
  searchByItemName,
} from "../../../services/saleBillService";
import dayjs from "dayjs";
import { customTheme } from "../../../utils/customTheme";
import DailySalePrintComponent from "./DailySalePrintComponent";
import { useReactToPrint } from "react-to-print";
import debounce from "lodash.debounce";
import { usePermissions } from "../../../utils/PermissionsContext";
import * as XLSX from "xlsx";

const DailySaleReport = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [allSalesData, setAllSalesData] = useState([]);
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
    brandName: "",
    customerName: "",
    categoryName: "",
    group: "",
    itemName: "",
    billNo: "",
    volume: "",
    mode: "",
  });
  // console.log(filterData)
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPcs, setTotalPcs] = useState(0);

  const [allGroups, setAllGroups] = useState([]);

  const [itemName, setItemName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [brandNameOptions, setBrandNameOptions] = useState([]);
  const { permissions, role } = usePermissions();

  const reportsPermissions =
    permissions?.find((permission) => permission.moduleName === "Reports")
      ?.permissions || [];
  const canRead = reportsPermissions.includes("read");

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
      flex: 2,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalPcs",
      headerName: "Total Pcs.",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "rate",
      headerName: "Rate",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalVolumeLiters",
      headerName: "Total Vol. Ltr.",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
  ];

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
  };

  const fetchAllCategory = async () => {
    try {
      const getAllCategoryResponse = await getAllItemCategory();
      if (getAllCategoryResponse.status === 200) {
        setAllCategory(getAllCategoryResponse?.data?.data);
      } else {
        // NotificationManager.error("No category found.", "Error");
        setAllCategory([]);
      }
    } catch (err) {
      // NotificationManager.error(
      //   "Something went Wrong, Please try again later.",
      //   "Error"
      // );
      console.error(err);
    }
  };

  const fetchAllCustomers = async () => {
    try {
      const allCustomerResponse = await getAllCustomer();
      // console.log("allCustomerResponse ---> ", allCustomerResponse);

      if (allCustomerResponse.status === 200) {
        setAllCustomerData(allCustomerResponse?.data?.data);
      } else {
        setAllCustomerData([]);
        // NotificationManager.error("No Customers Found", "Error");
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching brands. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching brands:", error);
    }
  };

  const fetchAllSales = async () => {
    const fromDate = filterData.dateFrom
      ? formatDate(filterData.dateFrom)
      : null;
    const toDate = filterData.dateTo ? formatDate(filterData.dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        // page: paginationModel.page + 1,
        // pageSize: paginationModel.pageSize,
        fromDate: fromDate,
        toDate: toDate,
        brandName: filterData.brandName,
        categoryName: filterData.categoryName,
        group: filterData.group,
        itemName: filterData.itemName,
        volume: filterData.volume,
        mode: filterData.mode,
      };
      const response = await getDailySalesDetails(filterOptions);
      // console.log("Response salesData: ", response?.data?.data[0]);

      const result = response?.data?.data[0]
      if (response.status === 200) {
        setAllSalesData( result?.items || []);
        setTotalCount(result?.items?.length || 0);
        setTotalAmount(result?.calcutedTotalAll?.totalAmount || 0);
        setTotalPcs(result?.calcutedTotalAll?.totalPcs || 0);
        setTotalVolume(result?.calcutedTotalAll?.totalVolume || 0);
        setAllGroups(result?.calcutedGroupTotal || []);
      } else {
        console.log("Error", response);
        // NotificationManager.error("No items found.", "Error");
        setAllSalesData([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching sales. Please try again later.",
      //   "Error"
      // );
      console.log("Error fetching sales", error);
    } finally {
      setLoading(false);
    }
  };

  const itemNameSearch = debounce(async (searchText) => {
    try {
      const response = await searchByItemName(searchText);
      if (response?.data?.data && response.data.data.length > 0) {
        setItemNameOptions(response.data.data);
      } else {
        setItemNameOptions([]);
      }
    } catch (error) {
      console.error("Error searching items:", error);
      setItemNameOptions([]);
    }
  }, 500);

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

  const handleItemNameChange = (event, newValue) => {
    setItemName(newValue);
    setFilterData((prevData) => ({ ...prevData, itemName: newValue }));
  };

  const handleBrandNameChange = (event, newValue) => {
    setBrandName(newValue);
    setFilterData((prevData) => ({ ...prevData, brandName: newValue }));
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetchAllSales, 300);
    debouncedFetch();
  }, [filterData]);

  // useEffect(() => {
  //   const calculateSums = (data) => {
  //     let totalVolume = 0;
  //     let totalAmount = 0;
  //     let totalPcs = 0;

  //     data.forEach((item) => {
  //       totalVolume += item.totalVolumeLiters || 0;
  //       totalAmount += item.totalAmount || 0;
  //       totalPcs += item.totalPcs || 0;
  //     });

  //     return { totalVolume, totalAmount, totalPcs };
  //   };

  //   const { totalVolume, totalAmount, totalPcs } = calculateSums(allSalesData);
  //   setTotalVolume(totalVolume);
  //   setTotalAmount(totalAmount);
  //   setTotalPcs(totalPcs);
  // }, [allSalesData]);

  useEffect(() => {
    fetchAllCategory();
    fetchAllCustomers();
    fetchAllSales();
  }, []);


  const exportToExcel = async () => {
    const fromDate = filterData.dateFrom
      ? formatDate(filterData.dateFrom)
      : null;
    const toDate = filterData.dateTo ? formatDate(filterData.dateTo) : null;

    const filterOptions = {
      fromDate: fromDate,
      toDate: toDate,
      brandName: filterData.brandName,
      customerName: filterData.customerName,
      categoryName: filterData.categoryName,
      group: filterData.group,
      itemName: filterData.itemName,
      volume: filterData.volume,
      mode: filterData.mode,
    };

    try {
      setLoading(true);
      const response = await exportDailySalesDetails(filterOptions);
      const allDsrData = response?.data?.data[0];

      const dataToExport = (allDsrData?.items || []).map((item, index) => ({
        "S. No.": index + 1,
        "Bill Date": item.billDate,
        Item: item._id,
        "Total Pcs": item.totalPcs,
        Rate: item.rate,
        "Total Volume Ltrs": item.totalVolumeLiters,
        "Total Amount": item.totalAmount,
      }));


      (allDsrData?.calcutedGroupTotal || []).forEach((groupTotal) => {
        dataToExport.push({
          "S. No.": `Group Total (${groupTotal._id})`,
          "Bill Date": "",
          Item: "",
          "Total Pcs": groupTotal.totalPcs,
          Rate: "",
          "Total Volume Ltrs": "",
          "Total Amount": groupTotal.totalAmount,
        });
      });

      const overallTotal = allDsrData?.calcutedTotalAll;
      if (overallTotal) {
        dataToExport.push({
          "S. No.": "Total",
          "Bill Date": "",
          Item: "",
          "Total Pcs": overallTotal.totalPcs,
          Rate: "",
          "Total Volume Ltrs": overallTotal.totalVolume,
          "Total Amount": overallTotal.totalAmount,
        });
      }

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "DailySalesReport");

      XLSX.writeFile(workbook, "Daily_Sales_Report.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    } finally {
      setLoading(false);
    }
  };  

  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "space-around",
            // margin: "0 20px",
          }}
        >
          <span>Total Volume: {totalVolume?.toFixed(2) + "ltr"}</span>
          <span>Total Amount: {totalAmount?.toFixed(2)}</span>
          <span>Total Pcs: {totalPcs?.toFixed(0)}</span>
        </div>
        <GridFooter />
      </GridFooterContainer>
    );
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Daily Sale Report
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
                  className="date-picker input-field"
                  value={
                    filterData.dateFrom ? dayjs(filterData.dateFrom) : null
                  }
                  onChange={(newDate) =>
                    setFilterData({
                      ...filterData,
                      dateFrom: newDate ? newDate.toISOString() : null,
                    })
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
                  className="date-picker input-field"
                  value={filterData.dateTo ? dayjs(filterData.dateTo) : null}
                  onChange={(newDate) =>
                    setFilterData({
                      ...filterData,
                      dateTo: newDate ? newDate.toISOString() : null,
                    })
                  }
                  renderInput={(params) => <TextField {...params} />}
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
                <MenuItem value="">None</MenuItem>
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
              <InputLabel htmlFor="categoryName" className="input-label">
                Category:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="categoryName"
                className="input-field"
                value={filterData.categoryName}
                onChange={(e) =>
                  setFilterData({ ...filterData, categoryName: e.target.value })
                }
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
                <MenuItem value="">None</MenuItem>
                {allCategory?.map((category) => (
                  <MenuItem key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </TextField>
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
              >
                <MenuItem value="">None</MenuItem>
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
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    name="brandName"
                  />
                )}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemName" className="input-label">
                Item:
              </InputLabel>
              <Autocomplete
                options={itemNameOptions.map((option) => option.name)}
                value={itemName}
                onChange={handleItemNameChange}
                onInputChange={(event, newInputValue) => {
                  itemNameSearch(newInputValue);
                }}
                className="input-field"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    name="itemName"
                  />
                )}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="volume" className="input-label">
                Volume:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="volume"
                className="input-field"
                value={filterData.volume}
                onChange={(e) =>
                  setFilterData({ ...filterData, volume: e.target.value })
                }
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="mode" className="input-label">
                Mode:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="mode"
                className="input-field"
                value={filterData.mode}
                onChange={(e) =>
                  setFilterData({ ...filterData, mode: e.target.value })
                }
              >
                <MenuItem value="">None</MenuItem>
                {["cash", "online"].map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            "& button": { marginTop: 2 },
          }}
        >
          <Button
            color="success"
            size="small"
            variant="contained"
            onClick={exportToExcel}
            disabled={!canRead && role !== "admin"}
          >
            Export to Excel
          </Button>

          <div>
            <Button
              color="inherit"
              size="small"
              variant="contained"
              onClick={() => {
                setFilterData({
                  dateFrom: null,
                  dateTo: null,
                  brandName: "",
                  customerName: "",
                  categoryName: "",
                  group: "",
                  itemName: "",
                  billNo: "",
                  volume: "",
                  mode: "",
                });
                setItemName("");
                setBrandName("");
                setItemNameOptions([]);
                setBrandNameOptions([]);
                setPaginationModel({ page: 0, pageSize: 100 });
              }}
            >
              Clear Filters
            </Button>
            <Button
              color="warning"
              size="small"
              variant="contained"
              onClick={handlePrint}
              sx={{ marginLeft: 1 }}
              disabled={!canRead && role !== "admin"}
            >
              Print
            </Button>
            <Button
              color="info"
              size="small"
              variant="contained"
              onClick={fetchAllSales}
              sx={{ marginLeft: 1 }}
              disabled={!canRead && role !== "admin"}
            >
              Display
            </Button>
          </div>
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
          {canRead || role === "admin" ? (
            <DataGrid
              rows={(allSalesData || [])?.map((item, index) => ({
                id: index,
                sNo:
                  index + 1,
                itemName: item.itemName || "No Data",
                totalPcs: item.totalPcs || "No Data",
                rate: item.rate?.toFixed(2) || "No Data",
                totalVolumeLiters: item.totalVolumeLiters?.toFixed(3) || "No Data",
                totalAmount: item.totalAmount?.toFixed(2) || "No Data",
              }))}
              columns={columns}
              rowCount={totalCount}
              // apiRef={apiRef}
              pagination
              // paginationMode="server"
              paginationModel={paginationModel}
              pageSizeOptions={[10, 25, 50, 100]}
              onPaginationModelChange={(newPaginationModel) =>
                setPaginationModel(newPaginationModel)
              }
              sx={{ backgroundColor: "#fff" }}
              disableRowSelectionOnClick
              loading={loading}
              loadingOverlay={
                <Box>
                  <CircularProgress />
                </Box>
              }
              slots={{
                footer: CustomFooter,
                toolbar: GridToolbar,
              }}
              initialState={{
                density: "compact",
              }}
            />
          ) : (
            <Typography variant="body1" color="red">
              You do not have permission to view this data.
            </Typography>
          )}
        </Box>

        <div style={{ display: "none" }}>
          <DailySalePrintComponent
            ref={printRef}
            filterData={filterData}
            allSalesData={allSalesData}
            totalAmount={totalAmount}
            totalPcs={totalPcs}
            totalVolume={totalVolume}
            allGroups={allGroups}
          />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default DailySaleReport;
