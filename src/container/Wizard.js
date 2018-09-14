import React, { Component } from "react";
import { Steps } from "antd";
import ErrorBoundary from "react-error-boundary";

import PackageContext from "../data/PackageContext";

import ErrorFallbackComponent from "../components/ErrorFallbackComponent";
import SearchPackageStep from "../components/steps/SearchPackageStep";
import SelectVersionsStep from "../components/steps/SelectVersionsStep";
import UnpkgLinksStep from "../components/steps/UnpkgLinksStep";

/**
 * @todo Override Create-react-app
 *  * Reduce AntD import size
 *  * Install {@link https://github.com/entwicklerstube/babel-plugin-root-import|babel-plugin-root-import} for a cleaner imports for dynamic imports
 *  * {@link https://ant.design/docs/react/use-with-create-react-app#Advanced-Guides|AntD Advanced Guides}
 * @todo Dynamically load "SelectVersionsStep" & "UnpkgLinksStep" components to reduce size
 *  - https://www.slightedgecoder.com/2017/12/03/loading-react-components-dynamically-demand/#case3
 *  - https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#code-splitting
 * @todo Add filter in result to show only "minified" javascript files
 * @todo Add a route to receive a param -
 *    If "package" name is passed, then go to 2nd step,
 *    If both package & version is given, go straight to 3rd step
 * ✅ Add project "repo" & "homepage" in the result
 * ✅ Make each step clickable
 *    Step 1 - always clickable
 *    Step 2 - clickable if "packageName" exists
 *    Step 3 - clickable if both "packageName" & "version" exist
 * ✅ Add "copy to clipboard" in the "UnpkgLinksStep" component
 * ✅ Add link to "bundlephobia" to check file size
 * @todo Add event handler on "magnifier"
 * ✅ Add Title & Footer
 * ✅ Add Google Font
 * ✅ Make the title to use the google font
 * ✅ Credit links -> Michael Jackson (unpkg) & Shubham Kanodia  (bundlePhobia)
 * ✅ Add Google Analytics
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
    version: ""
  };

  next = () => this.setState(prevState => ({ current: prevState.current + 1 }));
  prev = () => this.setState(prevState => ({ current: prevState.current - 1 }));

  setPackageName = packageName => this.setState({ packageName }, this.next);
  setVersion = version => this.setState({ version }, this.next);

  getContent = () => {
    const { current, packageName, version } = this.state;

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
