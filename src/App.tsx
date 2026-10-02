import React from "react";
import { HoverExpand, DEFAULT_HOVER_EXPAND_ITEMS } from "./components/HoverExpand";

export const App: React.FC = () => {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#121212]">
      {/* Component Showcase */}
      <HoverExpand
        items={DEFAULT_HOVER_EXPAND_ITEMS}
        defaultActiveIndex={15}
      />
    </main>
  );
};

export default App;
