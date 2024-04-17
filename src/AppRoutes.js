import React from "react";
import { Routes, Route } from "react-router-dom";
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
import StoreInfo from "./components/Navbar_old/MasterFile/StoreInfo";
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
import ItemBatchMRPStockReport from "./components/Sidebar_old/ItemBatchMRPStockReport";
import CategorySaleStatus from "./components/Sidebar_old/CategorySaleStatus";
import CategoryDsr from "./components/Sidebar_old/CategoryDsr";
import CatBrandSize from "./components/Sidebar_old/CatBrandSize";
import DailySaleOrder from "./components/Sidebar_old/DailySaleOrder";
import StockStatus from "./components/Sidebar_old/StockStatus";
import DsrOpst from "./components/Sidebar_old/DsrOpst";
import DsrBrandStock from "./components/Sidebar_old/DsrBrandStock";
import CatLedgerPack from "./components/Sidebar_old/CatLedgerPack";
import GtinStock from "./components/Sidebar_old/GtinStock";
import { useLoginContext } from "./utils/loginContext";
import BrandRegister from "./components/Sidebar_old/BrandRegister";
import CompanyRegister from "./components/Sidebar_old/CompanyRegister";
import ItemRegister from "./components/Navbar_old/MasterFile/StockRegister";
import NotFound from "./components/Others/NotFound";


const AppRoutes = ({
  authenticatedUser,
  handleLogin,
  handleSignUp,
}) => {
  const { loginResponse, setLoginResponse } = useLoginContext();
  return (
    <Routes>
      <Route
        path="/"
        element={
          authenticatedUser ? (
            <Home />
          ) : (
            <LoginForm
              handleLogin={handleLogin}
              setLoginResponse={setLoginResponse}
            />
          )
        }
      />

      <Route
        path={"/login"}
        element={
          <LoginForm
            handleLogin={handleLogin}
            setLoginResponse={setLoginResponse}
          />
        }
      />

      {!authenticatedUser && (
        <Route
          path="/signup"
          element={<SignUpForm handleSignUp={handleSignUp} />}
        />
      )}

      {!authenticatedUser && <Route path="*" element={<NotFound />} />}

      {/* Navbar items */}
      <Route path="/inventory-report" element={<InventoryReport />} />
      <Route path="/excise-report" element={<ExciseReport />} />
      <Route path="/audit-accounts" element={<AuditAndAccounts />} />
      <Route path="/utilities" element={<Utilities />} />

      {/* Master File Submenu items */}
      <Route path="/customer-register" element={<CustomerRegister />} />
      <Route path="/suppliers-register" element={<SuppliersRegister />} />
      <Route path="/lpl-setup" element={<LPLSetup />} />
      <Route path="/stock-register" element={<ItemRegister />} />
      <Route path="/item-category-register" element={<ItemCatRegister />} />
      <Route
        path="/item-discount-register"
        element={<ItemDiscountRegister />}
      />
      <Route
        path="/dealer-category-discount-register"
        element={<DealerCatDiscRegister />}
      />
      <Route path="/minimum-stock-register" element={<MinStockRegister />} />
      <Route path="/scheme-register" element={<SchemeRegister />} />
      <Route path="/ledger-creation" element={<LedgerCreation />} />
      <Route path="/store-info" element={<StoreInfo />} />
      <Route path="/licensee-info" element={<LicenseeInfo />} />

      {/* Data Entry Submenu items */}
      <Route path="/sale-bill" element={<SaleBill />} />
      <Route path="/purchase-entry" element={<PurchaseEntry />} />
      <Route path="/stock-transfer" element={<StockTransfer />} />
      <Route path="/party-payment" element={<PartyPayment />} />
      <Route path="/general-payment" element={<GeneralPayment />} />
      <Route path="/customer-receipt" element={<CustomerReceipt />} />
      <Route path="/general-receipt" element={<GeneralReceipt />} />
      <Route path="/cash-deposit" element={<CashDeposit />} />
      <Route path="/cash-withdrawn" element={<CashWithdrawn />} />
      <Route path="/journal-entry" element={<JournalEntry />} />

      {/* Sale Report Submenu items */}
      <Route path="/sale-report-summary" element={<SaleReportSummary />} />
      <Route path="/item-wise-sale-report" element={<ItemWiseSaleReport />} />
      <Route path="/daily-sale-report" element={<DailySaleReport />} />
      <Route path="/daily-profit-report" element={<DailyProfitReport />} />

      {/* Sale Status Report Submenu items */}
      <Route
        path="/brand-wise-sale-status"
        element={<BrandSaleStatusReport />}
      />
      <Route
        path="/item-category-wise-sale-status"
        element={<ItemCateSaleStatusReport />}
      />
      <Route path="/brand-sale-status" element={<BrandSaleStatus />} />
      <Route path="/category-sale-status" element={<CateSaleStatus />} />
      <Route
        path="/daily-item-sale-category"
        element={<DailyItemSaleCategory />}
      />
      <Route path="/daily-item-sale-brand" element={<DailyItemSaleBrand />} />
      <Route path="/daily-item-status" element={<DailyItemStatus />} />
      <Route path="/customer-due-report" element={<CustomerDueReport />} />
      <Route path="/salesman-report" element={<SalesmanReport />} />
      <Route path="/receipt-report" element={<ReceiptReport />} />
      <Route
        path="/bill-wise-collection-report"
        element={<BillWiseCollectionReport />}
      />
      <Route
        path="/dealer-sale-discount-chart"
        element={<DealerSaleDiscountChart />}
      />
      <Route
        path="/customer-transaction-details"
        element={<CustomerTransactionDetails />}
      />
      <Route path="/profit-on-sale" element={<ProfitOnSale />} />

      {/* Purchase Report Submenu items */}
      <Route
        path="/purchase-report-summary"
        element={<PurchaseReportSummary />}
      />
      <Route
        path="/item-wise-purchase-report"
        element={<ItemWisePurchaseReport />}
      />
      <Route path="/daily-purchase-report" element={<DailyPurchaseReport />} />
      <Route
        path="/suppliers-balance-report"
        element={<SuppliersBalanceReport />}
      />
      <Route path="/payment-report" element={<PaymentReport />} />
      <Route
        path="/bill-wise-payment-report"
        element={<BillWisePaymentReport />}
      />

      {/* Sidebar items */}
      <Route path="/daily-status" element={<DailyStatus />} />
      <Route path="/brand-register" element={<BrandRegister />} />
      <Route path="/company-register" element={<CompanyRegister />} />
      <Route path="/previous-year-dsr" element={<PreviousYearDSR />} />
      <Route
        path="/fl-beer-cs/ledger-summary"
        element={<FLBeerCSLedgerSummary />}
      />
      <Route path="/fl-beer-cs/ledger" element={<FLBeerCSLedger />} />
      <Route path="/category/brand-stock" element={<CatBrandStock />} />
      <Route
        path="/item/batch-mrp-stock-report"
        element={<ItemBatchMRPStockReport />}
      />
      <Route path="/category-sale-status" element={<CategorySaleStatus />} />
      <Route path="/category-dsr" element={<CategoryDsr />} />
      <Route path="/cate-brand-size" element={<CatBrandSize />} />
      <Route path="/daily-sale-order" element={<DailySaleOrder />} />
      <Route path="/stock-status" element={<StockStatus />} />
      <Route path="/dsr-opst" element={<DsrOpst />} />
      <Route path="/dsr-brand-stock" element={<DsrBrandStock />} />
      <Route path="/category-ledger-pack" element={<CatLedgerPack />} />
      <Route path="/gtin-stock" element={<GtinStock />} />
    </Routes>
  );
};

export default AppRoutes;
