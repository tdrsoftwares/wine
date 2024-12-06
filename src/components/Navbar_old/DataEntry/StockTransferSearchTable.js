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
import React, { useEffect, useRef } from "react";

const StockTransferSearchTable = (props) => {
  const {
    tableRef,
    canRead,
    role,
    searchResults,
    handleRowClick,
    setSearchMode,
    selectedRowIndex,
    isLoading,
  } = props;
  
  const containerRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    if (selectedRowIndex !== null && containerRef.current) {
      const container = containerRef.current;
      const selectedRow = rowRefs.current[selectedRowIndex];

      if (selectedRow) {
        const containerHeight = container.offsetHeight;
        const scrollTop = container.scrollTop;
        const rowTop = selectedRow.offsetTop;
        const rowHeight = selectedRow.offsetHeight;

        if (rowTop < scrollTop) {
          container.scrollTop = rowTop;
        }

        else if (rowTop + rowHeight > scrollTop + containerHeight) {
          container.scrollTop = rowTop + rowHeight - containerHeight;
        }
      }
    }
  }, [selectedRowIndex]);

  return (
    <TableContainer
      component={Paper}
      ref={tableRef}
      sx={{
        marginTop: 0.8,
        height: 300,
        width: 850,
        overflowY: "auto",
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
            <TableCell align="center">Current Stock</TableCell>
            <TableCell align="center">Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {canRead || role === "admin" ? (
            Array.isArray(searchResults) && searchResults.length > 0 ? (
              searchResults.map((row, index) => (
                <TableRow
                  key={index}
                  ref={(el) => (rowRefs.current[index] = el)}
                  onClick={() => {
                    handleRowClick(index);
                    setSearchMode(false);
                  }}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      index === selectedRowIndex
                        ? "rgba(25, 118, 210, 0.15) !important"
                        : "#fff !important",
                    "&:hover": {
                      backgroundColor: "rgba(25, 118, 210, 0.15) !important",
                    },
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
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: 150,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      "&:hover": {
                        overflow: "visible",
                        whiteSpace: "normal",
                        backgroundColor: "rgba(25, 118, 210, 0.15)",
                      },
                    }}
                    title={row?.item?.name || "No Data"}
                  >
                    {row?.item?.name || "No Data"}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.mrp || 0}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.batchNo || 0}
                  </TableCell>
                  {/* <TableCell align="center" sx={{ padding: "14px" }}>
                          {row?.case || 0}
                        </TableCell> */}
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.currentStock || 0}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "14px" }}>
                    {row?.item?.volume || 0}
                  </TableCell>
                </TableRow>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={10}
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
                  colSpan={10}
                  align="center"
                  sx={{
                    backgroundColor: "#fff !important",
                  }}
                >
                  No Data
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell
                colSpan={10}
                align="center"
                sx={{
                  backgroundColor: "#fff !important",
                }}
              >
                You do not have permission to view transfer data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTransferSearchTable;
