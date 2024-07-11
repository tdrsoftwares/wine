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
  ThemeProvider,
  Typography,
} from "@mui/material";
import { NotificationManager } from "react-notifications";

import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "../../../services/itemService";
import { getAllItemCategory } from "../../../services/categoryService";
import { getAllBrands } from "../../../services/brandService";
import { getAllCompanies } from "../../../services/companyService";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { customTheme } from "../../../utils/customTheme";

const ItemRegister = () => {
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
  // console.log("editedRow: ", editedRow);
  // console.log("allItems -->  ", allItems);

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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

  const handleSaveClick = async (itemId) => {
    try {
      const updateItemResponse = await updateItem(
        { ...editedRow, categoryId: categoryId },
        itemId
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
      const allItemsResponse = await getAllItems();
      if (allItemsResponse.status === 200) {
        setAllItems(allItemsResponse?.data?.data);
        setLoading(false);
      }
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
      const getAllCategoryResponse = await getAllItemCategory();
      if (getAllCategoryResponse.status === 200) {
        setAllCategory(getAllCategoryResponse?.data?.data);
      }
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
      // console.log("allBrandsResponse ---> ", allBrandsResponse);
      if (allBrandsResponse.status === 200) {
        setAllBrands(allBrandsResponse?.data?.data);
      }
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
      const allCompaniesResponse = await getAllCompanies();
      // console.log("allCompaniesResponse ---> ", allCompaniesResponse);
      if (allCompaniesResponse.status === 200) {
        setAllCompanies(allCompaniesResponse?.data?.data);
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
      const deleteItemResponse = await deleteItem(itemId);
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

  useEffect(() => {
    setPage(0);
  }, [search]);

  const filteredData = sortedData().filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      searchLower === "" ||
      String(item.name).toLowerCase().includes(searchLower) ||
      String(item.description).toLowerCase().includes(searchLower) ||
      String(item.categoryId?.categoryName)
        .toLowerCase()
        .includes(searchLower) ||
      String(item.subCategory).toLowerCase().includes(searchLower) ||
      String(item.companyId?.name).toLowerCase().includes(searchLower) ||
      String(item.brandId?.name).toLowerCase().includes(searchLower) ||
      String(item.volume).toLowerCase().includes(searchLower) ||
      String(item.group).toLowerCase().includes(searchLower) ||
      String(item.caseValue).toLowerCase().includes(searchLower)
    );
  });

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
        Create Item:
      </Typography>

      <ThemeProvider theme={customTheme}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="itemName" className="input-label" required>
                Item Name :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="itemName"
                variant="outlined"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="description"
                className="input-label"
                required
              >
                Description :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="categoryId" className="input-label" required>
                Category :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                type="text"
                name="categoryId"
                variant="outlined"
                value={categoryId}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
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

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel
                htmlFor="subCategory"
                className="input-label"
                required
              >
                Sub Category :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                type="text"
                name="subCategory"
                variant="outlined"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {},
                    },
                  },
                }}
              >
                {["OS", "OSBI", "IMFL", "IML" , "BEER", "LAB"].map((item, id) => (
                  <MenuItem key={id} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="companyId" className="input-label" required>
                Company :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                type="text"
                name="companyId"
                variant="outlined"
                value={companyId}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
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

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="brandId" className="input-label" required>
                Brand :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="brandId"
                variant="outlined"
                value={brandId}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
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

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="volume" className="input-label" required>
                Volume :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="volume"
                variant="outlined"
                value={volume}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) setVolume(value);
                }}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="group" className="input-label" required>
                Group :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                type="text"
                name="group"
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

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="caseValue" className="input-label" required>
                Case Value :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="number"
                name="caseValue"
                variant="outlined"
                value={caseValue}
                onChange={(e) => setCaseValue(e.target.value)}
              />
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
                color="primary"
                size="small"
                variant="contained"
                onClick={handleCreateItem}
                sx={{
                  marginRight: 1,
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
              >
                Create
              </Button>
              <Button
                color="warning"
                size="small"
                variant="outlined"
                onClick={clearForm}
                sx={{
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: "11px",
                }}
              >
                Clear
              </Button>
            </Box>
          </Grid>

          <Grid item xs={3} sx={{ marginTop: 1 }}>
            <div className="input-wrapper">
              <InputLabel htmlFor="searchInput" className="input-label">
                Search Here :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="searchInput"
                placeholder="Enter your input..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>

        <Box sx={{ borderRadius: 1, marginTop: 1 }}>
          <TableContainer
            ref={tableRef}
            component={Paper}
            sx={{
              height: 400,
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
            <Table size="small" padding="normal" stickyHeader={true}>
              <TableHead>
                <TableRow className="table-head-2">
                  <TableCell align="center" style={{ minWidth: "80px" }}>
                    S. No.
                  </TableCell>
                  <TableCell style={{ minWidth: "180px" }}>
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
                  <TableCell style={{ minWidth: "150px" }}>
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
                  <TableCell style={{ minWidth: "120px" }}>
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
                {allItems?.length > 0 ? (
                  filteredData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
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
                              value={editedRow?.name || item?.name}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  name: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item?.name || "No Data"
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.description || item.description}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  description: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.description || "No Data"
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow?.categoryId?.categoryName || item?.categoryId?.categoryName}
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
                            item?.categoryId?.categoryName || "No Data"
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.subCategory || item.subCategory}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  subCategory: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.subCategory || "No Data"
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow?.companyId?.name || item?.companyId?.name}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  companyId: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item?.companyId?.name || "No Data"
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow?.brandId?.name || item?.brandId?.name}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  brandId: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item?.brandId?.name || "No Data"
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.volume || item.volume}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  volume: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.volume || 0
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.group || item.group}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  group: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.group || "No Data"
                          )}
                        </TableCell>

                        <TableCell>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.caseValue || item.caseValue}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  caseValue: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item.caseValue || 0
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
            count={filteredData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                {
                  fontSize: "12px",
                },
            }}
          />
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default ItemRegister;
