import React, { Component, useState, useEffect, useContext } from "react";
import { List, Spin, Checkbox } from "antd";
import stable from "semver-stable";
import PropTypes from "prop-types";

import { getEncodePackageName } from "../../util/index";
import { getVersions } from "../../data/SearchRepository";
import PackageContext from "../../data/PackageContext";

import BunpkgSuspense from "./../BunpkgSuspense";

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

SelectVersionsStep.propTypes = {
  packageName: PropTypes.string.isRequired
};

function SelectVersionsStep({ packageName }) {
  const defaultVersions = [];
  const defaultStableVersionsOnly = true;

  const [versions, setVersions] = useState(defaultVersions);
  const [stableVersionsOnly, setStableVersionsOnly] = useState(
    defaultStableVersionsOnly
  );

  useEffect(
    () => {
      const encodedPackageName = getEncodePackageName(packageName);
      getVersions(encodedPackageName).then(setVersions);
    },
    [packageName, versions]
  );

  function onStableVersionsOnlyChange(e) {
    setStableVersionsOnly(e.target.checked);
  }

  function filteredVersions() {
    return stableVersionsOnly ? versions.filter(stable.is) : versions;
  }

  if (!Array.isArray(versions)) throw new Error(versions);

  return (
    <div className="select-versions">
      <Checkbox
        onChange={onStableVersionsOnlyChange}
        checked={stableVersionsOnly}
      >
        Stable Versions Only
      </Checkbox>
      <BunpkgSuspense
        fallback={
          <div className="demo-loading-container">
            <Spin />
          </div>
        }
      >
        <List dataSource={filteredVersions()} renderItem={renderListItem} />
      </BunpkgSuspense>
    </div>
  );
}

export default SelectVersionsStep;
