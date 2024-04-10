// CompanyRegister.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { NotificationManager } from "react-notifications";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  updateCompany,
} from "../../services/companyService";
import { useLoginContext } from "../../utils/loginContext";

const CompanyRegister = () => {
  const { loginResponse } = useLoginContext();
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);
  const [existingCompanyUpdate, setExistingCompanyUpdate] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [existingCompanyDelete, setExistingCompanyDelete] = useState("");

  const clearForm = () => {
    setCompanyName("");
    setCompanyType("");
  };

  const handleCreateCompany = async () => {
    const payload = {
      name: companyName,
      type: companyType,
    };
    try {
      const createCompanyResponse = await createCompany(payload, loginResponse);
      if (createCompanyResponse.status === 200) {
        NotificationManager.success("Company created successfully", "Success");
        console.log("Company created successfully:", createCompanyResponse);
        clearForm();
        fetchAllCompanies();
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

  const handleUpdateCompany = async () => {
    const payload = {
      name: newCompanyName,
    };
    try {
      const updateCompanyResponse = await updateCompany(
        payload,
        existingCompanyUpdate,
        loginResponse
      );
      if (updateCompanyResponse.status === 200) {
        NotificationManager.success("Company updated successfully", "Success");
        console.log("Company updated successfully:", updateCompanyResponse);
        setExistingCompanyUpdate("");
        setNewCompanyName("");
        fetchAllCompanies();
      } else {
        NotificationManager.error(
          "Error updating company. Please try again later.",
          "Error"
        );
        console.error("Error updating company:", updateCompanyResponse);
      }
    } catch (error) {
      NotificationManager.error(
        "Error updating company. Please try again later.",
        "Error"
      );
      console.error("Error updating company:", error);
    }
  };

  const handleDeleteCompany = async () => {
    try {
      const deleteCompanyResponse = await deleteCompany(
        existingCompanyDelete,
        loginResponse
      );
      if (deleteCompanyResponse.status === 200) {
        NotificationManager.success("Company deleted successfully", "Success");
        console.log("Company deleted successfully:", deleteCompanyResponse);
        setExistingCompanyDelete("");
        fetchAllCompanies();
      } else {
        NotificationManager.error(
          "Error deleting company. Please try again later.",
          "Error"
        );
        console.error("Error deleting company:", deleteCompanyResponse);
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting company. Please try again later.",
        "Error"
      );
      console.error("Error deleting company:", error);
    }
  };

  const fetchAllCompanies = async () => {
    try {
      const allCompaniesResponse = await getAllCompanies(loginResponse);
      console.log("allCompaniesResponse ---> ", allCompaniesResponse);
      setAllCompanies(allCompaniesResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching companies. Please try again later.",
        "Error"
      );
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Company Information
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Company Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="text"
              name="companyName"
              label="Name of Company"
              variant="outlined"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="companyType"
              label="Type"
              variant="outlined"
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
            >
              <MenuItem value="Type1">Type1</MenuItem>
              <MenuItem value="Type2">Type2</MenuItem>
              <MenuItem value="Type3">Type3</MenuItem>
            </TextField>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              "& button": { marginTop: 2, marginLeft: 2 },
            }}
          >
            <Button
              color="primary"
              size="large"
              variant="outlined"
              onClick={handleCreateCompany}
            >
              Create
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={clearForm}
            >
              Clear
            </Button>
          </Box>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
          Update Company
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="existingCompanyUpdate"
              label="Existing Company"
              value={existingCompanyUpdate}
              variant="outlined"
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
              onChange={(e) => setExistingCompanyUpdate(e.target.value)}
            >
              {allCompanies?.map((company) => (
                <MenuItem key={company._id} value={company._id}>
                  {company.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              type="text"
              name="newCompanyName"
              label="New Company Name"
              value={newCompanyName}
              variant="outlined"
              onChange={(e) => setNewCompanyName(e.target.value)}
            />
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              "& button": { marginTop: 2, marginLeft: 2 },
            }}
          >
            <Button
              color="primary"
              size="large"
              variant="outlined"
              onClick={handleUpdateCompany}
            >
              Change
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => {
                setExistingCompanyUpdate("");
                setNewCompanyName("");
              }}
            >
              Clear
            </Button>
          </Box>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
          Delete Company
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="existingCompanyDelete"
              label="Existing Company"
              value={existingCompanyDelete}
              variant="outlined"
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
              onChange={(e) => setExistingCompanyDelete(e.target.value)}
            >
              {allCompanies?.map((company) => (
                <MenuItem key={company._id} value={company._id}>
                  {company.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              "& button": { marginTop: 2, marginLeft: 2 },
            }}
          >
            <Button
              color="primary"
              size="large"
              variant="outlined"
              onClick={handleDeleteCompany}
            >
              Delete
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => setExistingCompanyDelete("")}
            >
              Clear
            </Button>
          </Box>
        </Grid>
      </Box>
    </form>
  );
};

export default CompanyRegister;
