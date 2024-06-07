import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const SuppliersBalanceReport = () => {
  const tableData = [
    {
      supplierName: "Supplier A",
      address: "123 Main St, City, Country",
      closeBal: "$1000",
    },
    {
      supplierName: "Supplier B",
      address: "456 Elm St, City, Country",
      closeBal: "$1500",
    },
    {
      supplierName: "Supplier C",
      address: "789 Oak St, City, Country",
      closeBal: "$2000",
    },
    {
      supplierName: "Supplier D",
      address: "101 Pine St, City, Country",
      closeBal: "$1200",
    },
    {
      supplierName: "Supplier E",
      address: "202 Maple St, City, Country",
      closeBal: "$1800",
    },
    {
      supplierName: "Supplier F",
      address: "303 Cedar St, City, Country",
      closeBal: "$1600",
    },
    {
      supplierName: "Supplier G",
      address: "404 Birch St, City, Country",
      closeBal: "$2200",
    },
    {
      supplierName: "Supplier H",
      address: "505 Walnut St, City, Country",
      closeBal: "$1900",
    },
    {
      supplierName: "Supplier I",
      address: "606 Pineapple St, City, Country",
      closeBal: "$2100",
    },
    {
      supplierName: "Supplier J",
      address: "707 Orange St, City, Country",
      closeBal: "$2300",
    },
  ];

  return (
    <Box sx={{ p: 2, width: "900px" }}>
      <Typography variant="h5" component="div" gutterBottom>
        Supplier Report
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Suppliers Balance Report
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ marginTop: 4, maxHeight: 500, overflowY: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Close Bal.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: "8px" }}>
                  <TextField
                    size="small"
                    fullWidth
                    value={index + 1}
                    InputProps={{ readOnly: true }}
                  />
                </TableCell>

                <TableCell sx={{ padding: "8px" }}>
                  <TextField
                    size="small"
                    value={row.supplierName || ""}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </TableCell>

                <TableCell sx={{ padding: "8px" }}>
                  <TextField
                    size="small"
                    value={row.address || ""}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </TableCell>

                <TableCell sx={{ padding: "8px" }}>
                  <TextField
                    size="small"
                    value={row.closeBal || ""}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SuppliersBalanceReport;
