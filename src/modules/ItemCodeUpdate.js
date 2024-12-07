import {
  Box,
  CircularProgress,
  InputLabel,
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
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

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
      // setTotalCount(allStocksData?.totalItems || 0);
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

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = () => {
    if (!allStocks || !allStocks.length) return [];

    const sorted = [...allStocks];
    if (sortBy) {
      sorted.sort((a, b) => {
        let firstValue = "",
          secondValue = "";

        switch (sortBy) {
          case "itemCode":
            firstValue = a.itemCode?.toLowerCase() || "";
            secondValue = b.itemCode?.toLowerCase() || "";
            break;
          case "itemName":
            firstValue = a.item?.name?.toLowerCase() || "";
            secondValue = b.item?.name?.toLowerCase() || "";
            break;
          default:
            firstValue =
              typeof a[sortBy] === "string"
                ? a[sortBy].toLowerCase()
                : a[sortBy];
            secondValue =
              typeof b[sortBy] === "string"
                ? b[sortBy].toLowerCase()
                : b[sortBy];
        }

        if (firstValue < secondValue) return sortOrder === "asc" ? -1 : 1;
        if (firstValue > secondValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  };

  useEffect(() => {
    setPage(0);
  }, [search]);

  const filteredData = sortedData().filter((item) => {
    const searchLower = search.trim().toLowerCase();
    if (!searchLower) return true;

    return (
      String(item?.itemCode || "")
        .toLowerCase()
        .includes(searchLower) ||
      String(item?.item?.name || "")
        .toLowerCase()
        .includes(searchLower)
    );
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
          Update ItemCode:
        </Typography>
        <div
          className="input-wrapper"
          style={{ marginRight: "0px !important" }}
        >
          <InputLabel htmlFor="searchInput" sx={{ width: "50%" }}>
            Search Item Here :
          </InputLabel>
          <TextField
            size="small"
            type="text"
            name="searchInput"
            sx={{ width: "50%" }}
            placeholder="Enter your input..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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

                  <TableCell style={{ flex: 1 }}>
                    <TableSortLabel
                      active={sortBy === "itemCode"}
                      direction={sortOrder}
                      onClick={() => handleSort("itemCode")}
                    >
                      Item Code
                    </TableSortLabel>
                  </TableCell>

                  <TableCell style={{ flex: 1 }}>
                    <TableSortLabel
                      active={sortBy === "name"}
                      direction={sortOrder}
                      onClick={() => handleSort("name")}
                    >
                      Item Name
                    </TableSortLabel>
                  </TableCell>

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
                  filteredData.length > 0 ? (
                    filteredData
                      .slice(
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
              count={filteredData.length}
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
