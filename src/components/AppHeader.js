import React from "react";
import Emoji from "./Emoji";

const AppHeader = () => (
  <header className="app-header">
    <h1>
      <Emoji label="Bun">🍔</Emoji> Bunpkg <Emoji label="Bun">🍔</Emoji>
    </h1>
    <span className="app-subheader">{"B{uild}unpkg{URL}"}</span>
  </header>
);

export default AppHeader;
