import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { NotificationManager } from "react-notifications";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
} from "../../services/brandService";
import { useLoginContext } from "../../utils/loginContext";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { getAllCompanies } from "../../services/companyService";

const BrandRegister = () => {
  const { loginResponse } = useLoginContext();
  const [brandName, setBrandName] = useState("");
  const [type, setType] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [allBrands, setAllBrands] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const tableRef = useRef(null);

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditableIndex(null);
      setEditedRow({});
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearForm = () => {
    setBrandName("");
    setType("");
    setIndexNo("");
  };

  const handleCreateBrand = async () => {
    const payload = {
      name: brandName,
      companyName: companyName,
      type: type,
      indexNo: indexNo,
    };
    try {
      const createBrandResponse = await createBrand(payload, loginResponse);
      if (createBrandResponse.status === 200) {
        NotificationManager.success("Brand created successfully", "Success");
        clearForm();
        fetchAllBrands();
      } else {
        NotificationManager.error(
          "Error creating brand. Please try again later.",
          "Error"
        );
        console.error("Error creating brand:", createBrandResponse);
      }
    } catch (error) {
      NotificationManager.error(
        "Error creating brand. Please try again later.",
        "Error"
      );
      console.error("Error creating brand:", error);
    }
  };

  const handleUpdateBrand = async (brandId) => {
    const payload = {
      name: editedRow.name,
      type: editedRow.type,
      indexNo: editedRow.indexNo,
    };
    try {
      const updateBrandResponse = await updateBrand(
        payload,
        brandId,
        loginResponse
      );
      if (updateBrandResponse.status === 200) {
        NotificationManager.success("Brand updated successfully", "Success");
        setEditableIndex(null);
        setEditedRow({});
        fetchAllBrands();
      } else {
        NotificationManager.error(
          "Error updating brand. Please try again later.",
          "Error"
        );
        console.error("Error updating brand:", updateBrandResponse);
      }
    } catch (error) {
      NotificationManager.error(
        "Error updating brand. Please try again later.",
        "Error"
      );
      console.error("Error updating brand:", error);
    }
  };

  const handleDeleteBrand = async (brandId) => {
    try {
      const deleteBrandResponse = await deleteBrand(brandId, loginResponse);
      if (deleteBrandResponse.status === 200) {
        NotificationManager.success("Brand deleted successfully", "Success");
        fetchAllBrands();
      } else {
        NotificationManager.error(
          "Error deleting brand. Please try again later.",
          "Error"
        );
        console.error("Error deleting brand:", deleteBrandResponse);
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting brand. Please try again later.",
        "Error"
      );
      console.error("Error deleting brand:", error);
    }
  };

  const fetchAllBrands = async () => {
    try {
      const allBrandsResponse = await getAllBrands(loginResponse);
      setAllBrands(allBrandsResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      console.error("Error fetching brands:", error);
    }
  };

  const fetchAllCompanies = async () => {
    try {
      const allCompaniesResponse = await getAllCompanies(loginResponse);
      // console.log("allCompaniesResponse ---> ", allCompaniesResponse);
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
    fetchAllBrands();
    fetchAllCompanies();
  }, []);

  const handleEditClick = (index, brandId) => {
    setEditableIndex(index);
    const selectedBrand = allBrands.find((brand) => brand._id === brandId);
    setEditedRow(selectedBrand);
  };

  const handleSaveClick = (brandId) => {
    handleUpdateBrand(brandId);
  };

  const handleRemoveBrand = (brandId) => {
    handleDeleteBrand(brandId);
  };

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
        Create Brand:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="brandName" className="input-label">
              Brand Name:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="brandName"
              className="input-field"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="companyName" className="input-label">
              Company Name:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="companyName"
              className="input-field"
              value={companyName}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
              onChange={(e) => setCompanyName(e.target.value)}
            >
              {allCompanies?.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="type" className="input-label">
              Type:
            </InputLabel>
            <TextField
              select
              fullWidth
              size="small"
              name="type"
              className="input-field"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="FL">FL</MenuItem>
              <MenuItem value="BEER">BEER</MenuItem>
              <MenuItem value="IML">IML</MenuItem>
            </TextField>
          </div>
        </Grid>

        

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="indexNo" className="input-label">
              Index Number:
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              type="number"
              name="indexNo"
              className="input-field"
              value={indexNo}
              onChange={(e) => setIndexNo(e.target.value)}
            />
          </div>
        </Grid>
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
          size="medium"
          variant="contained"
          onClick={handleCreateBrand}
          sx={{ borderRadius: 8 }}
        >
          Create
        </Button>
        <Button
          color="warning"
          size="medium"
          variant="outlined"
          onClick={clearForm}
          sx={{ borderRadius: 8 }}
        >
          Clear
        </Button>
      </Box>

      <Box sx={{ boxShadow: 2, borderRadius: 1, marginTop: 2 }}>
        <TableContainer
          ref={tableRef}
          component={Paper}
          sx={{
            height: 300,
            width: "100%",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: 10,
              height: 10,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#fff",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d5d8df",
              borderRadius: 2,
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">S. No.</TableCell>
                <TableCell align="center">Brand Name</TableCell>
                <TableCell align="center">Company Name</TableCell>
                <TableCell align="center">Brand Type</TableCell>
                <TableCell align="center">Index No.</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allBrands ? (
                allBrands.map((brand, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.name}
                          onChange={(e) =>
                            setEditedRow({ ...editedRow, name: e.target.value })
                          }
                        />
                      ) : (
                        brand.name
                      )}
                    </TableCell>

                    <TableCell align="center">
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.companyName}
                          onChange={(e) =>
                            setEditedRow({ ...editedRow, companyName: e.target.value })
                          }
                        />
                      ) : (
                        brand.companyName
                      )}
                    </TableCell>

                    <TableCell align="center">
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.type}
                          onChange={(e) =>
                            setEditedRow({ ...editedRow, type: e.target.value })
                          }
                        />
                      ) : (
                        <span>{brand.type}</span>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      {editableIndex === index ? (
                        <Input
                          value={editedRow.indexNo}
                          onChange={(e) =>
                            setEditedRow({
                              ...editedRow,
                              indexNo: e.target.value,
                            })
                          }
                        />
                      ) : (
                        brand.indexNo
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editableIndex !== index ? (
                        <EditIcon
                          sx={{ cursor: "pointer", color: "blue" }}
                          onClick={() => handleEditClick(index, brand._id)}
                        />
                      ) : (
                        <SaveIcon
                          sx={{ cursor: "pointer", color: "green" }}
                          onClick={() => handleSaveClick(brand._id)}
                        />
                      )}
                      <CloseIcon
                        sx={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleRemoveBrand(brand._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow
                  sx={{
                    backgroundColor: "#fff",
                  }}
                >
                  <TableCell colSpan={5} align="center">
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default BrandRegister;
