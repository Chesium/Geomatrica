import React from "react";
import ReactDOM from "react-dom/client";
import Geomatrica from "./Geomatrica";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Geomatrica />);
}
