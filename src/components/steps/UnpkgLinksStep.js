import React, { Component, lazy } from "react";
import PropTypes from "prop-types";
import { List, Spin, Button, message, Checkbox } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { getPackageInfo } from "../../data/SearchRepository";
import BunpkgSuspense from "./../BunpkgSuspense";

import {
  buildUnpkgURL,
  buildUnpkgDirectoryURL,
  buildUnpkgScriptTag,
  buildUnpkgLinkTag,
  buildBundlePhobiaURL,
  isEmpty
} from "../../util/index";

const ExternalLink = lazy(() => import("./../ExternalLink"));

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
      title: `Browse "${packageName}@${version}" on`,
      content: `UNPKG`,
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
          <List.Item.Meta description={`${item.emoji} ${item.title}`} />
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
    isLoading: false,
    minifiedFilesOnly: true
  };

  componentDidMount() {
    const { packageName, version } = this.props;

    getPackageInfo(packageName, version)
      .then(({ meta, files }) =>
        this.setState({ meta, files, isLoading: false })
      )
      .catch(error => {
        this.setState({ isLoading: false }, () => {
          // bubble up to let the error boundary in the Wizard to display the error
          throw new Error(error);
        });
      });
  }

  renderMainCopyButton = (packageName, version, file) => {
    if (file.endsWith(".map")) return null;

    return file.endsWith(".css") ? (
      <CopyButton
        clipboardText={buildUnpkgLinkTag(packageName, version, file)}
        buttonText="Copy Link"
      />
    ) : (
      <CopyButton
        clipboardText={buildUnpkgScriptTag(packageName, version, file)}
        buttonText="Copy Script"
      />
    );
  };

  renderListItem = file => {
    const { packageName, version } = this.props;

    return (
      <List.Item
        key={file}
        actions={[
          this.renderMainCopyButton(packageName, version, file),
          <CopyButton
            clipboardText={buildUnpkgURL(packageName, version, file)}
            buttonText="Copy Unpkg"
          />
        ]}
      >
        <List.Item.Meta
          description={
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
    const { meta, files, isLoading, minifiedFilesOnly } = this.state;
    const byMinifiedFiles = file => !!file.match(/.min./gi);
    const filteredFiles = minifiedFilesOnly
      ? files.filter(byMinifiedFiles)
      : files;

    if (isEmpty(meta)) return <Spin />;
    if (filteredFiles.length <= 0)
      return (
        <p className="no-min-files-message">No Minified Files Available</p>
      );

    return (
      <List
        className="result-list"
        dataSource={filteredFiles}
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

  onMinifiedFilesOnlyChange = e => {
    this.setState({ minifiedFilesOnly: e.target.checked });
  };

  render() {
    const { packageName, version } = this.props;
    const { meta, files, minifiedFilesOnly } = this.state;
    const { homepage } = meta;
    if (isEmpty(meta) || files.length <= 0) return <Spin />;

    return (
      <div className="unpkg-links">
        <BunpkgSuspense>
          <ResultHeader
            packageName={packageName}
            version={version}
            homepage={homepage}
          />
        </BunpkgSuspense>
        <Checkbox
          onChange={this.onMinifiedFilesOnlyChange}
          checked={minifiedFilesOnly}
        >
          Minified Files Only
        </Checkbox>
        <section>
          <div>{this.renderFiles()}</div>
        </section>
      </div>
    );
  }
}

export default UnpkgLinksStep;
