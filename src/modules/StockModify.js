import { ThemeProvider } from "@emotion/react";
import React, { useState } from "react";
import { customTheme } from "../utils/customTheme";
import {
  Button,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { updateCustomerDetails } from "../services/customerService";
import { NotificationManager } from "react-notifications";

const StockModify = () => {
  const [itemCode, setItemCode] = useState("");
  const [mrp, setMrp] = useState("");
  const [closingStock, setClosingStock] = useState("");

  const handleUpdateCustomer = async () => {
    const payload = { closingStock };
    try {
      const response = await updateCustomerDetails(itemCode, mrp, payload);
      if (response.status === 200) {
        NotificationManager.success("Stock updated successfully!", "Success");
      } else{
        NotificationManager.error("Error updating stock!", "Error");
      }
    } catch (error) {
      NotificationManager.error("Error updating stock!", "Error");
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Paper sx={{ p: 4, maxWidth: "800px", mx: "auto", mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Stock Modify:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Update here:</Typography>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemCode" className="input-label">
                Item Code:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="itemCode"
                className="input-field"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="mrp" className="input-label">
                MRP:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="mrp"
                className="input-field"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="closingStock" className="input-label">
                Closing Stock:
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="closingStock"
                className="input-field"
                value={closingStock}
                onChange={(e) => setClosingStock(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={8}></Grid>

          <Grid item xs={4}>
            <Button
              color="info"
              size="small"
              variant="contained"
              fullWidth
              onClick={handleUpdateCustomer}
            >
              Update
            </Button>
          </Grid>
        </Grid>

        
      </Paper>
    </ThemeProvider>
  );
};

export default StockModify;
