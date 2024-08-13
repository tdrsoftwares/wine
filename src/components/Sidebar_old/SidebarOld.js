import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SidebarOld = ({handleSignout, sidebarVisible}) => {
  return (
    <div className={`sidebar ${sidebarVisible ? "visible" : "hidden"}`}>
      <div className="sidebar-column">
        <div className="sidebar-item">
          <Link to="/daily-status" className="nav-link">
            Daily Status
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/item-register" className="nav-link">
            Item Register
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/brand-register" className="nav-link">
            Brand Register
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/company-register" className="nav-link">
            Company Register
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/previous-year-dsr" className="nav-link">
            Previous Year DSR
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/fl-beer-cs/ledger-summary" className="nav-link">
            Fl, Beer & Cs Ledger Summary
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/fl-beer-cs/ledger" className="nav-link">
            Fl, Beer & Cs Ledger
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/category/brand-stock" className="nav-link">
            Category/brand Stock
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/stock-report" className="nav-link">
            Stock Report
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/category-sale-status" className="nav-link">
            Category Sale Status
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/category-dsr" className="nav-link">
            Category DSR
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/cate-brand-size" className="nav-link">
            Cate/Brand/Size Sale
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/daily-sale-order" className="nav-link">
            Order On Daily Sale
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/stock-status" className="nav-link">
            Stock Status
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/dsr-opst" className="nav-link">
            Dsr With Op St
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/dsr-brand-stock" className="nav-link">
            Dsr Brand Stock
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/category-ledger-pack" className="nav-link">
            Category Pack Ledger
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/gtin-stock" className="nav-link">
            Gtin Stock
          </Link>
        </div>
        <hr />
        <div className="sidebar-item">
          <Button
            color="warning"
            sx={{ width: "85%"}}
            onClick={handleSignout}
          >
            SIGN OUT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarOld;
