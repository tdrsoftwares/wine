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

const EposResponseModal = ({
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
      <DialogTitle>File Processing Results</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Successful Items:
        </Typography>
        <Box
          maxHeight="300px"
          overflowY="auto"
          borderWidth="1px"
          borderRadius="md"
          border={1}
          borderColor="grey.300"
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
        <Typography variant="h6" gutterBottom mt={4}>
          Failed Items:
        </Typography>
        <Box
          maxHeight="300px"
          overflowY="auto"
          borderWidth="1px"
          borderRadius="md"
          border={1}
          borderColor="grey.300"
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
                          color="red"
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
        <Button onClick={handleResend} color="secondary">
          {isLoading ? <CircularProgress size={24} /> : "Resend"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EposResponseModal;
