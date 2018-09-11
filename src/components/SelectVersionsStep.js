import React, { Component, Fragment } from "react";
import { List, Spin, Avatar } from "antd";
import stable from "semver-stable";
import PropTypes from "prop-types";

import { getEncodePackageName } from "../util/index";
import { getVersions } from "../data/SearchRepository";
import PackageContext from "../data/PackageContext";

const renderListItem = (version, setVersion) => {
  return (
    <List.Item key={version} onClick={() => setVersion(version)}>
      <List.Item.Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={<strong>{version}</strong>}
        description={version}
      />
      <div>{version}</div>
    </List.Item>
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

    getVersions(encodedPackageName).then(versions => {
      this.setState({ versions, isLoadingVersions: false });
    });
  }

  onStableVersionsOnlyChange = e => {
    this.setState({ stableVersionsOnly: e.target.checked });
  };

  filteredVersions = () => {
    const { stableVersionsOnly, versions } = this.state;
    return stableVersionsOnly ? versions.filter(stable.is) : versions;
  };

  render() {
    const { stableVersionsOnly, isLoadingVersions } = this.state;

    return (
      <PackageContext.Consumer>
        {({ setVersion }) => (
          <Fragment>
            <label>
              <input
                onChange={this.onStableVersionsOnlyChange}
                checked={stableVersionsOnly}
                type="checkbox"
              />Stable Versions Only
            </label>
            <List
              style={{ width: "75vw" }}
              dataSource={this.filteredVersions()}
              renderItem={version => renderListItem(version, setVersion)}
            >
              {isLoadingVersions && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </Fragment>
        )}
      </PackageContext.Consumer>
    );
  }
}

export default SelectVersionsStep;
