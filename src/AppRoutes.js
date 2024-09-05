import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import LoginForm from "./components/LoginComponents/LoginForm";
import SignUpForm from "./components/LoginComponents/SignupForm";
// import AuditAndAccounts from "./components/Navbar_old/AuditAndAccounts/AuditAndAccounts";
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
import UrgentOrder from "./components/Navbar_old/InventoryReport/UrgentOrder";
import GodownShowroomLedger from "./components/Navbar_old/InventoryReport/GodownShowroomLedger";
import GodownLedger from "./components/Navbar_old/InventoryReport/GodownLedger";
import ShowroomLedger from "./components/Navbar_old/InventoryReport/ShowroomLedger";
import FLBeerCsLedger from "./components/Navbar_old/InventoryReport/FLBeerCsLedger";
import StockStatement from "./components/Navbar_old/InventoryReport/StockStatement";
import OnDateReport from "./components/Navbar_old/InventoryReport/OnDateReport";
import BrandStockMrp from "./components/Navbar_old/InventoryReport/BrandStockMrp";
import ItemRateChart from "./components/Navbar_old/InventoryReport/ItemRateChart";
import BarCodeList from "./components/Navbar_old/InventoryReport/BarCodeList";
import ItemTransferReport from "./components/Navbar_old/InventoryReport/ItemTransferReport";
import ItemLedgerStatus from "./modules/ItemLedgerStatus";
import MonthlyStatement from "./components/Navbar_old/ExciseReport/MonthlyStatement";
import StockStatementAllExcise from "./components/Navbar_old/ExciseReport/StockStatementAllExcise";
import StockStatementForm1Excise from "./components/Navbar_old/ExciseReport/StockStatementForm1Excise";
import CategoryRegisterAll from "./components/Navbar_old/ExciseReport/CategoryRegisterAll";
import CategoryRegisterGodown from "./components/Navbar_old/ExciseReport/CategoryRegisterGodown";
import CategoryRegisterCounter from "./components/Navbar_old/ExciseReport/CategoryRegisterCounter";
import BrandRegisterAll from "./components/Navbar_old/ExciseReport/BrandRegisterAll";
import BrandRegisterGodown from "./components/Navbar_old/ExciseReport/BrandRegisterGodown";
import BrandRegisterCounter from "./components/Navbar_old/ExciseReport/BrandRegisterCounter";
import OndateStockRegister from "./components/Navbar_old/ExciseReport/OndateStockRegister";
import DailyStockBook from "./components/Navbar_old/ExciseReport/DailyStockBook";
import MonthlyComparativeFigure from "./components/Navbar_old/ExciseReport/MonthlyComparativeFigure";
import MonthlyCategorySalesFigure from "./components/Navbar_old/ExciseReport/MonthlyCategorySalesFigure";
import MonthlyBrandSalesFigure from "./components/Navbar_old/ExciseReport/MonthlyBrandSalesFigure";
import TPPassReport from "./components/Navbar_old/ExciseReport/TPPassReport";
import AnnualLedger from "./components/Navbar_old/AuditAndAccounts/AnnualLedger";
import CashBook from "./components/Navbar_old/AuditAndAccounts/CashBook";
import BankBook from "./components/Navbar_old/AuditAndAccounts/BankBook";
import JournalReport from "./components/Navbar_old/AuditAndAccounts/JournalReport";
import DailySalesFigure from "./components/Navbar_old/AuditAndAccounts/DailySalesFigure";
import MonthlySalesFigure from "./components/Navbar_old/AuditAndAccounts/MonthlySalesFigure";
import DailyPurchaseFigure from "./components/Navbar_old/AuditAndAccounts/DailyPurchaseFigure";
import MonthlyPurchaseFigure from "./components/Navbar_old/AuditAndAccounts/MonthlyPurchaseFigure";
import PayTaxesOnPurchase from "./components/Navbar_old/AuditAndAccounts/PayTaxesOnPurchase";
import FlStatus from "./components/Navbar_old/AuditAndAccounts/FlStatus";
import TrialBalance from "./components/Navbar_old/AuditAndAccounts/TrialBalance";
import AccountProfitAndLoss from "./components/Navbar_old/AuditAndAccounts/AccountProfitAndLoss";
import BalanceSheet from "./components/Navbar_old/AuditAndAccounts/BalanceSheet";
import Epos from "./modules/Epos";
import AdminPanel from "./modules/AdminPanel";
import DailyItemBatchStatus from "./components/Sidebar_old/DailyItemBatchStatus";
import StockUpdation from "./modules/StockUpdation";

const PrivateRoute = ({ element, authenticatedUser }) => {
  return authenticatedUser ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element, authenticatedUser }) => {
  return authenticatedUser ? <Navigate to="/" /> : element;
};

const AppRoutes = ({
  authenticatedUser,
  handleLogin,
  handleSignUp,
  sidebarVisible,
  handleSignout,
}) => {
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

      <Route
        path="/item-ledger-status"
        element={authenticatedUser ? <ItemLedgerStatus /> : <UnAuthorized />}
      />
      {/* Navbar items */}

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
        element={
          authenticatedUser ? (
            <LicenseeInfo authenticatedUser={authenticatedUser} />
          ) : (
            <UnAuthorized />
          )
        }
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
        path="/item-wise-transfer-report"
        element={authenticatedUser ? <ItemTransferReport /> : <UnAuthorized />}
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
        path="/brand-mrp-stock-report"
        element={
          authenticatedUser ? <BrandStockMrp /> : <UnAuthorized />
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

      {/* Excise Report */}
      <Route
        path="/monthly-statement"
        element={authenticatedUser ? <MonthlyStatement /> : <UnAuthorized />}
      />
      <Route
        path="/stock-statement-all-excise"
        element={
          authenticatedUser ? <StockStatementAllExcise /> : <UnAuthorized />
        }
      />
      <Route
        path="/stock-statement-form1-excise"
        element={
          authenticatedUser ? <StockStatementForm1Excise /> : <UnAuthorized />
        }
      />
      <Route
        path="/category-register-all"
        element={authenticatedUser ? <CategoryRegisterAll /> : <UnAuthorized />}
      />
      <Route
        path="/category-register-godown"
        element={
          authenticatedUser ? <CategoryRegisterGodown /> : <UnAuthorized />
        }
      />
      <Route
        path="/category-register-counter"
        element={
          authenticatedUser ? <CategoryRegisterCounter /> : <UnAuthorized />
        }
      />
      <Route
        path="/brand-register-all"
        element={authenticatedUser ? <BrandRegisterAll /> : <UnAuthorized />}
      />
      <Route
        path="/brand-register-godown"
        element={authenticatedUser ? <BrandRegisterGodown /> : <UnAuthorized />}
      />
      <Route
        path="/brand-register-counter"
        element={
          authenticatedUser ? <BrandRegisterCounter /> : <UnAuthorized />
        }
      />

      <Route
        path="/ondate-stock-register"
        element={authenticatedUser ? <OndateStockRegister /> : <UnAuthorized />}
      />
      <Route
        path="/daily-stock-book"
        element={authenticatedUser ? <DailyStockBook /> : <UnAuthorized />}
      />
      <Route
        path="/monthly-comparative-figure"
        element={
          authenticatedUser ? <MonthlyComparativeFigure /> : <UnAuthorized />
        }
      />
      <Route
        path="/monthly-category-sales-figure"
        element={
          authenticatedUser ? <MonthlyCategorySalesFigure /> : <UnAuthorized />
        }
      />
      <Route
        path="/monthly-brand-sales-figure"
        element={
          authenticatedUser ? <MonthlyBrandSalesFigure /> : <UnAuthorized />
        }
      />
      <Route
        path="/tp-pass-report"
        element={authenticatedUser ? <TPPassReport /> : <UnAuthorized />}
      />
      {/* <Route
        path="/audit-accounts"
        element={authenticatedUser ? <AuditAndAccounts /> : <UnAuthorized />}
      /> */}
      <Route
        path="/utilities"
        element={authenticatedUser ? <Utilities /> : <UnAuthorized />}
      />

      {/* Audit & Accounts */}
      <Route
        path="/annual-ledger"
        element={authenticatedUser ? <AnnualLedger /> : <UnAuthorized />}
      />
      <Route
        path="/cash-book"
        element={authenticatedUser ? <CashBook /> : <UnAuthorized />}
      />
      <Route
        path="/bank-book"
        element={authenticatedUser ? <BankBook /> : <UnAuthorized />}
      />
      <Route
        path="/journal-report"
        element={authenticatedUser ? <JournalReport /> : <UnAuthorized />}
      />
      <Route
        path="/daily-sales-figure"
        element={authenticatedUser ? <DailySalesFigure /> : <UnAuthorized />}
      />
      <Route
        path="/monthly-sales-figure"
        element={authenticatedUser ? <MonthlySalesFigure /> : <UnAuthorized />}
      />
      <Route
        path="/daily-purchase-figure"
        element={authenticatedUser ? <DailyPurchaseFigure /> : <UnAuthorized />}
      />
      <Route
        path="/monthly-purchase-figure"
        element={
          authenticatedUser ? <MonthlyPurchaseFigure /> : <UnAuthorized />
        }
      />
      <Route
        path="/pay-taxes-on-purchase"
        element={authenticatedUser ? <PayTaxesOnPurchase /> : <UnAuthorized />}
      />

      <Route
        path="/fl-status"
        element={authenticatedUser ? <FlStatus /> : <UnAuthorized />}
      />
      <Route
        path="/trial-balance"
        element={authenticatedUser ? <TrialBalance /> : <UnAuthorized />}
      />
      <Route
        path="/accounts-profit-and-loss"
        element={
          authenticatedUser ? <AccountProfitAndLoss /> : <UnAuthorized />
        }
      />
      <Route
        path="/balance-sheet"
        element={authenticatedUser ? <BalanceSheet /> : <UnAuthorized />}
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
        path="/daily-item-batch-report"
        element={
          authenticatedUser ? <DailyItemBatchStatus /> : <UnAuthorized />
        }
      />
      <Route
        path="/gtin-stock"
        element={authenticatedUser ? <GtinStock /> : <UnAuthorized />}
      />

      <Route
        path="/epos"
        element={authenticatedUser ? <Epos /> : <UnAuthorized />}
      />

      <Route
        path="/admin-panel"
        element={authenticatedUser ? <AdminPanel /> : <UnAuthorized />}
      />

      <Route
        path="/stock-updation"
        element={authenticatedUser ? <StockUpdation /> : <UnAuthorized />}
      />
    </Routes>
  );
};

export default AppRoutes;
