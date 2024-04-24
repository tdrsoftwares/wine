import React from "react";
import {
  Typography,
  Grid,
  TextField,
  Modal,
  Box,
  Button,
} from "@mui/material";

const PurchaseDetailsModal = ({ open, handleClose, rowData }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1200,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          sx={{ marginBottom: 3 }}
        >
          Purchase Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Bill Date:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.billDate}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Bill No:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.billNo}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Discount Amount:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.discountAmount}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Entry No:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.entryNo}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Govt. Round Off:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.govtROff}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Gross Amount:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.grossAmount}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">MRP Value:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.mrpValue}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Net Amount:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.netAmount}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Pass Date:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.passDate}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Pass No:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.passNo}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Service Tax Amount:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.sTaxAmount}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Special Purposes:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.specialPurpose}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Supplier Name:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.supplierName}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <Typography variant="body1" className="input-label">Tcs Amount:</Typography>
              <TextField
                fullWidth
                size="small"
                className="input-field"
                disabled
                value={rowData?.tcsAmount}
              />
            </div>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 2,
          }}
        >
          {/* <Button
            color="primary"
            size="medium"
            variant="contained"
            onClick={handleCreateItem}
            sx={{ borderRadius: 8 }}
          >
            Create
          </Button> */}
          <Button
            color="warning"
            size="medium"
            variant="outlined"
            onClick={handleClose}
            sx={{ borderRadius: 8, marginLeft: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PurchaseDetailsModal;
