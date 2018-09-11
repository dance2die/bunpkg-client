import React, { Component, Fragment, createRef } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Wizard from "./container/Wizard";
import Footer from "./components/Footer";

import "antd/dist/antd.css";
import "./styles.css";

// Let's style the container later...
const App = () => (
  <Fragment>
    <Header />
    <Wizard />
    <Footer />
  </Fragment>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
