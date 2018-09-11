import { createContext } from "react";

/**
 * Provides package name & version to be used to query for file names & meta
 * Each Wizard stpe will update the package context
 *
 * See {@link https://reactjs.org/docs/context.html#updating-context-from-a-nested-component|Updating Context from a Nested Component} on how it works
 */
const PackageContext = createContext({
  setPackageName: name => {},
  setVersion: version => {}
});

export default PackageContext;
