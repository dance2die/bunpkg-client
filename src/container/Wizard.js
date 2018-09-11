import React, { Component, Fragment } from "react";
import { Steps, Button, message } from "antd";

import PackageContext from "../data/PackageContext";

import SearchPackageStep from "../components/SearchPackageStep";
import SelectVersionsStep from "../components/SelectVersionsStep";
import UnpkgLinksStep from "../components/UnpkgLinksStep";

/**
 * Wizard steps
 * @todo Dynamically import components using import(`componentName`) later
 */
const steps = [
  { title: "Search Package", componentName: "SearchPackageStep" },
  { title: "Select Version", componentName: "SelectVersionsStep" },
  { title: "Result", componentName: "UnpkgLinksStep" }
];

/**
 * Steps required to generate Unpkdg links.
 * See {@link https://ant.design/components/steps/|Antd Steps}.
 */
class Wizard extends Component {
  state = {
    current: 0,
    components: [],
    packageName: "",
    version: ""
  };

  componentDidMount() {
    let { components } = this.state;
    components[0] = <SearchPackageStep />;
    this.setState({ components });
  }

  next = () => this.setState(prevState => ({ current: prevState.current + 1 }));
  prev = () => this.setState(prevState => ({ current: prevState.current - 1 }));

  setPackageName = packageName =>
    this.setState({ packageName }, () =>
      console.log(`Wizard.setPackageName`, packageName)
    );
  setVersion = version => this.setState({ version });

  render() {
    const { current, packageName, version, components } = this.state;

    return (
      <PackageContext.Provider
        value={{
          setPackageName: this.setPackageName,
          setVersion: this.setVersion
        }}
      >
        <Steps current={current}>
          {steps.map(item => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{components[current]}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </PackageContext.Provider>
    );
  }
}

export default Wizard;
