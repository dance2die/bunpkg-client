const { injectBabelPlugin } = require("react-app-rewired");

/**
 * {@link https://ant.design/docs/react/use-with-create-react-app#Use-babel-plugin-import|AntD-Use babel-plugin-import}
 */
module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
    config
  );
  return config;
};
