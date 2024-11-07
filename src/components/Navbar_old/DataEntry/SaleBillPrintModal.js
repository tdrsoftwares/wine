import React, { forwardRef } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { toWords } from "number-to-words";

const SaleBillPrintModal = forwardRef(
  (
    {
      salesData,
      formData,
      totalValues,
      licenseDetails,
      billNumber,
      isSplitPrinted,
      printData,
      printTotalValues,
    },
    ref
  ) => {

    // console.log("bill number: ", billNumber);
    // console.log("formdata: ", formData);
  
    const dataToPrint = isSplitPrinted ? printData : salesData;
    const valuesToPrint = isSplitPrinted ? printTotalValues : totalValues;
  
    const { totalVolume, totalPcs, grossAmt, splDiscAmount, netAmt } = valuesToPrint;

    const amountInWords = (amount) => {
      if (isNaN(amount) || amount === undefined || amount === null) {
        return "Zero Only";
      }
      return toWords(amount) + " Only";
    };

    const saleBillData = {
      customer: formData?.customerName?.name,
      billNo: billNumber,
      discount: parseFloat(splDiscAmount),
      adjustment: parseFloat(valuesToPrint?.adjustment),
      date: new Date(formData?.billDate).toLocaleDateString(),
      time: new Date(formData?.billDate).toLocaleTimeString(),
      items: dataToPrint || [],
      totalQty: totalPcs,
      grossAmt: parseFloat(grossAmt),
      totalBL: parseFloat(totalVolume),
      netAmount: parseFloat(netAmt),
      amountInWords: amountInWords(parseFloat(netAmt)),
    };

    return (
      <Box sx={printModalStyles}>
        <Box ref={ref} sx={{ p: 1, width: "80mm" }}>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{ fontSize: "12px", fontWeight: "bold", mb: 1 }}
          >
            CASH MEMO
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
            variant="h2"
            component="h1"
            align="center"
            sx={{ fontSize: "12px" }}
          >
            License ID: {licenseDetails?.eposUserId}
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
            {licenseDetails?.district || ""}
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
              {saleBillData.customer ? `Customer: ${saleBillData.customer}` : ""}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              *{saleBillData.billNo || ""}*
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
              {saleBillData.billNo ? `Bill No.: ${saleBillData.billNo}` : ""}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "11px" }}></Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "10px" }}>
              {saleBillData.date ? `Date: ${saleBillData.date}` : ""}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "10px" }}>
              {saleBillData.time ? `Time: ${saleBillData.time}` : ""}
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
          {saleBillData.items?.map((item, index) => (
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              Total Qty: {saleBillData.totalQty}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              Gross Amt: {saleBillData.grossAmt?.toFixed(2)}
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
              {saleBillData.adjustment
                ? `Adjustment: ${saleBillData.adjustment}`
                : ""}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              {saleBillData.discount
                ? `Total Discount: ${saleBillData.discount}`
                : ""}
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
              Total BL: {saleBillData.totalBL}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              Net Amount: {saleBillData.netAmount?.toFixed(2)}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            align="center"
            sx={{ fontSize: "10px" }}
          >
            Rs.: {saleBillData.amountInWords}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography
            variant="body1"
            align="center"
            sx={{ fontSize: "10px" }}
          >
            {licenseDetails?.billMessages}
          </Typography>
        </Box>
      </Box>
    );
  }
);

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
  display: 'none'
};

export default SaleBillPrintModal;
