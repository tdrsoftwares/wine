import { Box, Typography } from "@mui/material";
import React from "react";

const ExciseReport = () => {
  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="h5" component="div" gutterBottom>
        Excise Report
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Excise Report Details
      </Typography>
    </Box>
  );
};

export default ExciseReport;