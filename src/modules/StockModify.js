import { ThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { customTheme } from "../utils/customTheme";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { updateCustomerDetails } from "../services/customerService";
import { NotificationManager } from "react-notifications";
import { getAllStores } from "../services/storeService";
import { usePermissions } from "../utils/PermissionsContext";

const StockModify = () => {
  const [itemCode, setItemCode] = useState("");
  const [mrp, setMrp] = useState("");
  const [closingStock, setClosingStock] = useState("");
  const [storeName, setStoreName] = useState("");
  const [allStores, setAllStores] = useState([]);
  const { role } = usePermissions();

  const handleUpdateCustomer = async () => {
    const payload = { closingStock };
    try {
      const response = await updateCustomerDetails(
        storeName,
        itemCode,
        mrp,
        payload
      );
      if (response.status === 200) {
        NotificationManager.success("Stock updated successfully!", "Success");
      } else {
        NotificationManager.error("Error updating stock!", "Error");
      }
    } catch (error) {
      NotificationManager.error("Error updating stock!", "Error");
    }
  };

  const fetchAllStores = async () => {
    try {
      const allStoresResponse = await getAllStores();
      // console.log("allStore response: ", allStoresResponse)

      if (allStoresResponse.status === 200) {
        setAllStores(allStoresResponse?.data?.data);
      } else {
        // NotificationManager.error("No stores found", "Error");
        setAllStores([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching stores. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    fetchAllStores();
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Paper sx={{ p: 4, maxWidth: "900px", mx: "auto", mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Stock Modify:
        </Typography>

        <Grid container spacing={2}>
          {role === "admin" ? (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Update here:</Typography>
              </Grid>

              <Grid item xs={6}>
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

              <Grid item xs={6}>
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
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!isNaN(value)) {
                        setMrp(e.target.value);
                      }
                    }}
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
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
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!isNaN(value)) {
                        setClosingStock(e.target.value);
                      }
                    }}
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="storeName" className="input-label">
                    Store Name :
                  </InputLabel>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    name="storeName"
                    className="input-field"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                          },
                        },
                      },
                    }}
                  >
                    {allStores?.map((store) => (
                      <MenuItem key={store._id} value={store._id}>
                        {store.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </Grid>

              <Grid item xs={9}></Grid>

              <Grid item xs={3}>
                <Button
                  color="info"
                  size="small"
                  variant="contained"
                  fullWidth
                  onClick={handleUpdateCustomer}
                  disabled={role !== "admin"}
                >
                  Update
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" color="red" sx={{ marginTop: 2 }}>
                You do not have permission to view this data.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default StockModify;
