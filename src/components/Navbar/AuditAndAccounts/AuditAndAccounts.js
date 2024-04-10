import { Box, Typography } from "@mui/material";
import React from "react";

const AuditAndAccounts = () => {
  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="h5" component="div" gutterBottom>
        Audit and Accounts
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Audit and Accounts Details
      </Typography>
    </Box>
  );
};

export default AuditAndAccounts;