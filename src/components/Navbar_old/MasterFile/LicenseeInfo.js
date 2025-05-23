import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Input,
  Select,
  ThemeProvider,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { NotificationManager } from "react-notifications";
import {
  createLicenseInfo,
  getLicenseInfo,
  updateLicenseInfo,
} from "../../../services/licenseService";
import { useLicenseContext } from "../../../utils/licenseContext";
import { customTheme } from "../../../utils/customTheme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { usePermissions } from "../../../utils/PermissionsContext";

const LicenseeInfo = ({ authenticatedUser }) => {
  const { setLicenseDetails } = useLicenseContext();
  const { permissions, role } = usePermissions();

  const companyPermissions =
    permissions?.find((permission) => permission.moduleName === "Licence")
      ?.permissions || [];
  const canCreate = companyPermissions.includes("create");
  const canRead = companyPermissions.includes("read");
  const canUpdate = companyPermissions.includes("update");
  const canDelete = companyPermissions.includes("delete");

  let [getData, setGetData] = useState([]);
  const [editEnable, setEditEnable] = useState(false);
  const [createEnable, setCreateEnable] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isAnyFieldMissing, setIsAnyFieldMissing] = useState(true);

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

    fiancialPeriodTo: null,
    fiancialPeriodfrom: null,
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

  const clearForm = () => {
    setLicenseData({
      id: "",
      nameOfLicence: "",
      businessType: "",
      address: "",
      district: "",
      phoneNo: 0,

      fiancialPeriodTo: null,
      fiancialPeriodfrom: null,
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
  };

  const nameOfLicenceRef = useRef(null);

  const handleDateChange = (key, newValue) => {
    setLicenseData((prev) => ({
      ...prev,
      [key]: newValue ? newValue.format("YYYY-MM-DD") : null,
    }));
  };

  const validateLicenseData = () => {
    const requiredFields = [
      "nameOfLicence",
      "businessType",
      "address",
      "district",
      "phoneNo",
      "fiancialPeriodTo",
      "fiancialPeriodfrom",
      "licenceId",
      "billCategory",
      "noOfBillCopies",
      "autoBillPrint",
      "eposUserId",
      "eposPassword",
      "noOfItemPerBill",
      "perBillMaxWine",
      "perBillMaxCs",
      "billMessages",
      "messageMobile",
    ];
  
    return requiredFields.some(
      (field) =>
        licenseData[field] === null ||
        licenseData[field] === undefined ||
        licenseData[field] === ""
    );
  };

  useEffect(() => {
    // localStorage.setItem("isButtonDisabled", JSON.stringify(isButtonDisabled));
    const fetchData = async () => {
      try {
        const getLicenseData = await getLicenseInfo();
        const data = getLicenseData.data[0];

        setLicenseDetails(data);

        setLicenseData({
          ...licenseData,
          id: data._id,
          nameOfLicence: data.nameOfLicence,
          businessType: data.businessType,
          address: data.address,
          district: data.district,
          phoneNo: data.phoneNo,
          fiancialPeriodTo: data.fiancialPeriodTo,
          fiancialPeriodfrom: data.fiancialPeriodfrom,
          licenceId: data.licenceId,
          billCategory: data.billCategory,
          noOfBillCopies: data.noOfBillCopies,
          autoBillPrint: data.autoBillPrint,
          eposUserId: data.eposUserId,
          eposPassword: data.eposPassword,
          noOfItemPerBill: data.noOfItemPerBill,
          perBillMaxWine: data.perBillMaxWine,
          perBillMaxCs: data.perBillMaxCs,
          billMessages: data.billMessages,
          messageMobile: data.messageMobile,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [authenticatedUser]);

  const handleCreate = async () => {
    if (validateLicenseData()) {
      NotificationManager.warning(
        "Please fill in all fields before creating.",
        "Missing Fields"
      );
      return;
    }
  
    try {
      const response = await createLicenseInfo(licenseData);
      if (response.status === 200) {
        NotificationManager.success("License Created Successfully", "Success");
        setCreateEnable(false);
        setEditEnable(true);
      }
    } catch (error) {
      NotificationManager.error("Failed to create license.", "Error");
    }
  };

  const handleEdit = () => {
    setEditEnable(false);
    setIsSaveEnabled(true);
  };

  const handleUpdate = async () => {
    if (validateLicenseData()) {
      NotificationManager.warning(
        "Please fill in all fields before updating.",
        "Missing Fields"
      );
      return;
    }
    // console.log("licenseData", licenseData);
  
    try {
      const response = await updateLicenseInfo(licenseData, licenseData.id);
      // console.log("update response", response)
      if (response.statusCode === 200) {
        NotificationManager.success("License Updated Successfully", "Success");
        setEditEnable(true);
        setIsSaveEnabled(false);
      }
      else {
        NotificationManager.error("Failed to update license.", "Error");
        setEditEnable(true);
        setIsSaveEnabled(false);
      }
    } catch (error) {
      NotificationManager.error("Failed to update license.", "Error");
      setEditEnable(true);
      setIsSaveEnabled(false);
    }
  };

  useEffect(() => {
    const isValid = validateLicenseData();
    setCreateEnable(!isValid && !licenseData.id); 
    setIsSaveEnabled(!isValid && !!licenseData.id);
  }, [licenseData]);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        {canRead || role === "admin" ? (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Information of License
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="nameOfLicence" className="input-label">
                    NAME OF LICENSE/SHOP:
                  </InputLabel>
                  <TextField
                    fullWidth
                    inputRef={nameOfLicenceRef}
                    size="small"
                    name="nameOfLicence"
                    value={licenseData.nameOfLicence}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        nameOfLicence: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="businessType" className="input-label">
                    BUSINESS TYPE:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="businessType"
                    value={licenseData.businessType}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        businessType: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="address" className="input-label">
                    ADDRESS:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="address"
                    value={licenseData.address}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        address: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="district" className="input-label">
                    DISTRICT:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="district"
                    value={licenseData.district}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        district: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="phoneNo" className="input-label">
                    PHONE NO:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="phoneNo"
                    type="tel"
                    value={licenseData.phoneNo}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        phoneNo: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="fiancialPeriodfrom"
                    className="input-label"
                  >
                    FINANCIAL PERIOD FROM:
                  </InputLabel>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="fiancialPeriodfrom"
                      format="DD/MM/YYYY"
                      className="date-picker"
                      value={dayjs(licenseData.fiancialPeriodfrom)}
                      onChange={(newValue) =>
                        handleDateChange("fiancialPeriodfrom", newValue)
                      }
                      sx={{ width: "100%" }}
                      renderInput={(params) => <TextField {...params} />}
                      readOnly={editEnable}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="fiancialPeriodTo"
                    className="input-label"
                  >
                    FINANCIAL PERIOD TO:
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="fiancialPeriodTo"
                      format="DD/MM/YYYY"
                      className="date-picker"
                      value={dayjs(licenseData.fiancialPeriodTo)}
                      onChange={(newValue) =>
                        handleDateChange("fiancialPeriodTo", newValue)
                      }
                      sx={{ width: "100%" }}
                      renderInput={(params) => <TextField {...params} />}
                      readOnly={editEnable}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="licenceId" className="input-label">
                    LICENSE ID(12 DIGIT):
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="licenceId"
                    value={licenseData.licenceId}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        licenceId: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="billCategory" className="input-label">
                    BILL CATEGORY:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="billCategory"
                    value={licenseData.billCategory}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        billCategory: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="noOfBillCopies" className="input-label">
                    NO. OF BILL COPIES:
                  </InputLabel>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    name="noOfBillCopies"
                    value={licenseData.noOfBillCopies}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        noOfBillCopies: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                  </TextField>
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="autoBillPrint" className="input-label">
                    AUTO BILL PRINT:
                  </InputLabel>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    name="autoBillPrint"
                    value={licenseData.autoBillPrint}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        autoBillPrint: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value={"YES"}>Yes</MenuItem>
                    <MenuItem value={"NO"}>No</MenuItem>
                  </TextField>
                </div>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="eposUserId" className="input-label">
                    EPOS USER ID(15 DIGIT):
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="eposUserId"
                    value={licenseData.eposUserId}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        eposUserId: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel className="input-label"></InputLabel>
                  <Button
                    color="success"
                    size="small"
                    variant="contained"
                    // onClick={}
                    sx={{ width: "100%" }}
                  >
                    EPOS CONFIGURE
                  </Button>
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="eposPassword" className="input-label">
                    EPOS PASSWORD:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="eposPassword"
                    value={licenseData.eposPassword}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        eposPassword: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="noOfItemPerBill" className="input-label">
                    NO OF ITEM PER BILL:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="noOfItemPerBill"
                    value={licenseData.noOfItemPerBill}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        noOfItemPerBill: parseFloat(e.target.value),
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="perBillMaxWine" className="input-label">
                    PER BILL MAX WINE(ML):
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="perBillMaxWine"
                    value={licenseData.perBillMaxWine}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        perBillMaxWine: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="perBillMaxCs" className="input-label">
                    PER BILL MAX CS(ML):
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="perBillMaxCs"
                    value={licenseData.perBillMaxCs}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        perBillMaxCs: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="billMessages" className="input-label">
                    BILL MESSAGES:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="billMessages"
                    value={licenseData.billMessages}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        billMessages: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="messageMobile" className="input-label">
                    MESSAGE MOBILE:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="messageMobile"
                    value={licenseData.messageMobile}
                    onChange={(e) =>
                      setLicenseData({
                        ...licenseData,
                        messageMobile: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: editEnable }}
                  />
                </div>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                "& button": { marginTop: 2, marginBottom: 2 },
              }}
            >
              <Button
                color="secondary"
                size="small"
                variant="contained"
                onClick={handleCreate}
                disabled={!createEnable}
              >
                CREATE
              </Button>

              {editEnable ? (
                <Button
                  color="primary"
                  size="small"
                  variant="contained"
                  onClick={handleEdit}
                  sx={{ marginLeft: 2 }}
                >
                  EDIT
                </Button>
              ) : (
                <Button
                  color="success"
                  size="small"
                  variant="contained"
                  onClick={handleUpdate}
                  sx={{ marginLeft: 2 }}
                  disabled={!isSaveEnabled}
                >
                  SAVE
                </Button>
              )}

              <Button
                color="inherit"
                size="small"
                variant="contained"
                onClick={clearForm}
                sx={{ marginLeft: 2 }}
              >
                CLEAR
              </Button>
            </Box>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 3 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Wine Application Developed By:{" "}
                  <b>TDR SOFTWARE PRIVATE LIMITED</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom>
                  COMPANY CIN NO: <b>U72300WB2013PTC196614</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom>
                  GSTIN: <b>19AAECT848D1ZX</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom>
                  CONTACT NO: <b>9830657184/ 8670920038</b>
                </Typography>
              </Grid>
            </Grid>{" "}
          </>
        ) : (
          <Typography variant="subtitle1" sx={{ color: "red" }}>
            You do not have permission to view license data.
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default LicenseeInfo;
