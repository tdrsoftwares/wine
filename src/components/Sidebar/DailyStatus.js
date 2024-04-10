import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const DailyStatus = () => {
  const [filterData, setFilterData] = useState({
    dateFrom: "mm/dd/yyyy",
    dateTo: "mm/dd/yyyy",
    purBill: "",
    purMrp: "",
    saleBill: "",
    saleMrp: "",
    discAmt: "",
    payment: "",
    saleReceipt: "",
    dueReceipt: "",
    currStockPurVal: "",
    currStockMrpVal: "",
    balSupplier: "",
    balCustomer: "",
    cash: "",
  });

  return (
    <form>
      <Box sx={{ p: 2, width: "900px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Daily Status
        </Typography>{" "}
        <br />
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              label="Date from"
              name="dateFrom"
              variant="outlined"
              value={filterData.dateFrom}
              onChange={(e) =>
                setFilterData({ ...filterData, dateFrom: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              type="date"
              label="Date to"
              name="dateTo"
              variant="outlined"
              value={filterData.dateTo}
              onChange={(e) =>
                setFilterData({ ...filterData, dateTo: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="PurchaseBill"
              label="Purchase Bill Value"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.purBill}
              onChange={(e) =>
                setFilterData({ ...filterData, purBill: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="PurchaseBill"
              label="Purchase Mrp Value"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.purMrp}
              onChange={(e) =>
                setFilterData({ ...filterData, purMrp: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="SaleBill"
              label="Sale Bill Value"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.saleBill}
              onChange={(e) =>
                setFilterData({ ...filterData, saleBill: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="SaleMRP"
              label="Sale MRP Value"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.saleMrp}
              onChange={(e) =>
                setFilterData({ ...filterData, saleMrp: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="Discount"
              label="Discount Amt.(₹)"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.discAmt}
              onChange={(e) =>
                setFilterData({ ...filterData, discAmt: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="Payment"
              label="Payment (₹)"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.payment}
              onChange={(e) =>
                setFilterData({ ...filterData, payment: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="ReciptOnSale"
              label="Recipt On Sale"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.saleReceipt}
              onChange={(e) =>
                setFilterData({ ...filterData, saleReceipt: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="ReciptOnDue"
              label="Recipt On Due"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.dueReceipt}
              onChange={(e) =>
                setFilterData({ ...filterData, dueReceipt: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="curentStockPurchaseValue"
              label="Curent Stock Purchase Value"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.currStockPurVal}
              onChange={(e) =>
                setFilterData({
                  ...filterData,
                  currStockPurVal: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="curentStockMRPValue"
              label="Current Stock MRP Value"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.currStockMrpVal}
              onChange={(e) =>
                setFilterData({
                  ...filterData,
                  currStockMrpVal: e.target.value,
                })
              }
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              name="balanceSupplier"
              label="Supplier Balance"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.balSupplier}
              onChange={(e) =>
                setFilterData({ ...filterData, balSupplier: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="balanceCustomer"
              label="Customer Balance"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.balCustomer}
              onChange={(e) =>
                setFilterData({ ...filterData, balCustomer: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="cash"
              label="Cash"
              variant="outlined"
              type="number"
              fullWidth
              className="form-field"
              value={filterData.cash}
              onChange={(e) =>
                setFilterData({ ...filterData, cash: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            color="primary"
            size="large"
            variant="outlined"
            onClick={() => {}}
          >
            Save
          </Button>
          <Button
            color="error"
            size="large"
            variant="outlined"
            onClick={() => {}}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default DailyStatus;
