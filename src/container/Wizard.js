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

const wizardStep = {
  SearchPackage: 0,
  SelectVersions: 1,
  UnpkgLinks: 2
};
Object.freeze(wizardStep);

/**
 * Steps required to generate Unpkdg links.
 * See {@link https://ant.design/components/steps/|Antd Steps}.
 */
class Wizard extends Component {
  state = {
    current: wizardStep.SearchPackage,
    packageName: "",
    version: ""
  };

  next = () => this.setState(prevState => ({ current: prevState.current + 1 }));
  prev = () => this.setState(prevState => ({ current: prevState.current - 1 }));

  setPackageName = packageName => this.setState({ packageName }, this.next);
  setVersion = version => this.setState({ version }, this.next);

  getContent = () => {
    const { current, packageName, version } = this.state;
    // prettier-ignore
    console.log(`getContent current, packageName, version`, current, packageName, version);

    switch (current) {
      default:
        return <SearchPackageStep />;
      case wizardStep.SelectVersions:
        return <SelectVersionsStep packageName={packageName} />;
      case wizardStep.UnpkgLinks:
        return <UnpkgLinksStep packageName={packageName} version={version} />;
    }
  };

  render() {
    const { current } = this.state;

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
        {/*<div className="steps-content">{components[current]}</div>*/}
        <div className="steps-content">{this.getContent()}</div>
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
