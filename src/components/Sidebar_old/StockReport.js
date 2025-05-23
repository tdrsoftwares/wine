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
import {
  DataGrid,
  GridFooter,
  GridFooterContainer,
  GridToolbar,
} from "@mui/x-data-grid";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { exportAllStocks, getAllStocks } from "../../services/stockService";
import { NotificationManager } from "react-notifications";
import { getAllCompanies } from "../../services/companyService";
import { getAllItemCategory } from "../../services/categoryService";
import { getAllStores } from "../../services/storeService";
import { customTheme } from "../../utils/customTheme";
import * as XLSX from "xlsx";
import debounce from "lodash.debounce";
import {
  searchByBrandName,
  searchByItemName,
} from "../../services/saleBillService";
import { usePermissions } from "../../utils/PermissionsContext";

const StockReport = () => {
  const [allStocks, setAllStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log("allStocks", allStocks)

  const [filterData, setFilterData] = useState({
    itemCode: "",
    itemName: "",
    category: "",
    volume: "",
    batchNo: "",
    brandNo: "",
    brandName: "",
    storeName: "",
    company: "",
  });

  const [allItems, setAllItems] = useState([]);
  const [hasExportClicked, setHasExportClicked] = useState(false);
  const [allCompanies, setAllCompanies] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allStores, setAllStores] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });

  const [itemName, setItemName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [brandNameOptions, setBrandNameOptions] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [totalPurRate, setTotalPurRate] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [totalMRP, setTotalMRP] = useState(0);

  const { permissions, role } = usePermissions();

  const reportsPermissions =
    permissions?.find((permission) => permission.moduleName === "Stock")
      ?.permissions || [];
  const canRead = reportsPermissions.includes("read");

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      width: 90,
      headerClassName: "custom-header",
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 150,
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
      headerName: "Item",
      width: 180,
      headerClassName: "custom-header",
    },
    {
      field: "currentStock",
      headerName: "Current Stock",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "brandName",
      headerName: "Brand",
      width: 180,
      headerClassName: "custom-header",
    },
    {
      field: "categoryName",
      headerName: "Category",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "companyName",
      headerName: "Company",
      width: 180,
      headerClassName: "custom-header",
    },
    {
      field: "batchNo",
      headerName: "Batch No.",
      width: 120,
      headerClassName: "custom-header",
    },

    {
      field: "saleRate",
      headerName: "Sale Rate",
      width: 180,
      headerClassName: "custom-header",
    },
    {
      field: "purchaseRate",
      headerName: "Purchase Rate",
      width: 180,
      headerClassName: "custom-header",
    },
    {
      field: "storeName",
      headerName: "Stock In",
      width: 180,
      headerClassName: "custom-header",
    },
    {
      field: "storeType",
      headerName: "Store Type",
      width: 180,
      headerClassName: "custom-header",
    },
    {
      field: "openingStock",
      headerName: "Opening Stock",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "volume",
      headerName: "Volume",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "totalVolume",
      headerName: "Total Volume",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "mrp",
      headerName: "MRP",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "totalMrp",
      headerName: "Total MRP",
      width: 120,
      headerClassName: "custom-header",
    },
  ];

  const columnsData = useMemo(
    () =>
      columns.map((col) =>
        col.field === "action"
          ? { ...col, sortable: false, fiterable: false }
          : col
      ),
    [columns]
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchAllStocks = async () => {
    setLoading(true);
    try {
      const filterOptions = {
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        itemName: filterData.itemName,
        itemCode: filterData.itemCode,
        volume: filterData.volume,
        batch: filterData.batchNo,
        storeName: filterData.storeName,
        company: filterData.company,
      };

      if (filterData.brandName === "All Brands") {
        filterOptions.AllBrand = true;
      } else {
        filterOptions.brandName = filterData.brandName;
      }

      if (filterData.category === "All Categories") {
        filterOptions.AllCategory = true;
      } else {
        filterOptions.categoryName = filterData.category;
      }

      const allStocksResponse = await getAllStocks(filterOptions);
      // console.log("allStocksResponse: ", allStocksResponse);
      const allStocksData = allStocksResponse?.data?.data;

      setAllStocks(allStocksData?.items || []);
      setTotalMRP(allStocksData?.totalOf?.totalMRP);
      setTotalPurRate(allStocksData?.totalOf?.totalPurchaseRate);
      setTotalVolume(allStocksData?.totalOf?.totalVolume);
      setTotalStock(allStocksData?.totalOf?.totalStock);
      setTotalCount(allStocksData?.totalItems || 0);
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching stock. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching stock:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStores = async () => {
    try {
      const allStoresResponse = await getAllStores();
      // console.log("allStore response: ", allStoresResponse)

      if (allStoresResponse.status === 200) {
        setAllStores(allStoresResponse?.data?.data);
      } else {
        // NotificationManager.error("No stores found", "Error");
        setAllStores([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching stores. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching stores:", error);
    }
  };

  const fetchAllCompanies = async () => {
    try {
      const allCompaniesResponse = await getAllCompanies();
      // console.log("allCompaniesResponse ---> ", allCompaniesResponse);
      if (allCompaniesResponse.status === 200) {
        setAllCompanies(allCompaniesResponse?.data?.data);
      } else {
        // NotificationManager.error("No companies found." , "Error");
        setAllCompanies([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching companies. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching companies:", error);
    }
  };

  const fetchAllCategory = async () => {
    try {
      const getAllCategoryResponse = await getAllItemCategory();
      if (getAllCategoryResponse.status === 200) {
        setAllCategory(getAllCategoryResponse?.data?.data);
      } else {
        // NotificationManager.error("No category found." , "Error");
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
      const brandsData = response?.data?.data || [];

      const allBrandsOption = { name: "All Brands" };
      const updatedBrandsData = [allBrandsOption, ...brandsData];

      setBrandNameOptions(updatedBrandsData);
    } catch (error) {
      console.error("Error searching brand:", error);
      setBrandNameOptions([{ name: "All Brands" }]);
    }
  }, 500);

  const handleItemNameChange = (event, newValue) => {
    setItemName(newValue);
    setFilterData((prevData) => ({ ...prevData, itemName: newValue }));
  };

  const handleBrandNameChange = (event, newValue) => {
    setBrandName(newValue);

    if (newValue === "All Brands") {
      setFilterData((prevData) => ({ ...prevData, brandName: "All Brands" }));
    } else {
      setFilterData((prevData) => ({ ...prevData, brandName: newValue }));
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetchAllStocks, 300);
    if (filterData.storeName) {
      debouncedFetch();
    }
  }, [paginationModel, filterData]);

  useEffect(() => {
    fetchAllCompanies();
    fetchAllCategory();
    fetchAllStores();
  }, []);

  const handleClearFilters = () => {
    setFilterData({
      ...filterData,
      itemCode: "",
      itemName: "",
      category: "",
      volume: "",
      batchNo: "",
      brandNo: "",
      brandName: "",
      storeName: "",
      company: "",
    });
    setItemName("");
    setBrandName("");
    setItemNameOptions([]);
    setBrandNameOptions([]);
    setAllStocks([]);
    setTotalCount(0);
    setTotalMRP(0);
    setTotalPurRate(0);
    setTotalStock(0);
    setTotalVolume(0);
    setPaginationModel({ page: 0, pageSize: 100 });
  };

  // useEffect(() => {
  //   const calculateSums = (data) => {
  //     let totalPurRate = 0;
  //     let totalVolume = 0;
  //     let totalStock = 0;
  //     let totalMRP = 0;

  //     data.forEach((item) => {
  //       totalPurRate += item.purchaseRate * item.currentStock || 0;
  //       totalVolume += item.item?.volume * item.currentStock || 0;
  //       totalStock += item.currentStock || 0;
  //       totalMRP += item.mrp * item.currentStock || 0;
  //     });

  //     return { totalPurRate, totalVolume, totalStock, totalMRP };
  //   };

  //   const { totalPurRate, totalVolume, totalStock, totalMRP } =
  //     calculateSums(allStocks);
  //   setTotalPurRate(totalPurRate);
  //   setTotalVolume(totalVolume);
  //   setTotalStock(totalStock);
  //   setTotalMRP(totalMRP);
  // }, [allStocks]);

  const exportToExcel = async () => {
    setHasExportClicked(true);

    const filterOptions = {
      itemName: filterData.itemName,
      itemCode: filterData.itemCode,
      volume: filterData.volume,
      batch: filterData.batchNo,
      storeName: filterData.storeName,
      company: filterData.company,
    };

    if (filterData.brandName === "All Brands") {
      filterOptions.AllBrand = true;
    } else {
      filterOptions.brandName = filterData.brandName;
    }

    if (filterData.category === "All Categories") {
      filterOptions.AllCategory = true;
    } else {
      filterOptions.categoryName = filterData.category;
    }

    try {
      setLoading(true);
      const allStocksResponse = await exportAllStocks(filterOptions);
      const allStocksData = allStocksResponse?.data?.data[0];
      // console.log("allStocksData: ", allStocksData);

      const dataToExport = (allStocksData?.items || []).map((stock, index) => ({
        "S. No.": index + 1,
        "Created Date": new Date(stock.createdAt).toLocaleDateString("en-GB"),
        "Item Code": stock.itemCode,
        Item: stock.item?.name,
        "Current Stock": stock.currentStock,
        Brand: stock?.item?.brand?.name,
        Category: stock?.item?.category?.categoryName,
        Company: stock?.item?.company?.name,
        "Batch No.": stock.batchNo,
        "Sale Rate": stock.saleRate,
        "Purchase Rate": stock.purchaseRate,
        "Stock In": stock.store?.name,
        "Store Type": stock.store?.type,
        "Opening Stock": stock.openingStock,
        Volume: stock?.item?.volume,
        MRP: stock.mrp,
      }));

      dataToExport.push({
        "S. No.": "Total",
        "Created Date": "",
        "Item Code": "",
        Item: "",
        "Current Stock": allStocksData.totalStock,
        Brand: "",
        Category: "",
        Company: "",
        "Batch No.": "",
        "Sale Rate": "",
        "Purchase Rate": allStocksData.totalPurchaseRate,
        "Stock In": "",
        "Store Type": "",
        "Opening Stock": "",
        Volume: allStocksData.totalVolume,
        MRP: allStocksData.totalMRP,
      });

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Stocks");

      XLSX.writeFile(workbook, "Stock_Report.xlsx");
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
          <span>Total Pur. Rate: {totalPurRate?.toFixed(2)}</span>
          <span>Total Volume: {totalVolume?.toFixed(2) + "ltr"}</span>
          <span>Total Stock: {totalStock?.toFixed(0)}</span>
          <span>Total MRP: {totalMRP?.toFixed(2)}</span>
        </div>
        <GridFooter />
      </GridFooterContainer>
    );
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Stock Report
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>Filter By:</Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemCode" className="input-label">
                Item Code :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="itemCode"
                value={filterData.itemCode}
                onChange={handleFilterChange}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemName" className="input-label">
                Item Name :
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
              <InputLabel htmlFor="category" className="input-label">
                Category :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                type="text"
                name="category"
                value={filterData.category}
                onChange={handleFilterChange}
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
                {allCategory?.map((item) => (
                  <MenuItem key={item._id} value={item.categoryName}>
                    {item.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="volume" className="input-label">
                Volume :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="volume"
                value={filterData.volume}
                onChange={handleFilterChange}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="batchNo" className="input-label">
                Batch No. :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="batchNo"
                value={filterData.batchNo}
                onChange={handleFilterChange}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="brandName" className="input-label">
                Brand :
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
              <InputLabel htmlFor="storeName" className="input-label">
                Stock In :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="storeName"
                value={filterData.storeName}
                onChange={handleFilterChange}
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
                <MenuItem value="all">All</MenuItem>
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
              <InputLabel htmlFor="company" className="input-label">
                Company :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="company"
                value={filterData.company}
                onChange={handleFilterChange}
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
                {allCompanies?.map((item) => (
                  <MenuItem key={item._id} value={item.name}>
                    {item.name}
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
            "& button": { marginTop: 1 },
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
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>

            <Button
              color="info"
              size="small"
              variant="contained"
              onClick={fetchAllStocks}
              disabled={!canRead && role !== "admin"}
              sx={{ marginLeft: 1 }}
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
            "& .custom-header": {
              backgroundColor: "#dae4ed",
            },
          }}
        >
          {canRead || role === "admin" ? (
            <DataGrid
              rows={[
                ...(allStocks || []).map((stock, index) => ({
                  id: index,
                  sNo:
                    index + paginationModel.page * paginationModel.pageSize + 1,
                  createdAt: new Date(stock.createdAt).toLocaleDateString(
                    "en-GB"
                  ),
                  itemCode: stock.itemCode || "No Data",
                  itemName: stock?.item?.name || "No Data",
                  currentStock: stock.currentStock || 0,
                  brandName: stock?.item?.brand?.name || "No Data",
                  categoryName:
                    stock?.item?.category?.categoryName || "No Data",
                  companyName: stock?.item?.company?.name || "No Data",
                  batchNo: stock.batchNo || "No Data",
                  volume: stock?.item?.volume || 0,
                  totalVolume: stock?.totalVolume || 0,
                  saleRate: stock.saleRate || 0,
                  purchaseRate: stock.purchaseRate || 0,
                  stockRate: stock.stockRate || 0,
                  storeName: stock.store?.name || "No Data",
                  storeType: stock.store?.type || "No Data",
                  openingStock: stock.openingStock || 0,
                  mrp: stock.mrp || 0,
                  totalMrp: stock.totalMrp || 0,
                })),
                ...(allStocks && allStocks.length > 0
                  ? [
                      {
                        id: "totalRow",
                        sNo: "Total",
                        createdAt: "",
                        itemCode: "",
                        itemName: "",
                        currentStock: totalStock,
                        brandName: "",
                        categoryName: "",
                        companyName: "",
                        batchNo: "",
                        volume: totalVolume,
                        saleRate: "",
                        purchaseRate: totalPurRate,
                        stockRate: "",
                        storeName: "",
                        storeType: "",
                        openingStock: "",
                        mrp: totalMRP,
                      },
                    ]
                  : []),
              ]}
              keepNonExistentRowsSelected
              columns={columnsData}
              rowCount={totalCount}
              paginationMode="server"
              pageSizeOptions={[10, 25, 50, 100]}
              paginationModel={paginationModel}
              onPaginationModelChange={(newPaginationModel) =>
                setPaginationModel(newPaginationModel)
              }
              initialState={{
                density: "compact",
              }}
              disableRowSelectionOnClick
              loading={loading}
              loadingOverlay={
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <CircularProgress />
                </Box>
              }
              slots={{
                footer: CustomFooter,
                toolbar: GridToolbar,
              }}
              sx={{ backgroundColor: "#fff", fontSize: "12px" }}
            />
          ) : (
            <Typography variant="body1" color="red">
              You do not have permission to view this data.
            </Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default StockReport;
