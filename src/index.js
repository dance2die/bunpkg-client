import React from "react";
import ReactDOM from "react-dom";
import AppHeader from "./components/AppHeader";
import { Layout, Row, Col } from "antd";

import Wizard from "./container/Wizard";
import AppFooter from "./components/AppFooter";

import "antd/dist/antd.css";
import "./styles.css";

const { Content } = Layout;
const dimension = {
  span: 20,
  xs: 20,
  md: 20,
  lg: 20,
  offset: 2
};

const Column = ({ children }) => (
  <Col
    span={dimension.span}
    offset={dimension.offset}
    xs={dimension.xs}
    md={dimension.md}
    lg={dimension.lg}
  >
    {children}
  </Col>
);

const App = () => (
  <div className="app">
    <Row>
      <Column>
        <AppHeader />
      </Column>
    </Row>
    <Row>
      <Column>
        <Content className="app-content" role="main">
          <Wizard />
        </Content>
      </Column>
    </Row>
    <Row>
      <Column>
        <AppFooter />
      </Column>
    </Row>
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
