import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import React from "react";

const CustomItemStatusFooter = ({
  allItemStatusData,
  filterData,
  totalOpeningBalance,
  totalClosingBalance,
  totalPurchased,
  totalSold,
  totalTransferredFrom,
  totalTransferredTo,
}) => {
  return (
    <GridFooterContainer>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-around",
          margin: "0 20px",
        }}
      >
        <span sx={{ flexBasis: "15%", fontSize: "14px" }}>Totals</span>

        <span variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          Opening:
          {filterData.isBLTrue
            ? totalOpeningBalance?.toFixed(3)
            : totalOpeningBalance}
        </span>
        <span variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          Pur.:
          {filterData.isBLTrue ? totalPurchased?.toFixed(3) : totalPurchased}
        </span>
        <span variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          Trans. from:
          {filterData.isBLTrue
            ? totalTransferredFrom?.toFixed(3)
            : totalTransferredFrom}
        </span>
        <span variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          Trans. to:
          {filterData.isBLTrue
            ? totalTransferredTo?.toFixed(3)
            : totalTransferredTo}
        </span>
        <span variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          Sold:{filterData.isBLTrue ? totalSold?.toFixed(3) : totalSold}
        </span>
        <span variant="body1" sx={{ flexBasis: "15%", fontSize: "13px" }}>
          Closing:
          {filterData.isBLTrue
            ? totalClosingBalance?.toFixed(3)
            : totalClosingBalance}
        </span>
      </div>
      <GridFooter />
    </GridFooterContainer>
  );
};

export default CustomItemStatusFooter;
