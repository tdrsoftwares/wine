import React, { forwardRef, useEffect, useState } from "react";
import { Typography, Box, Divider } from "@mui/material";
import dayjs from "dayjs";
import { getLicenseInfo } from "../../../services/licenseService";
import { NotificationManager } from "react-notifications";

const DailySalePrintComponent = forwardRef(
  ({ filterData, allSalesData, totalAmount, totalPcs, totalVolume }, ref) => {
    const todaysDate = new Date().toLocaleDateString();

    const [licenseDetails, setLicenseDetails] = useState({});
    // console.log("allSalesData ---> ", allSalesData);

    const fetchLicenseData = async () => {
      try {
        const response = await getLicenseInfo();
        // console.log("lic response ---> ", response);

        if (response.statusCode === 200) {
          const licenseData = response?.data[0];
          setLicenseDetails({
            id: licenseData._id,
            nameOfLicence: licenseData.nameOfLicence,
            businessType: licenseData.businessType,
            address: licenseData.address,
            district: licenseData.district,
            phoneNo: licenseData.phoneNo,

            fiancialPeriodTo: licenseData.fiancialPeriodTo,
            fiancialPeriodfrom: licenseData.fiancialPeriodfrom,
            licenceId: licenseData.licenceId,
            billCategory: licenseData.billCategory,
            noOfBillCopies: licenseData.noOfBillCopies,

            autoBillPrint: licenseData.autoBillPrint,
            eposUserId: licenseData.eposUserId,
            eposPassword: licenseData.eposPassword,
            noOfItemPerBill: licenseData.noOfItemPerBill,
            perBillMaxWine: licenseData.perBillMaxWine,
            perBillMaxCs: licenseData.perBillMaxCs,

            billMessages: licenseData.billMessages,
            messageMobile: licenseData.messageMobile,
          });
        }

        if (response?.response?.status === 400) {
          setLicenseDetails([]);
          // NotificationManager.error("No License Data Found", "Error");
        }
      } catch (error) {
        // NotificationManager.error(
        //   "Error fetching license. Please try again later.",
        //   "Error"
        // );
      }
    };

    useEffect(() => {
      fetchLicenseData();
    }, []);

    return (
      <div ref={ref}>
      <Box
        // ref={ref}
        sx={{
          p: 1,
          width: "80mm",
          fontFamily: "monospace",
          fontSize: "10px",
          "@media print": {
            fontSize: "12px",
            margin: "0.4em",
          },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          align="center"
          sx={{ fontSize: "12px", fontWeight: "bold", mb: 1 }}
        >
          DAILY SALE REPORT
        </Typography>

        <Typography
          variant="h2"
          component="h1"
          align="center"
          sx={{ fontSize: "12px" }}
        >
          {licenseDetails?.nameOfLicence}
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ fontSize: "12px" }}
        >
          {licenseDetails?.businessType}
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ fontSize: "10px" }}
        >
          {licenseDetails?.address}
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ fontSize: "10px" }}
        >
          {licenseDetails?.district || ""}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "10px",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "10px" }}>
            {filterData.dateFrom
              ? `Date from: ${dayjs(filterData.dateFrom).format("DD/MM/YYYY")}`
              : ""}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "10px" }}>
            {filterData.dateTo
              ? `Date to: ${dayjs(filterData.dateTo).format("DD/MM/YYYY")}`
              : ""}
          </Typography>
        </Box>

        {filterData.dateFrom ||
          (filterData.dateTo && <Divider sx={{ my: 1 }} />)}

        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Box sx={{ width: "30%", fontWeight: "bold" }}>ITEM</Box>
            <Box sx={{ width: "10%", fontWeight: "bold" }}>QTY</Box>
            <Box sx={{ width: "15%", fontWeight: "bold" }}>RATE</Box>
            <Box sx={{ width: "15%", fontWeight: "bold" }}>AMT.</Box>
          </Box>
        </Typography>
        {allSalesData.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{ fontSize: "10px", mb: 1 }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ width: "30%" }}>{item.itemName}</Box>
              <Box sx={{ width: "10%" }}>{item.totalPcs}</Box>
              <Box sx={{ width: "15%" }}>{item.rate}</Box>
              <Box sx={{ width: "15%" }}>{item.totalAmount?.toFixed(2)}</Box>
            </Box>
          </Typography>
        ))}

        <Divider sx={{ my: 1 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "10px",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "10px" }}>
            Total Qty: {totalPcs}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "10px" }}>
            Total Volume: {totalVolume?.toFixed(2) + "ltr"}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "10px" }}>
            Total Amount: {totalAmount?.toFixed(2)}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
      </Box>
      </div>
    );
  }
);

export default DailySalePrintComponent;
