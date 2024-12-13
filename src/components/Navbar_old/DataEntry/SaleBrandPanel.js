import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { NotificationManager } from "react-notifications";
import { searchByBrandName } from "../../../services/saleBillService";
import debounce from "lodash.debounce";

const SaleBrandPanel = ({
  storeName,
  formData,
  setFormData,
  pcsRef,
  brandName,
  setBrandName,
  brandPanelLoading,
  setBrandPanelLoading,
  brandWiseItemData,
  setBrandWiseItemData,
  fetchAllBrandWiseItems,
  canRead,
  role,
  currentPage,
  setCurrentPage,
  setCurrentPageSize
}) => {

  const [brandNameOptions, setBrandNameOptions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const tableContainerRef = useRef(null);

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
    // setFilterData((prevData) => ({ ...prevData, brandName: newValue }));
  };

  const handleScroll = () => {
    if (tableContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
  
      
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isFetching && !brandPanelLoading) {
        setIsFetching(true); 
        setCurrentPage((prevPage) => prevPage + 1); 
      }
    }
  };

  useEffect(() => {
    if (currentPage > 1) {
      fetchAllBrandWiseItems(true);
    }
  }, [currentPage]);
  

  useEffect(() => {
    if (!brandPanelLoading) {
      setIsFetching(false);
    }

    const tableContainer = tableContainerRef.current;

    if (tableContainer) {
      tableContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [brandPanelLoading]);

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      // setBrandPanelLoading(true);
      await fetchAllBrandWiseItems(true);
      // setBrandPanelLoading(false);
    }, 300);

    if (storeName || brandName) {
      setBrandWiseItemData([]);
      setCurrentPage(1);
      setCurrentPageSize(30);
      debouncedFetch();
    }
  }, [storeName, brandName]);

  const handleBrandItemsRowClick = (index) => {
    const selectedRow = brandWiseItemData[index];
    // console.log("selectedRow: ", selectedRow);

    setFormData({
      ...formData,
      itemId: selectedRow.item?._id,
      itemDetailsId: selectedRow._id,
      itemCode: selectedRow.itemCode || 0,
      itemName: selectedRow.item?.name || 0,
      mrp: selectedRow.mrp || 0,
      batch: selectedRow.batchNo || 0,
      pcs: selectedRow.pcs || "",
      rate: selectedRow.mrp || 0,
      volume: selectedRow.item?.volume || 0,
      currentStock: selectedRow.currentStock || 0,
      group: selectedRow.item?.group,
    });

    pcsRef.current.focus();
  };

  return (
    <Box
      sx={{
        maxWidth: 340,
        p: 1.5,
        boxShadow: 2,
        borderRadius: 1,
        marginTop: 2,
        marginRight: 1,
      }}
      className="table-header"
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputLabel className="input-label-2">Select Brand:</InputLabel>
          <Autocomplete
                options={[
                  ...brandNameOptions.map((option) => option.name),
                ]}
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
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        ref={tableContainerRef}
        sx={{
          marginTop: 1,
          height: 385,
          width: "100%",
          overflowY: "unset",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            width: 10,
            height: 10,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#fff",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#d5d8df",
            borderRadius: 2,
          },
        }}
      >
        <Table size="small">
          <TableHead className="table-head">
            <TableRow>
              <TableCell align="left">Item Name</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">MRP</TableCell>
              <TableCell align="center">Batch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brandPanelLoading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{
                    backgroundColor: "#fff !important",
                  }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : canRead || role === "admin" ? (
              Array.isArray(brandWiseItemData) &&
              brandWiseItemData.length > 0 ? (
                brandWiseItemData.map((row, index) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      handleBrandItemsRowClick(index);
                    }}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.15) !important",
                      },
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{
                        maxWidth: 150,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        "&:hover": {
                          overflow: "visible",
                          whiteSpace: "normal",
                          backgroundColor: "rgba(25, 118, 210, 0.15)",
                        },
                      }}
                      title={row?.item?.name || "No Data"}
                    >
                      {row?.item?.name || "No Data"}
                    </TableCell>
                    <TableCell align="center">
                      {row?.currentStock || 0}
                    </TableCell>
                    <TableCell align="center">{row?.mrp || 0}</TableCell>
                    <TableCell align="center">{row?.batchNo || 0}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{
                      backgroundColor: "#fff !important",
                    }}
                  >
                    No Data
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{
                    backgroundColor: "#fff !important",
                  }}
                >
                  You do not have permission to view sales data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SaleBrandPanel;
