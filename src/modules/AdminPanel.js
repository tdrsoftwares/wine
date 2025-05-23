import {
  Box,
  Button,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { customTheme } from "../utils/customTheme";
import { removeAllTransfers } from "../services/transferService";
import { NotificationManager } from "react-notifications";
import { removeAllStocks } from "../services/stockService";
import { removeAllSales } from "../services/saleBillService";
import { removeAllPurchases } from "../services/purchaseService";
import { usePermissions } from "../utils/PermissionsContext";

const AdminPanel = () => {
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [loading, setLoading] = useState(false);
  const { role } = usePermissions();

  const handleOpenDeleteConfirmModal = (type) => {
    setDeleteType(type);
    setOpenDeleteConfirmModal(true);
  };

  const handleCloseDeleteConfirmModal = () => {
    setOpenDeleteConfirmModal(false);
  };

  const handleDeleteAllStocks = () => {
    handleOpenDeleteConfirmModal("stocks");
  };

  const handleDeleteAllPurchases = () => {
    handleOpenDeleteConfirmModal("purchases");
  };

  const handleDeleteAllSales = () => {
    handleOpenDeleteConfirmModal("sales");
  };

  const handleDeleteAllTransfers = () => {
    handleOpenDeleteConfirmModal("transfers");
  };

  const handleConfirmDeleteAllStocks = async () => {
    setLoading(true);
    try {
      const response = await removeAllStocks(true);
      if (response.status === 200) {
        NotificationManager.success(
          "All opening and current stock deleted successfully.",
          "Success"
        );
      } else {
        NotificationManager.error(
          "Error deleting stocks. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting stocks. Please try again later.",
        "Error"
      );
      console.log(error);
    } finally {
      setLoading(false);
      setOpenDeleteConfirmModal(false);
    }
  };

  const handleConfirmDeleteAllPurchases = async () => {
    setLoading(true);
    try {
      const response = await removeAllPurchases(true);
      if (response.status === 200) {
        NotificationManager.success(
          "All purchases deleted successfully.",
          "Success"
        );
      } else {
        NotificationManager.error(
          "Error deleting purchases. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting purchases. Please try again later.",
        "Error"
      );
      console.log(error);
    } finally {
      setLoading(false);
      setOpenDeleteConfirmModal(false);
    }
  };

  const handleConfirmDeleteAllSales = async () => {
    setLoading(true);
    try {
      const response = await removeAllSales(true);
      if (response.status === 200) {
        NotificationManager.success(
          "All sales deleted successfully.",
          "Success"
        );
      } else {
        NotificationManager.error(
          "Error deleting Sales. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting Sales. Please try again later.",
        "Error"
      );
      console.log(error);
    } finally {
      setLoading(false);
      setOpenDeleteConfirmModal(false);
    }
  };

  const handleConfirmDeleteAllTransfers = async () => {
    setLoading(true);
    try {
      const response = await removeAllTransfers(true);
      if (response.status === 200) {
        NotificationManager.success(
          "All transfers deleted successfully.",
          "Success"
        );
      } else {
        NotificationManager.error(
          "Error deleting transfers. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting transfers. Please try again later.",
        "Error"
      );
      console.log(error);
    } finally {
      setLoading(false);
      setOpenDeleteConfirmModal(false);
    }
  };

  const handleConfirmDelete = () => {
    // setLoading(true);
    if (deleteType === "stocks") {
      handleConfirmDeleteAllStocks();
    } else if (deleteType === "sales") {
      handleConfirmDeleteAllSales();
    } else if (deleteType === "purchases") {
      handleConfirmDeleteAllPurchases();
    } else if (deleteType === "transfers") {
      handleConfirmDeleteAllTransfers();
    }
    // setLoading(false);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Paper sx={{ p: 4, maxWidth: "600px", mx: "auto", mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Admin Panel
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Delete here:</Typography>
          </Grid>
          {role === "admin" ? (
            <>
              <Grid item xs={6}>
                <Button
                  color="error"
                  size="small"
                  variant="contained"
                  onClick={() => handleOpenDeleteConfirmModal("stocks")}
                  fullWidth
                  sx={{ marginTop: 1, fontSize: "11px" }}
                >
                  DELETE ALL STOCKS
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="error"
                  size="small"
                  variant="contained"
                  onClick={() => handleOpenDeleteConfirmModal("purchases")}
                  fullWidth
                  sx={{ marginTop: 1, fontSize: "11px" }}
                >
                  DELETE ALL PURCHASES
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="error"
                  size="small"
                  variant="contained"
                  onClick={() => handleOpenDeleteConfirmModal("sales")}
                  fullWidth
                  sx={{ marginTop: 1, fontSize: "11px" }}
                >
                  DELETE ALL SALES
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="error"
                  size="small"
                  variant="contained"
                  onClick={() => handleOpenDeleteConfirmModal("transfers")}
                  fullWidth
                  sx={{ marginTop: 1, fontSize: "11px" }}
                >
                  DELETE ALL TRANSFERS
                </Button>
              </Grid>
            </>
          ) : (
            <Typography variant="body1" color="red" sx={{ margin: 2 }}>
              You do not have permission to view this data.
            </Typography>
          )}
        </Grid>

        <DeleteConfirmDialog
          openDeleteConfirmModal={openDeleteConfirmModal}
          handleCloseDeleteConfirmModal={handleCloseDeleteConfirmModal}
          handleConfirmDelete={handleConfirmDelete}
          loading={loading}
        />
      </Paper>
    </ThemeProvider>
  );
};

export default AdminPanel;
