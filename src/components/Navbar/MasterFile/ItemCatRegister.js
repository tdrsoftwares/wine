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
  createItemCategory,
  deleteItemCategory,
  getAllItemCategory,
  updateItemCategory,
} from "../../../services/categoryService";
import { useLoginContext } from "../../../utils/loginContext";

const ItemCatRegister = () => {
  const { loginResponse } = useLoginContext();
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [indexNo, setIndexNo] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupNo, setGroupNo] = useState("");
  const [existingCategoryUpdate, setExistingCategoryUpdate] = useState("");
  const [existingCategoryDelete, setExistingCategoryDelete] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newIndexNo, setNewIndexNo] = useState("");
  const [newGroupNo, setNewGroupNo] = useState("");

  const groupOptions = [
    "All",
    "Beer",
    "Country Sprit",
    "Foreign Liquor",
    "India Made Liquor",
  ];

  console.log("existingCategoryUpdate : ", existingCategoryUpdate);

  const handleClear = (action) => {
    switch (action) {
      case "create":
        setCategory("");
        setIndexNo("");
        setGroupName("");
        setGroupNo("");
        break;
      case "update":
        setExistingCategoryUpdate("");
        setNewCategory("");
        setNewGroupName("");
        setNewIndexNo("");
        setNewGroupNo("");
        break;
      case "delete":
        setExistingCategoryDelete("");
        break;
      default:
        break;
    }
  };

  const handleCreateCategory = async () => {
    const payload = {
      categoryName: category,
      mainGroup: groupName,
      indexNo: indexNo,
      groupNo: groupNo,
    };

    try {
      const createCategoryResponse = await createItemCategory(
        payload,
        loginResponse
      );
      if (createCategoryResponse.status === 200) {
        NotificationManager.success("Category created successfully", "Success");
        handleClear("create");
        fetchAllCategory();
      }
    } catch (err) {
      NotificationManager.error(
        "Something went Wrong, Please try again later.",
        "Error"
      );
    }
  };

  const updatedCategory = async () => {
    const payload = {
      categoryName: newCategory,
      mainGroup: newGroupName,
      indexNo: newIndexNo,
      groupNo: newGroupNo,
    };

    try {
      const updatedCategoryResponse = await updateItemCategory(
        payload,
        existingCategoryUpdate,
        loginResponse
      );
      if (updatedCategoryResponse.status === 200) {
        NotificationManager.success("Category updated successfully", "Success");
        handleClear("update");
        fetchAllCategory();
      }
    } catch (err) {
      NotificationManager.error(
        "Something went Wrong, Please try again later.",
        "Error"
      );
    }
  };
  const handleUpdateChange = (e) => {
    const selectedCategoryId = e.target.value;
    setExistingCategoryUpdate(selectedCategoryId);
    const selectedCategory = allCategory.find((item) => item._id === selectedCategoryId);
    if (selectedCategory) {
      setNewCategory(selectedCategory.categoryName);
      setNewGroupName(selectedCategory.mainGroup);
      setNewIndexNo(selectedCategory.indexNo);
      setNewGroupNo(selectedCategory.groupNo);
    }
  };
  

  const deleteCategory = async () => {
    try {
      if (!existingCategoryDelete) {
        NotificationManager.error(
          "Please select a category to delete.",
          "Error"
        );
        return;
      }
      const deleteCategoryResponse = await deleteItemCategory(
        existingCategoryDelete,
        loginResponse
      );

      if (deleteCategoryResponse.status === 200) {
        NotificationManager.success("Category deleted successfully", "Success");
        handleClear("delete");
        fetchAllCategory();
      }
    } catch (err) {
      NotificationManager.error(
        "Something went wrong. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllCategory = async () => {
    try {
      const getAllCategoryResponse = await getAllItemCategory(loginResponse);
      console.log("getAllCategoryResponse: ", getAllCategoryResponse);
      setAllCategory(getAllCategoryResponse?.data?.data);
    } catch (err) {
      NotificationManager.error(
        "Something went Wrong, Please try again later.",
        "Error"
      );
    }
  };

  console.log("allCategory: ", allCategory);

  useEffect(() => {
    fetchAllCategory();
  }, []);

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Item Category Information
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Item Category Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2.4}>
            <TextField
              fullWidth
              type="text"
              name="selectedCategory"
              label="Item Category"
              value={category}
              variant="outlined"
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              select
              fullWidth
              type="number"
              name="groupName"
              label="Main Group Name"
              value={groupName}
              variant="outlined"
              onChange={(e) => setGroupName(e.target.value)}
            >
              {groupOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              fullWidth
              type="number"
              name="indexNo"
              label="Index No."
              value={indexNo}
              variant="outlined"
              onChange={(e) => setIndexNo(e.target.value)}
            />
          </Grid>

          <Grid item xs={2.4}>
            <TextField
              fullWidth
              type="number"
              name="groupNo"
              label="Group No."
              value={groupNo}
              variant="outlined"
              onChange={(e) => setGroupNo(e.target.value)}
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
              onClick={handleCreateCategory}
            >
              Create
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => handleClear("create")}
            >
              Clear
            </Button>
          </Box>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
          Update Category
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={2.4}>
            <TextField
              select
              fullWidth
              name="existingCategoryUpdate"
              label="Existing Category"
              value={existingCategoryUpdate}
              variant="outlined"
              onChange={(e) => handleUpdateChange(e)}
            >
              {allCategory?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.categoryName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {existingCategoryUpdate && (
            <>
              <Grid item xs={2.4}>
                <TextField
                  fullWidth
                  type="text"
                  name="newCategory"
                  label="Category Name"
                  value={newCategory}
                  variant="outlined"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </Grid>
              <Grid item xs={2.4}>
                <TextField
                  fullWidth
                  type="text"
                  name="newGroupName"
                  label="Group Name"
                  value={newGroupName}
                  variant="outlined"
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
              </Grid>
              <Grid item xs={1.2}>
                <TextField
                  fullWidth
                  type="text"
                  name="indexNo"
                  label="Index No"
                  value={newIndexNo}
                  variant="outlined"
                  onChange={(e) => setNewIndexNo(e.target.value)}
                />
              </Grid>
              <Grid item xs={1.2}>
                <TextField
                  fullWidth
                  type="text"
                  name="groupNo"
                  label="Group No"
                  value={newGroupNo}
                  variant="outlined"
                  onChange={(e) => setNewGroupNo(e.target.value)}
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
              onClick={updatedCategory}
            >
              Change
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => handleClear("update")}
            >
              Clear
            </Button>
          </Box>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
          Delete Category
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              name="existingCategoryDelete"
              label="Existing Category"
              value={existingCategoryDelete}
              variant="outlined"
              onChange={(e) => setExistingCategoryDelete(e.target.value)}
            >
              {allCategory?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.categoryName}
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
              onClick={deleteCategory}
            >
              Delete
            </Button>
            <Button
              color="warning"
              size="large"
              variant="outlined"
              onClick={() => handleClear("delete")}
            >
              Clear
            </Button>
          </Box>
        </Grid>
      </Box>
    </form>
  );
};

export default ItemCatRegister;
