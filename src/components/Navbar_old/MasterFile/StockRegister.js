import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
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
  const [itemName, setItemName] = useState("");
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
  const [existingItemDelete, setExistingItemDelete] = useState("");

  const [newFormData, setNewFormData] = useState({
    itemName: "",
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
    setItemName("");
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
      itemName,
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
      name: itemName,
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
    if (!newFormData.itemName) {
      NotificationManager.warning("Please fill New Item Name.", "Error");
      return;
    }

    const payload = {
      name: newFormData.itemName,
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
        setNewFormData({});
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
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          Create Item:
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemName" className="input-label">
                Name :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="itemName"
                className="input-field"
                variant="outlined"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="description" className="input-label">
                Description :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="description"
                className="input-field"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="categoryId" className="input-label">
                Category ID :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                type="text"
                name="categoryId"
                className="input-field"
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
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="subCategory" className="input-label">
                Sub Category :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                type="text"
                name="subCategory"
                className="input-field"
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
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="companyId" className="input-label">
                Company ID :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                type="text"
                name="companyId"
                className="input-field"
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
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="brandId" className="input-label">
                Brand ID :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="brandId"
                className="input-field"
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
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="volume" className="input-label">
                Volume :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="number"
                name="volume"
                className="input-field"
                variant="outlined"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="group" className="input-label">
                Group :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="group"
                className="input-field"
                variant="outlined"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="caseValue" className="input-label">
                Case Value :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="number"
                name="caseValue"
                className="input-field"
                variant="outlined"
                value={caseValue}
                onChange={(e) => setCaseValue(e.target.value)}
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
            onClick={handleCreateItem}
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

        <Typography variant="subtitle1" sx={{ marginTop: 2, marginBottom: 2 }}>
          Update Item:
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="existingItemUpdate" className="input-label">
                Existing Item :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="existingItemUpdate"
                className="input-field"
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
            </div>
          </Grid>
          {existingItemUpdate && (
            <>
              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="newItemName" className="input-label">
                    Item Name :
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="newItemName"
                    className="input-field"
                    value={newFormData.name}
                    variant="outlined"
                    onChange={(e) =>
                      setNewFormData({
                        ...newFormData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="newItemDescription"
                    className="input-label"
                  >
                    Description :
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="newItemDescription"
                    className="input-field"
                    value={newFormData.description}
                    variant="outlined"
                    onChange={(e) =>
                      setNewFormData({
                        ...newFormData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="newItemCategoryId"
                    className="input-label"
                  >
                    Category Id :
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="newItemCategoryId"
                    className="input-field"
                    value={newFormData.categoryId}
                    variant="outlined"
                    onChange={(e) =>
                      setNewFormData({
                        ...newFormData,
                        categoryId: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="newItemSubCategory"
                    className="input-label"
                  >
                    Sub Category :
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="newItemSubCategory"
                    className="input-field"
                    value={newFormData.subCategory}
                    variant="outlined"
                    onChange={(e) =>
                      setNewFormData({
                        ...newFormData,
                        subCategory: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="newItemCompanyId"
                    className="input-label"
                  >
                    Company Id :
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="newItemCompanyId"
                    className="input-field"
                    value={newFormData.companyId}
                    variant="outlined"
                    onChange={(e) =>
                      setNewFormData({
                        ...newFormData,
                        companyId: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="newItemBrandId" className="input-label">
                    Brand Id :
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="newItemBrandId"
                    className="input-field"
                    value={newFormData.brandId}
                    variant="outlined"
                    onChange={(e) =>
                      setNewFormData({
                        ...newFormData,
                        brandId: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="newItemVolume" className="input-label">
                    Volume :
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    name="newItemVolume"
                    className="input-field"
                    value={newFormData.volume}
                    variant="outlined"
                    onChange={(e) =>
                      setNewFormData({
                        ...newFormData,
                        volume: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="newItemGroup" className="input-label">
                    Group :
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="newItemGroup"
                    className="input-field"
                    value={newFormData.group}
                    variant="outlined"
                    onChange={(e) =>
                      setNewFormData({
                        ...newFormData,
                        group: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="newItemCaseValue"
                    className="input-label"
                  >
                    Case Value :
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    name="newItemCaseValue"
                    className="input-field"
                    value={newFormData.caseValue}
                    variant="outlined"
                    onChange={(e) =>
                      setNewFormData({
                        ...newFormData,
                        caseValue: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>
            </>
          )}
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
            onClick={handleUpdateItem}
            sx={{ borderRadius: 8 }}
          >
            Change
          </Button>
          <Button
            color="warning"
            size="medium"
            variant="outlined"
            sx={{ borderRadius: 8 }}
            onClick={() => {
              setExistingItemUpdate("");
              setNewFormData({});
            }}
          >
            Clear
          </Button>
        </Box>

        <Typography variant="subtitle1" sx={{ marginTop: 2, marginBottom: 2 }}>
          Delete Item:
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <div className="input-wrapper">
              <InputLabel htmlFor="existingItemDelete" className="input-label">
                Existing Item :
              </InputLabel>
              <TextField
                select
                fullWidth
                name="existingItemDelete"
                size="small"
                className="input-field"
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
            sx={{ borderRadius: 8 }}
            onClick={handleDeleteItem}
          >
            Delete
          </Button>
          <Button
            color="warning"
            size="medium"
            variant="outlined"
            sx={{ borderRadius: 8 }}
            onClick={() => setExistingItemDelete("")}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ItemRegister;
