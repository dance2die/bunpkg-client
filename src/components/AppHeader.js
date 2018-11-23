import React, { lazy } from "react";
import BunpkgSuspense from "./BunpkgSuspense";

const Emoji = lazy(() => import("./Emoji"));
const InternalLink = lazy(() => import("./InternalLink"));

const AppHeader = () => (
  <header className="app-header">
    <h1>
      <BunpkgSuspense>
        <InternalLink href="https://www.bunpkg.com">
          <Emoji label="Bun">🍔</Emoji> Bunpkg <Emoji label="Bun">🍔</Emoji>
        </InternalLink>
      </BunpkgSuspense>
    </h1>
    <span className="app-subheader">{"B{uild}unpkg{URL}"}</span>
  </header>
);

export default AppHeader;
