import { Box, Typography } from "@mui/material";
import React from "react";

const Utilities = () => {
  return (
    <Box sx={{ p: 2, minWidth: "900px" }}>
      <Typography variant="h5" component="div" gutterBottom>
        Utilities
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Utilities Details
      </Typography>
    </Box>
  );
};

export default Utilities;