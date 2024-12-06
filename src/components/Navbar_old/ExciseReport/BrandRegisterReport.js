import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { customTheme } from "../../../utils/customTheme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import debounce from "lodash.debounce";
import { getAllBrandsReport } from "../../../services/brandService";
import dayjs from "dayjs";

const BrandRegisterReport = () => {
  const [allProfitData, setAllProfitData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });
  const [filterData, setFilterData] = useState({
    dateFrom: null,
    dateTo: null,
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
      field: "category",
      headerName: "Category",
      flex: 2,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 3,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "volume",
      headerName: "Volume",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "opening",
      headerName: "Opening",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "receipts",
      headerName: "Receipts",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "batch",
      headerName: "Batch",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "passDate",
      headerName: "Pass Date",
      flex: 2,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "sale",
      headerName: "Sale",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "closing",
      headerName: "Closing",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 2,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
    },
  ];

  const fetchAllProfits = async () => {
    const filterOptions = {
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      fromDate: dayjs(filterData.dateFrom).format("DD/MM/YYYY"),
      toDate: dayjs(filterData.dateTo).format("DD/MM/YYYY"),
    };

    setLoading(true);
    try {
      const response = await getAllBrandsReport(filterOptions);
      console.log("response: ", response);
      const responseData = response?.data?.data;

      if (responseData?.formattedData) {
        const transformedData = [];
        let totalRecords = 0;

        responseData?.formattedData.forEach((category, categoryIndex) => {
          category.brand.forEach((brand, brandIndex) => {
            brand.volume.forEach((item, itemIndex) => {
              transformedData.push({
                sNo:
                  itemIndex === 0 && brandIndex === 0
                    ? categoryIndex +
                      paginationModel.page * paginationModel.pageSize +
                      1
                    : "",

                category:
                  itemIndex === 0 && brandIndex === 0
                    ? category.categories
                    : "",

                brand: itemIndex === 0 ? brand.name.trim() : "",
                batch: item.batchNo || "",
                volume: item.volume || "",
                opening: item.openingBalance || "",
                closing: item.closingBlance || "",
                sale: item.totalCurrentSalesPcs || "",
                supplier: item.supplierNames || "",
                passDate: item.passDates || "",
                receipts: item.totalCurrentPurchasesPcs || "",
                total: item.total || "",
              });
            });
          });
          totalRecords++;
        });
        const sumOfAllData = responseData?.sumOfAllData || {};

        transformedData.push({
          sNo: "",
          category: "Totals",
          brand: "",
          batch: "",
          volume: "",
          opening: sumOfAllData.openingBalance || 0,
          closing: sumOfAllData.closingBlance || 0,
          sale: sumOfAllData.totalSales || 0,
          supplier: "",
          passDate: "",
          receipts: sumOfAllData.quantityReceipts || 0,
          total: sumOfAllData.total || 0,
        });

        setTotalCount(totalRecords);
        setAllProfitData(transformedData);
      } else {
        setAllProfitData([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Error fetching records", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      if (filterData.dateFrom && filterData.dateTo) fetchAllProfits();
    }, 300);

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [filterData, paginationModel]);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Brand Register Report
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
                  value={filterData.dateFrom}
                  className="input-field date-picker"
                  onChange={(newDate) =>
                    setFilterData({
                      ...filterData,
                      dateFrom: newDate ? newDate : null,
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
                  value={filterData.dateTo}
                  className="input-field date-picker"
                  onChange={(newDate) =>
                    setFilterData({
                      ...filterData,
                      dateTo: newDate ? newDate : null,
                    })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
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
              });
              setPaginationModel({ page: 0, pageSize: 100 });
            }}
          >
            Clear Filters
          </Button>
          {/* <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={() => {}}
          >
            Print
          </Button> */}
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllProfits}
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
            rows={allProfitData.map((item, index) => ({
              id: index,
              ...item,
            }))}
            columns={columns}
            rowCount={totalCount}
            paginationMode="server"
            pagination
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

export default BrandRegisterReport;
