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
import React, { useState } from "react";

const PartyPayment = () => {
  const todaysDate = dayjs();
  const [formData, setFormData] = useState({
    supName: "",
    address: "",
    contact: "",
    currentBal: "",
    paymentNo: "",
    paymentBillNo: "",
    amtPaidRs: "",
    amtPaidDate: todaysDate,
    mode: ["CASH", "ONLINE"],
    chequeNo: "",
    chequeDate: todaysDate,
    bankAccnt: "",
    remarks: "",
    bankBal: "",
    adjustAmt: "",
  });

  const [tableData, setTableData] = useState(
    Array.from({ length: 4 }, () => ({
      billNo: "",
      billDate: "",
      billAmt: "",
      balanceAmt: "",
    }))
  );

  const handleSupplierNameChange = (selectedItem) => {
    setFormData((prevData) => ({
      ...prevData,
      supName: selectedItem,
    }));
    console.log(selectedItem);
  };

  const handleItemCodeChange = (event, index, fieldName) => {
    const { value } = event.target;
    setTableData((prevData) =>
      prevData.map((item, idx) =>
        idx === index ? { ...item, [fieldName]: value } : item
      )
    );
  };

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
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
              onChange={(e) => handleSupplierNameChange(e.target.value)}
            >
              <MenuItem value="sur">Surinder Singh</MenuItem>
              <MenuItem value="dip">Dipak Adhikari</MenuItem>
              <MenuItem value="ark">Arka Das</MenuItem>
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
              name="contactNo"
              label="Contact No."
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="currentBal"
              label="Current Balance"
              variant="outlined"
              type="number"
              fullWidth
              className="input-field"
              value={formData.currentBal}
              onChange={(e) =>
                setFormData({ ...formData, currentBal: e.target.value })
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
              {tableData.map((row, index) => (
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
                      onChange={(event) =>
                        handleItemCodeChange(event, index, "billNo")
                      }
                      fullWidth
                      // InputProps={{ readOnly: row.itemDescription !== "" }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "10px" }}>
                    <TextField
                      size="small"
                      value={row.billDate}
                      onChange={(event) =>
                        handleItemCodeChange(event, index, "billDate")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.billAmt}
                      onChange={(event) =>
                        handleItemCodeChange(event, index, "billAmt")
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    <TextField
                      size="small"
                      value={row.balanceAmt || ""}
                      onChange={(event) =>
                        handleItemCodeChange(event, index, "balanceAmt")
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
