import React, { Component, Fragment } from "react";
import PackageContext from "../data/PackageContext";
import { getSuggestions } from "../data/SearchRepository";
import { AutoComplete, Icon, Input } from "antd";
import debounce from "tiny-debounce";

// Credit Michael Jackson
// https://github.com/unpkg/unpkg.com/blob/82d404a973cfe24a2a632859cbb6ab8958d48e9e/modules/utils/fetchNpmPackageInfo.js#L15
const encodedPackageName = packageName =>
  packageName.charAt(0) === "@"
    ? `@${encodeURIComponent(packageName.substring(1))}`
    : encodeURIComponent(packageName);

const renderOption = suggestion => (
  <AutoComplete.Option key={suggestion.name} value={suggestion.name}>
    <span>{suggestion.name}</span>
    <div>{suggestion.description}</div>
  </AutoComplete.Option>
);

class SearchPackageStep extends Component {
  static defaultState = {
    suggestions: [],
    packageName: ""
  };

  state = SearchPackageStep.defaultState;

  fetchSuggestions = debounce(query => {
    const packageName = encodedPackageName(query);

    if (packageName === "") {
      this.setState(SearchPackageStep.defaultState);
      return;
    }

    getSuggestions(packageName).then(suggestions =>
      this.setState({ suggestions })
    );
  }, 300);

  onSearch = query => {
    this.fetchSuggestions(query);
  };

  render() {
    const { suggestions } = this.state;

    return (
      <PackageContext.Consumer>
        {({ setPackageName }) => (
          <AutoComplete
            dataSource={suggestions.map(renderOption)}
            style={{ width: "75vw" }}
            onSelect={setPackageName}
            onSearch={this.onSearch}
            placeholder="Search Package"
            optionLabelProp="value"
          >
            <Input suffix={<Icon type="search" />} />
          </AutoComplete>
        )}
      </PackageContext.Consumer>
    );
  }
}

export default SearchPackageStep;
