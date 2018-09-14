import React from "react";
import Emoji from "./Emoji";
import { InternalLink } from "./Links";

const AppHeader = () => (
  <header className="app-header">
    <h1>
      <InternalLink href="https://www.bunpkg.com">
        <Emoji label="Bun">🍔</Emoji> Bunpkg <Emoji label="Bun">🍔</Emoji>
      </InternalLink>
    </h1>
    <span className="app-subheader">{"B{uild}unpkg{URL}"}</span>
  </header>
);

export default AppHeader;
