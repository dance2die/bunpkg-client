import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, Spin, Button, message } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

import ExternalLink from "../ExternalLink";
import { getPackageInfo } from "../../data/SearchRepository";

import {
  buildUnpkgURL,
  buildUnpkgDirectoryURL,
  buildUnpkgScript,
  buildBundlePhobiaURL,
  isEmpty
} from "../../util/index";

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

const ResultHeader = ({ packageName, version, homepage }) => {
  const dataSource = [
    {
      title: "Browse all on Unpkg",
      content: `${packageName}@${version}`,
      emoji: "💻",
      href: buildUnpkgDirectoryURL(packageName, version)
    },
    {
      title: "Bundle Cost on ",
      content: `BundlePhobia`,
      emoji: "💰",
      href: buildBundlePhobiaURL(packageName, version)
    },
    {
      title: "Home",
      content: `${homepage}`,
      emoji: "🏠",
      href: homepage
    }
  ];

  return (
    <List
      className="result-header-list"
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta title={`${item.emoji} ${item.title}`} />
          <ExternalLink href={item.href}>{item.content}</ExternalLink>
        </List.Item>
      )}
    />
  );
};

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
            buttonText="Copy Script"
          />,
          <CopyButton
            clipboardText={buildUnpkgURL(packageName, version, file)}
            buttonText="Copy Unpkg"
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
    const { homepage } = meta;
    if (isEmpty(meta) || files.length <= 0) return <Spin />;

    return (
      <div className="unpkg-links">
        <ResultHeader
          packageName={packageName}
          version={version}
          homepage={homepage}
        />
        <section>
          <div>{this.renderFiles()}</div>
        </section>
      </div>
    );
  }
}

export default UnpkgLinksStep;
