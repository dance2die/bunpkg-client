import urljoin from "url-join";

// Credit Michael Jackson
// https://github.com/unpkg/unpkg.com/blob/82d404a973cfe24a2a632859cbb6ab8958d48e9e/modules/utils/fetchNpmPackageInfo.js#L15
const getEncodePackageName = packageName =>
  packageName.charAt(0) === "@"
    ? `@${encodeURIComponent(packageName.substring(1))}`
    : encodeURIComponent(packageName);

const unpkgURL = `https://unpkg.com`;
const buildUnpkgURL = (packageName, version, file) =>
  urljoin(unpkgURL, `${packageName}@${version}`, file);

export { getEncodePackageName, buildUnpkgURL };
