import React from "react";
import { Box, ThemeProvider, Typography } from "@mui/material";
import { customTheme } from "../../../utils/customTheme";

const CustomItemStatusFooter = ({
  allItemStatusData,
  filterData,
  totalOpeningBalance,
  totalClosingBalance,
  totalPurchased,
  totalSold,
  totalTransferredFrom,
  totalTransferredTo,
}) => {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ padding: "12px", paddingLeft: 2, borderTop: "1px solid #e0e0e0" }}
      >
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "14px" }}>
          Total
        </Typography>
        <Typography
          variant="body1"
          sx={{ flexBasis: "15%", fontSize: "13px" }}
        ></Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {filterData.isBLTrue
            ? totalOpeningBalance?.toFixed(3)
            : totalOpeningBalance}
        </Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {filterData.isBLTrue ? totalPurchased?.toFixed(3) : totalPurchased}
        </Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {filterData.isBLTrue
            ? totalTransferredFrom?.toFixed(3)
            : totalTransferredFrom}
        </Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {filterData.isBLTrue
            ? totalTransferredTo?.toFixed(3)
            : totalTransferredTo}
        </Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {filterData.isBLTrue ? totalSold?.toFixed(3) : totalSold}
        </Typography>
        <Typography variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          {filterData.isBLTrue
            ? totalClosingBalance?.toFixed(3)
            : totalClosingBalance}
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default CustomItemStatusFooter;
