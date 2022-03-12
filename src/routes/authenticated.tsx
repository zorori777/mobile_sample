import {Outlet, Navigate} from "react-router-dom";
import {HomeRoot} from "@/pages/home";
import {ProductRoot} from "@/pages/product";
import {InspectRoot} from "@/pages/inspect";

import {SettingRoot} from "@/pages/setting";
import {MainContent} from "@/components/Layout";

const App = () => {
  return (
    <MainContent>
      <Outlet />
    </MainContent>
  );
};

export const authenticatedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/home", element: <HomeRoot />},
      {path: "/product", element: <ProductRoot />},
      {
        path: "/inspect",
        element: <InspectRoot />,
      },
      {path: "/setting", element: <SettingRoot />},
      {path: "*", element: <Navigate to="/home" />},
      {path: "", element: <Navigate to="/home" />},
    ],
  },
];
