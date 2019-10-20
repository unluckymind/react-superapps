import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/index";
import Profile from "./components/profile";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Product from "./components/productTag";
import InternalNavbar from "./components/internalNavbar";
import ProductDetail from "./components/product_detail";


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
          <Route path="/product" component={Product} />
          <Route path="/products/detail" component={ProductDetail} />

        </Switch>
      </BrowserRouter>
    );
  }
}
export default Main;
