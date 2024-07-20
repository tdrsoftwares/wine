import React, { useRef, forwardRef } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useLicenseContext } from "../../../utils/licenseContext";
import dayjs from "dayjs";
const cellStyle = {
    border: "1px solid #000",
  };
const PrintComponent = forwardRef(({ data }, ref) => {
  const { licenseDetails } = useLicenseContext();
  const today = new Date();
  const todayDate = dayjs(today);
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const todaysMonth = todayDate.month();
  const todaysYear = todayDate.year();

  return (
    <Box ref={ref} sx={{ padding: 1, color: "#000" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 0.5,
        }}
      >
        <Box>
          <Typography variant="subtitle2">
            Licensee Id No: {licenseDetails?.licenceId}
          </Typography>
          <Typography variant="subtitle2">
            Statement Month: {allMonths[todaysMonth]}
          </Typography>
          <Typography variant="subtitle2">
            Licensee Name: {licenseDetails?.nameOfLicence}
          </Typography>
          <Typography variant="subtitle2">
            District Name: {licenseDetails?.district}
          </Typography>
          <Typography variant="subtitle2">
            Contact No: {licenseDetails?.phoneNo}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="subtitle2">
            <span style={{ display: "block" }}>Government of West Bengal</span>
            <span style={{ display: "block" }}>Excise Department</span>
          </Typography>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 0.5,
          border: "1px solid #000",
          height: "auto",
          overflow: "hidden",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", backgroundColor: "#dae4ed" }}
              >
                Index
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#dae4ed" }}
              >
                Category
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", backgroundColor: "#dae4ed" }}
              >
                Opening Balance
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", backgroundColor: "#dae4ed" }}
              >
                Purchases
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", backgroundColor: "#dae4ed" }}
              >
                Sales
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", backgroundColor: "#dae4ed" }}
              >
                Closing Balance
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", backgroundColor: "#dae4ed" }}
              >
                Sales in {allMonths[todaysMonth] + " " + (todaysYear - 1)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.indexNo}>
                <TableCell align="left" sx={cellStyle}>{row.indexNo}</TableCell>
                <TableCell align="left" sx={cellStyle}>{row.categoryName}</TableCell>
                <TableCell align="right" sx={cellStyle}>
                  {row.openingBalance?.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={cellStyle}>{row.purchases?.toFixed(2)}</TableCell>
                <TableCell align="right" sx={cellStyle}>{row.sales?.toFixed(2)}</TableCell>
                <TableCell align="right" sx={cellStyle}>
                  {row.closingBalance?.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={cellStyle}>
                  {row.salesInJune2023?.toFixed(2) || "0.00"}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={1} sx={cellStyle}>{data?.length + 1}</TableCell>
              <TableCell colSpan={5} sx={cellStyle}>
                Initial Grant Fee for the next Period of Settlement
              </TableCell>
              <TableCell align="right" sx={cellStyle}>0.00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={1} sx={cellStyle}>{data?.length + 2}</TableCell>
              <TableCell colSpan={5} sx={cellStyle}>Composition Money</TableCell>
              <TableCell align="right" sx={cellStyle}>0.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1} sx={cellStyle}>{data?.length + 3}</TableCell>
              <TableCell colSpan={5} sx={cellStyle}>Other fees paid, if any</TableCell>
              <TableCell align="right" sx={cellStyle}>0.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1} sx={cellStyle}>{data?.length + 4}</TableCell>
              <TableCell colSpan={5} sx={cellStyle}>Total fees & other moneys paid</TableCell>
              <TableCell align="right" sx={cellStyle}>0.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontSize: "10px" }} gutterBottom>
          Generated On: {todayDate.format("DD/MM/YYYY")}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: "10px" }} gutterBottom>
          Page No: 1
        </Typography>
      </Box>
    </Box>
  );
});

const PrintableReport = ({ data }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Box sx={{ display: "none" }}>
        <PrintComponent ref={componentRef} data={data} />
      </Box>
      <Button
        color="inherit"
        size="small"
        variant="contained"
        sx={{ padding: "4px 10px", fontSize: "11px" }}
        onClick={handlePrint}
      >
        Print
      </Button>
    </>
  );
};

export default PrintableReport;
