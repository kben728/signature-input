import React from "react";
import ReactDOM from "react-dom/client";
import Demo from "./component-demo.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      <Demo />
      {/* tailwind has some beef with rendering font names using dynamic names like in our label className={`text-3xl font-${fontName}`}
        so i preload them here which fixes the issue ¯\_(ツ)_/¯ */}
      <div className="text-sm gap-2 hidden">
        <div className="font-caveat">test</div>
        <div className="font-pacifico">test</div>
        <div className="font-marckScript">test</div>
        <div className="font-meddon">test</div>
      </div>
    </>
  </React.StrictMode>
);
