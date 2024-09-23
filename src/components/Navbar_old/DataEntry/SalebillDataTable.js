// saleBill data table:
import React from "react";
import {
  Input,
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
    pcsEditRef
  } = props;
  // console.log("salesData: ", salesData)

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
              <TableCell>S. No.</TableCell>
              <TableCell>Item Code</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>MRP</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Pcs</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Amt (₹)</TableCell>
              <TableCell>Brk</TableCell>
              <TableCell>Split</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="purchase-data-table">
            {salesData?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: "#fff",
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {editableIndex === index ? (
                    <Input
                      type="text"
                      value={editedRow.itemCode || row.itemCode}
                      readOnly
                      onChange={(e) =>
                        handleEdit(index, "itemCode", e.target.value)
                      }
                    />
                  ) : (
                    row.itemCode
                  )}
                </TableCell>
                <TableCell
                  style={{
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={row.itemName}
                >
                  {editableIndex === index ? (
                    <Input
                      type="text"
                      value={editedRow.itemName || row.itemName}
                      readOnly
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

                <TableCell>
                  {editableIndex === index ? (
                    <Input
                      value={editedRow.mrp || row.mrp}
                      onChange={(e) => handleEdit(index, "mrp", e.target.value)}
                    />
                  ) : (
                    row.mrp
                  )}
                </TableCell>

                <TableCell>
                  {editableIndex === index ? (
                    <Input
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

                <TableCell>
                  {editableIndex === index ? (
                    <Input
                      value={editedRow.pcs || row.pcs}
                      onChange={(e) => handleEdit(index, "pcs", e.target.value)}
                      inputRef={pcsEditRef}
                    />
                  ) : (
                    row.pcs
                  )}
                </TableCell>

                <TableCell>
                  {editableIndex === index ? (
                    <Input
                      value={editedRow.rate || row.rate}
                      onChange={(e) =>
                        handleEdit(index, "rate", e.target.value)
                      }
                    />
                  ) : (
                    row.rate
                  )}
                </TableCell>

                <TableCell>
                  {editableIndex === index ? (
                    <Input
                      value={editedRow.discount || row.discount}
                      onChange={(e) =>
                        handleEdit(index, "discount", e.target.value)
                      }
                    />
                  ) : (
                    row.discount
                  )}
                </TableCell>

                <TableCell>
                  {editableIndex === index ? (
                    <Input
                      value={editedRow.amount || row.amount}
                      onChange={(e) =>
                        handleEdit(index, "amount", e.target.value)
                      }
                    />
                  ) : (
                    row.amount
                  )}
                </TableCell>

                <TableCell>
                  {editableIndex === index ? (
                    <Input
                      value={editedRow.brk || row.brk}
                      onChange={(e) => handleEdit(index, "brk", e.target.value)}
                    />
                  ) : (
                    row.brk
                  )}
                </TableCell>

                <TableCell>
                  {editableIndex === index ? (
                    <Input
                      value={editedRow.split || row.split}
                      onChange={(e) =>
                        handleEdit(index, "split", e.target.value)
                      }
                    />
                  ) : (
                    row.split
                  )}
                </TableCell>

                <TableCell>
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
