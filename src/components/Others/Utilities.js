import { Box, Typography } from "@mui/material";
import React from "react";

const Utilities = () => {
  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="h5" component="div" gutterBottom>
        Utilities
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Utilities Details
      </Typography>
    </Box>
  );
};

export default Utilities;