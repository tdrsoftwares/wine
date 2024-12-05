import {
  Box,
  CircularProgress,
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
import React, { useRef, useState } from "react";
import { updateItemCode } from "../services/itemService";
import { getAllStocks } from "../services/stockService";
import { NotificationManager } from "react-notifications";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { customTheme } from "../utils/customTheme";
import { useEffect } from "react";
import { usePermissions } from "../utils/PermissionsContext";

const ItemCodeUpdate = () => {
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  // console.log("editedRow: ", editedRow);
  // console.log("allItems -->  ", allItems);
  const [allStocks, setAllStocks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { role } = usePermissions();

  const fetchAllStocks = async () => {
    setLoading(true);
    try {
      const filterOptions = {
        page: page + 1,
        pageSize: rowsPerPage,
      };

      const response = await getAllStocks(filterOptions);
      // console.log("response: ", response);
      const allStocksData = response?.data?.data;

      setAllStocks(allStocksData?.items || []);
      setTotalCount(allStocksData?.totalItems || 0);
    } catch (error) {
      NotificationManager.error(
        "Error fetching stock. Please try again later.",
        "Error"
      );
      console.error("Error fetching stock:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClick = async (itemDetailsId) => {
    try {
      const payload = {
        newItemCode: editedRow.itemCode,
      };
      const response = await updateItemCode(itemDetailsId, payload);
      if (response.status === 200) {
        NotificationManager.success("Itemcode updated successfully", "Success");
        await fetchAllStocks();
        setEditableIndex(null);
        setEditedRow({});
      } else {
        NotificationManager.error(
          "Error updating itemcode. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error updating itemcode. Please try again later.",
        "Error"
      );
    }
  };

  const handleKeyDown = (event, item) => {
    if (event.key === "Enter") {
      handleSaveClick(item._id);
    }
  };

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditableIndex(null);
      setEditedRow({});
    }
  };

  useEffect(() => {
    fetchAllStocks();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetchAllStocks, 300);
    debouncedFetch();
  }, [page, rowsPerPage]);

  const handleEditClick = (index, itemId) => {
    setEditableIndex(index);
    const selectedItem = allStocks.find((item) => item._id === itemId);
    // console.log("selectedItem: ",selectedItem)
    setEditedRow(selectedItem);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
          Update ItemCode:
        </Typography>
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
                  <TableCell align="center" style={{ flex: 1 }}>
                    S. No.
                  </TableCell>
                  <TableCell style={{ flex: 1 }}>Created At</TableCell>
                  <TableCell style={{ flex: 1 }}>Item Code</TableCell>
                  <TableCell style={{ flex: 1 }}>Item Name</TableCell>
                  {/* 
                  <TableCell style={{ flex: 1 }}>Category</TableCell>

                  <TableCell style={{ flex: 1 }}>Company</TableCell>
                  <TableCell style={{ flex: 1 }}>Brand</TableCell> */}
                  <TableCell style={{ flex: 1 }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={12}
                      align="center"
                      sx={{
                        backgroundColor: "#fff !important",
                      }}
                    >
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : role === "admin" ? (
                  (allStocks || [])?.length > 0 ? (
                    allStocks.map((item, index) => (
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
                          {new Date(item?.createdAt).toLocaleDateString(
                            "en-GB"
                          ) || "No Data"}
                        </TableCell>
                        <TableCell>
                          {editableIndex === index ? (
                            <TextField
                              fullWidth
                              value={editedRow.itemCode || ""}
                              onChange={(e) =>
                                setEditedRow({
                                  ...editedRow,
                                  itemCode: e.target.value,
                                })
                              }
                              onKeyDown={(e) => handleKeyDown(e, item)}
                            />
                          ) : (
                            item.itemCode || "No Data"
                          )}
                        </TableCell>
                        <TableCell>{item?.item?.name || "No Data"}</TableCell>

                        {/* <TableCell>
                          {item?.item?.category?.categoryName || "No Data"}
                        </TableCell>

                        <TableCell>
                          {item?.item?.company?.name || "No Data"}
                        </TableCell>

                        <TableCell>
                          {item?.item?.brand?.name || "No Data"}
                        </TableCell> */}

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
                      You do not have permission to view this data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {role === "admin" && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={totalCount}
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
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ItemCodeUpdate;
