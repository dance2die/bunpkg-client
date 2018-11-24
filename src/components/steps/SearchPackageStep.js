import React, { Component, useState } from "react";
import { AutoComplete, Icon, Input } from "antd";
import debounce from "tiny-debounce";

import { getSuggestions } from "../../data/SearchRepository";
import { getEncodePackageName } from "../../util/index";
import PackageContext from "../../data/PackageContext";

const renderOption = ({ name, description }) => (
  <AutoComplete.Option className="suggestions" key={name} value={name}>
    <span>{name}</span>
    <div>{description}</div>
  </AutoComplete.Option>
);

function SearchPackageStep() {
  const defaultSuggestions = [];
  const [suggestions, setSuggestions] = useState(defaultSuggestions);

  function resetStatesToDefault() {
    setSuggestions(defaultSuggestions);
  }

  const fetchSuggestions = debounce(query => {
    const packageName = getEncodePackageName(query);

    if (packageName === "") {
      resetStatesToDefault();
    } else {
      getSuggestions(packageName).then(suggestions =>
        setSuggestions(suggestions)
      );
    }
  }, 300);

  return (
    <PackageContext.Consumer>
      {({ setPackageName }) => (
        <AutoComplete
          className="search-autocomplete"
          dataSource={suggestions.map(renderOption)}
          onSelect={setPackageName}
          onSearch={fetchSuggestions}
          placeholder="search package"
          optionLabelProp="value"
        >
          <Input suffix={<Icon type="search" />} aria-label="search icon" />
        </AutoComplete>
      )}
    </PackageContext.Consumer>
  );
}

export default SearchPackageStep;
