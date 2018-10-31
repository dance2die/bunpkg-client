import React, { Component } from "react";
import { List, Spin, Checkbox } from "antd";
import stable from "semver-stable";
import PropTypes from "prop-types";
import semverSort from "semver-sort";

import { getEncodePackageName } from "../../util/index";
import { getVersions } from "../../data/SearchRepository";
import PackageContext from "../../data/PackageContext";

const renderListItem = version => {
  return (
    <PackageContext.Consumer>
      {({ setVersion }) => (
        <List.Item
          className="version"
          key={version}
          onClick={() => setVersion(version)}
        >
          <List.Item.Meta description={<strong>{version}</strong>} />
        </List.Item>
      )}
    </PackageContext.Consumer>
  );
};

class SelectVersionsStep extends Component {
  static propTypes = {
    packageName: PropTypes.string.isRequired
  };

  static defaultState = {
    versions: [],
    isLoadingVersions: true,
    stableVersionsOnly: true
  };
  state = SelectVersionsStep.defaultState;

  componentDidMount() {
    const { packageName } = this.props;
    const encodedPackageName = getEncodePackageName(packageName);

    getVersions(encodedPackageName).then(versions =>
      this.setState({ versions, isLoadingVersions: false })
    );
  }

  onStableVersionsOnlyChange = e => {
    this.setState({ stableVersionsOnly: e.target.checked });
  };

  filteredVersions = () => {
    const { stableVersionsOnly, versions } = this.state;
    return stableVersionsOnly ? versions.filter(stable.is) : versions;
  };

  render() {
    const { stableVersionsOnly, isLoadingVersions, versions } = this.state;
    if (!Array.isArray(versions)) throw new Error(versions);
    if (versions.length <= 0) return <div>Loading versions...</div>;

    const dataSource = this.filteredVersions();

    return (
      <div className="select-versions">
        <Checkbox
          onChange={this.onStableVersionsOnlyChange}
          checked={stableVersionsOnly}
        >
          Stable Versions Only
        </Checkbox>
        <List dataSource={dataSource} renderItem={renderListItem}>
          {isLoadingVersions && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </div>
    );
  }
}

export default SelectVersionsStep;
