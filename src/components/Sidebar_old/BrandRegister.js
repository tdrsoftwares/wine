import React, { useEffect, useRef, useState } from "react";
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
  createBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
} from "../../services/brandService";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { getAllCompanies } from "../../services/companyService";
import { customTheme } from "../../utils/customTheme";
import { usePermissions } from "../../utils/PermissionsContext";

const BrandRegister = () => {
  const [brandName, setBrandName] = useState("");
  const [type, setType] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [allBrands, setAllBrands] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);

  const { permissions, role } = usePermissions();

  const companyPermissions =
    permissions?.find((permission) => permission.moduleName === "Brand")
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearForm = () => {
    setBrandName("");
    setType("");
    setIndexNo("");
    setCompanyName("");
  };

  const handleCreateBrand = async () => {
    const payload = {
      name: brandName,
      companyId: companyName,
      type: type,
      indexNo: indexNo,
    };
    try {
      const createBrandResponse = await createBrand(payload);
      if (createBrandResponse.status === 200) {
        NotificationManager.success("Brand created successfully", "Success");
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

  const handleUpdateBrand = async (brandId) => {
    const payload = {
      name: editedRow.name,
      type: editedRow.type,
      companyId: editedRow.companyId,
      indexNo: editedRow.indexNo,
    };
    try {
      const updateBrandResponse = await updateBrand(payload, brandId);
      if (updateBrandResponse.status === 200) {
        NotificationManager.success("Brand updated successfully", "Success");
        setEditableIndex(null);
        setEditedRow({});
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

  const handleDeleteBrand = async (brandId) => {
    try {
      const deleteBrandResponse = await deleteBrand(brandId);
      if (deleteBrandResponse.status === 200) {
        NotificationManager.success("Brand deleted successfully", "Success");
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
    setLoading(true);
    try {
      const allBrandsResponse = await getAllBrands();
      // console.log("allBrandsResponse ---> ", allBrandsResponse);
      if (allBrandsResponse.status === 200) {
        setAllBrands(allBrandsResponse?.data?.data);
      } else {
        setAllBrands([]);
        // NotificationManager.error("No brands found." , "Error");
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching brands. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCompanies = async () => {
    try {
      const allCompaniesResponse = await getAllCompanies();
      // console.log("allCompaniesResponse ---> ", allCompaniesResponse);
      if (allCompaniesResponse.status === 200) {
        setAllCompanies(allCompaniesResponse?.data?.data);
      } else {
        // NotificationManager.error("No companies found." , "Error");
        setAllCompanies([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching companies. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchAllBrands();
    fetchAllCompanies();
  }, []);

  const handleEditClick = (index, brandId) => {
    setEditableIndex(index);
    const selectedBrand = allBrands.find((brand) => brand._id === brandId);
    setEditedRow(selectedBrand);
  };

  const handleSaveClick = (brandId) => {
    handleUpdateBrand(brandId);
  };

  const handleRemoveBrand = (brandId) => {
    handleDeleteBrand(brandId);
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
    let sorted = allBrands ? [...allBrands] : [];
    if (sortBy) {
      sorted.sort((a, b) => {
        let firstValue;
        let secondValue;

        if (sortBy === "companyId.name") {
          firstValue = a.companyId ? a.companyId.name.toLowerCase() : "";
          secondValue = b.companyId ? b.companyId.name.toLowerCase() : "";
        } else {
          firstValue =
            typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy];
          secondValue =
            typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy];
        }

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

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
          Create Brand:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="brandName" className="input-label">
                Brand :
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                type="text"
                name="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="companyName" className="input-label">
                Company :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="companyName"
                value={companyName}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  },
                }}
                onChange={(e) => setCompanyName(e.target.value)}
              >
                {allCompanies?.map((company) => (
                  <MenuItem key={company._id} value={company._id}>
                    {company.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item xs={3}>
            <div className="input-wrapper">
              <InputLabel htmlFor="type" className="input-label">
                Type :
              </InputLabel>
              <TextField
                select
                fullWidth
                size="small"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="FL">FL</MenuItem>
                <MenuItem value="BEER">BEER</MenuItem>
                <MenuItem value="IML">IML</MenuItem>
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
                type="number"
                name="indexNo"
                value={indexNo}
                onChange={(e) => setIndexNo(e.target.value)}
              />
            </div>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            color="primary"
            size="medium"
            variant="contained"
            onClick={handleCreateBrand}
            sx={{
              marginTop: 1,
              marginRight: 1,
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: "11px",
            }}
            disabled={role !== "admin" && !canCreate}
          >
            Create
          </Button>
          <Button
            color="warning"
            size="medium"
            variant="outlined"
            onClick={clearForm}
            sx={{
              marginTop: 1,
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: "11px",
            }}
          >
            Clear
          </Button>
        </Box>

        <Box sx={{ borderRadius: 1, marginTop: 2 }}>
          <TableContainer ref={tableRef} component={Paper}>
            <Table size="small" padding="normal" stickyHeader={true}>
              <TableHead>
                <TableRow className="table-head-2">
                  <TableCell align="center" sx={{ minWidth: "80px" }}>
                    S. No.
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "name"}
                      direction={sortOrder}
                      onClick={() => handleSort("name")}
                    >
                      Brand Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "companyId.name"}
                      direction={sortOrder}
                      onClick={() => handleSort("companyId.name")}
                    >
                      Company Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "type"}
                      direction={sortOrder}
                      onClick={() => handleSort("type")}
                    >
                      Brand Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>
                    <TableSortLabel
                      active={sortBy === "indexNo"}
                      direction={sortOrder}
                      onClick={() => handleSort("indexNo")}
                    >
                      Index No.
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {canRead || role === "admin" ? (
                  loading ? (
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
                  ) : allBrands ? (
                    sortedData()
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((brand, index) => (
                        <TableRow
                          key={brand._id}
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
                              brand.name
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow.companyId?.name}
                                onChange={(e) =>
                                  setEditedRow({
                                    ...editedRow,
                                    companyId: { name: e.target.value },
                                  })
                                }
                              />
                            ) : (
                              brand?.companyId?.name
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow.type}
                                onChange={(e) =>
                                  setEditedRow({
                                    ...editedRow,
                                    type: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              brand.type
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <Input
                                value={editedRow.indexNo}
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
                              brand.indexNo
                            )}
                          </TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <SaveIcon
                                sx={{
                                  cursor:
                                    canUpdate || role === "admin"
                                      ? "pointer"
                                      : "not-allowed",
                                  color:
                                    canUpdate || role === "admin"
                                      ? "green"
                                      : "gray",
                                }}
                                onClick={
                                  canUpdate || role === "admin"
                                    ? () => handleSaveClick(brand._id)
                                    : null
                                }
                              />
                            ) : (
                              <EditIcon
                                sx={{
                                  cursor:
                                    canUpdate || role === "admin"
                                      ? "pointer"
                                      : "not-allowed",
                                  color:
                                    canUpdate || role === "admin"
                                      ? "blue"
                                      : "gray",
                                }}
                                onClick={
                                  canUpdate || role === "admin"
                                    ? () => handleEditClick(index, brand._id)
                                    : null
                                }
                              />
                            )}
                            <CloseIcon
                              sx={{
                                cursor:
                                  canDelete || role === "admin"
                                    ? "pointer"
                                    : "not-allowed",
                                color:
                                  canDelete || role === "admin"
                                    ? "red"
                                    : "gray",
                              }}
                              onClick={
                                canDelete || role === "admin"
                                  ? () => handleRemoveBrand(brand._id)
                                  : null
                              }
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
                  )
                ) : (
                  <TableRow
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  >
                    <TableCell colSpan={11} align="center">
                      You do not have permission to view brand data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {canRead ||
            (role === "admin" && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={allBrands?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BrandRegister;
