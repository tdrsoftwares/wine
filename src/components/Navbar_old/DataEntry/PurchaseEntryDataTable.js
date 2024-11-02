import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { customTheme } from "../../../utils/customTheme";

const PurchaseEntryDataTable = (props) => {
  const {
    tableRef,
    purchases,
    editableIndex,
    handleEdit,
    handleEditClick,
    handleSaveClick,
    handleRemovePurchasesTableRow,
    editedRow,
  } = props;
  return (
    <ThemeProvider theme={customTheme}>
      <TableContainer
        component={Paper}
        ref={tableRef}
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
              <TableCell align="center" sx={{ minWidth: "100px" }}>Batch</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>Case</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>Pcs</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>Brk</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>Pur Rate</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>Btl Rate</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>GRO</TableCell>
              <TableCell align="center" sx={{ minWidth: "80px" }}>SP</TableCell>
              <TableCell align="center" sx={{ minWidth: "120px" }}>Amt(₹)</TableCell>
              <TableCell align="center" sx={{ minWidth: "90px" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="purchase-data-table">
            {purchases.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: "#fff",
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
                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                      type="text"
                      value={editedRow.itemName || row.itemName}
                      InputProps={{ readOnly: true }}
                      onChange={(e) =>
                        handleEdit(index, "itemName", e.target.value)
                      }
                    />
                  ) : (
                    row.itemName
                  )}
                </TableCell>
                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
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
                      value={
                        editedRow.case !== undefined ? editedRow.case : row.case
                      }
                      onChange={(e) =>
                        handleEdit(index, "case", e.target.value)
                      }
                    />
                  ) : (
                    row.case
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                      value={editedRow.pcs || row.pcs}
                      onChange={(e) => handleEdit(index, "pcs", e.target.value)}
                    />
                  ) : (
                    row.pcs
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
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
                      value={editedRow.purchaseRate || row.purchaseRate}
                      onChange={(e) =>
                        handleEdit(index, "purchaseRate", e.target.value)
                      }
                    />
                  ) : (
                    row.purchaseRate
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                      value={editedRow.btlRate || row.btlRate}
                      onChange={(e) =>
                        handleEdit(index, "btlRate", e.target.value)
                      }
                    />
                  ) : (
                    row.btlRate
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                      value={editedRow.gro || row.gro}
                      InputProps={{ readOnly: true }}
                      onChange={(e) => handleEdit(index, "gro", e.target.value)}
                    />
                  ) : (
                    row.gro
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                      value={editedRow.sp || row.sp}
                      InputProps={{ readOnly: true }}
                      onChange={(e) => handleEdit(index, "sp", e.target.value)}
                    />
                  ) : (
                    row.sp
                  )}
                </TableCell>

                <TableCell align="center" sx={{padding: "6px 5px !important"}}>
                  {editableIndex === index ? (
                    <TextField
                      size="medium"
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
                    onClick={() => handleRemovePurchasesTableRow(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default PurchaseEntryDataTable;
