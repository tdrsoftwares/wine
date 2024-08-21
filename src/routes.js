import PurchasesBill from "./modules/PurchaseBill";
import SalesBill from "./modules/SalesBill";
import StockReports from "./modules/Reports/StockReports";

const route = [
  {
    name: "Master Entry",
    path: "/purchases-bill",
    icon: "",
    component: <PurchasesBill />,
    dropDown : [
      {
        name: "Customer Register",
        path: "/purchases-bill",
        icon: "",
        component: <PurchasesBill />,
      },
      {
        name: "Supplier Register",
        path: "/purchases-bill",
        icon: "",
        component: <PurchasesBill />,
      },
      {
        name: "Store Register",
        path: "/purchases-bill",
        icon: "",
        component: <PurchasesBill />,
      },
      {
        name: "Category Register",
        path: "/purchases-bill",
        icon: "",
        component: <PurchasesBill />,
      },
      {
        name: "Item Register",
        path: "/purchases-bill",
        icon: "",
        component: <PurchasesBill />,
      },
    ]
  },
  {
    name: "Data Entry",
    path: "/purchases-bill",
    icon: "",
    component: <PurchasesBill />,
  },
  {
    name: "Purchaes Bill",
    path: "/purchases-bill",
    icon: "",
    component: <PurchasesBill />,
  },
  {
    name: "Sale Bill",
    path: "/purchases-bill",
    icon: "",
    component: <PurchasesBill />,
  },
  {
    name: "Transaction",
    path: "/purchases-bill",
    icon: "",
    component: <PurchasesBill />,
  },
  {
    name: "Inventory",
    path: "/purchases-bill",
    icon: "",
    component: <PurchasesBill />,
  },
  {
    name: "Reports",
    path: "/purchases-bill",
    icon: "",
    component: <PurchasesBill />,
  },
  {
    name: "Audi & Accounts",
    path: "/purchases-bill",
    icon: "",
    component: <PurchasesBill />,
  },

  {
    name: "Import/Exports",
    path: "/purchases-bill",
    icon: "",
    component: <PurchasesBill />,
  },
  {
    name: "Settings",
    path: "/purchases-bill",
    icon: "",
    component: <PurchasesBill />,
  },
];

export default route;
