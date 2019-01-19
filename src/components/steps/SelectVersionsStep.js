import React, {
  Suspense,
  useState,
  useCallback,
  useEffect,
  useContext
} from "react";

import { List, Spin, Checkbox } from "antd";
import stable from "semver-stable";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const VersionsResource = createResource(packageName => {
  const versions = getVersions(packageName);
  console.log(`VersionsResource.versions`, versions);
  return versions;
});

// function useVersions(packageName, stableVersionsOnly = true) {
//   const initialVersions = VersionsResource.read(packageName);
//   const [versions, setVersions] = useState(initialVersions);

//   function showStableVersionsOnly(yes) {
//     setVersions(yes ? versions.filter(stable.is) : versions);
//   }

//   useEffect(() => showStableVersionsOnly(stableVersionsOnly), [
//     stableVersionsOnly
//   ]);

//   return { versions, showStableVersionsOnly };
// }

function SelectVersionsStep({ packageName }) {
  const defaultVersions = [];
  const defaultStableVersionsOnly = true;

  const [stableVersionsOnly, setStableVersionsOnly] = useState(
    defaultStableVersionsOnly
  );

  const [versions, setVersions] = useState(defaultVersions);
  // const { versions, showStableVersionsOnly } = useVersions(packageName);

  const setCacheVersions = useCallback(
    () => {
      getVersions(packageName).then(setVersions);
    },
    [packageName]
  );
  useEffect(
    () => {
      // const encodedPackageName = getEncodePackageName(packageName);
      // getVersions(encodedPackageName).then(setVersions);
      setCacheVersions();
    },
    [packageName]
  );

  function onStableVersionsOnlyChange(e) {
    const { checked } = e.target;
    setStableVersionsOnly(checked);
    showStableVersionsOnly(checked);
  }

  function filteredVersions() {
    return stableVersionsOnly ? versions.filter(stable.is) : versions;
  }

  console.log(`versions`, versions);
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
      <BunpkgSuspense>
        {versions.length === 0 ? (
          <VersionSpinnerContainer>
            <Spin />
          </VersionSpinnerContainer>
        ) : (
          <List dataSource={versions} renderItem={renderListItem} />
        )}
      </BunpkgSuspense>
    </div>
  );
}

SelectVersionsStep.propTypes = {
  packageName: PropTypes.string.isRequired
};

export default SelectVersionsStep;
