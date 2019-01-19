import axios from "axios";
import semverSort from "semver-sort";

import { getEncodePackageName } from "../util/index";

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
    .get(
      `https://bunpkg.herokuapp.com/api/versions/${getEncodePackageName(
        packageName
      )}`
    )
    .then(filterByData)
    .then(semverSort.desc)
    .catch(error => error);

const isScopedPakcge = packageName => packageName.charAt(0) === "@";

const getPackageInfo = (packageName, version) =>
  axios
    .get(
      `https://bunpkg.herokuapp.com/api/info/${getEncodePackageName(
        packageName
      )}/${version}`
    )
    .then(filterByData);

export { getSuggestions, getVersions, getPackageInfo, filterByData };
