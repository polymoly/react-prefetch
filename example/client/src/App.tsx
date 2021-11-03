import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/pages/home";
import { Users } from "./components/pages/users";
import "./base";
import { createPrefetchProvider } from "../../../src";
import { Accounts } from "./components/pages/accounts";
import { Routes } from "./core/routes";

const { Provider, Progressbar, useAccountPrefetch, useUsersPrefetch } =
  createPrefetchProvider({
    usersPrefetch: Users.prefetch,
    accountPrefetch: Accounts.prefetch,
  });

function App() {
  return (
    <Provider>
      <Switch>
        <Route path={Routes.Home.template()} component={Home} exact />
        <Route path={Routes.Users.template()} component={Users} exact />
        <Route path={Routes.Accounts.template()} component={Accounts} exact />
      </Switch>
    </Provider>
  );
}

export { Progressbar, useAccountPrefetch, useUsersPrefetch };

export default App;
