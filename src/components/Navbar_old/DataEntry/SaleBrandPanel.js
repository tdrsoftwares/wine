import {
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
import React, { useEffect, useState } from "react";
import { getAllBrands } from "../../../services/brandService";
import { NotificationManager } from "react-notifications";

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
}) => {
  const [allBrands, setAllBrands] = useState([]);

  const fetchAllBrands = async () => {
    setBrandPanelLoading(true);
    try {
      const allBrandsResponse = await getAllBrands();
      // console.log("allBrandsResponse ---> ", allBrandsResponse);
      if (allBrandsResponse.status === 200) {
        setAllBrands(allBrandsResponse?.data?.data);
      } else {
        setAllBrands([]);
        NotificationManager.error("No brands found.", "Error");
      }
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      console.error("Error fetching brands:", error);
    } finally {
      setBrandPanelLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBrands();
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
    const debouncedFetch = debounce(async () => {
      setBrandPanelLoading(true);
      await fetchAllBrandWiseItems();
      setBrandPanelLoading(false);
    }, 300);

    if (storeName && brandName) {
      setBrandWiseItemData([]);
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
          <TextField
            select
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            {allBrands?.map((brand) => (
              <MenuItem key={brand._id} value={brand.name}>
                {`${brand.name}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
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
              <TableCell align="center">Item Name</TableCell>
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
            ) : Array.isArray(brandWiseItemData) && brandWiseItemData.length > 0 ? (
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
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.item?.name || "No Data"}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.currentStock || 0}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.mrp || 0}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.batchNo || 0}
                  </TableCell>
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
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SaleBrandPanel;
