import React, { Fragment } from "react";
import Emoji from "./Emoji";
import ExternalLink from "./ExternalLink";

const Credit = () => (
  <Fragment>
    Many thanks <Emoji label="Thanks">🙏</Emoji> to
    <div>
      <ExternalLink href="https://twitter.com/mjackson">
        Michael Jackson
      </ExternalLink>(<ExternalLink href="https://unpkg.com/">
        Unpkg
      </ExternalLink>{" "}
      &{" "}
      <ExternalLink href="https://reactpodcast.simplecast.fm/19">
        React Podcast Ep 19
      </ExternalLink>)
    </div>
    <div>
      <ExternalLink href="https://github.com/pastelsky">
        Shubham Kanodia
      </ExternalLink>
      (<ExternalLink href="https://bundlephobia.com/">
        BundlePhobia
      </ExternalLink>)
    </div>
    <div>as I learned from their open source projects</div>
  </Fragment>
);

const SourceCode = () => (
  <Fragment>
    <ExternalLink href="https://github.com/dance2die/bunpkg-client">
      bunpkg-client
    </ExternalLink>
    &amp;
    <ExternalLink href="https://github.com/dance2die/bunpkg-server">
      bunpkg-server
    </ExternalLink>
  </Fragment>
);

const AppFooter = () => (
  <footer className="app-footer">
    <div className="made-with">
      Made with{" "}
      <Emoji label={"Heart"} style={{ color: "red" }}>
        ❤
      </Emoji>{" "}
      by <ExternalLink href="https://sungkim.co/">Sung Kim</ExternalLink>
    </div>
    &mdash;
    <div className="credit">
      <Credit />
    </div>
    &mdash;
    <div className="source-code">
      <SourceCode />
    </div>
  </footer>
);

export default AppFooter;
