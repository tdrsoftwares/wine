import {
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
import { getDailySalesDetails } from "../../../services/saleBillService";
import dayjs from "dayjs";
import { customTheme } from "../../../utils/customTheme";
import DailySalePrintComponent from "./DailySalePrintComponent";
import { useReactToPrint } from "react-to-print";

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
  });
  console.log(filterData)
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPcs, setTotalPcs] = useState(0);

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
        NotificationManager.error("No category found.", "Error");
        setAllCategory([]);
      }
    } catch (err) {
      NotificationManager.error(
        "Something went Wrong, Please try again later.",
        "Error"
      );
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
        NotificationManager.error("No Customers Found", "Error");
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      console.error("Error fetching brands:", error);
    }
  };

  const fetchAllSales = async () => {
    const fromDate = filterData.dateFrom ? formatDate(filterData.dateFrom) : null;
    const toDate = filterData.dateTo ? formatDate(filterData.dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        page:
          paginationModel.page === 0
            ? paginationModel.page + 1
            : paginationModel.page,
        pageSize: paginationModel.pageSize,
        fromDate: fromDate,
        toDate: toDate,
        brandName: filterData.brandName,
        categoryName: filterData.categoryName,
        group: filterData.group,
        itemName: filterData.itemName,
        volume: filterData.volume,
      };
      const response = await getDailySalesDetails(filterOptions);
      // console.log("Response salesData: ", response);

      if (response.status === 200) {
        setAllSalesData(response?.data?.data || []);
        setTotalCount(response.data.data.length || 0);
      } else {
        console.log("Error", response);
        NotificationManager.error("No items found.", "Error");
        setAllSalesData([]);
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching sales. Please try again later.",
        "Error"
      );
      console.log("Error fetching sales", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategory();
    fetchAllCustomers();
    fetchAllSales();
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetchAllSales, 300);
    debouncedFetch();
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

    const { totalVolume, totalAmount, totalPcs } = calculateSums(allSalesData);
    setTotalVolume(totalVolume);
    setTotalAmount(totalAmount);
    setTotalPcs(totalPcs);
  }, [allSalesData]);

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
                  value={filterData.dateFrom}
                  className="input-field date-picker"
                  onChange={(newDate) => setFilterData({ ...filterData, dateFrom: newDate ? newDate.format('YYYY-MM-DD') : null })}
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
                  onChange={(newDate) => setFilterData({ ...filterData, dateTo: newDate ? newDate.format('YYYY-MM-DD') : null })}

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
              <TextField
                // select
                fullWidth
                size="small"
                name="brandName"
                className="input-field"
                value={filterData.brandName}
                onChange={(e) =>
                  setFilterData({ ...filterData, brandName: e.target.value })
                }
                // SelectProps={{
                //   MenuProps: {
                //     PaperProps: {
                //       style: {
                //         maxHeight: 200,
                //       },
                //     },
                //   },
                // }}
              />
              {/* {allBrands?.map((brand) => (
                  <MenuItem key={brand._id} value={brand.name}>
                    {brand.name}
                  </MenuItem>
                ))}
              </TextField> */}
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
              <InputLabel htmlFor="itemName" className="input-label">
                Item:
              </InputLabel>
              <TextField
                // select
                fullWidth
                size="small"
                name="itemName"
                className="input-field"
                value={filterData.itemName}
                onChange={(e) =>
                  setFilterData({ ...filterData, itemName: e.target.value })
                }
                // SelectProps={{
                //   MenuProps: {
                //     PaperProps: {
                //       style: {
                //         maxHeight: 200,
                //       },
                //     },
                //   },
                // }}
              />
              {/* {allItems?.map((item) => (
                  <MenuItem key={item._id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))} */}
              {/* </TextField> */}
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
                customerName: "",
                categoryName: "",
                group: "",
                itemName: "",
                billNo: "",
                volume: "",
              });
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
            // sx={{ marginLeft: 2 }}
          >
            Print
          </Button>
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllSales}
            // sx={{ marginLeft: 2 }}
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
            rows={(allSalesData || [])?.map((item, index) => ({
              id: index,
              sNo: index + 1,
              itemName: item._id || "No Data",
              totalPcs: item.totalPcs || "No Data",
              rate: item.rate || "No Data",
              totalVolumeLiters: item.totalVolumeLiters || "No Data",
              totalAmount: item.totalAmount || "No Data",
            }))}
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
              footer: CustomFooter,
              toolbar: GridToolbar,
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  page: paginationModel.page,
                  pageSize: paginationModel.pageSize,
                },
                rowCount: totalCount,
              },
              density: "compact",
            }}
          />
        </Box>

        <div style={{ display: "none" }}>
          <DailySalePrintComponent
            ref={printRef}
            filterData={filterData}
            allSalesData={allSalesData}
            totalAmount={totalAmount}
            totalPcs={totalPcs}
            totalVolume={totalVolume}
          />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default DailySaleReport;
