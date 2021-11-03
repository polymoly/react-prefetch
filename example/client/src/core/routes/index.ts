import { route } from "react-route-type";

export const Routes = {
  Home: route(""),
  Users: route("users"),
  Accounts: route({ path: "accounts", query: { userId: "" } }),
};
