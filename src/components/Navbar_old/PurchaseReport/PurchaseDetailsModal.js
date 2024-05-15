import React, { useEffect, useState } from "react";
import { Typography, Modal, Box, Button } from "@mui/material";
import { useLoginContext } from "../../../utils/loginContext";
import { getItemPurchaseDetails } from "../../../services/purchaseService";
import { NotificationManager } from "react-notifications";
import { DataGrid } from "@mui/x-data-grid";

const PurchaseDetailsModal = ({ open, handleClose, rowData }) => {
  const { loginResponse } = useLoginContext();
  const [itemPurchaseDetails, setItemPurchaseDetails] = useState([]);

  console.log("itemPurchaseDetails: ", itemPurchaseDetails);

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
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 150,
      headerClassName: "custom-header",
    },
    {
      field: "updatedAt",
      headerName: "Updated Date",
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
      field: "itemAmount",
      headerName: "Amount",
      width: 120,
      headerClassName: "custom-header",
    },
  ];

  useEffect(() => {
    const fetchAllItemPurchases = async () => {
      try {
        const allItemPurchasesResponse = await getItemPurchaseDetails(
          rowData.entryNo,
          loginResponse
        );
        console.log("allItemPurchasesResponse: ", allItemPurchasesResponse);
        setItemPurchaseDetails(
          allItemPurchasesResponse?.data?.data[0]?.purchaseItems
        );
      } catch (error) {
        // NotificationManager.error(
        //   "Error fetching ItemPurchases. Please try again later.",
        //   "Error"
        // );
        console.log("Error fetching ItemPurchases.", error);
      }
    };
    fetchAllItemPurchases();
  }, [loginResponse, rowData]);

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
        <DataGrid
          rows={itemPurchaseDetails?.map((item, index) => ({
            id: index,
            sNo: index + 1,
            // itemId: item.itemId,
            itemCode: item.itemCode,
            batchNo: item.batchNo,
            brokenNo: item.brokenNo,
            caseNo: item.caseNo,
            createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
            updatedAt: new Date(item.updatedAt).toLocaleDateString("en-GB"),
            mrp: item.mrp,
            pcs: item.pcs,
            purchaseRate: item.purchaseRate,
            saleRate: item.saleRate,
            sp: item.sp,
            itemAmount: item.itemAmount,
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{ backgroundColor: "#fff" }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 3,
          }}
        >
          {/* <Button
            color="primary"
            size="medium"
            variant="contained"
            onClick={handleCreateItem}
            sx={{ borderRadius: 8 }}
          >
            Create
          </Button> */}
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
