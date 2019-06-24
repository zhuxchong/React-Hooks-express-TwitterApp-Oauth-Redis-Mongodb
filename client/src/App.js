import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./component/login";
import Loading from "./component/authLoginLoading";
import Homepage from "./component/homepage";
import GlobalStaet from "./store/GlobalState";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <GlobalStaet>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/loading" component={Loading} />
            <Route path="/home" exact component={Homepage} />
          </Switch>
        </GlobalStaet>
      </BrowserRouter>
    );
  }
}

export default App;
