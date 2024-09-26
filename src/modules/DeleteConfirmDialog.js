import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, CircularProgress, Box } from "@mui/material";

const DeleteConfirmDialog = ({
  openDeleteConfirmModal,
  handleCloseDeleteConfirmModal,
  handleConfirmDelete,
  loading,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={openDeleteConfirmModal}
        onClose={handleCloseDeleteConfirmModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ position: "relative" }}>
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <DialogTitle id="alert-dialog-title">
            Do you want to delete all records?
          </DialogTitle>
          <DialogActions>
            <Button
              size="medium"
              variant="outlined"
              color="inherit"
              onClick={handleCloseDeleteConfirmModal}
              disabled={loading}
            >
              NO
            </Button>
            <Button
              size="medium"
              variant="outlined"
              color="warning"
              onClick={handleConfirmDelete}
              autoFocus
              disabled={loading}
            >
              YES
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteConfirmDialog;
