import React from "react";
import { Box, ThemeProvider, Typography } from "@mui/material";
import { customTheme } from "../../../utils/customTheme";

const CustomFooter = ({ allItemStatusData }) => {
  const totalOpeningBalance = allItemStatusData?.reduce(
    (sum, row) => sum + row.openingBalance,
    0
  );
  const totalPurchased = allItemStatusData?.reduce(
    (sum, row) => sum + row.totalPurchased,
    0
  );
  const totalSold = allItemStatusData?.reduce(
    (sum, row) => sum + row.totalSold,
    0
  );
  const totalTransferredFrom = allItemStatusData?.reduce(
    (sum, row) => sum + row.totalTransferredFrom,
    0
  );
  const totalTransferredTo = allItemStatusData?.reduce(
    (sum, row) => sum + row.totalTransferredTo,
    0
  );
  const totalClosingBalance = allItemStatusData?.reduce(
    (sum, row) => sum + row.closingBalance,
    0
  );

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ padding: "12px", paddingLeft: 4, borderTop: "1px solid #e0e0e0" }}
      >
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "14px" }}>
          Total
        </Typography>
        <Typography
          variant="body1"
          sx={{ flexBasis: "15%", fontSize: "13px" }}
        ></Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {totalOpeningBalance}
        </Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {totalPurchased}
        </Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {totalTransferredFrom}
        </Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {totalTransferredTo}
        </Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {totalSold}
        </Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {totalClosingBalance}
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default CustomFooter;
