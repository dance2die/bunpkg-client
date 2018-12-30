import React, { useState, useMemo, useEffect } from "react";
import { Steps } from "antd";
import ErrorBoundary from "react-error-boundary";

import PackageContext from "../data/PackageContext";
import ErrorFallbackComponent from "../components/ErrorFallbackComponent";
import BunpkgSuspense from "../components/BunpkgSuspense";
import * as Events from "../components/steps";

const SearchPackageStep = Events.SearchPackageStep;
const SelectVersionsStep = Events.SelectVersionsStep;
const UnpkgLinksStep = Events.UnpkgLinksStep;

/**
 * @todo Dynamically load "SelectVersionsStep" & "UnpkgLinksStep" components to reduce size
 *  - https://www.slightedgecoder.com/2017/12/03/loading-react-components-dynamically-demand/#case3
 *  - https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#code-splitting
 * @todo Add a route to receive a param -
 *    If "package" name is passed, then go to 2nd step,
 *    If both package & version is given, go straight to 3rd step
 * ✅ Add filter in result to show only "minified" javascript files
 * ✅ Override Create-react-app
 *  * Reduce AntD import size
 *  * Install {@link https://github.com/entwicklerstube/babel-plugin-root-import|babel-plugin-root-import} for a cleaner imports for dynamic imports
 *  * {@link https://ant.design/docs/react/use-with-create-react-app#Advanced-Guides|AntD Advanced Guides}
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
function Wizard() {
  const [step, setStep] = useState(wizardStep.searchPackage);
  const [packageName, setPackageName] = useState("");
  const [version, setVersion] = useState("");
  // Clearing error boundary Fallback component
  // Refer to https://github.com/bvaughn/react-error-boundary/issues/23#issuecomment-425470511
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);

  const searchStep = useMemo(() => <SearchPackageStep />, []);
  const versionStep = useMemo(() => <SelectVersionsStep packageName={packageName} />, [
    packageName
  ]);
  const linksStep = useMemo(() => <UnpkgLinksStep packageName={packageName} version={version} />, [
    packageName,
    version
  ]);

  const contextState = {
    setPackageName: setNextPackageName,
    setVersion: setNextVersion
  };

  function goToNextStep() {
    setStep(step + 1);
  }

  function setNextPackageName(packageName) {
    setPackageName(packageName);
    goToNextStep();
  }

  function setNextVersion(version) {
    setVersion(version);
    goToNextStep();
  }

  function getContent() {
    switch (step) {
      case wizardStep.selectVersions:
        return versionStep;
      case wizardStep.unpkgLinks:
        return linksStep;
      default:
        return searchStep;
    }
  }

  function onStepClick(currentStep) {
    if (currentStep === wizardStep.selectVersions && packageName === "") return;
    if (currentStep === wizardStep.unpkgLinks && (packageName === "" || version === "")) return;

    setStep(currentStep);
  }

  useEffect(() => setErrorBoundaryKey(errorBoundaryKey + 1), [step]);

  return (
    <PackageContext.Provider value={contextState}>
      <Steps current={step}>
        {steps.map((item, step) => (
          <Steps.Step
            className="wizard-step"
            key={item.title}
            title={item.title}
            onClick={e => onStepClick(step)}
          />
        ))}
      </Steps>
      <div className="steps-content">
        <BunpkgSuspense>
          <ErrorBoundary key={errorBoundaryKey} FallbackComponent={ErrorFallbackComponent}>
            {getContent()}
          </ErrorBoundary>
        </BunpkgSuspense>
      </div>
    </PackageContext.Provider>
  );
}

export default Wizard;
