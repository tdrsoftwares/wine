import { Box, Typography } from "@mui/material";
import React from "react";

const InventoryReport = () => {
  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="h5" component="div" gutterBottom>
        Inventory Report
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Inventory Report Details
      </Typography>
    </Box>
  );
};

export default InventoryReport;
