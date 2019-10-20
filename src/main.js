import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/index";
import Profile from "./components/profile";
import Signin from "./components/signin";
import Signup from "./components/signup";
import InternalNavbar from "./components/internalNavbar";

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <InternalNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default Main;
