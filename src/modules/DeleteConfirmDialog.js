import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const DeleteConfirmDialog = ({
  openDeleteConfirmModal,
  handleCloseDeleteConfirmModal,
  handleConfirmDeleteAll,
}) => {
  
  return (
    <React.Fragment>
      <Dialog
        open={openDeleteConfirmModal}
        onClose={handleCloseDeleteConfirmModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to delete all records?
        </DialogTitle>
        <DialogActions>
          <Button
            size="medium"
            variant="outlined"
            color="inherit"
            onClick={handleCloseDeleteConfirmModal}
          >
            NO
          </Button>
          <Button
            size="medium"
            variant="outlined"
            color="warning"
            onClick={() => {
              handleConfirmDeleteAll();
            }}
            autoFocus
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteConfirmDialog;
