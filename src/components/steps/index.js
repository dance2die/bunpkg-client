import { lazy } from "react";

const SearchPackageStep = lazy(() => import(`./SearchPackageStep`));
const SelectVersionsStep = lazy(() => import(`./SelectVersionsStep`));
const UnpkgLinksStep = lazy(() => import(`./UnpkgLinksStep`));

export { SearchPackageStep, SelectVersionsStep, UnpkgLinksStep };
