import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";

const StockTransferDataTable = (props) => {
  const {
    tableRef,
    transferData,
    role,
    searchResults,
    handleRowClick,
    setSearchMode,
    editableIndex,
    editedRow,
    handleEdit,
    handleEditClick,
    handleSaveClick,
    handleRemoveClick,
  } = props;

  return (
    <TableContainer
      ref={tableRef}
      component={Paper}
      sx={{
        marginTop: 1,
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
        <TableHead className="table-head">
          <TableRow>
            <TableCell align="center" sx={{ minWidth: "80px" }}>
              S. No.
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "100px" }}>
              Item Code
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "120px" }}>
              Item Name
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "60px" }}>
              MRP
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "60px" }}>
              Batch
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "50px" }}>
              Case
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "60px" }}>
              Pcs
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "60px" }}>
              Brand
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "60px" }}>
              Category
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "60px" }}>
              Volume
            </TableCell>
            <TableCell align="center" sx={{ minWidth: "80px" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="purchase-data-table">
          {transferData?.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: "#fff",
              }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.itemCode}</TableCell>
              <TableCell align="center">
                {/* {editableIndex === index ? (
                          <Input
                            type="text"
                            value={editedRow.itemName || row.itemName}
                            onChange={(e) =>
                              handleEdit(index, "itemName", e.target.value)
                            }
                          />
                        ) : ( */}
                {row.itemName}
                {/* )} */}
              </TableCell>
              <TableCell align="center">{row.mrp}</TableCell>

              <TableCell align="center">{row.batch}</TableCell>

              <TableCell align="center">
                {editableIndex === index ? (
                  <TextField
                    fullWidth
                    sx={{ padding: "6px 5px !important" }}
                    value={editedRow.case || row.case}
                    onChange={(e) => handleEdit(index, "case", e.target.value)}
                  />
                ) : (
                  row.case
                )}
              </TableCell>

              <TableCell align="center">
                {editableIndex === index ? (
                  <TextField
                    fullWidth
                    sx={{ padding: "6px 5px !important" }}
                    value={editedRow.pcs || row.pcs}
                    onChange={(e) => handleEdit(index, "pcs", e.target.value)}
                  />
                ) : (
                  row.pcs
                )}
              </TableCell>

              <TableCell align="center">{row.brand}</TableCell>

              <TableCell align="center">{row.category}</TableCell>

              <TableCell align="center">{row.volume}</TableCell>

              <TableCell align="center">
                {editableIndex !== index ? (
                  <EditIcon
                    sx={{ cursor: "pointer", color: "blue" }}
                    onClick={() => handleEditClick(index)}
                  />
                ) : (
                  <SaveIcon
                    sx={{ cursor: "pointer", color: "green" }}
                    onClick={() => handleSaveClick(index)}
                  />
                )}
                <CloseIcon
                  sx={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleRemoveClick(index)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTransferDataTable;
