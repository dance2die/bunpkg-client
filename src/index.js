import React, { Component, Fragment, createRef } from "react";
import ReactDOM from "react-dom";
import AppHeader from "./components/AppHeader";
import { Layout, Menu, Icon, Row, Col } from "antd";

import Wizard from "./container/Wizard";
import AppFooter from "./components/AppFooter";

const { Header, Content, Footer, Sider } = Layout;

import "antd/dist/antd.css";
import "./styles.css";

const App = () => (
  <Fragment>
    <Row>
      <Col span={20} offset={2}>
        <AppHeader />
      </Col>
    </Row>
    <Row>
      <Col span={20} offset={2}>
        <Content className="app-content">
          <Wizard />
        </Content>
      </Col>
    </Row>
    <Row>
      <Col span={20} offset={2}>
        <AppFooter />
      </Col>
    </Row>
  </Fragment>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
