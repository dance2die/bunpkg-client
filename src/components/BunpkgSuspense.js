import React, { Children, cloneElement, Suspense } from "react";
import { Spin } from "antd";

const BunpkgSuspense = ({ children, fallback, ...rest }) => {
  const clonedChildren = Children.map(children, child =>
    cloneElement(child, { ...rest })
  );

  const suspenseFallback = fallback || (
    <div className="demo-loading-container">
      <Spin />
    </div>
  );

  return <Suspense fallback={suspenseFallback}>{clonedChildren}</Suspense>;
};

export default BunpkgSuspense;
