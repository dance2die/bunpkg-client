import React from "react";
import Emoji from "./Emoji";

const AppHeader = () => (
  <header className="app-header">
    <h1>
      <a href="https://www.bunpkg.com">
        <Emoji label="Bun">🍔</Emoji> Bunpkg <Emoji label="Bun">🍔</Emoji>
      </a>
    </h1>
    <span className="app-subheader">{"B{uild}unpkg{URL}"}</span>
  </header>
);

export default AppHeader;
