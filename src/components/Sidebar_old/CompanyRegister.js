// CompanyRegister.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { NotificationManager } from "react-notifications";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  updateCompany,
} from "../../services/companyService";
import { customTheme } from "../../utils/customTheme";

const CompanyRegister = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);
  const [existingCompanyUpdate, setExistingCompanyUpdate] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyType, setNewCompanyType] = useState("");
  const [existingCompanyDelete, setExistingCompanyDelete] = useState("");

  console.log("allCompanies: ", allCompanies);
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
      const createCompanyResponse = await createCompany(payload);
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
      type: newCompanyType,
    };
    try {
      const updateCompanyResponse = await updateCompany(
        payload,
        existingCompanyUpdate
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

  const handleUpdateCompanyChange = (e) => {
    setExistingCompanyUpdate(e.target.value);
    const selectedCompany = allCompanies.find(
      (company) => company._id === e.target.value
    );
    console.log("selectedCompany ---> ", selectedCompany);
    setNewCompanyName(selectedCompany.name);
    setNewCompanyType(selectedCompany.type);
  };

  const handleDeleteCompany = async () => {
    try {
      const deleteCompanyResponse = await deleteCompany(existingCompanyDelete);
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
      const allCompaniesResponse = await getAllCompanies();
      // console.log("allCompaniesResponse ---> ", allCompaniesResponse);
      if (allCompaniesResponse.status === 200) {
        setAllCompanies(allCompaniesResponse?.data?.data);
      } else {
        NotificationManager.error("No companies found." , "Error");
        setAllCompanies([]);

      }
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
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
          Create Company:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="companyName" className="input-label">
                Name :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="companyType" className="input-label">
                Type :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="companyType"
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
              >
                <MenuItem value="Manufacturers">Manufacturers</MenuItem>
                <MenuItem value="Traders">Traders</MenuItem>
                <MenuItem value="Dealers">Dealers</MenuItem>
                <MenuItem value="Distribution">Distribution</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="warning"
                size="small"
                variant="outlined"
                sx={{
                  marginRight: 1,
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
                onClick={clearForm}
              >
                Clear
              </Button>
              <Button
                color="primary"
                size="small"
                variant="contained"
                sx={{
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
                onClick={handleCreateCompany}
              >
                Create
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="subtitle2" sx={{ marginBottom: 1, marginTop: 4 }}>
          Update Company:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="indexNo" className="input-label">
                Company :
              </InputLabel>
              <TextField
                select
                fullWidth
                name="existingCompanyUpdate"
                size="small"
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
                onChange={(e) => handleUpdateCompanyChange(e)}
              >
                {allCompanies?.map((company) => (
                  <MenuItem key={company._id} value={company._id}>
                    {company.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            {existingCompanyUpdate && (
              <div className="input-wrapper">
                <InputLabel htmlFor="newCompanyName" className="input-label">
                  Name :
                </InputLabel>
                <TextField
                  fullWidth
                  type="text"
                  name="newCompanyName"
                  size="small"
                  value={newCompanyName}
                  variant="outlined"
                  onChange={(e) => setNewCompanyName(e.target.value)}
                />
              </div>
            )}
          </Grid>
          <Grid item xs={3}>
            {existingCompanyUpdate && (
              <div className="input-wrapper">
                <InputLabel htmlFor="newCompanyType" className="input-label">
                  Type :
                </InputLabel>
                <TextField
                  fullWidth
                  type="text"
                  size="small"
                  name="newCompanyType"
                  value={newCompanyType}
                  variant="outlined"
                  onChange={(e) => setNewCompanyType(e.target.value)}
                />
              </div>
            )}
          </Grid>

          <Grid item xs={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="warning"
                size="medium"
                variant="outlined"
                sx={{
                  marginRight: 1,
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
                onClick={() => {
                  setExistingCompanyUpdate("");
                  setNewCompanyName("");
                }}
              >
                Clear
              </Button>
              <Button
                color="info"
                size="medium"
                variant="contained"
                onClick={handleUpdateCompany}
                sx={{
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
              >
                Change
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="subtitle2" sx={{ marginBottom: 1, marginTop: 2 }}>
          Delete Company
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="existingCompanyDelete"
                className="input-label"
              >
                Company :
              </InputLabel>
              <TextField
                select
                fullWidth
                name="existingCompanyDelete"
                value={existingCompanyDelete}
                size="small"
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
            </div>
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="warning"
                size="medium"
                variant="outlined"
                sx={{
                  marginRight: 1,
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
                onClick={() => setExistingCompanyDelete("")}
              >
                Clear
              </Button>
              <Button
                color="error"
                size="small"
                variant="contained"
                sx={{
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
                onClick={handleDeleteCompany}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default CompanyRegister;
