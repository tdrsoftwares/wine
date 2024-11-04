import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { customTheme } from "../../utils/customTheme";
import { getAllItemCategory } from "../../services/categoryService";
import { NotificationManager } from "react-notifications";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DataGrid,
  GridFooter,
  GridFooterContainer,
  GridToolbar,
} from "@mui/x-data-grid";
import { getCateLedgerPackDetails } from "../../services/cateLedgerPackService";
import { useReactToPrint } from "react-to-print";
import CatLedgerPackPrintComponent from "./CatLedgerPackPrintComponent";
import { usePermissions } from "../../utils/PermissionsContext";

const CatLedgerPack = () => {
  const [categoryName, setCategoryName] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [blOnly, setBlOnly] = useState(false);
  const [allRowData, setAllRowData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });

  const [totalPur, setTotalPur] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOpeningBal, setTotalOpeningBal] = useState(0);
  const [totalClosingBal, setTotalClosingBal] = useState(0);

  const { permissions, role } = usePermissions();

  const reportsPermissions =
    permissions?.find((permission) => permission.moduleName === "Reports")
      ?.permissions || [];
  const canRead = reportsPermissions.includes("read");

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

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
          <span>Total Volume: {totalVolume}</span>
          <span>Total Opening Bal: {totalOpeningBal}</span>
          <span>Total Purchase: {totalPur}</span>
          <span>Total Sales: {totalSales}</span>
          <span>Total Closing Bal: {totalClosingBal}</span>
        </div>
        <GridFooter />
      </GridFooterContainer>
    );
  };

  // console.log(allRowData);

  useEffect(() => {
    const calculateSums = (data) => {
      let totalPur = 0;
      let totalVolume = 0;
      let totalOpeningBal = 0;
      let totalSales = 0;
      let totalClosingBal = 0;

      data.forEach((item) => {
        totalPur += parseFloat(item.purchases) || 0;
        totalVolume += parseFloat(item.volume) || 0;
        totalOpeningBal += parseFloat(item.openingBalance) || 0;
        totalSales += parseFloat(item.sales) || 0;
        totalClosingBal += parseFloat(item.closingBalance) || 0;
      });

      return {
        totalPur: blOnly ? totalPur?.toFixed(3) : totalPur,
        totalVolume: blOnly ? totalVolume?.toFixed(3) : totalVolume,
        totalOpeningBal: blOnly ? totalOpeningBal?.toFixed(3) : totalOpeningBal,
        totalSales: blOnly ? totalSales?.toFixed(3) : totalSales,
        totalClosingBal: blOnly ? totalClosingBal?.toFixed(3) : totalClosingBal,
      };
    };

    const {
      totalPur,
      totalVolume,
      totalOpeningBal,
      totalSales,
      totalClosingBal,
    } = calculateSums(allRowData);

    setTotalPur(totalPur);
    setTotalVolume(totalVolume);
    setTotalOpeningBal(totalOpeningBal);
    setTotalSales(totalSales);
    setTotalClosingBal(totalClosingBal);
  }, [allRowData, blOnly]);

  // console.log("allRowData: ", allRowData);
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

  const fetchAllCateLedger = async () => {
    const fromDate = dateFrom ? formatDate(dateFrom) : null;
    const toDate = dateTo ? formatDate(dateTo) : null;

    setLoading(true);
    try {
      const filterOptions = {
        fromDate,
        toDate,
        categoryName,
        bl: blOnly,
      };
      const response = await getCateLedgerPackDetails(filterOptions);

      if (response.status === 200) {
        const rowData = response.data.data.reduce((acc, category, index) => {
          const { categoryName, volumes } = category;
          let categoryTotal = {
            openingBalance: 0,
            purchases: 0,
            sales: 0,
            closingBalance: 0,
          };

          // category rows
          volumes.forEach((volume, volIndex) => {
            const formattedVolume = {
              openingBalance: blOnly
                ? volume.openingBalance?.toFixed(3)
                : volume.openingBalance,
              purchases: blOnly
                ? volume.purchases?.toFixed(3)
                : volume.purchases,
              sales: blOnly ? volume.sales?.toFixed(3) : volume.sales,
              closingBalance: blOnly
                ? volume.closingBalance?.toFixed(3)
                : volume.closingBalance,
            };

            acc.push({
              id: `${index}-${volIndex}`,
              sNo: acc.length + 1,
              categoryName: volIndex === 0 ? categoryName : "",
              volume: volume.volume,
              ...formattedVolume,
            });

            // totals
            categoryTotal.openingBalance += volume.openingBalance;
            categoryTotal.purchases += volume.purchases;
            categoryTotal.sales += volume.sales;
            categoryTotal.closingBalance += volume.closingBalance;
          });

          // total row
          acc.push({
            id: `${index}-total`,
            sNo: "",
            categoryName: `${categoryName} Total`,
            volume: "",
            openingBalance: blOnly
              ? categoryTotal.openingBalance?.toFixed(3)
              : categoryTotal.openingBalance,
            purchases: blOnly
              ? categoryTotal.purchases?.toFixed(3)
              : categoryTotal.purchases,
            sales: blOnly
              ? categoryTotal.sales?.toFixed(3)
              : categoryTotal.sales,
            closingBalance: blOnly
              ? categoryTotal.closingBalance?.toFixed(3)
              : categoryTotal.closingBalance,
            isTotalRow: true,
          });

          return acc;
        }, []);

        setAllRowData(rowData);
        setTotalCount(rowData.length);
      } else {
        console.log("Error", response);
        // NotificationManager.error("No records found.", "Error");
        setAllRowData([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching records. Please try again later.",
      //   "Error"
      // );
      console.log("Error fetching records", error);
    } finally {
      setLoading(false);
    }
  };

  // custom row rendering
  const renderRow = (params) => {
    if (params.row.isTotalRow) {
      return (
        <Box sx={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
          {params.row[params.field]}
        </Box>
      );
    }
    return params.row[params.field];
  };

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      flex: 0.5,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
      renderCell: renderRow,
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
      renderCell: renderRow,
    },
    {
      field: "volume",
      headerName: "Volume",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
      renderCell: renderRow,
    },
    {
      field: "openingBalance",
      headerName: "Opening Balance",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
      renderCell: renderRow,
    },
    {
      field: "purchases",
      headerName: "Purchases",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
      renderCell: renderRow,
    },
    {
      field: "sales",
      headerName: "Sales",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
      renderCell: renderRow,
    },
    {
      field: "closingBalance",
      headerName: "Closing Balance",
      flex: 1,
      cellClassName: "custom-cell",
      headerClassName: "custom-header",
      renderCell: renderRow,
    },
  ];

  useEffect(() => {
    fetchAllCategory();
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
    const debouncedFetch = debounce(fetchAllCateLedger, 300);
    if (dateFrom) {
      debouncedFetch();
    }
  }, [categoryName, dateFrom, dateTo, blOnly]);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" gutterBottom>
          Category Pack Wise Stock
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>Filter By:</Typography>

        <Grid container spacing={3}>
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
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
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
              <InputLabel htmlFor="dateFrom" className="input-label">
                Date from:
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="dateFrom"
                  format="DD/MM/YYYY"
                  value={dateFrom}
                  className="input-field date-picker"
                  onChange={(newDate) =>
                    setDateFrom(newDate ? newDate.format("YYYY-MM-DD") : null)
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
                  value={dateTo}
                  className="input-field date-picker"
                  onChange={(newDate) => setDateTo(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="pcsOnly" className="input-label">
                BL Only:
              </InputLabel>
              <Checkbox
                name="pcsOnly"
                checked={blOnly}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) => setBlOnly(e.target.checked)}
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
              setCategoryName("");
              setDateFrom(null);
              setDateTo(null);
              setBlOnly(false);
              setPaginationModel({ page: 0, pageSize: 100 });
              setAllRowData([]);
            }}
          >
            Clear Filters
          </Button>
          <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={handlePrint}
            disabled={!canRead && role !== "admin"}
          >
            Print
          </Button>
          <Button
            color="info"
            size="small"
            variant="contained"
            onClick={fetchAllCateLedger}
            disabled={!canRead && role !== "admin"}
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
          {canRead || role === "admin" ? (
            <DataGrid
              rows={allRowData}
              columns={columns}
              rowCount={totalCount}
              pagination
              paginationModel={paginationModel}
              pageSizeOptions={[10, 25, 50, 100]}
              onPaginationModelChange={setPaginationModel}
              sx={{ backgroundColor: "#fff" }}
              disableRowSelectionOnClick
              loading={loading}
              loadingOverlay={<CircularProgress />}
              slots={{
                toolbar: GridToolbar,
                footer: CustomFooter,
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

        <CatLedgerPackPrintComponent
          ref={printRef}
          dateFrom={dateFrom}
          dateTo={dateTo}
          blOnly={blOnly}
          allRowData={allRowData}
          totalPur={totalPur}
          totalVolume={totalVolume}
          totalOpeningBal={totalOpeningBal}
          totalSales={totalSales}
          totalClosingBal={totalClosingBal}
        />
      </Box>
    </ThemeProvider>
  );
};

export default CatLedgerPack;
