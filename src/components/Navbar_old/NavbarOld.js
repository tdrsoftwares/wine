import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavbarOld = () => {
  const [isMasterFileDropdownOpen, setIsMasterFileDropdownOpen] =
    useState(false);
  const [isDataEntryDropdownOpen, setIsDataEntryDropdownOpen] = useState(false);
  const [isSaleReportDropdownOpen, setIsSaleReportDropdownOpen] =
    useState(false);
  const [isSaleStatusReportDropdownOpen, setIsSaleStatusReportDropdownOpen] =
    useState(false);
  const [isPurchaseReportDropdownOpen, setIsPurchaseReportDropdownOpen] =
    useState(false);
  const [isInventoryReportDropdownOpen, setIsInventoryReportDropdownOpen] =
    useState(false);
  const [isTransferReportDropdownOpen, setIsTransferStatusReportDropdownOpen] =
    useState(false);
  const [isUrgentOrderDropdownOpen, setIsUrgentOrderDropdownOpen] =
    useState(false);
  const [isGodownShowroomDropdownOpen, setIsGodownShowroomDropdownOpen] =
    useState(false);
  const [isExciseReportDropdownOpen, setIsExciseReportDropdownOpen] =
    useState(false);
  const [isAuditAccountsDropdownOpen, setIsAuditAccountsDropdownOpen] =
    useState(false);
  const [isUtilitiesDropdownOpen, setIsUtilitiesDropdownOpen] =
    useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const masterFileDropdownRef = useRef(null);
  const dataEntryDropdownRef = useRef(null);
  const saleReportDropdownRef = useRef(null);
  const saleStatusReportDropdownRef = useRef(null);
  const purchaseReportDropdownRef = useRef(null);
  const inventoryReportDropdownRef = useRef(null);
  const transferReportDropdownRef = useRef(null);
  const urgentOrderDropdownRef = useRef(null);
  const godownShowroomLedgerDropdownRef = useRef(null);
  const exciseReportDropdownRef = useRef(null);
  const auditAccountsDropdownRef = useRef(null);
  const utilitiesDropdownRef = useRef(null);

  const toggleMasterFileDropdown = () => {
    setIsMasterFileDropdownOpen((prevState) => !prevState);
  };

  const toggleDataEntryDropdown = () => {
    setIsDataEntryDropdownOpen((prevState) => !prevState);
  };

  const toggleSaleReportDropdown = () => {
    setIsSaleReportDropdownOpen((prevState) => !prevState);
  };

  const toggleSaleStatusReportDropdown = () => {
    setIsSaleStatusReportDropdownOpen((prevState) => !prevState);
  };

  const togglePurchaseReportDropdown = () => {
    setIsPurchaseReportDropdownOpen((prevState) => !prevState);
  };

  const toggleInventoryReportDropdown = () => {
    setIsInventoryReportDropdownOpen((prevState) => !prevState);
  };

  const toggleTransferReportDropdown = () => {
    setIsTransferStatusReportDropdownOpen((prevState) => !prevState);
  };

  const toggleUrgentOrderDropdown = () => {
    setIsUrgentOrderDropdownOpen((prevState) => !prevState);
  };

  const toggleGodownShowroomDropdown = () => {
    setIsGodownShowroomDropdownOpen((prevState) => !prevState);
  };

  const toggleExciseReportDropdown = () => {
    setIsExciseReportDropdownOpen((prevState) => !prevState);
  };

  const toggleAuditAccountsDropdown = () => {
    setIsAuditAccountsDropdownOpen((prevState) => !prevState);
  };

  const toggleUtilitiesDropdown = () => {
    setIsUtilitiesDropdownOpen((prevState) => !prevState);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeAllDropdowns = () => {
    setIsMasterFileDropdownOpen(false);
    setIsDataEntryDropdownOpen(false);
    setIsSaleReportDropdownOpen(false);
    setIsSaleStatusReportDropdownOpen(false);
    setIsPurchaseReportDropdownOpen(false);
    setIsInventoryReportDropdownOpen(false);
    setIsTransferStatusReportDropdownOpen(false);
    setIsUrgentOrderDropdownOpen(false);
    setIsGodownShowroomDropdownOpen(false);
    setIsExciseReportDropdownOpen(false);
    setIsAuditAccountsDropdownOpen(false);
    setIsUtilitiesDropdownOpen(false);
  };

  useEffect(() => {
    const closeDropdownOnOutsideClick = (event) => {
      if (
        masterFileDropdownRef.current &&
        !masterFileDropdownRef.current.contains(event.target)
      ) {
        setIsMasterFileDropdownOpen(false);
      }
      if (
        dataEntryDropdownRef.current &&
        !dataEntryDropdownRef.current.contains(event.target)
      ) {
        setIsDataEntryDropdownOpen(false);
      }
      if (
        saleReportDropdownRef.current &&
        !saleReportDropdownRef.current.contains(event.target)
      ) {
        setIsSaleReportDropdownOpen(false);
      }
      if (
        saleStatusReportDropdownRef.current &&
        !saleStatusReportDropdownRef.current.contains(event.target)
      ) {
        setIsSaleStatusReportDropdownOpen(false);
      }
      if (
        purchaseReportDropdownRef.current &&
        !purchaseReportDropdownRef.current.contains(event.target)
      ) {
        setIsPurchaseReportDropdownOpen(false);
      }
      if (
        inventoryReportDropdownRef.current &&
        !inventoryReportDropdownRef.current.contains(event.target)
      ) {
        setIsInventoryReportDropdownOpen(false);
      }
      if (
        transferReportDropdownRef.current &&
        !transferReportDropdownRef.current.contains(event.target)
      ) {
        setIsTransferStatusReportDropdownOpen(false);
      }
      if (
        urgentOrderDropdownRef.current &&
        !urgentOrderDropdownRef.current.contains(event.target)
      ) {
        setIsUrgentOrderDropdownOpen(false);
      }
      if (
        godownShowroomLedgerDropdownRef.current &&
        !godownShowroomLedgerDropdownRef.current.contains(event.target)
      ) {
        setIsGodownShowroomDropdownOpen(false);
      }
      if (
        exciseReportDropdownRef.current &&
        !exciseReportDropdownRef.current.contains(event.target)
      ) {
        setIsExciseReportDropdownOpen(false);
      }
      if (
        auditAccountsDropdownRef.current &&
        !auditAccountsDropdownRef.current.contains(event.target)
      ) {
        setIsAuditAccountsDropdownOpen(false);
      }
      if (
        utilitiesDropdownRef.current &&
        !utilitiesDropdownRef.current.contains(event.target)
      ) {
        setIsUtilitiesDropdownOpen(false);
      }
    };

    document.body.addEventListener("click", closeDropdownOnOutsideClick);

    return () => {
      document.body.removeEventListener("click", closeDropdownOnOutsideClick);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <ul className={`navbar-links ${isSidebarOpen ? "active" : ""}`}>
          <li className="nav-item nav-title">
            <Link to="/" className="nav-link">
              TDR SOFTWARES
            </Link>
          </li>

          {/* Master File Dropdown */}
          <li className="nav-item dropdown" ref={masterFileDropdownRef}>
            <span
              className="dropdown-toggle nav-link"
              onClick={toggleMasterFileDropdown}
            >
              Master File <i className="fas fa-caret-down"></i>
            </span>
            <div
              className={`dropdown-content ${
                isMasterFileDropdownOpen ? "open" : ""
              }`}
            >
              <Link to="/customer-register" onClick={closeAllDropdowns}>
                Customer Register
              </Link>
              <Link to="/suppliers-register" onClick={closeAllDropdowns}>
                Suppliers Register
              </Link>
              <Link to="/lpl-setup" onClick={closeAllDropdowns}>
                LPL Setup
              </Link>
              <Link to="/item-register" onClick={closeAllDropdowns}>
                Item Register
              </Link>
              <Link to="/item-category-register" onClick={closeAllDropdowns}>
                Item Category Register
              </Link>
              <Link to="/item-discount-register" onClick={closeAllDropdowns}>
                Item Discount Register
              </Link>
              <Link
                to="/dealer-category-discount-register"
                onClick={closeAllDropdowns}
              >
                Dealer Category Discount Register
              </Link>
              <Link to="/minimum-stock-register" onClick={closeAllDropdowns}>
                Minimum Stock Register
              </Link>
              <Link to="/scheme-register" onClick={closeAllDropdowns}>
                Scheme Register
              </Link>
              <Link to="/ledger-creation" onClick={closeAllDropdowns}>
                Ledger Creation
              </Link>
              <Link to="/store-register" onClick={closeAllDropdowns}>
                Store Register
              </Link>
              <Link to="/licensee-info" onClick={closeAllDropdowns}>
                Licensee Info
              </Link>
            </div>
          </li>
          {/* Data Entry Dropdown */}
          <li className="nav-item dropdown" ref={dataEntryDropdownRef}>
            <span
              className="dropdown-toggle nav-link"
              onClick={toggleDataEntryDropdown}
            >
              Data Entry <i className="fas fa-caret-down"></i>
            </span>
            <div
              className={`dropdown-content ${
                isDataEntryDropdownOpen ? "open" : ""
              }`}
            >
              <Link to="/sale-bill" onClick={closeAllDropdowns}>
                Sale Bill
              </Link>
              <Link to="/purchase-entry" onClick={closeAllDropdowns}>
                Purchase Entry
              </Link>
              <Link to="/stock-transfer" onClick={closeAllDropdowns}>
                Stock Transfer
              </Link>
              <Link to="/party-payment" onClick={closeAllDropdowns}>
                Party Payment
              </Link>
              <Link to="/general-payment" onClick={closeAllDropdowns}>
                General Payment
              </Link>
              <Link to="/customer-receipt" onClick={closeAllDropdowns}>
                Customer Receipt
              </Link>
              <Link to="/general-receipt" onClick={closeAllDropdowns}>
                General Receipt
              </Link>
              <Link to="/cash-deposit" onClick={closeAllDropdowns}>
                Cash Deposit to Bank
              </Link>
              <Link to="/cash-withdrawn" onClick={closeAllDropdowns}>
                Cash Withdrawn from Bank
              </Link>
              <Link to="/journal-entry" onClick={closeAllDropdowns}>
                Journal Entry
              </Link>
            </div>
          </li>
          {/* Sale Report Dropdown */}
          <li className="nav-item dropdown" ref={saleReportDropdownRef}>
            <span
              className="dropdown-toggle nav-link"
              onClick={toggleSaleReportDropdown}
            >
              Sale Report <i className="fas fa-caret-down"></i>
            </span>

            <div
              className={`dropdown-content ${
                isSaleReportDropdownOpen ? "open" : ""
              }`}
            >
              <Link to="/sale-report-summary" onClick={closeAllDropdowns}>
                Sale Report (Summary)
              </Link>
              <Link to="/item-wise-sale-report" onClick={closeAllDropdowns}>
                Item Wise Sale Report
              </Link>
              <Link to="/daily-sale-report" onClick={closeAllDropdowns}>
                Daily Sale Report (DSR)
              </Link>
              <Link to="/daily-profit-report" onClick={closeAllDropdowns}>
                Daily Profit Report
              </Link>
              <li
                className="nav-item dropdown"
                ref={saleStatusReportDropdownRef}
                onClick={toggleSaleStatusReportDropdown}
              >
                <span className="">
                  Sale Status Report &nbsp;
                  <i className="fas fa-caret-right"></i>
                </span>
                <div
                  className={`sale-status-dropdown-content ${
                    isSaleStatusReportDropdownOpen ? "open" : ""
                  }`}
                >
                  <Link
                    to="/brand-wise-sale-status"
                    onClick={closeAllDropdowns}
                  >
                    Brand Wise Sale Status
                  </Link>
                  <Link
                    to="/item-category-wise-sale-status"
                    onClick={closeAllDropdowns}
                  >
                    Item Category Wise Sale Status
                  </Link>
                  <Link to="/brand-sale-status" onClick={closeAllDropdowns}>
                    Brand Sale Status
                  </Link>
                  <Link to="/category-sale-status" onClick={closeAllDropdowns}>
                    Category Sale Status
                  </Link>
                </div>
              </li>
              <Link to="/daily-item-sale-category" onClick={closeAllDropdowns}>
                Daily Item Sale Status (Category)
              </Link>
              <Link to="/daily-item-sale-brand" onClick={closeAllDropdowns}>
                Daily Item Sale Status (Brand)
              </Link>
              <Link to="/daily-item-status" onClick={closeAllDropdowns}>
                Daily Item Status
              </Link>
              <Link to="/customer-due-report" onClick={closeAllDropdowns}>
                Customer Due Report
              </Link>
              <Link to="/salesman-report" onClick={closeAllDropdowns}>
                Salesman Report
              </Link>
              <Link to="/receipt-report" onClick={closeAllDropdowns}>
                Receipt Report
              </Link>
              <Link
                to="/bill-wise-collection-report"
                onClick={closeAllDropdowns}
              >
                Bill Wise Collection Report
              </Link>
              <Link
                to="/dealer-sale-discount-chart"
                onClick={closeAllDropdowns}
              >
                Dealer Sale Discount Chart
              </Link>
              <Link
                to="/customer-transaction-details"
                onClick={closeAllDropdowns}
              >
                Customer Transaction Details
              </Link>
              <Link to="/profit-on-sale" onClick={closeAllDropdowns}>
                Profit On Sale
              </Link>
            </div>
          </li>

          {/* Purchase Report Dropdown */}
          <li className="nav-item dropdown" ref={purchaseReportDropdownRef}>
            <span
              className="dropdown-toggle nav-link"
              onClick={togglePurchaseReportDropdown}
            >
              Purchase Report <i className="fas fa-caret-down"></i>
            </span>
            <div
              className={`dropdown-content ${
                isPurchaseReportDropdownOpen ? "open" : ""
              }`}
            >
              <Link to="/purchase-report-summary" onClick={closeAllDropdowns}>
                Purchase Report (Summary)
              </Link>
              <Link to="/item-wise-purchase-report" onClick={closeAllDropdowns}>
                Item Wise Purchase Report
              </Link>
              <Link to="/daily-purchase-report" onClick={closeAllDropdowns}>
                Daily Purchase Report (Dpr)
              </Link>
              <Link to="/suppliers-balance-report" onClick={closeAllDropdowns}>
                Suppliers Balance Report
              </Link>
              <Link to="/payment-report" onClick={closeAllDropdowns}>
                Payment Report
              </Link>
              <Link to="/bill-wise-payment-report" onClick={closeAllDropdowns}>
                Bill Wise Payment Report
              </Link>
            </div>
          </li>

          {/* Inventory Report Dropdown */}
          <li className="nav-item dropdown" ref={inventoryReportDropdownRef}>
            <span
              className="dropdown-toggle nav-link"
              onClick={toggleInventoryReportDropdown}
            >
              Inventory Report <i className="fas fa-caret-down"></i>
            </span>
            <div
              className={`dropdown-content ${
                isInventoryReportDropdownOpen ? "open" : ""
              }`}
            >
              <li
                className="nav-item dropdown"
                ref={transferReportDropdownRef}
                onClick={toggleTransferReportDropdown}
              >
                <span className="">
                  Transfer Report &nbsp;
                  <i className="fas fa-caret-right"></i>
                </span>
                <div
                  className={`transfer-report-dropdown-content ${
                    isTransferReportDropdownOpen ? "open" : ""
                  }`}
                >
                  <Link
                    to="/item-wise-transfer-report"
                    onClick={closeAllDropdowns}
                  >
                    Item Wise Transfer Report
                  </Link>
                </div>
              </li>

              <li
                className="nav-item dropdown"
                ref={urgentOrderDropdownRef}
                onClick={toggleUrgentOrderDropdown}
              >
                <span className="">
                  Urgent Order &nbsp;
                  <i className="fas fa-caret-right"></i>
                </span>
                <div
                  className={`urgent-order-dropdown-content ${
                    isUrgentOrderDropdownOpen ? "open" : ""
                  }`}
                >
                  <Link
                    to="/urgent-order-minimum-stocks"
                    onClick={closeAllDropdowns}
                  >
                    Urgent order on minimum stocks
                  </Link>
                  <Link to="/urgent-order-sales" onClick={closeAllDropdowns}>
                    Urgent order on sales
                  </Link>
                </div>
              </li>

              <Link to="/stock-report" onClick={closeAllDropdowns}>
                Stock Report
              </Link>

              <li
                className="nav-item dropdown"
                ref={godownShowroomLedgerDropdownRef}
                onClick={toggleGodownShowroomDropdown}
              >
                <span className="">
                  Godown/Showroom Ledger &nbsp;
                  <i className="fas fa-caret-right"></i>
                </span>
                <div
                  className={`godown-showroom-ledger ${
                    isGodownShowroomDropdownOpen ? "open" : ""
                  }`}
                >
                  <Link to="/stock-ledger-brand" onClick={closeAllDropdowns}>
                    Stock Ledger Brand
                  </Link>
                  <Link to="/stock-ledger-category" onClick={closeAllDropdowns}>
                    Stock Ledger Category
                  </Link>
                  <Link
                    to="/stock-ledger-category-pack"
                    onClick={closeAllDropdowns}
                  >
                    Stock Ledger Category/Pack
                  </Link>
                </div>
              </li>

              <Link to="/godown-ledger" onClick={closeAllDropdowns}>
                Godown Ledger
              </Link>

              <Link to="/showroom-ledger" onClick={closeAllDropdowns}>
                Showroom Ledger
              </Link>
              <Link to="/fl-beer-cs-ledger" onClick={closeAllDropdowns}>
                FL, Beer Cs Ledger
              </Link>
              <Link to="/stock-statement" onClick={closeAllDropdowns}>
                Stock Statement
              </Link>
              <Link to="/on-date-report" onClick={closeAllDropdowns}>
                On Date Report
              </Link>
              <Link
                to="/brand-mrp-stock-report"
                onClick={closeAllDropdowns}
              >
                Brand Mrp Stock Report
              </Link>
              <Link to="/item-rate-chart" onClick={closeAllDropdowns}>
                Item Rate Chart
              </Link>
              <Link to="/bar-code-list" onClick={closeAllDropdowns}>
                Bar Code List
              </Link>
            </div>
          </li>

          {/* Excise Report Dropdown */}
          <li className="nav-item dropdown" ref={exciseReportDropdownRef}>
            <span
              className="dropdown-toggle nav-link"
              onClick={toggleExciseReportDropdown}
            >
              Excise Report <i className="fas fa-caret-down"></i>
            </span>
            <div
              className={`dropdown-content ${
                isExciseReportDropdownOpen ? "open" : ""
              }`}
            >
              <Link to="/monthly-statement" onClick={closeAllDropdowns}>
                Monthly Statement
              </Link>
              <Link
                to="/stock-statement-all-excise"
                onClick={closeAllDropdowns}
              >
                Stock Statement All Excise
              </Link>
              <Link
                to="/stock-statement-form1-excise"
                onClick={closeAllDropdowns}
              >
                Stock Statement Form1 Excise
              </Link>
              <Link to="/category-register-all" onClick={closeAllDropdowns}>
                Category Register All
              </Link>
              <Link to="/category-register-godown" onClick={closeAllDropdowns}>
                Category Register Godown
              </Link>
              <Link to="/category-register-counter" onClick={closeAllDropdowns}>
                Category Register counter
              </Link>
              <Link to="/brand-register-all" onClick={closeAllDropdowns}>
                Brand Register All
              </Link>
              <Link to="/brand-register-godown" onClick={closeAllDropdowns}>
                Brand Register Godown
              </Link>
              <Link to="/brand-register-counter" onClick={closeAllDropdowns}>
                Brand Register Counter
              </Link>
              <Link to="/ondate-stock-register" onClick={closeAllDropdowns}>
                On Date Stock Register
              </Link>
              <Link to="/daily-stock-book" onClick={closeAllDropdowns}>
                Daily Stock Book
              </Link>
              <Link
                to="/monthly-comparative-figure"
                onClick={closeAllDropdowns}
              >
                Monthly Comparative Figure
              </Link>
              <Link
                to="/monthly-category-sales-figure"
                onClick={closeAllDropdowns}
              >
                Monthly Category Sales Figure
              </Link>
              <Link
                to="/monthly-brand-sales-figure"
                onClick={closeAllDropdowns}
              >
                Monthly Brand Sales Figure
              </Link>
              <Link to="/tp-pass-report" onClick={closeAllDropdowns}>
                T.P. Pass Report
              </Link>
            </div>
          </li>

          {/* Audit & Accounts Dropdown */}
          <li className="nav-item dropdown" ref={auditAccountsDropdownRef}>
            <span
              className="dropdown-toggle nav-link"
              onClick={toggleAuditAccountsDropdown}
            >
              Audit & Accounts <i className="fas fa-caret-down"></i>
            </span>
            <div
              className={`dropdown-content ${
                isAuditAccountsDropdownOpen ? "open" : ""
              }`}
            >
              <Link to="/annual-ledger" onClick={closeAllDropdowns}>
                Annual Ledger
              </Link>
              <Link to="/cash-book" onClick={closeAllDropdowns}>
                Cash Book
              </Link>
              <Link to="/bank-book" onClick={closeAllDropdowns}>
                Bank Book
              </Link>
              <Link to="/journal-report" onClick={closeAllDropdowns}>
                Journal Report
              </Link>
              <Link to="/daily-sales-figure" onClick={closeAllDropdowns}>
                Daily Sales Figure
              </Link>
              <Link to="/monthly-sales-figure" onClick={closeAllDropdowns}>
                Monthly Sales Figure
              </Link>
              <Link to="/daily-purchase-figure" onClick={closeAllDropdowns}>
                Daily Purchase Figure
              </Link>
              <Link to="/monthly-purchase-figure" onClick={closeAllDropdowns}>
                Monthly Purchase Figure
              </Link>
              <Link to="/pay-taxes-on-purchase" onClick={closeAllDropdowns}>
                Pay Taxes On Purchase
              </Link>
              <Link to="/fl-status" onClick={closeAllDropdowns}>
                FL Status
              </Link>
              <Link to="/trial-balance" onClick={closeAllDropdowns}>
                Trial Balance
              </Link>
              <Link to="/accounts-profit-and-loss" onClick={closeAllDropdowns}>
                Accounts Profit And Loss
              </Link>
              <Link to="/balance-sheet" onClick={closeAllDropdowns}>
                Balance Sheet
              </Link>
            </div>
          </li>
          

          <li className="nav-item dropdown" ref={utilitiesDropdownRef}>
            <span
              className="dropdown-toggle nav-link"
              onClick={toggleUtilitiesDropdown}
            >
              Utilities <i className="fas fa-caret-down"></i>
            </span>
            <div
              className={`dropdown-content ${
                isUtilitiesDropdownOpen ? "open" : ""
              }`}
            >
              <Link to="/admin-panel" onClick={closeAllDropdowns}>
                Admin Panel
              </Link>
              <Link to="/user-control" onClick={closeAllDropdowns}>
                User Control
              </Link>
              <Link to="/stock-updation" onClick={closeAllDropdowns}>
                Stock Updation
              </Link>
              <Link to="/3yrs-sale-report" onClick={closeAllDropdowns}>
                3 Years Sale Report
              </Link>
              <Link to="/monthly-mrp-wise-sale" onClick={closeAllDropdowns}>
                Monthly MRP Wise Sale
              </Link>
              <Link to="/stock-modify" onClick={closeAllDropdowns}>
                Stock Modify
              </Link>
              <Link to="/dsr-modify" onClick={closeAllDropdowns}>
                DSR Modify
              </Link>
              <Link to="/alternate-sale" onClick={closeAllDropdowns}>
                Alternate Sale
              </Link>
              <Link to="/backup" onClick={closeAllDropdowns}>
                Backup
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarOld;
