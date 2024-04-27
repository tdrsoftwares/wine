import {
  Box,
  Button,
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
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { getAllStocks } from "../../services/stockService";
import { useLoginContext } from "../../utils/loginContext";
import { NotificationManager } from "react-notifications";
import { getAllItems } from "../../services/itemService";
import { getAllBrands } from "../../services/brandService";
import { getAllCompanies } from "../../services/companyService";
import { getAllItemCategory } from "../../services/categoryService";

const ItemBatchMRPStockReport = () => {
  const [allStocks, setAllStocks] = useState([]);

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

  const fetchAllStocks = async () => {
    try {
      // const filterOptions = {
      //   page: 1,
      //   limit: 1,
      //   supplierName: selectedSupplier,
      //   fromDate: dateFrom,
      //   toDate: dateTo,
      // };
      const allStocksResponse = await getAllStocks(
        loginResponse
        // filterOptions
      );
      console.log("allStocksResponse ---> ", allStocksResponse?.data?.data);
      setAllStocks(allStocksResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching stock. Please try again later.",
        "Error"
      );
      console.error("Error fetching stock:", error);
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

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Stock Report
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Filter By:
        </Typography>

        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <InputLabel for="selectOptions">Select Options</InputLabel>
            <RadioGroup
              row
              name="selectOptions"
              aria-labelledby="selectOptions"
              value={selectOptions}
              onChange={(e) => setselectOptions(e.target.value)}
            >
              <FormControlLabel
                value="all-stock"
                control={<Radio />}
                label="All Stock"
              />
              <FormControlLabel value="item" control={<Radio />} label="Item" />
              <FormControlLabel
                value="category"
                control={<Radio />}
                label="Category"
              />
              <FormControlLabel value="volume" control={<Radio />} label="Pack" />
              <FormControlLabel
                value="brand-wise"
                control={<Radio />}
                label="Brand Wise"
              />
              <FormControlLabel
                value="cate/item"
                control={<Radio />}
                label="Cate/Item"
              />
              <FormControlLabel
                value="cate/volume"
                control={<Radio />}
                label="Cate/Pack"
              />
              <FormControlLabel
                value="cate/brand"
                control={<Radio />}
                label="Cate/Brand"
              />
              <FormControlLabel
                value="item/volume"
                control={<Radio />}
                label="Item/Pack"
              />
              <FormControlLabel
                value="brand/volume"
                control={<Radio />}
                label="Brand/Pack"
              />
              <FormControlLabel
                value="item/brand"
                control={<Radio />}
                label="Item/Brand"
              />

              <FormControlLabel
                value="item/volume/brand"
                control={<Radio />}
                label="Item/Pack/Brand"
              />
              <FormControlLabel
                value="item/cate/size"
                control={<Radio />}
                label="Item/Cate/Size"
              />
              <FormControlLabel
                value="item/cate/brand"
                control={<Radio />}
                label="Item/Cate/Brand"
              />

              <FormControlLabel
                value="cate/volume/brand"
                control={<Radio />}
                label="Cate/Pack/Brand"
              />
              <FormControlLabel
                value="company-wise"
                control={<Radio />}
                label="Distributor Wise"
              />
              <FormControlLabel
                value="code-wise"
                control={<Radio />}
                label="Code Wise"
              />
              <FormControlLabel
                value="batch-wise"
                control={<Radio />}
                label="Batch Wise"
              />
              <FormControlLabel
                value="batch/item"
                control={<Radio />}
                label="Batch/Item"
              />
              <FormControlLabel
                value="batch/cate"
                control={<Radio />}
                label="Batch/Cate"
              />
              <FormControlLabel
                value="batch/brand"
                control={<Radio />}
                label="Batch/Brand"
              />
              <FormControlLabel
                value="stock-on"
                control={<Radio />}
                label="Stock On"
              />
            </RadioGroup>
          </Grid> */}

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
            rows={allStocks?.map((stock, index) => ({
              id: index,
              sNo: index + 1,
              itemCode: stock.itemCode,
              itemName: stock?.itemId?.name,
              batchNo: stock.batchNo,

              saleRate: stock.saleRate,
              purchaseRate: stock.purchaseRate,
              stockRate: stock.stockRate,
              stockAt: stock.stockAt,
              currentStock: stock.currentStock,
              openingStock: stock.openingStock,
              mrp: stock.mrp,

              // action: (
              //   <Button
              //     variant="contained"
              //     size="small"
              //     onClick={() => handleViewClick(stock)}
              //   >
              //     View
              //   </Button>
              // ),
            }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ backgroundColor: "#fff" }}
          />
          {/* Modal to display details */}
          {/* <PurchaseDetailsModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          rowData={selectedRowData}
        /> */}
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
    </form>
  );
};

export default ItemBatchMRPStockReport;
