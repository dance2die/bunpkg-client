import React, { Component, Fragment, createRef } from "react";

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank">
    {children}
  </a>
);

const Disclaimer = () => (
  <Fragment>
    <strong>Disclaimer</strong>
    <div>
      No association with{" "}
      <ExternalLink href="https://unpkg.com/">Unpkg</ExternalLink> or{" "}
      <ExternalLink href="https://bundlephobia.com/">BundlePhobia</ExternalLink>
    </div>
    <div>I just love them</div>
  </Fragment>
);

const Credit = () => (
  <Fragment>
    Majority of credits go to
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

const AppFooter = () => (
  <header className="app-footer">
    <div className="made-with">
      Made with <span style={{ color: "red" }}>❤</span> by{" "}
      <ExternalLink href="https://sungkim.co/">Sung Kim</ExternalLink>
    </div>
    &mdash;
    <div className="disclaimer">
      <Disclaimer />
    </div>
    &mdash;
    <div className="credits">
      <Credit />
    </div>
  </header>
);

export default AppFooter;
