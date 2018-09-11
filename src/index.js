import React, { Component, Fragment, createRef } from "react";
import ReactDOM from "react-dom";
import AppHeader from "./components/AppHeader";
import { Layout, Menu, Icon } from "antd";

import Wizard from "./container/Wizard";
import AppFooter from "./components/AppFooter";

const { Header, Content, Footer, Sider } = Layout;

import "antd/dist/antd.css";
import "./styles.css";

const App = () => (
  <Fragment>
    <AppHeader />
    <Content className="app-content">
      <Wizard />
    </Content>
    <AppFooter />
  </Fragment>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
