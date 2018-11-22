import React, { Fragment } from "react";
import Emoji from "./Emoji";
import { ExternalLink } from "./Links";

const SourceCode = () => (
  <Fragment>
    <ExternalLink href="https://github.com/dance2die/bunpkg-client">
      bunpkg-client
    </ExternalLink>{" "}
    &amp;{" "}
    <ExternalLink href="https://github.com/dance2die/bunpkg-server">
      bunpkg-server
    </ExternalLink>
  </Fragment>
);

const AppFooter = () => (
  <footer className="app-footer">
    <div className="made-with">
      Made with{" "}
      <Emoji label={"Heart"} style={{ color: "#EE0701" }}>
        ❤
      </Emoji>{" "}
      by <ExternalLink href="https://sungkim.co/">Sung Kim</ExternalLink>
    </div>
    <div className="source-code">
      <SourceCode />
    </div>
  </footer>
);

export default AppFooter;
