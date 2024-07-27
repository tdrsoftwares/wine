import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Input,
  Select,
} from "@mui/material";
import { NotificationManager } from "react-notifications";
import {
  createLicenseInfo,
  getLicenseInfo,
  updateLicenseInfo,
} from "../../../services/licenseService";
import { useLicenseContext } from "../../../utils/licenseContext";

const LicenseeInfo = ({authenticatedUser}) => {
  const { setLicenseDetails } = useLicenseContext();

  let [getData, setGetData] = useState([]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(() => {
    // Initialize state from localStorage if it exists
    const storedValue = localStorage.getItem("isButtonDisabled");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [licenseData, setLicenseData] = useState({
    id: "",
    nameOfLicence: "",
    businessType: "",
    address: "",
    district: "",
    phoneNo: 0,

    fiancialPeriodTo: "mm/dd/yyyy",
    fiancialPeriodfrom: "mm/dd/yyyy",
    licenceId: "",
    billCategory: 0,
    noOfBillCopies: 0,

    autoBillPrint: "no",
    eposUserId: "",
    eposPassword: "",
    noOfItemPerBill: 0,
    perBillMaxWine: 0,
    perBillMaxCs: 0,

    billMessages: "",
    messageMobile: 0,
  });

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setLicenseData({
      ...licenseData,
      [name]: value,
    });
  };
  let obj = {};

  useEffect(() => {
    localStorage.setItem("isButtonDisabled", JSON.stringify(isButtonDisabled));
    const fetchData = async () => {
      try {
        const getLicenseData = await getLicenseInfo(); // Assuming async function to fetch license data

        Object.assign(obj, getLicenseData.data[0]); // Copy properties from first object in getLicenseData.data to obj
        setLicenseDetails(getLicenseData?.data[0]);

        // Check if obj is populated correctly

        // Update state with fetched data
        setLicenseData({
          ...licenseData,
          id: obj._id,
          nameOfLicence: obj.nameOfLicence,
          businessType: obj.businessType,
          address: obj.address,
          district: obj.district,
          phoneNo: obj.phoneNo,

          fiancialPeriodTo: obj.fiancialPeriodTo,
          fiancialPeriodfrom: obj.fiancialPeriodfrom,
          licenceId: obj.licenceId,
          billCategory: obj.billCategory,
          noOfBillCopies: obj.noOfBillCopies,

          autoBillPrint: obj.autoBillPrint,
          eposUserId: obj.eposUserId,
          eposPassword: obj.eposPassword,
          noOfItemPerBill: obj.noOfItemPerBill,
          perBillMaxWine: obj.perBillMaxWine,
          perBillMaxCs: obj.perBillMaxCs,

          billMessages: obj.billMessages,
          messageMobile: obj.messageMobile,
        });
      } catch (error) {
        console.log(error);
      }
    };

    // console.log("id: "+licenseData.id)

    fetchData(); // Call the fetch data function
  }, [isButtonDisabled, authenticatedUser]);

  const save = async (e) => {
    // const updateCategoryData = await axiosInstance.put(apiURL, payload);
    const payload = {
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
    };
    e.preventDefault();
    try {
      const response = await createLicenseInfo(payload);

      // console.log(response.data)
      NotificationManager.success(
        "Data Submitted Successfully",
        response.data.message
      );
      setIsButtonDisabled(true);
    } catch (error) {
      console.log(error);
      // Extract the error message or relevant information
      let errorMessage = "An error occurred while submitting the data.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      NotificationManager.error(errorMessage);
    }
    // console.log(licenseData);
    // console.log("payload"+payload);
  };
  // console.log("obj"+Object.keys(obj))
  const edit = async (e) => {
    // const updateCategoryData = await axiosInstance.put(apiURL, payload);
    const payload = {
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
    };
    e.preventDefault();

    try {
      const response = await updateLicenseInfo(payload, licenseData.id);

      //  console.log(response.data)
      NotificationManager.success(
        "Data Updated Successfully",
        response.data.message
      );
    } catch (error) {
      console.log(error);
      // Extract the error message or relevant information
      let errorMessage = "An error occurred while updatting the data.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      NotificationManager.error(errorMessage);
    }
    //  console.log(licenseData);
    //  console.log("payload"+Object.entries(payload),licenseData.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can send formData to your backend server or process it further

    // Reset form after submission

    setLicenseData({
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
    });
  };
  // console.log("form Submitted"+[Object.entries(licenseData)]);
  const clearForm = () => {};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid item container spacing={4} sx={{ display: "flex" }}>
        <Grid
          item
          xs={6}
          p={4}
          sx={{
            marginTop: "50px",
            marginLeft: "40px",
            textAlign: "center",
            background: "#d3dce8",
            borderRadius: "6px",
          }}
        >
          <h1 sx={{ marginBottom: "30px" }}>Information of License</h1>

          <Grid container spacing={2} sx={{ marginTop: "10px" }}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="nameOfLicence">
                NAME OF LICENSE/SHOP
              </InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "60%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                {/* <InputLabel htmlFor="nameOfLicence">NAME OF LICENSE/SHOP</InputLabel> */}
                <Input
                  required
                  id="nameOfLicence"
                  name="nameOfLicence"
                  value={licenseData.nameOfLicence}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="businessType">BUSINESS TYPE</InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "60%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  required
                  id="businessType"
                  fullWidth
                  name="businessType"
                  value={licenseData.businessType}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="address">ADDRESS</InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "60%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  required
                  id="address"
                  fullWidth
                  name="address"
                  value={licenseData.address}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="district">DISTRICT</InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "60%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  required
                  id="district"
                  fullWidth
                  name="district"
                  value={licenseData.district}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="phoneNo">PHONE NO</InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "60%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  required
                  type="number"
                  id="phoneNo"
                  fullWidth
                  name="phoneNo"
                  value={licenseData.phoneNo}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="fiancialPeriodTo">
                FINANCIAL PERIOD
              </InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "20%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  required
                  type="date"
                  id="fiancialPeriodTo"
                  fullWidth
                  name="fiancialPeriodTo"
                  value={licenseData.fiancialPeriodTo}
                  onChange={handleInputChange1}
                />
              </FormControl>
              TO
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "20%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  required
                  type="date"
                  id="fiancialPeriodfrom"
                  fullWidth
                  name="fiancialPeriodfrom"
                  value={licenseData.fiancialPeriodfrom}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="licenceId">LICENSE ID(12 DIGIT)</InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "60%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  required
                  id="licenceId"
                  fullWidth
                  name="licenceId"
                  value={licenseData.licenceId}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="billCategory">BILL CATEGORY</InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "10%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  type="number"
                  required
                  id="billCategory"
                  fullWidth
                  name="billCategory"
                  value={licenseData.billCategory}
                  onChange={handleInputChange1}
                />
              </FormControl>

              <InputLabel htmlFor="noOfBillCopies">
                NO OF BILL COPIES
              </InputLabel>

              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "19%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  No of Copies
                </InputLabel>
                <Select
                  required
                  type="number"
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={licenseData.noOfBillCopies}
                  name="noOfBillCopies"
                  onChange={handleInputChange1}
                  label="No of Copies"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "12px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="autoBillPrint">AUTO BILL PRINT</InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  minWidth: 200,
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Auto Bill Print
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={licenseData.autoBillPrint}
                  name="autoBillPrint"
                  onChange={handleInputChange1}
                  label="Auto Bill Print"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"YES"}>Yes</MenuItem>
                  <MenuItem value={"NO"}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "18px",
                padding: "12px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={save}
                disabled={isButtonDisabled}
              >
                SAVE
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={edit}
              >
                EDIT
              </Button>
              <Button variant="contained" color="error" type="submit">
                BACK
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            marginTop: "50px",
            marginLeft: "25px",
            textAlign: "left",
            background: "#d3dce8",
            padding: "12px",
            borderRadius: "6px",
          }}
        >
          <div
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            <h3>Wine Application Developed By: TDR SOFTWARE PRIVATE LIMITED</h3>
            <h3>COMPANY CIN NO: U72300WB2013PTC196614</h3>
            <h3>GSTIN: 19AAECT848D1ZX</h3>
            <h3>CONTACT NO: 9830657184/ 8670920038</h3>
          </div>

          <Grid container spacing={2} sx={{ marginTop: "10px" }}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
                overflowX: "auto",
              }}
            >
              <InputLabel htmlFor="eposUserId">
                EPOS USER ID(15 DIGIT)
              </InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "30%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  required
                  id="eposUserId"
                  fullWidth
                  name="eposUserId"
                  value={licenseData.eposUserId}
                  onChange={handleInputChange1}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: "25%", height: "40px", fontSize: "12px" }}
              >
                EPOS CONFIGURE
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="eposPassword">EPOS PASSWORD</InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "50%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  required
                  id="eposPassword"
                  fullWidth
                  name="eposPassword"
                  value={licenseData.eposPassword}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="noOfItemPerBill">
                NO OF ITEM PER BILL
              </InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "50%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  type="number"
                  required
                  id="noOfItemPerBill"
                  fullWidth
                  name="noOfItemPerBill"
                  value={licenseData.noOfItemPerBill}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="perBillMaxWine">
                Per Bill Max Wine(ML)
              </InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "50%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  type="number"
                  required
                  id="perBillMaxWine"
                  fullWidth
                  name="perBillMaxWine"
                  value={licenseData.perBillMaxWine}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="perBillMaxCs">
                Per Bill Max CS(ML)
              </InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "50%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  type="number"
                  required
                  id="perBillMaxCs"
                  fullWidth
                  name="perBillMaxCs"
                  value={licenseData.perBillMaxCs}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="billMessages">Bill Messages</InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "50%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  required
                  id="billMessages"
                  fullWidth
                  name="billMessages"
                  value={licenseData.billMessages}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "4px",
                padding: "2px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <InputLabel htmlFor="messageMobile">Message Mobile</InputLabel>
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  width: "50%",
                  padding: "4px",
                  background: "white",
                  borderRadius: "6px",
                  borderBottom: "none",
                }}
              >
                <Input
                  type="number"
                  required
                  id="messageMobile"
                  fullWidth
                  name="messageMobile"
                  value={licenseData.messageMobile}
                  onChange={handleInputChange1}
                />
              </FormControl>
            </Grid>
            
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LicenseeInfo;
