import React, { useRef } from "react";
import { Box, Modal, Typography, Divider, Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { toWords } from "number-to-words";

const SaleBillPrintModal = ({ open, handleClose, salesData, formData, totalValues, licenseDetails }) => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const amountInWords = (amount) => {
    if (isNaN(amount) || amount === undefined || amount === null) {
      return "Zero Only";
    }
    return toWords(amount) + " Only";
  };

  const saleBillData = {
    customer: formData.customerName ? formData.customerName.name : "",
    billNo: formData.billno || "N/A",
    date: new Date(formData.billDate).toLocaleDateString(),
    time: new Date(formData.billDate).toLocaleTimeString(),
    items: salesData,
    totalQty: totalValues.totalPcs || 0,
    grossAmt: parseFloat(totalValues.grossAmt) || 0.0,
    totalBL: parseFloat(totalValues.totalVolume) || 0.0,
    netAmount: parseFloat(totalValues.netAmt) || 0.0,
    amountInWords: amountInWords(parseFloat(totalValues.netAmt) || 0.0),
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="sale-bill-print-title"
      sx={{ p: 1 }}
    >
      <Box sx={printModalStyles}>
        <Box ref={printRef} sx={{ p: 1, width: "80mm" }}>
          <Typography variant="h6" component="h2" align="center" sx={{ fontSize: "12px" }}>
            Original
          </Typography>
          <Typography variant="h6" component="h2" align="center" sx={{ fontSize: "12px" }}>
            Cash Memo
          </Typography>
          <Typography variant="h5" component="h2" align="center" sx={{ fontSize: "12px" }}>
            {licenseDetails?.nameOfLicence}
          </Typography>
          <Typography variant="h6" component="h2" align="center" sx={{ fontSize: "12px" }}>
            {licenseDetails?.businessType}
          </Typography>
          <Typography variant="body1" align="center" sx={{ fontSize: "10px" }}>
            {licenseDetails?.address}
          </Typography>
          <Typography variant="body1" align="center" sx={{ fontSize: "10px" }}>
            {`${licenseDetails?.district || ''}`}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
            <Typography variant="body1">
              Customer: {saleBillData.customer}
            </Typography>
            <Typography variant="body1">
              *{saleBillData.billNo}*
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
            <Typography variant="body1">
              Bill No.: {saleBillData.billNo}
            </Typography>
            <Typography variant="body1">
              Time: {saleBillData.time}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ fontSize: "10px" }}>
            Date: {saleBillData.date}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography variant="body2" sx={{ fontSize: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ width: "25%" }}>BATCH</Box>
              <Box sx={{ width: "35%" }}>ITEM</Box>
              <Box sx={{ width: "10%" }}>QTY</Box>
              <Box sx={{ width: "15%" }}>RATE</Box>
              <Box sx={{ width: "15%" }}>AMT.</Box>
            </Box>
          </Typography>
          {saleBillData.items.map((item, index) => (
            <Typography key={index} variant="body2" sx={{ fontSize: "10px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "25%" }}>{item.batch}</Box>
                <Box sx={{ width: "35%" }}>{item.itemName}</Box>
                <Box sx={{ width: "10%" }}>{item.pcs}</Box>
                <Box sx={{ width: "15%" }}>{item.rate}</Box>
                <Box sx={{ width: "15%" }}>{item.amount.toFixed(2)}</Box>
              </Box>
            </Typography>
          ))}

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
            <Typography variant="body1">
              Total Qty: {saleBillData.totalQty}
            </Typography>
            <Typography variant="body1">
              Gross Amt: {saleBillData.grossAmt.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
            <Typography variant="body1">
              Total BL: {saleBillData.totalBL}
            </Typography>
            <Typography variant="body1">
              Net Amount: {saleBillData.netAmount.toFixed(2)}
            </Typography>
          </Box>
          <Typography variant="body1" align="center" sx={{ fontSize: "10px" }}>
            Rs.: {saleBillData.amountInWords}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography variant="body1" align="center" sx={{ fontSize: "10px" }}>
            {licenseDetails?.billMessages}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          sx={{ mt: 1 }}
        >
          Print
        </Button>
      </Box>
    </Modal>
  );
};

const printModalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90mm",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
  textAlign: "center",
};

export default SaleBillPrintModal;
