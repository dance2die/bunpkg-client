import React from "react";

const Emoji = ({ label, children, ...rest }) => (
  <span role="img" aria-label={label} {...rest}>
    {children}
  </span>
);

export default Emoji;
