// https://github.com/timarney/react-app-rewired/issues/348#issuecomment-452199363
const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
  })
);

// const { injectBabelPlugin } = require("react-app-rewired");

// /**
//  * {@link https://ant.design/docs/react/use-with-create-react-app#Use-babel-plugin-import|AntD-Use babel-plugin-import}
//  */
// module.exports = function override(config, env) {
//   config = injectBabelPlugin(
//     ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
//     config
//   );
//   return config;
// };
