import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import LoginForm from "./components/LoginComponents/LoginForm";
import SignUpForm from "./components/LoginComponents/SignupForm";
import InventoryReport from "./components/Navbar/InventoryReport/InventoryReport";
import ExciseReport from "./components/Navbar/ExciseReport/ExciseReport";
import AuditAndAccounts from "./components/Navbar/AuditAndAccounts/AuditAndAccounts";
import Utilities from "./components/Others/Utilities";
import CustomerRegister from "./components/Navbar/MasterFile/CustomerRegister";
import SuppliersRegister from "./components/Navbar/MasterFile/SuppliersRegister";
import LPLSetup from "./components/Navbar/MasterFile/LPLSetup";
import ItemCatRegister from "./components/Navbar/MasterFile/ItemCatRegister";
import ItemDiscountRegister from "./components/Navbar/MasterFile/ItemDiscountRegister";
import DealerCatDiscRegister from "./components/Navbar/MasterFile/DealerCatDiscRegister";
import MinStockRegister from "./components/Navbar/MasterFile/MinStockRegister";
import SchemeRegister from "./components/Navbar/MasterFile/SchemeRegister";
import LedgerCreation from "./components/Navbar/MasterFile/LedgerCreation";
import StoreInfo from "./components/Navbar/MasterFile/StoreInfo";
import LicenseeInfo from "./components/Navbar/MasterFile/LicenseeInfo";
import SaleBill from "./components/Navbar/DataEntry/SaleBill";
import PurchaseEntry from "./components/Navbar/DataEntry/PurchaseEntry";
import StockTransfer from "./components/Navbar/DataEntry/StockTransfer";
import PartyPayment from "./components/Navbar/DataEntry/PartyPayment";
import GeneralPayment from "./components/Navbar/DataEntry/GeneralPayment";
import CustomerReceipt from "./components/Navbar/DataEntry/CustomerReceipt";
import GeneralReceipt from "./components/Navbar/DataEntry/GeneralReceipt";
import CashDeposit from "./components/Navbar/DataEntry/CashDeposit";
import CashWithdrawn from "./components/Navbar/DataEntry/CashWithdrawn";
import JournalEntry from "./components/Navbar/DataEntry/JournalEntry";
import SaleReportSummary from "./components/Navbar/SaleReport/SaleReportSummary";
import ItemWiseSaleReport from "./components/Navbar/SaleReport/ItemWiseSaleReport";
import DailySaleReport from "./components/Navbar/SaleReport/DailySaleReport";
import DailyProfitReport from "./components/Navbar/SaleReport/DailyProfitReport";
import DailyItemSaleCategory from "./components/Navbar/SaleReport/DailyItemSaleCategory";
import DailyItemSaleBrand from "./components/Navbar/SaleReport/DailyItemSaleBrand";
import DailyItemStatus from "./components/Navbar/SaleReport/DailyItemStatus";
import CustomerDueReport from "./components/Navbar/SaleReport/CustomerDueReport";
import SalesmanReport from "./components/Navbar/SaleReport/SalesmanReport";
import ReceiptReport from "./components/Navbar/SaleReport/ReceiptReport";
import BillWiseCollectionReport from "./components/Navbar/SaleReport/BillWiseCollectionReport";
import DealerSaleDiscountChart from "./components/Navbar/SaleReport/DealerSaleDiscountChart";
import CustomerTransactionDetails from "./components/Navbar/SaleReport/CustomerTransactionDetails";
import ProfitOnSale from "./components/Navbar/SaleReport/ProfitOnSale";
import BrandSaleStatusReport from "./components/Navbar/SaleReport/SaleStatusReport/BrandSaleStatusReport";
import ItemCateSaleStatusReport from "./components/Navbar/SaleReport/SaleStatusReport/ItemCateSaleStatusReport";
import BrandSaleStatus from "./components/Navbar/SaleReport/SaleStatusReport/BrandSaleStatus";
import CateSaleStatus from "./components/Navbar/SaleReport/SaleStatusReport/CateSaleStatus";
import PurchaseReportSummary from "./components/Navbar/PurchaseReport/PurchaseReportSummary";
import ItemWisePurchaseReport from "./components/Navbar/PurchaseReport/ItemWisePurchaseReport";
import DailyPurchaseReport from "./components/Navbar/PurchaseReport/DailyPurchaseReport";
import SuppliersBalanceReport from "./components/Navbar/PurchaseReport/SuppliersBalanceReport";
import PaymentReport from "./components/Navbar/PurchaseReport/PaymentReport";
import BillWisePaymentReport from "./components/Navbar/PurchaseReport/BillWisePaymentReport";
import DailyStatus from "./components/Sidebar/DailyStatus";
import PreviousYearDSR from "./components/Sidebar/PreviousYearDSR";
import FLBeerCSLedgerSummary from "./components/Sidebar/FLBeerCSLedgerSummary";
import CatBrandStock from "./components/Sidebar/CatBrandStock";
import FLBeerCSLedger from "./components/Sidebar/FLBeerCSLedger";
import ItemBatchMRPStockReport from "./components/Sidebar/ItemBatchMRPStockReport";
import CategorySaleStatus from "./components/Sidebar/CategorySaleStatus";
import CategoryDsr from "./components/Sidebar/CategoryDsr";
import CatBrandSize from "./components/Sidebar/CatBrandSize";
import DailySaleOrder from "./components/Sidebar/DailySaleOrder";
import StockStatus from "./components/Sidebar/StockStatus";
import DsrOpst from "./components/Sidebar/DsrOpst";
import DsrBrandStock from "./components/Sidebar/DsrBrandStock";
import CatLedgerPack from "./components/Sidebar/CatLedgerPack";
import GtinStock from "./components/Sidebar/GtinStock";
import { useLoginContext } from "./utils/loginContext";
import BrandRegister from "./components/Sidebar/BrandRegister";
import CompanyRegister from "./components/Sidebar/CompanyRegister";
import ItemRegister from "./components/Navbar/MasterFile/StockRegister";
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
