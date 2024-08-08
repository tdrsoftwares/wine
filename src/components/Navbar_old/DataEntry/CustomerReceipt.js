import {
  Box,
  Button,
  Grid,
  MenuItem,
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
import dayjs from "dayjs";
import React, { useState,useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { getCustomerData, getCustomerDataById } from "../../../services/stockService";

//import { getCustomerDataById } from "../../../services/stockService";

const CustomerReceipt = () => {
  const todaysDate = dayjs();
  const [data, setData] = useState([]);
  const [customerData, setcustomerData] = useState([]);
  const [formData, setFormData] = useState({
    cusName: "",
    address: "",
    contactNo: "",
    openingBlance: "",
    grossAmount: "",
    billNo: "",
    billDate: "",
    netAmount: "",
    currentBal:"",
    reciptNo:"",
    amtPaidRs:'',
    amtPaidDate:'',
    bankAccnt:'',
    chequeNo:'',
    chequeDate:'',
    bankBal:'',
    adjustAmt:'',
    remarks:''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getCustomerData(); // Assuming this fetches an array of suppliers
      setData(response.data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const change = async (id) => {
    console.log(id,"id")
    try {
      const response = await getCustomerDataById(id);
      setcustomerData(response.data);

      // Update formData with the details of the first supplier in response
      if (response.data.length > 0) {
        const selected = response.data[0]; // Assuming only one supplier is returned
        setFormData({
          ...formData,
          cusName: selected.customer.name,
          contactNo: selected.customer.contactNo,
          address: selected.customer.address,
          openingBlance: selected.customer.openingBlance,
          grossAmount: selected.grossAmount,
          billNo: selected.billNo,
          billDate: selected.billDate,
          netAmount: selected.netAmount
        });
      }
      NotificationManager.success("Data Found")
    } catch (error) {
      NotificationManager.error('Error fetching customer data');
    }
  };

  const handleSupplierChange = (e) => {
    const selectedSupplierName = e.target.value;

    // Find the selected supplier from customerData
    const selected = customerData?.find((item) => item.customer.name === selectedSupplierName);
    
      if (selected) {
        // Update formData with the selected supplier details
        setFormData((prevFormData) => ({
          ...prevFormData,
          cusName: selected.customer.name,
          contactNo: selected.customer.contactNo,
          address: selected.customer.address,
          openingBlance: selected.customer.openingBlance,
          grossAmount: selected.grossAmount,
          billNo: selected.billNo,
          billDate: selected.billDate,
          netAmount: selected.netAmount
        }));
      }
     

    
  };
// console.log(customerData,"formData")
// console.log(data,"Data")
  return (
    <form>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Customer Receipt
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Customer Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
          <TextField
              name="cusName"
              label="Customer Name"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={formData.cusName}
              select
              onChange={handleSupplierChange}
            >
              {data?.map((item,index)=>(
                <MenuItem value={item.name} key={item._id} onClick={()=>change(item._id)}>{item.name}</MenuItem>
              ))}
              
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="contactNo"
              label="Contact No."
              variant="outlined"
              type="tel"
              fullWidth
              className="input-field"
              value={formData.contactNo}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })}
            />
          </Grid>

           <Grid item xs={4}>
            <TextField
              name="currentBal"
              label="Current Balance"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
             
              value={formData.currentBal}
              onChange={(e) =>
                setFormData({ ...formData, currentBal: e.target.value })}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="receiptNo"
              label="Receipt No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              
              value={formData.reciptNo}
              onChange={(e) =>
                setFormData({ ...formData, reciptNo: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="billNo"
              label="Bill No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={formData.billNo}
              onChange={(e) =>
                setFormData({ ...formData, billNo: e.target.value })}
            />
          </Grid>
        </Grid> 

        <TableContainer
          component={Paper}
          sx={{ marginTop: 4, maxHeight: 300, overflowY: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S. No.</TableCell>
                <TableCell>Bill No.</TableCell>
                <TableCell>Bill Date</TableCell>
                <TableCell>Bill Amt.</TableCell>
                <TableCell>Balance Amt.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {customerData?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={index + 1}
                      // fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.billNo}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      fullWidth
                      // InputProps={{ readOnly: row.itemDescription !== "" }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "10px" }}>
                    <TextField
                      size="small"
                      value={row.billDate}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.grossAmount}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row
                        .netAmount || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ marginTop: "12px" }}>
          <Typography variant="subtitle2" gutterBottom>
            Payment Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                name="amtPaidRs"
                label="Amt. Paid (₹)"
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                className="input-field"
                
                value={formData.amtPaidRs}
                onChange={(e) =>
                  setFormData({ ...formData, amtPaidRs: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="amtPaidDate"
                label="Amt. Paid Date"
                variant="outlined"
                size="small"
                type="date"
                fullWidth
                className="input-field"
                value={dayjs(formData.amtPaidDate).format("YYYY-MM-DD")}
               
              onChange={(e) =>
                setFormData({ ...formData, amtPaidDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="mode"
                label="Payment Mode"
                variant="outlined"
                size="small"
                fullWidth
                select
                value={formData.mode}
              onChange={(e) =>
                setFormData({ ...formData, mode: e.target.value })}
              >
                {["CASH", "ONLINE"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="bankAccnt"
                label="Bank Account"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                className="input-field"
                value={formData.bankAccnt}
              onChange={(e) =>
                setFormData({ ...formData, bankAccnt: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="chequeNo"
                label="Cheque No."
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                className="input-field"
                value={formData.chequeNo}
              onChange={(e) =>
                setFormData({ ...formData, chequeNo: e.target.value })}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="chequeDate"
                label="Cheque Date"
                variant="outlined"
                size="small"
                type="date"
                fullWidth
                className="input-field"
                value={formData.chequeDate}
               
                onChange={(e) =>
                  setFormData({ ...formData, chequeDate: e.target.value })}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="bankBal"
                label="Balance"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                className="input-field"
                value={formData.bankBal}
              onChange={(e) =>
                setFormData({ ...formData, bankBal: e.target.value })}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="adjustAmt"
                label="Adjust Amt.(₹)"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                className="input-field"
                value={formData.adjustAmt}
              onChange={(e) =>
                setFormData({ ...formData, adjustAmt: e.target.value })}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                name="remarks"
                label="Remarks"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                className="input-field"
                value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })}
              />
            </Grid>
            <Grid item xs={9}>
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
                  onClick={() => {}}
                  sx={{ marginTop: 2 }}
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </form>
  );
};

export default CustomerReceipt;