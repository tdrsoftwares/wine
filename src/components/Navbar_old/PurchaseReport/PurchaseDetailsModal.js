import React, { useEffect, useState } from "react";
import {
  Typography,
  Modal,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { getItemPurchaseDetails } from "../../../services/purchaseService";
import { DataGrid } from "@mui/x-data-grid";

const PurchaseDetailsModal = ({ open, handleClose, rowData }) => {
  // console.log("rowData: ", rowData);
  // console.log("open: ", open);
  const [itemPurchaseDetails, setItemPurchaseDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log("itemPurchaseDetails: ", itemPurchaseDetails);

  const columns = [
    {
      field: "sNo",
      headerName: "S. No.",
      width: 90,
      headerClassName: "custom-header",
    },
    // {
    //   field: "itemId",
    //   headerName: "Item Id",
    //   width: 180,
    //   headerClassName: "custom-header",
    // },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 150,
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
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "batchNo",
      headerName: "Batch No.",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "brokenNo",
      headerName: "Broken",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "caseNo",
      headerName: "Case",
      width: 120,
      headerClassName: "custom-header",
    },
    
    // {
    //   field: "updatedAt",
    //   headerName: "Updated Date",
    //   width: 150,
    //   headerClassName: "custom-header",
    // },

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
      field: "purchaseRate",
      headerName: "Purchase Rate",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "saleRate",
      headerName: "Sale Rate",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "sp",
      headerName: "S. Purposes",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "gro",
      headerName: "GRO",
      width: 120,
      headerClassName: "custom-header",
    },
    {
      field: "itemAmount",
      headerName: "Amount",
      width: 120,
      headerClassName: "custom-header",
    },
  ];

  const fetchAllItemPurchases = async () => {
    setLoading(true);
    try {
      const allItemPurchasesResponse = await getItemPurchaseDetails(
        rowData.entryNo
      );
      // console.log("allItemPurchasesResponse: ", allItemPurchasesResponse);
      setItemPurchaseDetails(allItemPurchasesResponse?.data?.data?.purchaseItems);
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching ItemPurchases. Please try again later.",
      //   "Error"
      // );
      console.log("Error fetching ItemPurchases.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllItemPurchases();
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
          Purchased Items
        </Typography>

        {itemPurchaseDetails.length > 0 ? (
          <DataGrid
            rows={(itemPurchaseDetails)?.map((item, index) => ({
              id: index,
              sNo: index + 1,
              createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
              itemCode: item.itemDetailsId?.itemCode || "No Data",
              itemName: item.itemId?.name || "No Data",
              batchNo: item.itemDetailsId?.batchNo || 0,
              brokenNo: item.brokenNo || 0,
              caseNo: item.caseNo || 0,
              // updatedAt: new Date(item.updatedAt).toLocaleDateString("en-GB"),
              mrp: item.itemDetailsId?.mrp?.toFixed(2) || 0,
              pcs: item.pcs || 0,
              purchaseRate: item.itemDetailsId?.purchaseRate?.toFixed(2) || 0,
              saleRate: item.itemDetailsId?.saleRate?.toFixed(2) || 0,
              gro: item.gro?.toFixed(2) || 0,
              sp: item.sp?.toFixed(2) || 0,
              itemAmount: item.itemAmount?.toFixed(2) || 0,
            }))}
            columns={columns}
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
            No purchased items to display.
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

export default PurchaseDetailsModal;
