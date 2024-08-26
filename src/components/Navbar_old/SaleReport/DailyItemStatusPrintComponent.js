import React, { forwardRef, useEffect, useState } from "react";
import { Typography, Box, Divider } from "@mui/material";
import dayjs from "dayjs";
import { getLicenseInfo } from "../../../services/licenseService";
import { NotificationManager } from "react-notifications";

const DailyItemStatusPrintComponent = forwardRef(
  (
    {
      filterData,
      allItemStatusData,
      totalOpeningBalance,
      totalClosingBalance,
      totalPurchased,
      totalSold,
    },
    ref
  ) => {
    const todaysDate = new Date().toLocaleDateString();

    const [licenseDetails, setLicenseDetails] = useState({});
    // console.log("LicenseDetailsProvider called", licenseDetails);

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
          NotificationManager.error("No License Data Found", "Error");
        }
      } catch (error) {
        NotificationManager.error(
          "Error fetching license. Please try again later.",
          "Error"
        );
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
            DAILY ITEM STATUS
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
              {filterData.dateTo
                ? `Date: ${dayjs(filterData.dateTo).format("DD/MM/YYYY")}`
                : ""}
            </Typography>
          </Box>

          {filterData.dateFrom ||
            (filterData.dateTo && <Divider sx={{ my: 1 }} />)}

          <Typography variant="body2" sx={{ fontSize: "10px" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Box sx={{ width: "25%", fontWeight: "bold" }}>ITEM</Box>
              <Box sx={{ width: "15%", fontWeight: "bold" }}>OPENING</Box>
              <Box sx={{ width: "15%", fontWeight: "bold" }}>PUR.</Box>
              <Box sx={{ width: "15%", fontWeight: "bold" }}>SOLD</Box>
              <Box sx={{ width: "15%", fontWeight: "bold" }}>CLOSING</Box>
            </Box>
          </Typography>
          {allItemStatusData.map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ fontSize: "10px", mb: 1 }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "25%" }}>{item.item}</Box>
                <Box sx={{ width: "15%" }}>
                  {filterData.isBLTrue
                    ? item.openingBalance?.toFixed(3)
                    : item.openingBalance}
                </Box>
                <Box sx={{ width: "15%" }}>
                  {filterData.isBLTrue
                    ? item.totalPurchased?.toFixed(3)
                    : item.totalPurchased}
                </Box>
                <Box sx={{ width: "15%" }}>
                  {filterData.isBLTrue
                    ? item.totalSold?.toFixed(3)
                    : item.totalSold}
                </Box>
                <Box sx={{ width: "15%" }}>
                  {filterData.isBLTrue
                    ? item.closingBalance?.toFixed(3)
                    : item.closingBalance}
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
            <Typography variant="body1" sx={{ fontSize: "10px" }}></Typography>
            <Typography variant="body1" sx={{ fontSize: "10px" }}></Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "10px" }}>
              {`Total Opening :
              ${
                filterData.isBLTrue
                  ? totalOpeningBalance?.toFixed(3)
                  : totalOpeningBalance
              }`}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "10px" }}>
              {`Total Sold :
              ${filterData.isBLTrue ? totalSold?.toFixed(3) : totalSold}`}
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
              ${
                filterData.isBLTrue
                  ? totalClosingBalance?.toFixed(3)
                  : totalClosingBalance
              }`}
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "10px" }}>
              {`Total Purchased :
              ${
                filterData.isBLTrue
                  ? totalPurchased?.toFixed(3)
                  : totalPurchased
              }`}
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

export default DailyItemStatusPrintComponent;
