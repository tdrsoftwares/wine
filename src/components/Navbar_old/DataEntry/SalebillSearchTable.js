import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const SalebillSearchTable = (props) => {
  const {
    tableRef,
    searchResults,
    handleRowClick,
    setSearchMode,
    selectedRowIndex,
    isLoading,
  } = props;
  return (
    <>
      <TableContainer
        component={Paper}
        ref={tableRef}
        sx={{
          marginTop: 0.8,
          height: 300,
          width: 850,
          overflowY: "unset",
          overflowX: "auto",
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
              <TableCell align="center">S. No.</TableCell>
              <TableCell align="center">Item Code</TableCell>
              <TableCell align="center">Item Name</TableCell>
              <TableCell align="center">MRP</TableCell>
              <TableCell align="center">Batch</TableCell>
              <TableCell align="center">Closing Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(searchResults) && searchResults.length > 0 ? (
              searchResults.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => {
                    handleRowClick(index);
                    setSearchMode(false);
                  }}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      index === selectedRowIndex
                        ? "rgba(25, 118, 210, 0.08) !important"
                        : "#fff !important",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{ padding: "14px", paddingLeft: 2 }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.itemCode || "No Data"}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.item?.name || "No Data"}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.mrp || 0}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.batchNo || 0}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.currentStock || 0}
                  </TableCell>
                </TableRow>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{
                    backgroundColor: "#fff !important",
                  }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{
                    backgroundColor: "#fff !important",
                  }}
                >
                  No Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SalebillSearchTable;
