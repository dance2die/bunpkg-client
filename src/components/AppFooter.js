import React, { Fragment } from "react";
import Emoji from "./Emoji";

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank">
    {children}
  </a>
);

const Credit = () => (
  <Fragment>
    Many thanks <Emoji label="Thanks">🙏</Emoji> to
    <ul>
      <li>
        <ExternalLink href="https://twitter.com/mjackson">
          Michael Jackson
        </ExternalLink>(Unpkg &{" "}
        <ExternalLink href="https://reactpodcast.simplecast.fm/19">
          React Podcast Ep 19
        </ExternalLink>)
      </li>
      <li>
        <ExternalLink href="https://github.com/pastelsky">
          Shubham Kanodia
        </ExternalLink>
        (BundlePhobia)
      </li>
      <li>as I learned from their open source projects</li>
    </ul>
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
    <div className="credits">
      <Credit />
    </div>
    &mdash;
    <div className="source-code">
      <SourceCode />
    </div>
  </footer>
);

export default AppFooter;
