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
import React, { useEffect, useMemo, useState } from "react";

import { NotificationManager } from "react-notifications";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getAllBrands } from "../services/brandService";
import { getAllItems } from "../services/itemService";
import { customTheme } from "../utils/customTheme";
import { getAllItemCategory } from "../services/categoryService";


const Epos = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [allEposData, setAllEposData] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [itemName, setItemName] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [editedRows, setEditedRows] = useState({});
//   console.log("allEposData --> ",allEposData)
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format("DD/MM/YYYY");
  };

  // console.log("dateFrom: ", formatDate(dateFrom));

  const columns = useMemo(
    () => [
      { field: "sNo", headerName: "S. No.", flex: 1 },
      { field: "itemCode", headerName: "Item Code", flex: 1 },
      { field: "itemName", headerName: "Item Name", flex: 1 },
      { field: "mrpValue", headerName: "MRP Value", flex: 1 },
      { field: "volume", headerName: "Volume", flex: 1 },
      { field: "sendQty", headerName: "Send Quantity", flex: 1, editable: true },
      { field: "saleQty", headerName: "Sale Quantity", flex: 1 },
    ],
    []
  );

  const rows = useMemo(
    () =>
      (allEposData || []).map((item, index) => ({
        id: index,
        sNo: index + 1,
        itemCode: item.itemCode || "No Data",
        itemName: item.itemName || "No Data",
        volume: item.supplier?.name || 0,
        mrpValue: item.mrp || 0,
        sendQty: item.sendQty || 0,
        saleQty: item.saleQty || 0,
      })),
    [allEposData]
  );

  const handleViewClick = (row) => {
    setSelectedRowData(row);
    setIsModalOpen(true);
  };

  const fetchAllEposData = async () => {
    const fromDate = dateFrom ? formatDate(dateFrom) : null;
    const toDate = dateTo ? formatDate(dateTo) : null;

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
        itemName: itemName,
        brandName: brandName,
      };
    //   const response = await getAllItemCategory(filterOptions);
    //   console.log("sales fetched", response?.data?.data);
    //   setAllEposData(response?.data?.data || []);
    //   setTotalCount(response?.data?.data?.length || 0);
    } catch (error) {
      NotificationManager.error(
        "Error fetching sales. Please try again later.",
        "Error"
      );
      setAllEposData([])
    } finally {
      setLoading(false);
    }
  };

  const fetchAllItems = async () => {
    try {
      const allItemsResponse = await getAllItems();
      if (allItemsResponse) {
        setAllItems(allItemsResponse?.data?.data);
      } else {
        setAllItems([]);
        NotificationManager.error("No items found");
      }
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
      if (allBrandResponse) {
        setAllBrands(allBrandResponse?.data?.data);
      } else {
        setAllBrands([]);
        NotificationManager.error("No brands found");
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      setAllBrands([]);
    }
  };

  useEffect(() => {
    fetchAllBrands();
    fetchAllItems();
    fetchAllEposData();
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
    const debouncedFetch = debounce(fetchAllEposData, 300);
    debouncedFetch();
  }, [paginationModel, dateFrom, dateTo, itemName, brandName]);

  const processRowUpdate = (newRow, oldRow) => {
    setEditedRows((prevEditedRows) => ({
      ...prevEditedRows,
      [newRow.id]: newRow,
    }));
    console.log("newRow",newRow)
    return newRow;
  };

  const handleSendClick = async () => {
    try {
      // Send the editedRows data to your server or process it as needed
      console.log("Sending edited rows data:", (editedRows));
      NotificationManager.success("Data sent successfully");
    } catch (error) {
      NotificationManager.error("Error sending data. Please try again.");
    }
  };


  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Epos :
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>Filter By:</Typography>

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
                  value={dateFrom}
                  className="date-picker"
                  onChange={(date) => setDateFrom(date)}
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
                  value={dateTo}
                  className="date-picker"
                  onChange={(date) => setDateTo(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemName" className="input-label">
                Item Name:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
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
              <InputLabel htmlFor="brandName" className="input-label">
                Brand:
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
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
                {allBrands.map((brand) => (
                  <MenuItem key={brand._id} value={brand.name}>
                    {brand.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            "& button": { marginTop: 1 },
          }}
        >
          
          <div>
          <Button
            color="inherit"
            size="small"
            variant="contained"
            onClick={() => {
              setDateFrom(null);
              setDateTo(null);
              setItemName("");
              setBrandName("");
              setPaginationModel({ page: 0, pageSize: 10 });
              fetchAllEposData();
            }}
            // sx={{ borderRadius: 8 }}
          >
            Clear Filters
          </Button>
            <Button
              color="info"
              size="small"
              variant="contained"
              onClick={fetchAllEposData}
              sx={{ marginLeft: 2 }}
            >
              Display
            </Button>
          </div>
        </Box>

        <Box
          sx={{
            height: 500,
            width: "100%",
            marginTop: 1,
            "& .custom-header": { backgroundColor: "#dae4ed", paddingLeft: 4 },
            "& .custom-cell": { paddingLeft: 4 },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={totalCount}
            pagination
            // paginationMode="server"
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            // onPaginationModelChange={setPaginationModel}
            sx={{ backgroundColor: "#fff" }}
            loading={loading}
            components={{
              LoadingOverlay: () => (
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
              ),
            }}
            slots={{
              toolbar: GridToolbar,
              // pagination: Pagination
            }}
            initialState={{
              density: "compact",
            }}
            processRowUpdate={processRowUpdate}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendClick}
          sx={{ mt: 2 }}
        >
          Send
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Epos;
