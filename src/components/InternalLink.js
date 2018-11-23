import React from "react";

const InternalLink = ({ href, children, ...rest }) => (
  <a href={href} {...rest}>
    {children}
  </a>
);

export default InternalLink;
