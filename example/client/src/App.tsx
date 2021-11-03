import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/pages/home";
import { Users } from "./components/pages/users";
import "./base";
import { createPrefetchProvider } from "../../../src";
import { Accounts } from "./components/pages/accounts";

const { Provider, Progressbar, useHooks } = createPrefetchProvider({
  usersPrefetch: Users.prefetch,
  accountPrefetch: Accounts.prefetch,
});

function App() {
  return (
    <Provider>
      <Switch>
        <Route path={"/"} component={Home} exact />
        <Route path={"/users"} component={Users} exact />
        <Route path={"/accounts"} component={Accounts} exact />
      </Switch>
    </Provider>
  );
}

export { Progressbar, useHooks };

export default App;
