import React, { useEffect, useState } from "react";
import { Typography, Modal, Box, Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getItemSaleDetails } from "../../../services/saleBillService";

const SalesDetailsModal = ({ open, handleClose, rowData }) => {
  const [itemSalesDetails, setItemSalesDetails] = useState([]);
  const [loading, setLoading] = useState(false);

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
      field: "batchNo",
      headerName: "Batch No.",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "split",
      headerName: "Split",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "break",
      headerName: "Broken",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "mrp",
      headerName: "MRP",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "pcs",
      headerName: "Pcs.",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "rate",
      headerName: "Rate",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      headerClassName: "custom-header",
    },
  ];

  useEffect(() => {
    const fetchAllItemSales = async () => {
      setLoading(true);
      try {
        const allItemSalesResponse = await getItemSaleDetails(rowData.billNo);
        // console.log("allItemSalesResponse: ",allItemSalesResponse?.data?.data)
        setItemSalesDetails(allItemSalesResponse?.data?.data?.salesItems);
      } catch (error) {
        console.log("Error fetching ItemSales.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllItemSales();
  }, [rowData]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          "& .custom-header": {
            backgroundColor: "#dae4ed",
          },
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          sx={{ marginBottom: 3 }}
        >
          Sale Item Details
        </Typography>
        
        {itemSalesDetails.length > 0 ? (
          <DataGrid
            rows={(itemSalesDetails || [])?.map((item, index) => ({
              id: index,
              sNo: index + 1,
              itemCode: item.itemCode || "No Data",
              batchNo: item.batchNo || "No Data",
              break: item.break || 0,
              split: item.split || 0,
              mrp: item.mrp.toFixed(2) || 0,
              pcs: item.pcs || 0,
              rate: item.rate.toFixed(2) || 0,
              discount: item.discount.toFixed(2) || 0,
              amount: item.amount.toFixed(2) || 0,
            }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ backgroundColor: "#fff" }}
            loading={loading}
            loadingOverlay={
              <Box>
                <CircularProgress />
              </Box>
            }
          />
        ) : (
          <Typography variant="body1" align="center">
            No sales details to display.
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 3,
          }}
        >
          <Button
            color="warning"
            size="medium"
            variant="outlined"
            onClick={handleClose}
            sx={{ borderRadius: 8, marginLeft: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SalesDetailsModal;
