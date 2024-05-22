// src/CreateCompanyModal.js
import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { NotificationManager } from "react-notifications";
import { createCompany } from "../../../services/companyService";

const CreateCompanyModal = ({ isOpen, handleClose, fetchAllCompanies }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");

  const handleCreateCompany = async () => {
    console.log("Creating company:", { companyName, companyType });
    const payload = {
      name: companyName,
      type: companyType,
    };
    try {
      const createCompanyResponse = await createCompany(payload);
      if (createCompanyResponse.status === 200) {
        NotificationManager.success("Company created successfully", "Success");
        console.log("Company created successfully:", createCompanyResponse);
        setCompanyName("");
        setCompanyType("");
        fetchAllCompanies();
        handleClose();
      } else {
        NotificationManager.error(
          "Error creating company. Please try again later.",
          "Error"
        );
        console.error("Error creating company:", createCompanyResponse);
      }
    } catch (error) {
      NotificationManager.error(
        "Error creating company. Please try again later.",
        "Error"
      );
      console.error("Error creating company:", error);
    }
  };

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
