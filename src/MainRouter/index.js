import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppConfiguration from "../Containers/AppConfiguration";
import Website from "../Containers/Website";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={AppConfiguration} />

        <Route path="/" exact={true} component={Website} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
