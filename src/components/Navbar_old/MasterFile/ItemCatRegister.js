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
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { NotificationManager } from "react-notifications";
import {
  createItemCategory,
  deleteItemCategory,
  getAllItemCategory,
  updateItemCategory,
} from "../../../services/categoryService";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TableSortLabel from "@mui/material/TableSortLabel";
import { customTheme } from "../../../utils/customTheme";
import { usePermissions } from "../../../utils/PermissionsContext";

const ItemCatRegister = () => {
  const [categoryName, setCategoryName] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [indexNo, setIndexNo] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupNo, setGroupNo] = useState("");

  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const tableRef = useRef(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { permissions, role } = usePermissions();

  const companyPermissions =
    permissions?.find((permission) => permission.moduleName === "Company")
      ?.permissions || [];
  const canCreate = companyPermissions.includes("create");
  const canRead = companyPermissions.includes("read");
  const canUpdate = companyPermissions.includes("update");
  const canDelete = companyPermissions.includes("delete");

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

  const handleClear = () => {
    setCategoryName("");
    setIndexNo("");
    setGroupName("");
    setGroupNo("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateCategory = async () => {
    const payload = {
      categoryName: categoryName,
      mainGroup: groupName,
      indexNo: indexNo,
      groupNo: groupNo,
    };

    try {
      const createCategoryResponse = await createItemCategory(payload);
      if (createCategoryResponse.status === 200) {
        NotificationManager.success("Category created successfully", "Success");
        handleClear();
        fetchAllCategory();
      }
    } catch (err) {
      NotificationManager.error(
        "Something went Wrong, Please try again later.",
        "Error"
      );
    }
  };

  const handleEditCategory = (index, id) => {
    setEditableIndex(index);
    const editedCategory = allCategory.find(
      (categoryName) => categoryName._id === id
    );
    setEditedRow({ ...editedCategory });
  };

  const handleSaveCategory = async (id) => {
    try {
      const updateCategoryResponse = await updateItemCategory(editedRow, id);
      if (updateCategoryResponse.status === 200) {
        NotificationManager.success("Category updated successfully", "Success");
        setEditableIndex(null);
        setEditedRow({});
        fetchAllCategory();
      } else {
        NotificationManager.error(
          "Error updating categoryName. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Something went Wrong, Please try again later.",
        "Error"
      );
    }
  };

  const handleRemoveCategory = async (id) => {
    try {
      const deleteCategoryResponse = await deleteItemCategory(id);

      if (deleteCategoryResponse.status === 200) {
        NotificationManager.success("Category deleted successfully", "Success");
        fetchAllCategory();
      }
    } catch (err) {
      NotificationManager.error(
        "Something went wrong. Please try again later.",
        "Error"
      );
    }
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
    let sorted = allCategory ? [...allCategory] : [];
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

  const fetchAllCategory = async () => {
    try {
      const getAllCategoryResponse = await getAllItemCategory();
      if (getAllCategoryResponse.status === 200) {
        setAllCategory(getAllCategoryResponse?.data?.data);
      } else {
        // NotificationManager.error("No category found." , "Error");
        setAllCategory([]);
      }
    } catch (err) {
      // NotificationManager.error(
      //   "Something went Wrong, Please try again later.",
      //   "Error"
      // );
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
          Create Category:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="categoryName" className="input-label">
                Category Name :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="groupName" className="input-label">
                Group Name :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                type="number"
                name="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
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
              <InputLabel htmlFor="indexNo" className="input-label">
                Index No. :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="indexNo"
                value={indexNo}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) setIndexNo(value);
                }}
                InputProps={{
                  inputProps: { type: "number", inputMode: "numeric", min: 0 },
                }}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="groupNo" className="input-label">
                Group No. :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                name="groupNo"
                value={groupNo}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) setGroupNo(value);
                }}
                InputProps={{
                  inputProps: { type: "number", inputMode: "numeric", min: 0 },
                }}
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
            onClick={handleCreateCategory}
            sx={{ borderRadius: 8 }}
            disabled={!canCreate && role !== "admin"}
          >
            Create
          </Button>
          <Button
            color="warning"
            size="medium"
            variant="outlined"
            onClick={() => handleClear()}
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
            <Table size="small">
              <TableHead>
                <TableRow className="table-head-2">
                  <TableCell align="center" sx={{ minWidth: "80px" }}>
                    S. No.
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: "200px" }}>
                    <TableSortLabel
                      active={sortBy === "categoryName"}
                      direction={sortOrder}
                      onClick={() => handleSort("categoryName")}
                    >
                      Category Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: "200px" }}>
                    <TableSortLabel
                      active={sortBy === "mainGroup"}
                      direction={sortOrder}
                      onClick={() => handleSort("mainGroup")}
                    >
                      Main Group
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: "200px" }}>
                    <TableSortLabel
                      active={sortBy === "indexNo"}
                      direction={sortOrder}
                      onClick={() => handleSort("indexNo")}
                    >
                      Index Number
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: "200px" }}>
                    <TableSortLabel
                      active={sortBy === "groupNo"}
                      direction={sortOrder}
                      onClick={() => handleSort("groupNo")}
                    >
                      Group Number
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: "200px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {canRead || role === "admin" ? (
                  sortedData()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((categoryName, index) => (
                      <TableRow
                        key={categoryName._id}
                        sx={{
                          backgroundColor: "#fff",
                        }}
                      >
                        <TableCell align="center" sx={{ minWidth: "80px" }}>
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: "200px" }}>
                          {editableIndex === index ? (
                            <Input
                              value={
                                editedRow.categoryName ||
                                categoryName.categoryName
                              }
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  categoryName: e.target.value,
                                })
                              }
                            />
                          ) : (
                            categoryName.categoryName
                          )}
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: "200px" }}>
                          {editableIndex === index ? (
                            <Input
                              value={
                                editedRow.mainGroup || categoryName.mainGroup
                              }
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  mainGroup: e.target.value,
                                })
                              }
                            />
                          ) : (
                            categoryName.mainGroup
                          )}
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: "200px" }}>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.indexNo || categoryName.indexNo}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (!isNaN(value)) {
                                  setEditedRow({
                                    ...editedRow,
                                    indexNo: value,
                                  });
                                }
                              }}
                            />
                          ) : (
                            categoryName.indexNo
                          )}
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: "200px" }}>
                          {editableIndex === index ? (
                            <Input
                              value={editedRow.groupNo || categoryName.groupNo}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (!isNaN(value)) {
                                  setEditedRow({
                                    ...editedRow,
                                    groupNo: value,
                                  });
                                }
                              }}
                            />
                          ) : (
                            categoryName.groupNo
                          )}
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: "200px" }}>
                          {editableIndex === index ? (
                            <SaveIcon
                              sx={{
                                cursor: canUpdate || role === "admin" ? "pointer" : "not-allowed",
                                color: canUpdate || role === "admin" ? "green" : "gray",
                              }}
                              onClick={
                                canUpdate || role === "admin"
                                  ? () => handleSaveCategory(categoryName._id)
                                  : null
                              }
                            />
                          ) : (
                            <EditIcon
                              sx={{
                                cursor: canUpdate || role === "admin" ? "pointer" : "not-allowed",
                                color: canUpdate || role === "admin" ? "blue" : "gray",
                              }}
                              onClick={
                                canUpdate || role === "admin"
                                  ? () =>
                                      handleEditCategory(
                                        index,
                                        categoryName._id
                                      )
                                  : null
                              }
                            />
                          )}
                          <CloseIcon
                            sx={{
                              cursor: canDelete || role === "admin" ? "pointer" : "not-allowed",
                              color: canDelete || role === "admin" ? "red" : "gray",
                            }}
                            onClick={
                              canDelete || role === "admin"
                                ? () => handleRemoveCategory(categoryName._id)
                                : null
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      You do not have permission to view category data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {canRead || role === "admin" && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={allCategory?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ItemCatRegister;
