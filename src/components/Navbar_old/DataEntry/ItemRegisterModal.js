// src/ItemRegisterModal.js
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
import { createItemCategory, getAllItemCategory } from "../../../services/categoryService";
import { createBrand, getAllBrands } from "../../../services/brandService";
import { createCompany, getAllCompanies } from "../../../services/companyService";
import CreateCompanyModal from "./CreateCompanyModal";
import CreateBrandModal from "./CreateBrandModal";
import CategoryModal from "./CategoryModal";

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

  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [brandName, setBrandName] = useState("");
  const [type, setType] = useState("");
  const [indexNumber, setIndexNumber] = useState("");

  const [categoryName, setCategoryName] = useState("");
  // const [allCategory, setAllCategory] = useState([]);
  const [indexNoCate, setIndexNoCate] = useState("");
  const [groupNameCate, setGroupNameCate] = useState("");
  const [groupNoCate, setGroupNoCate] = useState("");

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

  const handleCategoriesClear = () => {
    setCategoryName("");
    setIndexNoCate("");
    setGroupNoCate("");
    setGroupNameCate("");
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
        setIsModalOpen(false)
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

  const fetchAllItemCategory = async () => {
    try {
      const allCategoryResponse = await getAllItemCategory();
      setAllCategory(allCategoryResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching categories. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllBrands = async () => {
    try {
      const allBrandResponse = await getAllBrands();
      setAllBrands(allBrandResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching brands. Please try again later.",
        "Error"
      );
    }
  };

  const fetchAllCompanies = async () => {
    try {
      const allCompanyResponse = await getAllCompanies();
      setAllCompanies(allCompanyResponse?.data?.data);
    } catch (error) {
      NotificationManager.error(
        "Error fetching companies. Please try again later.",
        "Error"
      );
    }
  };

  // const fetchAllCategory = async () => {
  //   try {
  //     const getAllCategoryResponse = await getAllItemCategory();
  //     console.log("getAllCategoryResponse: ", getAllCategoryResponse);
  //     setAllCategory(getAllCategoryResponse?.data?.data);
  //   } catch (err) {
  //     NotificationManager.error(
  //       "Something went Wrong, Please try again later.",
  //       "Error"
  //     );
  //   }
  // };

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
        setIsCompanyModalOpen(false)
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
  

  const handleCreateBrand = async () => {
    // Logic to create brand
    console.log("Creating brand:", {
      brandName,
      companyName,
      type,
      indexNumber,
    });
    const payload = {
      name: brandName,
      companyId: companyName,
      type: type,
      indexNo: indexNumber,
    };
    try {
      const createBrandResponse = await createBrand(payload);
      if (createBrandResponse.status === 200) {
        NotificationManager.success("Brand created successfully", "Success");
        setBrandName("");
        setCompanyName("");
        setType("");
        setIndexNumber("");
        fetchAllBrands();
        setIsBrandModalOpen(false);
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

  const handleCreateCategory = async () => {
    const payload = {
      categoryName: categoryName,
      mainGroup: groupNameCate,
      indexNo: indexNoCate,
      groupNo: groupNoCate,
    };

    try {
      const createCategoryResponse = await createItemCategory(payload);
      if (createCategoryResponse.status === 200) {
        NotificationManager.success("Category created successfully", "Success");
        setIsCategoryModalOpen(false);
        handleCategoriesClear();
        fetchAllItemCategory();
      }
    } catch (err) {
      NotificationManager.error(
        "Something went Wrong, Please try again later.",
        "Error"
      );
    }
  };

  // useEffect(() => {
  //   const loadCompanies = async () => {
  //     try {
  //       const companies = await getAllCompanies();
  //       setAllCompanies(companies?.data.data);
  //     } catch (error) {
  //       console.error("Failed to fetch companies", error);
  //     }
  //   };

  //   loadCompanies();
  // }, []);

  useEffect(() => {
    fetchAllItems();
    fetchAllItemCategory();
    fetchAllBrands();
    fetchAllCompanies();
  }, []);

  useEffect(() => {
    fetchAllCompanies();
    fetchAllBrands();
    fetchAllItemCategory();
  }, [isBrandModalOpen, isCategoryModalOpen, isCompanyModalOpen]);

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          <Typography variant="h6" component="h2" align="center" mb={3}>
            Register Item
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Category"
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
                    variant="outlined"
                    required
                  >
                    {allCategory?.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => setIsCategoryModalOpen(true)}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Sub Category"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Company"
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    variant="outlined"
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
                </Grid>
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => setIsCompanyModalOpen(true)}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Brand"
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                    variant="outlined"
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
                    {allBrands.map((brand) => (
                      <MenuItem key={brand._id} value={brand._id}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => setIsBrandModalOpen(true)}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                size="small"
                type="text"
                label="Group"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                variant="outlined"
                required
              >
                {["FL", "BEER", "IML"]?.map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Volume"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Case Value"
                value={caseValue}
                onChange={(e) => setCaseValue(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleCreateItem}
            >
              Register
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => {
                setIsModalOpen(false);
                clearForm();
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <CreateCompanyModal
        isOpen={isCompanyModalOpen}
        fetchAllCompanies={fetchAllCompanies}
        companyName={companyName}
        setCompanyName={setCompanyName}
        companyType={companyType}
        setCompanyType={setCompanyType}
        handleCreateCompany={handleCreateCompany}
        handleClose={() => setIsCompanyModalOpen(false)}
      />
      <CreateBrandModal
        isOpen={isBrandModalOpen}
        fetchAllBrands={fetchAllBrands}
        brandName={brandName}
        setBrandName={setBrandName}
        companyName={companyName}
        setCompanyName={setCompanyName}
        type={type}
        setType={setType}
        indexNumber={indexNumber}
        setIndexNumber={setIndexNumber}
        allCompanies={allCompanies}
        setAllCompanies={setAllCompanies}
        handleCreateBrand={handleCreateBrand}
        handleClose={() => setIsBrandModalOpen(false)}
      />
      <CategoryModal 
        isOpen={isCategoryModalOpen}
        fetchAllCategory={fetchAllItemCategory}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        indexNoCate={indexNoCate}
        setIndexNoCate={setIndexNoCate}
        groupNoCate={groupNoCate}
        setGroupNoCate={setGroupNoCate}
        groupNameCate={groupNameCate}
        setGroupNameCate={setGroupNameCate}
        handleCreateCategory={handleCreateCategory}
        handleClose={() => setIsCategoryModalOpen(false)}
        handleCategoriesClear={handleCategoriesClear}
      />
    </>
  );
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  height: "90",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default ItemRegisterModal;
