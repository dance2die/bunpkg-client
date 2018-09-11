import React, { Component, Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { List, Spin, Avatar, Button, message } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { getPackageInfo } from "../data/SearchRepository";

import {
  buildUnpkgURL,
  buildUnpkgDirectoryURL,
  buildUnpkgScript,
  buildBundlePhobiaURL,
  isEmpty
} from "../util/index";

const CopyButton = ({ clipboardText, buttonText }) => (
  <CopyToClipboard
    text={clipboardText}
    onCopy={() => message.success(`Successfully copied ${clipboardText}`)}
  >
    <Button type="primary" size="small">
      {buttonText}
    </Button>
  </CopyToClipboard>
);

class UnpkgLinksStep extends Component {
  static propTypes = {
    packageName: PropTypes.string.isRequired,
    version: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  state = {
    meta: {},
    files: [],
    isLoading: false
  };

  componentDidMount() {
    const { packageName, version } = this.props;
    getPackageInfo(packageName, version).then(({ meta, files }) =>
      this.setState({ meta, files })
    );
  }

  renderListItem = file => {
    const { packageName, version } = this.props;

    return (
      <List.Item
        key={file}
        actions={[
          <CopyButton
            clipboardText={buildUnpkgScript(packageName, version, file)}
            buttonText="Copy Script Tag"
          />,
          <CopyButton
            clipboardText={buildUnpkgURL(packageName, version, file)}
            buttonText="Copy Unpkg Link"
          />
        ]}
      >
        <List.Item.Meta
          title={
            <strong>
              <a
                href={buildUnpkgURL(packageName, version, file)}
                target="_blank"
              >
                {file}
              </a>
            </strong>
          }
        />
      </List.Item>
    );
  };

  renderFiles = () => {
    const { packageName, version } = this.props;
    const { meta, files, isLoading } = this.state;
    if (isEmpty(meta) || files.length <= 0) return <Spin />;

    return (
      <List
        className="result-list"
        dataSource={files}
        renderItem={this.renderListItem}
      >
        {isLoading && (
          <div className="demo-loading-container">
            <Spin />
          </div>
        )}
      </List>
    );
  };

  render() {
    const { packageName, version } = this.props;
    const { meta, files } = this.state;
    if (isEmpty(meta) || files.length <= 0) return <Spin />;

    return (
      <Fragment>
        <header>
          <div>
            Browse all files on Unpkg:
            <a
              target="_blank"
              href={buildUnpkgDirectoryURL(packageName, version)}
            >{`${packageName}@${version}`}</a>
          </div>
          <div>
            Bundle Cost
            <a
              target="_blank"
              href={buildBundlePhobiaURL(packageName, version)}
            >
              on BundlePhobia
            </a>
          </div>
        </header>
        <section>
          <div>{this.renderFiles()}</div>
        </section>
      </Fragment>
    );
  }
}

export default UnpkgLinksStep;
