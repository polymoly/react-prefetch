import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/pages/home";
import { Users } from "./components/pages/users";
import "./base";
import { createPrefetchProvider } from "../../../lib";

const { Provider, Progressbar, usePrefetches } = createPrefetchProvider({
  usersPrefetch: Users.prefetch,
});

function App() {
  return (
    <Provider>
      <Switch>
        <Route path={"/"} component={Home} exact />
        <Route path={"/users"} component={Users} exact />
      </Switch>
    </Provider>
  );
}

export { Progressbar, usePrefetches };

export default App;
