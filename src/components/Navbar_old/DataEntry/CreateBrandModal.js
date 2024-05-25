// src/CreateBrandModal.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { getAllCompanies } from "../../../services/companyService";
import { NotificationManager } from "react-notifications";
import { createBrand } from "../../../services/brandService";

const CreateBrandModal = ({
  isOpen,
  handleClose,
  brandName,
  setBrandName,
  companyName,
  setCompanyName,
  type,
  setType,
  indexNumber,
  setIndexNumber,
  allCompanies,
  handleCreateBrand,
}) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalStyles}>
        <Typography variant="h6" component="h2" align="center" mb={3}>
          Create Brand
        </Typography>
        <TextField
          fullWidth
          size="small"
          type="text"
          label="Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          required
        />
        <TextField
          select
          fullWidth
          size="small"
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          required
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
          {allCompanies?.map((company) => (
            <MenuItem key={company._id} value={company._id}>
              {company.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          size="small"
          type="text"
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          required
        >
          {["FL", "BEER", "IML"].map((company, id) => (
            <MenuItem key={id} value={company}>
              {company}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          size="small"
          type="number"
          label="Index Number"
          value={indexNumber}
          onChange={(e) => setIndexNumber(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          required
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateBrand}
          >
            Create
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              handleClose();
              setBrandName("");
              setCompanyName("");
              setType("");
              setIndexNumber("");
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

export default CreateBrandModal;
