import React, { Component, Fragment } from "react";
import { Steps, Button, message } from "antd";

import PackageContext from "../data/PackageContext";

import SearchPackageStep from "../components/SearchPackageStep";
import SelectVersionsStep from "../components/SelectVersionsStep";
import UnpkgLinksStep from "../components/UnpkgLinksStep";

/**
 * ✅ Make each step clickable
 *    Step 1 - always clickable
 *    Step 2 - clickable if "packageName" exists
 *    Step 3 - clickable if both "packageName" & "version" exist
 * @todo Add "copy to clipboard" in the "UnpkgLinksStep" component
 * @todo Add link to "bundlephobia" to check file size
 * @todo Add Title & Footer
 *    Add Google Font
 *    Make the title to use the google font
 * @todo Credit links -> Michael Jackson (unpkg) & Shubham Kanodia  (bundlePhobia)
 * @todo Add Google Analytics
 *
 * @todo Cache components - going back & forth loads component every time!
 * @todo Instead of a Wizard, display kind of popup CodeSandBox uses on "Add Dependency" dialog
 *    It requires some caching strategies
 *    1. Redis - haven't learned, yet.
 *    2. CloudFlare API - haven't learned, yet.
 */

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
  searchPackage: 0,
  selectVersions: 1,
  unpkgLinks: 2
};
Object.freeze(wizardStep);

/**
 * Steps required to generate Unpkdg links.
 * See {@link https://ant.design/components/steps/|Antd Steps}.
 */
class Wizard extends Component {
  state = {
    current: wizardStep.searchPackage,
    packageName: "",
    version: ""
  };

  next = () => this.setState(prevState => ({ current: prevState.current + 1 }));
  prev = () => this.setState(prevState => ({ current: prevState.current - 1 }));

  setPackageName = packageName => this.setState({ packageName }, this.next);
  setVersion = version => this.setState({ version }, this.next);

  getContent = () => {
    const { current, packageName, version } = this.state;
    // // prettier-ignore
    // console.log(`getContent current, packageName, version`, current, packageName, version);

    switch (current) {
      default:
        return <SearchPackageStep />;
      case wizardStep.selectVersions:
        return <SelectVersionsStep packageName={packageName} />;
      case wizardStep.unpkgLinks:
        return <UnpkgLinksStep packageName={packageName} version={version} />;
    }
  };

  onStepClick = current => {
    const { packageName, version } = this.state;

    if (current === wizardStep.selectVersions && packageName === "") return;
    if (
      current === wizardStep.unpkgLinks &&
      (packageName === "" || version === "")
    )
      return;

    this.setState({ current }, () => console.log(`onStepClick`, current));
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
          {steps.map((item, step) => (
            <Steps.Step
              key={item.title}
              title={item.title}
              onClick={e => this.onStepClick(step)}
            />
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
