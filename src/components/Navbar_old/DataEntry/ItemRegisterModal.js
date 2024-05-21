import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { NotificationManager } from "react-notifications";

import { createItem, getAllItems } from "../../../services/itemService";
import { useLoginContext } from "../../../utils/loginContext";
import { getAllItemCategory } from "../../../services/categoryService";
import { getAllBrands } from "../../../services/brandService";
import { getAllCompanies } from "../../../services/companyService";

const ItemRegisterModal = ({ isModalOpen, setIsModalOpen }) => {
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
      const createItemResponse = await createItem(payload);
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

  const fetchAllItems = async () => {
    try {
      const allItemsResponse = await getAllItems();
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
      const getAllCategoryResponse = await getAllItemCategory();
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
      const allBrandsResponse = await getAllBrands();
      setAllBrands(allBrandsResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllCompanies = async () => {
    try {
      const allCompaniesResponse = await getAllCompanies();
      setAllCompanies(allCompaniesResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching companies. Please try again later.",
        "Error"
      );
    }
  };

  useEffect(() => {
    fetchAllCategory();
    fetchAllBrands();
    fetchAllCompanies();
    fetchAllItems();
  }, []);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          sx={{marginBottom: 3}}
        >
          Create Item
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemName" className="input-label">
                Item Name :
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

          <Grid item xs={6}>
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

          <Grid item xs={6}>
            <div className="input-wrapper">
              <InputLabel htmlFor="categoryId" className="input-label">
                Category :
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

          <Grid item xs={6}>
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

          <Grid item xs={6}>
            <div className="input-wrapper">
              <InputLabel htmlFor="companyId" className="input-label">
                Company :
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

          <Grid item xs={6}>
            <div className="input-wrapper">
              <InputLabel htmlFor="brandId" className="input-label">
                Brand :
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

          <Grid item xs={6}>
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

          <Grid item xs={6}>
            <div className="input-wrapper">
              <InputLabel htmlFor="group" className="input-label">
                Group :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                type="text"
                name="group"
                className="input-field"
                variant="outlined"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              >
                {["FL", "BEER", "IML"].map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={6}>
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
            marginTop: 2,
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
            onClick={() => setIsModalOpen(false)}
            sx={{ borderRadius: 8, marginLeft: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ItemRegisterModal;
