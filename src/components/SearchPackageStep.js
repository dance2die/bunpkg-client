import React, { Component, Fragment } from "react";
import { AutoComplete, Icon, Input } from "antd";
import debounce from "tiny-debounce";

import { getSuggestions } from "../data/SearchRepository";
import { getEncodePackageName } from "../util/index";
import PackageContext from "../data/PackageContext";

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
    const packageName = getEncodePackageName(query);

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
