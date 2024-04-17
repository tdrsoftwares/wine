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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const masterFileDropdownRef = useRef(null);
  const dataEntryDropdownRef = useRef(null);
  const saleReportDropdownRef = useRef(null);
  const saleStatusReportDropdownRef = useRef(null);
  const purchaseReportDropdownRef = useRef(null);

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

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
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
    };

    document.body.addEventListener("click", closeDropdownOnOutsideClick);

    return () => {
      document.body.removeEventListener("click", closeDropdownOnOutsideClick);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="hamburger-icon" onClick={toggleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`navbar-links ${isSidebarOpen ? "active" : ""}`}>
          <li className="nav-item nav-title">
            <Link to="/" className="nav-link">
              TDR SOFTWARES
            </Link>
          </li>
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
              <Link to="/customer-register">Customer Register</Link>
              <Link to="/suppliers-register">Suppliers Register</Link>
              <Link to="/lpl-setup">LPL Setup</Link>
              <Link to="/stock-register">Stock Register</Link>
              <Link to="/item-category-register">Item Category Register</Link>
              <Link to="/item-discount-register">Item Discount Register</Link>
              <Link to="/dealer-category-discount-register">
                Dealer Category Discount Register
              </Link>
              <Link to="/minimum-stock-register">Minimum Stock Register</Link>
              <Link to="/scheme-register">Scheme Register</Link>
              <Link to="/ledger-creation">Ledger Creation</Link>
              <Link to="/store-info">Store Info</Link>
              <Link to="/licensee-info">Licensee Info</Link>
            </div>
          </li>
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
              <Link to="/sale-bill">Sale Bill</Link>
              <Link to="/purchase-entry">Purchase Entry</Link>
              <Link to="/stock-transfer">Stock Transfer</Link>
              <Link to="/party-payment">Party Payment</Link>
              <Link to="/general-payment">General Payment</Link>
              <Link to="/customer-receipt">Customer Receipt</Link>
              <Link to="/general-receipt">General Receipt</Link>
              <Link to="/cash-deposit">Cash Deposit to Bank</Link>
              <Link to="/cash-withdrawn">Cash Withdrawn from Bank</Link>
              <Link to="/journal-entry">Journal Entry</Link>
            </div>
          </li>

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
              <Link to="/sale-report-summary">Sale Report (Summary)</Link>
              <Link to="/item-wise-sale-report">Item Wise Sale Report</Link>
              <Link to="/daily-sale-report">Daily Sale Report (DSR)</Link>
              <Link to="/daily-profit-report">Daily Profit Report</Link>
              <li
                className="nav-item dropdown"
                ref={saleStatusReportDropdownRef}
              >
                <span className="" onClick={toggleSaleStatusReportDropdown}>
                  Sale Status Report &nbsp;
                  <i className="fas fa-caret-right"></i>
                </span>
                <div
                  className={`sale-status-dropdown-content ${
                    isSaleStatusReportDropdownOpen ? "open" : ""
                  }`}
                >
                  <Link to="/brand-wise-sale-status">
                    Brand Wise Sale Status
                  </Link>
                  <Link to="/item-category-wise-sale-status">
                    Item Category Wise Sale Status
                  </Link>
                  <Link to="/brand-sale-status">Brand Sale Status</Link>
                  <Link to="/category-sale-status">Category Sale Status</Link>
                </div>
              </li>
              <Link to="/daily-item-sale-category">
                Daily Item Sale Status (Category)
              </Link>
              <Link to="/daily-item-sale-brand">
                Daily Item Sale Status (Brand)
              </Link>
              <Link to="/daily-item-status">Daily Item Status</Link>
              <Link to="/customer-due-report">Customer Due Report</Link>
              <Link to="/salesman-report">Salesman Report</Link>
              <Link to="/receipt-report">Receipt Report</Link>
              <Link to="/bill-wise-collection-report">
                Bill Wise Collection Report
              </Link>
              <Link to="/dealer-sale-discount-chart">
                Dealer Sale Discount Chart
              </Link>
              <Link to="/customer-transaction-details">
                Customer Transaction Details
              </Link>
              <Link to="/profit-on-sale">Profit On Sale</Link>
            </div>
          </li>

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
              <Link to="/purchase-report-summary">
                Purchase Report (Summary)
              </Link>
              <Link to="/item-wise-purchase-report">
                Item Wise Purchase Report
              </Link>
              <Link to="/daily-purchase-report">
                Daily Purchase Report (Dpr)
              </Link>
              <Link to="/suppliers-balance-report">
                Suppliers Balance Report
              </Link>
              <Link to="/payment-report">Payment Report</Link>
              <Link to="/bill-wise-payment-report">
                Bill Wise Payment Report
              </Link>
            </div>
          </li>

          <li className="nav-item">
            <Link to="/inventory-report" className="nav-link">
              Inventory Report
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/excise-report" className="nav-link">
              Excise Report
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/audit-accounts" className="nav-link">
              Audit & Accounts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/utilities" className="nav-link">
              Utilities
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarOld;
