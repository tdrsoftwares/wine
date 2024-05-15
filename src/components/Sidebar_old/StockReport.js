import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import { getAllStocks } from "../../services/stockService";
import { useLoginContext } from "../../utils/loginContext";
import { NotificationManager } from "react-notifications";
import { getAllItems } from "../../services/itemService";
import { getAllBrands } from "../../services/brandService";
import { getAllCompanies } from "../../services/companyService";
import { getAllItemCategory } from "../../services/categoryService";

const StockReport = () => {
  const [allStocks, setAllStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterData, setFilterData] = useState({
    date: "mm/dd/yyyy",
    itemCode: "",
    itemName: "",
    category: "",
    volume: "",
    batchNo: "",
    brandNo: "",
    brandName: "",
    stockIn: "",
    company: "",
  });

  const { loginResponse } = useLoginContext();
  const [allItems, setAllItems] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const batchNoOptions = ["0", "00", "01", "516-1", "521-1", "526-1"];
  const stockInOptions = ["All", "Godown", "Showroom"];
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  console.log("totalCount: " + totalCount)
  console.log("paginationModel: ",paginationModel)

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
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "itemName",
      headerName: "Item Name",
      width: 120,
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
      field: "stockAt",
      headerName: "Stock In",
      width: 180,
      headerClassName: "custom-header",
    },
    {
      field: "currentStock",
      headerName: "Current Stock",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "openingStock",
      headerName: "Opening Stock",
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
      field: "createdAt",
      headerName: "Date",
      width: 150,
      headerClassName: "custom-header",
    },

    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 100,
    //   cellClassName: "custom-cell",
    //   headerClassName: "custom-header",
    //   renderCell: (params) => (
    //     <Button
    //       variant="contained"
    //       size="small"
    //       onClick={() => handleViewClick(params.row)}
    //     >
    //       View
    //     </Button>
    //   ),
    // },
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

  const fetchAllStocks = async () => {
    setLoading(true);
    try {
      const filterOptions = {
        page:
          paginationModel.page === 0
            ? paginationModel.page + 1
            : paginationModel.page,
        limit: paginationModel.pageSize,
        // supplierName: selectedSupplier,
        // fromDate: dateFrom,
        // toDate: dateTo,
      };
      console.log("filterOptions: ", filterOptions);
      const allStocksResponse = await getAllStocks(
        loginResponse,
        filterOptions
      );

      setAllStocks(allStocksResponse?.data?.data);
      setTotalCount(allStocksResponse?.data?.data?.length);
    } catch (error) {
      NotificationManager.error(
        "Error fetching stock. Please try again later.",
        "Error"
      );
      console.error("Error fetching stock:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllItems = async () => {
    try {
      const allItemsResponse = await getAllItems(loginResponse);
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
      const allBrandsResponse = await getAllBrands(loginResponse);
      // console.log("allBrandsResponse ---> ", allBrandsResponse);
      setAllBrands(allBrandsResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      console.error("Error fetching brands:", error);
    }
  };

  const fetchAllCompanies = async () => {
    try {
      const allCompaniesResponse = await getAllCompanies(loginResponse);
      // console.log("allCompaniesResponse ---> ", allCompaniesResponse);
      setAllCompanies(allCompaniesResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching companies. Please try again later.",
        "Error"
      );
      console.error("Error fetching companies:", error);
    }
  };

  const fetchAllCategory = async () => {
    try {
      const getAllCategoryResponse = await getAllItemCategory(loginResponse);
      setAllCategory(getAllCategoryResponse?.data?.data);
    } catch (err) {
      NotificationManager.error(
        "Something went Wrong, Please try again later.",
        "Error"
      );
    }
  };

  useEffect(() => {
    fetchAllItems();
    fetchAllStocks();
    fetchAllBrands();
    fetchAllCompanies();
    fetchAllCategory();
  }, [loginResponse]);

  useEffect(() => {
    fetchAllStocks();
  }, [paginationModel])

  // const paginationMeta = useMemo(() => {
  //   if (
  //     hasNextPage !== undefined &&
  //     paginationMetaRef.current?.hasNextPage !== hasNextPage
  //   ) {
  //     paginationMetaRef.current = { hasNextPage };
  //   }
  //   return paginationMetaRef.current;
  // }, [hasNextPage]);

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Stock Report
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Filter By:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="itemCode" className="input-label">
              Item Code :
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              type="number"
              name="itemCode"
              className="input-field"
              value={filterData.itemCode}
              onChange={(e) =>
                setFilterData({ ...filterData, itemCode: e.target.value })
              }
            >
              {batchNoOptions.map((option, i) => (
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
              Item Name :
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
            >
              {allItems.map((item, i) => (
                <MenuItem key={i} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
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
              className="input-field"
              value={filterData.category}
              onChange={(e) =>
                setFilterData({ ...filterData, category: e.target.value })
              }
            >
              {allCategory?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
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
              select
              fullWidth
              size="small"
              type="text"
              name="volume"
              className="input-field"
              value={filterData.volume}
              onChange={(e) =>
                setFilterData({ ...filterData, volume: e.target.value })
              }
            >
              {[180, 200, 375, 750, 1000].map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="batchNo" className="input-label">
              Batch No. :
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="batchNo"
              className="input-field"
              value={filterData.batchNo}
              onChange={(e) =>
                setFilterData({ ...filterData, batchNo: e.target.value })
              }
            >
              {batchNoOptions.map((option, i) => (
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
              Brand :
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
            >
              {allBrands?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className="input-wrapper">
            <InputLabel htmlFor="stockIn" className="input-label">
              Stock In :
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="stockIn"
              className="input-field"
              value={filterData.stockIn}
              onChange={(e) =>
                setFilterData({ ...filterData, stockIn: e.target.value })
              }
            >
              {stockInOptions?.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
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
              className="input-field"
              value={filterData.company}
              onChange={(e) =>
                setFilterData({ ...filterData, company: e.target.value })
              }
            >
              {allCompanies?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>
      </Grid>

      <Box
        sx={{
          height: 400,
          width: "100%",
          marginTop: 4,
          "& .custom-header": {
            backgroundColor: "#dae4ed",
          },
        }}
      >
        <DataGrid
          rows={(allStocks || [])?.map((stock, index) => ({
            id: index,
            sNo: index + 1,
            itemCode: stock.itemCode || "No Data",
            itemName: stock?.itemId?.name || "No Data",
            batchNo: stock.batchNo || "No Data",
            createdAt: new Date(stock.createdAt).toLocaleDateString("en-GB"),
            saleRate: stock.saleRate || "No Data",
            purchaseRate: stock.purchaseRate || "No Data",
            stockRate: stock.stockRate || "No Data",
            stockAt: stock.stockAt || "No Data",
            currentStock: stock.currentStock || "No Data",
            openingStock: stock.openingStock || "No Data",
            mrp: stock.mrp || "No Data",
          }))}
          columns={columnsData}
          rowCount={totalCount}
          pagination
          paginationMode="server"
          pageSizeOptions={[10, 25, 50, 100]}
          onPaginationModelChange={setPaginationModel}
          sx={{ backgroundColor: "#fff" }}
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
          loading={loading}
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
          color="primary"
          size="medium"
          variant="contained"
          onClick={() => {}}
          sx={{ borderRadius: 8 }}
        >
          Display
        </Button>
        <Button
          color="secondary"
          size="medium"
          variant="outlined"
          onClick={() => {}}
          sx={{ borderRadius: 8 }}
        >
          Print
        </Button>
        <Button
          color="error"
          size="medium"
          variant="outlined"
          onClick={() => {}}
          sx={{ borderRadius: 8 }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default StockReport;
