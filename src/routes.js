import PurchasesBill from "./modules/PurchaseBill";
import SalesBill from "./modules/SalesBill";
import StockReports from "./modules/Reports/StockReports";

const route = [
  {
    name: "Purchases Bill",
    path: "/purchases-bill",
    icon: "",
    component: <PurchasesBill />,
  },
  {
    name: "Sales Bill",
    path: "/sales-bill",
    icon: "",
    component: <SalesBill />,
  },
  {
    name: "Stock Reports",
    path: "/stock-report",
    icon: "",
    component: <StockReports />,
  },
];

export default route;
