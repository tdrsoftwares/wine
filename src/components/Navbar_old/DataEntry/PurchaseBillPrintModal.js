import React, { useRef } from "react";
import { Box, Modal, Typography, Divider, Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { toWords } from "number-to-words";

const PurchaseBillPrintModal = ({ open, handleClose, purchases, formData, totalValues, licenseDetails }) => {
  const printRef = useRef();
//   console.log("purchases --> ",purchases)
//   console.log("formData --> ",formData)
//   console.log("totalValues --> ",totalValues)

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const amountInWords = (amount) => {
    if (isNaN(amount) || amount === undefined || amount === null) {
      return "Zero Only";
    }
    return toWords(amount) + " Only";
  };

  const purchaseBillData = {
    supplierName: formData.supplierName.name || "N/A",
    storeName: formData.stockIn.name || "N/A",
    passNo: formData.passNo || "N/A",
    billNo: formData.billNo || "N/A",
    passDate: formData.passDate ? new Date(formData.passDate).toLocaleDateString() : null,
    billDate: formData.billDate ? new Date(formData.billDate).toLocaleDateString() : null,
    items: purchases,
    totalMrp: totalValues.totalMrp || 0,
    grossAmt: parseFloat(totalValues.grossAmt) || 0.0,
    discountAmt: parseFloat(totalValues.discountAmt) || 0.0,
    govtRate: parseFloat(totalValues.govtRate) || 0.0,
    spcPurpose: parseFloat(totalValues.spcPurpose) || 0.0,
    tcsAmt: parseFloat(totalValues.tcsAmt) || 0.0,
    otherCharges: parseFloat(totalValues.otherCharges) || 0.0,
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
          {/* <Typography variant="h6" component="h2" align="center" sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Original
          </Typography> */}
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{ fontSize: "12px", fontWeight: "bold", mb: 1 }}
          >
            PURCHASE MEMO
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{ fontSize: "12px" }}
          >
            {licenseDetails?.nameOfLicence}
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{ fontSize: "12px" }}
          >
            {licenseDetails?.businessType}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ fontSize: "10px" }}
          >
            {licenseDetails?.address}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ fontSize: "10px" }}
          >
            {`${licenseDetails?.district || ""}`}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              Supplier: {purchaseBillData.supplierName}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "11px" }}>Store: {purchaseBillData.storeName}</Typography>

            
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              Bill No.: {purchaseBillData.billNo}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
                Pass No.: {purchaseBillData.passNo}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "10px" }}>
              Pass date: {purchaseBillData.passDate}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "10px" }}>
              Bill date: {purchaseBillData.billDate}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Typography variant="body2" sx={{ fontSize: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ width: "25%", fontWeight: "bold" }}>BATCH</Box>
              <Box sx={{ width: "35%", fontWeight: "bold" }}>ITEM</Box>
              <Box sx={{ width: "10%", fontWeight: "bold" }}>QTY</Box>
              <Box sx={{ width: "15%", fontWeight: "bold" }}>RATE</Box>
              <Box sx={{ width: "15%", fontWeight: "bold" }}>AMT.</Box>
            </Box>
          </Typography>
          {purchaseBillData.items.map((item, index) => (
            <Typography key={index} variant="body2" sx={{ fontSize: "10px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "25%" }}>{item.batch}</Box>
                <Box sx={{ width: "35%" }}>{item.itemName}</Box>
                <Box sx={{ width: "10%" }}>{item.pcs}</Box>
                <Box sx={{ width: "15%" }}>{item.btlRate}</Box>
                <Box sx={{ width: "15%" }}>{item.amount.toFixed(2)}</Box>
              </Box>
            </Typography>
          ))}

          <Divider sx={{ my: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              TCS Amt.: {purchaseBillData.tcsAmt.toFixed(2)}
            </Typography>
            
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              Total MRP: {purchaseBillData.totalMrp.toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              Govt. Rate Off: {purchaseBillData.govtRate.toFixed(2)}
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              Discount Amt.: {purchaseBillData.discountAmt.toFixed(2)}
            </Typography>
            
            
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              S. Purpose: {purchaseBillData.spcPurpose.toFixed(2)}
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              Gross Amt: {purchaseBillData.grossAmt.toFixed(2)}
            </Typography>
            
            
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              Other Chrgs: {purchaseBillData.otherCharges.toFixed(2)}
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              Net Amt.: {purchaseBillData.netAmount.toFixed(2)}
            </Typography>
          </Box>
          
          <Typography variant="body1" align="center" sx={{ fontSize: "10px", mt:1 }}>
            Rs.: {purchaseBillData.amountInWords}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography variant="body1" align="center" sx={{ fontSize: "10px" }}>
            {licenseDetails?.billMessages}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handlePrint}
            sx={{ mt: 1 }}
          >
            Print
          </Button>
          <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={handleClose}
            sx={{ mt: 1 }}
          >
            Cancel
          </Button>
        </Box>
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

export default PurchaseBillPrintModal;
