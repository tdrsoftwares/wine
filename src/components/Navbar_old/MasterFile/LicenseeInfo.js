import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Bloodtype, Label } from "@mui/icons-material";

const LicenseeInfo = () => {
  const [licenseData, setLicenseData] = useState({
    licenseName: "",
    businessType: "",
    address: "",
    district: "",
    phNo: "",
    allowNegativeStocks: "allow",
    periodStartDate: "mm/dd/yyyy",
    periodEndDate: "mm/dd/yyyy",
    licenseId: "",
    billCategory: "",
    numberOfBillPrint: "",
    activateAutoBillSeparate: "no",
    autoBillPrint: "no",
    stockCalculateOn: "closing",
  });

  const [bankAccountData, setBankAccountData] = useState({
    accountNo: "",
    bankName: "",
    branchName: "",
    ifsc: "",
    installDate: "mm/dd/yyyy", // date
    renewalDate: "mm/dd/yyyy", //date
    renewalMode: "", //select
    renewalAmt: "",
    renewalBy: "",
  });

  const [eposData, setEposData] = useState({
    eposUserId: "",
    eposPassword: "",
    itemPerBill: "",
    maxWinePerBill: "",
    maxCSPerBill: "",
    remotePath: "",
    backupDrive: "",
    billMessages: "",
    messageMobile: "",
    excelConvtFile: "",
  });

  const clearForm = () => {};

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle1" gutterBottom>
          Application Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="body2">
              Developed by: <b>TDR Software Pvt. Ltd.</b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">
              Company CIN No.: <b>U72300WB2013PTC196614</b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">
              GSTIN No.: <b>19AAECT8485D1ZX</b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">
              Contact No.: <b>9830657184 / 8670920038</b>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider />
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Information of Licensee
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Licensee Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="licenseName"
              label="Name of License/Shop"
              variant="outlined"
              className="input-field"
              value={licenseData.licenseName}
              onChange={(e) =>
                setLicenseData({
                  ...licenseData,
                  licenseName: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="businessType"
              label="Business Type"
              variant="outlined"
              className="input-field"
              value={licenseData.businessType}
              onChange={(e) =>
                setLicenseData({
                  ...licenseData,
                  businessType: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="address"
              label="Address"
              variant="outlined"
              className="input-field"
              value={licenseData.address}
              onChange={(e) =>
                setLicenseData({ ...licenseData, address: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="district"
              label="district"
              variant="outlined"
              className="input-field"
              value={licenseData.district}
              onChange={(e) =>
                setLicenseData({ ...licenseData, district: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="phNo"
              label="Phone Number"
              variant="outlined"
              className="input-field"
              value={licenseData.phNo}
              onChange={(e) =>
                setLicenseData({ ...licenseData, phNo: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="licenseId"
              label="licenseId"
              variant="outlined"
              className="input-field"
              value={licenseData.licenseId}
              onChange={(e) =>
                setLicenseData({ ...licenseData, licenseId: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={4}>
            <InputLabel for="allowNegativeStocks">
              Allow Negative Stocks
            </InputLabel>
            <RadioGroup
              row
              aria-label="allowNegativeStocks"
              name="allowNegativeStocks"
              value={licenseData.allowNegativeStocks}
              onChange={(e) =>
                setLicenseData({
                  ...licenseData,
                  allowNegativeStocks: e.target.value,
                })
              }
            >
              <FormControlLabel
                value="allow"
                control={<Radio />}
                label="Allow"
              />
              <FormControlLabel
                value="notAllow"
                control={<Radio />}
                label="Not Allow"
              />
              <FormControlLabel
                value="onlyStockSale"
                control={<Radio />}
                label="Only Stock Sale"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              name="periodStartDate"
              label="Period Start Date"
              variant="outlined"
              className="input-field"
              value={licenseData.periodStartDate}
              onChange={(e) =>
                setLicenseData({
                  ...licenseData,
                  periodStartDate: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              name="periodEndDate"
              label="Period End Date"
              variant="outlined"
              className="input-field"
              value={licenseData.periodEndDate}
              onChange={(e) =>
                setLicenseData({
                  ...licenseData,
                  periodEndDate: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="billCategory"
              label="Bill Category"
              variant="outlined"
              className="input-field"
              value={licenseData.billCategory}
              onChange={(e) =>
                setLicenseData({ ...licenseData, billCategory: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              fullWidth
              type="number"
              name="numberOfBillPrint"
              label="Number Of Bill Print"
              variant="outlined"
              className="input-field"
              value={licenseData.numberOfBillPrint}
              onChange={(e) =>
                setLicenseData({
                  ...licenseData,
                  numberOfBillPrint: e.target.value,
                })
              }
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <InputLabel for="activateAutoBillSeparate">
              Activate Auto Bill Separate
            </InputLabel>
            <RadioGroup
              row
              aria-label="activateAutoBillSeparate"
              name="activateAutoBillSeparate"
              value={licenseData.activateAutoBillSeparate}
              onChange={(e) =>
                setLicenseData({
                  ...licenseData,
                  activateAutoBillSeparate: e.target.value,
                })
              }
            >
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel value="ml" control={<Radio />} label="ML" />
              <FormControlLabel
                value="wine/cs"
                control={<Radio />}
                label="Wine/CS"
              />
              <FormControlLabel
                value="wine/cs/ml"
                control={<Radio />}
                label="Wine/CS/ML"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={2}>
            <InputLabel for="autoBillPrint">Auto Bill Print</InputLabel>
            <RadioGroup
              row
              aria-label="autoBillPrint"
              name="autoBillPrint"
              value={licenseData.autoBillPrint}
              onChange={(e) =>
                setLicenseData({
                  ...licenseData,
                  autoBillPrint: e.target.value,
                })
              }
            >
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            </RadioGroup>
          </Grid>

          <Grid item xs={2}>
            <InputLabel for="stockCalculateOn">Stock Calculate On</InputLabel>
            <RadioGroup
              row
              aria-label="stockCalculateOn"
              name="stockCalculateOn"
              value={licenseData.stockCalculateOn}
              onChange={(e) =>
                setLicenseData({
                  ...licenseData,
                  stockCalculateOn: e.target.value,
                })
              }
            >
              <FormControlLabel
                value="closing"
                control={<Radio />}
                label="Closing"
              />
              <FormControlLabel
                value="opening"
                control={<Radio />}
                label="Opening"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="subtitle1" gutterBottom>
          Bank Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="accountNo"
              label="Account Number"
              variant="outlined"
              className="input-field"
              value={bankAccountData.accountNo}
              onChange={(e) =>
                setBankAccountData({
                  ...bankAccountData,
                  accountNo: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="bankName"
              label="Bank Name"
              variant="outlined"
              className="input-field"
              value={bankAccountData.bankName}
              onChange={(e) =>
                setBankAccountData({
                  ...bankAccountData,
                  bankName: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="branchName"
              label="Branch Name"
              variant="outlined"
              className="input-field"
              value={bankAccountData.branchName}
              onChange={(e) =>
                setBankAccountData({
                  ...bankAccountData,
                  branchName: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="ifsc"
              label="IFSC Code"
              variant="outlined"
              className="input-field"
              value={bankAccountData.ifsc}
              onChange={(e) =>
                setBankAccountData({
                  ...bankAccountData,
                  ifsc: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              name="installDate"
              label="Installation Date"
              variant="outlined"
              className="input-field"
              value={bankAccountData.installDate}
              onChange={(e) =>
                setBankAccountData({
                  ...bankAccountData,
                  installDate: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              name="renewalDate"
              label="Renewal Date"
              variant="outlined"
              className="input-field"
              value={bankAccountData.renewalDate}
              onChange={(e) =>
                setBankAccountData({
                  ...bankAccountData,
                  renewalDate: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              select
              name="renewalMode"
              label="Renewal Mode"
              variant="outlined"
              className="input-field"
              value={bankAccountData.renewalMode}
              onChange={(e) =>
                setBankAccountData({
                  ...bankAccountData,
                  renewalMode: e.target.value,
                })
              }
            >
              {["Monthly", "Yearly"].map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="renewalAmt"
              label="Renewal Amt"
              variant="outlined"
              className="input-field"
              value={bankAccountData.renewalAmt}
              onChange={(e) =>
                setBankAccountData({
                  ...bankAccountData,
                  renewalAmt: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="renewalBy"
              label="Renewal By"
              variant="outlined"
              className="input-field"
              value={bankAccountData.renewalBy}
              onChange={(e) =>
                setBankAccountData({
                  ...bankAccountData,
                  renewalBy: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box sx={{ p: 2, width: "900px" }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="eposUserId"
              label="Epos User Id"
              variant="outlined"
              className="input-field"
              value={eposData.eposUserId}
              onChange={(e) =>
                setEposData({
                  ...eposData,
                  eposUserId: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="password"
              name="eposPassword"
              label="Epos Password"
              variant="outlined"
              className="input-field"
              value={eposData.eposPassword}
              onChange={(e) =>
                setEposData({
                  ...eposData,
                  eposPassword: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="itemPerBill"
              label="No. of Item Per Bill"
              variant="outlined"
              className="input-field"
              value={eposData.itemPerBill}
              onChange={(e) =>
                setEposData({
                  ...eposData,
                  itemPerBill: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="maxWinePerBill"
              label="Max Wine Per Bill(ML)"
              variant="outlined"
              className="input-field"
              value={eposData.maxWinePerBill}
              onChange={(e) =>
                setEposData({
                  ...eposData,
                  maxWinePerBill: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="number"
              name="maxCSPerBill"
              label="Max CS Per Bill(ML)"
              variant="outlined"
              className="input-field"
              value={eposData.maxCSPerBill}
              onChange={(e) =>
                setEposData({
                  ...eposData,
                  maxCSPerBill: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="remotePath"
              label="Remote Path"
              variant="outlined"
              className="input-field"
              value={eposData.remotePath}
              onChange={(e) =>
                setEposData({
                  ...eposData,
                  remotePath: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              select
              name="backupDrive"
              label="Backup Drive"
              variant="outlined"
              className="input-field"
              value={eposData.backupDrive}
              onChange={(e) =>
                setEposData({
                  ...eposData,
                  backupDrive: e.target.value,
                })
              }
            >
              {["C:", "D:", "E:"].map((item, id) => (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              type="text"
              name="billMessages"
              label="Bill Messages"
              variant="outlined"
              className="input-field"
              value={eposData.billMessages}
              onChange={(e) =>
                setEposData({
                  ...eposData,
                  billMessages: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="text"
              name="messageMobile"
              label="Message Mobile"
              variant="outlined"
              className="input-field"
              value={eposData.messageMobile}
              onChange={(e) =>
                setEposData({
                  ...bankAccountData,
                  messageMobile: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="primary"
                size="large"
                variant="outlined"
                onClick={() => {}}
                sx={{ marginTop: 2, marginRight: 2 }}
              >
                Save
              </Button>
              <Button
                color="secondary"
                size="large"
                variant="outlined"
                onClick={() => {}}
                sx={{ marginTop: 2, marginRight: 2 }}
              >
                Print
              </Button>
              <Button
                color="error"
                size="large"
                variant="outlined"
                onClick={clearForm}
                sx={{ marginTop: 2 }}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default LicenseeInfo;
