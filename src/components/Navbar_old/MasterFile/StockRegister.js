import React, { useState, useEffect } from "react";
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
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "../../../services/itemService";
import { useLoginContext } from "../../../utils/loginContext";
import { getAllItemCategory } from "../../../services/categoryService";
import { getAllBrands } from "../../../services/brandService";
import { getAllCompanies } from "../../../services/companyService";

const ItemRegister = () => {
  const { loginResponse } = useLoginContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [allBrands, setAllBrands] = useState([]);
  const [volume, setVolume] = useState("");
  const [group, setGroup] = useState("");
  const [caseValue, setCaseValue] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [existingItemUpdate, setExistingItemUpdate] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [existingItemDelete, setExistingItemDelete] = useState("");

  const [newFormData, setNewFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    subCategory: "",
    companyId: "",
    brandId: "",
    group: "",
    volume: "",
    caseValue: "",
  });

  const clearForm = () => {
    setName("");
    setDescription("");
    setCategoryId("");
    setSubCategory("");
    setCompanyId("");
    setBrandId("");
    setVolume("");
    setGroup("");
    setCaseValue("");
  };

  const handleCreateItem = async () => {
    const mandatoryFields = [
      name,
      description,
      categoryId,
      subCategory,
      companyId,
      brandId,
      group,
      volume,
      caseValue,
    ];
    if (mandatoryFields.some((field) => !field)) {
      NotificationManager.warning("Please fill in all fields.", "Error");
      return;
    }

    const payload = {
      name,
      description,
      categoryId,
      subCategory,
      companyId,
      brandId,
      group,
      volume,
      caseValue,
    };

    try {
      const createItemResponse = await createItem(payload, loginResponse);
      if (createItemResponse.status === 200) {
        NotificationManager.success("Item created successfully", "Success");
        clearForm();
        fetchAllItems();
      } else {
        NotificationManager.error(
          "Error creating item. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error creating item. Please try again later.",
        "Error"
      );
    }
  };

  const handleUpdateItem = async () => {
    if (!newFormData.name) {
      NotificationManager.warning("Please fill New Item Name.", "Error");
      return;
    }

    const payload = {
      name: newFormData.name,
      description: newFormData.description,
      categoryId: newFormData.categoryId,
      subCategory: newFormData.subCategory,
      companyId: newFormData.companyId,
      brandId: newFormData.brandId,
      group: newFormData.group,
      volume: newFormData.volume,
      caseValue: newFormData.caseValue,
    };

    try {
      const updateItemResponse = await updateItem(
        payload,
        existingItemUpdate,
        loginResponse
      );
      if (updateItemResponse.status === 200) {
        NotificationManager.success("Item updated successfully", "Success");
        setExistingItemUpdate("");
        setNewFormData({})
        fetchAllItems();
      } else {
        NotificationManager.error(
          "Error updating item. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error updating item. Please try again later.",
        "Error"
      );
    }
  };

  const handleUpdateChange = (e) => {
    setExistingItemUpdate(e.target.value);
    const selectedItem = allItems.find((item) => item._id === e.target.value);
    setNewFormData(selectedItem);
  };

  const handleDeleteItem = async () => {
    try {
      const deleteItemResponse = await deleteItem(
        existingItemDelete,
        loginResponse
      );
      if (deleteItemResponse.status === 200) {
        NotificationManager.success("Item deleted successfully", "Success");
        setExistingItemDelete("");
        fetchAllItems();
      } else {
        NotificationManager.error(
          "Error deleting item. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error deleting item. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllItems = async () => {
    try {
      const allItemsResponse = await getAllItems(loginResponse);
      // console.log("allItemsResponse ---> ", allItemsResponse)
      setAllItems(allItemsResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching items. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllCategory = async () => {
    try {
      const getAllCategoryResponse = await getAllItemCategory(loginResponse);
      setAllCategory(getAllCategoryResponse?.data?.data);
    } catch (err) {
      NotificationManager.error(
        "Something went Wrong, Please try again later.",
        "Error"
      );
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
    fetchAllCategory();
    fetchAllBrands();
    fetchAllCompanies();
    fetchAllItems();
  }, []);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Stock Register
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Item Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              type="text"
              name="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              fullWidth
              type="text"
              name="description"
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              select
              fullWidth
              type="text"
              name="categoryId"
              label="Category ID"
              variant="outlined"
              value={categoryId}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {allCategory?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.categoryName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              select
              fullWidth
              type="text"
              name="subCategory"
              label="Sub Category"
              variant="outlined"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              {["A", "B", "C", "D"].map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              select
              fullWidth
              type="text"
              name="companyId"
              label="Company ID"
              variant="outlined"
              value={companyId}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
              onChange={(e) => setCompanyId(e.target.value)}
            >
              {allCompanies?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              select
              fullWidth
              type="text"
              name="brandId"
              label="Brand ID"
              variant="outlined"
              value={brandId}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                },
              }}
              onChange={(e) => setBrandId(e.target.value)}
            >
              {allBrands?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              fullWidth
              type="number"
              name="volume"
              label="Volume"
              variant="outlined"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              fullWidth
              type="text"
              name="group"
              label="Group"
              variant="outlined"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              fullWidth
              type="number"
              name="caseValue"
              label="Case Value"
              variant="outlined"
              value={caseValue}
              onChange={(e) => setCaseValue(e.target.value)}
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
              onClick={handleCreateItem}
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
          Update Item
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="existingItemUpdate"
              label="Existing Item"
              value={existingItemUpdate}
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
              onChange={(e) => handleUpdateChange(e)}
            >
              {allItems?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {existingItemUpdate && (
            <>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="newItemName"
                  label="Item Name"
                  value={newFormData.name}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({
                      ...newFormData,
                      name: e.target.value,
                    })
                  }
                  
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="description"
                  label="Description"
                  value={newFormData.description}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({
                      ...newFormData,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="categoryId"
                  label="Category Id"
                  value={newFormData.categoryId}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({
                      ...newFormData,
                      categoryId: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="subCategory"
                  label="Sub Category"
                  value={newFormData.subCategory}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({
                      ...newFormData,
                      subCategory: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="companyId"
                  label="Company Id"
                  value={newFormData.companyId}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({
                      ...newFormData,
                      companyId: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="brandId"
                  label="Brand Id"
                  value={newFormData.brandId}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({ ...newFormData, brandId: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="number"
                  name="volume"
                  label="Volume"
                  value={newFormData.volume}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({
                      ...newFormData,
                      volume: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  name="group"
                  label="Group"
                  value={newFormData.group}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({
                      ...newFormData,
                      group: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="number"
                  name="caseValue"
                  label="Case Value"
                  value={newFormData.caseValue}
                  variant="outlined"
                  onChange={(e) =>
                    setNewFormData({
                      ...newFormData,
                      caseValue: e.target.value,
                    })
                  }
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
              onClick={handleUpdateItem}
            >
              Change
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => {
                setExistingItemUpdate("");
                setNewFormData({});
              }}
            >
              Clear
            </Button>
          </Box>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
          Delete Item
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="existingItemDelete"
              label="Existing Item"
              value={existingItemDelete}
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
              onChange={(e) => setExistingItemDelete(e.target.value)}
            >
              {allItems?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
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
              onClick={handleDeleteItem}
            >
              Delete
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => setExistingItemDelete("")}
            >
              Clear
            </Button>
          </Box>
        </Grid>
      </Box>
    </form>
  );
};

export default ItemRegister;
