import urljoin from "url-join";

// Credit Michael Jackson
// https://github.com/unpkg/unpkg.com/blob/82d404a973cfe24a2a632859cbb6ab8958d48e9e/modules/utils/fetchNpmPackageInfo.js#L15
const getEncodePackageName = packageName =>
  packageName.charAt(0) === "@"
    ? `@${encodeURIComponent(packageName.substring(1))}`
    : encodeURIComponent(packageName);

const unpkgURLRoot = `https://unpkg.com`;
const buildUnpkgURL = (packageName, version, file) =>
  urljoin(unpkgURLRoot, `${packageName}@${version}`, file);
const buildUnpkgDirectoryURL = (packageName, version) =>
  urljoin(unpkgURLRoot, `${packageName}@${version}/`);
const buildUnpkgScript = (packageName, version, file) =>
  `<script src="${buildUnpkgURL(packageName, version, file)}"></script>`;

const bundlePhobiaURLRoot = `https://bundlephobia.com`;
const buildBundlePhobiaURL = (packageName, version) =>
  urljoin(bundlePhobiaURLRoot, `result?p=${packageName}@${version}`);

/**
 * Copying and pasting from StackOverflow like a boss.
 * Didn't feel like using _.isEmpty, which is kinda big.
 * {@link https://stackoverflow.com/a/32108184/4035}
 */
const isEmpty = obj => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

export {
  getEncodePackageName,
  buildUnpkgURL,
  buildUnpkgDirectoryURL,
  buildBundlePhobiaURL,
  buildUnpkgScript,
  isEmpty
};
