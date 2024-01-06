import { Route, HashRouter, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </HashRouter>
  );
};
export default App;
