import React from "react";

const InternalLink = ({ href, children, ...rest }) => (
  <a href={href} {...rest}>
    {children}
  </a>
);

const ExternalLink = ({ href, children, ...rest }) => (
  <a href={href} target="_blank" rel="noopener" {...rest}>
    {children}
  </a>
);

export { InternalLink, ExternalLink };
