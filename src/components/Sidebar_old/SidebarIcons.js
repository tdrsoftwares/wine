import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { MdInventory } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { SiAdobeaudition } from "react-icons/si";
import { LuUtilityPole } from "react-icons/lu";
import {
  FaUser,
  FaStore,
  FaBuilding,
  FaBoxes,
  FaHandHoldingUsd,
  FaWarehouse,
  FaListAlt,
  FaBook,
  FaIndustry,
  FaMoneyBill,
  FaRegFileAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

export const sidebarIcons = ({ itemName }) => {
  switch (itemName) {
    case "Master File":
      return <FiFileText style={{ color: "#4e3be0" }} />;
    case "Data Entry":
      return <FaListAlt style={{ color: "#3f50ea" }} />;
    case "Sale Report":
      return <FaMoneyBill style={{ color: "#2a6ef9" }} />;
    case "Purchase Report":
      return <FaShoppingCart style={{ color: "#5267dd" }} />;
    case "Inventory Report":
      return <MdInventory style={{ color: "#3953c6" }} />;
    case "Excise Report":
      return <TbReport style={{ color: "#0260ff" }} />;
    case "Audit and Accounts":
      return <SiAdobeaudition style={{ color: "#3f50ea" }} />;
    case "Utility":
      return <LuUtilityPole style={{ color: "#5267dd" }} />;

    // Master File submenu icons
    case "Customer Register":
      return <FaUser />;
    case "Suppliers Register":
      return <FaStore />;
    case "LPL Setup":
      return <FaBuilding />;
    case "Stock Register":
      return <FaBoxes />;
    case "Item Category Register":
      return <FaHandHoldingUsd />;
    case "Item Discount Register":
      return <FaWarehouse />;
    case "Dealer Category Discount Register":
      return <FaListAlt />;
    case "Minimum Stock Register":
      return <FaBook />;
    case "Scheme Register":
      return <FaIndustry />;
    case "Ledger Creation":
      return <FaMoneyBill />;
    case "Store Info":
      return <FaRegFileAlt />;
    case "Licensee Info":
      return <FaRegFileAlt />;
    // Data Entry submenu icons
    case "Sale Bill":
      return <MonetizationOnIcon />;
    case "Purchase Entry":
      return <AddShoppingCartIcon />;
    case "Stock Transfer":
      return <StoreIcon />;
    case "Party Payment":
      return <AccountBalanceIcon />;
    case "General Payment":
      return <AccountBalanceWalletIcon />;
    case "Customer Receipt":
      return <FaUser />;
    case "General Receipt":
      return <FaRegFileAlt />;
    case "Cash Deposit to Bank":
      return <FaMoneyBill />;
    case "Cash Withdrawn from Bank":
      return <FaMoneyBill />;
    case "Journal Entry":
      return <FaBook />;
    // Sale Report submenu icons
    case "Sale Report (Summary)":
      return <MonetizationOnIcon />;
    case "Item Wise Sale Report":
      return <FaBoxes />;
    case "Daily Sale Report (DSR)":
      return <AssignmentIcon />;
    case "Daily Profit Report":
      return <FaMoneyBill />;
    case "Sale Status Report":
      return <AccountBalanceIcon />;
    case "Daily Item Sale Status (Category)":
      return <FaHandHoldingUsd />;
    case "Daily Item Sale Status (Brand)":
      return <FaHandHoldingUsd />;
    case "Daily Item Status":
      return <FaBoxes />;
    case "Customer Due Report":
      return <FaUser />;
    case "Salesman Report":
      return <FaUser />;
    case "Receipt Report":
      return <FaRegFileAlt />;
    case "Bill Wise Collection Report":
      return <FaRegFileAlt />;
    case "Dealer Sale Discount Chart":
      return <FaListAlt />;
    case "Customer Transaction Details":
      return <FaUser />;
    case "Profit on Sale":
      return <FaMoneyBill />;
    // Purchase Report submenu icons
    case "Purchase Report (Summary)":
      return <AddShoppingCartIcon />;
    case "Item Wise Purchase Report":
      return <FaBoxes />;
    case "Daily Purchase Report (DPR)":
      return <AssignmentIcon />;
    case "Suppliers Balance Report":
      return <AccountBalanceIcon />;
    case "Payment Report":
      return <AccountBalanceWalletIcon />;
    case "Bill Wise Payment Report":
      return <FaRegFileAlt />;
    default:
      return null;
  }
};
