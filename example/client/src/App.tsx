import { Routes as Switches, Route } from "react-router-dom";
import Home from "./components/pages/home";
import { Users } from "./components/pages/users";
import "./base";
import { createPrefetchProvider } from "../../../src";
import { Accounts } from "./components/pages/accounts";
import { Routes } from "./core/routes";

const { Provider, useAccountPrefetch, useUsersPrefetch, useLoadingContext } =
  createPrefetchProvider({
    usersPrefetch: Users.prefetch,
    accountPrefetch: Accounts.prefetch,
  });

function App() {
  return (
    <Provider>
      <Switches>
        <Route path={Routes.Home.template()} element={<Home />} />
        <Route path={Routes.Users.template()} element={<Users />} />
        <Route path={Routes.Accounts.template()} element={<Accounts />} />
      </Switches>
    </Provider>
  );
}

export { useAccountPrefetch, useUsersPrefetch, useLoadingContext };

export default App;
