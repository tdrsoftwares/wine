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
  createBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
} from "../../services/brandService";
import { useLoginContext } from "../../utils/loginContext";

const BrandRegister = () => {
  const { loginResponse } = useLoginContext();
  const [brandName, setBrandName] = useState("");
  const [type, setType] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [allBrands, setAllBrands] = useState([]);
  const [existingBrandUpdate, setExistingBrandUpdate] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandType, setNewBrandType] = useState("");
  const [newIndexNo, setNewIndexNo] = useState("");
  const [existingBrandDelete, setExistingBrandDelete] = useState("");

  const clearForm = () => {
    setBrandName("");
    setType("");
    setIndexNo("");
  };

  const handleCreateBrand = async () => {
    const payload = {
      name: brandName,
      type: type,
      indexNo: indexNo,
    };
    try {
      const createBrandResponse = await createBrand(payload, loginResponse);
      if (createBrandResponse.status === 200) {
        NotificationManager.success("Brand created successfully", "Success");
        // console.log("Brand created successfully:", createBrandResponse);
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

  const handleUpdateBrand = async () => {
    const payload = {
      name: newBrandName,
      type: newBrandType,
      indexNo: newIndexNo
    };
    try {
      const updateBrandResponse = await updateBrand(
        payload,
        existingBrandUpdate,
        loginResponse
      );
      if (updateBrandResponse.status === 200) {
        NotificationManager.success("Brand updated successfully", "Success");
        // console.log("Brand updated successfully:", updateBrandResponse);
        setExistingBrandUpdate("");
        setNewBrandName("");
        setNewBrandType("");
        setIndexNo("");
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

  const handleBrandUpdateChange = (e) => {
    setExistingBrandUpdate(e.target.value);
    const selectedBrand = allBrands.find(brand => brand._id === e.target.value);

    setNewBrandName(selectedBrand.name);
    setNewBrandType(selectedBrand.type);
    setNewIndexNo(selectedBrand.indexNo);
  }

  const handleDeleteBrand = async () => {
    try {
      const deleteBrandResponse = await deleteBrand(
        existingBrandDelete,
        loginResponse
      );
      if (deleteBrandResponse.status === 200) {
        NotificationManager.success("Brand deleted successfully", "Success");
        // console.log("Brand deleted successfully:", deleteBrandResponse);
        setExistingBrandDelete("");
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
      // console.log("allBrandsResponse ---> ", allBrandsResponse);
      setAllBrands(allBrandsResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchAllBrands();
  }, []);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Brand Information
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Brand Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="text"
              name="brandName"
              label="Name of Brand"
              variant="outlined"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="type"
              label="Type"
              variant="outlined"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Type1">Type1</MenuItem>
              <MenuItem value="Type2">Type2</MenuItem>
              <MenuItem value="Type3">Type3</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              type="number"
              name="indexNo"
              label="Index Number"
              variant="outlined"
              value={indexNo}
              onChange={(e) => setIndexNo(e.target.value)}
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
              onClick={handleCreateBrand}
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
          Update Brand
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={2.4}>
            <TextField
              select
              fullWidth
              name="existingBrandUpdate"
              label="Existing Brand"
              value={existingBrandUpdate}
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
              onChange={(e) => handleBrandUpdateChange(e)}
            >
              {allBrands?.map((brand) => (
                <MenuItem key={brand._id} value={brand._id}>
                  {brand.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {existingBrandUpdate && (
            <>
              <Grid item xs={2.4}>
                <TextField
                  fullWidth
                  type="text"
                  name="newBrandName"
                  label="Brand Name"
                  value={newBrandName}
                  variant="outlined"
                  onChange={(e) => setNewBrandName(e.target.value)}
                />
              </Grid>
              <Grid item xs={2.4}>
                <TextField
                  fullWidth
                  name="newBrandType"
                  label="Brand Type"
                  value={newBrandType}
                  variant="outlined"
                  onChange={(e) => setNewBrandType(e.target.value)}
                />
              </Grid>
              <Grid item xs={2.4}>
                <TextField
                  fullWidth
                  type="number"
                  name="newIndexNo"
                  label="Index No."
                  value={newIndexNo}
                  variant="outlined"
                  onChange={(e) => setNewIndexNo(e.target.value)}
                />
              </Grid>
            </>
          )}
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
              onClick={handleUpdateBrand}
            >
              Change
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => {
                setExistingBrandUpdate("");
                setNewBrandName("");
                setNewBrandType("");
                setIndexNo("");
              }}
            >
              Clear
            </Button>
          </Box>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
          Delete Brand
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="existingBrandDelete"
              label="Existing Brand"
              value={existingBrandDelete}
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
              onChange={(e) => setExistingBrandDelete(e.target.value)}
            >
              {allBrands?.map((brand) => (
                <MenuItem key={brand._id} value={brand._id}>
                  {brand.name}
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
              onClick={handleDeleteBrand}
            >
              Delete
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => setExistingBrandDelete("")}
            >
              Clear
            </Button>
          </Box>
        </Grid>
      </Box>
    </form>
  );
};

export default BrandRegister;
