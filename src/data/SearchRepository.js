import axios from "axios";
import semverSort from "semver-sort";

// Credit to BundlePhobia by Shubham Kanodia
// https://github.com/pastelsky/bundlephobia/blob/59d865c01c9232b689b0ea3a3f4e4d655adff063/client/api.js#L53
const suggestionSort = (packageA, packageB) => {
  // Rank closely matching packages followed by most popular ones
  if (
    Math.abs(Math.log(packageB.searchScore) - Math.log(packageA.searchScore)) >
    1
  ) {
    return packageB.searchScore - packageA.searchScore;
  } else {
    return packageB.score.detail.popularity - packageA.score.detail.popularity;
  }
};

const filterByData = _ => _.data;
const sortData = _ => _.sort(suggestionSort);
const extractProperties = _ =>
  _.map(({ package: { name, version, description } }) => ({
    name,
    version,
    description
  }));

const getSuggestions = query =>
  axios
    .get(`https://api.npms.io/v2/search/suggestions?q=${query}`)
    .then(filterByData)
    .then(sortData)
    .then(extractProperties);

const getVersions = packageName =>
  axios
    .get(`https://bunpkg.herokuapp.com/api/versions/${packageName}`)
    .then(filterByData)
    .then(semverSort.desc);

const isScopedPakcge = packageName => packageName.charAt(0) === "@";

// Refer to Michael Jackson's UNPKG source
// https://github.com/unpkg/unpkg.com/blob/82d404a973cfe24a2a632859cbb6ab8958d48e9e/modules/utils/fetchNpmPackageInfo.js#L15
const encodePackageName = packageName =>
  isScopedPakcge(packageName)
    ? `@${encodeURIComponent(packageName.substring(1))}`
    : encodeURIComponent(packageName);

const getPackageInfo = (packageName, version) =>
  axios
    .get(
      `https://bunpkg.herokuapp.com/api/info/${encodePackageName(
        packageName
      )}/${version}`
    )
    .then(filterByData);

export { getSuggestions, getVersions, getPackageInfo };
