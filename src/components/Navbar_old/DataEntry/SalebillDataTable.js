// saleBill data table:
import React, { useEffect } from "react";
import {
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from '@mui/icons-material/Print';

const SalebillDataTable = (props) => {
  const {
    tableRef,
    salesData,
    editedRow,
    editableIndex,
    handleEdit,
    handleEditClick,
    handleSaveClick,
    handleRemoveClick,
    handlePrintClick,
    pcsEditRef,
    highlightedRows,
    setHighlightedRows
  } = props;
  // console.log("salesData: ", salesData)

  useEffect(() => {
    if (highlightedRows.length > 0) {
      const timer = setTimeout(() => {
        setHighlightedRows([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedRows]);
  

  return (
    <>
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
              <TableCell align="center" sx={{ minWidth: "50px" }}>S. No.</TableCell>
              <TableCell align="center" sx={{ minWidth: "100px" }}>Item Code</TableCell>
              <TableCell align="center" sx={{ minWidth: "150px" }}>Item Name</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>MRP</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>Pcs</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>Rate</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>Discount</TableCell>
              <TableCell align="center" sx={{ minWidth: "100px" }}>Amt (₹)</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>Brk</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>Split</TableCell>
              <TableCell align="center" sx={{ minWidth: "90px" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="purchase-data-table">
            {salesData?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: highlightedRows.includes(index) ? "rgba(25, 118, 210, 0.15)" : "#fff",
                  transition: "background-color 0.5s ease",
                }}
                onAnimationEnd={() => {
                  
                  if (highlightedRows.includes(index)) {
                    setHighlightedRows((prev) => prev.filter((i) => i !== index));
                  }
                }}
              >
                <TableCell align="center" sx={{padding: "6px 5px !important"}}>{index + 1}</TableCell>
                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                    fullWidth
                      type="text"
                      value={editedRow.itemCode || row.itemCode}
                      InputProps={{ readOnly: true }}
                      onChange={(e) =>
                        handleEdit(index, "itemCode", e.target.value)
                      }
                    />
                  ) : (
                    row.itemCode
                  )}
                </TableCell>
                <TableCell align="center" sx={{padding: "6px 5px !important"}}
                  style={{
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={row.itemName}
                >
                  {editableIndex === index ? (
                    <TextField
                    fullWidth
                      type="text"
                      value={editedRow.itemName || row.itemName}
                      InputProps={{ readOnly: true }}
                      onChange={(e) =>
                        handleEdit(index, "itemName", e.target.value)
                      }
                      style={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    />
                  ) : (
                    row.itemName
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                    fullWidth
                      value={editedRow.mrp || row.mrp}
                      onChange={(e) => handleEdit(index, "mrp", e.target.value)}
                    />
                  ) : (
                    row.mrp
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                    fullWidth
                      type="text"
                      value={editedRow.batch || row.batch}
                      onChange={(e) =>
                        handleEdit(index, "batch", e.target.value)
                      }
                    />
                  ) : (
                    row.batch
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                    fullWidth
                      value={editedRow.pcs || row.pcs}
                      onChange={(e) => handleEdit(index, "pcs", e.target.value)}
                      inputRef={pcsEditRef}
                    />
                  ) : (
                    row.pcs
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                    fullWidth
                      value={editedRow.rate || row.rate}
                      onChange={(e) =>
                        handleEdit(index, "rate", e.target.value)
                      }
                    />
                  ) : (
                    row.rate
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                    fullWidth
                      value={editedRow.discount || row.discount}
                      onChange={(e) =>
                        handleEdit(index, "discount", e.target.value)
                      }
                    />
                  ) : (
                    row.discount
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                    fullWidth
                      value={editedRow.amount || row.amount}
                      onChange={(e) =>
                        handleEdit(index, "amount", e.target.value)
                      }
                    />
                  ) : (
                    row.amount
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                    fullWidth
                      value={editedRow.brk || row.brk}
                      onChange={(e) => handleEdit(index, "brk", e.target.value)}
                    />
                  ) : (
                    row.brk
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                    fullWidth
                      value={editedRow.split || row.split}
                      onChange={(e) =>
                        handleEdit(index, "split", e.target.value)
                      }
                    />
                  ) : (
                    row.split
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
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
                  <PrintIcon
                    sx={{ cursor: "pointer", color: "Highlight" }}
                    onClick={() => handlePrintClick(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SalebillDataTable;
