import React, { Component, Fragment } from "react";
import { getPackageInfo } from "../data/SearchRepository";
import PackageContext from "../data/PackageContext";
import PropTypes from "prop-types";
import { Spin } from "antd";

import {
  buildUnpkgURL,
  buildUnpkgDirectoryURL,
  buildBundlePhobiaURL,
  isEmpty
} from "../util/index";

const UnpkgLink = ({ packageName, version, file }) => (
  <div>
    <a href={buildUnpkgURL(packageName, version, file)} target="_blank">
      {file}
    </a>
  </div>
);

class UnpkgLinksStep extends Component {
  static propTypes = {
    packageName: PropTypes.string.isRequired,
    version: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  state = {
    meta: {},
    files: []
  };

  componentDidMount() {
    const { packageName, version } = this.props;
    getPackageInfo(packageName, version).then(({ meta, files }) =>
      this.setState({ meta, files })
    );
  }

  render() {
    const { packageName, version } = this.props;
    const { meta, files } = this.state;
    if (isEmpty(meta) || files.length <= 0) return <Spin />;

    const filesComponents = files.map(file => (
      <UnpkgLink
        key={file}
        packageName={packageName}
        version={version}
        file={file}
      />
    ));

    return (
      <Fragment>
        <div>packageName:{packageName}</div>
        <div>version:{version}</div>
        <div>
          Browse all files on Unpkg:
          <a
            target="_blank"
            href={buildUnpkgDirectoryURL(packageName, version)}
          >{`${packageName}@${version}`}</a>
        </div>
        <div>
          Bundle Cost
          <a target="_blank" href={buildBundlePhobiaURL(packageName, version)}>
            on BundlePhobia
          </a>
        </div>
        <div>{filesComponents}</div>
      </Fragment>
    );
  }
}

export default UnpkgLinksStep;
