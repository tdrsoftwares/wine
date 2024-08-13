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
import { NotificationManager } from "react-notifications";
import { getSupplierData, getSupplierDataById } from "../../../services/stockService";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const PartyPayment = () => {
  const todaysDate = dayjs();
 
  const [data, setData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [formData, setFormData] = useState({
    supName: "",
    address: "",
    contactNo: "",
    openingBlance: "",
    mrpValue: "",
    billNo: "",
    billDate: "",
    netAmount: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getSupplierData(); // Assuming this fetches an array of suppliers
      setData(response.data);
    } catch (error) {
      console.error('Error fetching supplier data:', error);
    }
  };

  const change = async (id) => {
    try {
      const response = await getSupplierDataById(id);
      setSupplierData(response.data);

      // Update formData with the details of the first supplier in response
      if (response.data.length > 0) {
        const selected = response.data[0]; // Assuming only one supplier is returned
        setFormData({
          ...formData,
          supName: selected.supplierId.name,
          contactNo: selected.supplierId.contactNo,
          address: selected.supplierId.address,
          openingBlance: selected.supplierId.openingBlance,
          mrpValue: selected.mrpValue,
          billNo: selected.billNo,
          billDate: selected.billDate,
          netAmount: selected.netAmount
        });
      }
      NotificationManager.success("Data Found")
    } catch (error) {
      NotificationManager.error('Error fetching supplier data');
    }
  };

  const handleSupplierChange = (e) => {
    const selectedSupplierName = e.target.value;

    // Find the selected supplier from supplierData
    const selected = supplierData?.find((item) => item.supplierId.name === selectedSupplierName);
    
      if (selected) {
        // Update formData with the selected supplier details
        setFormData((prevFormData) => ({
          ...prevFormData,
          supName: selected.supplierId.name,
          contactNo: selected.supplierId.contactNo,
          address: selected.supplierId.address,
          openingBlance: selected.supplierId.openingBlance,
          mrpValue: selected.mrpValue,
          billNo: selected.billNo,
          billDate: selected.billDate,
          netAmount: selected.netAmount
        }));
      }
     

    
  };
// console.log(formData,"formData")
  return (
    <form>
      <Box sx={{ p: 2, minWidth: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Supplier Payment 
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Supplier Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              name="supName"
              label="Supplier Name"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={formData.supName}
              select
              onChange={handleSupplierChange}
            >
              {data?.map((item,index)=>(
                <MenuItem value={item.name} key={item._id} onClick={()=>change(item._id)}>{item.name}</MenuItem>
              ))}
              
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              type="text"
              fullWidth
              className="input-field"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="contactNoNo"
              label="contactNo No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={formData.contactNo}
              onChange={(e) =>
                setFormData({ ...formData, contactNo: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="openingBlance"
              label="Current Balance"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={formData.openingBlance}
              onChange={(e) =>
                setFormData({ ...formData, openingBlance: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="paymentNo"
              label="Payment No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={formData.paymentNo}
              onChange={(e) =>
                setFormData({ ...formData, paymentNo: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="paymentBillNo"
              label="Payment Bill No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={formData.paymentBillNo}
              onChange={(e) =>
                setFormData({ ...formData, paymentBillNo: e.target.value })
              }
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
              {supplierData?.map((row, index) => (
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
                      value={row.mrpValue}
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
                  setFormData({ ...formData, amtPaidRs: e.target.value })
                }
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
                  setFormData({
                    ...formData,
                    amtPaidDate: dayjs(e.target.value),
                  })
                }
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
                  setFormData({ ...formData, mode: e.target.value })
                }
              >
                {["CASH", "ONLINE"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* <Grid item xs={3}></Grid> */}
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
                  setFormData({ ...formData, chequeNo: e.target.value })
                }
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
                value={dayjs(formData.chequeDate).format("YYYY-MM-DD")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    chequeDate: dayjs(e.target.value),
                  })
                }
              />
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
                  setFormData({ ...formData, bankAccnt: e.target.value })
                }
              />
            </Grid>
            {/* <Grid item xs={3}></Grid> */}
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
                  setFormData({ ...formData, remarks: e.target.value })
                }
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
                  setFormData({ ...formData, bankBal: e.target.value })
                }
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
                  setFormData({ ...formData, adjustAmt: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}></Grid>

            <Grid item xs={3}>
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

export default PartyPayment;
