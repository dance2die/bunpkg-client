import React, { Component, Fragment, createRef } from "react";
import ReactDOM from "react-dom";
import Wizard from "./container/Wizard";

import "antd/dist/antd.css";
import "./styles.css";

// Let's style the container later...
const App = () => <Wizard />;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
