import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import * as React from "react";

const EposReportModal = ({
  isLoading,
  setIsLoading,
  openResponseModal,
  handleCloseModal,
  handleResend,
  successItems,
  failedItems,
}) => {
  // console.log("successItems: " , successItems);
  // console.log("failedItems: " , failedItems);

  return (
    <Dialog
      open={openResponseModal}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>EPOS Processing Results</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Successful Items:
        </Typography>
        <Box
          maxHeight="300px"
          overflow="auto"
          border={1}
          borderRadius="4px"
          borderColor="grey.300"
          mb={2}
          p={1}
        >
          {successItems.length > 0 ? (
            <List>
              {successItems.map((item, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`Licensee Id No: ${item.licenseeIdNo}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          GTIN: {item.gtin}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Pack Size: {item.packSize}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          MRP: {item.mrp}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Quantity: {item.quantity}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No successful items.</Typography>
          )}
        </Box>
        <Typography variant="h6" gutterBottom>
          Failed Items:
        </Typography>
        <Box
          maxHeight="300px"
          overflow="auto"
          border={1}
          borderRadius="4px"
          borderColor="grey.300"
          p={1}
        >
          {failedItems.length > 0 ? (
            <List>
              {failedItems.map((failedItem, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`Licensee Id No: ${failedItem.item.licenseeIdNo}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          GTIN: {failedItem.item.gtin}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Pack Size: {failedItem.item.packSize}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          MRP: {failedItem.item.mrp}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Quantity: {failedItem.item.quantity}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="error"
                        >
                          Error: {failedItem.errorMessage}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No failed items.</Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Close
        </Button>
        <Button onClick={handleResend} color="secondary" disabled={isLoading || failedItems.length === 0}>
          {isLoading ? <CircularProgress size={24} /> : "Resend"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EposReportModal;
