import React, { forwardRef, useEffect, useState } from "react";
import { Typography, Box, Divider } from "@mui/material";
import dayjs from "dayjs";
import { NotificationManager } from "react-notifications";
import { getLicenseInfo } from "../../services/licenseService";

const CatLedgerPackPrintComponent = forwardRef(
  (
    {
      dateFrom,
      dateTo,
      blOnly,
      allRowData,
      totalPur,
      totalVolume,
      totalOpeningBal,
      totalSales,
      totalClosingBal,
    },
    ref
  ) => {
    const [licenseDetails, setLicenseDetails] = useState({});
    console.log("LicenseDetailsProvider called", dateFrom, dateTo);

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
      <Box sx={printModalStyles}>
        <Box ref={ref} sx={{ p: 1, width: "80mm" }}>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{ fontSize: "12px", fontWeight: "bold", mb: 1 }}
          >
            CATEGORY PACK LEDGER
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
              {dateFrom
                ? `Date from: ${dayjs(dateFrom).format("DD/MM/YYYY")}`
                : ""}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "10px" }}>
              {dateTo ? `Date to: ${dayjs(dateTo).format("DD/MM/YYYY")}` : ""}
            </Typography>
          </Box>

          {(dateFrom || dateTo) && <Divider sx={{ my: 1 }} />}

          <Typography variant="body2" sx={{ fontSize: "10px" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Box sx={{ width: "25%", fontWeight: "bold" }}>CATEGORY</Box>
              <Box sx={{ width: "15%", fontWeight: "bold" }}>OPENING</Box>
              <Box sx={{ width: "15%", fontWeight: "bold" }}>PUR.</Box>
              <Box sx={{ width: "15%", fontWeight: "bold" }}>SOLD</Box>
              <Box sx={{ width: "15%", fontWeight: "bold" }}>CLOSING</Box>
            </Box>
          </Typography>
          {allRowData.map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ fontSize: "10px", mb: 1 }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "25%" }}>{item.categoryName}</Box>
                <Box sx={{ width: "15%" }}>
                  {item.openingBalance}
                </Box>
                <Box sx={{ width: "15%" }}>
                  {item.purchases}
                </Box>
                <Box sx={{ width: "15%" }}>
                  {item.sales}
                </Box>
                <Box sx={{ width: "15%" }}>
                  {item.closingBalance}
                </Box>
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
              {`Total Opening :
              ${totalOpeningBal}`}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "10px" }}>
              {`Total Sold :
              ${totalSales}`}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "10px" }}>
              {`Total Closing :  
              ${totalClosingBal}`}
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "10px" }}>
              {`Total Purchased :
              ${totalPur}`}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />
        </Box>
      </Box>
    );
  }
);

const printModalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80mm",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
  textAlign: "center",
  display: "none",
};

export default CatLedgerPackPrintComponent;
