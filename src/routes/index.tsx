import {useRoutes} from "react-router-dom";
import {authenticatedRoutes} from "./authenticated";

export const AppRoutes = () => {
  return useRoutes(authenticatedRoutes);
};
