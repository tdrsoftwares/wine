import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
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
  TablePagination,
  TableRow,
  TableSortLabel,
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
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

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
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  console.log("editedRow: ", editedRow);
  console.log("allItems -->  ", allItems);

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);

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

  const handleSaveClick = async (itemId) => {
    try {
      const updateItemResponse = await updateItem(
        { ...editedRow, categoryId: categoryId },
        itemId,
        loginResponse
      );
      if (updateItemResponse.status === 200) {
        NotificationManager.success("Item updated successfully", "Success");
        setEditableIndex(null);
        setEditedRow({});
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

  const fetchAllItems = async () => {
    try {
      setLoading(true);
      const allItemsResponse = await getAllItems(loginResponse);
      setAllItems(allItemsResponse?.data?.data);
      setLoading(false);
    } catch (error) {
      NotificationManager.error(
        "Error fetching items. Please try again later.",
        "Error"
      );
    } finally {
      setLoading(false);
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

  const handleDeleteItem = async (itemId) => {
    try {
      const deleteItemResponse = await deleteItem(itemId, loginResponse);
      if (deleteItemResponse.status === 200) {
        NotificationManager.success("Item deleted successfully", "Success");
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

  const handleEditClick = (index, itemId) => {
    setEditableIndex(index);
    const selectedItem = allItems.find((item) => item._id === itemId);
    setEditedRow(selectedItem);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = () => {
    let sorted = [...allItems];
    if (sortBy) {
      sorted.sort((a, b) => {
        const firstValue =
          typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy];
        const secondValue =
          typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy];
        if (firstValue < secondValue) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (firstValue > secondValue) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          Create Item:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
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

          <Grid item xs={4}>
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

        <Box sx={{ borderRadius: 1, marginTop: 2 }}>
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
                <TableRow className="table-head-2">
                  <TableCell align="center" style={{ minWidth: "80px" }}>
                    S. No.
                  </TableCell>
                  <TableCell style={{ minWidth: "150px" }}>
                    <TableSortLabel
                      active={sortBy === "name"}
                      direction={sortOrder}
                      onClick={() => handleSort("name")}
                    >
                      Item Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "200px" }}>
                    <TableSortLabel
                      active={sortBy === "description"}
                      direction={sortOrder}
                      onClick={() => handleSort("description")}
                    >
                      Description
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "100px" }}>
                    <TableSortLabel
                      active={sortBy === "categoryId"}
                      direction={sortOrder}
                      onClick={() => handleSort("categoryId")}
                    >
                      Category
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "150px" }}>
                    <TableSortLabel
                      active={sortBy === "subCategory"}
                      direction={sortOrder}
                      onClick={() => handleSort("subCategory")}
                    >
                      Sub Category
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "150px" }}>
                    <TableSortLabel
                      active={sortBy === "companyId"}
                      direction={sortOrder}
                      onClick={() => handleSort("companyId")}
                    >
                      Company
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "150px" }}>
                    <TableSortLabel
                      active={sortBy === "brandId"}
                      direction={sortOrder}
                      onClick={() => handleSort("brandId")}
                    >
                      Brand
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "100px" }}>
                    <TableSortLabel
                      active={sortBy === "volume"}
                      direction={sortOrder}
                      onClick={() => handleSort("volume")}
                    >
                      Volume
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "100px" }}>
                    <TableSortLabel
                      active={sortBy === "group"}
                      direction={sortOrder}
                      onClick={() => handleSort("group")}
                    >
                      Group
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "150px" }}>
                    <TableSortLabel
                      active={sortBy === "caseValue"}
                      direction={sortOrder}
                      onClick={() => handleSort("caseValue")}
                    >
                      Case Value
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: "100px" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      align="center"
                      sx={{
                        backgroundColor: "#fff !important",
                      }}
                    >
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : allItems ? (
                  sortedData()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor: "#fff",
                        }}
                      >
                        <TableCell align="center">
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.name}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  name: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.name
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.description}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  description: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.description
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.categoryId.categoryName}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  categoryId: {
                                    ...categoryId,
                                    categoryName: e.target.value,
                                  },
                                })
                              }
                            />
                          ) : (
                            item.categoryId.categoryName
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.subCategory}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  subCategory: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.subCategory
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.companyId.name}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  companyId: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.companyId.name
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.brandId.name}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  brandId: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.brandId.name
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.volume}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  volume: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.volume
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.group}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  group: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.group
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.caseValue}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  caseValue: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.caseValue
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex !== index ? (
                            <EditIcon
                              sx={{ cursor: "pointer", color: "blue" }}
                              onClick={() => handleEditClick(index, item._id)}
                            />
                          ) : (
                            <SaveIcon
                              sx={{ cursor: "pointer", color: "green" }}
                              onClick={() => handleSaveClick(item._id)}
                            />
                          )}
                          <CloseIcon
                            sx={{ cursor: "pointer", color: "red" }}
                            onClick={() => handleDeleteItem(item._id)}
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
                    <TableCell colSpan={11} align="center">
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </form>
  );
};

export default ItemRegister;
