import React, { useState, useEffect, useContext } from "react";
import { List, Spin, Checkbox } from "antd";
import stable from "semver-stable";
import PropTypes from "prop-types";
import styled from "styled-components";

import { getEncodePackageName } from "../../util/index";
import { getVersions } from "../../data/SearchRepository";
import PackageContext from "../../data/PackageContext";

const VersionSpinnerContainer = styled.div`
  margin: 3em 0;
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
    [packageName]
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
      {versions.length === 0 ? (
        <VersionSpinnerContainer>
          <Spin />
        </VersionSpinnerContainer>
      ) : (
        <List dataSource={filteredVersions()} renderItem={renderListItem} />
      )}
    </div>
  );
}

SelectVersionsStep.propTypes = {
  packageName: PropTypes.string.isRequired
};

export default SelectVersionsStep;
