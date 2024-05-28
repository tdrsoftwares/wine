import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import LoginForm from "./components/LoginComponents/LoginForm";
import SignUpForm from "./components/LoginComponents/SignupForm";
import InventoryReport from "./components/Navbar_old/InventoryReport/InventoryReport";
import ExciseReport from "./components/Navbar_old/ExciseReport/ExciseReport";
import AuditAndAccounts from "./components/Navbar_old/AuditAndAccounts/AuditAndAccounts";
import Utilities from "./components/Others/Utilities";
import CustomerRegister from "./components/Navbar_old/MasterFile/CustomerRegister";
import SuppliersRegister from "./components/Navbar_old/MasterFile/SuppliersRegister";
import LPLSetup from "./components/Navbar_old/MasterFile/LPLSetup";
import ItemCatRegister from "./components/Navbar_old/MasterFile/ItemCatRegister";
import ItemDiscountRegister from "./components/Navbar_old/MasterFile/ItemDiscountRegister";
import DealerCatDiscRegister from "./components/Navbar_old/MasterFile/DealerCatDiscRegister";
import MinStockRegister from "./components/Navbar_old/MasterFile/MinStockRegister";
import SchemeRegister from "./components/Navbar_old/MasterFile/SchemeRegister";
import LedgerCreation from "./components/Navbar_old/MasterFile/LedgerCreation";
import StoreRegister from "./components/Navbar_old/MasterFile/StoreRegister";
import LicenseeInfo from "./components/Navbar_old/MasterFile/LicenseeInfo";
import SaleBill from "./components/Navbar_old/DataEntry/SaleBill";
import PurchaseEntry from "./components/Navbar_old/DataEntry/PurchaseEntry";
import StockTransfer from "./components/Navbar_old/DataEntry/StockTransfer";
import PartyPayment from "./components/Navbar_old/DataEntry/PartyPayment";
import GeneralPayment from "./components/Navbar_old/DataEntry/GeneralPayment";
import CustomerReceipt from "./components/Navbar_old/DataEntry/CustomerReceipt";
import GeneralReceipt from "./components/Navbar_old/DataEntry/GeneralReceipt";
import CashDeposit from "./components/Navbar_old/DataEntry/CashDeposit";
import CashWithdrawn from "./components/Navbar_old/DataEntry/CashWithdrawn";
import JournalEntry from "./components/Navbar_old/DataEntry/JournalEntry";
import SaleReportSummary from "./components/Navbar_old/SaleReport/SaleReportSummary";
import ItemWiseSaleReport from "./components/Navbar_old/SaleReport/ItemWiseSaleReport";
import DailySaleReport from "./components/Navbar_old/SaleReport/DailySaleReport";
import DailyProfitReport from "./components/Navbar_old/SaleReport/DailyProfitReport";
import DailyItemSaleCategory from "./components/Navbar_old/SaleReport/DailyItemSaleCategory";
import DailyItemSaleBrand from "./components/Navbar_old/SaleReport/DailyItemSaleBrand";
import DailyItemStatus from "./components/Navbar_old/SaleReport/DailyItemStatus";
import CustomerDueReport from "./components/Navbar_old/SaleReport/CustomerDueReport";
import SalesmanReport from "./components/Navbar_old/SaleReport/SalesmanReport";
import ReceiptReport from "./components/Navbar_old/SaleReport/ReceiptReport";
import BillWiseCollectionReport from "./components/Navbar_old/SaleReport/BillWiseCollectionReport";
import DealerSaleDiscountChart from "./components/Navbar_old/SaleReport/DealerSaleDiscountChart";
import CustomerTransactionDetails from "./components/Navbar_old/SaleReport/CustomerTransactionDetails";
import ProfitOnSale from "./components/Navbar_old/SaleReport/ProfitOnSale";
import BrandSaleStatusReport from "./components/Navbar_old/SaleReport/SaleStatusReport/BrandSaleStatusReport";
import ItemCateSaleStatusReport from "./components/Navbar_old/SaleReport/SaleStatusReport/ItemCateSaleStatusReport";
import BrandSaleStatus from "./components/Navbar_old/SaleReport/SaleStatusReport/BrandSaleStatus";
import CateSaleStatus from "./components/Navbar_old/SaleReport/SaleStatusReport/CateSaleStatus";
import PurchaseReportSummary from "./components/Navbar_old/PurchaseReport/PurchaseReportSummary";
import ItemWisePurchaseReport from "./components/Navbar_old/PurchaseReport/ItemWisePurchaseReport";
import DailyPurchaseReport from "./components/Navbar_old/PurchaseReport/DailyPurchaseReport";
import SuppliersBalanceReport from "./components/Navbar_old/PurchaseReport/SuppliersBalanceReport";
import PaymentReport from "./components/Navbar_old/PurchaseReport/PaymentReport";
import BillWisePaymentReport from "./components/Navbar_old/PurchaseReport/BillWisePaymentReport";
import DailyStatus from "./components/Sidebar_old/DailyStatus";
import PreviousYearDSR from "./components/Sidebar_old/PreviousYearDSR";
import FLBeerCSLedgerSummary from "./components/Sidebar_old/FLBeerCSLedgerSummary";
import CatBrandStock from "./components/Sidebar_old/CatBrandStock";
import FLBeerCSLedger from "./components/Sidebar_old/FLBeerCSLedger";
import StockReport from "./components/Sidebar_old/StockReport";
import CategorySaleStatus from "./components/Sidebar_old/CategorySaleStatus";
import CategoryDsr from "./components/Sidebar_old/CategoryDsr";
import CatBrandSize from "./components/Sidebar_old/CatBrandSize";
import DailySaleOrder from "./components/Sidebar_old/DailySaleOrder";
import StockStatus from "./components/Sidebar_old/StockStatus";
import DsrOpst from "./components/Sidebar_old/DsrOpst";
import DsrBrandStock from "./components/Sidebar_old/DsrBrandStock";
import CatLedgerPack from "./components/Sidebar_old/CatLedgerPack";
import GtinStock from "./components/Sidebar_old/GtinStock";
import BrandRegister from "./components/Sidebar_old/BrandRegister";
import CompanyRegister from "./components/Sidebar_old/CompanyRegister";
import ItemRegister from "./components/Navbar_old/MasterFile/ItemRegister";
import NotFound from "./components/Others/NotFound";
import UnAuthorized from "./components/Others/UnAuthorized";
import TransferReport from "./components/Navbar_old/InventoryReport/TransferReport";
import UrgentOrder from "./components/Navbar_old/InventoryReport/UrgentOrder";
import GodownShowroomLedger from "./components/Navbar_old/InventoryReport/GodownShowroomLedger";
import GodownLedger from "./components/Navbar_old/InventoryReport/GodownLedger";
import ShowroomLedger from "./components/Navbar_old/InventoryReport/ShowroomLedger";
import FLBeerCsLedger from "./components/Navbar_old/InventoryReport/FLBeerCsLedger";
import StockStatement from "./components/Navbar_old/InventoryReport/StockStatement";
import OnDateReport from "./components/Navbar_old/InventoryReport/OnDateReport";
import BrandPackLedgerByMrpRange from "./components/Navbar_old/InventoryReport/BrandPackLedgerByMrpRange";
import ItemRateChart from "./components/Navbar_old/InventoryReport/ItemRateChart";
import BarCodeList from "./components/Navbar_old/InventoryReport/BarCodeList";


const PrivateRoute = ({ element, authenticatedUser }) => {
  return authenticatedUser ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element, authenticatedUser }) => {
  return authenticatedUser ? <Navigate to="/" /> : element;
};

const AppRoutes = ({ authenticatedUser, handleLogin, handleSignUp }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute
            element={<Home />}
            authenticatedUser={authenticatedUser}
          />
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute
            element={<LoginForm handleLogin={handleLogin} />}
            authenticatedUser={authenticatedUser}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute
            element={<SignUpForm handleSignUp={handleSignUp} />}
            authenticatedUser={authenticatedUser}
          />
        }
      />
      <Route path="*" element={<NotFound />} />

      {/* Navbar items */}
      {/* <Route
        path="/inventory-report"
        element={authenticatedUser ? <InventoryReport /> : <UnAuthorized />}
      /> */}
      <Route
        path="/excise-report"
        element={authenticatedUser ? <ExciseReport /> : <UnAuthorized />}
      />
      <Route
        path="/audit-accounts"
        element={authenticatedUser ? <AuditAndAccounts /> : <UnAuthorized />}
      />
      <Route
        path="/utilities"
        element={authenticatedUser ? <Utilities /> : <UnAuthorized />}
      />

      {/* Master File Submenu items */}
      <Route
        path="/customer-register"
        element={authenticatedUser ? <CustomerRegister /> : <UnAuthorized />}
      />
      <Route
        path="/suppliers-register"
        element={authenticatedUser ? <SuppliersRegister /> : <UnAuthorized />}
      />
      <Route
        path="/lpl-setup"
        element={authenticatedUser ? <LPLSetup /> : <UnAuthorized />}
      />
      <Route
        path="/item-register"
        element={authenticatedUser ? <ItemRegister /> : <UnAuthorized />}
      />
      <Route
        path="/item-category-register"
        element={authenticatedUser ? <ItemCatRegister /> : <UnAuthorized />}
      />
      <Route
        path="/item-discount-register"
        element={
          authenticatedUser ? <ItemDiscountRegister /> : <UnAuthorized />
        }
      />
      <Route
        path="/dealer-category-discount-register"
        element={
          authenticatedUser ? <DealerCatDiscRegister /> : <UnAuthorized />
        }
      />
      <Route
        path="/minimum-stock-register"
        element={authenticatedUser ? <MinStockRegister /> : <UnAuthorized />}
      />
      <Route
        path="/scheme-register"
        element={authenticatedUser ? <SchemeRegister /> : <UnAuthorized />}
      />
      <Route
        path="/ledger-creation"
        element={authenticatedUser ? <LedgerCreation /> : <UnAuthorized />}
      />
      <Route
        path="/store-register"
        element={authenticatedUser ? <StoreRegister /> : <UnAuthorized />}
      />
      <Route
        path="/licensee-info"
        element={authenticatedUser ? <LicenseeInfo /> : <UnAuthorized />}
      />

      {/* Data Entry Submenu items */}
      <Route
        path="/sale-bill"
        element={authenticatedUser ? <SaleBill /> : <UnAuthorized />}
      />
      <Route
        path="/purchase-entry"
        element={authenticatedUser ? <PurchaseEntry /> : <UnAuthorized />}
      />
      <Route
        path="/stock-transfer"
        element={authenticatedUser ? <StockTransfer /> : <UnAuthorized />}
      />
      <Route
        path="/party-payment"
        element={authenticatedUser ? <PartyPayment /> : <UnAuthorized />}
      />
      <Route
        path="/general-payment"
        element={authenticatedUser ? <GeneralPayment /> : <UnAuthorized />}
      />
      <Route
        path="/customer-receipt"
        element={authenticatedUser ? <CustomerReceipt /> : <UnAuthorized />}
      />
      <Route
        path="/general-receipt"
        element={authenticatedUser ? <GeneralReceipt /> : <UnAuthorized />}
      />
      <Route
        path="/cash-deposit"
        element={authenticatedUser ? <CashDeposit /> : <UnAuthorized />}
      />
      <Route
        path="/cash-withdrawn"
        element={authenticatedUser ? <CashWithdrawn /> : <UnAuthorized />}
      />
      <Route
        path="/journal-entry"
        element={authenticatedUser ? <JournalEntry /> : <UnAuthorized />}
      />

      {/* Sale Report Submenu items */}
      <Route
        path="/sale-report-summary"
        element={authenticatedUser ? <SaleReportSummary /> : <UnAuthorized />}
      />
      <Route
        path="/item-wise-sale-report"
        element={authenticatedUser ? <ItemWiseSaleReport /> : <UnAuthorized />}
      />
      <Route
        path="/daily-sale-report"
        element={authenticatedUser ? <DailySaleReport /> : <UnAuthorized />}
      />
      <Route
        path="/daily-profit-report"
        element={authenticatedUser ? <DailyProfitReport /> : <UnAuthorized />}
      />

      {/* Sale Status Report Submenu items */}
      <Route
        path="/brand-wise-sale-status"
        element={
          authenticatedUser ? <BrandSaleStatusReport /> : <UnAuthorized />
        }
      />
      <Route
        path="/item-category-wise-sale-status"
        element={
          authenticatedUser ? <ItemCateSaleStatusReport /> : <UnAuthorized />
        }
      />
      <Route
        path="/brand-sale-status"
        element={authenticatedUser ? <BrandSaleStatus /> : <UnAuthorized />}
      />
      <Route
        path="/category-sale-status"
        element={authenticatedUser ? <CateSaleStatus /> : <UnAuthorized />}
      />
      <Route
        path="/daily-item-sale-category"
        element={
          authenticatedUser ? <DailyItemSaleCategory /> : <UnAuthorized />
        }
      />
      <Route
        path="/daily-item-sale-brand"
        element={authenticatedUser ? <DailyItemSaleBrand /> : <UnAuthorized />}
      />
      <Route
        path="/daily-item-status"
        element={authenticatedUser ? <DailyItemStatus /> : <UnAuthorized />}
      />
      <Route
        path="/customer-due-report"
        element={authenticatedUser ? <CustomerDueReport /> : <UnAuthorized />}
      />
      <Route
        path="/salesman-report"
        element={authenticatedUser ? <SalesmanReport /> : <UnAuthorized />}
      />
      <Route
        path="/receipt-report"
        element={authenticatedUser ? <ReceiptReport /> : <UnAuthorized />}
      />
      <Route
        path="/bill-wise-collection-report"
        element={
          authenticatedUser ? <BillWiseCollectionReport /> : <UnAuthorized />
        }
      />
      <Route
        path="/dealer-sale-discount-chart"
        element={
          authenticatedUser ? <DealerSaleDiscountChart /> : <UnAuthorized />
        }
      />
      <Route
        path="/customer-transaction-details"
        element={
          authenticatedUser ? <CustomerTransactionDetails /> : <UnAuthorized />
        }
      />
      <Route
        path="/profit-on-sale"
        element={authenticatedUser ? <ProfitOnSale /> : <UnAuthorized />}
      />

      {/* Purchase Report Submenu items */}
      <Route
        path="/purchase-report-summary"
        element={
          authenticatedUser ? <PurchaseReportSummary /> : <UnAuthorized />
        }
      />
      <Route
        path="/item-wise-purchase-report"
        element={
          authenticatedUser ? <ItemWisePurchaseReport /> : <UnAuthorized />
        }
      />
      <Route
        path="/daily-purchase-report"
        element={authenticatedUser ? <DailyPurchaseReport /> : <UnAuthorized />}
      />
      <Route
        path="/suppliers-balance-report"
        element={
          authenticatedUser ? <SuppliersBalanceReport /> : <UnAuthorized />
        }
      />
      <Route
        path="/payment-report"
        element={authenticatedUser ? <PaymentReport /> : <UnAuthorized />}
      />
      <Route
        path="/bill-wise-payment-report"
        element={
          authenticatedUser ? <BillWisePaymentReport /> : <UnAuthorized />
        }
      />

      {/* Inverntory Report Submenu items */}
      <Route
        path="/transfer-report"
        element={authenticatedUser ? <TransferReport /> : <UnAuthorized />}
      />
      <Route
        path="/urgent-order"
        element={authenticatedUser ? <UrgentOrder /> : <UnAuthorized />}
      />
      <Route
        path="/stock-report"
        element={authenticatedUser ? <StockReport /> : <UnAuthorized />}
      />
      <Route
        path="/godown-showroom-ledger"
        element={
          authenticatedUser ? <GodownShowroomLedger /> : <UnAuthorized />
        }
      />
      <Route
        path="/godown-ledger"
        element={authenticatedUser ? <GodownLedger /> : <UnAuthorized />}
      />
      <Route
        path="/showroom-ledger"
        element={authenticatedUser ? <ShowroomLedger /> : <UnAuthorized />}
      />
      <Route
        path="/fl-beer-cs-ledger"
        element={authenticatedUser ? <FLBeerCsLedger /> : <UnAuthorized />}
      />
      <Route
        path="/stock-statement"
        element={authenticatedUser ? <StockStatement /> : <UnAuthorized />}
      />
      <Route
        path="/on-date-report"
        element={authenticatedUser ? <OnDateReport /> : <UnAuthorized />}
      />
      <Route
        path="/brand-pack-ledger-by-mrp-range"
        element={
          authenticatedUser ? <BrandPackLedgerByMrpRange /> : <UnAuthorized />
        }
      />
      <Route
        path="/item-rate-chart"
        element={authenticatedUser ? <ItemRateChart /> : <UnAuthorized />}
      />
      <Route
        path="/bar-code-list"
        element={authenticatedUser ? <BarCodeList /> : <UnAuthorized />}
      />

      {/* Sidebar items */}
      <Route
        path="/daily-status"
        element={authenticatedUser ? <DailyStatus /> : <UnAuthorized />}
      />
      <Route
        path="/brand-register"
        element={authenticatedUser ? <BrandRegister /> : <UnAuthorized />}
      />
      <Route
        path="/company-register"
        element={authenticatedUser ? <CompanyRegister /> : <UnAuthorized />}
      />
      <Route
        path="/previous-year-dsr"
        element={authenticatedUser ? <PreviousYearDSR /> : <UnAuthorized />}
      />
      <Route
        path="/fl-beer-cs/ledger-summary"
        element={
          authenticatedUser ? <FLBeerCSLedgerSummary /> : <UnAuthorized />
        }
      />
      <Route
        path="/fl-beer-cs/ledger"
        element={authenticatedUser ? <FLBeerCSLedger /> : <UnAuthorized />}
      />
      <Route
        path="/category/brand-stock"
        element={authenticatedUser ? <CatBrandStock /> : <UnAuthorized />}
      />
      <Route
        path="/stock-report"
        element={authenticatedUser ? <StockReport /> : <UnAuthorized />}
      />
      <Route
        path="/category-sale-status"
        element={authenticatedUser ? <CategorySaleStatus /> : <UnAuthorized />}
      />
      <Route
        path="/category-dsr"
        element={authenticatedUser ? <CategoryDsr /> : <UnAuthorized />}
      />
      <Route
        path="/cate-brand-size"
        element={authenticatedUser ? <CatBrandSize /> : <UnAuthorized />}
      />
      <Route
        path="/daily-sale-order"
        element={authenticatedUser ? <DailySaleOrder /> : <UnAuthorized />}
      />
      <Route
        path="/stock-status"
        element={authenticatedUser ? <StockStatus /> : <UnAuthorized />}
      />
      <Route
        path="/dsr-opst"
        element={authenticatedUser ? <DsrOpst /> : <UnAuthorized />}
      />
      <Route
        path="/dsr-brand-stock"
        element={authenticatedUser ? <DsrBrandStock /> : <UnAuthorized />}
      />
      <Route
        path="/category-ledger-pack"
        element={authenticatedUser ? <CatLedgerPack /> : <UnAuthorized />}
      />
      <Route
        path="/gtin-stock"
        element={authenticatedUser ? <GtinStock /> : <UnAuthorized />}
      />
    </Routes>
  );
};

export default AppRoutes;
