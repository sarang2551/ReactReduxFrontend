import "./styles.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { useDispatch, connect, useSelector } from "react-redux";

import { getProducts } from "./components/Api";
import Homepage from "./components/Home";
import Header from "./components/Header";
import ProductPage from "./components/ProductPage";
import LoginRegister from "./components/Login-Register";
import Particles from "particles-bg";
import React from "react";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <>
                <Homepage />;
              </>
            );
          }}
        />
        <Route
          exact
          path="/products"
          render={() => {
            return <ProductPage />;
          }}
        />
        <Route
          exact
          path="/login-register"
          render={() => {
            return (
              <>
                <Header />
                <Particles type="polygon" bg={true} />
                <LoginRegister />
              </>
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}
