import React, { useEffect, useState } from "react";
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
  Card,CardHeader,CardBody,CardFooter,
  styled,
  Paper,
  FormControl,
  Input,
  FormHelperText,Select
} from "@mui/material";
import axiosInstance from "../../../utils/axiosInstance";
import { NotificationContainer, NotificationManager } from "react-notifications";
import axios from "axios";
import { Bloodtype, Label } from "@mui/icons-material";
import { createLicenseInfo } from "../../../services/stockService";
import { getLicenseInfo } from "../../../services/stockService";
import { updateLicenseInfo } from "../../../services/stockService";
//import axiosInstance from "../../../utils/axiosInstance";


const LicenseeInfo = () => {
  
  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));
  let [getData,setGetData] = useState([]);
  const fetchData = async () => {
    try {
      
      const getLicenseData = await getLicenseInfo().then((res) => {
        setGetData(res.data);
      });

      
     console.log("getLicenseData"+getLicenseData.data)
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   fetchData()
    
  // }, []);
  // console.log(getData[0]);
  // const firstData=getData.data;
  //  const mappedData = getData.map((item) => {
  //    return item;
  //  });
  //  console.log(mappedData);
  
  // let obj={};
  // Object.assign(obj,getData[0]);
  //  console.log(obj.nameOfLicence);
 
  const [licenseData, setLicenseData] = useState({
    id:"",
    nameOfLicence: '',
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
 // console.log(getData.data)
  // const data=getData.map((item)=>{
  //   return item[0];
  // })
  // console.log(data);

  // const [bankAccountData, setBankAccountData] = useState({
  //   accountNo: "",
  //   bankName: "",
  //   branchName: "",
  //   ifsc: "",
  //   installDate: "mm/dd/yyyy", // date
  //   renewalDate: "mm/dd/yyyy", //date
  //   renewalMode: "", //select
  //   renewalAmt: "",
  //   renewalBy: "",
  // });
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setLicenseData({
      ...licenseData,
      [name]: value,
    });
  };
  let obj={}
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getLicenseData = await getLicenseInfo(); // Assuming async function to fetch license data
        
        Object.assign(obj, getLicenseData.data[0]); // Copy properties from first object in getLicenseData.data to obj
        console.log(obj._id); 
        // Check if obj is populated correctly

        // Update state with fetched data
        setLicenseData({
          ...licenseData,
          id:obj._id,
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
   
    console.log("id: "+licenseData.id)

    fetchData(); // Call the fetch data function
  }, []);
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setlicenseData({
  //     ...licenseData,
  //     [name]: value,
  //   });
  // };

  // const [licenseData, setlicenseData] = useState({
  //   eposUserId: "",
  //   eposPassword: "",
  //   noOfItemPerBill: "",
  //   perBillMaxWine: "",
  //   perBillMaxCs: "",
    
  //   billMessages: "",
  //   messageMobile: "",
    
  // });
  const save = async (e) => {
   
   // const updateCategoryData = await axiosInstance.put(apiURL, payload);
   const payload={
    "nameOfLicence":licenseData.nameOfLicence,
      "businessType":licenseData.businessType,
      "address":licenseData.address,
      "district":licenseData.district,
      "phoneNo":licenseData.phoneNo,

      "fiancialPeriodTo":licenseData.fiancialPeriodTo,
      "fiancialPeriodfrom":licenseData.fiancialPeriodfrom,
      "licenceId":licenseData.licenceId,
      "billCategory":licenseData.billCategory,
      "noOfBillCopies":licenseData.noOfBillCopies,

      "autoBillPrint":licenseData.autoBillPrint,
      "eposUserId":licenseData.eposUserId,
      "eposPassword":licenseData.eposPassword,
      "noOfItemPerBill":licenseData.noOfItemPerBill,
      "perBillMaxWine":licenseData.perBillMaxWine,
      "perBillMaxCs":licenseData.perBillMaxCs,
      "billMessages":licenseData.billMessages,
      "messageMobile":licenseData.messageMobile,
   };
    e.preventDefault();
    try {
      const response = await createLicenseInfo(payload);
      
      console.log(response.data)
      NotificationManager.success("Data Submitted Successfully",response.data.message);
      
      
      
      
    } catch (error) {
      console.log(error);
      // Extract the error message or relevant information
      let errorMessage = "An error occurred while submitting the data.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      NotificationManager.error(errorMessage);
    }
    console.log(licenseData);
    console.log("payload"+payload);
  };
  console.log("obj"+Object.keys(obj))
  const edit = async (e) => {
   
    // const updateCategoryData = await axiosInstance.put(apiURL, payload);
    const payload={
     "nameOfLicence":licenseData.nameOfLicence,
       "businessType":licenseData.businessType,
       "address":licenseData.address,
       "district":licenseData.district,
       "phoneNo":licenseData.phoneNo,
 
       "fiancialPeriodTo":licenseData.fiancialPeriodTo,
       "fiancialPeriodfrom":licenseData.fiancialPeriodfrom,
       "licenceId":licenseData.licenceId,
       "billCategory":licenseData.billCategory,
       "noOfBillCopies":licenseData.noOfBillCopies,
 
       "autoBillPrint":licenseData.autoBillPrint,
       "eposUserId":licenseData.eposUserId,
       "eposPassword":licenseData.eposPassword,
       "noOfItemPerBill":licenseData.noOfItemPerBill,
       "perBillMaxWine":licenseData.perBillMaxWine,
       "perBillMaxCs":licenseData.perBillMaxCs,
       "billMessages":licenseData.billMessages,
       "messageMobile":licenseData.messageMobile,
    };
     e.preventDefault();
     
     try {
       const response = await updateLicenseInfo(payload,licenseData.id);
       
       console.log(response.data)
       NotificationManager.success("Data Updated Successfully",response.data.message);
       
       
       
       
     } catch (error) {
       console.log(error);
       // Extract the error message or relevant information
       let errorMessage = "An error occurred while updatting the data.";
       if (error.response && error.response.data && error.response.data.message) {
         errorMessage = error.response.data.message;
       } 
       NotificationManager.error(errorMessage);
     }
     console.log(licenseData);
     console.log("payload"+Object.entries(payload),licenseData.id);
   };
  
  const handleSubmit =async (e) => {
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
    perBillMaxWine:  licenseData.perBillMaxWine,
    perBillMaxCs:   licenseData.perBillMaxCs,
    
    
    
    
    
     
    });
    
 
    
  };
 // console.log("form Submitted"+[Object.entries(licenseData)]);
  const clearForm = () => {};

  return (
    // <form>
    //   <Box sx={{ p: 2, width: "900px" }}>
    //     <Typography variant="subtitle2" gutterBottom>
    //       Application Details
    //     </Typography>

    //     <Grid container spacing={2}>
    //       <Grid item xs={3}>
    //         <Typography variant="body2">
    //           Developed by: <b>TDR Software Pvt. Ltd.</b>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={3}>
    //         <Typography variant="body2">
    //           Company CIN No.: <b>U72300WB2013PTC196614</b>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={3}>
    //         <Typography variant="body2">
    //           GSTIN No.: <b>19AAECT8485D1ZX</b>
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={3}>
    //         <Typography variant="body2">
    //           Contact No.: <b>9830657184 / 8670920038</b>
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Box>

    //   <Divider />
    //   <Box sx={{ p: 2, width: "900px" }}>
    //     <Typography variant="h5" component="div" gutterBottom>
    //       Information of Licensee
    //     </Typography>
    //     <Typography variant="subtitle2" gutterBottom>
    //       Licensee Details
    //     </Typography>

    //     <Grid container spacing={2}>
    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="nameOfLicence"
    //           label="Name of License/Shop"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.nameOfLicence}
    //           onChange={(e) =>
    //             setLicenseData({
    //               ...licenseData,
    //               nameOfLicence: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="businessType"
    //           label="Business Type"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.businessType}
    //           onChange={(e) =>
    //             setLicenseData({
    //               ...licenseData,
    //               businessType: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="address"
    //           label="Address"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.address}
    //           onChange={(e) =>
    //             setLicenseData({ ...licenseData, address: e.target.value })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="district"
    //           label="district"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.district}
    //           onChange={(e) =>
    //             setLicenseData({ ...licenseData, district: e.target.value })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="number"
    //           name="phoneNo"
    //           label="Phone Number"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.phoneNo}
    //           onChange={(e) =>
    //             setLicenseData({ ...licenseData, phoneNo: e.target.value })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="number"
    //           name="licenceId"
    //           label="licenceId"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.licenceId}
    //           onChange={(e) =>
    //             setLicenseData({ ...licenseData, licenceId: e.target.value })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={4}>
    //         <InputLabel for="allowNegativeStocks">
    //           Allow Negative Stocks
    //         </InputLabel>
    //         <RadioGroup
    //           row
    //           aria-label="allowNegativeStocks"
    //           name="allowNegativeStocks"
    //           value={licenseData.allowNegativeStocks}
    //           onChange={(e) =>
    //             setLicenseData({
    //               ...licenseData,
    //               allowNegativeStocks: e.target.value,
    //             })
    //           }
    //         >
    //           <FormControlLabel
    //             value="allow"
    //             control={<Radio />}
    //             label="Allow"
    //           />
    //           <FormControlLabel
    //             value="notAllow"
    //             control={<Radio />}
    //             label="Not Allow"
    //           />
    //           <FormControlLabel
    //             value="onlyStockSale"
    //             control={<Radio />}
    //             label="Only Stock Sale"
    //           />
    //         </RadioGroup>
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="date"
    //           name="fiancialPeriodTo"
    //           label="Period Start Date"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.fiancialPeriodTo}
    //           onChange={(e) =>
    //             setLicenseData({
    //               ...licenseData,
    //               fiancialPeriodTo: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="date"
    //           name="fiancialPeriodfrom"
    //           label="Period End Date"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.fiancialPeriodfrom}
    //           onChange={(e) =>
    //             setLicenseData({
    //               ...licenseData,
    //               fiancialPeriodfrom: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="number"
    //           name="billCategory"
    //           label="Bill Category"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.billCategory}
    //           onChange={(e) =>
    //             setLicenseData({ ...licenseData, billCategory: e.target.value })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           select
    //           fullWidth
    //           type="number"
    //           name="noOfBillCopies"
    //           label="Number Of Bill Print"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.noOfBillCopies}
    //           onChange={(e) =>
    //             setLicenseData({
    //               ...licenseData,
    //               noOfBillCopies: e.target.value,
    //             })
    //           }
    //         >
    //           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, id) => (
    //             <MenuItem key={id} value={item}>
    //               {item}
    //             </MenuItem>
    //           ))}
    //         </TextField>
    //       </Grid>

    //       <Grid item xs={4}>
    //         <InputLabel for="activateAutoBillSeparate">
    //           Activate Auto Bill Separate
    //         </InputLabel>
    //         <RadioGroup
    //           row
    //           aria-label="activateAutoBillSeparate"
    //           name="activateAutoBillSeparate"
    //           value={licenseData.activateAutoBillSeparate}
    //           onChange={(e) =>
    //             setLicenseData({
    //               ...licenseData,
    //               activateAutoBillSeparate: e.target.value,
    //             })
    //           }
    //         >
    //           <FormControlLabel value="no" control={<Radio />} label="No" />
    //           <FormControlLabel value="ml" control={<Radio />} label="ML" />
    //           <FormControlLabel
    //             value="wine/cs"
    //             control={<Radio />}
    //             label="Wine/CS"
    //           />
    //           <FormControlLabel
    //             value="wine/cs/ml"
    //             control={<Radio />}
    //             label="Wine/CS/ML"
    //           />
    //         </RadioGroup>
    //       </Grid>

    //       <Grid item xs={2}>
    //         <InputLabel for="autoBillPrint">Auto Bill Print</InputLabel>
    //         <RadioGroup
    //           row
    //           aria-label="autoBillPrint"
    //           name="autoBillPrint"
    //           value={licenseData.autoBillPrint}
    //           onChange={(e) =>
    //             setLicenseData({
    //               ...licenseData,
    //               autoBillPrint: e.target.value,
    //             })
    //           }
    //         >
    //           <FormControlLabel value="no" control={<Radio />} label="No" />
    //           <FormControlLabel value="yes" control={<Radio />} label="Yes" />
    //         </RadioGroup>
    //       </Grid>

    //       <Grid item xs={2}>
    //         <InputLabel for="stockCalculateOn">Stock Calculate On</InputLabel>
    //         <RadioGroup
    //           row
    //           aria-label="stockCalculateOn"
    //           name="stockCalculateOn"
    //           value={licenseData.stockCalculateOn}
    //           onChange={(e) =>
    //             setLicenseData({
    //               ...licenseData,
    //               stockCalculateOn: e.target.value,
    //             })
    //           }
    //         >
    //           <FormControlLabel
    //             value="closing"
    //             control={<Radio />}
    //             label="Closing"
    //           />
    //           <FormControlLabel
    //             value="opening"
    //             control={<Radio />}
    //             label="Opening"
    //           />
    //         </RadioGroup>
    //       </Grid>
    //     </Grid>
    //   </Box>

    //   <Divider />

    //   <Box sx={{ p: 2, width: "900px" }}>
    //     <Typography variant="subtitle2" gutterBottom>
    //       Bank Details
    //     </Typography>

    //     <Grid container spacing={2}>
    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="number"
    //           name="accountNo"
    //           label="Account Number"
    //           variant="outlined"
    //           className="input-field"
    //           value={bankAccountData.accountNo}
    //           onChange={(e) =>
    //             setBankAccountData({
    //               ...bankAccountData,
    //               accountNo: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="bankName"
    //           label="Bank Name"
    //           variant="outlined"
    //           className="input-field"
    //           value={bankAccountData.bankName}
    //           onChange={(e) =>
    //             setBankAccountData({
    //               ...bankAccountData,
    //               bankName: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="branchName"
    //           label="Branch Name"
    //           variant="outlined"
    //           className="input-field"
    //           value={bankAccountData.branchName}
    //           onChange={(e) =>
    //             setBankAccountData({
    //               ...bankAccountData,
    //               branchName: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="ifsc"
    //           label="IFSC Code"
    //           variant="outlined"
    //           className="input-field"
    //           value={bankAccountData.ifsc}
    //           onChange={(e) =>
    //             setBankAccountData({
    //               ...bankAccountData,
    //               ifsc: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="date"
    //           name="installDate"
    //           label="Installation Date"
    //           variant="outlined"
    //           className="input-field"
    //           value={bankAccountData.installDate}
    //           onChange={(e) =>
    //             setBankAccountData({
    //               ...bankAccountData,
    //               installDate: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="date"
    //           name="renewalDate"
    //           label="Renewal Date"
    //           variant="outlined"
    //           className="input-field"
    //           value={bankAccountData.renewalDate}
    //           onChange={(e) =>
    //             setBankAccountData({
    //               ...bankAccountData,
    //               renewalDate: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           select
    //           name="renewalMode"
    //           label="Renewal Mode"
    //           variant="outlined"
    //           className="input-field"
    //           value={bankAccountData.renewalMode}
    //           onChange={(e) =>
    //             setBankAccountData({
    //               ...bankAccountData,
    //               renewalMode: e.target.value,
    //             })
    //           }
    //         >
    //           {["Monthly", "Yearly"].map((item, id) => (
    //             <MenuItem key={id} value={item}>
    //               {item}
    //             </MenuItem>
    //           ))}
    //         </TextField>
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="number"
    //           name="renewalAmt"
    //           label="Renewal Amt"
    //           variant="outlined"
    //           className="input-field"
    //           value={bankAccountData.renewalAmt}
    //           onChange={(e) =>
    //             setBankAccountData({
    //               ...bankAccountData,
    //               renewalAmt: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="renewalBy"
    //           label="Renewal By"
    //           variant="outlined"
    //           className="input-field"
    //           value={bankAccountData.renewalBy}
    //           onChange={(e) =>
    //             setBankAccountData({
    //               ...bankAccountData,
    //               renewalBy: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>
    //     </Grid>
    //   </Box>

    //   <Divider />

    //   <Box sx={{ p: 2, width: "900px" }}>
    //     <Grid container spacing={2}>
    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="eposUserId"
    //           label="Epos User Id"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.eposUserId}
    //           onChange={(e) =>
    //             setlicenseData({
    //               ...licenseData,
    //               eposUserId: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="password"
    //           name="eposPassword"
    //           label="Epos Password"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.eposPassword}
    //           onChange={(e) =>
    //             setlicenseData({
    //               ...licenseData,
    //               eposPassword: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="number"
    //           name="noOfItemPerBill"
    //           label="No. of Item Per Bill"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.noOfItemPerBill}
    //           onChange={(e) =>
    //             setlicenseData({
    //               ...licenseData,
    //               noOfItemPerBill: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="number"
    //           name="perBillMaxWine"
    //           label="Max Wine Per Bill(ML)"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.perBillMaxWine}
    //           onChange={(e) =>
    //             setlicenseData({
    //               ...licenseData,
    //               perBillMaxWine: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="number"
    //           name="perBillMaxCs"
    //           label="Max CS Per Bill(ML)"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.perBillMaxCs}
    //           onChange={(e) =>
    //             setlicenseData({
    //               ...licenseData,
    //               perBillMaxCs: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="remotePath"
    //           label="Remote Path"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.remotePath}
    //           onChange={(e) =>
    //             setlicenseData({
    //               ...licenseData,
    //               remotePath: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           select
    //           name="backupDrive"
    //           label="Backup Drive"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.backupDrive}
    //           onChange={(e) =>
    //             setlicenseData({
    //               ...licenseData,
    //               backupDrive: e.target.value,
    //             })
    //           }
    //         >
    //           {["C:", "D:", "E:"].map((item, id) => (
    //             <MenuItem key={id} value={item}>
    //               {item}
    //             </MenuItem>
    //           ))}
    //         </TextField>
    //       </Grid>

    //       <Grid item xs={4}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="billMessages"
    //           label="Bill Messages"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.billMessages}
    //           onChange={(e) =>
    //             setlicenseData({
    //               ...licenseData,
    //               billMessages: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={2}>
    //         <TextField
    //           fullWidth
    //           type="text"
    //           name="messageMobile"
    //           label="Message Mobile"
    //           variant="outlined"
    //           className="input-field"
    //           value={licenseData.messageMobile}
    //           onChange={(e) =>
    //             setlicenseData({
    //               ...bankAccountData,
    //               messageMobile: e.target.value,
    //             })
    //           }
    //         />
    //       </Grid>

    //       <Grid item xs={4}>
    //         <Box
    //           sx={{
    //             display: "flex",
    //             justifyContent: "flex-end",
    //           }}
    //         >
    //           <Button
    //             color="primary"
    //             size="large"
    //             variant="outlined"
    //             onClick={() => {}}
    //             sx={{ marginTop: 2, marginRight: 2 }}
    //           >
    //             Save
    //           </Button>
    //           <Button
    //             color="secondary"
    //             size="large"
    //             variant="outlined"
    //             onClick={() => {}}
    //             sx={{ marginTop: 2, marginRight: 2 }}
    //           >
    //             Print
    //           </Button>
    //           <Button
    //             color="error"
    //             size="large"
    //             variant="outlined"
    //             onClick={clearForm}
    //             sx={{ marginTop: 2 }}
    //           >
    //             Clear
    //           </Button>
    //         </Box>
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </form>
  
    <form>   
    <Box sx={{ flexGrow: 1 }} >
      <Grid item container spacing={4} sx={{display:"flex"}}>
        <Grid item xs={6} p={4} sx={{marginTop:"50px",marginLeft:"40px",textAlign:"center",background:"#d3dce8",borderRadius:"6px"}}>
         <h1 sx={{marginBottom:"30px"}}>Information of License</h1>
         
        <Grid container spacing={2} sx={{marginTop:"10px"}}>
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"5px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="nameOfLicence">NAME OF LICENSE/SHOP</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"60%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
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
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="businessType">BUSINESS TYPE</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"60%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
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
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="address">ADDRESS</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"60%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
            <Input required
             
              id="address"
              fullWidth
              name="address"
              value={licenseData.address}
              onChange={handleInputChange1}
              
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="district">DISTRICT</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"60%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
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
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="phoneNo">PHONE NO</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"60%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
            <Input required
              type="number"
              id="phoneNo"
              fullWidth
              name="phoneNo"
              value={licenseData.phoneNo}
              onChange={handleInputChange1}
              
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="fiancialPeriodTo">FINANCIAL PERIOD</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"20%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
            <Input required
            type='date'
            
              id="fiancialPeriodTo"
              fullWidth
              name="fiancialPeriodTo"
              value={licenseData.fiancialPeriodTo}
              onChange={handleInputChange1}
              
            />
            </FormControl>
            TO
            <FormControl variant="standard" sx={{ m: 1, width:"20%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
            <Input required
            type='date'
            
              id="fiancialPeriodfrom"
              fullWidth
              name="fiancialPeriodfrom"
              value={licenseData.fiancialPeriodfrom} 
              onChange={handleInputChange1}
              
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="licenceId">LICENSE ID(12 DIGIT)</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"60%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
            <Input required
            
              id="licenceId"
              fullWidth
              name="licenceId"
              value={licenseData.licenceId} 
              onChange={handleInputChange1} 

              
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="billCategory">BILL CATEGORY</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"10%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
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

            <InputLabel htmlFor="noOfBillCopies">NO OF BILL COPIES</InputLabel>
            
            {/* <Select
            sx={{width:"16%",height:"49px",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none',textAlign:"center"}}
              id="noBill"
              fullWidth
              placeholder="Select No"
              name="noBill"
              
            >
              <option sx={{padding:"10px"}}>1</option>
              <option sx={{padding:"10px"}}>2</option>
              <option sx={{padding:"10px"}}>3</option>
            </Select> */}
            {/* <Select
          labelId="demo-simple-select-standard-label"
          id="noOfBillCopies"
           sx={{width:"12%",padding:"4px",borderRadius:'6px',background:"white"}}
          label="noOfBillCopies"
          placeholder="Bill No"
          name='noOfBillCopies'
          value={licenseData.noOfBillCopies}
          onChange={handleInputChange1}
          
        >
          <option>One</option>
          <option>Two</option>
          <option>Three</option>
        </Select> */}
        <FormControl variant="standard" sx={{ m: 1, width:"19%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
       
        <InputLabel id="demo-simple-select-standard-label">No of Copies</InputLabel>
        <Select required
        type="number"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={licenseData.noOfBillCopies}
          name='noOfBillCopies'
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
          <Grid xs={12} sx={{display:"flex",gap:"4px",padding:"12px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="autoBillPrint">AUTO BILL PRINT</InputLabel>
          <FormControl variant="standard" sx={{ m: 1,minWidth:200,padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'  }}>
       
       <InputLabel id="demo-simple-select-standard-label">Auto Bill Print</InputLabel>
       <Select required
         labelId="demo-simple-select-standard-label"
         id="demo-simple-select-standard"
         value={licenseData.autoBillPrint}
         name='autoBillPrint'
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
          <Grid item xs={12} sx={{display:"flex",gap:"18px",padding:"12px",alignItems:"center",justifyContent:"center"}} >
            <Button variant="contained" color="primary" type="submit" onClick={save}>
              SAVE
            </Button>
            <Button variant="contained" color="success" type="submit" onClick={edit}>
              EDIT
            </Button>
            <Button variant="contained" color="error" type="submit">
              BACK
            </Button>
          </Grid>
          
        </Grid>
      
        </Grid>
        <Grid item xs={5} sx={{marginTop:"50px",marginLeft:"25px",textAlign:"left",background:"#d3dce8",padding:"12px",borderRadius:"6px"}}>
          <div sx={{display:"flex",flexDirection:"column",marginBottom:"10px"}}>
          
          <h3>Wine Application Developed By:  TDR SOFTWARE PRIVATE LIMITED</h3>
          <h3>COMPANY CIN NO:   U72300WB2013PTC196614</h3>
          <h3>GSTIN:   19AAECT848D1ZX</h3>
          <h3>CONTACT NO:   9830657184/ 8670920038</h3>
          </div>
          
          <Grid container spacing={2} sx={{marginTop:"10px"}}>
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between",overflowX:"auto"}}>
          <InputLabel htmlFor="eposUserId">EPOS USER ID(15 DIGIT)</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"30%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
            <Input
              required
              id="eposUserId"
              fullWidth
              name="eposUserId"
              value={licenseData.eposUserId}
              onChange={handleInputChange1}
              
            />
            </FormControl>
            <Button variant="contained" color="primary" type="submit" sx={{width:"25%",height:"40px",fontSize:"12px"}}>
              EPOS CONFIGURE
            </Button>

          </Grid>
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="eposPassword">EPOS PASSWORD</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"50%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
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
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="noOfItemPerBill">NO OF ITEM PER BILL</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"50%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
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
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="perBillMaxWine">Per Bill Max Wine(ML)</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"50%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
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
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="perBillMaxCs">Per Bill Max CS(ML)</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"50%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
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
          {/* <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="remotePath">Remote Path</InputLabel>
            <Input
               sx={{width:"60%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}
              id="remotePath"
              fullWidth
              name="remotePath"
              value={licenseData.remotePath}
              onChange={handleInputChange}
              
            />
            
          </Grid> */}
          {/* <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="backupDrive">Backup Drive</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
       
       <InputLabel id="demo-simple-select-standard-label">Backup Drive</InputLabel>
       <Select
         labelId="demo-simple-select-standard-label"
         id="demo-simple-select-standard"
         value={licenseData.backupDrive}
         name='backupDrive'
         onChange={handleInputChange}
         label="Back Up Drive"
       >
         <MenuItem value="">
           <em>None</em>
         </MenuItem>
         <MenuItem value={"C:/"}>C:/</MenuItem>
         <MenuItem value={"D:/"}>D:/</MenuItem>
         <MenuItem value={"E:/"}>E:/</MenuItem>
       </Select>
     </FormControl>
            
            
          </Grid> */}
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="billMessages">Bill Messages</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"50%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
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
          <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <InputLabel htmlFor="messageMobile">Message Mobile</InputLabel>
          <FormControl variant="standard" sx={{ m: 1, width:"50%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
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
          {/* <Grid item xs={12} sx={{display:"flex",gap:"4px",padding:"2px",alignItems:"center",justifyContent:"space-between"}}>
          <Button variant="contained" color="primary" type="submit">
              EXCEL CONVT FILE
            </Button>
            <FormControl variant="standard" sx={{ m: 1, width:"60%",padding:"4px",background:"white",borderRadius:'6px',borderBottom:'none'}}>
            <Input
              required
              id="excelConvtFile"
              fullWidth
              name="excelConvtFile"
              value={licenseData.excelConvtFile}
              onChange={handleInputChange}
              
            />
            </FormControl>
            
          </Grid> */}
          
          </Grid>
          
         
        </Grid>
       
      </Grid>
    </Box>
    </form> 
  );
}

    
  


export default LicenseeInfo;


