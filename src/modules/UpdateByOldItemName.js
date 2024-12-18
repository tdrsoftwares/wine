import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
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
import { getAllStocks } from "../services/stockService";
import { NotificationManager } from "react-notifications";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { customTheme } from "../utils/customTheme";
import { useEffect } from "react";
import { usePermissions } from "../utils/PermissionsContext";
import { getAllItemsByItemName, updateItemName } from "../services/itemService";
import { searchByItemName } from "../services/saleBillService";
import debounce from "lodash.debounce";

const UpdateByOldItemName = () => {
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  // console.log("editedRow: ", editedRow);
  // console.log("allItems -->  ", allItems);
  const [allItems, setAllItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemName, setItemName] = useState("");
  const [itemNameOptions, setItemNameOptions] = useState([]);
  const [newItemName, setNewItemName] = useState("");

  const { role } = usePermissions();

  const fetchAllItems = async () => {
    setLoading(true);
    try {
      const response = await getAllItemsByItemName(itemName);
      const allStocksData = response?.data?.data?.data;
      console.log("allStocksData: ", allStocksData);

      setAllItems(allStocksData || []);
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

  // console.log("editedRow: ",editedRow);

  const handleSaveClick = async () => {
    try {
      const payload = {
        newItemName: editedRow?.item?.name,
      };
      const response = await updateItemName(editedRow?._id, payload);
      if (response.status === 200) {
        NotificationManager.success("Itemname updated successfully", "Success");
        await fetchAllItems();
        setEditableIndex(null);
        setEditedRow({});
      } else {
        NotificationManager.error(
          "Error updating itemname. Please try again later.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "Error updating itemname. Please try again later.",
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce(fetchAllItems, 300);
    if (itemName) debouncedFetch();
  }, [itemName]);

  const handleEditClick = (index, itemId) => {
    setEditableIndex(index);
    const selectedItem = allItems.find((item) => item._id === itemId);
    // console.log("selectedItem: ",selectedItem)
    setEditedRow(selectedItem);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 100));
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
    if (!allItems || !allItems.length) return [];
    return [...allItems].sort((a, b) => {
      let firstValue = a[sortBy]?.toString().toLowerCase() || "";
      let secondValue = b[sortBy]?.toString().toLowerCase() || "";
      if (firstValue < secondValue) return sortOrder === "asc" ? -1 : 1;
      if (firstValue > secondValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };  

  const handleItemNameChange = (event, newValue) => {
    setItemName(newValue);
    if (itemName) {
    }
  };

  const itemNameSearch = debounce(async (searchText) => {
    try {
      const response = await searchByItemName(searchText);
      if (response?.data?.data && response.data.data.length > 0) {
        setItemNameOptions(response.data.data);
      } else {
        setItemNameOptions([]);
      }
    } catch (error) {
      console.error("Error searching items:", error);
      setItemNameOptions([]);
    }
  }, 500);

  useEffect(() => {
    setPage(0);
  }, [search]);

  const filteredData = () => {
    const lowerSearch = search.trim().toLowerCase();
    return sortedData().filter((item) => {
      const itemName = item.item?.name?.toLowerCase() || "";
      const itemCode = item.itemCode?.toLowerCase() || "";
      return itemCode.includes(lowerSearch) || itemName.includes(lowerSearch);
    });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
          Update Item from OldItem:
        </Typography>

        <div
          className="input-wrapper"
          style={{ marginRight: "0px !important" }}
        >
          <InputLabel htmlFor="itemName" sx={{ width: "50%" }}>
            Search Item Name Here :
          </InputLabel>
          <Autocomplete
            options={itemNameOptions.map((option) => option.name)}
            value={itemName}
            onChange={handleItemNameChange}
            onInputChange={(event, newInputValue) => {
              itemNameSearch(newInputValue);
            }}
            className="input-field"
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" name="itemName" />
            )}
            sx={{ width: "50%" }}
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
                  <TableCell style={{ flex: 1 }}>
                    <TableSortLabel
                      active={sortBy === "batchNo"}
                      direction={sortOrder}
                      onClick={() => handleSort("batchNo")}
                    >
                      Batch
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ flex: 1 }}>
                    <TableSortLabel
                      active={sortBy === "mrp"}
                      direction={sortOrder}
                      onClick={() => handleSort("mrp")}
                    >
                      MRP
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ flex: 1 }}>
                    <TableSortLabel
                      active={sortBy === "currentStock"}
                      direction={sortOrder}
                      onClick={() => handleSort("currentStock")}
                    >
                      Current Stock
                    </TableSortLabel>
                  </TableCell>
                  <TableCell style={{ flex: 1 }}>
                    <TableSortLabel
                      active={sortBy === "storeName"}
                      direction={sortOrder}
                      onClick={() => handleSort("storeName")}
                    >
                      Store
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
                  allItems.length > 0 ? (
                    allItems
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
                          <TableCell>{item.itemCode || "No Data"}</TableCell>
                          <TableCell>
                            {editableIndex === index ? (
                              <TextField
                                fullWidth
                                value={editedRow?.item?.name || ""}
                                onChange={(e) =>
                                  setEditedRow({
                                    ...editedRow,
                                    item: { name: e.target.value },
                                  })
                                }
                                onKeyDown={(e) => handleKeyDown(e, item)}
                              />
                            ) : (
                              item?.item?.name || "No Data"
                            )}
                          </TableCell>

                          <TableCell>{item?.batchNo || "No Data"}</TableCell>

                          <TableCell>{item?.mrp || "No Data"}</TableCell>

                          <TableCell>
                            {item?.currentStock || "No Data"}
                          </TableCell>
                          <TableCell>{item?.store?.name || "No Data"}</TableCell>
                          {/* <TableCell>
                            <TextField
                              fullWidth
                              value={newItemName || ""}
                              onChange={(e) => setNewItemName(e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e, item)}
                            />
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
                        No Data Found
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
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={allItems.length}
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

export default UpdateByOldItemName;
