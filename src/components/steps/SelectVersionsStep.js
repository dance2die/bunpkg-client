import React, {
  Suspense,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext
} from "react";

import { List, Spin, Checkbox } from "antd";
import stable from "semver-stable";
import PropTypes from "prop-types";
import styled from "styled-components";
import ErrorBoundary from "react-error-boundary";

import { getVersions } from "../../data/SearchRepository";
import PackageContext from "../../data/PackageContext";
import { createResource } from "../../util/createResource";
import BunpkgSuspense from "../BunpkgSuspense";

const VersionSpinnerContainer = styled.div`
  margin: 3em 0;
`;

const PackageName = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.4em;
`;

function Version({ version }) {
  const { setVersion } = useContext(PackageContext);

  return (
    <List.Item
      className="version"
      key={version}
      onClick={() => setVersion(version)}
    >
      <List.Item.Meta description={<strong>{version}</strong>} />
    </List.Item>
  );
}

function renderListItem(version) {
  return <Version version={version} />;
}

// const VersionsResource = createResource(packageName => {
//   const versions = getVersions(packageName);
//   console.log(`VersionsResource.versions`, versions);
//   return versions;
// });

// const VersionsResource = createResource(packageName =>
//   fetch("https://jsonplaceholder.typicode.com/posts")
//     .then(response => response.json())
//     .then(_ => _.id)
// );

function useVersions(packageName, stableVersionsOnly = true) {
  // const initialVersions = VersionsResource.read(packageName);
  const initialVersions = [];
  const [versions, setVersions] = useState(initialVersions);

  function showStableVersionsOnly(yes) {
    setVersions(yes ? versions.filter(stable.is) : versions);
  }

  useEffect(
    () => {
      getVersions(packageName).then(setVersions);
    },
    [packageName]
  );

  useEffect(
    () => {
      showStableVersionsOnly(stableVersionsOnly);
    },
    [stableVersionsOnly]
  );

  const versionsCache = useMemo(() => versions, [versions]);
  // console.log(`versions, versionsCache`, versions, versionsCache);

  return { versionsCache, showStableVersionsOnly };
}

function SelectVersionsStep({ packageName }) {
  const defaultVersions = [];
  const defaultStableVersionsOnly = true;

  // const getCacheVersions = useMemo(
  //   async () => {
  //     return await getVersions(packageName);
  //   },
  //   [packageName]
  // );

  const [stableVersionsOnly, setStableVersionsOnly] = useState(
    defaultStableVersionsOnly
  );

  // const [versions, setVersions] = useState(defaultVersions);
  // const [versions, setVersions] = useState(getCacheVersions);
  const { versionsCache: versions, showStableVersionsOnly } = useVersions(
    packageName
  );

  // const setCacheVersions = useCallback(
  //   () => {
  //     getVersions(packageName).then(setVersions);
  //   },
  //   [packageName]
  // );

  // const setCacheVersions = useMemo(
  //   () => {
  //     getVersions(packageName).then(setVersions);
  //   },
  //   [packageName]
  // );

  // useEffect(
  //   () => {
  //     // const encodedPackageName = getEncodePackageName(packageName);
  //     // getVersions(encodedPackageName).then(setVersions);
  //     setCacheVersions();
  //     // setVersions(VersionsResource.read(packageName));
  //   },
  //   [packageName]
  // );

  useEffect(() => {
    console.log(`mounting...`);
    return () => console.log(`UNmounting...`);
  }, []);

  function onStableVersionsOnlyChange(e) {
    const { checked } = e.target;
    setStableVersionsOnly(checked);
    // showStableVersionsOnly(checked);
  }

  function filteredVersions() {
    return stableVersionsOnly ? versions.filter(stable.is) : versions;
  }

  // console.log(`versions`, versions);
  if (!Array.isArray(versions)) throw new Error(versions);

  return (
    <div className="select-versions">
      <PackageName>{packageName}</PackageName>
      <Checkbox
        onChange={onStableVersionsOnlyChange}
        checked={stableVersionsOnly}
      >
        Stable Versions Only
      </Checkbox>
      <ErrorBoundary>
        <BunpkgSuspense>
          {versions.length === 0 ? (
            <VersionSpinnerContainer>
              <Spin />
            </VersionSpinnerContainer>
          ) : (
            <List dataSource={filteredVersions()} renderItem={renderListItem} />
          )}
        </BunpkgSuspense>
      </ErrorBoundary>
    </div>
  );
}

SelectVersionsStep.propTypes = {
  packageName: PropTypes.string.isRequired
};

export default SelectVersionsStep;
