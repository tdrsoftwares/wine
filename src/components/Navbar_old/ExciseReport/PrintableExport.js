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
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  const removeFieldsFromLastObject = (data) => {
    if (data.length === 0) return data;

    const modifiedData = [...data];
    const lastObject = modifiedData[modifiedData.length - 1];

    delete lastObject.group;
    delete lastObject.sNo;

    return modifiedData;
  };

  const modifiedData = removeFieldsFromLastObject(data);

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
            {modifiedData.map((row) => (
              <TableRow key={row.indexNo}>
                <TableCell align="left" sx={cellStyle}>
                  {row.indexNo}
                </TableCell>
                <TableCell align="left" sx={cellStyle}>
                  {row.categoryName}
                </TableCell>
                <TableCell align="right" sx={cellStyle}>
                  {row.openingBalance?.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={cellStyle}>
                  {row.purchases?.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={cellStyle}>
                  {row.sales?.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={cellStyle}>
                  {row.closingBalance?.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={cellStyle}>
                  {row.salesInJune2023?.toFixed(2) || "0.00"}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={1} sx={cellStyle}>
                {data?.length + 1}
              </TableCell>
              <TableCell colSpan={5} sx={cellStyle}>
                Initial Grant Fee for the next Period of Settlement
              </TableCell>
              <TableCell align="right" sx={cellStyle}>
                0.00
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={1} sx={cellStyle}>
                {data?.length + 2}
              </TableCell>
              <TableCell colSpan={5} sx={cellStyle}>
                Composition Money
              </TableCell>
              <TableCell align="right" sx={cellStyle}>
                0.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1} sx={cellStyle}>
                {data?.length + 3}
              </TableCell>
              <TableCell colSpan={5} sx={cellStyle}>
                Other fees paid, if any
              </TableCell>
              <TableCell align="right" sx={cellStyle}>
                0.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1} sx={cellStyle}>
                {data?.length + 4}
              </TableCell>
              <TableCell colSpan={5} sx={cellStyle}>
                Total fees & other moneys paid
              </TableCell>
              <TableCell align="right" sx={cellStyle}>
                0.00
              </TableCell>
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
  const XLXS = require("xlsx");

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const addExtraRows = (data) => {
    const extraRows = [
      {
        indexNo: data.length + 1,
        categoryName: "Initial Grant Fee for the next Period of Settlement",
        openingBalance: 0,
        purchases: 0,
        sales: 0,
        closingBalance: 0,
        salesInJune2023: 0,
      },
      {
        indexNo: data.length + 2,
        categoryName: "Composition Money",
        openingBalance: 0,
        purchases: 0,
        sales: 0,
        closingBalance: 0,
        salesInJune2023: 0,
      },
      {
        indexNo: data.length + 3,
        categoryName: "Other fees paid, if any",
        openingBalance: 0,
        purchases: 0,
        sales: 0,
        closingBalance: 0,
        salesInJune2023: 0,
      },
      {
        indexNo: data.length + 4,
        categoryName: "Total fees & other moneys paid",
        openingBalance: 0,
        purchases: 0,
        sales: 0,
        closingBalance: 0,
        salesInJune2023: 0,
      },
    ];
    return [...data, ...extraRows];
  };

  const exportToExcel = () => {
    const modifiedData = addExtraRows(data);
    const ws = XLXS.utils.json_to_sheet(modifiedData);
    const wb = XLXS.utils.book_new();
    XLXS.utils.book_append_sheet(wb, ws, "MonthlyStatement");
    const excelBuffer = XLXS.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "Monthly_Statement.xlsx");
  };

  const exportToPDF = () => {
    const input = document.getElementById("pdfContent");
  
    if (!input) {
      console.error("Element not found: #pdfContent");
      return;
    }
  
    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      scale: 2,
      logging: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      onclone: (documentClone) => {
        documentClone.getElementById("pdfContent").style.display = "block";
      },
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
  
        if (imgData === "data:,") {
          console.error("Canvas captured empty data.");
          return;
        }
  
  
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Monthly_Statement.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };
  
  
    

  return (
    <>
      <Box id="pdfContent" sx={{ display: "none" }}>
          <PrintComponent ref={componentRef} data={data} />
      </Box>
      <div>
        <Button
          color="warning"
          size="small"
          variant="contained"
          sx={{ padding: "4px 10px", fontSize: "11px", marginRight: 1 }}
          onClick={handlePrint}
        >
          Print
        </Button>
        <Button
          color="success"
          size="small"
          variant="contained"
          sx={{ padding: "4px 10px", fontSize: "11px", marginRight: 1 }}
          onClick={exportToExcel}
        >
          Export to Excel
        </Button>
        <Button
          color="error"
          size="small"
          variant="contained"
          sx={{ padding: "4px 10px", fontSize: "11px" }}
          onClick={exportToPDF}
        >
          Export to PDF
        </Button>
      </div>
    </>
  );
};

export default PrintableReport;
