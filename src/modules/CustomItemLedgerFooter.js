import React from "react";
import { GridFooter, GridFooterContainer } from "@mui/x-data-grid";

const CustomItemLedgerStatusFooter = ({
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
        <span sx={{ flexBasis: "15%", fontSize: "14px" }}>
          Totals
        </span>
        
        <span sx={{ flexBasis: "15%", fontSize: "13px" }}>
           Opening:
          {filterData?.isBLTrue
            ? totalOpeningBalance.toFixed(3)
            : totalOpeningBalance}
        </span>

        <span sx={{ flexBasis: "15%", fontSize: "13px" }}>
         Pur.:{filterData?.isBLTrue ? totalPurchased.toFixed(3) : totalPurchased}
        </span>

        <span sx={{ flexBasis: "15%", fontSize: "13px" }}>
           Trans. from:{filterData?.isBLTrue
            ? totalTransferredFrom.toFixed(3)
            : totalTransferredFrom}
        </span>

        <span sx={{ flexBasis: "15%", fontSize: "13px" }}>
           Trans. to:{filterData?.isBLTrue
            ? totalTransferredTo.toFixed(3)
            : totalTransferredTo}
        </span>

        <span sx={{ flexBasis: "15%", fontSize: "13px" }}>
           Sold:{filterData?.isBLTrue ? totalSold.toFixed(3) : totalSold}
        </span>

        <span sx={{ flexBasis: "15%", fontSize: "13px" }}>
           Closing:{filterData?.isBLTrue
            ? totalClosingBalance.toFixed(3)
            : totalClosingBalance}
        </span>
      </div>
      <GridFooter />
    </GridFooterContainer>
  );
};

export default CustomItemLedgerStatusFooter;
