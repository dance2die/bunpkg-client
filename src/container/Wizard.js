import React, { Component, Fragment } from "react";
import { Steps, Button, message } from "antd";
import ErrorBoundary from "react-error-boundary";

import PackageContext from "../data/PackageContext";

import ErrorFallbackComponent from "../components/ErrorFallbackComponent";
import SearchPackageStep from "../components/SearchPackageStep";
import SelectVersionsStep from "../components/SelectVersionsStep";
import UnpkgLinksStep from "../components/UnpkgLinksStep";

/**
 * ✅ Make each step clickable
 *    Step 1 - always clickable
 *    Step 2 - clickable if "packageName" exists
 *    Step 3 - clickable if both "packageName" & "version" exist
 * ✅ Add "copy to clipboard" in the "UnpkgLinksStep" component
 * ✅ Add link to "bundlephobia" to check file size
 * @todo Add event handler on "magnifier"
 * @todo Add Title & Footer
 *    Add Google Font
 *    Make the title to use the google font
 * @todo Credit links -> Michael Jackson (unpkg) & Shubham Kanodia  (bundlePhobia)
 * @todo Add Google Analytics
 *
 * ✅ Cache components - going back & forth loads component every time!
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
  { title: "Search package", componentName: "SearchPackageStep" },
  { title: "Select version", componentName: "SelectVersionsStep" },
  { title: "Unpkg Links", componentName: "UnpkgLinksStep" }
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
    version: "",
    components: []
  };

  next = () => this.setState(prevState => ({ current: prevState.current + 1 }));
  prev = () => this.setState(prevState => ({ current: prevState.current - 1 }));

  setPackageName = packageName => this.setState({ packageName }, this.next);
  setVersion = version => this.setState({ version }, this.next);

  getContent = () => {
    const { current, packageName, version, components } = this.state;

    if (components[current]) {
      return components[current];
    }

    switch (current) {
      default:
        if (!components[wizardStep.searchPackage])
          components[wizardStep.searchPackage] = <SearchPackageStep />;
        break;
      case wizardStep.selectVersions:
        if (!components[current])
          components[current] = (
            <SelectVersionsStep packageName={packageName} />
          );
        break;
      case wizardStep.unpkgLinks:
        if (!components[current])
          components[current] = (
            <UnpkgLinksStep packageName={packageName} version={version} />
          );
        break;
    }
    this.setState({ components });
    return components[current];
  };

  onStepClick = current => {
    const { packageName, version } = this.state;

    if (current === wizardStep.selectVersions && packageName === "") return;
    if (
      current === wizardStep.unpkgLinks &&
      (packageName === "" || version === "")
    )
      return;

    this.setState({ current });
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
              className="wizard-step"
              key={item.title}
              title={item.title}
              onClick={e => this.onStepClick(step)}
            />
          ))}
        </Steps>
        <div className="steps-content">
          <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
            {this.getContent()}
          </ErrorBoundary>
        </div>
      </PackageContext.Provider>
    );
  }
}

export default Wizard;
