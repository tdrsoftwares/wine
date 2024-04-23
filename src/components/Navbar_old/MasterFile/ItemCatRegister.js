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
  createItemCategory,
  deleteItemCategory,
  getAllItemCategory,
  updateItemCategory,
} from "../../../services/categoryService";
import { useLoginContext } from "../../../utils/loginContext";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const ItemCatRegister = () => {
  const { loginResponse } = useLoginContext();
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [indexNo, setIndexNo] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupNo, setGroupNo] = useState("");

  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  const groupOptions = [
    "All",
    "Beer",
    "Country Sprit",
    "Foreign Liquor",
    "India Made Liquor",
  ];

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

  const handleClear = () => {
    setCategory("");
    setIndexNo("");
    setGroupName("");
    setGroupNo("");
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
    const editedCategory = allCategory.find((supplier) => supplier._id === id);
    setEditedRow({ ...editedCategory });
  };

  const handleSaveCategory = async (id) => {
    try {
      const updateCategoryResponse = await updateItemCategory(
        editedRow,
        id,
        loginResponse
      );
      if (updateCategoryResponse.status === 200) {
        NotificationManager.success("Category updated successfully", "Success");
        setEditableIndex(null);
        setEditedRow({});
        fetchAllCategory();
      } else {
        NotificationManager.error(
          "Error updating category. Please try again later.",
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
      const deleteCategoryResponse = await deleteItemCategory(
        id,
        loginResponse
      );

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
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
        Create Category:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="categoryName" className="input-label">
              Category Name :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="categoryName"
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
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
              className="input-field"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            >
              {groupOptions.map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="indexNo" className="input-label">
              Index No. :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              type="number"
              name="indexNo"
              className="input-field"
              value={indexNo}
              onChange={(e) => setIndexNo(e.target.value)}
              InputProps={{
                inputProps: { type: "number", inputMode: "numeric", min: 0 },
              }}
            />
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="input-wrapper">
            <InputLabel htmlFor="groupNo" className="input-label">
              Group No. :
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              type="number"
              name="groupNo"
              className="input-field"
              value={groupNo}
              onChange={(e) => setGroupNo(e.target.value)}
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
              <TableRow
                sx={{
                  backgroundColor: "inherit",
                }}
              >
                <TableCell align="center" style={{ minWidth: "80px" }}>
                  S. No.
                </TableCell>
                <TableCell align="center" style={{ minWidth: "200px" }}>
                  Category Name
                </TableCell>
                <TableCell align="center" style={{ minWidth: "200px" }}>
                  Main Group
                </TableCell>
                <TableCell align="center" style={{ minWidth: "120px" }}>
                  Index Number
                </TableCell>
                <TableCell align="center" style={{ minWidth: "120px" }}>
                  Group Number
                </TableCell>

                <TableCell align="center" style={{ minWidth: "150px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCategory.map((supplier, index) => (
                <TableRow
                  key={supplier._id}
                  sx={{
                    backgroundColor: "#fff",
                  }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.categoryName || supplier.categoryName}
                        onChange={(e) =>
                          setEditedRow({
                            ...editedRow,
                            categoryName: e.target.value,
                          })
                        }
                      />
                    ) : (
                      supplier.categoryName
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.mainGroup || supplier.mainGroup}
                        onChange={(e) =>
                          setEditedRow({
                            ...editedRow,
                            mainGroup: e.target.value,
                          })
                        }
                      />
                    ) : (
                      supplier.mainGroup
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.indexNo || supplier.indexNo}
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
                      supplier.indexNo
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <Input
                        value={editedRow.groupNo || supplier.groupNo}
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
                      supplier.groupNo
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editableIndex === index ? (
                      <SaveIcon
                        sx={{ cursor: "pointer", color: "green" }}
                        onClick={() => handleSaveCategory(supplier._id)}
                      />
                    ) : (
                      <EditIcon
                        sx={{ cursor: "pointer", color: "blue" }}
                        onClick={() => handleEditCategory(index, supplier._id)}
                      />
                    )}
                    <CloseIcon
                      sx={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleRemoveCategory(supplier._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ItemCatRegister;
