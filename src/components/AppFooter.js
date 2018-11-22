import React, { lazy, Suspense } from "react";
import { ExternalLink } from "./Links";

const Emoji = lazy(() => import("./Emoji"));

const SourceCode = () => (
  <>
    <ExternalLink href="https://github.com/dance2die/bunpkg-client">
      bunpkg-client
    </ExternalLink>{" "}
    &amp;{" "}
    <ExternalLink href="https://github.com/dance2die/bunpkg-server">
      bunpkg-server
    </ExternalLink>
  </>
);

const AppFooter = () => (
  <Suspense fallback={<div>Loading...</div>}>
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
  </Suspense>
);

export default AppFooter;
