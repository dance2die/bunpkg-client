import React, { Children, cloneElement, Suspense } from "react";

const BunpkgSuspense = ({ children, ...rest }) => {
  const clonedChildren = Children.map(children, child =>
    cloneElement(child, { ...rest })
  );

  return <Suspense fallback={<div>Loading...</div>}>{clonedChildren}</Suspense>;
};

export default BunpkgSuspense;
