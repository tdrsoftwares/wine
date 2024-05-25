import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const CreateCompanyModal = ({
  isOpen,
  handleClose,
  companyName,
  setCompanyName,
  companyType,
  setCompanyType,
  handleCreateCompany,
}) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalStyles}>
        <Typography variant="h6" component="h2" align="center" mb={3}>
          Create Company
        </Typography>
        <TextField
          fullWidth
          size="small"
          type="text"
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          required
        />
        <TextField
          select
          fullWidth
          size="small"
          type="text"
          label="Company Type"
          value={companyType}
          onChange={(e) => setCompanyType(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          required
        >
          {["Manufacturers", "Traders", "Dealers", "Distribution"].map(
            (item, key) => (
              <MenuItem key={key} value={item}>
                {item}
              </MenuItem>
            )
          )}
        </TextField>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateCompany}
          >
            Create
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={(e) => {
              handleClose();
              setCompanyName("");
              setCompanyType("");
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default CreateCompanyModal;
